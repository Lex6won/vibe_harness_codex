# vibecode-checker / gvskb 연계 기준

하네스는 보안점검 엔진이 아니다. `vibecode-checker(gvskb)`가 코드와 패키지를 검사하고, 레지스트리 서비스가 패키지 허용·불허·보류 결정을 관리한다. 하네스의 역할은 체커가 돌려준 결과를 공무원과 코딩 에이전트가 실제로 지키게 만드는 것이다.

## 1. 기본 호출 원칙

1. MCP가 연결되어 있으면 `vibecode-checker` MCP를 우선 사용한다.
2. MCP가 없고 CLI가 가능하면 `gvskb` CLI를 사용한다.
3. 둘 다 없으면 `shared/references/checker-bootstrap-policy.md`에 따라 사용자에게 설치/준비 여부를 확인한다.
4. 사용자가 동의하면 GitHub `https://github.com/Lex6won/vibecode-checker` 기반 설치 또는 로컬 반입 경로 지정으로 진행한다. 사용자 확인 전에는 clone, pip install, MCP 설정 변경을 하지 않는다.
5. 체커가 끝내 연결되지 않으면 기획·설계는 계속할 수 있지만, 패키지 설치·운영 이관·보안검증 완료 처리는 하지 않는다.
6. 패키지 결정은 레지스트리에 직접 묻지 않는다. 하네스는 `scan_dependencies` 또는 동등한 gvskb 기능을 호출하고, gvskb가 레지스트리 판정까지 포함한 단일 verdict를 반환한다고 본다.
7. 소스 보안점검은 `_workspace` 문서가 아니라 실제 소스 경로인 `_workspace/source/` 또는 사용자가 지정한 코드 경로를 대상으로 한다.

## 2. 하네스가 읽어야 하는 필드

패키지 단위로는 다음 필드를 우선 읽는다.

- `verdict`
- `verdict_severity`
- `requires_review`
- `checked`
- `is_malicious_package`
- `in_kev`
- `max_cve`
- `cooldown.ok`
- `registry_status`
- `registry_decision`
- `heuristics.typosquat_warning`

manifest/lockfile 단위로는 다음 필드를 기록한다.

- `truncated_count`
- `unchecked_count`
- `intel_cache.state`
- `registry_status`
- `source_kind`

필드가 없으면 “안전”이 아니라 “판정 근거 부족”으로 본다. 특히 `checked=false`, `unknown`, `error`는 안전 통과가 아니다.

## 3. verdict 우선순위

동일 패키지에 여러 신호가 있으면 아래 순서가 강하다.

1. `malicious`
2. `registry_rejected`
3. `not_found`
4. `vulnerable`
5. `cooldown_hold`
6. `checked_stale`
7. `registry_approved`
8. `checked_clean`
9. `unknown`
10. `error`

다음은 운영 모드와 관계없이 무조건 차단한다.

- `verdict == malicious`
- `verdict == registry_rejected`
- `verdict == not_found`
- `in_kev == true`

`not_found`는 단순 경고가 아니다. 공식 PyPI/npm 저장소에 없는 이름이면 AI가 지어낸 패키지명일 수 있고, 공격자가 나중에 같은 이름을 등록하는 slopsquatting 위험이 있으므로 설치 전에 막는다.

## 4. enforcement mode 해석

하네스는 기관 프로파일의 `harness_enforcement.default_mode`를 따른다. 레지스트리 실데이터가 적거나 0건인 초기 도입 기본값은 `MONITOR`다. 권장 운영안은 MONITOR 2주 관찰 후 보안·운영 확인을 거쳐 WARN으로 전환하는 것이다.

| 상태 | MONITOR | WARN | ENFORCE |
|---|---|---|---|
| malicious / registry_rejected / not_found / in_kev | block | block | block |
| vulnerable CRITICAL/HIGH | warn | block | block |
| vulnerable MEDIUM/LOW | log | warn | block |
| vulnerable UNKNOWN | warn | warn | block |
| cooldown_hold | log | warn | block |
| checked_stale | log | warn | warn |
| unknown / error | log | warn | block |
| registry_approved + checked=true | pass | pass | pass |
| registry_approved + checked=false | pass | warn | warn |
| checked_clean | pass | pass | pass |
| 기존 패키지 typosquat warning | warn | warn | warn |

MONITOR는 도입 초기 관찰 모드, WARN은 운영 기본값 후보, ENFORCE는 체커와 레지스트리 커버리지가 충분할 때 사용한다. 운영 모드 선택은 보안·운영팀 정책이다.

타이포스쿼팅 신호는 휴리스틱이다. 하네스에서는 기존 패키지에 대한 단독 차단 근거로 쓰지 않고 경고로만 제시한다. 다만 레지스트리는 같은 신호를 자동 승인 보류(`UNDER_REVIEW`) 근거로 쓸 수 있다. 공식 저장소에 없는 `not_found`는 휴리스틱이 아니라 사실 확인이므로 절대 차단이다.

## 5. env_grade

체커 호출 시 가능한 경우 `env_grade`를 전달한다. 하네스가 환경을 판단하며, 개발자에게 낮은 등급을 직접 고르게 하지 않는다.

