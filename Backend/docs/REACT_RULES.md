# React Project Structure

This document describes the folder structure and source code organization inside a React project. Following this structure helps keep the project maintainable, scalable, and easier for teamwork. React with Javascript not TypeScript

---
Create project react with: npm create vite@latest my-react-app
install dependencies: react-routerDOm, axios,antd, antd-icons,redux,sass(scss)
Make sure all version is suitable for project
-----
Just using redux for auth


## 📁 Project Overview

```text
my-react-app/
├── public/                 # Static assets that are not processed during build (favicon, robots.txt...)
├── src/                    # Main source code of the application
│   ├── assets/             # Images, fonts, icons, and other media files
│   ├── components/         # Reusable UI components (Button, Input, Modal...)
│       ├─Header/
            Header.jsx
            Header.scss
            .....
│   ├── contexts/           # React Context API for global state management
│   ├── hooks/              # Custom React hooks (useAuth, useClickOutside...)
│   ├── layouts/            # Page wrapper layouts (MainLayout, AuthLayout...)
│   ├── pages/              # Main application pages (Home, Login, Profile...)
│   ├── routes/             # Routing configuration (React Router)
│   ├── services/           # API calls and backend communication logic
│   ├── store/              # Complex state management (Redux, Zustand...)
│   ├── styles/             # SCSS
│   ├── utils/              # Shared utility functions (formatDate, validators...)
│   ├── App.jsx             # Root component of the application
│   └── main.jsx            # Application entry point
│
├── .env                    # Environment variables configuration
├── .gitignore              # Files and folders excluded from Git
├── package.json            # Project information, dependencies, and scripts
├── README.md               # Project documentation
└── vite.config.js          # Vite configuration (if using Vite)

-----
Working with call API: Custome axios + axios interceptor
exmaple with call api
export const callRegister = (email, fullName, phone, password) => {
  const URL = "/api/v1/auth/register";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
    role: {
      id: 2,
    },
  };
  return axios.post(URL, data);
};