import {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule
} from '../controllers/scheduleController.js';

export async function handleScheduleRoutes(req, res) {
  const url = req.url;
  const method = req.method;

  // GET /schedules
  if ((url === '/schedules' || url === '/schedules/') && method === 'GET') {
    try {
      const schedules = await getAllSchedules();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(schedules));
    } catch (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ message: err.message }));
    }
    return;
  }

  // GET /schedules/:id
  if (url.startsWith('/schedules/') && method === 'GET') {
    const id = url.split('/')[2];
    try {
      const schedule = await getScheduleById(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(schedule));
    } catch (err) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: err.message }));
    }
    return;
  }

  // POST /schedules
  if ((url === '/schedules' || url === '/schedules/') && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const schedule = await createSchedule(data);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(schedule));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ message: err.message }));
      }
    });
    return;
  }

  // PUT /schedules/:id
  if (url.startsWith('/schedules/') && method === 'PUT') {
    const id = url.split('/')[2];
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const schedule = await updateSchedule(id, data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(schedule));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ message: err.message }));
      }
    });
    return;
  }

  // DELETE /schedules/:id
  if (url.startsWith('/schedules/') && method === 'DELETE') {
    const id = url.split('/')[2];
    try {
      const schedule = await deleteSchedule(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(schedule));
    } catch (err) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: err.message }));
    }
    return;
  }

  // Rota não encontrada
  res.writeHead(404);
  res.end(JSON.stringify({ message: 'Rota não encontrada' }));
}
