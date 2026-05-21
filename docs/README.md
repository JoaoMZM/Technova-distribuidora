# Technova-distribuidora

Este repositório contém o projeto **TechNova Distribuidora**, uma solução completa de e-commerce para equipamentos eletrônicos. O sistema foi desenvolvido com uma arquitetura desacoplada, composta por uma API REST funcional e um front-end SPA (Single Page Application) moderno.

O objetivo do projeto é resolver problemas de escalabilidade e experiência do usuário da TechNova, implementando carregamento dinâmico de produtos, persistência de carrinho e validação de estoque em tempo real.

---

## 🚀 Funcionalidades Principal

### Back-end (API REST)
- **Gestão de Produtos:** CRUD completo (Cadastro, Leitura, Atualização e Remoção).
- **Processamento de Pedidos:** Registro de vendas com cálculo automático de valor total.
- **Regras de Negócio:** Validação de integridade de estoque durante a finalização do checkout.
- **Segurança e Configuração:** Implementação de CORS e variáveis de ambiente (.env).
- **Persistência:** Integração com banco de dados relacional para garantir a durabilidade das informações.

### Front-end (SPA)
- **Catálogo Dinâmico:** Listagem de produtos consumida diretamente da API.
- **Carrinho de Compras Persistente:** Uso de Web Storage (Local Storage) para manter itens mesmo após o recarregamento da página.
- **Navegação SPA:** Transição entre páginas sem refresh, otimizando a performance.
- **Fluxo de Checkout:** Integração para envio de dados do carrinho para processamento no back-end.

---

## 🛠️ Tecnologias Utilizadas

**Back-end:**
- Node.js / Express (Sugestão de ambiente)
- Banco de Dados (SQL)
- Dotenv (Gerenciamento de variáveis)
- CORS

**Front-end:**
- JavaScript (ES6+) / Framework Moderno
- Fetch API / Axios (Consumo de API)
- Web Storage API
- CSS3 (Design Responsivo e Moderno)

---

## 📂 Estrutura do Projeto

##### Placeholder temporário sujeito a mudanças:
```text
Technova-distribuidora/
├── api/                  # Código fonte do Back-end
│   ├── src/
│   │   ├── controllers/  # Lógica de rotas
│   │   ├── models/       # Estrutura de dados e banco
│   │   ├── routes/       # Definição dos endpoints
│   │   └── server.js     # Ponto de entrada
│   └── .env.example      # Exemplo de variáveis de ambiente
├── web/                  # Código fonte do Front-end
│   ├── assets/           # Imagens e estilos
│   ├── components/       # Componentes reutilizáveis
│   ├── pages/            # Views (Home, Carrinho)
│   └── services/         # Integração com a API
└── README.md