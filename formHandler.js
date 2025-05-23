  document.getElementById("desastre").addEventListener("change", function () {
    const selected = this.value;
    const todas = ["Terremoto", "Enchente/Inundação", "Ciclone/Tempestade", "Seca"];

    todas.forEach(tipo => {
      const id = "multiselect-" + tipo.split("/")[0]; // usa apenas a primeira parte (e.g., "Enchente")
      const el = document.getElementById(id);
      if (el) el.classList.add("hidden");
    });

    const idToShow = "multiselect-" + selected.split("/")[0]; // mesma lógica aqui
    const elToShow = document.getElementById(idToShow);
    if (elToShow) elToShow.classList.remove("hidden");
  });
    
    
  document.getElementById("formSustentavel").addEventListener("submit", async function (e) {
    e.preventDefault();
    const form = e.target;

    const desastre = document.getElementById("desastre").value;
    const patologiaContainerId = "multiselect-" + desastre.split("/")[0];
    const patologiasSelecionadas = Array.from(
      form.querySelectorAll(`#${patologiaContainerId} input[name="patologias"]:checked`)
    ).map(cb => cb.value);
    const prioridade = document.getElementById("prioridades").value;

    const getValue = (id) => form.querySelector(`#${id}`).value;
    const getCheckboxValues = (name) =>
      Array.from(form.querySelectorAll(`input[name="${name}"]:checked`)).map(cb => cb.value);

    const data = {
      desastre,
      prioridade: prioridade,
      patologias: patologiasSelecionadas
    };

    const requiredFields = ["desastre"];
    for (let field of requiredFields) {
      if (!data[field]) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }
    }

    const mensagem = `
      Cenário: Um desastre do tipo "${data.desastre}" ocorreu em uma região.
      As patologias observadas foram: ${data.patologias.join(", ") || "nenhuma especificada"}.
      Préviamente temos alguns tipos de recuperação documentados: "${getBaseConhecimento(data.desastre)}".
      use esses tipos de recuperação como base e implemente soluções a mais se possível.
      A prioridade sustentável é: ${data.prioridade || "não especificada"}.
      Com base nisso, quais soluções seriam mais adequadas para essa situação pela visão de engenharia civil?
      Seja coerente e técnico na sua resposta, organize-a como um relatório.
    `.trim();


    const resultadoBox = document.getElementById("resultado");
    const btnDownload = document.getElementById("btnDownload");

    resultadoBox.textContent = "🔄 Consultando modelo...\n\n";
    btnDownload.classList.add("hidden");

    const instruction = "Você é um especialista em soluções sustentáveis para recuperação de desastres.";
    const respostaTexto = await getRespostaGemini(instruction, mensagem);
    resultadoBox.textContent = respostaTexto;
    btnDownload.classList.remove("hidden");
  });

function getBaseConhecimento(desastre) {
  const tipo = desastre.split("/")[0];

  const baseConhecimento = {
    Terremoto: 'Para Terremotos\nRecuperação Convencional: Selantes epóxi, reforços metálicos, reconstrução de telhados com materiais convencionais.\nRecuperação Sustentável: Selantes ecológicos, argamassas de cal e pozolanas, bioconcreto, telhas ecológicas, reforço com fibras naturais ou recicladas.',
    Enchente: 'Para Inundações\nRecuperação Convencional: Estacas, grautes, selantes químicos, impermeabilizantes sintéticos e substituição de componentes.\nRecuperação Sustentável: Geossintéticos sustentáveis, bioconcreto, impermeabilizantes naturais, rebocos/tintas ecológicas, restauração com óleos vegetais e reaproveitamento de entulho.',
    Ciclone: 'Para CiclonesRecuperação Convencional: Reposição de telhas, impermeabilização com solventes, reconstrução com blocos cerâmicos.\nRecuperação Sustentável: Telhas de fibra vegetal ou recicladas, impermeabilizantes à base de água, reconstrução com superadobe e revestimentos com barro reforçado por fibras naturais.',
    Seca: 'Para SecasRecuperação Convencional: Substituição de componentes e aplicação de selantes químicos.\nRecuperação Sustentável: Argamassas ecológicas, selantes de base natural, óleo de linhaça para restauração, reforços com conectores metálicos reciclados.'
  };

  return baseConhecimento[tipo] || 'Tipo de desastre não encontrado.';
}


  async function getRespostaGemini(instruction, question) {
    const apiKey = "AIzaSyCeV_p8rr0E-v3q7b9H2PhfS7k8FbgJ72Y"; // Adicione sua chave da API Gemini aqui

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