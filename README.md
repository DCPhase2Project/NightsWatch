# Phase 2 Backend Project Requirements

This is the final project for "Phase 2" of the Flex course for [DigitalCrafts]
Houston. It is focused on backend technologies using [Node.js].

> NOTE: This project completed in accordance with the requirements laid out
  below in order to fulfill Texas state requirements for credit for the course.

[DigitalCrafts]:https://www.digitalcrafts.com/
[Node.js]:https://nodejs.org/

## Project Description

Build a copy of Netflix using the backend
technologies we have learned in Phase 2: [express.js], [PostgreSQL], [knex.js],
etc.

[express.js]:https://expressjs.com/
[PostgreSQL]:https://www.postgresql.org/
[knex.js]:https://knexjs.org/

## Technical Requirements

- HTML templating
  - Pure JavaScript functions that return strings, or use [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
  - [mustache](http://mustache.github.io/), [handlebars](https://handlebarsjs.com/), [ejs](https://ejs.co/), [pug](https://pugjs.org/api/getting-started.html), etc

- Swap between database types by using a config file.
  - Abstraction layer: [knex.js](https://knexjs.org/)

- PostgresQL.

- User actions trigger [CRUD operations](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) against the database.
  - **two** `<form>` submissions that insert or edit data in a database.
  - The forms should handle input validation and show errors in the UI (if necessary)

- AJAX-based GET endpoint that powers a dynamic dropdown or type-ahead component

- User authentication using [passport.js](http://www.passportjs.org/)
  - Supports at least one OAuth provider (Facebook, GitHub, Google, etc)
  - Supports passport.js "local strategy" backed with a database

- Hosted somewhere publicly reachable via `https`
  - AWS

- Client-side JavaScript is less than 200 lines of code.
  - Note: this does not include libraries
  - The focus is backend, not frontend.

- List of team members
  - Joseph Madamba
  - Sarah Nash
  - Nick Phelps

- Repo connected to [Travis CI](https://travis-ci.org/):
  - Test of an API endpoint that touches the database

[Markdown]:https://guides.github.com/features/mastering-markdown/
[StandardJS]:https://standardjs.com/
[npm scripts]:https://deliciousbrains.com/npm-build-script/

## Workflow Requirements

- GitHub repo and add all group members as collaborators.

- Pull Requests (PRs):
  
- Project features and bugs tracked using GitHub Issues.
  - Use of additional project management tooling (Trello)

## Learning Objectives

> TODO: write this section

--------------------------------------------------------------------------------

This requirements document is licensed as [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/):

> You can copy, modify, distribute and perform the work, even for commercial purposes, all without asking permission.