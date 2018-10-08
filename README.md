# node-orion-server

Based off of the original [orion-server by LINKIWI](https://github.com/LINKIWI/orion-server), but rewriten in node to suit my setup.

## Environment Options
| OPTION  | Required | Description | Suggested |
| ----- | ----- | ----- | ---- |
| `NODE_ENV` | Yes | Self explanatory, defaults to `development` unless doing a `docker-compose` action  | `production` |
| `ORION_CLIENT_HOST` | Yes | Host where the `orion-web` client is located (relative to server), FOR CORS | `https://orion-client-domain.tld |
| DB_USERNAME | Yes | Database user | user_defined |
| DB_PASSWORD | Yes |  Database password | user_defined |
| DB_NAME | Yes |  Database name | user_defined |
| DB_HOSTNAME | Yes | Database host | user_defined |
A `docker-compose.yml` file is included to get you up and running quickly. However, you may want to adjust passwords and environment.

## Getting things up

```bash
$ git clone https://github.com/acupajoe/node-orion-server
$ cd node-orion-server
# SET .env file from .env.sample
$ docker-compose up -d
```

**OwnTracks clients can then be pointed to `https://orion-server-domain.tld/api/publish`.**

## Disclaimers

Be aware that there is no authentication set up by default. Basic authentication is suggested since it works natively with the Owntracks clients (albeit less securely than certificates). You can set this up pretty easily using Traefik.