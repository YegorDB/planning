FROM python:3.8.5

ADD ./requirements.txt /tmp/requirements.txt
RUN pip install --upgrade pip && \
	pip install --no-cache-dir -r /tmp/requirements.txt

ADD ./code /code
WORKDIR /code

ENTRYPOINT ["/code/entrypoint.sh"]

EXPOSE 8000
