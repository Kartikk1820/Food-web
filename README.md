<div align="center">

  <h1>🍔 Foodlify</h1>

  <p>
    <strong>A comprehensive full-stack food ordering and recipe management platform.</strong>
  </p>

  <p>
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js" />
    <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/ejs-%23B4CA65.svg?style=for-the-badge&logo=ejs&logoColor=black" alt="EJS" />
  </p>

</div>

## 🚀 Overview

**Foodlify** is a dynamic web application that allows users to explore recipes, read and leave reviews, and manage a personalized cart. The application features robust user authentication, image uploading capabilities, and a responsive frontend powered by EJS templating. 

## ✨ Key Features

- **User Authentication:** Secure login, registration, and session management using Passport.js.
- **Recipe Management:** Users can browse, add, edit, and delete food recipes (CRUD operations).
- **Review System:** Integrated commenting and rating system for each recipe.
- **Shopping Cart:** Users can add items to a personalized cart and manage their orders.
- **Image Uploads:** Seamless image storage and retrieval using Cloudinary and Multer.
- **Responsive UI:** Server-side rendered views using EJS and EJS-Mate for dynamic layout management.
- **Secure Data Storage:** MongoDB integration with Mongoose for structured and scalable data handling.

## 🛠️ Tech Stack

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (ODM)
- Passport.js (Authentication)
- Express-Session & Connect-Mongo (Session storage)

**Frontend:**
- EJS (Embedded JavaScript)
- EJS-Mate (Layouts)
- HTML5, CSS3, JS

**Utilities & Services:**
- Cloudinary & Multer-Storage-Cloudinary (Image processing)
- Joi (Data validation)
- Connect-Flash (Flash messages)
- Dotenv (Environment variable management)

## 📁 Project Architecture

```text
Foodlify/
├── controller/         # Application logic and request handling (MVC pattern)
├── init/               # Database initialization and seeding scripts
├── models/             # Mongoose schemas (User, Recipe, Review, CartItem, Order)
├── public/             # Static assets (CSS, client-side JS, images)
├── routes/             # Express modular route definitions
├── utils/              # Helper utilities (Async wrapper, Custom Error handling)
├── views/              # EJS templates and reusable layouts
├── app.js              # Main application entry point and server setup
├── cloudConfig.js      # Cloudinary service configuration
├── middleware.js       # Custom Express middlewares (e.g., auth guards)
└── schema.js           # Joi validation schemas for robust API security
```

## ⚙️ Installation & Setup

To run this project locally, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/) (v20.x or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas)
- [Cloudinary Account](https://cloudinary.com/) (For handling image uploads)

### 1. Clone the repository
```bash
git clone https://github.com/Kartikk1820/Foodlify.git
cd Foodlify
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add the following configuration:
```env
# Database Configuration
ATLASDB_URL=your_mongodb_connection_string

# Session Configuration
SECRET=your_session_secret_key

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### 4. Start the Application
Run the server:
```bash
node app.js
```
The application will be accessible at `http://localhost:8000`.

## 🛡️ Security & Error Handling
- **Data Validation:** Server-side validation using `Joi` prevents invalid data from reaching the database.
- **Authentication Guards:** Custom middlewares ensure protected routes are only accessible to authenticated and authorized users.
- **Error Handling:** Global error handling middleware catches asynchronous errors gracefully using a custom `wrapAsync` utility and an `ExpressError` class, preventing server crashes and providing user-friendly error pages.

## 👨‍💻 Author

**Kartik**
- GitHub: [@Kartikk1820](https://github.com/Kartikk1820)
