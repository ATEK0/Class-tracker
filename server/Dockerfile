FROM python:3.8

# Install Redis server
RUN apt-get update && apt-get install -y redis-server

# Set up Flask app
WORKDIR /app
COPY . /app

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose ports
EXPOSE 1222 6379

# Start both Flask app and Redis server
CMD ["bash", "-c", "service redis-server start && python app.py"]
