COMPOSE=docker compose
NPM=npm run

up: 
	${COMPOSE} up -d

app:
	${COMPOSE} up app -d

mongo:
	${COMPOSE} up mongodb -d

test:
	${NPM} test

build:
	make mongo && docker build -t guimas/app --no-cache . && docker run -p 8000:8000 --network local guimas/app

w:
	${NPM} w

nodemon:
	${NPM} nodemon