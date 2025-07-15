# Learn Enroll Connect Frontend

## Project Overview

This is the frontend for the Learn Enroll Connect platform, built with React, Vite, TypeScript, shadcn-ui, and Tailwind CSS.

**Live Site:** [https://learn-enroll-connect-frontend.onrender.com](https://learn-enroll-connect-frontend.onrender.com)

---

## Getting Started (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation & Running Locally

```sh
# 1. Clone the repository
 git clone <YOUR_GIT_URL>

# 2. Navigate to the project directory
 cd learn-enroll-connect-frontend

# 3. Install dependencies
 npm install

# 4. Start the development server
 npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

---

## Deployment

This project is deployed on [Render](https://render.com/).

### Build & Deploy Steps
1. **Build Command:**
   ```sh
   npm install && npm run build
   ```
2. **Publish Directory:**
   ```
   dist
   ```
3. **Environment Variables:**
   - If your app needs to connect to an API or use secrets, add them in a `.env` file or in the Render dashboard. Example:
     ```env
     VITE_API_URL=https://your-backend-api.com
     ```

---

## Technologies Used
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [shadcn-ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## Contributing
Feel free to fork this repo, make changes, and submit pull requests!

---

## License
This project is licensed under the MIT License.
