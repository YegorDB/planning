FROM python:3.9.7

ADD ./requirements.txt /tmp/requirements.txt
RUN pip install --upgrade pip && \
	pip install --no-cache-dir -r /tmp/requirements.txt

COPY ./entrypoint.sh /entrypoint.sh

WORKDIR /code

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 8000
