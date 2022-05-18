FROM python:alpine3.15

WORKDIR /usr/src/app
COPY ./user_service/requirements.txt ./
RUN python3 -m pip install --upgrade pip
RUN pip uninstall django
RUN pip install -r requirements.txt
COPY ./user_service ./
COPY ./wait-for-service* ./