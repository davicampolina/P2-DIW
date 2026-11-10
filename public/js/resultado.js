async function mostrarResultado() {
  const naRoca = await listarNaRoca();
  const votos = await listarVotos();

  document.getElementById("total").innerText = votos.length;

  if (votos.length == 0) {
    document.getElementById("placar").innerHTML = "";
    document.getElementById("sem-votos").classList.remove("d-none");
    document.getElementById("btn-zerar").classList.add("d-none");
    return;
  }

  document.getElementById("sem-votos").classList.add("d-none");
  document.getElementById("btn-zerar").classList.remove("d-none");

  const resultado = calcularResultado(naRoca, votos);
  let html = "";

  for (let i = 0; i < resultado.length; i++) {
    const p = resultado[i];
    let classe = "";
    let badge = "";
    let cor = "bg-secondary";

    if (i == 0) {
      classe = "destaque";
      badge = '<span class="badge bg-danger">Sairia hoje</span>';
      cor = "bg-danger";
    }

    html += `
      <div class="card mb-3 ${classe}">
        <div class="card-body d-flex align-items-center gap-3">
          <img src="${p.foto}" class="foto-resultado" alt="${p.nome}">
          <div class="flex-grow-1">
            <h3>${p.nome} ${badge}</h3>
            <div class="progress">
              <div class="progress-bar progress-bar-striped ${cor}" style="width: ${p.percentual}%">${p.percentual.toFixed(1)}%</div>
            </div>
            <small>${p.votos} votos</small>
          </div>
        </div>
      </div>`;
  }

  document.getElementById("placar").innerHTML = html;
}

document.getElementById("confirmar").addEventListener("click", async () => {
  await zerarVotos();
  mostrarResultado();
});

mostrarResultado();
