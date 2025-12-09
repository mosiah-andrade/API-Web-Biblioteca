import { Router } from "express";
import { LivroController } from "./controller/LivroController";

const routes = Router();
const controller = new LivroController();

routes.post("/api/livros", (req, res) => controller.create(req, res));
routes.get("/api/livros", (req, res) => controller.list(req, res));
routes.get("/api/livros/:id", (req, res) => controller.show(req, res));
routes.put("/api/livros/:id", (req, res) => controller.update(req, res));
routes.delete("/api/livros/:id", (req, res) => controller.delete(req, res));

export default routes;