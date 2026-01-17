// routes/routes.js
const express = require('express');
const auth = require('./middleware/auth');
const { saveRoutes, getRoutesByUser } = require('../models/routes');

const router = express.Router();

// сохранить маршруты (заменить/создать)
// ожидание: JSON body { title: "Мой тур", routes: [...] }
router.post('/save', auth, async (req, res) => {
  try {
    const userId = req.userId;
    const { title, routes } = req.body;
    if (!routes) return res.status(400).json({ error: 'routes required' });

    // сохраняем JSON в поле routes_json
    const saved = await saveRoutes(userId, title || null, routes);
    res.json({ ok: true, id: saved.id, created_at: saved.created_at });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

// получить список сохранённых маршрутов пользователя
router.get('/list', auth, async (req, res) => {
  try {
    const userId = req.userId;
    const rows = await getRoutesByUser(userId);
    // rows: id, title, routes_json, created_at
    res.json({ routes: rows });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;