import { getAllTasks, getTaskById, createTask, updateTask, deleteTask, getTasksByUser } from "../controllers/taskController.js";


export async function handleTaskRoutes(req, res) {
  const url = req.url;
  const method = req.method;

  // GET /tasks
  if ((url === '/tasks' || url === '/tasks/') && method === 'GET') {
    try {
      const tasks = await getAllTasks();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(tasks));
    } catch (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ message: err.message }));
    }
    return;
  }

  // GET /tasks/:id
  if (url.startsWith('/tasks/') && method === 'GET') {
    const id = url.split('/')[2];
    try {
      const task = await getTaskById(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(task));
    } catch (err) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: err.message }));
    }
    return;
  }

  // POST /tasks

  if ((url === '/tasks' || url === '/tasks/') && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);

    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const task = await createTask(data);

      // Resposta de sucesso
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(task));
      } catch (err) {
      // Só envia resposta de erro se ainda não tiver sido enviada
        if (!res.headersSent) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: err.message }));
        }
      }
    });

    return;
  }


  // DELETE /tasks/:id
  if (url.startsWith('/tasks/') && method === 'DELETE') {
    const id = url.split('/')[2];
    try {
      const task = await deleteTask(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Tarefa deletada', task }));
    } catch (err) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: err.message }));
    }
    return;
  }

  if (url.startsWith('/tasks/') && method === 'PUT') {
    const id = url.split('/')[2];
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const task = await updateTask(id, data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(task));
      } catch (err) {
        res.writeHead(404);
        res.end(JSON.stringify({ message: err.message }));
      }
    });

    return;
  }

  // Se nenhuma rota casar
  res.writeHead(404);
  res.end(JSON.stringify({ message: 'Rota não encontrada' }));
}
