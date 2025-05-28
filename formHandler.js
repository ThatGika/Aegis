  document.getElementById("desastre").addEventListener("change", function () {
    const selected = this.value;
    const todas = ["Terremoto", "Enchente/Inundação", "Ciclone/Tempestade", "Seca"];

    todas.forEach(tipo => {
      const id = "multiselect-" + tipo.split("/")[0];
      const el = document.getElementById(id);
      if (el) el.classList.add("hidden");
    });

    const idToShow = "multiselect-" + selected.split("/")[0];
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
      
      Préviamente temos alguns tipos de recuperação documentados: "${getBaseConhecimentoDesastre(data.desastre)}".
      use esses tipos de recuperação como base e implemente soluções a mais se possível.
      A prioridade sustentável é: ${data.prioridade || "não especificada"}.
      Com base nisso, quais soluções seriam mais adequadas para essa situação pela visão de engenharia civil?
      Seja coerente e técnico na sua resposta, organize-a como um relatório, busque em artigos acadêmicos e artigos cientificos, não precisa de referências.
    `.trim();


    const resultadoBox = document.getElementById("resultado");
    const btnDownload = document.getElementById("btnDownload");

    resultadoBox.textContent = "🔄 Consultando modelo...\n\n";
    btnDownload.classList.add("hidden");

    const instruction = "Você é um especialista em soluções sustentáveis para recuperação de desastres.";
    const respostaTexto = await getRespostaGemini(instruction, mensagem);

    const respostaBaseadaArtigo = 'Baseado no artigo: Patologias em Infraestruturas Afetadas por Desastres Naturais na América do Sul: Diagnóstico e Soluções Sustentáveis para Recuperação, considerando as patologias selecionadas: \n\n' + baseDeConhecimentoPatologia(patologiasSelecionadas);
    const resposta = respostaBaseadaArtigo + '\n\n' + '--------------' +  '\n\n' +  'Relatorio com recomendações de soluções sustentáveis com aplicação de inteligência artificial baseado na pesquisa:' + '\n\n' + '--------------' + '\n\n' +  respostaTexto;


    resultadoBox.textContent = resposta;
    btnDownload.classList.remove("hidden");
  });

function getBaseConhecimentoDesastre(desastre) {
  const tipo = desastre.split("/")[0];

  const baseConhecimento = {
    Terremoto: 'Para Terremotos\nRecuperação Convencional: Selantes epóxi, reforços metálicos, reconstrução de telhados com materiais convencionais.\nRecuperação Sustentável: Selantes ecológicos, argamassas de cal e pozolanas, bioconcreto, telhas ecológicas, reforço com fibras naturais ou recicladas.',
    Enchente: 'Para Inundações\nRecuperação Convencional: Estacas, grautes, selantes químicos, impermeabilizantes sintéticos e substituição de componentes.\nRecuperação Sustentável: Geossintéticos sustentáveis, bioconcreto, impermeabilizantes naturais, rebocos/tintas ecológicas, restauração com óleos vegetais e reaproveitamento de entulho.',
    Ciclone: 'Para CiclonesRecuperação Convencional: Reposição de telhas, impermeabilização com solventes, reconstrução com blocos cerâmicos.\nRecuperação Sustentável: Telhas de fibra vegetal ou recicladas, impermeabilizantes à base de água, reconstrução com superadobe e revestimentos com barro reforçado por fibras naturais.',
    Seca: 'Para SecasRecuperação Convencional: Substituição de componentes e aplicação de selantes químicos.\nRecuperação Sustentável: Argamassas ecológicas, selantes de base natural, óleo de linhaça para restauração, reforços com conectores metálicos reciclados.'
  };

  return baseConhecimento[tipo] || 'Tipo de desastre não encontrado.';
}

function baseDeConhecimentoPatologia(patologiasSelecionadas) {
  const conhecimento = {
    "Fissuras e trincas estruturais": "PATOLOGIA: Fissuras, trincas ou rachaduras\n" +
      "Recuperação Convencional:\n" +
      "Selamento das trincas com selante de poliuretano (PU) ou adesivo epóxi. Em casos mais graves, é indicada a realização de reforço estrutural com concreto armado.\n\n" +
      "Proposta de Recuperação Sustentável:\n" +
      "Selamento das trincas com selantes e impermeabilizantes ecológicos. Para situações em que é necessário o reforço estrutural, recomenda-se o uso de cimentos ecológicos.\n\n" +
      "Sugestão de Produtos:\n" +
      "- Brascoved Selante Eco (Brascola)\n" +
      "- IMPERVEG RQI 132 MR (IMPERVEG)\n" +
      "- Impermeabilizante Ecoflex (Ecoflex)\n" +
      "- Microgama (Microgama)\n" +
      "- Mizu Cimentos (Mizu)",

    "Trincas e fissuras": "PATOLOGIA: Fissuras, trincas ou rachaduras\n" +
            "Recuperação Convencional:\n" +
      "Selamento das trincas com selante de poliuretano (PU) ou adesivo epóxi. Em casos mais graves, é indicada a realização de reforço estrutural com concreto armado.\n\n" +
      "Proposta de Recuperação Sustentável:\n" +
      "Selamento das trincas com selantes e impermeabilizantes ecológicos. Para situações em que é necessário o reforço estrutural, recomenda-se o uso de cimentos ecológicos.\n\n" +
      "Sugestão de Produtos:\n" +
      "- Brascoved Selante Eco (Brascola)\n" +
      "- IMPERVEG RQI 132 MR (IMPERVEG)\n" +
      "- Impermeabilizante Ecoflex (Ecoflex)\n" +
      "- Microgama (Microgama)\n" +
      "- Mizu Cimentos (Mizu)",

    "Fissuras e trincas": "PATOLOGIA: Fissuras, trincas ou rachaduras\n" +
      "Recuperação Convencional:\n" +
      "Selamento das trincas com selante de poliuretano (PU) ou adesivo epóxi. Em casos mais graves, é indicada a realização de reforço estrutural com concreto armado.\n\n" +
      "Proposta de Recuperação Sustentável:\n" +
      "Selamento das trincas com selantes e impermeabilizantes ecológicos. Para situações em que é necessário o reforço estrutural, recomenda-se o uso de cimentos ecológicos.\n\n" +
      "Sugestão de Produtos:\n" +
      "- Brascoved Selante Eco (Brascola)\n" +
      "- IMPERVEG RQI 132 MR (IMPERVEG)\n" +
      "- Impermeabilizante Ecoflex (Ecoflex)\n" +
      "- Microgama (Microgama)\n" +
      "- Mizu Cimentos (Mizu)",

    "Danos nas fundações": "PATOLOGIA: Danos à fundação\n" +
      "Recuperação Convencional:\n" +
      "Reforço da fundação com injeção de concreto e uso de armaduras de aço.\n\n" +
      "Proposta de Recuperação Sustentável:\n" +
      "Utilização de cal ou concreto ecológico para injeção, reforço com geossintéticos sustentáveis e aplicação de desmoldantes biodegradáveis nas formas de reforço.\n\n" +
      "Sugestão de Produtos:\n" +
      "- Fortrac T eco (Fortrac)\n" +
      "- Mizu Cimentos (Mizu)\n" +
      "- CQ Desform (Camargo Química)\n" +
      "- Reabilita Cal Inject (SecilTek)",

    "Deslocamento de telhados": "PATOLOGIA: Deslocamento de telhado\n" +
      "Recuperação Convencional:\n" +
      "Substituição das telhas ou painéis danificados, reforço da estrutura de fixação com pregos e parafusos adicionais, e aplicação de impermeabilizante convencional à base de solvente.\n\n" +
      "Proposta de Recuperação Sustentável:\n" +
      "Uso de telhas ecológicas, aplicação de impermeabilizante à base de água, uso de parafusos de aço inox e tintas térmicas ecológicas para telhado.\n\n" +
      "Sugestão de Produtos:\n" +
      "- Telha de Fibra Vegetal (TermTelhas)\n" +
      "- Impermeabilizante Reta Skin (Kryll)\n" +
      "- Parafusos (Indufix)\n" +
      "- Telha Térmica Base Água (Sherwin Williams)",

    "Danos em telhados e coberturas": "PATOLOGIA: Danos ao telhado e cobertura\n" +
      "Recuperação Convencional:\n" +
      "Substituição das telhas ou painéis danificados, reforço da estrutura de fixação com pregos e parafusos adicionais, e aplicação de impermeabilizante convencional à base de solvente.\n\n" +
      "Proposta de Recuperação Sustentável:\n" +
      "Uso de telhas ecológicas, aplicação de impermeabilizante à base de água, uso de parafusos de aço inox e tintas térmicas ecológicas para telhado.\n\n" +
      "Sugestão de Produtos:\n" +
      "- Telha de Fibra Vegetal (TermTelhas)\n" +
      "- Impermeabilizante Reta Skin (Kryll)\n" +
      "- Parafusos (Indufix)\n" +
      "- Telha Térmica Base Água (Sherwin Williams)",

    "Descolamento de revestimentos": "PATOLOGIA: Descolamento de revestimentos\n" +
      "Recuperação Convencional:\n" +
      "Remoção e substituição das cerâmicas descoladas utilizando argamassa colante convencional.\n\n" +
      "Proposta de Recuperação Sustentável:\n" +
      "Substituição com argamassa colante ecológica e reaproveitamento do entulho em concreto não estrutural.\n\n" +
      "Sugestão de Produtos:\n" +
      "- Argamassa Eco (Argasmart)",

    "Deslocamento de revestimentos e fachadas": "PATOLOGIA: Descolamento de revestimentos\n" +
      "Recuperação Convencional:\n" +
      "Remoção e substituição das cerâmicas descoladas utilizando argamassa colante convencional.\n\n" +
      "Proposta de Recuperação Sustentável:\n" +
      "Substituição com argamassa colante ecológica e reaproveitamento do entulho em concreto não estrutural.\n\n" +
      "Sugestão de Produtos:\n" +
      "- Argamassa Eco (Argasmart)",

    "Danos às estruturas de vedação": "PATOLOGIA: Danos às estruturas de vedação\n" +
      "Recuperação Convencional:\n" +
      "Reparo de fissuras e trincas com argamassa, reconstrução de paredes colapsadas com blocos de concreto e tijolos cerâmicos.\n\n" +
      "Proposta de Recuperação Sustentável:\n" +
      "Uso de argamassas e tijolos ecológicos para a reconstrução.\n\n" +
      "Sugestão de Produtos:\n" +
      "- Argamassa Tijolos e Blocos Eco (Argasmart)\n" +
      "- Argamassa Polimérica (Biomassa)\n" +
      "- Tijolo de Adobe (Carufinga)\n" +
      "- Tijolo Modular Ecológico (Semente Orgânica)",

    "Descascamento de pintura e reboco": "PATOLOGIA: Descascamento de pintura e reboco (em geral)\n" +
      "Recuperação Convencional:\n" +
      "Remoção de áreas descascadas, nova aplicação de reboco e pintura com produtos convencionais.\n\n" +
      "Proposta de Recuperação Sustentável:\n" +
      "Uso de reboco e tintas ecológicas.\n\n" +
      "Sugestão de Produtos:\n" +
      "- Reboco Pronto (Biomassa)\n" +
      "- Areia Reciclada (diversas marcas)\n" +
      "- Tinta de Origem Natural (Casa Natura)\n" +
      "- Acrílico Premium Criativa (Suvinil)\n" +
      "- ArgaSmart Massa Corrida (ArgaSmart)\n" +
      "- Massa Corrida Mineral (Kroten)",

    "Empenamento de portas e janelas": "PATOLOGIA: Descascamento de pintura e reboco (em madeira)\n" +
      "Recuperação Convencional:\n" +
      "Substituição de peças danificadas e aplicação de tratamento anticorrosivo em ferragens.\n\n" +
      "Proposta de Recuperação Sustentável:\n" +
      "Aplicação de óleo de linhaça cozido para reidratar a madeira, reforço com conectores metálicos de aço inox e uso de madeira de reflorestamento certificada (FSC).\n\n" +
      "Sugestão de Produtos:\n" +
      "- Óleo de Linhaça (diversas marcas)\n" +
      "- Conectores (Constanox)\n" +
      "- Portas de Madeira de Reflorestamento (Arliz)",

    "Infiltrações": "PATOLOGIA: Infiltrações e mofo\n" +
      "Recuperação Convencional:\n" +
      "Impermeabilização com produtos sintéticos, remoção do mofo com cloro e substituição de áreas afetadas.\n\n" +
      "Proposta de Recuperação Sustentável:\n" +
      "Uso de impermeabilizantes ecológicos, tratamento do mofo com soluções naturais e pintura com tintas ecológicas.\n\n" +
      "Sugestão de Produtos:\n" +
      "- Vitpoli Eco (Viapol)\n" +
      "- Massa Corrida Mineral (Kroten)\n" +
      "- ArgaSmart Massa Corrida (ArgaSmart)\n" +
      "- Tinta Eco (Casa Natura)\n" +
      "- Acrílico Premium Criativa (Suvinil)"
  };

  return patologiasSelecionadas.map(p => conhecimento[p] || `Patologia não encontrada: ${p}`).join("\n\n---\n\n");
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