- E0: 개인 PC 1회성, 공개/더미 데이터. cooldown 기본 3일.
- E1: 개인 PC 반복 사용, 내부 문서/자료. cooldown 기본 7일.
- E2: 내부 서버, 공용 환경, 행정정보, CI/CD. cooldown 기본 14일, 자동 승인 금지.
- E3: 대민, 개인정보, 인증, 핵심 행정정보. 하네스는 증거와 산출물을 준비할 수 있지만 운영 승인을 단독 처리하지 않는다.

개인 PC 하네스 기본값은 E1, 내부 서버나 CI는 E2, 대민·민감정보 운영은 E3로 기록한다. E1에서 E2로 올리는 것은 자유롭지만, E1에서 E0로 낮추려면 사유와 승인 기록이 필요하다.

## 6. 레지스트리와 로컬 카탈로그 우선순위

- 로컬 denylist는 항상 로컬 allowlist보다 강하다.
- gvskb가 `registry_rejected`를 반환하면 로컬 allowlist에 있어도 차단한다.
- 로컬 denylist가 차단하면 레지스트리 승인 여부와 무관하게 차단한다.
- 로컬 allowlist와 gvskb의 `registry_approved` 또는 `checked_clean`이 함께 있으면 통과할 수 있다.
- 로컬 allowlist가 있어도 gvskb가 `unknown`, `error`, `cooldown_hold`, `checked_stale`, `checked=false`를 반환하면 enforcement mode로 판단한다.
- 로컬 항목이 없어도 gvskb가 `registry_approved` 또는 `checked_clean`을 반환하면 mode와 성숙도에 따라 통과 또는 proposed-approved로 기록한다.

오래된 registry rejected 캐시는 경고로 낮추지 않는다. “거절 이력은 있으나 현재 레지스트리 확인이 오래됨/불가”라고 표시하고 계속 차단한다.

## 6-1. 판정 신선도 비대칭 규칙

통과 방향과 차단 방향은 freshness를 다르게 적용한다.

| 방향 | 신선도 미달 | 재호출 실패 시 |
|---|---|---|
| 통과/허용 | 재호출 필요 | 통과시키지 않고 `unknown`/`error` 모드 규칙 적용 |
| 차단/불허 | 가능하면 재호출 | 오래된 차단 유지, `stale` 표기 |

즉, 느슨해지는 방향에는 최신 근거를 요구하고, 엄격해지는 방향에는 최신 근거가 없어도 기존 차단을 유지한다. 특히 오래된 `registry_rejected`는 fresh한 비거절 판정이 나오기 전까지 계속 차단한다.

## 7. 조건부 승인과 무결성

체커나 레지스트리가 조건을 반환하면 하네스는 조건을 실제로 지킬 수 있을 때만 허용한다.

예시:

- 특정 버전 고정
- lockfile 필수
- 내부 미러만 사용
- `npm ci --ignore-scripts`
- 개발 전용 사용
- 외부 API 호출 금지
- 브라우저 직접 DB/외부 BaaS SDK 사용 금지

조건을 강제할 수 없으면 `needs-review` 또는 `block`으로 처리한다. 이름과 버전은 같은데 hash가 다르면 WARN/ENFORCE에서는 차단하고 담당자 검토로 보낸다.

## 8. 사용자에게 보여줄 차단 메시지

차단은 “안 됩니다”로 끝나면 안 된다. 반드시 아래를 함께 보여준다.

- 차단된 패키지 또는 행동
- checker verdict, severity, 핵심 증거
- 적용된 mode와 env_grade
- 권장 대체 패키지 또는 표준 라이브러리 구현
- 안전 버전이 있으면 해당 버전
- cooldown이면 남은 대기일
- 대체가 불가능하면 패키지 검토요청서 또는 예외신청서 경로
- 기능 영향과 남는 위험

## 9. 감사 메타데이터

체커가 지원하면 다음 값을 보낸다.

- `caller: harness:auto`
- `request_type: AUTO` 또는 `MANUAL`
- `project_id`
- `maturity_level`
- `env_grade`
- `track`
- `requested_package`

다음은 보내지 않는다.

- 개인 이름
- 개인 이메일
- 사번
- 주민등록번호
- 비밀값
- private registry token

## 10. 한계

`scan_dependencies` 결과가 깨끗하다는 말은 “현재 룰과 데이터에서 차단 증거를 찾지 못했다”는 뜻이지 안전을 증명한다는 뜻이 아니다. 정확도는 취약점 DB, 악성 패키지 인텔리전스, 레지스트리 메타데이터, lockfile 품질, transitive dependency 가시성, 오프라인 캐시 신선도에 좌우된다.

하네스도 다음을 완전히 막을 수는 없다.

- 사용자가 하네스 밖 터미널에서 직접 `pip install` 또는 `npm install` 하는 행위
- 이미 설치된 패키지의 과거 사용
- 하네스를 우회하는 IDE/코딩 에이전트
- 사용자가 로컬 정책 파일을 임의 수정하는 행위

따라서 L2/L3/L4 이관 시에는 반드시 다시 체커 결과와 manifest evidence를 확인한다.
