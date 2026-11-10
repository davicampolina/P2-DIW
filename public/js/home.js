async function mostrarRoca() {
  const participantes = await listarNaRoca();
  let html = "";

  for (let i = 0; i < participantes.length; i++) {
    html += `
      <div class="roca-home text-center">
        <img src="${participantes[i].foto}" alt="${participantes[i].nome}">
        <p class="mb-0 mt-2">${participantes[i].nome}</p>
      </div>`;
  }

  document.getElementById("roca").innerHTML = html;
}

mostrarRoca();
