import "reflect-metadata";
import { DataSource } from "typeorm";
import { Livro } from "./entity/Livro";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "biblioteca.sqlite",
    synchronize: true, // Cria as tabelas automaticamente
    logging: false,
    entities: [Livro],
});