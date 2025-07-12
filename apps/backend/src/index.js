require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Auth routes
app.use('/api/auth', require('./routes/auth'));

// User profile routes
app.use('/api/user', require('./routes/user'));

// Skill routes
app.use('/api/skill', require('./routes/skill'));

// Swap routes
app.use('/api/swap', require('./routes/swap'));

// Rating routes
app.use('/api/rating', require('./routes/rating'));

// TODO: Add routes for admin, etc.

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});

module.exports = { app, server, io };
