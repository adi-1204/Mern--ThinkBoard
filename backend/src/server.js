import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import cors from 'cors';
// Load environment variables
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
dotenv.config();
const PORT = process.env.PORT || 5000;

// Initialize Express app
const app = express();

// Connect to the database


// Middleware to parse JSON bodies
app.use(cors(
  {
    origin: 'http://localhost:5173', 
  }
));
app.use(express.json());

app.use(rateLimiter);

// Custom middleware to log request details
app.use((req, res, next) => {
  console.log(`Request method: ${req.method} URL: ${req.url}`);
  next();
}
);

// Routes
app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
});
});




