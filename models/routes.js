// models/routes.js
const db = require('../db');

async function saveRoutes(userId, title, routesJson) {
  const result = await db.query(
    'INSERT INTO routes (user_id, title, routes_json) VALUES ($1, $2, $3) RETURNING id, created_at',
    [userId, title || null, routesJson]
  );
  return result.rows[0];
}

async function getRoutesByUser(userId) {
  const result = await db.query(
    'SELECT id, title, routes_json, created_at FROM routes WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
}

module.exports = {
  saveRoutes,
  getRoutesByUser
};