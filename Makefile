install:
	npm ci

build:
	npm run build

lint-frontend:
	make -C chat lint

start-frontend:
	make -C chat start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend