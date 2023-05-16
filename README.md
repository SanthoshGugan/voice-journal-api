# Audio Journaling Backend

This repository contains the backend server implementation for the Audio Journaling application. The backend is responsible for handling API requests, managing audio journals, and handling audio file storage.

## Features

- User authentication and authorization
- CRUD operations for audio journals
- Audio file upload and retrieval
- Tagging and metadata management
- Search functionality
- User profile management

## Getting Started

To get started with the backend server, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/audio-journaling-backend.git

2. Install the dependencies:

bash

cd audio-journaling-backend
npm install

3. Configure the environment variables:

    Create a .env file in the root directory.
    Set the necessary environment variables such as database credentials, storage configuration, and API keys.

4. Start the server:

bash

    npm start

    The server should now be running on http://localhost:3000.

## API Endpoints

The backend exposes the following API endpoints:

- User Authentication:
    POST /user/register: Register a new user. (mvp)
    GET /user/login: Authenticate a user and generate a token for authorization. (mvp)
    GET /user/logout: Invalidate the user's token and log them out. (mvp)

- Audio Journal Management:

    POST /user/journal/upload : Upload Audio of journal to s3.
    GET  /user/journal/download/:id: Download Audio of journal from S3.
    POST /user/journal/metadata: post journal information .
    GET  /user/journal/:id: Get specific Journal information.

- Tags:
    POST /tags/: Add a new tag for the user.
    GET  /tags/:id: Get tag by tag id
    POST /tags/journal: Add tags to journal
    GET  /tags/:tag_name/journal: Get journals associated with a specific tag.