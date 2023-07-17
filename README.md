# Mastering of Power of ASP.NET Core v7.0 and Angular v16
Mastering of Power of ASP.NET Core 7.0 and Angular 16 A Comprehensive Guide
Practical Mastery: Real-World Full Stack Project in ASP.NET 7.0 and Angular v16. All the concpts aroun PWAs, Deploy, and other... 
By Pedro Martins

## Table of Contents

- [Live Demo](#live-demo)
- [Getting Started](#getting-started)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [High-level Design](#high-level-design)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

## Live Demo

Live application: 



## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Angular CLI](https://angular.io/cli)

### Setup & Usage

- Clone this repository: `https://github.com/icpmtech/Book-Unleashing.git`
- `cd book-app`
- Install dependencies: `npm install`
- Serve the Angular app: `npm start`
- Open your browser at: `http://localhost:4200`

### Useful Commands

- `npm start` - starts a dev server of Angular app
- `npm run build:prod` - builds full prod build
- `npm run lint` - linting source code of this project
- `npm run format:check` - runs prettier to check for formatting errors
- `npm run format:write` - runs prettier to format whole code base
- `npm run release` - runs standard-version to create new release
- `npm run analyze` - runs Webpack Bundle Analyzer to examine chunk files

## Features

### Authentication Flows



### Other Features

- Lazy loading of Angular modules
- API requests with `@ngrx/effects`
- Responsive design
- In-memory Web API

## Tech Stack

- [Angular](https://angular.io/)
- [NgRX](https://ngrx.io/) - @ngrx/{store,effects,component}
- [Taiga UI](https://taiga-ui.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- Other dev tools
  - ESLint
  - Prettier
  - Husky
  - standard-vesrion

## High-level Design

Below is the high-level structure of the Angular v16 application Book Helper (Frontend).

```sh
./src
├── app
│   ├── app # root app component
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   └── app.component.ts
│   │
│   ├── app-routing.module.ts
│   ├── app.module.ts
│   │
│   ├── auth # includes authentication logic
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── guards
│   │   ├── interceptors
│   │   ├── login
│   │   └── store
│   │
│   ├── core # includes core utilities
│   │   ├── core.module.ts
│   │   ├── fake-api
│   │   └── services
│   │
│   ├── features # all features of application
│   │   ├── about
│   │   ├── home
│   │   └── secured-feat
│   │   └── book
│   │   └── sections
│   │   └── chapters
│   │   └── ...
│   │
│   └── shared # shared UI modules and utilities
│       ├── ui
│       └── util
│
├── assets
│   ├── ...
│
├── environments
│   ├── environment.prod.ts
│   └── environment.ts
│
├── ...
│
└── theme # global theme styles
    ├── _components.scss
    ├── _typography.scss
    └── index.scss
```

## Contributing

Who is for this? I would love for you to contribute to **Book Helper**! Before you start, please read the our community guidlines.

If you have found any bug in the source code or want to _request_ a new feature, you can help by  at GitHub. Even better, you can fork this repository and  with the fix or the new feature description.

## Support

- Star this repository 👆⭐️
- Help it spread to a wider audience:

### Author: Pedro Martins ✍️

- Senior Software Architect - I’m currently working as Solution/Software Architect application development.
- I write stuff at [cantinhode.net](https://cantinhode.net)
- How to reach me: [cantinhode.net](https://cantinhode.net)

## License

Feel free to use this repository, but **please star and put a reference to this repository.** :pray: :heart:

[MIT](https://opensource.org/licenses/MIT)
