# vibe_harness_codex

공공기관 공무원이 바이브코딩으로 업무 도구를 구상·시제품화·내부도구화하고, 정식 운영이 필요할 때 운영팀과 보안팀이 이어받을 수 있는 산출물을 남기도록 돕는 **공공 바이브코딩 표준 운영 하네스**입니다.

이 저장소는 [`revfactory/harness-100`](https://github.com/revfactory/harness-100)의 “전문 에이전트 팀 + 오케스트레이터 스킬 + 보조 스킬 + 구조화 산출물” 방식을 참고했습니다. 단, 목적은 범용 하네스 모음이 아니라 **행정망/외부망, 공공 보안, 승인 패키지, 배포·이관 산출물**을 지키는 공공 특화 하네스입니다.

## Codex 하네스의 위치

Claude 하네스가 빠르게 시제품을 만들기 좋은 현장 실행형이라면, Codex 하네스는 여러 기관과 여러 AI 코딩 도구가 같은 기준으로 움직이도록 돕는 표준 운영형입니다.

겉으로는 초보 공무원이 쉽게 따라갈 수 있는 업무 코치처럼 작동하고, 내부적으로는 기관 프로파일·골든 템플릿·체커 검증·최종 제출 증적을 일관되게 남기는 운영 레일입니다.

핵심 정의는 다음입니다.

> 초보 공무원에게는 쉬운 길을 보여주고, 기관 담당자에게는 검증 가능한 표준 산출물을 남겨주는 공공 바이브코딩 운영 하네스.

## 하네스 주제

**공공 바이브코딩 표준 운영 하네스**입니다.

공무원이 “이런 업무 도구가 필요하다”고 말하면, AI가 업무 요구를 구체화하고 공공 운영환경에 맞는 개발 방향을 잡아주며, 보안·패키지·행정망/외부망 제약을 놓치지 않도록 돕습니다.

주요 대상은 다음과 같습니다.

- 공무원이 직접 만들어보는 내부 업무 보조 도구
- 엑셀/파일 기반 집계·조회·대시보드
- 부서 단위 시제품 또는 내부도구
- 정식 개발환경으로 이관할 후보 서비스
- 보안성검토·서버 설치·배포신청 산출물이 필요한 바이브코딩 결과물

## 구성 목적

이 하네스의 목적은 공무원을 전문 개발자로 바꾸는 것이 아닙니다.

목표는 다음입니다.

1. 공무원이 업무 아이디어를 쉽게 설명하도록 돕는다.
2. AI가 화면, 입력, 처리, 출력, 저장 여부를 구체화한다.
3. 공공 운영환경에 맞는 Track, 인증, DB, 패키지, 네트워크 기준을 자동으로 적용한다.
4. 골든 템플릿 안에서만 구현해 기술스택이 임의로 흐르지 않게 한다.
5. 위험한 패키지·플러그인·외부서비스가 막히더라도 승인된 대체 패키지나 대체 구현 경로를 제시한다.
6. 개발 중에는 가볍게, 배포·이관 시에는 엄격하게 산출물을 만든다.
7. 운영팀·보안팀이 이어받을 수 있도록 필요한 최소 증적을 남긴다. 배포 전 기본 제출은 체커 HTML/JSON 리포트 2종이며, 배포가이드와 신청서는 조건부다.

즉, 이 하네스는 **공무원 친화적인 업무 구상 경험**과 **공공 운영에 필요한 절차·증거 체인**을 동시에 만족시키기 위한 실행 구조입니다.

## At a Glance

| 항목 | 내용 |
|---|---:|
| 전문 에이전트 | 16개 |
| 스킬 | 15개 |
| 골든 템플릿 | 6개 |
| 성숙도 단계 | L0~L4 |
| 하네스 공식 저장소 | `https://github.com/Lex6won/vibe_harness_codex` |
| 체커 공식 저장소 | `https://github.com/Lex6won/vibecode-checker` |
| Codex 최상위 진입점 | `AGENTS.md` |
| 운영 컨셉 | 여러 AI 코딩 도구가 같은 정책·템플릿·검증 기준을 따르는 표준 운영 하네스 |
| 초보자 기본 UX | 구상 → 표준 템플릿 구현 → 필요한 때만 보안점검 → 배포 전 리포트 2종 안내 |
| 기관별 1차 설정 파일 | `shared/institution-profile.yaml` |
| 기관별 2차 패키지 정책 | `shared/references/approved-packages.yaml`, `shared/references/package-denylist.yaml` |
| 벤더 중립 선언 파일 | `shared/harness.yaml` |
| 런타임 선택 정책 | `shared/references/runtime-selection-policy.yaml` |
| 생명주기 품질 게이트 | `shared/references/lifecycle-quality-gates.yaml` |
| 하네스 집행 계약 | `shared/references/harness-enforcement-contract.yaml` |
| 패키지 거버넌스 | `shared/references/package-governance.yaml` |
| 패키지 대체안 정책 | `shared/references/package-alternatives.yaml` |
| 패키지 설치 게이트 | `shared/enforcement/gvskb_gate.py`, `shared/enforcement/gvskb_gate.js` |
| Registry 연계 정책 | `shared/references/trusted-registry-integration.yaml` |
| 공무원용 코칭 문구 | `shared/assets/coaching-messages.md` |
| 주요 네트워크 프로파일 | 행정망 / DMZ·외부망 / 인터넷 시제품 |
| 검증 스크립트 | `shared/scripts/gg-validate.ps1` |
| 최종 스모크 테스트 | `shared/scripts/harness-final-smoke.mjs` |
| 체커 설치 보조 | `shared/scripts/checker-bootstrap.mjs` |
| 레지스트리 카탈로그 export | `shared/scripts/package-catalog-export.mjs` |

설치와 업데이트의 기준은 로컬 복사본이 아니라 위 두 GitHub 저장소입니다. 기관별 차이는 하네스 소스를 갈라치기하지 말고 `shared/institution-profile.yaml`을 먼저 수정해 반영합니다.

## 기관별 적용

다른 시군·기관에서 사용할 때는 처음부터 모든 정책 파일을 열지 않습니다. 먼저 아래 두 축만 확인합니다.

```text
shared/institution-profile.yaml
shared/references/approved-packages.yaml
shared/references/package-denylist.yaml
```

`shared/institution-profile.yaml`에는 개발서버와 운영서버 환경, 허용 개발언어, 허용 DBMS, 사용 가능한 AI 도구·MCP·플러그인, 기관별 추가 허용/제한/차단 라이브러리를 적습니다. 패키지 seed를 기관 미러 기준으로 조정해야 하면 `approved-packages.yaml`과 `package-denylist.yaml`만 먼저 봅니다. 하네스는 기관 프로파일을 최우선 기준으로 보고, 나머지 `shared/references/` 파일들은 공통 정책 엔진과 기본 카탈로그로 사용합니다.

기관별로 자주 바꾸는 항목은 다음입니다.

- 개발환경: 개발 PC/개발망, 인터넷 접근, 패키지 설치 방식, 개발용 DBMS
- 운영환경: 운영망/DMZ, OS, 컨테이너 런타임, 설치 경로, healthcheck, 로그
- 기술 제한: Python/JavaScript(Node.js) 허용 언어와 버전, PostgreSQL/SQLite 등 DBMS 허용 범위
- 플러그인/MCP: Codex, Claude Code, Lovable, GitHub, 문서 연동, `vibecode-checker` 사용 정책
- 라이브러리: 공통 승인 패키지 외 기관별 추가 허용/제한/차단 목록
- 서버 프로파일: small/standard/large_or_special 등 CPU·메모리 기준과 권장 서비스 유형

작성 기준은 `shared/references/institution-profile-guide.md`에 정리되어 있습니다.

처음에는 아래 파일을 수정 대상으로 보지 않는 것이 좋습니다. 이 파일들은 기관별 값이 아니라 공통 판정 로직에 가깝습니다.

- `shared/references/lifecycle-quality-gates.yaml`
- `shared/references/checker-integration.md`
- `shared/references/harness-enforcement-contract.yaml`
- `shared/references/runtime-selection-policy.yaml`
- `shared/references/trusted-registry-integration.yaml`

개발언어는 사용자가 직접 고르게 하기보다, 기관 프로파일과 서버 사양을 기준으로 하네스가 먼저 추천합니다. 이 기준은 아래 파일에 있습니다.

```text
shared/references/runtime-selection-policy.yaml
```

예를 들어 내부 대시보드는 작은 서버에서 Streamlit/Python 후보가 우선이고, 파일 업로드나 내부 CRUD 웹은 Nginx + FastAPI + PostgreSQL 후보가 우선입니다. React가 필요한 경우에도 구현 소스는 JavaScript로 제한하고, Node.js는 운영 런타임이라기보다 정적 빌드 도구로 다루며, 운영은 Nginx 정적 파일 + 승인 백엔드 구조를 우선합니다.

AI 도구가 공통으로 읽을 하네스 선언은 아래 파일에 있습니다.

```text
shared/harness.yaml
```

이 파일은 기관 프로파일, 주요 reference, 어댑터, 권한 모델, 안전한 산출물 경로, 검증 스크립트를 한곳에 묶습니다.

## Codex와 Claude Code 분리 원칙

이 저장소의 중심은 Codex용 하네스입니다.

- Codex 기준 원본: `AGENTS.md`, `shared/`, `shared/harness.yaml`
- 기관별 설정: `shared/institution-profile.yaml`
- 권한과 safe output: `shared/references/permission-model.yaml`
- Claude Code 호환본: `.claude/`

`.claude/`는 Claude Code가 바로 읽을 수 있게 둔 호환본입니다. Claude가 별도 하네스를 관리한다면 이 저장소의 `.claude/`는 참고용으로만 보고, Codex 하네스의 원본 기준으로 보지 않습니다.

## 전체 구조

```text
vibe_harness_codex/
├── AGENTS.md                         # Codex 최상위 진입점
├── .codex/config.toml                # Codex CLI/IDE용 프로젝트 MCP 설정
├── .mcp.json                         # 공통 MCP 설정
├── shared/
│   ├── institution-profile.yaml      # 기관별 단일 설정 파일
│   ├── harness.yaml                  # 도구 중립 하네스 선언
│   ├── golden-templates/             # 구현 가드레일이 담긴 실행 템플릿
│   ├── references/                   # 정책·운영·보안 기준
│   ├── assets/                       # 공무원용 코칭 문구와 UX 자산
│   ├── scripts/                      # 검증·패키징 스크립트
│   └── templates/                    # PRD/설계/검증/신청 산출물 템플릿
├── adapters/                         # Codex, Claude Code, Lovable 어댑터
├── .claude/                         # Claude Code 호환본, Codex 원본 아님
│   ├── CLAUDE.md                     # Claude Code 호환본
│   ├── agents/                       # Claude Code용 전문 에이전트 복사본
│   └── skills/                       # Claude Code용 스킬 복사본
├── evals/                            # 대표 평가 시나리오
└── .github/workflows/                # CI 검증 초안
```

Codex 기준 핵심 진입점은 다음입니다.

```text
AGENTS.md
shared/harness.yaml
shared/institution-profile.yaml
shared/references/permission-model.yaml
```

`.claude/`는 Claude Code에서 같은 하네스를 실행하기 위한 호환본입니다. Codex 하네스의 원본 기준은 아닙니다.

Claude Code 호환 진입점은 다음입니다.

```text
.claude/CLAUDE.md
.claude/skills/gg-vibecode/skill.md
```

## 작동 흐름

```text
겉으로 보이는 기본 흐름:

업무 아이디어
→ 만들 화면·입력·출력 정리
→ 기관 표준 템플릿으로 구현
→ 위험할 때만 quick 점검
→ 배포 전 full 점검과 최종 리포트 2종 제출 안내
```

내부 운영 흐름:

```text
사용자 범위 확인
→ 목표 성숙도 판정
→ 화면·입력·출력 구상
→ 행정망/외부망·데이터 위험 판정
→ Track·DB·인증·운영환경 결정
→ 골든 템플릿 선택
→ 구현
→ quick/standard/full 보안검증
→ 배포 전 체커 최종 리포트 2종 생성·제출 안내
```

quick/standard/full은 하네스 단계 이름이고, 실제 체커 호출에는 별도 checker profile을 매핑합니다. 개발 중 quick 점검은 체커 표준 프로파일 `dev-quick`을 사용합니다. `admin-network`, `dmz-public`, `internet-prototype`은 망 구분용 `network_profile`이지 체커 `scan_path(profile=...)` 값이 아닙니다.

하네스는 기본적으로 체커 내장 프로파일을 사용합니다. 기관 고유 정책을 따로 만들기 전에는 `GVSKB_POLICIES_DIR`을 쓰지 않습니다. 꼭 써야 한다면 `.claude/...` 같은 상대경로가 아니라 설치/부트스트랩 단계에서 계산한 절대경로를 사용해야 합니다. 검사 후에는 체커 결과의 `profile`이 요청한 checker profile과 같은지 확인하고, 다르면 검증 미완료로 처리합니다.

예를 들어 `dev-quick`을 요청했는데 현재 설치된 체커가 이를 알 수 없는 프로파일로 보고 `public-default-strict`로 대체했다면, quick 점검은 완료된 것이 아닙니다. GitHub 기준 최신 체커로 갱신하거나 기관 정책 경로를 절대경로로 바로잡은 뒤 다시 확인해야 합니다.

체커 MCP 설정은 `gvskb mcp`가 아니라 `gvskb-server` 또는 `python -m gvskb.server`로 실행해야 합니다. Windows에서 `python`이 Microsoft Store 별칭인 경우가 있으므로 기본 배포 설정은 `gvskb-server`를 사용합니다. 공통 MCP 설정은 루트 `.mcp.json`에 두고, Codex CLI/IDE는 `.codex/config.toml` 또는 사용자 전역 `~/.codex/config.toml`의 `[mcp_servers.vibecode-checker]`를 사용합니다. `GVSKB_MODE=offline`은 기본값이 아니며, 망분리·반입 환경으로 확인된 경우에만 설정합니다. 체커가 `profile_fallback`을 반환하면 `null`일 때만 정상 적용이며, 객체가 있으면 검증 미완료입니다.

L1 시제품은 빠른 결과물을 위해 축약 흐름을 사용합니다.

```text
사용자에게 보이는 흐름: 구상 → 만들기 → 확인
내부 실행 흐름: intake-guide → feature-discovery → template-engineer → gg-platform-coder → security-checker(quick, 필요 시) → qa-operator
```

위험 신호가 있으면 상세 흐름으로 승격합니다.

- 시민/도민 접근
- 개인정보/민감정보
- 파일업로드
- 지속 저장 DB
- 외부 API/CDN/LLM/MCP
- 공식 배포 또는 개발환경 이관 요청

## 사용 방법

### 1. GitHub에서 하네스 받기

새 기관이나 새 프로젝트는 공식 GitHub 저장소를 기준으로 하네스를 받습니다.

```powershell
git clone https://github.com/Lex6won/vibe_harness_codex.git
cd vibe_harness_codex
```

이미 받은 하네스는 같은 저장소에서 갱신합니다.

```powershell
git pull origin main
```

다른 시군·기관에 맞출 때는 우선 `shared/institution-profile.yaml`만 수정합니다. 특정 업무 프로젝트에 `AGENTS.md`와 `shared/`를 복사해 넣어야 하는 경우에도 원본과 업데이트 기준은 `https://github.com/Lex6won/vibe_harness_codex`로 기록합니다.

Claude Code용으로 사용할 때만 `.claude`를 함께 사용합니다. Claude가 별도 하네스를 관리한다면 `.claude`는 이 저장소에서 사용하지 않아도 됩니다.

### 2. AI 도구에서 시작

Codex 또는 Claude Code 등에서 다음처럼 요청합니다.

```text
우리 부서에서 엑셀 민원 현황 파일을 올리면 담당자별 처리 건수와 지연 건수를 대시보드로 보고 싶어.
```

또는 기존 코드 수정은 이렇게 요청합니다.

```text
지난번 만든 대시보드에 엑셀 다운로드 버튼만 추가해줘.
```

배포·이관 준비는 이렇게 요청합니다.

```text
이제 이 프로그램을 공식 개발환경으로 넘기고 보안성검토 신청 자료를 만들고 싶어.
```

배포 전 기본 제출자료는 하네스가 새로 쓰는 여러 신청서가 아니라 `vibecode-checker`가 저장한 최종 리포트 2종입니다.

- 사람용 HTML 리포트: `.check-reports/YYYY-MM-DD_HHMM_보안점검.html`
- 증적용 JSON 리포트: `.check-reports/YYYY-MM-DD_HHMM_보안점검.json`

하네스는 이 두 파일을 보안팀 또는 AX 전담팀에 제출해야 한다고 안내합니다. 이 리포트는 공식 승인서가 아니라 보안 검토 요청 증적입니다. 배포신청서, 예외신청서, 패키지 검토요청서, 서버설치 가이드는 기관 양식이나 미해결 예외가 있을 때만 조건부로 만듭니다.

### 3. 기관 프로파일 수정

새 시군·기관에 적용할 때는 `shared/institution-profile.yaml`에서 기관명, 개발/운영 서버, 언어·DBMS 제한, 사용 가능한 플러그인과 라이브러리 정책을 먼저 바꿉니다.

### 4. 검증 실행

하네스 구조를 검증합니다.

```powershell
powershell.exe -ExecutionPolicy Bypass -File .\shared\scripts\gg-validate.ps1 -Root . -Level L1
```

최종 방향이 유지되는지 스모크 테스트합니다.

```powershell
node .\shared\scripts\harness-final-smoke.mjs .
```

배포·이관 패키지를 만들 때는 다음을 사용합니다.

```powershell
powershell.exe -ExecutionPolicy Bypass -File .\shared\scripts\gg-package.ps1 -Workspace _workspace -OutDir dist
```

## 실행 예시

### 입력 프롬프트

```text
우리 부서에서 매주 받는 민원 엑셀 파일을 올리면,
담당자별 처리 건수, 지연 건수, 이번 주 증가 건수를 대시보드로 보고 싶어.
우선 우리 부서 직원만 쓰는 내부 시제품이면 돼.
```

### 하네스의 예상 판단

```yaml
work_mode: new-build
maturity_level: L1
service_exposure: internal-staff
network_profile: admin-network
data_level: yellow_candidate
track_candidate: streamlit-internal or fastapi-web
risk_flags:
  - file_upload
  - possible_personal_data
next_flow: thin-l1
```

### 하네스가 사용자에게 되묻는 방식

```text
이런 걸 만들게요.

- 엑셀 파일을 업로드한다.
- 담당자별 처리 건수와 지연 건수를 보여준다.
- 이번 주 증가 건수를 대시보드로 보여준다.
- 우선 우리 부서 직원만 보는 내부 시제품으로 만든다.
- 실제 개인정보 대신 테스트 데이터 기준으로 만든다.

맞나요?
```

### 선택되는 구현 방향 예시

```text
템플릿: shared/golden-templates/gg-dashboard
네트워크: admin-network
외부통신: 없음
CDN: 사용 안 함
패키지: 승인 후보 또는 별도 패키지 정책 결과 참조
검증: quick
```

## 결과 예시

L1 시제품 완료 시 `_workspace`에는 최소한 다음이 남습니다.

```text
_workspace/
├── 00_feature_brief.md              # 만들 기능과 화면 요약
├── 00_작업현황.md                   # 현재 단계, 결정사항, 위험 플래그
├── source/                          # 골든 템플릿 기반 구현 소스
└── vibecode-manifest.json           # 작업 모드, 성숙도, Track, 산출물 상태
```

L2 내부도구로 승격하면 필요한 범위에서 다음 산출물이 추가됩니다. L3 배포 전 기본 제출물은 체커 최종 리포트 2종이며, 아래 문서들은 조건부입니다.

```text
_workspace/
├── 01_PRD_서비스기획서.md
├── 02_화면_기능설계서.md
├── 03_DB_테이블정의서.md
├── 04_개발스택_운영환경.md
├── 05_보안점검보고서.md              # standard 점검 요약, 필요 시
├── source/.check-reports/
│   ├── YYYY-MM-DD_HHMM_보안점검.html # L3 기본 제출 1
│   └── YYYY-MM-DD_HHMM_보안점검.json # L3 기본 제출 2
├── 07_서버설치_배포가이드.md         # 운영팀 설치 인계 필요 시
├── 08_배포신청서.md                  # 기관 양식 요구 시
├── 09_예외신청서.md                  # 예외 승인 필요 시
└── 10_패키지예외신청서.md            # 패키지 예외 필요 시
```

예상 `vibecode-manifest.json` 일부:

```json
{
  "project_id": "civil-dashboard-demo",
  "work_mode": "new-build",
  "maturity_level": "L1",
  "service_exposure": "internal-staff",
  "network_profile": "admin-network",
  "runtime_external_access": "none",
  "data_level": "yellow",
  "track": "streamlit-internal",
  "gates": {
    "template_ready": true,
    "dev_ready": true,
    "security_status": "quick-ok"
  }
}
```

## 성숙도 단계

모든 결과물을 곧바로 정식 서비스로 보지 않습니다. 현재 목표 단계를 먼저 정하고, 단계에 맞는 절차와 검증 강도를 적용합니다.

| 단계 | 이름 | 의미 | 검증 강도 |
|---|---|---|---|
| L0 | 아이디어 구체화 | 화면·기능·입력·출력을 정리 | 문서 점검 |
| L1 | 시제품 | 내부 데모, 더미 데이터, 제한 사용 | quick |
| L2 | 내부도구 | 부서/기관 내 실제 업무 보조 | standard |
| L3 | 정식 서비스 후보 | 배포·공식 개발환경 이관 준비, 보안팀/AX 전담팀 제출 | full MCP + 최종 리포트 2종 |
| L4 | 정식 운영 | 승인된 운영환경 운영 | 하네스 단독 판정 금지 |

L1은 `shared/references/thin-l1-policy.md`에 따라 문서와 에이전트 홉을 줄입니다. 시민 접근, 개인정보, 외부통신, 파일업로드, 지속 저장 DB가 있으면 L2/L3 흐름으로 승격합니다.

## Agent Team

아래 16개 역할은 하네스의 논리적 팀 구조입니다. Codex에서는 `AGENTS.md`와 `shared/` 정책으로 이 역할을 따르고, Claude Code에서는 `.claude/agents/` 호환본으로 같은 역할을 실행합니다.

| 에이전트 | 역할 |
|---|---|
| `intake-guide` | 사용자 범위와 작업 모드 접수 |
| `stage-advisor` | L0~L4 성숙도 단계 판정 |
| `feature-discovery` | 화면·입력·처리·출력 구상 |
| `prd-writer` | PRD 서비스기획서 작성 |
| `public-risk-analyst` | 행정망/외부망, 데이터 신호등, 위험 플래그 판정 |
| `platform-architect` | Track, 인증, DB, 운영환경 결정 |
| `data-modeler` | DB 테이블정의서 작성 |
| `template-engineer` | 골든 템플릿 선택 및 source 준비 |
| `gg-platform-coder` | 운영환경 기준에 맞춘 신규 구현 |
| `change-coder` | 기존 코드 수정 경량 흐름 |
| `security-checker` | vibecode-checker MCP/CLI 검증 게이트 |
| `qa-operator` | 실행성, health, smoke test 확인 |
| `release-packager` | 배포·이관 준비 상태 점검 |
| `deploy-doc-writer` | 운영팀 설치 인계가 필요할 때 서버설치·배포가이드 작성 |
| `submit-packager` | 체커 최종 리포트 2종 제출 안내, 조건부 신청서·예외신청서 작성 |
| `pilot-evaluator` | 파일럿 효과 평가 |

## Skill System

스킬 계층은 Claude Code 호환본에 실제 파일로 들어 있습니다. Codex에서는 같은 정책을 루트 `AGENTS.md`, `shared/harness.yaml`, `shared/references/`를 통해 읽습니다.

`harness-100`의 계층형 스킬 구조를 참고해 다음처럼 나눴습니다.

| 계층 | 스킬 | 역할 |
|---|---|---|
| Orchestrator | `gg-vibecode` | 전체 팀 라우팅과 오류/승격 처리 |
| Codex Wrapper | `gg-vibe` | Codex 호환 진입점 |
| Mode Skill | `gg-change`, `gg-release`, `gg-pilot` | 수정·배포이관·파일럿 평가 모드 |
| Step Skill | `gg-start`, `gg-plan`, `gg-design`, `gg-dev`, `gg-check`, `gg-submit` | 단계별 실행 |
| Policy Skill | `data-triage`, `track-selection`, `package-policy`, `socratic-interview` | 위험·Track·패키지·질문 규칙 |

## Golden Templates

코드는 빈 폴더에서 임의로 만들지 않고, 골든 템플릿 안에서 확장하는 것을 원칙으로 합니다.

| 템플릿 | 용도 |
|---|---|
| `gg-webapp` | FastAPI 기반 내부 웹/API |
| `gg-dashboard` | Streamlit 기반 내부 대시보드 |
| `gg-upload` | 파일 업로드/검증 도구 |
| `gg-node-api` | 기관 프로파일의 Node 버전 + Express API |
| `gg-spa` | React + Vite 정적 SPA |
| `gg-rag` | 외부 LLM 없는 폐쇄망 우선 문서검색 템플릿 |

각 템플릿은 최소한 `/health`, dependency file, Dockerfile 또는 실행 기준, `.env.example`을 포함하도록 관리합니다.

## Quality Standards

이 하네스는 다음 기준을 지향합니다.

- Agent Team Mode: 전문 에이전트별 역할 분리
- Structured Outputs: PRD, 화면/기능, DB, 개발스택, 보안점검, 배포신청 산출물
- Dependency DAG: 신규/수정/배포·이관/파일럿 흐름 분리
- Scale Modes: L1 thin mode / L2 internal tool / L3 release readiness
- Error Handling: `pass`, `warn`, `block`, `needs-user`, `done` 상태값
- Public-Sector Guardrails: 행정망/DMZ 분기, CDN·외부 API·패키지 정책, MCP 검증
- Runtime Selection: 서버 사양과 기관 정책 기반 언어·프레임워크·DBMS 추천
- Package Governance: MCP 증거, 담당자 검토, 향후 플랫폼 연계를 분리
- Package Replacement: 차단/보류 패키지에 대해 표준 라이브러리, 골든 템플릿, 승인 core 패키지, 조건부 패키지, 기능 축소안을 순서대로 제안
- Lifecycle Gates: 아이디어·설계·구현·테스트·배포 단계별로 필요한 만큼만 산출물을 만들고 위험할 때만 승격
- Safe Outputs: 권한 모델과 허용 산출물 경로를 분리해 외부 쓰기·배포·푸시를 통제
- Golden Templates: 승인 Track에 맞는 템플릿 안에서 구현
- Validation: `gg-validate.ps1`와 GitHub Actions 초안

## Network and Security Policy

기관별 운영환경과 도구 제한의 단일 원본은 다음입니다.

```text
shared/institution-profile.yaml
```

AI 도구별 실행 컨텍스트와 안전한 출력 경로의 요약 원본은 다음입니다.

```text
shared/harness.yaml
shared/references/permission-model.yaml
```

네트워크/배포 정책의 단일 원본은 다음입니다.

```text
shared/references/network-profile.yaml
```

`.claude/references/deploy-context.yaml`은 호환용 포인터이며 직접 수정하지 않습니다.

기본 원칙:

- 행정망은 외부통신, CDN, 외부 SaaS SDK를 기본 금지합니다.
- 대민 서비스는 DMZ/외부망 후보이며 자동 승인하지 않습니다.
- 대민 서비스는 WAF/DAST/위원회 승인 플래그가 필요합니다.
- 보안검사 로직은 하네스가 직접 구현하지 않고 `vibecode-checker` 결과를 사용합니다.

## Checker·Registry·Package Policy

패키지 정책은 하네스 내부 고정 화이트리스트만으로 운영하지 않습니다. 체커와 레지스트리 서비스가 함께 판단하고, 하네스는 그 결과를 사용자 단에서 집행합니다.

역할은 이렇게 나눕니다.

1. 레지스트리 서비스: Python(PyPI)과 JavaScript/npm 패키지의 허용·불허·보류·조건부 승인 목록을 관리한다.
2. `vibecode-checker/gvskb`: 레지스트리 결정, 취약점, 악성 패키지, cooldown, 캐시 신선도를 합쳐 단일 `verdict`를 반환한다.
3. 하네스: `verdict`를 받아 설치·사용·배포 이관을 pass/warn/block으로 제한한다.

하네스는 일반 패키지 결정을 위해 레지스트리를 직접 호출하지 않습니다. 정상 경로는 하네스 → `vibecode-checker/gvskb` → 레지스트리 → `vibecode-checker/gvskb` → 하네스입니다.

새 패키지를 추가할 때는 하네스 게이트를 먼저 통과해야 합니다. 이 게이트는 개발 중 설치를 막아주는 얇은 안전장치이며, 최종 제출 문서를 추가로 만들지 않습니다.

```powershell
# Python/PyPI 단일 패키지 확인
python .\shared\enforcement\gvskb_gate.py check requests --ecosystem pypi

# 확인 후 pip install
python .\shared\enforcement\gvskb_gate.py install requests --ecosystem pypi

# JavaScript/npm 단일 패키지 확인
node .\shared\enforcement\gvskb_gate.js check axios

# 확인 후 npm install, 기본값은 --ignore-scripts
node .\shared\enforcement\gvskb_gate.js install axios

# 개발 중 매니페스트 확인. 최종 리포트 생성은 아님
python .\shared\enforcement\gvskb_gate.py verify-manifest .\requirements.txt --ecosystem pypi
node .\shared\enforcement\gvskb_gate.js verify-manifest .\package.json
```

Windows에서 `python`이 Microsoft Store 별칭이면 실제 Python 경로를 지정합니다.

```powershell
$env:GVSKB_GATE_PYTHON="C:\Python313\python.exe"
```

템플릿 초기 설치처럼 이미 검토된 lockfile 또는 manifest를 그대로 설치하는 경우에는 일반 패키지 매니저를 쓸 수 있습니다. 다만 새 패키지를 추가하거나 버전을 바꾸는 순간에는 위 게이트를 먼저 사용합니다.

패키지 상태와 승인 흐름의 기준은 다음입니다.

```text
shared/references/harness-enforcement-contract.yaml
shared/references/package-governance.yaml
```

`malicious`, `registry_rejected`, `not_found`, `in_kev=true`는 모든 모드에서 차단합니다. `not_found`는 공식 저장소 부재이므로 AI가 지어낸 패키지명 또는 slopsquatting 위험으로 보고 설치하지 않습니다.

기존 패키지에 대한 타이포스쿼팅 신호는 휴리스틱이므로 하네스에서는 차단하지 않고 경고합니다. 레지스트리는 같은 신호를 근거로 자동 승인을 보류하고 `UNDER_REVIEW`로 보낼 수 있습니다.

레지스트리 실데이터가 적거나 0건인 초기 도입 시에는 기본 mode를 `MONITOR`로 둡니다. 권장안은 MONITOR 2주 관찰 후 보안·운영 확인을 거쳐 `WARN`으로 전환하는 것입니다. `ENFORCE`는 직접 의존성 기준 unknown 10% 이하와 버전 단위 등록 200건을 모두 3주 연속 충족한 뒤, 자동 전환이 아니라 보안·운영 검토를 거쳐 적용합니다.

gvskb의 2026-08-03 신호 변경도 반영합니다.

- `kev_checked=false`이면 `in_kev=false`를 “실제 악용 없음”으로 해석하지 않습니다.
- `version_exact=false`인 취약점 판정만으로는 설치를 막지 않고, 정확한 설치본 확인이나 버전 고정을 요구합니다.
- `source_scope=single/manifest`는 직접 의존성, `lockfile/installed`는 전이·관측 의존성으로 봅니다. ENFORCE에서 `unknown` 차단은 직접 의존성에만 적용합니다.
- `registry_status`는 `ok`일 때만 기관 판정이 있는 것으로 봅니다. 그 외 값과 새로 추가된 알 수 없는 값은 허용 근거가 아닙니다.

사용자 화면은 단순하게 유지합니다. 통과는 조용히 지나가고, 차단은 한 줄로 “무엇을 하지 못하고 무엇을 하면 되는지”만 보여줍니다. `kev_checked`, `source_scope`, 캐시 상태 같은 상세 필드는 담당자용 보고서와 manifest에 기록합니다.

MCP 검사 결과가 깨끗하더라도 안전 증명이나 공식 승인으로 기록하지 않습니다. 담당자, 레지스트리 서비스, 또는 향후 플랫폼이 최종적으로 `approved`, `restricted`, `denied`를 결정합니다.

패키지가 차단되거나 보류되면 하네스는 바로 예외신청으로 가지 않습니다. 먼저 아래 순서로 코딩 가능한 대체안을 찾습니다.

1. 표준 라이브러리 또는 플랫폼 기본 기능
2. 골든 템플릿에 이미 포함된 패키지
3. 승인 core 패키지
4. 조건을 기록한 restricted 패키지
5. checker가 제시한 안전 버전
6. cooldown 대기 후 재검토
7. 기능 범위 축소를 통한 no-new-package 구현
8. 그래도 불가능할 때 패키지 검토 요청 또는 예외신청

향후 플랫폼 연계는 아래 순서를 권장합니다.

- 1단계: 하네스가 JSON 검토 요청을 `outbox/package-review-requests/`에 생성하고 플랫폼이 수집
- 2단계: 플랫폼 API가 안정되면 인증·감사로그·멱등키를 갖춘 REST API로 전송
- 3단계: 대량 처리가 필요하면 내부 메시지 큐 사용
- 직접 DB write는 플랫폼이 스키마와 서비스 계정 정책을 제공할 때만 제한적으로 사용

## vibecode-checker 설치/연결

보안점검과 패키지 검사는 `vibecode-checker/gvskb`가 수행합니다. 하네스는 체커가 없을 때 자동으로 설치하지 않고, 사용자에게 먼저 확인합니다.

기본 설치·업데이트 출처는 다음 GitHub 저장소입니다.

```text
https://github.com/Lex6won/vibecode-checker
```

직접 준비할 때는 다음처럼 공식 저장소를 기준으로 받습니다.

```powershell
git clone https://github.com/Lex6won/vibecode-checker.git .\tools\vibecode-checker
```

이미 받은 체커는 같은 저장소에서 갱신합니다.

```powershell
git -C .\tools\vibecode-checker pull origin main
```

MCP 설정은 클라이언트별로 다르게 읽힙니다.

- 공통/Claude 계열 MCP 클라이언트: 루트 `.mcp.json`
- Codex CLI/IDE: `.codex/config.toml` 또는 사용자 전역 `~/.codex/config.toml`
- Claude Code 호환본: `.claude/.mcp.json`

Codex 전역에 직접 등록하려면 다음 명령을 사용할 수 있습니다.

```powershell
codex mcp add vibecode-checker `
  --env PYTHONUTF8=1 `
  --env PYTHONIOENCODING=utf-8 `
  -- gvskb-server
```

망분리·오프라인 환경으로 확인된 경우에만 offline 모드를 추가합니다.

```powershell
codex mcp add vibecode-checker `
  --env PYTHONUTF8=1 `
  --env PYTHONIOENCODING=utf-8 `
  --env GVSKB_MODE=offline `
  -- gvskb-server
```

체커가 연결되어 있지 않으면 하네스는 다음을 안내합니다.

```text
보안점검용 vibecode-checker가 현재 연결되어 있지 않습니다.
기획·설계는 계속할 수 있지만, 패키지 검사와 보안점검 완료 처리는 체커 연결 후 가능합니다.

GitHub https://github.com/Lex6won/vibecode-checker 를 기준으로 로컬에 설치/준비할까요?
```

설치 보조 스크립트는 JavaScript로 제공됩니다. 기본 실행은 설치하지 않고 계획만 보여줍니다.

```powershell
node .\shared\scripts\checker-bootstrap.mjs --target .\tools\vibecode-checker
```

사용자가 확인한 뒤에는 `--yes`를 붙입니다.

```powershell
node .\shared\scripts\checker-bootstrap.mjs --target .\tools\vibecode-checker --yes
```

Python 패키지 설치까지 하려면 별도 확인 후 `--install-python`을 추가합니다.

```powershell
node .\shared\scripts\checker-bootstrap.mjs --target .\tools\vibecode-checker --yes --install-python
```

망분리/offline 모드에서는 GitHub clone을 시도하지 않고, 외부망에서 받은 폴더를 반입해 로컬 경로로 지정합니다.

## 업데이트 원칙

- 하네스 업데이트: `git -C <vibe_harness_codex 경로> pull origin main`
- 체커 업데이트: `git -C <vibecode-checker 경로> pull origin main`
- 임의 ZIP, 개인 공유 폴더, 오래된 로컬 복사본을 배포 기준으로 삼지 않습니다.
- 망분리 환경은 외부망에서 공식 GitHub 저장소를 받은 뒤 기관 반입 절차를 거쳐 로컬 경로로 지정합니다.
- 기관별 정책 변경은 하네스 공통 파일을 복제해 새 계보를 만들기보다 `shared/institution-profile.yaml`에 먼저 반영합니다.

레지스트리 초기 반입용 카탈로그는 현재 승인/차단 seed에서 생성할 수 있습니다.

```powershell
node .\shared\scripts\package-catalog-export.mjs --root . --out .\generated\package-catalog.export.json
```

이 export에서 버전 없는 승인/제한 이름은 레지스트리 `APPROVED`로 반입하지 않고 `scope_catalog`로만 나갑니다. 차단 패키지 이름만 `REJECTED` 반입 대상입니다. 레지스트리의 `APPROVED`는 `(생태계, 이름, 버전)` 단위 판정이므로, 이름만 있는 카탈로그 항목을 모든 버전 승인으로 격상하지 않습니다. 카탈로그에 없는 패키지는 차단이 아니라 `UNKNOWN`입니다.

## Validation

로컬 검증:

```powershell
powershell.exe -ExecutionPolicy Bypass -File .\shared\scripts\gg-validate.ps1 -Root . -Level L1
```

평가 케이스 구조 검증:

```powershell
powershell.exe -ExecutionPolicy Bypass -File .\shared\scripts\gg-eval.ps1 -Root .
```

최종 하네스 수용테스트:

```powershell
node .\shared\scripts\harness-final-smoke.mjs .
```

패키징:

```powershell
powershell.exe -ExecutionPolicy Bypass -File .\shared\scripts\gg-package.ps1 -Workspace _workspace -OutDir dist
```

CI 초안:

```text
.github/workflows/validate-harness.yml
```

## Current Status

- Codex 루트 진입점 `AGENTS.md` 추가 완료
- 하네스 구조, 에이전트, 스킬, 핸드오프 계약 정리 완료
- 기관별 단일 설정 파일 `shared/institution-profile.yaml` 추가 완료
- 벤더 중립 선언 `shared/harness.yaml`, 권한 모델, eval 구조 검증 추가 완료
- 6개 골든 템플릿 최소 코드 추가 완료
- L1 thin mode 추가 완료
- canonical network profile 정리 완료
- 정적 검증 통과
- 남은 과제: 실제 L1 샘플 프로젝트 end-to-end 실행 검증, Python/Node 설치 환경에서 골든 템플릿 smoke test

## License

기관 내부 실증·검토 단계입니다. 공개 배포 전 라이선스 정책을 확정해야 합니다.
