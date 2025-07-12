const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const auth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/swap - Create a new swap request
router.post('/', auth, async (req, res) => {
  const schema = z.object({
    toUserId: z.string().uuid(),
    skillOfferedId: z.string().uuid(),
    skillWantedId: z.string().uuid()
  });
  try {
    const { toUserId, skillOfferedId, skillWantedId } = schema.parse(req.body);
    const swap = await prisma.swapRequest.create({
      data: {
        fromUserId: req.user.userId,
        toUserId,
        status: 'pending',
        // Optionally: store skillOfferedId and skillWantedId as custom fields if your schema supports
      }
    });
    res.status(201).json(swap);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// PATCH /api/swap/:id - Update swap status (accept/reject/cancel)
router.patch('/:id', auth, async (req, res) => {
  const schema = z.object({ status: z.enum(['accepted', 'rejected', 'cancelled']) });
  try {
    const { status } = schema.parse(req.body);
    const { id } = req.params;
    // Only toUser can accept/reject, fromUser can cancel
    const swap = await prisma.swapRequest.findUnique({ where: { id } });
    if (!swap) return res.status(404).json({ error: 'Swap request not found' });
    if (
      (status === 'cancelled' && swap.fromUserId !== req.user.userId) ||
      ((status === 'accepted' || status === 'rejected') && swap.toUserId !== req.user.userId)
    ) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    const updated = await prisma.swapRequest.update({ where: { id }, data: { status } });
    res.json(updated);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/swap/sent - List sent swap requests
router.get('/sent', auth, async (req, res) => {
  try {
    const swaps = await prisma.swapRequest.findMany({
      where: { fromUserId: req.user.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(swaps);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/swap/received - List received swap requests
router.get('/received', auth, async (req, res) => {
  try {
    const swaps = await prisma.swapRequest.findMany({
      where: { toUserId: req.user.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(swaps);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
