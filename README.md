# 👨‍🍳 Recipe IA - Assistente de Receitas Inteligente

O **Recipe IA** é uma aplicação Fullstack desenvolvida para ajudar você a decidir o que cozinhar com o que tem disponível na despensa. Através de uma interface moderna em **Vue.js**, o usuário envia uma lista de ingredientes para um servidor **Node.js**, que utiliza a **API do Gemini (Google)** para gerar uma receita criativa, detalhada e personalizada instantaneamente.

---

## Tecnologias Utilizadas

### Backend 
- **Node.js & Express**: API REST para gerenciar requisições e lógica de servidor.
- **Google Generative AI SDK**: Integração direta com o modelo Gemini 1.5 Flash.
- **CORS**: Configurado para permitir a comunicação segura entre o frontend e o backend.
- **Dotenv**: Proteção de dados sensíveis e chaves de API.

### Frontend
- **Vue.js 3**: Framework reativo para uma experiência de usuário fluida.
- **Vite**: Ferramenta de build de última geração.
- **Axios**: Cliente HTTP para consumo da API do backend.
