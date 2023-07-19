ARG FUNCTION_DIR="/app"
FROM node:18-buster-slim

ARG FUNCTION_DIR

RUN mkdir -p ${FUNCTION_DIR}/

WORKDIR ${FUNCTION_DIR}

COPY index.js ${FUNCTION_DIR}
COPY package.json ${FUNCTION_DIR}

RUN npm install

EXPOSE 4569

ENTRYPOINT ["node","./index.js"]
