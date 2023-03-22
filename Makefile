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