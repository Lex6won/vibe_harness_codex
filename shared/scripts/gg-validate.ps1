param(
  [string]$Root = ".",
  [string]$Workspace = "_workspace",
  [ValidateSet("L1","L2","L3")][string]$Level = "L1"
)

$ErrorActionPreference = "Stop"
$failures = New-Object System.Collections.Generic.List[string]
$warnings = New-Object System.Collections.Generic.List[string]

function Fail($message) { $failures.Add($message) | Out-Null }
function Warn($message) { $warnings.Add($message) | Out-Null }
function Check-File($path, $label) {
  if (!(Test-Path -LiteralPath $path)) { Fail "MISSING ${label}: $path" } else { Write-Output "OK $label" }
}
function Check-TemplateCode($dir, $name) {
  if (!(Test-Path -LiteralPath $dir)) { Fail "MISSING golden template: $name"; return }
  $files = Get-ChildItem -LiteralPath $dir -Recurse -File | Where-Object { $_.Name -ne "README.md" }
  if ($files.Count -eq 0) { Fail "EMPTY golden template: $name has README only" } else { Write-Output "OK golden template $name ($($files.Count) files)" }
}

$rootPath = Resolve-Path -LiteralPath $Root
Check-File (Join-Path $rootPath ".claude\CLAUDE.md") "CLAUDE.md"
Check-File (Join-Path $rootPath ".claude\skills\gg-vibecode\skill.md") "gg-vibecode skill"
Check-File (Join-Path $rootPath "shared\references\network-profile.yaml") "canonical network profile"
Check-File (Join-Path $rootPath "shared\references\thin-l1-policy.md") "thin L1 policy"
Check-File (Join-Path $rootPath "shared\references\agent-handoff-contract.md") "handoff contract"

# deploy-context must be compatibility pointer, not second source of truth.
$deployContext = Join-Path $rootPath ".claude\references\deploy-context.yaml"
if (Test-Path -LiteralPath $deployContext) {
  $dc = Get-Content -LiteralPath $deployContext -Encoding UTF8 -Raw
  if ($dc -notmatch "deprecated_alias" -or $dc -notmatch "network-profile.yaml") { Fail "deploy-context.yaml must be deprecated alias to network-profile.yaml" } else { Write-Output "OK deploy-context alias" }
}

# Manifest schema must parse.
$schema = Join-Path $rootPath "shared\templates\vibecode-manifest.schema.json"
try { Get-Content -LiteralPath $schema -Encoding UTF8 -Raw | ConvertFrom-Json | Out-Null; Write-Output "OK manifest schema" } catch { Fail "INVALID manifest schema: $($_.Exception.Message)" }

# Golden templates must have real files.
$gold = Join-Path $rootPath "shared\golden-templates"
@("gg-webapp","gg-dashboard","gg-upload","gg-node-api","gg-spa","gg-rag") | ForEach-Object { Check-TemplateCode (Join-Path $gold $_) $_ }

# Workspace artifact checks by maturity level.
$workspacePath = Join-Path $rootPath $Workspace
if (Test-Path -LiteralPath $workspacePath) {
  $required = @("00_feature_brief.md", "00_작업현황.md", "vibecode-manifest.json")
  if ($Level -in @("L2","L3")) { $required += @("01_PRD_서비스기획서.md", "04_개발스택_운영환경.md", "05_보안점검보고서.md") }
  if ($Level -eq "L3") { $required += @("06_MCP_검증결과.md", "07_서버설치_배포가이드.md", "08_배포신청서.md") }
  foreach ($f in $required) { if (!(Test-Path -LiteralPath (Join-Path $workspacePath $f))) { Warn "workspace artifact not found for ${Level}: $f" } }
}

if ($warnings.Count -gt 0) {
  Write-Output "WARNINGS:"
  $warnings | ForEach-Object { Write-Output "- $_" }
}
if ($failures.Count -gt 0) {
  Write-Output "FAILURES:"
  $failures | ForEach-Object { Write-Output "- $_" }
  exit 1
}
Write-Output "VALIDATION PASSED"
exit 0

