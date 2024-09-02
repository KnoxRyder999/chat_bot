# Chat Bot

## Overview

This project is a chatbot powered by OpenAI's GPT-3.5 Turbo Model. It is implemented in MERN (MongoDB, Express, React, Node.js). MongoDB for the database, Express for the backend and React for the frontend. And of course Node.js, which lets you run JavaScript outside the browser.

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js
- MongoDB
- pnpm (Performant Node Package Manager 🚀)

## Setup

1.  Clone the repository:

    ```bash
    git clone https://github.com/Lo1176/MERN-ai-chatbot.git
    ```

2.  Navigate to the project directory:
    `cd MERN-ai-chatbot`

3.  Install dependencies for both the client and server:

    ```bash
    # Install frontend dependencies
    cd frontend
    pnpm i

    # Install backend dependencies
    cd backend
    pnpm i
    ```

4.  Configure environment variables:

    Modify the `.env.txt` file in the `backend` directory and add the following variables and rename it to `.env`:

        ```bash
        OPENAI_API_KEY=your_openai_api_key
        MONGODB_URI=your_mongodb_uri
        ```

5.  Start the application:

    ```bash
    # Start the client (in the frontend directory)
    cd frontend
    pnpm dev

    # Start the server (in the backed directory)
    cd backend
    pnpm dev
    ```
