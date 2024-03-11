import express from 'express';
import bodyParser from 'body-parser';
import imageRoutes from './routes/imageRoutes';
import errorHandler from './utils/errorHandler';
import path from 'path';
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public'))); // Serve static files from the 'public' directory
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Routes
app.use('/api', imageRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
