const URL = "https://script.google.com/macros/s/AKfycbwiEnyiaVckYM5-_EMPnRWnZr7t_XpIOMwZzugK0G9mSWMYve5bvlcawaq6_8GcNFoG/exec";

fetch(URL)
  .then(res => res.json())
  .then(dados => {

    console.log(dados);

    // Total de participantes
    document.getElementById("participantes").innerHTML = dados.length;

    // Média das notas
    const mediaNota =
      dados.reduce((s, d) => s + d.nota, 0) / dados.length;

    document.getElementById("mediaNota").innerHTML =
      mediaNota.toFixed(1);

    // Média da avaliação
    const mediaAvaliacao =
      dados.reduce((s, d) => s + d.avaliacao, 0) / dados.length;

    document.getElementById("mediaAvaliacao").innerHTML =
      mediaAvaliacao.toFixed(1);

    // Porcentagem de quem já usava IA
    const usamIA =
      dados.filter(d => d.ia === "Sim").length;

    document.getElementById("porcentagemIA").innerHTML =
      ((usamIA / dados.length) * 100).toFixed(0) + "%";

  })
  .catch(erro => {
    console.error("Erro ao carregar dashboard:", erro);
  });
