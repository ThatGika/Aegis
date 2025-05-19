document.getElementById("outroCheck").addEventListener("change", function () {
      document.getElementById("outroTexto").classList.toggle("hidden", !this.checked);
    });

    document.getElementById("formSustentavel").addEventListener("submit", async function (e) {
      e.preventDefault();

      const form = e.target;
      const getValue = (id) => form.querySelector(`#${id}`).value;
      const getCheckboxValues = (name) =>
        Array.from(form.querySelectorAll(`input[name="${name}"]:checked`)).map(cb => cb.value);

      let recursosSelecionados = getCheckboxValues("recursos");
      const outroTexto = getValue("outroTexto").trim();
      if (recursosSelecionados.includes("Outro") && outroTexto) {
        recursosSelecionados = recursosSelecionados.filter(r => r !== "Outro");
        recursosSelecionados.push(outroTexto);
      }

      const data = {
        desastre: getValue("desastre"),
        bioma: getValue("bioma"),
        clima: getValue("clima"),
        solo: getValue("solo"),
        recursos: recursosSelecionados,
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

      const resultadoBox = document.getElementById("resultado");
      const btnDownload = document.getElementById("btnDownload");

      resultadoBox.textContent = "🔄 Consultando modelo...\n\n" + mensagem;
      btnDownload.classList.add("hidden");

      const instruction = "Você é um especialista em soluções sustentáveis para recuperação de desastres.";
      const respostaTexto = await getRespostaGemini(instruction, mensagem);
      resultadoBox.textContent = respostaTexto;
      btnDownload.classList.remove("hidden");
    });

    async function getRespostaGemini(instruction, question) {
      const apiKey = "AIzaSyAx7nql-HUQau1uZ1kefj4zlPskCBf2-hw"; // Adicione sua chave da API Gemini aqui

      const jsonBody = {
        system_instruction: {
          parts: [{ text: instruction }]
        },
        contents: [{
          parts: [{ text: question }]
        }]
      };

      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jsonBody)
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const responseBody = await response.json();
        const text = responseBody?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error("Resposta inválida da API Gemini.");
        return tratarResposta(text);

      } catch (err) {
        console.error("Erro ao consultar Gemini:", err);
        return "❌ Erro ao consultar o modelo. Tente novamente mais tarde.";
      }
    }

    function tratarResposta(answer) {
      return answer
        .replace(/\\n|\\r\\n/g, "\n")
        .replace(/\*\*/g, "")
        .replace(/#/g, "")
        .trim();
    }

    document.getElementById("btnDownload").addEventListener("click", function () {
      const text = document.getElementById("resultado").textContent;
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "relatorio-sustentavel.txt";
      a.click();
      URL.revokeObjectURL(url);
    });