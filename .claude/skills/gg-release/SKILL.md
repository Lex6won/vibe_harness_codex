---
name: gg-release
description: 개발 완료된 바이브코딩 산출물을 배포 전 full 보안점검으로 확인하고, 체커 최종 리포트 2종을 보안팀/AX 전담팀에 제출하도록 안내한다. 배포가이드·신청서·예외신청서는 필요한 경우에만 생성한다.
---

# gg-release

## 절차
1. `release-packager`가 `_workspace`와 manifest를 읽고 누락 산출물을 확인한다.
2. 개발스택 최종본을 확정한다: 언어, 프레임워크, DB, 패키지, 포트, healthcheck, 로그, 환경변수, 설치경로.
3. 행정망/외부망 차이를 확인한다.
4. `security-checker(full)`로 vibecode-checker MCP 결과를 생성한다. full은 `scan_path`, `scan_dependencies`, 필요 시 `scan_installed_packages`, 필요 시 `scan_vendor_bundles`, `render_report(format="both", save=true)` 흐름을 따른다.
5. 체커가 저장한 최종 제출 기본 2종을 확인한다.
   - 사람용 HTML 리포트
   - 원본 JSON 증적
6. `submit-packager`가 두 리포트를 보안팀 또는 AX 전담팀에 제출해야 한다고 안내한다. 이 리포트는 공식 승인서가 아니라 보안 검토 요청 증적이다.
7. 기관 양식, 예외, 패키지 검토, 운영팀 설치 인계가 있을 때만 `deploy-doc-writer`와 `submit-packager`가 추가 문서를 작성한다.

## 완료 표현
- 최종 리포트 2종 제출 준비 완료
- 누락 있음
- 사람 승인 필요

“배포 승인 완료”라고 표현하지 않는다.
