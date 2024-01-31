# Nomad Go Project Front End

Project to showcase some development work.
Recording: https://photos.app.goo.gl/ziw16vzwqTMzqhfN7

## Hosting

https://nomadgofe.web.app/ (Firebase) Apps in preview require any users to be added as tester or developer with Meta developer account.

## Docker

```bash
docker build -t nomad-go-fe .

docker run -d -p 8080:80 nomad-go-fe

```

Available on 0.0.0.0:8080

## Features

- Meta Login
- Responsive Feed
- Masonry layout
- collapsing header
- auto paginating on scroll
- client side filtering (Setup in place for filtering on Graph API but support for hashtag and location filtering very limited)
- expanding tiles
- flippable tiles with rear face
- Filterable by location
- custom theme and palette
- unit tests
- animations
- progressive loading without refresh
- Routing with guards
- error handling
- Docker compatible
- Firebase Hosted
- custom scroll bar
- PWA

## Description

A quick POC for a custom instagram feed. Login in via meta, view and filter images. Interact for more detail.

Aside from a few angular components most of the components and interactions are custom.

Primed as POC definitely needs some QOL around componentry and interactions.

## Future Improvements

- Proper Filtering. Could not filter on hastags through graph api unfortunately. (this may have been reserved for business accounts?)

Idealy filtering through the graph API which would allow for true filtering beyond paginated filtering. Second option would be a server side caching or elastic search.

- Better Unit Test Coverage
- More elaborate theme
- Additional performance and optimizations around image loading
- Caching/CDN

- Video support
- scrolling of photo albums
- more sophisticated layout
- Likes/Shares and other social info

## Challenges

- It seems like the Meta team is mid migration of some of the Instargam APIs. Many documents for an "Instagram Basic API" actually just were directed to the Graph API. I ended up using the Graph API for everything.
- The Instagram request limit is very low for test applications. Ended up generating some test data.
- Authentication flow did not match up with documentation consistently, had to jump through some hoops to find it.

## Components/Services/Etc...

### FiltersComponent

Contains togglable filter tags.

### Masonry Component

Container for masonry tiles, controls reflow and tile interactions.

### Masonry Tile

Tile for masonry layout.

### Masonry Tile Flipped

Extracted component for back face of masonry tile.

### Auth Guard

Guard for log in protected routes.

### Initializers

Initializers for FB SDK and authentication. These run during application boostrapping and are required before app is ready for interaction.

### Header Service

Manages Shared interaction around the header. Primarily for allowing it to be toggled.

### Instagram Service

Manages all iteractions with the instagram API as well as filtering.

### User Service

Service for interaction with Current User Object

### AppComponent

The root component of the application that initializes the application and includes the primary navigation and layout.

### FeedListComponent

Contains the image feed and filter sidebar.

## PersonaComponent

Contains user image and details if allowed to load otherwise displays icon.

## Assets

Several random images and backgrounds I created to fit a neutral beige on black theme.

## Setup

### Prerequisites

- Angular 16
- Material Design 16

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Navigate to the project directory
cd [project-directory]

# Install dependencies
npm install --legacy-peer-deps    

# Serve the application
npm run start

# The application is now running on http://localhost:4200


# NomadGoFE

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.5.

## Development server

Run `npm run start --ssl` for a dev server. Navigate to `https://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).



```
