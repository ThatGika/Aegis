  document.getElementById("formSustentavel").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const prioridade = document.getElementById("prioridades").value;

    const patologiasSelecionadas = Array.from(
      form.querySelectorAll(`input[name="patologias"]:checked`)
    ).map(cb => cb.value);

    if (patologiasSelecionadas.length === 0 || !prioridade) {
      alert("Por favor, selecione ao menos uma patologia e uma prioridade.");
      return;
    }

      const mensagem = `
        Cenário: Foram identificadas as seguintes patologias na estrutura: "${patologiasSelecionadas.join(', ')}".

        Préviamente temos alguns tipos de recuperação documentados: "${baseDeConhecimentoPatologia(patologiasSelecionadas)}".
        A prioridade sustentável é: ${prioridade}.

        Com base nisso, quais soluções seriam mais adequadas para essa situação pela visão de engenharia civil?
        Seja coerente e técnico na sua resposta, organize-a como um relatório, busque em artigos acadêmicos e artigos científicos, não precisa de referências.
      `.trim();

      const resultadoBox = document.getElementById("resultado");
      const btnDownload = document.getElementById("btnDownload");

      resultadoBox.textContent = "🔄 Consultando modelo...\n\n";
      btnDownload.classList.add("hidden");

      // Simular chamada ao Gemini
      const respostaTexto = await getRespostaGemini("Você é um especialista em soluções sustentáveis para recuperação de edificações.", mensagem);

      const respostaBaseadaArtigo = 'Baseado no artigo: Patologias em Edificações: soluções sustentáveis para o tratamento:\n\n' + baseDeConhecimentoPatologia(patologiasSelecionadas);

      const resposta = respostaBaseadaArtigo + '--------------\n\nRelatório com recomendações de soluções sustentáveis com aplicação de inteligência artificial:\n\n' + respostaTexto;

      resultadoBox.textContent = resposta;
      btnDownload.classList.remove("hidden");
    });

function getRespostaGemini(instruction, mensagem) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("🔍 [Simulação de resposta do modelo Gemini com base na mensagem fornecida.]");
    }, 1000);
  });
}

function baseDeConhecimentoPatologia(patologiasSelecionadas) {
  const conhecimento = {
    "Desaprumo de edificações": "Caracteriza-se pelo desvio angular da estrutura em relação à sua vertical original. Suas principais causas incluem recalques diferenciais do solo, erros de execução no alinhamento, e cargas laterais excessivas. Ambientes agressivos podem agravar o problema com a corrosão das armaduras.\n\nPode ser identificado visualmente por desvios angulares em colunas, paredes ou fachadas. Portas e janelas podem apresentar dificuldades de fechamento.\n\nTratamento sustentável: injeção de cal ou concreto ecológico (com escória ou cinza volante), uso de geossintéticos reciclados como geogrelhas PET, e desmoldantes biodegradáveis.\n\nTratamento convencional: injeção de concreto para preenchimento de vazios, instalação de armaduras complementares e uso de estacas ou micropilotes para estabilização de fundações.\n\n",
    "Fissuras, trincas e rachaduras": "Rupturas que afetam a superfície ou estrutura. Variam em profundidade, espessura e direção. Podem ter origem em retração térmica ou hidráulica, sobrecargas, falhas executivas e corrosão de armaduras.\n\nAfetam estética, conforto e, em casos graves, a segurança estrutural. Quando não tratadas, podem evoluir para rachaduras profundas e instabilidade.\n\nTratamento sustentável: selantes à base de poliuretano vegetal (óleo de mamona), cimentos ecológicos (com escória ou cinza volante) e impermeabilizantes ecológicos.\n\nTratamento convencional: selamento com argamassa polimérica ou resina epóxi, reforço com concreto armado e aplicação de malhas de fibra de vidro.\n\n",
    "Infiltrações e mofos": "Penetração de água com proliferação de fungos. Causas: falhas de impermeabilização, má drenagem, condensação, materiais de alta absorção.\n\nDanos à saúde dos ocupantes, degradação dos materiais, comprometimento estético e funcional.\n\nTratamento sustentável: impermeabilizantes à base de poliuretano vegetal, massas corridas ecológicas, tintas fotocatalíticas e naturais, soluções caseiras (vinagre, melaleuca).\n\nTratamento convencional: impermeabilizantes sintéticos (membranas asfálticas/acrílicas), limpeza com produtos à base de cloro, substituição de revestimentos.\n\n",
    "Descolamento de pintura e reboco": "Perda de aderência das camadas de revestimento (bolhas, fissuras, descascamentos). Causas: incompatibilidade de materiais, umidade, variações térmicas, aplicação inadequada.\n\nPerda de proteção das superfícies, risco de corrosão de armaduras.\n\nTratamento sustentável: rebocos com areia reciclada ou cargas minerais, tintas ecológicas à base de água ou pigmentos naturais, massas corridas isentas de cimento e derivados petroquímicos.\n\nTratamento convencional: remoção mecânica das camadas soltas, novo reboco e pintura com produtos convencionais, tratamento de armaduras expostas.\n\n",
    "Descolamento de cerâmicas": "Quando revestimentos cerâmicos (pisos ou paredes) perdem a aderência e começam a se soltar. Causas: falha de execução (aplicação incorreta da argamassa colante), umidade no substrato, movimentação excessiva da estrutura, incompatibilidade de dilatação entre materiais.\n\nCompromete a funcionalidade do revestimento, risco de queda das peças (perigo para os usuários), infiltrações futuras e aumento do custo de manutenção.\n\nTratamento sustentável: uso de argamassas colantes ecológicas (reduzidas em cimento ou sem cimento), maior rendimento e menor geração de resíduos.\n\nTratamento convencional: remoção e reposição das peças com argamassas convencionais.\n\n",
    "Infiltrações por telhas deslocadas ou quebradas": "Penetração de água por falhas na cobertura. Causas: telhas quebradas, descoladas ou má instalação.\n\nComprometimento estrutural e salubridade dos ambientes internos; risco de degradação acelerada.\n\nTratamento sustentável: telhas ecológicas (fibra vegetal, plástico/alumínio reciclado), impermeabilizantes à base de água, parafusos em aço inox reciclável, tintas térmicas ecológicas.\n\nTratamento convencional: substituição das telhas, aplicação de mantas asfálticas, refixação com parafusos convencionais.\n\n"    
  };

  return patologiasSelecionadas.map(p => `• ${p}: ${conhecimento[p] || "Sem dados."}`).join("\n");
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