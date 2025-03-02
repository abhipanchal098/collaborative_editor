# Project Setup

This project consists of two main folders:

1. **frontend** - Contains the front-end code.
2. **backend** - Contains the back-end code.

## Installation

Navigate to each folder and install dependencies:

```sh
cd frontend
npm i

cd ../backend
npm i
```

## Running the Project

### Start the Frontend

```sh
cd frontend
npm start
```

### Start the Backend

```sh
cd backend

# Create .env file with:
MONGO_URI=mongodb://localhost:27017/collaborative-editor
JWT_SECRET=mysecretkey789

node server.js
```
