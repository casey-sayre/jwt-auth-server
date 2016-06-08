# jwt-auth-server

## JSON Web Token Authentication REST Server

POST {"username": "x", "password": "y"} to /login and get a token, based on a private SSH key, in the response.  After
this one-time authentication, clients can store the token and pass it using the Bearer schema in the authorization header when requesting resources.  API servers equipped with the corresponding public key can validate the token and properly
expose resources based on the username (provided in the token's payload) and any associated permissioning..

## Overview
```
jwt-auth-server/
├── app
│   ├── encrypt.js
│   ├── gulpfile.js
│   ├── index.js
│   ├── logger.js
│   ├── login.js
│   ├── package.json
│   └── server.js
├── db
│   ├── auth
│   └── auth.schema.sql
├── keys
│   ├── id_rsa
│   ├── id_rsa.pub
│   └── salt.txt
├── LICENSE
├── README.md
└── util
    └── hasher.js
```
The little bit of configuration is done via the process environment.  For development this is handled in **app/gulpfile.js**.

**db/auth** is a sqlite3 database with a table "users" to keep usernames and hashed passwords for authentication.  **db/auth.schema.sql** holds the schema for the table.  Notice **util/hasher.js** -- it lets you hash passwords from the command line in order to seed the auth database with some initial users.

the **keys/** directory is where to keep the salt string and SSH keys for encrypting.  The public key, **id_rsa.pub**, while not used here, is required (*in pem format*) by jwt-api-server clients of this server to validate the token and access the payload.  (github help has a good guide for generating SSH keys.) **salt.txt** should be a one-line, one-word text file with random text.
