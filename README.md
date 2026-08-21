<div align="center">
  <h1>💬 Re-Chatty</h1>
  <p>A full-stack, real-time messaging application with customizable themes and seamless user experience.</p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.io" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  </p>
</div>

---

## 📖 Overview

**Re-Chatty** is a modern, responsive, and fully functional real-time chat application. It provides users with a seamless way to connect, update their profiles, and chat instantly in an aesthetically pleasing environment. The app includes features such as real-time bi-directional communication, user authentication, profile picture uploads, and a dynamic theming system.

This project is built using a robust stack featuring React on the frontend, Node.js on the backend, MongoDB for data storage, and Socket.IO for real-time web sockets.

## 🌐 Live Demo

**[Visit Re-Wild Oasis](https://re-chatty.nmv-apps.in)**

## ✨ Features

- **⚡ Real-time Messaging:** Instant communication using WebSockets via Socket.IO.
- **🔐 Secure Authentication:** JWT-based user authentication and authorization.
- **🖼️ Media Uploads:** Profile picture uploads and management powered by Cloudinary.
- **🎨 Dynamic Themes:** Personalize your chat experience with multiple beautiful themes powered by DaisyUI.
- **📱 Fully Responsive:** Optimized UI that works perfectly across mobile, tablet, and desktop devices.
- **🐳 Containerized:** Fully integrated Docker Compose setup for easy local development and deployment.
- **🐻 State Management:** Efficient client-side state handling with Zustand.

## 🛠️ Tech Stack

### Frontend

- **React 19**
- **Vite**
- **Tailwind CSS 4** + **DaisyUI 5**
- **Zustand** (State Management)
- **React Router DOM**
- **Socket.IO Client**

### Backend

- **Node.js & Express.js**
- **MongoDB** (with **Mongoose**)
- **Socket.IO** (Real-time engine)
- **JSON Web Tokens (JWT)** (Auth)
- **Cloudinary** (Image hosting)
- **BcryptJS** (Password hashing)

---

## 🚀 Getting Started

You can run this project either natively on your machine or using Docker.

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (v22+ recommended)
- [pnpm](https://pnpm.io/)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- [Docker](https://www.docker.com/) & Docker Compose (Optional)

### Environment Variables

Before starting the app, navigate to the `api` directory and create a `.env` file based on the required keys:

```env
# api/.env

PORT=3000
NODE_ENV=development

# MongoDB URI
MONGODB_CONNECTION_STRING=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Cloudinary Setup for Image Uploads
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

### Method 1: Using Docker (Recommended)

The easiest way to get the app running is via Docker Compose, which will spin up both the API and the UI containers automatically.

1. Clone the repository and navigate to the project root:
   ```bash
   cd re-chatty
   ```
2. Build and start the containers in detached mode:
   ```bash
   docker-compose up -d --build
   ```
3. Open your browser:
   - Frontend is running on `http://localhost:5173`
   - Backend API is running on `http://localhost:3000`

---

### Method 2: Running Locally (Manual Setup)

If you prefer to run the applications directly on your machine:

#### 1. Start the Backend API

```bash
cd api
pnpm install
pnpm run server
```

#### 2. Start the Frontend UI

Open a new terminal window:

```bash
cd ui
pnpm install
pnpm run dev
```

The frontend will start on `http://localhost:5173` and automatically connect to your local backend API.

---

## 📂 Project Structure

```text
re-chatty/
│
├── api/                  # Backend Node.js / Express server
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── lib/          # Database, socket & cloudinary configs
│   │   ├── middlewares/  # Auth middleware
│   │   ├── models/       # Mongoose Schemas (User, Message)
│   │   └── routes/       # Express routes
│   └── Dockerfile
│
├── ui/                   # Frontend React / Vite application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── lib/          # Axios configurations
│   │   ├── pages/        # Application views (Home, Login, Profile, etc.)
│   │   └── store/        # Zustand state stores
│   ├── index.html
│   └── Dockerfile
│
└── docker-compose.yaml   # Docker configuration to run the full stack
```
