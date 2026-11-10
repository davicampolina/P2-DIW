const URL_API = "http://localhost:3000";

async function listarParticipantes() {
  const res = await fetch(URL_API + "/participantes");
  return await res.json();
}

async function listarNaRoca() {
  const res = await fetch(URL_API + "/participantes?naRoca=true");
  return await res.json();
}

async function listarForaDaRoca() {
  const res = await fetch(URL_API + "/participantes?naRoca=false");
  return await res.json();
}

async function listarVotos() {
  const res = await fetch(URL_API + "/votos");
  return await res.json();
}

async function registrarVoto(id) {
  const res = await fetch(URL_API + "/votos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ participanteId: id, data: new Date().toISOString() })
  });
  return await res.json();
}

async function zerarVotos() {
  const votos = await listarVotos();
  for (let i = 0; i < votos.length; i++) {
    await fetch(URL_API + "/votos/" + votos[i].id, { method: "DELETE" });
  }
}

// conta os votos de cada um e ordena do maior pro menor
function calcularResultado(naRoca, votos) {
  let lista = [];

  for (let i = 0; i < naRoca.length; i++) {
    let qtd = 0;
    for (let j = 0; j < votos.length; j++) {
      if (votos[j].participanteId == naRoca[i].id) {
        qtd++;
      }
    }

    let perc = 0;
    if (votos.length > 0) {
      perc = qtd * 100 / votos.length;
    }

    lista.push({ nome: naRoca[i].nome, foto: naRoca[i].foto, votos: qtd, percentual: perc });
  }

  lista.sort((a, b) => b.votos - a.votos);
  return lista;
}
