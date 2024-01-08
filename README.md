# SocketAuth

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Running with Docker

To run this application using Docker, follow these steps:

1. **Cloning the Repository**:
First, clone the repository to your local machine:
```bash
git clone https://github.com/LuckyDg/Socket-Auth
```
2. **Building the Docker Image**:
Navigate to the project directory and build the Docker image:
```bash
cd tu-repositorio
docker build -t socket-auth .
```
3. **Running the Docker Container**:
Once the image is built, you can run it in a Docker container:

```bash
docker run -d -p 8080:80 exam-socket-auth
```
This command starts a container and maps port 80 of the container to port 8080 of your host machine.

## Accessing the Application:
After the container starts, you can access the application by navigating to http://localhost:8080/ in your web browser.



