async function mostrarRoca() {
  const participantes = await listarNaRoca();
  let html = "";

  for (let i = 0; i < participantes.length; i++) {
    const p = participantes[i];
    html += `
      <div class="col">
        <div class="card card-roca h-100">
          <span class="badge bg-danger">Na roça</span>
          <img src="${p.foto}" class="card-img-top" alt="${p.nome}">
          <div class="card-body text-center">
            <h3>${p.nome}</h3>
            <button class="btn btn-danger w-100" onclick="votar(${p.id}, '${p.nome}')">Votar para eliminar</button>
          </div>
        </div>
      </div>`;
  }

  document.getElementById("cards-roca").innerHTML = html;
}

async function mostrarPeoes() {
  const participantes = await listarForaDaRoca();
  let html = "";

  for (let i = 0; i < participantes.length; i++) {
    html += `
      <div class="col">
        <div class="card card-peao h-100">
          <img src="${participantes[i].foto}" class="card-img-top" alt="${participantes[i].nome}">
          <div class="card-body p-2 text-center">
            <h4 class="mb-0">${participantes[i].nome}</h4>
          </div>
        </div>
      </div>`;
  }

  document.getElementById("cards-peoes").innerHTML = html;
}

async function votar(id, nome) {
  await registrarVoto(id);
  const votos = await listarVotos();

  const alerta = document.getElementById("alerta");
  alerta.innerHTML = `Voto registrado para eliminar <b>${nome}</b>! Você já votou ${votos.length} vezes. <a href="resultado.html" class="alert-link">Ver resultado</a>`;
  alerta.classList.remove("d-none");
}

mostrarRoca();
mostrarPeoes();
