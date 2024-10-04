# Next.js + NestJS + Mongo

## Demo

- **Web Application:** [https://telecom.adriel.id/](https://telecom.adriel.id/)
- **API Documentation:** [Swagger UI](https://telecom-api-gztuymsfwq-as.a.run.app/swagger)
  Since the API is hosted on Google Cloud Run, the first request may take a few seconds to respond.

## Overview

This project is a full-stack web application that combines **Next.js** for the frontend and **NestJS** for the backend. It utilizes **TanStack Query** for efficient data fetching and state management, while **Swagger** provides interactive API documentation. The API schema is managed with **Orval**, which automates the generation of API clients.

Users can upload CSV files to the backend, where the data is stored in a **MongoDB** database. The frontend offers visualizations of this data, enhancing the user experience.

## Table of Contents

- [Next.js + NestJS + Mongo](#nextjs--nestjs--mongo)
  - [Demo](#demo)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Technologies](#technologies)
  - [Run the Project](#run-the-project)
    - [Clone the Repository](#clone-the-repository)
    - [Run with Docker](#run-with-docker)
    - [Run Locally](#run-locally)
      - [Frontend Setup](#frontend-setup)
      - [Backend Setup](#backend-setup)
  - [API Documentation](#api-documentation)
  - [API Client Generation](#api-client-generation)
  - [Contributing](#contributing)

## Technologies

- **Frontend:** Next.js
- **Backend:** NestJShttps://telecom-api-1028993756151.asia-southeast1.run.app/
- **Data Fetching:** TanStack Query
- **API Documentation:** Swagger
- **API Client Generation:** Orval
- **Database:** MongoDB

## Run the Project

To get started with the project, follow the instructions below:

### Clone the Repository

```bash
git clone https://github.com/drithh/next-nest-mongo.git
cd next-nest-mongo
```

### Run with Docker

1. **Build the Docker Images**

   ```bash
   docker-compose build
   ```

2. **Run the Docker Containers**

   ```bash
   docker-compose up
   ```

3. **Access the Application**
   - **Frontend:** Open [http://localhost:3000](http://localhost:3000) in your browser.
   - **Backend:** Open [http://localhost:5000/swagger](http://localhost:5000/swagger) to view the API documentation in Swagger UI.

### Run Locally

#### Frontend Setup

1. **Navigate to the Frontend Directory**

   ```bash
   cd web
   ```

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

3. **Run the Development Server**

   ```bash
   pnpm run dev
   ```

4. **Open the Application**

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

#### Backend Setup

1. **Navigate to the Backend Directory**

   ```bash
   cd api
   ```

2. **Create a `.env` File**

   Copy the contents of `.env.example` to a new file named `.env`.

   ```bash
   cp .env.example .env
   ```

3. **Install Dependencies**

   ```bash
   pnpm install
   ```

4. **Run the Development Server**

   ```bash
   pnpm run start:dev
   ```

5. **Open Swagger Documentation**

   Visit [http://localhost:5000/swagger](http://localhost:5000/swagger) to access the Swagger UI for the API documentation.

## API Documentation

The API is thoroughly documented using Swagger. For interactive API documentation, navigate to:

- **Swagger UI:** [http://localhost:5000/swagger](http://localhost:5000/swagger)

## API Client Generation

API clients are automatically generated using Orval. To generate or update the API clients:

1. **Run the Orval Generation Script**

   ```bash
   pnpm run api:generate
   ```

## Contributing

We welcome contributions! To contribute to this project, please follow these steps:

1. **Fork the Repository**
2. **Create a Feature Branch**
3. **Commit Your Changes**
4. **Push Your Branch**
5. **Submit a Pull Request**
