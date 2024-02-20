# seleciona a versão 3.11 do python para usar na imagem
FROM python:3.11

# instala o servidor redis
RUN apt-get update && apt-get install -y redis-server

# define que o diretorio de trabalho é o /app e copia o conteudo da pasta atual para o diretorio de trabalho
WORKDIR /app
COPY . /app

# instala as dependencias do projeto através do ficheiro de texto "requirements.txt"
RUN pip install --no-cache-dir -r requirements.txt

# expõe as portas 1222(projeto) e 6379(redis) para fora da imagem
EXPOSE 1222 6379

# inicia o servidor redis e a aplicação flask
CMD ["bash", "-c", "service redis-server start && python app.py"]


