FROM python:alpine3.15

WORKDIR /usr/src/app
COPY ./subscription_service/requirements.txt ./
RUN python3 -m pip install --upgrade pip
RUN pip install -r requirements.txt
COPY ./subscription_service ./
ENV FLASK_APP=subscription_api
ENV FLASK_ENV=production
ENV RABBITMQ_SERVICE=rabbitmq
CMD ["sh", "-c", "flask", "restore-rabbitmq", "&", "flask", "run"]