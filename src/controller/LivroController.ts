import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Livro } from "../entity/Livro";

export class LivroController {
    // Repository sendo chamado diretamente (sem Service)
    private livroRepository = AppDataSource.getRepository(Livro);

    // 1. Criar Livro (POST)
    async create(req: Request, res: Response) {
        const { titulo, autor, isbn, anoPublicacao, disponivel } = req.body;

        // Lógica de Negócio: Validação simples [cite: 20]
        if (!titulo || !autor || !isbn) {
            return res.status(400).json({ message: "Campos obrigatórios faltando." });
        }

        const livro = this.livroRepository.create({
            titulo, autor, isbn, anoPublicacao, disponivel
        });

        await this.livroRepository.save(livro);
        return res.status(201).json(livro);
    }

    // 2. Listar Todos (GET)
    async list(req: Request, res: Response) {
        const livros = await this.livroRepository.find();
        return res.json(livros);
    }

    // 3. Buscar por ID (GET)
    async show(req: Request, res: Response) {
        const { id } = req.params;
        const livro = await this.livroRepository.findOneBy({ id: Number(id) });

        if (!livro) {
            return res.status(404).json({ message: "Livro não encontrado" });
        }
        return res.json(livro);
    }

    // 4. Atualizar (PUT)
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { titulo, autor, isbn, anoPublicacao, disponivel } = req.body;

        const livro = await this.livroRepository.findOneBy({ id: Number(id) });

        if (!livro) {
            return res.status(404).json({ message: "Livro não encontrado" });
        }

        // Atualizando campos
        livro.titulo = titulo ?? livro.titulo;
        livro.autor = autor ?? livro.autor;
        livro.isbn = isbn ?? livro.isbn;
        livro.anoPublicacao = anoPublicacao ?? livro.anoPublicacao;
        livro.disponivel = disponivel ?? livro.disponivel;

        await this.livroRepository.save(livro);
        return res.json(livro);
    }

    // 5. Deletar (DELETE)
    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const livro = await this.livroRepository.findOneBy({ id: Number(id) });

        if (!livro) {
            return res.status(404).json({ message: "Livro não encontrado" });
        }

        await this.livroRepository.remove(livro);
        return res.status(204).send();
    }
}