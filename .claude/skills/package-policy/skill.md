---
name: package-policy
description: 개발 중 Python/npm 패키지를 추가해야 할 때 승인 패키지 카탈로그, 위험 패턴, 예외신청 기준을 적용한다. 초기에는 넓게 승인하고 위험한 것만 강하게 막는 원칙을 따른다.
---

# package-policy

## 원칙
- 패키지 판정의 정상 경로는 하네스 → `vibecode-checker(gvskb)` → 레지스트리 → `vibecode-checker(gvskb)` → 하네스다. 하네스나 코딩 에이전트가 레지스트리를 직접 조회하지 않는다.
- 기능 구현 언어는 Python과 JavaScript로 제한한다. 다른 언어 생태계 패키지가 필요하면 구현 방향을 승인 트랙으로 다시 잡거나 검토 필요로 표시한다.
- core/approved는 넓게 허용한다.
- restricted는 경고와 조건을 붙인다.
- unknown은 안전 통과가 아니다. MONITOR에서는 기록·경고 후 진행할 수 있지만 대체 패키지를 먼저 제안한다. WARN/ENFORCE에서는 `harness-enforcement-contract.yaml`의 mode 표에 따른다.
- denied는 강하게 차단한다.
- MCP `scan_dependencies` 결과의 `verdict`는 하네스 집행 기준이며, 최종 승인/불허 자체는 담당자·레지스트리·플랫폼 결정이다.
- 플랫폼이 도입되면 플랫폼 정책은 레지스트리에 반영되고, 하네스는 계속 gvskb verdict를 통해 집행한다.
- `malicious`, `registry_rejected`, `not_found`, `in_kev=true`는 모든 mode에서 차단한다.
- `not_found`는 공식 저장소 부재이므로 AI 환각/슬롭스쿼팅 위험으로 보고 설치하지 않는다.
- `kev_checked=false`이면 `in_kev=false`를 안전 근거로 쓰지 않는다.
- `version_exact=false`인 취약점 판정만으로는 설치를 막지 않고, 정확한 버전 확인/lockfile/안전 버전 고정을 요구한다.
- ENFORCE에서 `unknown` 차단은 `source_scope=single/manifest` 직접 의존성에만 적용한다. `lockfile/installed` 전이 의존성은 unknown만으로 차단하지 않는다.
- `registry_status`는 `ok`일 때만 기관 판정이 있는 것이다. `item_failed`, `rejected`, `unreachable`, `unauthorized`, `disabled` 및 알 수 없는 값은 허용 근거가 아니다.
- 오래된 registry rejected 캐시는 계속 차단하며, “거절 이력은 있으나 최신 확인이 필요”라고 설명한다.
- 기존 패키지의 typosquat 휴리스틱은 하네스에서 차단하지 않고 경고한다. 레지스트리는 자동 승인만 보류할 수 있다.
- 체커가 없으면 사용자에게 `https://github.com/Lex6won/vibecode-checker` 기반 설치/준비 여부를 확인한다. 사용자 확인 전에는 설치하지 않는다.
- `shared/references/package-alternatives.yaml`의 순서대로 표준 라이브러리, 골든 템플릿 기본 패키지, 승인 core 패키지, 조건부 패키지, 기능 축소안을 먼저 검토한다.
- 차단/보류 패키지를 발견하면 반드시 verdict, 적용 mode, env_grade, 대체안, 안전 버전 또는 cooldown 대기일, 구현 방향, 기능 영향, 남는 검토사항을 같이 출력한다.
- 일반 사용자에게는 필드명을 길게 보여주지 않는다. 통과는 조용히, 차단은 한 줄 조치 중심으로 안내하고 상세 필드는 보고서/manifest에 기록한다.

## 강차단 후보
외부 BaaS SDK, CDN 의존, postinstall 필수, eval/new Function, 미유지 패키지, 금지 라이선스. typosquat 의심은 기존 패키지라면 경고/검토로 보내고, 공식 저장소에 없는 `not_found`라면 차단한다.

## 출력
- 승인 패키지 사용
- restricted 경고
- denied 대체안
- 패키지 예외신청서 후보
- `proposed-approved`, `needs-review`, `denied-candidate` 등 검토 상태
- 대체 패키지 또는 no-new-package 구현 경로
