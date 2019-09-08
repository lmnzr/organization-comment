# Organization Comments

[![Build Status](https://api.travis-ci.com/lmnzr/organization-comment.svg?token=U6NUxWGyY1isYgsiJZkU&branch=master)](https://travis-ci.com/lmnzr/organization-comment)

This is a simple API allowing member/nonmember user to write comment on available Github Organization.

### Tech

My App uses a number of technology/library to work properly:

- [NodeJS] - evented I/O for the backend
- [Typesript] - typed superset of JavaScript that compiles to plain JavaScript.
- [ExpressJS] - minimal and flexible Node.js web application framework.
- [Axios] - promise based HTTP client.
- [PostgreSQL] - open source object-relational. database system
- [Winston] - logger for just about everything.
- [JWT] - open, industry standard for representing claims securely between two parties.
- [Jest] - javaScript testing framework with a focus on simplicity
- [Supertest] - provides an easy-to-use API to send HTTP requests in Node.
- [GithubAPI] - API to access data from github.
- [Docker] - Containerized our application.

## Setup

The App requires `npm > v6.0` to run.
Before running makesure to setup `.env` file.
I include `example.env`do file as an example.

### Setup Application In Docker

```
$ npm run docker:up
```

### Run Test In Docker

```
$ npm run docker:test
```

### Documentation

[Api Documentation is available here](https://organizationcomment.docs.apiary.io/#)

## License

ISC
