#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const root = resolve(process.argv[2] || ".");
const failures = [];
const warnings = [];

function readText(path) {
  const fullPath = join(root, path);
  if (!existsSync(fullPath)) {
    failures.push(`MISSING ${path}`);
    return "";
  }
  return readFileSync(fullPath, "utf8").replace(/^\uFEFF/, "");
}

function requireText(path, markers) {
  const text = readText(path);
  for (const marker of markers) {
    if (!text.includes(marker)) {
      failures.push(`${path} missing marker: ${marker}`);
    }
  }
}

function walk(dir) {
  const fullDir = join(root, dir);
  if (!existsSync(fullDir)) return [];
  const results = [];
  for (const entry of readdirSync(fullDir, { withFileTypes: true })) {
    const fullPath = join(fullDir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walk(relative(root, fullPath)));
    } else {
      results.push(relative(root, fullPath).replaceAll("\\", "/"));
    }
  }
  return results;
}

requireText("README.md", [
  "https://github.com/Lex6won/vibe_harness_codex",
  "https://github.com/Lex6won/vibecode-checker",
  "git clone https://github.com/Lex6won/vibe_harness_codex.git",
  "git clone https://github.com/Lex6won/vibecode-checker.git",
  "quick/standard/full",
  "dev-quick",
  "GVSKB_POLICIES_DIR",
  "network_profile",
  "최종 리포트 2종",
  "보안팀 또는 AX 전담팀에 제출",
]);

requireText("AGENTS.md", [
  "quick during coding",
  "standard after implementation completion",
  "full before deployment/security/AX submission",
  "vibecode-checker",
  "dev-quick",
  "GVSKB_POLICIES_DIR",
  "https://github.com/Lex6won/vibe_harness_codex",
  "https://github.com/Lex6won/vibecode-checker",
  "Python or JavaScript",
]);

requireText("shared/harness.yaml", [
  "canonical_repositories:",
  "https://github.com/Lex6won/vibe_harness_codex",
  "https://github.com/Lex6won/vibecode-checker",
  "checker-mediated-only",
  "checker_profile_policy:",
  "quick_profile: \"dev-quick\"",
  "custom_policies_dir: \"absolute-path-only\"",
  "vibecode-checker_saved_html_report",
  "vibecode-checker_saved_json_evidence",
]);

requireText("shared/institution-profile.yaml", [
  "allowed_function_implementation_languages:",
  "- python",
  "- javascript",
  "canonical_repositories:",
  "registry_access: \"checker-mediated-only\"",
]);

requireText("shared/references/lifecycle-quality-gates.yaml", [
  "checker_profiles:",
  "quick:",
  "standard:",
  "full:",
  "two_report_release_default",
  "mandatory_user_notice",
  "conditional_documents_only",
]);

requireText("shared/references/package-alternatives.yaml", [
  "Prefer no-new-package and approved-package replacements before exception requests.",
  "preferred_replacement",
  "output_template",
]);

requireText("shared/references/checker-bootstrap-policy.md", [
  "사용자가 명시적으로 동의하기 전에는",
  "https://github.com/Lex6won/vibecode-checker",
  "https://github.com/Lex6won/vibe_harness_codex",
  "dev-quick",
  "GVSKB_POLICIES_DIR",
  "절대경로",
  "--yes",
  "--install-python",
]);

requireText("shared/references/checker-integration.md", [
  "dev-quick",
  "GVSKB_POLICIES_DIR",
  "requested_checker_profile",
  "applied_checker_profile",
  "network_profile",
  "검증을 완료 처리하지 않는다",
]);

const disallowedImplementationExtensions = new Set([
  ".ts",
  ".tsx",
  ".java",
  ".go",
  ".php",
  ".rb",
  ".cs",
  ".rs",
]);

for (const file of walk("shared/golden-templates")) {
  const lower = file.toLowerCase();
  for (const extension of disallowedImplementationExtensions) {
    if (lower.endsWith(extension)) {
      failures.push(`golden template uses non-approved implementation language: ${file}`);
    }
  }
}

for (const file of walk("shared/golden-templates")) {
  if (!file.endsWith("requirements.txt")) continue;
  const lines = readText(file)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
  for (const line of lines) {
    if (!line.includes("==") || line.includes("*") || line.includes("[")) {
      failures.push(`${file} dependency must be exact and checker-parseable: ${line}`);
    }
  }
}

for (const file of walk("shared/golden-templates")) {
  if (!file.endsWith("package.json")) continue;
  const parsed = JSON.parse(readText(file));
  for (const section of ["dependencies", "devDependencies"]) {
    const deps = parsed[section] || {};
    for (const [name, version] of Object.entries(deps)) {
      if (typeof version !== "string" || version.startsWith("^") || version.startsWith("~") || version.includes("*")) {
        failures.push(`${file} ${section}.${name} must use an exact version, got ${version}`);
      }
    }
  }
  if ((file.includes("gg-node-api") || file.includes("gg-spa")) && parsed.engines?.node !== ">=20.19.0 <21") {
    failures.push(`${file} must declare engines.node >=20.19.0 <21`);
  }
  if ((file.includes("gg-node-api") || file.includes("gg-spa")) && !existsSync(join(root, file.replace("package.json", "package-lock.json")))) {
    failures.push(`${file} requires package-lock.json for release evidence`);
  }
}

for (const file of walk("evals")) {
  if (!file.endsWith(".json")) continue;
  try {
    const parsed = JSON.parse(readText(file));
    if (!parsed.name) failures.push(`${file} missing name`);
    if (!Array.isArray(parsed.expect) || parsed.expect.length === 0) {
      failures.push(`${file} missing non-empty expect[]`);
    }
  } catch (error) {
    failures.push(`${file} invalid JSON: ${error.message}`);
  }
}

const mcpConfigText = readText(".claude/.mcp.json");
if (mcpConfigText.includes("GVSKB_POLICIES_DIR")) {
  const parsed = JSON.parse(mcpConfigText);
  const policyDir = parsed?.mcpServers?.["vibecode-checker"]?.env?.GVSKB_POLICIES_DIR;
  if (typeof policyDir === "string" && !/^([A-Za-z]:[\\/]|\/)/.test(policyDir)) {
    failures.push(".claude/.mcp.json GVSKB_POLICIES_DIR must be absolute or omitted");
  }
}

const finalEval = readText("evals/04_final_release_harness.json");
for (const marker of [
  "coding quick check",
  "implementation complete standard check",
  "release full checker reports",
  "submit two final reports",
  "GitHub canonical source",
]) {
  if (!finalEval.includes(marker)) failures.push(`evals/04_final_release_harness.json missing final acceptance marker: ${marker}`);
}

if (walk("shared/golden-templates").length === 0) {
  failures.push("golden templates are empty");
}

if (warnings.length > 0) {
  console.log("WARNINGS:");
  for (const warning of warnings) console.log(`- ${warning}`);
}

if (failures.length > 0) {
  console.log("HARNESS FINAL SMOKE FAILED");
  for (const failure of failures) console.log(`- ${failure}`);
  process.exit(1);
}

console.log("HARNESS FINAL SMOKE PASSED");
