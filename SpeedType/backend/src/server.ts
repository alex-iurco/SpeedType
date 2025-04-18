import express from 'express';
import { createServer as createHttpServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { setupRaceSocket } from './socket/raceSocket';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3001;

// Get allowed origins from environment with more permissive defaults
const getAllowedOrigins = () => {
  const origins = process.env.ALLOWED_ORIGINS;
  if (!origins) {
    console.warn('No ALLOWED_ORIGINS specified, allowing all origins in development');
    return ['http://localhost:3000', 'https://speedtype.robocat.ai', '*'];
  }
  return origins.split(',').map(origin => origin.trim());
};

// Create and configure the app
const app = express();

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Use allowed origins from environment with more detailed logging
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const allowedOrigins = getAllowedOrigins();
    
    // In development or if no origin is set, allow all origins
    if (process.env.NODE_ENV !== 'production' || !origin) {
      callback(null, true);
      return;
    }
    
    // Check if origin is allowed
    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn('CORS: Origin rejected:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Client-Version'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
};

app.use(cors(corsOptions));
app.use(express.json());

// Create router for all API routes
const router = express.Router();

// Root route
router.get('/', (req, res) => {
  console.log('Root endpoint called');
  res.json({ 
    status: 'healthy',
    message: 'SpeedType Backend is running!',
    version: '1.0.1',
    environment: process.env.NODE_ENV || 'development',
    allowedOrigins: getAllowedOrigins(),
    corsMethods: corsOptions.methods
  });
});

// Health check route
router.get('/health', (req, res) => {
  console.log('Health check endpoint called');
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Quotes route
router.get('/quotes', (req, res) => {
  console.log('Quotes endpoint called');
  const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "A journey of a thousand miles begins with a single step.",
    "Actions speak louder than words.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The future depends on what you do today.",
    "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    "The only limit to our realization of tomorrow will be our doubts of today.",
    "It does not matter how slowly you go as long as you do not stop."
  ];
  // Shuffle and return 5 random quotes
  const shuffledQuotes = quotes.sort(() => Math.random() - 0.5).slice(0, 5);
  res.json(shuffledQuotes);
});

// Mount all routes under /api
app.use('/api', router);

// Add catch-all route for debugging
app.use((req, res) => {
  console.log('404 - Route not found:', req.method, req.path);
  console.log('Available routes:', app._router.stack
    .filter((r: any) => r.route && r.route.path)
    .map((r: any) => `${Object.keys(r.route.methods).join(',')} ${r.route.path}`));
  res.status(404).json({ 
    error: 'Not Found',
    path: req.path,
    method: req.method,
    message: 'The requested resource was not found on this server',
    availableRoutes: app._router.stack
      .filter((r: any) => r.route && r.route.path)
      .map((r: any) => `${Object.keys(r.route.methods).join(',')} ${r.route.path}`)
  });
});

// Create HTTP server and Socket.IO instance
const httpServer = createHttpServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: getAllowedOrigins(),
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Client-Version']
  },
  transports: ['polling', 'websocket'],
  allowUpgrades: true,
  pingTimeout: 60000,
  pingInterval: 25000,
  cookie: false,
  allowEIO3: true,
  path: '/socket.io/',
  connectTimeout: 45000,
  maxHttpBufferSize: 1e8,
  perMessageDeflate: false,
  httpCompression: true
});

// Debug Socket.IO events with more focused error logging
io.engine.on("connection_error", (err) => {
  console.error("Socket.IO connection error:", {
    message: err.message,
    code: err.code,
    headers: err.req?.headers?.origin
  });
});

// Add focused Socket.IO connection logging
io.on('connection', (socket) => {
  console.log('New client connected:', {
    id: socket.id,
    transport: socket.conn.transport.name,
    origin: socket.handshake.headers.origin
  });

  socket.conn.on('upgrade', (transport) => {
    console.log('Transport upgraded for client:', socket.id, 'to:', transport.name);
  });

  socket.on('disconnect', (reason) => {
    console.log('Client disconnected:', socket.id, 'reason:', reason);
  });
});

setupRaceSocket(io);

// Start the server if this is the main module
if (require.main === module) {
  // Log all registered routes
  console.log('Registered routes:');
  app._router.stack.forEach((r: any) => {
    if (r.route && r.route.path) {
      console.log(`${Object.keys(r.route.methods).join(',')} ${r.route.path}`);
    }
  });

  httpServer.listen(PORT, () => {
    console.log(`Server listening on *:${PORT}`);
    console.log('Allowed origins:', getAllowedOrigins());
    console.log('CORS methods:', corsOptions.methods);
    console.log('Environment:', process.env.NODE_ENV);
  });
}

// Export for testing and deployment
export { httpServer };
export default app; 