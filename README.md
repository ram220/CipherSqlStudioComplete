# CipherSQLStudio 🚀

CipherSQLStudio is a browser-based SQL learning platform built using the MERN stack. It allows users to practice SQL queries on predefined assignments, execute queries in real time, and track their learning progress.

The project follows a mono-repo architecture where both frontend and backend are maintained in a single GitHub repository.

---

## Features

- User registration and login
- SQL practice assignments with difficulty levels
- Browser-based SQL query editor
- Real-time query execution and results
- User progress tracking
- Secure authentication using JWT
- Assignment data stored in MongoDB

---

## Tech Stack

Frontend:
- React
- Axios
- HTML
- CSS

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)

Database:
- MongoDB Atlas

---

## Project Structure

CipherSQLStudio/
├── frontend/
├── backend/
├── README.md
└── .gitignore


## Environment Variables

Backend (`backend/.env`):

MONGO_URI=my_mongodb_atlas_connection_string
MY_SECRET_KEY=my_jwt_secret
POSTGRES_URI=my_postgres_connection_string
PORT=8000


## Run Locally

Start Backend:

cd backend

npm start

Backend runs on:

http://localhost:8000


Start Frontend:

cd frontend

npm start


Frontend runs on:

http://localhost:3000


---

## Deployment

- Frontend deployed on Vercel
- Backend deployed on Render
- Database hosted on MongoDB Atlas

Deployment uses a mono-repo approach:
- Backend deployed from `/backend`
- Frontend deployed from `/frontend`

---

## Application Flow

1. User registers or logs in
2. User views SQL assignments
3. User writes and executes SQL queries
4. Results are displayed instantly
5. User progress is saved

---

## Future Enhancements

- AI-powered SQL hints
- Admin panel for assignment management
- Advanced SQL topics
- Leaderboard and scoring system

---

## Author

Valluru Rama krishna

---

## License

This project is developed for educational purposes.
