# Password Manager

A secure password management application built with React, Appwrite, and CryptoJS for encryption. Store and manage your passwords safely with a user-friendly interface.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Appwrite](https://img.shields.io/badge/Appwrite-F02E65?style=for-the-badge&logo=appwrite&logoColor=white)
![React Toastify](https://img.shields.io/badge/React_Toastify-2C2D72?style=for-the-badge&logo=react-toastify&logoColor=white)


## Features

- 🔒 AES-256 encryption for password storage
- 🚀 Powered by Appwrite backend
- 📱 Responsive UI with Tailwind CSS
- 📋 Copy-to-clipboard functionality
- 📢 Toast notifications with React Toastify

## Technologies Used

- **Frontend**: React 
- **Backend**: Appwrite
- **Encryption**: CryptoJS
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Notifications**: React Toastify

## Installation

Clone the repository:

```bash
git clone https://github.com/Narendra-Mahara/Password-Manager.git
cd Password-Manager
yarn
```

## Configuration

Create an `.env` file in the root directory and configure your Appwrite credentials:

```
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_SECRET_KEY="your_secret_key"
```