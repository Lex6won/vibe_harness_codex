# vibe_harness_codex

공공기관 공무원이 바이브코딩으로 업무 도구를 구상·시제품화·내부도구화하고, 정식 운영이 필요할 때 운영팀과 보안팀이 이어받을 수 있는 산출물을 남기도록 돕는 **공공 바이브코딩 실행 하네스**입니다.

이 저장소는 [`revfactory/harness-100`](https://github.com/revfactory/harness-100)의 “전문 에이전트 팀 + 오케스트레이터 스킬 + 보조 스킬 + 구조화 산출물” 방식을 참고했습니다. 단, 목적은 범용 하네스 모음이 아니라 **행정망/외부망, 공공 보안, 승인 패키지, 배포·이관 산출물**을 지키는 공공 특화 하네스입니다.

## At a Glance

| 항목 | 내용 |
|---|---:|
| 전문 에이전트 | 16개 |
| 스킬 | 14개 |
| 골든 템플릿 | 6개 |
| 성숙도 단계 | L0~L4 |
| 주요 네트워크 프로파일 | 행정망 / DMZ·외부망 / 인터넷 시제품 |
| 검증 스크립트 | `shared/scripts/gg-validate.ps1` |

## What This Harness Does

공무원이 기술을 몰라도 다음 흐름을 따라가도록 돕습니다.

```text
업무 아이디어
→ 목표 단계 판정
→ 화면·입력·출력 구상
→ 표준 Track/운영환경 결정
→ 골든 템플릿 기반 구현
→ 기초 보안검증
→ 배포·이관 산출물 생성
```

하네스의 목표는 “공무원이 정식 서비스를 혼자 끝까지 만든다”가 아닙니다. 더 현실적인 목표는 다음입니다.

> 공무원이 업무 아이디어를 구체화하고 안전한 시제품·내부도구를 만들며, 정식 운영이 필요할 때 운영팀과 보안팀이 이어받을 수 있는 표준 산출물과 검증 결과를 남긴다.

## Quick Start

### 1. 프로젝트에 하네스 복사

```powershell
Copy-Item -Recurse .claude C:\path\to\your-project\.claude
Copy-Item -Recurse shared C:\path\to\your-project\shared
```

### 2. Claude Code / Codex에서 시작

메인 진입점은 다음 파일입니다.

```text
.claude/CLAUDE.md
.claude/skills/gg-vibecode/skill.md
.claude/skills/gg-vibe/SKILL.md
```

예시 요청:

```text
우리 부서에서 엑셀 민원 현황 파일을 올리면 담당자별 처리 건수와 지연 건수를 대시보드로 보고 싶어.
```

### 3. 하네스 검증

```powershell
powershell.exe -ExecutionPolicy Bypass -File .\shared\scripts\gg-validate.ps1 -Root . -Level L1
```

## Maturity Levels

모든 결과물을 곧바로 정식 서비스로 보지 않습니다. 현재 목표 단계를 먼저 정하고, 단계에 맞는 절차와 검증 강도를 적용합니다.

| 단계 | 이름 | 의미 | 검증 강도 |
|---|---|---|---|
| L0 | 아이디어 구체화 | 화면·기능·입력·출력을 정리 | 문서 점검 |
| L1 | 시제품 | 내부 데모, 더미 데이터, 제한 사용 | quick |
| L2 | 내부도구 | 부서/기관 내 실제 업무 보조 | standard |
| L3 | 정식 서비스 후보 | 배포·공식 개발환경 이관 준비 | full MCP |
| L4 | 정식 운영 | 승인된 운영환경 운영 | 하네스 단독 판정 금지 |

L1은 `shared/references/thin-l1-policy.md`에 따라 문서와 에이전트 홉을 줄입니다. 시민 접근, 개인정보, 외부통신, 파일업로드, 지속 저장 DB가 있으면 L2/L3 흐름으로 승격합니다.

## Harness Architecture

```text
vibe_harness_codex/
├── .claude/
│   ├── CLAUDE.md                     # 최상위 운영 지침
│   ├── agents/                       # 전문 에이전트 팀
│   ├── skills/                       # 오케스트레이터·보조 스킬
│   ├── references/                   # 호환용 reference
│   └── assets/                       # 코칭 메시지 등
├── shared/
│   ├── golden-templates/             # 구현 가드레일이 담긴 실행 템플릿
│   ├── references/                   # 정책·운영·보안 기준
│   ├── scripts/                      # 검증·패키징 스크립트
│   └── templates/                    # PRD/설계/검증/신청 산출물 템플릿
├── adapters/                         # Claude Code, Codex, Cursor, Lovable 어댑터
├── evals/                            # 대표 평가 시나리오
└── .github/workflows/                # CI 검증 초안
```

## Agent Team

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
| `deploy-doc-writer` | 서버설치·배포가이드 작성 |
| `submit-packager` | 배포신청서·예외신청서 작성 |
| `pilot-evaluator` | 파일럿 효과 평가 |

## Skill System

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
| `gg-node-api` | Node 20 + Express API |
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
- Golden Templates: 승인 Track에 맞는 템플릿 안에서 구현
- Validation: `gg-validate.ps1`와 GitHub Actions 초안

## Network and Security Policy

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

## Package Policy

초기 패키지 정책은 하네스 내부 고정 화이트리스트가 아니라 별도 GitHub 저장소에서 운영하는 것을 권장합니다.

하네스는 생성된 결과 파일만 참조합니다.

```text
generated/package-policy.json
```

초기 방향:

- 블랙리스트와 위험규칙 중심
- AI 자동 선별 + 담당자 최종 승인
- 반복 승인된 패키지를 하버 이미지 후보로 승격
- 행정망/외부망 기준 분리

관련 설계 자료는 별도 `gg-package-policy-design` 폴더에서 관리합니다.

## Validation

로컬 검증:

```powershell
powershell.exe -ExecutionPolicy Bypass -File .\shared\scripts\gg-validate.ps1 -Root . -Level L1
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

- 하네스 구조, 에이전트, 스킬, 핸드오프 계약 정리 완료
- 6개 골든 템플릿 최소 코드 추가 완료
- L1 thin mode 추가 완료
- canonical network profile 정리 완료
- 정적 검증 통과
- 남은 과제: 실제 L1 샘플 프로젝트 end-to-end 실행 검증, Python/Node 설치 환경에서 골든 템플릿 smoke test

## License

기관 내부 실증·검토 단계입니다. 공개 배포 전 라이선스 정책을 확정해야 합니다.
