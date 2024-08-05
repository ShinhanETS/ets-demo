# ets-demo
ETS DEMO 입니다.

## 1. Install for dev
1. docker와 docker compose 세팅 (기본적으로 Docker Desktop을 사용하시는 것을 추천드립니다.)
2. git clone
```
git clone https://github.com/ShinhanETS/ets-demo.git
cd ets-demo
```
3. docker-compose 빌드   
아래의 명령어를 입력한 다음에 조금 기다려주세요.
```
docker compose up -d --force-recreate --build
```
만약 사용할 수 있는 상태인지 확인하고 싶다면 아래의 명령어를 입력 후 확인해보세요.   
spring-builder를 제외한 모든 컨테이너가 시작된 상태이면 됩니다.
```
dongwon_kim@gimdong-won-ui-MacBookPro ets-demo % docker ps -a
CONTAINER ID   IMAGE                      COMMAND                   CREATED         STATUS                     PORTS                            NAMES
542ecc280f6b   ets-demo-client            "/docker-entrypoint.…"   8 minutes ago   Up 8 minutes               80/tcp, 0.0.0.0:3000->3000/tcp   client
cb74010ba724   openjdk:17                 "java -jar auth-appl…"   8 minutes ago   Up 7 minutes               0.0.0.0:8080->8080/tcp           auth-server
4670f2c68b46   nginx                      "/docker-entrypoint.…"   8 minutes ago   Up 8 minutes               0.0.0.0:80->80/tcp               proxy_server
4b6dc311ac1f   gradle:8.9.0-jdk17-jammy   "/bin/bash /__cacert…"   8 minutes ago   Exited (0) 7 minutes ago                                    spring-builder
dongwon_kim@gimdong-won-ui-MacBookPro ets-demo % 
```
4. 테스트    
프론트는 http://localhost 로 접속하시면 됩니다.   
백엔드는 http://localhost/api ~로 접속하시변 됩니다.
### Install QA
#### Q1. 프론트 개발 시, 주의점
- 개발 시, `fe 폴더`에서 `npm run dev` 하시면 일반 개발할 때랑 같습니다.
- 개발할 때, ENV 등의 환경에 대한 변경 사항이 있으면 [@EastWon0103](https://github.com/EastWon0103)에게 말씀해주세요.
#### Q2. 백엔드 개발 시, 주의점
- 멀티 모듈 기반 MSA(?)로 작동합니다. (서버 분리)
- API는 도메인 별로, context-path를 나누고 이를 기반으로 nginx에서 라우팅합니다.
```yaml
server:
  servlet:
    context-path: /api/auth 
```
- 모듈 추가의 어려움이 있으시면 [@EastWon0103](https://github.com/EastWon0103)에게 말씀해주세요.