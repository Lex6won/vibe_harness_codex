---
name: track-selection
description: PRD와 위험분석을 바탕으로 경기도 표준 Track A/S/B/N을 결정할 때 사용한다. 공무원에게 기술을 묻지 않고 규칙으로 정한다.
---

# track-selection

## 결정 규칙
- 내부 대시보드/엑셀 분석: Track S. 단 대민이면 금지.
- 표준 업무 웹서비스: Track A.
- 복잡한 화면: Track B.
- 기존 TypeScript/Edge Functions 포팅: Track N 제한 허용.
- 개인 PC 자동화: local-automation.

## 미승인 선회
- Next.js SSR → 정적 export 또는 Track B.
- Supabase/Firebase → PostgreSQL + Keycloak + 서버 API.
- Flask/Django/Spring Boot → FastAPI 또는 별도 정보화사업.
