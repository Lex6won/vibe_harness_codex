---
name: gg-dev
description: 확정된 설계와 Track에 맞춰 골든 템플릿 기반 개발 소스를 생성하거나 기존 코드를 표준 구조로 재정렬할 때 사용한다.
---

# gg-dev

## Steps
1. `02_화면_기능설계서.md`, `04_개발스택_운영환경.md`, manifest를 읽는다.
2. template-engineer가 Track에 맞는 골든 템플릿을 선택한다.
3. gg-platform-coder가 템플릿 안에서만 기능을 구현한다.
4. `/health`, stdout 로그, 환경변수, 표준 Dockerfile을 유지한다.
5. 표준 밖 요구가 있으면 코딩 전 예외 후보로 기록한다.

## Track constraints
- Track A: FastAPI + Jinja2/HTMX
- Track S: Streamlit 내부 대시보드
- Track B: React 정적 빌드 + FastAPI
- Track N: Express 제한 허용
