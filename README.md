# Product Management Interface with Authentication
This project is a full-stack application for product management with user authentication. It includes a React frontend, an Express backend, and a set of APIs for user authentication and product management.

## Table of Contents
- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Project Setup](#project-setup)
- [Running the Application](#running-the-application)
- [Backend Deployment on Vercel](#backend-deployment-on-vercel)
- [Frontend Deployment on Vercel](#frontend-deployment-on-vercel)
- [Usage Instructions](#usage-instructions)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
The application allows users to sign up, log in, and manage a collection of products. It includes a dashboard for viewing and managing products, with a protected route requiring user authentication.

## Technology Stack
- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Express, TypeScript
- **Deployment**: Vercel

## Project Setup
To set up the project locally, you'll need the following:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Vercel CLI](https://vercel.com/download) (optional, for deploying to Vercel)

### Clone the Repository
git clone https://github.com/your-username/product-management-app.git

### Install Dependencies
cd tersano
npm install

## Running the Application
To run the application locally, start the backend and frontend:
Start the Backend
Ensure the backend's CORS settings allow requests from http://localhost:3000.
Start the backend server: 
npx tsc index.ts
node index.js
The backend should now be running on http://localhost:3001 (or the specified port).

Start the Frontend
Start the frontend development server:
cd tersano
npm start
The frontend should now be running on http://localhost:3000.

## Backend Deployment on Vercel
To deploy the backend to Vercel:

1. Ensure the backend's CORS configuration allows requests from the Vercel-deployed frontend.
2. Deploy using Vercel CLI or through the Vercel dashboard.
3. Verify that the backend is accessible at the Vercel-deployed URL.

## Frontend Deployment on Vercel
To deploy the frontend to Vercel:

1. Ensure the frontend is configured to communicate with the deployed backend.
2. Deploy using Vercel CLI or through the Vercel dashboard.
3. Verify that the frontend is accessible and communicates with the backend without CORS issues.

## Usage Instructions
- **Sign Up**: Users can sign up using the `/signup` endpoint on the frontend.
- **Log In**: Upon successful sign-up, users can log in with the `/login` endpoint.
- **Product Management**: Authenticated users can access the dashboard to view and manage products.
- **Protected Routes**: Ensure routes that require authentication are protected.

## Known Issues
List any known issues or bugs, along with solutions if available.

## Contributing
This project is not open for contributions.

## License
This project is not licensed.
