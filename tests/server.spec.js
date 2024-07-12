const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto", async () => {
        const response = await request(server).get("/cafes");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("DELETE /cafes/:id devuelve un código 404 al intentar eliminar un café con un id que no existe", async () => {
        const fakeId = 999;
        const response = await request(server).delete(`/cafes/${fakeId}`).set("Authorization", "Bearer token");
        expect(response.status).toBe(404);
    });

    it("POST /cafes agrega un nuevo café y devuelve un código 201", async () => {
        const nuevoCafe = {
            id: 5,
            nombre: "Latte"
        };
        const response = await request(server).post("/cafes").send(nuevoCafe);
        expect(response.status).toBe(201);
        expect(response.body.some(cafe => cafe.id === nuevoCafe.id)).toBe(true);
    });

    it("PUT /cafes/:id devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload", async () => {
        const cafeActualizado = {
            id: 6,
            nombre: "Espresso"
        };
        const response = await request(server).put("/cafes/5").send(cafeActualizado);
        expect(response.status).toBe(400);
    });
});
