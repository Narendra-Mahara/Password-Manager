# Password Manager

A secure password manager built with React, Tailwind CSS, and Appwrite for backend services. This application allows users to store and manage their passwords securely.

## Features

- Secure password storage with encryption (using `crypto-js`)
- Database management with Appwrite
- Responsive UI built with Tailwind CSS
- Notifications using React Toastify

## Tech Stack

- **Frontend**: React, Tailwind CSS, React Toastify
- **Backend**: Appwrite
- **Encryption**: Crypto-JS
- **Development Tools**: Vite

## Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/Narendra-Mahara/Password-Manager.git
cd Password-Manager
yarn
```

## Usage

### Development Server

Start the development server:

```sh
yarn dev
```

### Build for Production

```sh
yarn build
```


## Configuration

Create an `.env` file in the root directory and configure your Appwrite credentials:

```
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_SECRET_KEY="your_secret_key"
```




