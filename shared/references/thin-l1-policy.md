# L1 Thin Mode Policy

L1 시제품은 1시간 내 첫 결과물을 목표로 한다. 운영·보안 기준을 버리는 것이 아니라, 기록과 에이전트 홉을 최소화한다.

## L1 필수 산출물

- `_workspace/00_feature_brief.md`: 만들 것, 사용자, 화면/입력/출력, 위험 플래그
- `_workspace/00_작업현황.md`: 현재 단계와 핵심 결정 3~5줄
- `_workspace/source/`: 실행 가능한 시제품 코드
- `_workspace/vibecode-manifest.json`: 최소 필드만

## L1 선택 산출물

다음은 조건부로만 만든다.

- PRD: 사용자가 요청하거나 L2로 올릴 때
- DB정의서: 지속 저장이 있을 때
- 보안점검보고서: quick 검사 결과 요약 또는 위험 플래그가 있을 때
- 핸드오프 파일: `block`, `warn`, `needs-user`일 때. `pass` 흐름은 작업현황에 한 줄 기록으로 대체 가능
- 배포가이드/신청서: L3로 올릴 때

## L1 축약 흐름

기본 흐름:

`intake-guide → stage-advisor → feature-discovery → template-engineer → gg-platform-coder → security-checker(quick) → qa-operator`

다음 조건이면 상세 흐름으로 승격한다.

- 시민/도민 접근
- 개인정보/민감정보
- 파일업로드
- 지속 저장 DB
- 외부 API/CDN/LLM/MCP
- 담당자가 L2/L3 목표를 명시

## 원칙

- L1에서 문서 완성도를 이유로 첫 실행을 늦추지 않는다.
- 단, 위험 플래그는 생략하지 않는다.
- L1 결과물에는 “내부 시제품이며 정식 서비스가 아님”을 표시한다.
