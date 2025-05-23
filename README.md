# 🌿 Simulador de Soluções Sustentáveis para Engenharia Civil

Este projeto é um **simulador web interativo** que utiliza **inteligência artificial (Google Gemini)** para sugerir **soluções sustentáveis personalizadas** em cenários de desastres naturais. Ideal para engenheiros civis, urbanistas e agentes da defesa civil, ele oferece recomendações baseadas em dados ambientais, sociais e técnicos informados pelo usuário.

---

## 🎯 Objetivo

Ajudar na tomada de decisão para reconstrução e planejamento sustentável em áreas afetadas por desastres naturais, considerando:

- ✅ Tipo de desastre (enchente, deslizamento, seca, etc.)
- ✅ Bioma e tipo de solo
- ✅ Clima predominante
- ✅ Recursos locais disponíveis (ex: madeira, recicláveis)
- ✅ Perfil populacional e cultural
- ✅ Prioridades sustentáveis
- ✅ Categoria da solução desejada (habitação, energia, saneamento, etc.)

---

## 🧠 Como Funciona

1. O usuário preenche um formulário com as informações do cenário.
2. A mensagem é estruturada e enviada para a API Gemini da Google.
3. A IA analisa e retorna sugestões sustentáveis customizadas.
4. O resultado é exibido diretamente na interface web.

---

## 🖥️ Tecnologias Utilizadas

- ⚙️ **Web Components** (HTML Custom Elements) para organização modular
- 🎨 **HTML5 + CSS3 moderno** com layout responsivo
- 🧩 **JavaScript (ES6+)** com `fetch` para requisições à API
- 🤖 **Google Gemini 1.5 Flash API**
- ☁️ **Compatível com qualquer hospedagem estática** (Vercel, GitHub Pages, etc.)

---

## 🧪 Exemplo de Uso

1. Selecione o tipo de desastre: `Enchente/Inundação`
2. Escolha o bioma: `Mata Atlântica`
3. Tipo de solo: `Argiloso`
4. Recursos locais: `Madeira`, `Material reciclado`
5. Perfil populacional: `1.000 a 10.000 habitantes`, com `acesso tecnológico médio`
6. Categoria da solução: `Habitação`
7. Clique em **"Gerar Recomendações"**
8. Veja sugestões como:
   - Uso de taipa de pilão
   - Sistema de captação de água de chuva
   - Telhados verdes

---

## 🔐 Como Configurar a API

Você precisa de uma **API Key da Google** para acessar a IA.

### Passos:

1. Acesse: [makersuite.google.com/app](https://makersuite.google.com/app)  
2. Ative a API **Gemini 1.5 Flash** no [Google Cloud Console](https://console.cloud.google.com/)
3. Copie sua chave da API
4. No arquivo `js/formHandler.js`, substitua a string:

   ```js
   const apiKey = "SUA_API_KEY_AQUI";
