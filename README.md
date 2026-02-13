Estante Lunar - Asset Management System 🌑
Este projeto consiste em um sistema Fullstack desenvolvido para o gerenciamento de ativos, utilizando Node.js no ecossistema de backend e uma interface Vanilla JavaScript de alta performance.

Embora configurado inicialmente para a organização de bibliotecas e coleções de HQs, o núcleo da aplicação foi arquitetado para ser agnóstico ao tipo de dado, permitindo a adaptação rápida para inventários de TI, controle de estoque ou catálogos de produtos.

🛠️ Especificações Técnicas
Runtime: Node.js.

Framework Backend: Express.js (Gerenciamento de rotas e Middlewares).

Persistência de Dados: Estrutura NoSQL baseada em sistema de arquivos (JSON), otimizando a latência de leitura para pequenos volumes de dados.

Integração Externa: Fetch API integrada à Open Library Search API para enriquecimento dinâmico de metadados (Data Enrichment).

Frontend: CSS3 moderno com variáveis (Custom Properties), CSS Grid e Flexbox para garantir responsividade e design Noir.

⚙️ Arquitetura do Sistema
O projeto segue o padrão Client-Server, onde as responsabilidades de processamento de dados e interface são estritamente separadas:

API REST: Endpoints estruturados para operações de CRUD (Create, Read, Delete).

Service Layer: Lógica de manipulação de capas de livros isolada para evitar bloqueios na renderização da UI.

Sanitização de Dados: Tratamento de strings e IDs baseados em timestamps para garantir a integridade dos registros.
