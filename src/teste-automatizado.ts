

const BASE_URL = 'http://localhost:3000/api/livros';

async function runTests() {
    console.log("🚀 Iniciando Testes Automatizados...\n");

    try {
        // --- 1. TESTE DE CRIAÇÃO (POST) ---
        console.log("1. Tentando criar um livro...");
        const novoLivro = {
            titulo: "O Hobbit",
            autor: "J.R.R. Tolkien",
            isbn: "978-0001",
            anoPublicacao: 1937,
            disponivel: true
        };

        const postResponse = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoLivro)
        });

        if (postResponse.status !== 201) throw new Error(`Erro ao criar: ${postResponse.status}`);
        const livroCriado = await postResponse.json();
        console.log("✅ Livro criado com sucesso! ID:", livroCriado.id);
        console.log("   Dados:", livroCriado);


        // --- 2. TESTE DE LISTAGEM (GET) ---
        console.log("\n2. Listando todos os livros...");
        const getResponse = await fetch(BASE_URL);
        const listaLivros = await getResponse.json();
        console.log(`✅ Listagem retornou ${listaLivros.length} livros.`);


        // --- 3. TESTE DE ATUALIZAÇÃO (PUT) ---
        console.log(`\n3. Atualizando o livro ID ${livroCriado.id}...`);
        const dadosAtualizacao = { titulo: "O Hobbit: Edição Especial" };
        
        const putResponse = await fetch(`${BASE_URL}/${livroCriado.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosAtualizacao)
        });

        const livroAtualizado = await putResponse.json();
        console.log("✅ Livro atualizado. Novo Título:", livroAtualizado.titulo);


        // --- 4. TESTE DE DELEÇÃO (DELETE) ---
        console.log(`\n4. Deletando o livro ID ${livroCriado.id}...`);
        const deleteResponse = await fetch(`${BASE_URL}/${livroCriado.id}`, {
            method: 'DELETE'
        });

        if (deleteResponse.status === 204) {
            console.log("✅ Livro deletado com sucesso (Status 204).");
        } else {
            console.error("❌ Falha ao deletar.");
        }


        // --- 5. VERIFICAÇÃO FINAL ---
        console.log("\n5. Verificando se o livro sumiu...");
        const checkResponse = await fetch(`${BASE_URL}/${livroCriado.id}`);
        if (checkResponse.status === 404) {
            console.log("✅ Confirmado: O livro não existe mais.");
        } else {
            console.error("❌ O livro ainda existe!");
        }

        console.log("\n🎉 TODOS OS TESTES PASSARAM!");

    } catch (error) {
        console.error("\n❌ ERRO NOS TESTES:", error);
    }
}

runTests();