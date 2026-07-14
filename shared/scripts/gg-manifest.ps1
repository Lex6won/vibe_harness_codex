param(
  [string]$Workspace = "_workspace",
  [string]$ProjectId = "demo-project",
  [string]$MaturityLevel = "L1",
  [string]$WorkMode = "new-build"
)

$ErrorActionPreference = "Stop"
New-Item -ItemType Directory -Force -Path $Workspace | Out-Null
$manifest = [ordered]@{
  project_id = $ProjectId
  service_name = $ProjectId
  work_mode = $WorkMode
  maturity_level = $MaturityLevel
  maturity_reason = "initial manifest"
  next_gate = "feature-discovery"
  service_exposure = "unknown"
  network_profile = "unknown"
  runtime_external_access = "unknown"
  data_level = "unknown"
  track = "unknown"
  feature_discovery = @{}
  artifacts = @{}
  security_check = @{}
  pilot_metrics = @{}
  exceptions = @()
  gates = @{}
}
$path = Join-Path $Workspace "vibecode-manifest.json"
$manifest | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $path -Encoding UTF8
Write-Output "MANIFEST=$path"
