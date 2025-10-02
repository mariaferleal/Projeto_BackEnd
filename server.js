import dotenv from 'dotenv';
import http from 'http';
dotenv.config();

import mongoose from 'mongoose';
import connectDB from './config/dbConnect.js';

import { handleUserRoutes } from './routes/userRoutes.js';
import { handleTaskRoutes } from './routes/taskRoutes.js';
import { handleTagRoutes } from './routes/tagRoutes.js';
import { handleScheduleRoutes } from './routes/scheduleRoutes.js';

const PORT = process.env.PORT || 3000;
connectDB();

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith('/users')) {
    await handleUserRoutes(req, res);
    return;
  }

  if (req.url.startsWith('/tasks')) {
    await handleTaskRoutes(req, res);
    return;
  }

  if (req.url.startsWith('/tags')) {
    await handleTagRoutes(req, res);
    return;
  }

  if (req.url.startsWith('/schedules')) {
    await handleScheduleRoutes(req, res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Endpoint não encontrado' }));
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  server.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
});
