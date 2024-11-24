#!/bin/bash
# 권한 추가
# chmod +x migration.sh

# Prisma 마이그레이션 실행
docker exec -it my-umc-container npx prisma migrate dev
# docker tunnel에서 컨테이너 이름명으로 실행
# 이후에 prisma 실행

# docker 안에서 실행