COMPOSE=docker compose

up: 
	${COMPOSE} up -d

app:
	${COMPOSE} up app -d

mongo:
	${COMPOSE} up mongodb -d