import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables right at the top
dotenv.config();

// Now, import other files that use environment variables
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';


// Connect to Database
connectDB();

const app = express();
const server = http.createServer(app);

// Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST"]
  }
});

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes(io)); // Pass io instance to routes

// Socket.io connection logic
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Join a room based on pincode when a provider logs in
  socket.on('join_pincode_room', (pincode) => {
    socket.join(pincode);
    console.log(`Provider ${socket.id} joined room for pincode: ${pincode}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
