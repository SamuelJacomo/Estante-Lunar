const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'livros.json');

const lerArquivo = () => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
        return [];
    }
    const dados = fs.readFileSync(filePath, 'utf-8');
    if (!dados) return [];
    return JSON.parse(dados);
};

const salvarArquivo = (dados) => {
    fs.writeFileSync(filePath, JSON.stringify(dados, null, 2));
};

exports.getLivros = (req, res) => {
    const livros = lerArquivo();
    res.status(200).json(livros);
};

exports.addLivro = (req, res) => {
    const { titulo, autor, categoria } = req.body;
    const livros = lerArquivo();
    const novo = { 
        id: Date.now(), 
        titulo, 
        autor, 
        categoria: categoria || "Livro"
    };
    livros.push(novo);
    salvarArquivo(livros);
    res.status(201).json(novo);
};

exports.deleteLivro = (req, res) => {
    try {
        const { id } = req.params;
        let livros = lerArquivo();
        const listaFiltrada = livros.filter(livro => livro.id !== parseInt(id));
        salvarArquivo(listaFiltrada);
        res.status(200).json({ mensagem: "Livro removido com sucesso!" });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao deletar o livro" });
    }
};