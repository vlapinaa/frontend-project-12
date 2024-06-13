install:
	npm ci

start:
	npx start-server -s ./chat/build

build:
	rm -rf chat/build
	npm run build

start-frontend:
	make -C chat start

start-backend:
	npx start-server -s ./chat/build