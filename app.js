const clientes = [
  { id: 1, nombre: "Elena González", tel: "8406 3260", mail: "elesevilla98@correo.com" },
  { id: 2, nombre: "Jonathan Ramírez", tel: "5478 9877", mail: "jona93rami@correo.com" },
  { id: 3, nombre: "Luis Torres", tel: "7789 9867", mail: "torres98@correo.com" },
  { id: 4, nombre: "Magdalena Hernández", tel: "8967 9806", mail: "magda03hernandez@correo.com" }
];
const servicios = [
  { cod: "S01", nombre: "Consulta y valoración", dur: "30 min", precio: 350 },
  { cod: "S02", nombre: "Limpieza dental", dur: "45 min", precio: 600 },
  { cod: "S03", nombre: "Resina (empaste)", dur: "45 min", precio: 800 },
  { cod: "S04", nombre: "Extracción simple", dur: "40 min", precio: 900 },
  { cod: "S05", nombre: "Blanqueamiento dental", dur: "60 min", precio: 2500 },
  { cod: "S06", nombre: "Revisión de ortodoncia", dur: "30 min", precio: 500 }
];
function fechaRel(dias) {
  const d = new Date(); d.setDate(d.getDate() + dias);
  return d.toISOString().slice(0, 10);
}
let citas = [
  { folio: 101, cliente: 1, servicio: "S01", fecha: fechaRel(0), hora: "09:00", estado: "Confirmada" },
  { folio: 102, cliente: 2, servicio: "S02", fecha: fechaRel(1), hora: "10:00", estado: "Pendiente" },
  { folio: 103, cliente: 3, servicio: "S04", fecha: fechaRel(1), hora: "12:00", estado: "Confirmada" },
  { folio: 104, cliente: 4, servicio: "S03", fecha: fechaRel(2), hora: "11:00", estado: "Cancelada" },
  { folio: 105, cliente: 1, servicio: "S03", fecha: fechaRel(3), hora: "16:00", estado: "Pendiente" }
];
let nextFolio = 106;
const $ = id => document.getElementById(id);
const nombreCliente = id => (clientes.find(c => c.id == id) || {}).nombre || "?";
const nombreServicio = cod => (servicios.find(s => s.cod === cod) || {}).nombre || "?";

// Navegación
function mostrar(vista) {
  document.querySelectorAll(".view").forEach(v => v.classList.toggle("active", v.id === vista));
  document.querySelectorAll("#menu button").forEach(b => b.classList.toggle("active", b.dataset.view === vista));
  render();
}
document.querySelectorAll("#menu button").forEach(b => b.addEventListener("click", () => mostrar(b.dataset.view)));
document.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => mostrar(b.dataset.go)));

// Renderizado
function render() {
  // KPIs
  $("kpi-total").textContent = citas.length;
  $("kpi-pend").textContent = citas.filter(c => c.estado === "Pendiente").length;
  $("kpi-conf").textContent = citas.filter(c => c.estado === "Confirmada").length;
  $("kpi-canc").textContent = citas.filter(c => c.estado === "Cancelada").length;

  // Selects del formulario
  const selC = $("f-cliente"), selS = $("f-servicio");
  const prevC = selC.value, prevS = selS.value;
  selC.innerHTML = clientes.map(c => `<option value="${c.id}">${c.nombre}</option>`).join("");
  selS.innerHTML = servicios.map(s => `<option value="${s.cod}">${s.nombre}</option>`).join("");
  if (prevC) selC.value = prevC;
  if (prevS) selS.value = prevS;

  // Tabla de citas
  const filtro = $("filtro").value;
  $("tabla-citas").innerHTML = citas
    .filter(c => !filtro || c.estado === filtro)
    .map(c => `<tr>
      <td>${c.folio}</td><td>${nombreCliente(c.cliente)}</td><td>${nombreServicio(c.servicio)}</td>
      <td>${c.fecha}</td><td>${c.hora}</td>
      <td><span class="badge ${c.estado}">${c.estado}</span></td>
      <td>
        <button class="btn small" onclick="cambiar(${c.folio},'Confirmada')">Confirmar</button>
        <button class="btn small danger" onclick="cambiar(${c.folio},'Cancelada')">Cancelar</button>
      </td></tr>`).join("");

  // Clientes y servicios
  $("tabla-clientes").innerHTML = clientes.map(c =>
    `<tr><td>${c.id}</td><td>${c.nombre}</td><td>${c.tel}</td><td>${c.mail}</td></tr>`).join("");
  $("tabla-servicios").innerHTML = servicios.map(s =>
    `<tr><td>${s.cod}</td><td>${s.nombre}</td><td>${s.dur}</td><td>$${s.precio}</td></tr>`).join("");

  renderAgenda();
}

function renderAgenda() {
  const dias = [0, 1, 2, 3, 4].map(fechaRel);
  const horas = ["09:00", "10:00", "11:00", "12:00", "15:00", "16:00", "17:00"];
  let html = "<thead><tr><th>Hora</th>" + dias.map(d => `<th>${d}</th>`).join("") + "</tr></thead><tbody>";
  horas.forEach(h => {
    html += `<tr><th>${h}</th>`;
    dias.forEach(d => {
      const c = citas.find(x => x.fecha === d && x.hora === h && x.estado !== "Cancelada");
      html += `<td>${c ? `<div class="slot">${nombreCliente(c.cliente)}<br>${nombreServicio(c.servicio)}</div>` : ""}</td>`;
    });
    html += "</tr>";
  });
  $("tabla-agenda").innerHTML = html + "</tbody>";
}

// Acciones
function cambiar(folio, estado) {
  const c = citas.find(x => x.folio === folio);
  if (c) c.estado = estado;
  render();
}
window.cambiar = cambiar;

function aviso(texto, error) {
  const m = $("msg");
  m.textContent = texto;
  m.classList.toggle("error", !!error);
}

$("form-cita").addEventListener("submit", e => {
  e.preventDefault();
  const nueva = {
    folio: nextFolio, cliente: +$("f-cliente").value, servicio: $("f-servicio").value,
    fecha: $("f-fecha").value, hora: $("f-hora").value, estado: "Pendiente"
  };
  const ocupado = citas.some(c => c.fecha === nueva.fecha && c.hora === nueva.hora && c.estado !== "Cancelada");
  if (ocupado) { aviso("Ese horario ya está ocupado. Elige otro.", true); return; }
  citas.push(nueva); nextFolio++;
  aviso(`Cita #${nueva.folio} agendada correctamente.`);
  e.target.reset();
  render();
});

$("form-cliente").addEventListener("submit", e => {
  e.preventDefault();
  clientes.push({ id: clientes.length + 1, nombre: $("c-nombre").value, tel: $("c-tel").value, mail: $("c-mail").value });
  e.target.reset();
  render();
});

$("filtro").addEventListener("change", render);
$("f-fecha").min = fechaRel(0);
render();
