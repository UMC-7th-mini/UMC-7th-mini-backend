#!/bin/bash
# 권한 추가
# chmod +x migration.sh

# Prisma 마이그레이션 실행
docker exec -it my-umc-container npx prisma migrate dev

