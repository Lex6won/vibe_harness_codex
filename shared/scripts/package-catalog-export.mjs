#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

function argValue(name, fallback) {
  const index = process.argv.indexOf(name);
  if (index === -1 || index + 1 >= process.argv.length) return fallback;
  return process.argv[index + 1];
}

function stripQuotes(value) {
  return value.trim().replace(/^['"]|['"]$/g, "");
}

function parseApprovedPackages(text) {
  const entries = [];
  let section = null;
  let bucket = null;

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(/\s+#.*$/, "");
    const top = line.match(/^([A-Za-z0-9_]+):\s*$/);
    if (top) {
      section = top[1];
      bucket = null;
      continue;
    }

    const nested = line.match(/^\s{2}([A-Za-z0-9_]+):\s*$/);
    if (nested) {
      bucket = nested[1];
      continue;
    }

    const item = line.match(/^\s{4}-\s+(.+?)\s*$/);
    if (!item || !section || !bucket) continue;

    const name = stripQuotes(item[1]);
    if (!name) continue;

    let ecosystem = null;
    if (section === "python") ecosystem = "pypi";
    if (section === "npm_frontend" || section === "npm_backend") ecosystem = "npm";
    if (!ecosystem) continue;

    entries.push({
      ecosystem,
      package: name,
      status: bucket === "core" ? "APPROVED" : "CONDITIONAL",
      source_file: "shared/references/approved-packages.yaml",
      source_section: `${section}.${bucket}`,
      approval_basis: bucket === "core" ? "BASELINE_BULK" : "BASELINE_CONDITIONAL",
    });
  }

  return entries;
}

function parseDenylist(text) {
  const entries = [];
  let section = null;
  let ecosystem = null;

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(/\s+#.*$/, "");
    if (/^denied_packages:\s*$/.test(line)) {
      section = "denied_packages";
      ecosystem = null;
      continue;
    }
    if (/^[A-Za-z0-9_]+:\s*$/.test(line) && !/^denied_packages:\s*$/.test(line)) {
      if (!/^\s/.test(line)) {
        section = null;
        ecosystem = null;
      }
    }

    const nested = line.match(/^\s{2}(npm|python):\s*$/);
    if (nested && section === "denied_packages") {
      ecosystem = nested[1] === "python" ? "pypi" : "npm";
      continue;
    }

    const item = line.match(/^\s{4}-\s+(.+?)\s*$/);
    if (!item || section !== "denied_packages" || !ecosystem) continue;

    const name = stripQuotes(item[1]);
    if (!name) continue;

    entries.push({
      ecosystem,
      package: name,
      status: "REJECTED",
      source_file: "shared/references/package-denylist.yaml",
      source_section: `denied_packages.${ecosystem}`,
      approval_basis: "BASELINE_DENYLIST",
    });
  }

  return entries;
}

const root = resolve(argValue("--root", "."));
const out = resolve(argValue("--out", "generated/package-catalog.export.json"));
const approvedPath = resolve(root, "shared/references/approved-packages.yaml");
const deniedPath = resolve(root, "shared/references/package-denylist.yaml");

const approved = parseApprovedPackages(readFileSync(approvedPath, "utf8"));
const denied = parseDenylist(readFileSync(deniedPath, "utf8"));

const denyKeys = new Set(denied.map((entry) => `${entry.ecosystem}:${entry.package}`));
const entries = [
  ...approved.filter((entry) => !denyKeys.has(`${entry.ecosystem}:${entry.package}`)),
  ...denied,
];

const payload = {
  package_catalog_export_version: 1,
  generated_by: "shared/scripts/package-catalog-export.mjs",
  registry_import_contract: "allowlist entries become APPROVED/CONDITIONAL; denylist entries become REJECTED; absence remains UNKNOWN",
  entries,
};

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(`WROTE ${out}`);
console.log(`ENTRIES ${entries.length}`);
