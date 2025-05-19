# 🌱 Simulador de Soluções Sustentáveis para Engenharia Civil

Este projeto é um **simulador web interativo** que auxilia engenheiros civis, planejadores urbanos e agentes de defesa civil a **identificar soluções sustentáveis personalizadas** para contextos de desastres naturais. Ele utiliza **inteligência artificial (Google Gemini)** para gerar recomendações com base em dados ambientais, sociais e técnicos informados pelo usuário.

## 💡 Objetivo

Oferecer uma ferramenta prática e inteligente para apoiar **decisões sustentáveis na reconstrução** de áreas afetadas por desastres, considerando:

- Tipo de desastre natural
- Bioma e solo da região
- Clima predominante
- Recursos locais disponíveis
- Perfil populacional e cultural
- Prioridades sustentáveis
- Categoria da solução desejada (Habitação, Energia, Saneamento, etc.)

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** e **CSS3** (interface responsiva)
- **JavaScript (ES6+)** para lógica e integração com API
- **Google Gemini API** (via `fetch`) para geração de respostas inteligentes
- Hospedável em qualquer servidor web estático (GitHub Pages, Vercel, etc.)

---

## 🧠 Como Funciona

1. O usuário preenche um formulário com os dados do cenário de desastre e preferências locais.
2. O sistema monta uma **mensagem estruturada** com essas informações.
3. Essa mensagem é enviada para o **modelo Gemini 1.5 Flash** via requisição `POST`.
4. A IA responde com recomendações sustentáveis personalizadas.
5. O resultado é exibido diretamente no navegador.

---

## 🧪 Exemplo de Uso

1. Selecione "Enchente/Inundação" como tipo de desastre.
2. Escolha "Mata Atlântica" como bioma e "Argiloso" como tipo de solo.
3. Marque "Madeira" e "Material reciclado" como recursos disponíveis.
4. Informe que a população é de "1.000 a 10.000" com acesso tecnológico médio.
5. Escolha "Habitação" como categoria.
6. Clique em **"Enviar e Gerar Recomendações"**.
7. Veja sugestões como: uso de taipa de pilão, sistemas de captação de água, etc.

---

## 🔐 Configuração da API

Você precisa de uma **API Key da Google** para usar a funcionalidade de IA.

### Passos:

1. Acesse: [https://makersuite.google.com/app](https://makersuite.google.com/app)
2. Ative a API Gemini no Google Cloud Console.
3. Copie sua chave de API.
4. Substitua a string `SUA_API_KEY_AQUI` no código `formHandler.js`:

```js
const apiKey = "SUA_API_KEY_AQUI";