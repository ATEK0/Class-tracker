# utilizar uma versão do node js para a imagem
FROM node:14-alpine

# Definir o diretório de trabalho como o /app
WORKDIR /app

# copiar o package.json e o package-lock.json para o container
COPY package*.json ./

# instala as dependencias da aplicação através do comando "npm install"
RUN npm install

# copia o diretório atual para o container no caminho /app
COPY . .

# executa o comando "npm run build" para criar a versão de publicação da aplicação
RUN npm run build

# expõe a porta 5173 para ser acessível fora do container
EXPOSE 5173

# corre a aplicação 
CMD ["npm", "run", "dev"]



