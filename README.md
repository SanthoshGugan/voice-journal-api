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
    /api/register: Register a new user. (mvp)
    /api/login: Authenticate a user and generate a token for authorization.
    /api/logout: Invalidate the user's token and log them out.

- Audio Journal Management:
    /api/journals: Retrieve a list of the user's audio journals.
    /api/journals/:id: Get details of a specific audio journal.
    /api/journals/:id/update: Update an existing audio journal.
    /api/journals/:id/delete: Delete a specific audio journal.

<!-- - Audio File Management:
    /api/audio/upload: Upload an audio file for a journal.
    /api/audio/:id/download: Download the audio file for a journal.
    /api/audio/:id/delete: Delete the audio file for a journal. -->

- Metadata and Tags:
    /api/journals/:id/tags: Retrieve tags associated with a journal.
    /api/tags: Get a list of all available tags.
    /api/tags/:id/journals: Get journals associated with a specific tag.

- Search Functionality:
    /api/journals/search: Search for journals based on keywords or tags.

- User Profile:
    /api/profile: Retrieve the user's profile information.
    /api/profile/update: Update the user's profile details.