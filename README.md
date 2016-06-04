# jwt-auth-server

## JSON Web Token Authentication REST Server

Deploy it https-only or isolated in a private virtual cloud

POST {username: 'x', password 'y'} to /login and get a token in the response.  The token is based a private SSH key.  
Multiple REST API servers can be deployed with the public key, can validate the tokens, and provide scalable,
secure resources.

That's the plan anyway!

The usernames are stored with SHA1 hashed versions of the passwords in a SQLite3 database.
