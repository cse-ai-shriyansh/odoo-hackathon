const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const auth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/rating - Add a rating for a user (after swap)
router.post('/', auth, async (req, res) => {
  const schema = z.object({
    userId: z.string().uuid(), // The user being rated
    stars: z.number().min(1).max(5),
    role: z.enum(['educator', 'learner']),
    swapId: z.string().uuid().optional()
  });
  try {
    const { userId, stars, role, swapId } = schema.parse(req.body);
    // Prevent self-rating
    if (userId === req.user.userId) return res.status(400).json({ error: 'Cannot rate yourself' });
    // Only allow rating if swap is completed (accepted)
    if (swapId) {
      const swap = await prisma.swapRequest.findUnique({ where: { id: swapId } });
      if (!swap || swap.status !== 'accepted') return res.status(400).json({ error: 'Swap not completed' });
    }
    const rating = await prisma.rating.create({
      data: {
        userId,
        givenById: req.user.userId,
        stars,
        role,
        swapId: swapId || null
      }
    });
    res.status(201).json(rating);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/rating/user/:userId - Get average rating for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const ratings = await prisma.rating.findMany({ where: { userId } });
    if (!ratings.length) return res.json({ average: null, count: 0 });
    const avg = ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length;
    res.json({ average: avg, count: ratings.length });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
