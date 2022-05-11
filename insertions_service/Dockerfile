FROM python:3.8.10

WORKDIR /usr/src/app
COPY requirements.txt ./
RUN python3 -m pip install --upgrade pip
RUN pip uninstall django
RUN pip install -r requirements.txt
COPY . .
# Wait for the DB
RUN sh ./wait-for.it.sh mongodb:27017
