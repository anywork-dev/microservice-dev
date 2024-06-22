# NSM App

NSM App is a multi-platform application supporting Express.js and Cloudflare Workers. The project uses Docker for containerization and `docker-compose` for managing multi-container applications.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [Development Database](#development-database)
  - [Building and Running Express.js Platform](#building-and-running-expressjs-platform)
  - [Building and Running Cloudflare Platform](#building-and-running-cloudflare-platform)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nsm-app.git
   cd nsm-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Development Database

Start the development database using `json-server`:
```bash
npm run dev:database
```
This starts a JSON server on port 8000 serving data from `tests/.data.json`.

### Building and Running Express.js Platform

To build and run the Express.js platform:
```bash
npm run build:express
```
This command:
- Runs the build script for the Express.js platform.
- Builds a Docker image for the Express.js platform.
- Uses `docker-compose` to start the containerized application.

### Building and Running Cloudflare Platform

To build and run the Cloudflare platform:
```bash
npm run build:cloudflare
```
This command:
- Runs the build script for the Cloudflare platform.
- Builds a Docker image for the Cloudflare platform.
- Uses `docker-compose` to start the containerized application.

## Project Structure

```plaintext
nsm-app/
├── src/
│   ├── platform/
│   │   ├── express/
│   │   │   └── build.js
│   │   ├── cloudflare/
│   │   │   └── build.js
│   └── ...
├── tests/
│   └── .data.json
├── build/
│   ├── express/
│   ├── cloudflare/
├── Dockerfile
├── docker-compose.yml
├── package.json
└── .dockerignore
```

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for more details.