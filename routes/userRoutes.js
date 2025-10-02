import { getAllUsers, getUserById, createUser, deleteUser, updateUser } from '../controllers/userController.js';

export async function handleUserRoutes(req, res) {
  const url = req.url;
  const method = req.method;
  
    if (url.startsWith('/users/') && method === 'GET' && url.split('/').length === 3) {
    const id = url.split('/')[2];
    try {
      const user = await getUserById(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } catch (err) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: err.message }));
    }
    return;
  }

// GET /users
  if ((url === '/users' || url === '/users/') && method === 'GET') {
    try {
      const users = await getAllUsers();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(users));
    } catch (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ message: err.message }));
    }
    return;
  }

  // POST /users
  if (url.startsWith('/users/') && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const user = await createUser(data);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ message: err.message }));
      }
    });
    return;
  }

  // DELETE /users/:id
  if (url.startsWith('/users/') && method === 'DELETE') {
    const id = url.split('/')[2];
    try {
      const user = await deleteUser(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Usuário deletado', user }));
    } catch (err) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: err.message }));
    }
    return;
  }

  // if (url.startsWith('/users/') && method === 'PUT') {
  //   const id = url.split('/')[2];
  //   try {
  //     const user = await updateUser(id, data);
  //     res.writeHead(200, { 'Content-Type': 'application/json' });
  //     res.end(JSON.stringify(user));
  //   } catch (err) {
  //     res.writeHead(404);
  //     res.end(JSON.stringify({ message: err.message }));
  //   }
  //   return;
  // }
  if (url.startsWith('/users/') && method === 'PUT') {
  const id = url.split('/')[2];
  let body = '';

  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', async () => {
    try {
      console.log('Raw body:', body);
      const data = JSON.parse(body);
      console.log('Parsed data:', data);
      console.log('Updating user id:', id);

      const user = await updateUser(id, data);
      console.log('User updated:', user);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } catch (err) {
      console.error('Update error:', err);
      res.writeHead(400);
      res.end(JSON.stringify({ message: err.message }));
    }
  });

  return;
}


  res.writeHead(404);
  res.end(JSON.stringify({ message: 'Rota não encontrada' }));
}
