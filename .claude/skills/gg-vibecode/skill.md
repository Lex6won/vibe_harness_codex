---
name: gg-vibecode
description: 공무원이 업무 도구나 서비스를 구상·설계·구현·수정·보안점검·배포이관 준비할 때 쓰는 메인 오케스트레이터. “만들고 싶어”, “내부 데모”, “기능을 고쳐줘”, “운영환경에 맞게 개발”, “보안검사”, “배포신청”, “공식 개발환경 이전”, “Lovable로 만든 것 옮기기” 요청에 발동한다.
---

# gg-vibecode 오케스트레이터

## 0. 모드와 성숙도 판별
요청을 먼저 작업 모드와 성숙도 단계로 분류한다.

작업 모드:
- 신규 설계·구현: 새 업무도구, 대시보드, 입력시스템, 조회시스템을 만들고 싶다는 요청.
- 기존 코드 수정: 이미 만든 소스에서 기능 추가, 버그 수정, 화면 수정, 패키지 추가를 요청.
- 배포·이관 준비: 배포신청, 보안성검토, 공식 개발환경 이전, 서버 설치, 반입 패키지를 요청.
- 보안검사만: checker/MCP 결과만 요청.
- 프로토타입 전환: Lovable, Supabase, Vercel, 외부 SaaS 기반 결과물을 공공 운영환경으로 옮기는 요청.
- 파일럿 평가: 하네스 실증 결과와 개선점을 기록하는 요청.

성숙도 단계:
- L0 아이디어 구체화
- L1 시제품
- L2 내부도구
- L3 정식 서비스 후보
- L4 정식 운영. 하네스 단독 판정 금지.

모드나 단계가 불명확하면 `intake-guide`와 `stage-advisor`가 사용자 범위와 현재 목표만 짧게 확인한다. 사용자가 모르면 L1 시제품으로 시작한다.

## 1. 신규 설계·구현 모드
1. `intake-guide`: 사용자 범위, 행정망/외부망 후보, 작업 모드, 조기 위험 플래그를 기록한다.
2. `stage-advisor`: L0~L4 단계와 검증 강도를 정한다.
3. `feature-discovery`: 화면, 기능, 입력, 처리, 출력, 저장 여부를 업무 언어로 끌어낸다. 이미 제공된 내용은 pass한다.
4. `prd-writer`: `00_feature_brief.md`를 바탕으로 `01_PRD_서비스기획서.md`를 작성한다.
5. `public-risk-analyst`: 행정망/외부망, 데이터 신호등, 외부통신, 개인정보, 파일업로드 위험을 판정한다.
6. `platform-architect`: Track, 인증, DB, 배포구조, 운영환경을 결정하고 `02`, `04`를 작성한다.
7. `data-modeler`: 저장이 필요한 경우 `03_DB_테이블정의서.md`를 작성한다. 저장이 없으면 “DB 없음” 근거를 남긴다.
8. `template-engineer`: 확정 Track에 맞는 표준 템플릿을 준비한다.
9. `gg-platform-coder`: 승인 Track, runtime, DB, 패키지 정책에 맞춰 기능을 1개씩 구현한다.
10. `security-checker`: 단계에 맞는 검증을 수행한다. L1은 quick, L2는 standard, L3는 full.
    - ok → `qa-operator`.
    - warn → 위험과 조치안을 설명하고 계속 가능 여부를 확인.
    - block → suggest_fix와 함께 `gg-platform-coder` 재작업. 최대 2회.
11. `qa-operator`: 실행, healthcheck, 기본 smoke test를 확인한다.
12. `deploy-doc-writer`: 개발스택과 설치 가이드 초안을 만든다. 배포 요청이 없으면 초안 상태로 둔다.

## 2. 기존 코드 수정 모드
1. `intake-guide`: 수정 요청인지 확인하고 사용자 범위가 바뀌었는지만 본다.
2. `stage-advisor`: 단계 변화가 있는지 확인한다. L1/L2 유지면 경량 흐름을 유지한다.
3. `change-coder`: 관련 파일만 읽고 변경 범위를 분류한다.
4. 다음 중 하나라도 있으면 산출물을 갱신한다.
   - DB 변경 → `03_DB_테이블정의서.md`
   - 패키지/런타임 변경 → `04_개발스택_운영환경.md`
   - 화면/기능 변경 → `02_화면_기능설계서.md`
   - 개인정보/외부통신/인증 변경 → `05_보안점검보고서.md` quick 항목
