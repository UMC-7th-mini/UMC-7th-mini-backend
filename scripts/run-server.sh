#!/bin/bash
# 권한 추가
# chmod +x run-server.sh

# Docker Compose 실행
docker compose up -d

# Docker 컨테이너 내부에서 서버 실행
docker exec -it my-umc-container bash 