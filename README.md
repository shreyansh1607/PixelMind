# Pixelmind Project

Pixelmind is a full-stack web application that allows users to generate, share, and explore AI-generated images. The project is divided into two main parts: the **Client** (frontend) and the **Server** (backend). Below is a comprehensive overview of the project, including its structure, models, routes, and functionalities.

---

## Table of Contents
- [Project Structure](#project-structure)
- [Client (Frontend)](#client-frontend)
  - [Key Components](#key-components)
  - [Pages](#pages)
  - [Utilities & Constants](#utilities--constants)
- [Server (Backend)](#server-backend)
  - [Models](#models)
  - [Routes](#routes)
  - [Database Connection](#database-connection)
  - [Main Server File](#main-server-file)
- [Functionalities](#functionalities)
- [How It Works](#how-it-works)
- [Setup Instructions](#setup-instructions)

---

## Project Structure

```
Pixelmind/
├── Client/
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── public/
│   │   └── Images/
│   └── src/
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── assets/
│       ├── Components/
│       ├── Constants/
│       ├── Pages/
│       └── Utils/
└── Server/
    ├── index.js
    ├── package.json
    ├── MongoDB/
    │   ├── connect.js
    │   └── Models/
    │       └── model.js
    └── routes/
        ├── aiImageRoutes.js
        └── postRoutes.js
```

---

## Client (Frontend)
The frontend is built with **React** and styled using **Tailwind CSS**. It communicates with the backend server to fetch and display data.

### Key Components
- **Card.jsx**: Displays individual image posts with details like image, prompt, and creator.
- **Formfeild.jsx**: Custom input fields for forms (e.g., prompt input, name input).
- **Loader.jsx**: Shows a loading spinner during async operations.

### Pages
- **Home.jsx**: Displays all posts fetched from the backend. Users can browse and search images.
- **CreatePost.jsx**: Allows users to generate a new image using AI and share it with the community.

### Utilities & Constants
- **Constants/index.js**: Stores static values like API endpoints, default prompts, etc.
- **Utils/index.js**: Contains helper functions (e.g., image download, prompt randomizer).

---

## Server (Backend)
The backend is built with **Node.js** and **Express.js**, using **MongoDB** for data storage.

### Models
- **model.js**: Defines the schema for image posts. Typical fields include:
  - `name`: Name of the user who created the post.
  - `prompt`: The prompt used to generate the image.
  - `photo`: The generated image (usually stored as a base64 string or image URL).

### Routes
- **aiImageRoutes.js**: Handles AI image generation requests. Likely interacts with an AI service (e.g., OpenAI DALL·E) to generate images based on user prompts.
  - **POST /api/v1/ai-image**: Receives a prompt, generates an image, and returns it.

- **postRoutes.js**: Manages CRUD operations for posts.
  - **GET /api/v1/post**: Fetches all posts from the database.
  - **POST /api/v1/post**: Creates a new post with the generated image and user details.

### Database Connection
- **connect.js**: Establishes a connection to the MongoDB database using Mongoose.

### Main Server File
- **index.js**: Entry point for the backend. Sets up Express, connects to MongoDB, configures middleware (CORS, JSON parsing), and mounts the routes.

---

## Functionalities

### 1. AI Image Generation
- Users enter a prompt in the frontend.
- The prompt is sent to the backend (`/api/v1/ai-image`).
- The backend calls an AI service to generate an image and returns it to the frontend.

### 2. Post Creation
- After generating an image, users can share it by providing their name and the prompt.
- The frontend sends this data to the backend (`/api/v1/post`), which saves it in MongoDB.

### 3. Browsing & Searching Posts
- The Home page fetches all posts from the backend and displays them as cards.
- Users can search posts by prompt or creator name.

### 4. Image Download
- Users can download any image from the gallery.

---

## How It Works
1. **User visits the site** and lands on the Home page to browse AI-generated images.
2. **User clicks 'Create'** to generate a new image by entering a prompt.
3. **AI generates the image** and displays it to the user.
4. **User shares the image** by submitting their name and the prompt.
5. **Image is saved** in the database and appears in the community gallery.

---

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- MongoDB instance (local or cloud)

### Backend Setup
1. Navigate to the `Server` directory:
   ```bash
   cd Server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (e.g., MongoDB URI, AI API keys) in a `.env` file.
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `Client` directory:
   ```bash
   cd Client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## Contribution
Feel free to fork this repository, create issues, or submit pull requests to improve the project.

---

## License
Specify your license here (e.g., MIT, Apache 2.0, etc.)

---

## Contact
For questions or support, please contact the project maintainer.
