const request = require('supertest');
const app = require('../server');


async function obtenerToken() {
  const res = await request(app)
    .post('/usuarios/login')
    .send({ correo: 'test@example.com', pass: 'password123' });
  return res.body.token;
}

async function obtenerTokenDiferente() {
  const res = await request(app)
    .post('/usuarios/login')
    .send({ correo: 'otro@example.com', pass: 'password123' });
  return res.body.token;
}

describe('Publicaciones', () => {
  test('GET /publicaciones - Debería obtener todas las publicaciones', async () => {
    const res = await request(app).get('/publicaciones');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('DELETE /publicaciones/:id - Debería permitir eliminar una publicación propia', async () => {
    const token = await obtenerToken();
    const res = await request(app)
      .delete('/publicaciones/1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Publicación eliminada correctamente');
  });

  test('DELETE /publicaciones/:id - No debería permitir eliminar una publicación de otro usuario', async () => {
    const token = await obtenerTokenDiferente(); // Token de otro usuario
    const res = await request(app)
      .delete('/publicaciones/1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty('message', 'No tienes permiso para eliminar esta publicación');
  });
});

describe('Usuarios', () => {
  test('POST /usuarios/login - Debería fallar con credenciales incorrectas', async () => {
    const res = await request(app).post('/usuarios/login').send({
      correo: 'test@example.com',
      pass: 'wrongpassword'
    });
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Credenciales inválidas');
  });
});

describe('Comentarios', () => {
  test('POST /comentarios - Debería permitir dejar un comentario', async () => {
    const token = await obtenerToken();
    const res = await request(app)
      .post('/comentarios')
      .set('Authorization', `Bearer ${token}`)
      .send({
        calificacion: 5,
        comment: 'Muy buen producto',
        publicacion_id: 1
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Comentario agregado exitosamente');
  });
});

describe('Transacciones', () => {
  test('GET /transacciones - Debería obtener las transacciones del usuario', async () => {
    const token = await obtenerToken();
    const res = await request(app)
      .get('/transacciones')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
