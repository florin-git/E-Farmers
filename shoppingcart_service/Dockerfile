FROM python:alpine3.15



WORKDIR /usr/src/app
COPY ./shoppingcart_service/requirements.txt ./
RUN python3 -m pip install --upgrade pip 

RUN pip uninstall django

RUN apk add --no-cache postgresql-dev gcc python3-dev musl-dev

RUN pip install -r requirements.txt
COPY ./shoppingcart_service ./
COPY ./wait-for-service* ./
