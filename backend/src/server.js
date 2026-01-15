import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import cors from 'cors';
import path from 'path';
// Load environment variables
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
dotenv.config();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Initialize Express app
const app = express();

// Connect to the database

if(process.env.NODE_ENV!=='production'){
  app.use(cors(
  {
    origin: 'http://localhost:5173', 
  }
));
}

// Middleware to parse JSON bodies

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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname,"../frontend/dist")));

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
}
);
}

connectDB().then(() => {
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
});
});

