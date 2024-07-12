# Desafío de Testing Unitario con JEST y Supertest

Este proyecto es un desafío de testing unitario para una API RESTful de una cafetería, utilizando JEST y Supertest. A continuación se detallan los requerimientos del desafío y cómo se cumplen.

## Descripción

La Cafetería Nanacao está abriendo una nueva sucursal y ha solicitado el desarrollo de tests para comprobar que todas las funcionalidades de su API RESTful funcionen correctamente. Este desafío consiste en crear tests para probar las diferentes rutas existentes en la API de apoyo.

## Requerimientos

1. **Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto.**
   ```javascript
   it("GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto", async () => {
       const response = await request(server).get("/cafes");
       expect(response.status).toBe(200);
       expect(Array.isArray(response.body)).toBe(true);
       expect(response.body.length).toBeGreaterThan(0);
   });

2. **Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe.**
```javascript
it("DELETE /cafes/:id devuelve un código 404 al intentar eliminar un café con un id que no existe", async () => {
    const fakeId = 999;
    const response = await request(server).delete(`/cafes/${fakeId}`).set("Authorization", "Bearer token");
    expect(response.status).toBe(404);
});

3. **Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201.**
```javascript
it("POST /cafes agrega un nuevo café y devuelve un código 201", async () => {
    const nuevoCafe = {
        id: 5,
        nombre: "Latte"
    };
    const response = await request(server).post("/cafes").send(nuevoCafe);
    expect(response.status).toBe(201);
    expect(response.body.some(cafe => cafe.id === nuevoCafe.id)).toBe(true);
});

4. **Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload.**
```javascript
it("PUT /cafes/:id devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload", async () => {
    const cafeActualizado = {
        id: 6,
        nombre: "Espresso"
    };
    const response = await request(server).put("/cafes/5").send(cafeActualizado);
    expect(response.status).toBe(400);
});


![imagen](https://github.com/user-attachments/assets/cdbacf61-bdb0-464a-bc7d-07b0be861b98)

