const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const auth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

const updateProfileSchema = z.object({
  name: z.string().min(1).optional(),
  location: z.string().optional(),
  profilePhoto: z.string().optional(),
  experience: z.string().optional(),
  projects: z.string().optional(),
  availability: z.string().optional(),
});

// GET /api/user/me
router.get('/me', auth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true, name: true, email: true, location: true, profilePhoto: true,
        experience: true, projects: true, availability: true, isPublic: true, role: true
      }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Fetch skills offered and wanted
    const offered = await prisma.userSkillsOffered.findMany({
      where: { userId: req.user.userId },
      include: { skill: { select: { id: true, name: true } } }
    });
    const wanted = await prisma.userSkillsWanted.findMany({
      where: { userId: req.user.userId },
      include: { skill: { select: { id: true, name: true } } }
    });

    res.json({
      ...user,
      skillsOffered: offered.map(o => o.skill),
      skillsWanted: wanted.map(w => w.skill)
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/user/me
router.put('/me', auth, async (req, res) => {
  try {
    const data = updateProfileSchema.parse(req.body);
    const user = await prisma.user.update({
      where: { id: req.user.userId },
      data,
      select: {
        id: true, name: true, email: true, location: true, profilePhoto: true,
        experience: true, projects: true, availability: true, isPublic: true, role: true
      }
    });
    res.json(user);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// PATCH /api/user/me/public
router.patch('/me/public', auth, async (req, res) => {
  try {
    const { isPublic } = req.body;
    if (typeof isPublic !== 'boolean') {
      return res.status(400).json({ error: 'isPublic must be a boolean' });
    }
    const user = await prisma.user.update({
      where: { id: req.user.userId },
      data: { isPublic },
      select: {
        id: true, name: true, isPublic: true
      }
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/user/all - List all public users except self
router.get('/all', auth, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        isPublic: true,
        NOT: { id: req.user.userId }
      },
      select: {
        id: true,
        name: true,
        email: true,
        profilePhoto: true,
        location: true
      }
    });
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
