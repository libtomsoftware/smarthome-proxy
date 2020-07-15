const express = require('express');
const responder = require('./responder');
const resources = require('./resources');
const { devices, reports, status, tasks } = resources;

module.exports = function routes() {
  const routes = new express.Router();

  routes.get('/status', status.get);
  routes.post('/status', status.set);
  routes.get('/reports', reports.get);
  routes.post('/reports', reports.add);
  routes.delete('/reports', reports.removeAll);
  routes.delete('/reports/:id', reports.remove);
  routes.get('/tasks', tasks.get);
  routes.delete('/tasks/:id', tasks.remove);
  routes.delete('/tasks', tasks.removeAll);
  routes.post('/tasks', tasks.update);
  routes.put('/tasks', tasks.add);
  routes.get('/devices', devices.get);
  routes.delete('/devices/:id', devices.remove);

  routes.all('*', (req, res) => responder.rejectNotFound(res));

  return routes;
};
