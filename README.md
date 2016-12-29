# What is it?

A sample Auth0 React Redux SPA appplication with CRUD ops client for Account Management - requests are sent with
   an access_token & on the backend protected by JWT scopes (access_token) & postgres. 
   
The domain object (account) corresponds to a typical Auth0 Custom DB table and this Client can
therefore act as a GUI for DB HTTP endpoint access (from Rules, Custom DB Scripts or other webtasks).

## Companion Repo

See [auth0-node-api-sample](https://github.com/tawawa/auth0-node-api-sample)

## Running locally

To run the sample extension locally:

TODO - Rename `.env.sample` as `.env` and add the required values for each key value pair.

For now just add your ClientID and Domain to src/routes.js - hardcoded.

Example

```
const AUTH0_CLIENT_ID = 'o25W0jPI01yRzatTbiHhY0dR3M7wyk3u';
const AUTH0_DOMAIN = 'demo-workshop.auth0.com';
const RESOURCE_API_AUDIENCE = 'https://resourceapi.com';
const ACCESS_TOKEN_SCOPES = 'read:account read:accounts create:account update:account delete:account';
```

You need exactly the scopes listed above if using the defaults for the backend.

```bash
$ npm install
$ npm start
```

Then go to `http://localhost:3000

## Deploying for PRD 

This sample is not production ready, but there is a production build to minify etc





## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free Auth0 Account

1. Go to [Auth0](https://auth0.com/signup) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.




