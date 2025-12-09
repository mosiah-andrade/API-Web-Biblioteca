import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";

AppDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json());
    app.use(routes);

    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000");
    });
}).catch(error => console.log(error));