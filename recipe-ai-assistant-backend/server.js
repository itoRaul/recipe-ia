import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';

const API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI(API_KEY);
const model = "gemini-2.5-flash";

const app = express();
const PORT = 3000;

app.use(express.json()); 


app.use(cors({
    origin: '*' 
})); 

app.post('/api/generate_recipe', async (req, res) => {
    const { ingredients } = req.body; 

    if (!ingredients || ingredients.length === 0) {
        return res.status(400).json({ error: "Por favor, forneça uma lista de ingredientes." });
    }

    try {
        const prompt = `
            Com a lista de ingredientes: "${ingredients.join(', ')}", gere uma receita criativa. 
            A resposta deve ser formatada estritamente em Markdown. Inclua:
            1. Um Título (h1)
            2. Tempo de Preparo
            3. Porções
            4. Lista de Ingredientes (com quantidades sugeridas)
            5. Modo de Preparo detalhado.
            6. Uma breve Dica de Chef (h4).
        `;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                temperature: 0.7 
            }
        });

        res.json({ recipe: response.text });

    } catch (error) {
        console.error("Erro ao gerar receita:", error);
        res.status(500).json({ error: "Falha ao comunicar com a IA. Tente novamente." });
    }
});

app.listen(PORT, () => {
    console.log(`Backend rodando em http://localhost:${PORT}`);
    console.log(`Endpoint de receita: http://localhost:${PORT}/api/generate_recipe`);
});