const list = document.getElementById('book-list');
const API_URL = 'http://localhost:3000/livros';
let livrosLocal = [];

async function carregarLivros() {
    try {
        const response = await fetch(API_URL);
        livrosLocal = await response.json();
        renderizar(livrosLocal);
    } catch (error) { 
        console.error("Erro:", error); 
    }
}

async function renderizar(lista) {
    list.innerHTML = '';
    
    const stats = document.getElementById('stats');
    stats.innerText = `Você tem ${lista.length} obras na sua coleção`;

    for (const item of lista) {
        const card = document.createElement('div');
        card.className = 'book-card';
        
        card.innerHTML = `
            <button class="btn-delete" onclick="deletarLivro(${item.id})">×</button>
            <span class="category-badge">${item.categoria || 'Obra'}</span>
            <img src="https://via.placeholder.com/200x300?text=Carregando..." 
                 class="book-cover" id="img-${item.id}">
            <div class="book-info">
                <h3>${item.titulo}</h3>
                <p>${item.autor}</p>
            </div>`;
        
        list.appendChild(card);
        buscarCapaReal(item);
    }
}

async function buscarCapaReal(item) {
    try {
        const query = encodeURIComponent(`${item.titulo} ${item.autor}`);
        const res = await fetch(`https://openlibrary.org/search.json?q=${query}`);
        const data = await res.json();
        const imgElement = document.getElementById(`img-${item.id}`);
        
        if (data.docs && data.docs[0]?.cover_i) {
            imgElement.src = `https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-L.jpg`;
        } else {
            imgElement.src = `https://images.placeholders.dev/?width=200&height=300&text=Sem%20Capa&background=black`;
        }
    } catch (e) { 
        console.log("Erro capa"); 
    }
}

document.getElementById('search-input').addEventListener('input', (e) => {
    const termo = e.target.value.toLowerCase();
    const filtrados = livrosLocal.filter(l => 
        l.titulo.toLowerCase().includes(termo) || 
        l.autor.toLowerCase().includes(termo)
    );
    renderizar(filtrados);
});

document.getElementById('add-btn').addEventListener('click', async () => {
    const titulo = document.getElementById('title').value;
    const autor = document.getElementById('author').value;
    const categoria = document.getElementById('category').value;

    if (!titulo || !autor) return alert("Preencha tudo!");

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, autor, categoria })
    });

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    carregarLivros();
});

async function deletarLivro(id) {
    if (confirm("Remover da estante?")) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        carregarLivros();
    }
}

carregarLivros();