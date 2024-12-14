build-image:
	docker build -t animnya-web-bykevin-work .

run-container:
	docker stop animnya-web-bykevin-work || true && docker rm animnya-web-bykevin-work || true &&  docker run --name animnya-web-bykevin-work -d \
		-p 3000:80 \
		animnya-web-bykevin-work
