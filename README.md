# Gympass clone with Node | Fastify | Solid | JWT

![banner]()

## Images

## Summary

- [Images](#images)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [Project Objectives](#project-objectives)
- [Routes](#routes)
- [How to run the project?](#how-to-run-the-project)
- [Author](#author)

## Dependencies

- [Fastify](https://fastify.dev): Web framework for Node.js used to create APIs and HTTP servers (similar to Express.js) with support for TypeScript typing.

## Dev Dependencies

- [ESLint](https://eslint.org/): Code analysis tool responsible for identifying errors and inconsistencies.

- [Prettier](https://prettier.io/): Code formatting tool that ensures code style consistency.

- [tsup](https://tsup.egoist.dev): Tool for optimizing TypeScript projects, allowing the build process (converting TS to JS). It also uses **esbuild**, which speeds up processes and facilitates TypeScript development.

- [Typescript](https://www.typescriptlang.org/): A strong typed programming language that builds on JavaScript

## Project Objectives

Applications like Gympass have users who can pay a monthly fee to access gyms registered in the application.

We are working with

- Geolocation
- Distance calculations such as latitude and longitude.
- Date validations

### Functional Requirements

Defines what the user can do in the application, outlining the core functionalities available to them.

- [ ] It should be able to register;
- [ ] It should be able to authenticate;
- [ ] It should be able to get the profile of a logged user;
- [ ] It should be able to get the number of check-ins made by the logged user;
- [ ] It should be able for the user get his check-in history;
- [ ] It should be able for the user search close gyms;
- [ ] It should be able for the user search gyms by its name;
- [ ] It should be able for the user to check-in into a gym;
- [ ] It should be able to validate the user check-in;
- [ ] It should be able to register a gym;

### Business Rules

Defines the conditions under which each functional requirement operates. Every functional requirement will have an associated business rule to ensure its proper functionality.

- [ ] The user can't register a duplicated e-mail;
- [ ] The user can't check-in twice a day;
- [ ] The user will only be able to check in at least 100m away from the gym;
- [ ] The check-in can be validate just 20 minutes after created;
- [ ] The check-in can only be validade by a administrator;
- [ ] The gym can only be registered by a administrator;

### Non-Functional Requirements

Technical requirements independent of the client, focusing on performance, reliability, and scalability rather than functionality.

- [ ] The user password mus be encrypted;
- [ ] The app data must be persisted in a PostgreSQL database;
- [ ] Every data lists must be paginated by 20 items per page;
- [ ] The user must be identified by a JWT (JSON Web Token);

## Routes

## How to run the project?

## Author
