const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'));

// Game session schema
const sessionSchema = new mongoose.Schema({
  coinAddress: String,
  tradingVolume: Number,
  currentPrice: Number,
  creatorRewards: Number,
  userAddress: String,
  tutorialProgress: Number,
  createdAt: { type: Date, default: Date.now },
});

const Session = mongoose.model('Session', sessionSchema);

// API endpoints
app.get('/api/sessions/:coinAddress', async (req, res) => {
  const session = await Session.findOne({ coinAddress: req.params.coinAddress });
  res.json(session);
});

app.post('/api/sessions', async (req, res) => {
  const session = new Session(req.body);
  await session.save();
  res.json(session);
});

app.put('/api/sessions/:coinAddress/tutorial', async (req, res) => {
  const session = await Session.findOneAndUpdate(
    { coinAddress: req.params.coinAddress },
    { tutorialProgress: req.body.progress },
    { new: true }
  );
  res.json(session);
});

// Mock AI endpoint (replace with xAI API integration)
app.get('/api/ai/hints/:coinAddress', async (req, res) => {
  const session = await Session.findOne({ coinAddress: req.params.coinAddress });
  const hint = {
    message: `Cash out soon—multiplier trends suggest a crash at ${Math.random() * 10}x!`,
    confidence: 0.85,
  };
  res.json(hint);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));