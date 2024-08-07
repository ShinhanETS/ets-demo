FROM python:3.12-rc-slim

WORKDIR /app

COPY . .
RUN pip install -r requirements.txt
EXPOSE 8085

CMD ["python", "/app/app.py"]
