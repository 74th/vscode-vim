FROM library/node

ADD * /root/
WORKDIR /root/
RUN npm install

ENTRYPOINT make test