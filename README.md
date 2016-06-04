# jwt-auth-server

## JSON Web Token Authentication REST Server

Deploy it https-only or isolated in a private virtual cloud

POST {username: 'x', password 'y'} to /login and get a token in the response.  The token is based a private SSH key.  
Multiple REST API servers can be deployed with the public key, can validate the tokens, and provide scalable,
secure resource-oriented architecture.

That's the plan anyway!

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
**db/auth** is a sqlite3 database with a table "users" to keep usernames and hashed passwords for authentication.  **db/auth.schema.sql** holds the schema for the table.  Notice **util/hasher.js** -- it lets you hash passwords from the command line to set up some initial users.

the **keys/** directory is where to keep the salt string and SSH keys for encrypting.  The public key, **id_rsa.pub**, is not used by this auth server.  github help has a good guide for generating SSH keys. **salt.txt** should be a one-line, one-word text file with random text.
