document.getElementById("formSustentavel").addEventListener("submit", async function(e) {
    e.preventDefault();

    const form = e.target;
    const getValue = (id) => form.querySelector(`#${id}`).value;
    const getCheckboxValues = (name) =>
        Array.from(form.querySelectorAll(`input[name="${name}"]:checked`)).map(cb => cb.value);

    const data = {
        desastre: getValue("desastre"),
        bioma: getValue("bioma"),
        clima: getValue("clima"),
        solo: getValue("solo"),
        recursos: getCheckboxValues("recursos"),
        populacao: getValue("populacao"),
        tecnologia: getValue("tecnologia"),
        capacitacao: getValue("capacitacao"),
        cultura: getValue("cultura"),
        prioridades: getCheckboxValues("prioridades"),
        categoria: getValue("categoria")
    };

    const requiredFields = ["desastre", "bioma", "clima", "solo", "populacao", "tecnologia", "capacitacao", "cultura", "categoria"];
    for (let field of requiredFields) {
        if (!data[field]) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }
    }

    const mensagem = `
  Cenário: Um desastre do tipo "${data.desastre}" ocorreu em uma região com bioma "${data.bioma}", clima "${data.clima}" e solo "${data.solo}".
  Os recursos disponíveis localmente são: ${data.recursos.join(", ") || "nenhum"}.
  
  A comunidade tem cerca de "${data.populacao}", com nível de tecnologia "${data.tecnologia}" e capacitação técnica "${data.capacitacao}". Preferências culturais: "${data.cultura}".
  
  As prioridades sustentáveis são: ${data.prioridades.join(", ") || "não especificadas"}.
  
  Categoria da solução desejada: "${data.categoria}".
  
  Com base nisso, quais soluções sustentáveis seriam mais adequadas para essa situação?
    `.trim();

    document.getElementById("resultado").textContent = "Consultando modelo...\n\n" + mensagem;

    const instruction = "Você é um especialista em soluções sustentáveis para recuperação de desastres.";
    const respostaTexto = await getRespostaGemini(instruction, mensagem);
    document.getElementById("resultado").textContent = respostaTexto;
});

async function getRespostaGemini(instruction, question) {
    const apiKey = "AIzaSyAx7nql-HUQau1uZ1kefj4zlPskCBf2-hw"; // Substitua com sua chave

    const jsonBody = {
        system_instruction: {
            parts: [{
                text: instruction
            }]
        },
        contents: [{
            parts: [{
                text: question
            }]
        }]
    };

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(jsonBody)
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const responseBody = await response.json();

        const text = responseBody ?.candidates ?.[0] ?.content ?.parts ?.[0] ?.text;
        if (!text) {
            throw new Error("Resposta inválida da API Gemini.");
        }

        return tratarResposta(text);
    } catch (err) {
        console.error("Erro ao consultar Gemini:", err);
        return "Erro ao consultar o modelo. Tente novamente mais tarde.";
    }
}

function tratarResposta(answer) {
    return answer
        .replace(/\\n/g, "\n")
        .replace(/\\r\\n/g, "\n")
        .replace(/\\n\\/g, "\n")
        .replace(/\*\*/g, "")
        .replace(/#/g, "")
        .trim();
}