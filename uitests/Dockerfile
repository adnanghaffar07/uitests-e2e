FROM codeception/codeceptjs

RUN mkdir -p /tests/
WORKDIR /tests/

ENV PATH /ai/uitests/node_modules/.bin:$PATH
COPY package.json yarn.lock /tests/
RUN yarn install --pure-lockfile