5. `security-checker(quick)`: 변경 범위 중심으로 검사한다.
6. `_workspace/00_작업현황.md`에 변경 파일, 영향, 후속조치를 남긴다.

수정 모드에서는 전체 PRD 재작성이나 전체 설계를 강요하지 않는다. 단, 사용자 범위가 내부에서 대민으로 바뀌거나 Track 변경이 필요하거나 L3로 승격되면 신규 설계 또는 배포·이관 흐름으로 전환한다.

## 3. 배포·이관 준비 모드
1. `stage-advisor`: L3 정식 서비스 후보인지 확인한다. L4 승인 완료는 선언하지 않는다.
2. `release-packager`: 산출물 누락, 개발스택 최종본, 행정망/외부망 제약, 패키지 목록을 확인한다.
3. `security-checker(full)`: `vibecode-checker(gvskb)` MCP 결과를 생성한다. MCP를 쓸 수 없으면 미실행 사유와 대체 점검을 기록한다.
4. `deploy-doc-writer`: `07_서버설치_배포가이드.md`를 확정한다.
5. `submit-packager`: `08_배포신청서.md`, 필요 시 `09_예외신청서.md`, `10_패키지예외신청서.md`를 생성한다.

배포·이관 준비 모드는 개발 성공을 승인으로 표현하지 않는다. “제출 준비 완료/누락 있음/사람 승인 필요”로만 표현한다.

## 4. 프로토타입 전환 모드
- Lovable/Supabase/Vercel 결과물은 운영 직반입하지 않는다.
- `stage-advisor`로 현재 결과물이 L1 시제품인지 L2 내부도구 후보인지 판정한다.
- `feature-discovery`로 실제 필요한 화면과 기능을 재확인한다.
- `platform-architect`가 승인 Track으로 재배치한다.
- 외부 SaaS, CDN, 외부 DB, client-side secret은 대체 또는 예외 대상으로 기록한다.

## 5. 파일럿 평가 모드
1. `stage-advisor`: 대상 프로젝트의 목표 단계를 기록한다.
2. `pilot-evaluator`: 첫 결과물 도달 시간, 질문 난이도, 산출물 유용성, 보안 반복 이슈, 수정 개발 소요, 배포이관 누락률을 기록한다.
3. `_workspace/11_파일럿평가.md`를 생성한다.
4. 하네스 개선 후보를 남긴다.

## 핸드오프 규칙

모든 단계는 `shared/references/agent-handoff-contract.md`를 따른다.

각 에이전트는 다음 단계로 넘기기 전에 아래를 기록한다.

- 현재 에이전트와 다음 에이전트
- 작업 모드와 성숙도 단계
- 상태: pass / warn / block / needs-user / done
- 읽은 입력과 작성한 출력
- 결정사항, 위험 플래그, 남은 질문
- 다음 에이전트가 해야 할 일

`block` 또는 `needs-user`면 다음 단계로 진행하지 않는다. `security-checker`가 block을 반환하면 coder 계열 에이전트로 되돌리고, 최대 2회 재작업 후 사람 판단 또는 예외신청으로 전환한다.

## 공통 원칙
- 단계 산출물 없이 다음 단계로 가지 않는다.
- 기술결정은 규칙으로 정하고, 업무결정만 사용자에게 묻는다.
- 사용자가 모르면 기본안을 제시한다.
- 패키지는 `approved-packages.yaml`, `package-denylist.yaml`, `package-risk-policy.md`를 따른다.
- 성숙도는 `service-maturity-model.md`를 따른다.
- 보안검사 로직을 직접 만들지 않는다.
- 대민은 사람 승인 없이 완료 처리하지 않는다.
- 모든 모드는 `_workspace/00_작업현황.md`와 manifest를 갱신한다.


