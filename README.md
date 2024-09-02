
## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://www.docker.com/products/docker-desktop) (including Docker Compose)
- [Git](https://git-scm.com/)

## Repository Structure

- `frontend-devlinks/`: Contains the React.js frontend application.
- `backend-devlinks/`: Contains the Node.js backend application.
- `docker-compose.yml`: Docker Compose configuration for the full-stack setup.
- `Dockerfile` (frontend): Dockerfile for the frontend application.
- `Dockerfile` (backend): Dockerfile for the backend application.
- `Dockerfile.migration` (migration) : for the migration of database

## Getting Started

### Clone the Repository

First, clone the repository from GitHub:

```bash
git clone https://github.com/singhjoginder321/Devlinks-fullstack.git
cd Devlinks-fullstack
```

### Docker Compose Setup

The `docker-compose.yml` file in the root of the repository defines how the frontend, backend, and PostgreSQL services are configured. To build and start all services, run:

```bash
docker-compose up --build
```

This command will:

1. Build Docker images for both the frontend and backend.
2. Start containers for the frontend, backend, and PostgreSQL.
3. Set up network connections between the services.

### Accessing the Applications

- **Frontend**: Open your web browser and navigate to `http://localhost:5173` to see the frontend application.
- **Backend**: The backend application will be accessible via `http://localhost:8001`.

### PostgreSQL Database

The PostgreSQL database is also set up in a Docker container. To access the PostgreSQL database using `psql`, follow these steps:

1. **Get Container ID**: First, find the container ID of the PostgreSQL container:

   ```bash
   docker ps
   ```

   Look for a container with an image name similar to `postgres` and note its container ID.

2. **Access PostgreSQL Using `psql`**: Run the following command to start a `psql` session inside the PostgreSQL container:

   ```bash
   docker exec -it <container_id> psql -U your_username -d your_database
   ```

   Replace `<container_id>` with the actual container ID you found earlier. Use the `PG_USER` and `PG_DATABASE` values specified in your `.env` file for `your_username` and `your_database`.

### Configuration

#### Frontend

If you need to configure environment variables for the frontend, create a `.env` file in the `frontend-devlinks/` directory. Refer to the `frontend-devlinks/.env.example` file for available configuration options.

#### Backend

For the backend, configure environment variables by creating a `.env` file in the `backend-devlinks/` directory with the following content:

```bash
PORT=8001
MONGO_URI=
JWT_SECRET=2
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NODE_ENV=false # it should be true in production
MAIL_PASS=
MAIL_USER=
MAIL_HOST=smtp.gmail.com
MAIL_SECURE=
PG_HOST=db
PG_USER=your_username
PG_PASSWORD=your_password
PG_DATABASE=your_database
PG_PORT=5432
```

Make sure to replace placeholders with actual values. Note that `PG_HOST` is set to `db`, which is the service name defined in `docker-compose.yml`.

### Running Migrations and Seeding

For the backend, you need to run migrations and seed the database after starting the containers:

1. **Run Migrations**:

   ```bash
   npx knex migrate:latest --env development
   ```

2. **Seed the Database**:

   ```bash
   backend npx knex seed:run --env development
   ```

### Troubleshooting

- **Port Conflicts**: Ensure that the ports defined in `docker-compose.yml` are not already in use on your host machine.
- **Environment Variables**: Verify that all required environment variables are correctly set in the `.env` files.

## Stopping the Services

To stop the Docker containers, use:

```bash
docker-compose down
```

This command stops and removes all containers defined in `docker-compose.yml`.

---

