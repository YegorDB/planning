FROM python:3.9.1

ADD ./requirements.txt /tmp/requirements.txt
RUN pip install --upgrade pip && \
	pip install --no-cache-dir -r /tmp/requirements.txt

WORKDIR /code

EXPOSE 8000
