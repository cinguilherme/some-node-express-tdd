build-image:
	docker build -t tdd_sample .

test-image:
	make build-image && cd image-tests && docker-compose up