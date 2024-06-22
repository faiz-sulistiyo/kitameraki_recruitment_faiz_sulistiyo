# Project Name

## My Task (Technical Test)

## Overview

This repository contains two main folders: `frontend` and `backend`. The `frontend` is built using Vite and React, while the `backend` is built using Express.js.

## Notes
I'm not implement store in memory based on this article (it says, "A memory leak occurs when a program allocates memory continuously but fails to free it when it is no longer needed. Eventually, the process can run out of memory and crash.")
https://www.daily.co/blog/introduction-to-memory-management-in-node-js-applications/

## Folder Structure

- `frontend`: Contains the frontend codebase built with Vite and React.
- `backend`: Contains the backend codebase built with Express.js.

## Environment Variables

Both the `frontend` and `backend` folders have their own `.env` files. You can copy the respective `.env.example` file to create a new `.env` file in each folder and configure the necessary environment variables.

## Setup Instructions

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   yarn install
   cp .env.example .env
   yarn dev

### Backend 

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm run dev


### License

This `README.md` provides a clear and concise guide for setting up and running both the frontend and backend of your project, including instructions for handling environment variables.
