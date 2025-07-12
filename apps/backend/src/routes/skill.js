const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const auth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/skill - List all skills
router.get('/', async (req, res) => {
  try {
    const skills = await prisma.skill.findMany({ select: { id: true, name: true } });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/skill/offered - Add skill to user's offered skills
router.post('/offered', auth, async (req, res) => {
  const schema = z.object({ skillId: z.string().uuid() });
  try {
    const { skillId } = schema.parse(req.body);
    await prisma.userSkillsOffered.create({
      data: { userId: req.user.userId, skillId }
    });
    res.json({ message: 'Skill added to offered skills' });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/skill/offered - Remove skill from user's offered skills
router.delete('/offered', auth, async (req, res) => {
  const schema = z.object({ skillId: z.string().uuid() });
  try {
    const { skillId } = schema.parse(req.body);
    await prisma.userSkillsOffered.deleteMany({
      where: { userId: req.user.userId, skillId }
    });
    res.json({ message: 'Skill removed from offered skills' });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/skill/wanted - Add skill to user's wanted skills
router.post('/wanted', auth, async (req, res) => {
  const schema = z.object({ skillId: z.string().uuid() });
  try {
    const { skillId } = schema.parse(req.body);
    await prisma.userSkillsWanted.create({
      data: { userId: req.user.userId, skillId }
    });
    res.json({ message: 'Skill added to wanted skills' });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/skill/wanted - Remove skill from user's wanted skills
router.delete('/wanted', auth, async (req, res) => {
  const schema = z.object({ skillId: z.string().uuid() });
  try {
    const { skillId } = schema.parse(req.body);
    await prisma.userSkillsWanted.deleteMany({
      where: { userId: req.user.userId, skillId }
    });
    res.json({ message: 'Skill removed from wanted skills' });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
