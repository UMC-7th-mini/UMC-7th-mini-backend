#!/bin/bash
# 권한 추가 (git bash 권한 추가)
# chmod +x run-server.sh

# Docker Compose 실행
docker compose up -d

# Docker 컨테이너 내부에서 서버 실행

docker exec -it my-umc-container bash  #-c "npm run start"

#npm prisma generate
npx prisma generate


# DB docker container 접속
docker exec -it my-umc-db-container mysql -u root -p

# 권한 설정
GRANT ALL PRIVILEGES ON db.* TO 'myuser'@'localhost';
FLUSH PRIVILEGES;


# 얘부터 실행 먼저 해야함
#taskkill /PID {PIDnum} /F

docker exec -it my-umc-container bash -c "npm run start"
