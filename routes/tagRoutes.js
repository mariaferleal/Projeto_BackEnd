import {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag
} from '../controllers/tagController.js';

export async function handleTagRoutes(req, res) {
  const url = req.url;
  const method = req.method;

  // GET /tags
  if ((url === '/tags' || url === '/tags/') && method === 'GET') {
    try {
      const tags = await getAllTags();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(tags));
    } catch (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ message: err.message }));
    }
    return;
  }

  // GET /tags/:id
  if (url.startsWith('/tags/') && method === 'GET') {
    const id = url.split('/')[2];
    try {
      const tag = await getTagById(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(tag));
    } catch (err) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: err.message }));
    }
    return;
  }

  // POST /tags
  if ((url === '/tags' || url === '/tags/') && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const tag = await createTag(data);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tag));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ message: err.message }));
      }
    });
    return;
  }

  // PUT /tags/:id
  if (url.startsWith('/tags/') && method === 'PUT') {
    const id = url.split('/')[2];
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const tag = await updateTag(id, data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tag));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ message: err.message }));
      }
    });
    return;
  }

  // DELETE /tags/:id
  if (url.startsWith('/tags/') && method === 'DELETE') {
    const id = url.split('/')[2];
    try {
      const tag = await deleteTag(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(tag));
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
