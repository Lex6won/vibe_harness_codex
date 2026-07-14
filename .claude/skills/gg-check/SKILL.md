---
name: gg-check
description: 개발 소스의 간단 보안점검, vibecode-checker MCP/CLI 실행, smoke test, 플랫폼 정합성 점검, 코칭형 수정 안내를 만들 때 사용한다.
---

# gg-check

## Steps
1. source와 manifest를 확인한다.
2. vibecode-checker MCP가 있으면 우선 호출한다.
3. MCP가 없으면 `gvskb` CLI를 시도한다.
4. 둘 다 없으면 수동 점검으로 대체하고 공식 검증 미완료로 표시한다.
5. `05_보안점검보고서.md`를 만든다.
6. MCP/CLI 결과가 있으면 `06_MCP_검증결과.md`를 만든다.
7. qa-operator가 `/health`, smoke test, 로그, 외부통신 여부를 확인한다.

## Message style
반려가 아니라 수정 목록으로 안내한다. 보안팀 말투보다 옆자리 선배 말투를 쓴다.
