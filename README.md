# DentaCita – Sistema de citas para clínica dental

Prototipo web del examen práctico "Ciclo de vida de un proyecto informático".
Caso seleccionado: **Sistema de citas**.
Modalidad: equipo de dos integrantes (Gloria Elena Gonsalez Sevilla y Jimmy Macdiel Martínez Garcia).

## 1. Objetivo principal

**Nombre del proyecto:** DentaCita

**Problema:** La Clínica Dental Sonrisa Sana agenda las citas de sus pacientes por teléfono y en una libreta. Esto provoca empalmes de horario entre pacientes, citas sin confirmar, pacientes que no se presentan y poca visibilidad de la agenda del consultorio.

**Objetivo principal:** Desarrollar un sistema web que permita registrar, consultar, confirmar y cancelar citas de pacientes, validando la disponibilidad de horarios para evitar empalmes.

**Objetivos específicos:**
- Registrar pacientes y consultar los tratamientos que ofrece la clínica.
- Agendar citas validando que el horario esté libre.
- Gestionar el estado de las citas (Pendiente, Confirmada, Cancelada).
- Visualizar la agenda semanal y un resumen de indicadores.
- Ofrecer una interfaz sencilla y demostrable en navegador sin base de datos.

**Alcance inicial:** Prototipo visual con datos ficticios y 5 módulos: Inicio, Citas, Pacientes, Tratamientos y Agenda. Queda fuera: base de datos, inicio de sesión, expediente clínico, odontograma, recordatorios, pagos y asignación de citas por dentista.

## 2. Análisis funcional

**Usuarios del sistema**
- **Recepcionista:** opera el sistema a diario (agenda, confirma y cancela citas, registra pacientes).
- **Administrador de la clínica:** consulta indicadores y el catálogo de tratamientos.

**Necesidades principales:** evitar empalmes de horario, consultar la agenda rápidamente, confirmar o cancelar citas y tener un registro de pacientes.

### Historias de usuario

| ID | Historia | Criterios de aceptación |
|----|----------|-------------------------|
| HU1 | Como **recepcionista**, quiero registrar un paciente nuevo, para poder agendarle citas. | Al enviar el formulario, el paciente aparece en la tabla y en la lista del formulario de citas. |
| HU2 | Como **recepcionista**, quiero agendar una cita eligiendo paciente, tratamiento, fecha y hora, para reservarle un espacio. | La cita aparece en la tabla con estado Pendiente y un folio nuevo. |
| HU3 | Como **recepcionista**, quiero que el sistema me avise si el horario ya está ocupado, para evitar empalmes en el consultorio. | Si la fecha y hora ya tienen una cita activa, se muestra un mensaje de error y no se guarda. |
| HU4 | Como **recepcionista**, quiero confirmar o cancelar una cita, para mantener actualizado su estado. | Al pulsar el botón, el estado y los indicadores cambian de inmediato. |
| HU5 | Como **recepcionista**, quiero filtrar las citas por estado, para encontrar rápido las pendientes por confirmar. | Al elegir un estado, la tabla muestra solo esas citas. |
| HU6 | Como **recepcionista**, quiero ver la agenda semanal, para saber qué horarios están libres. | La cuadrícula muestra las citas activas por día y hora; las canceladas no aparecen. |
| HU7 | Como **administrador**, quiero ver la lista de tratamientos con duración y precio, para conocer lo que ofrece la clínica. | La tabla de Tratamientos muestra código, nombre, duración y precio. |
| HU8 | Como **administrador**, quiero ver indicadores en la página de inicio, para conocer el estado general de las citas. | Inicio muestra el total de citas y cuántas están pendientes, confirmadas y canceladas. |

### Requisitos funcionales

| ID | Requisito | Historia | Módulo del prototipo |
|----|-----------|----------|----------------------|
| RF1 | Registrar pacientes (nombre, teléfono, correo). | HU1 | Pacientes |
| RF2 | Consultar el catálogo de tratamientos con duración y precio. | HU7 | Tratamientos |
| RF3 | Agendar una cita eligiendo paciente, tratamiento, fecha y hora. | HU2 | Citas |
| RF4 | Validar que no existan dos citas activas en el mismo horario. | HU3 | Citas |
| RF5 | Confirmar o cancelar citas y filtrarlas por estado. | HU4, HU5 | Citas |
| RF6 | Visualizar la agenda semanal. | HU6 | Agenda |
| RF7 | Mostrar indicadores en la página de inicio. | HU8 | Inicio |

### Requisitos no funcionales

| ID | Requisito | Cómo se cumple en el prototipo |
|----|-----------|--------------------------------|
| RNF1 | Interfaz sencilla y usable por personal sin experiencia técnica. | Menú único con 5 opciones y formularios de pocos campos. |
| RNF2 | Diseño responsivo. | CSS con flexbox y grid, y una regla `@media` (hasta 600 px); la agenda se desplaza horizontalmente. |
| RNF3 | Respuesta rápida (menos de 2 s). | Todo corre en el navegador, sin esperas de red. |
| RNF4 | Compatible con navegadores modernos. | Usa solo HTML5, CSS3 y JavaScript estándar. |
| RNF5 | Código modular y fácil de mantener. | Separado en tres archivos: estructura, estilos y lógica. |
| RNF6 | Datos ficticios suficientes para una demostración completa. | `app.js` precarga 4 pacientes, 6 tratamientos y 5 citas. |

## 3. Planificación

El equipo es de dos personas, así que cada integrante asume varios de los seis roles sugeridos:

| Integrante | Roles |
|------------|-------|
| Jimmy Martínez Garcia | Líder / coordinación, análisis funcional y requisitos |
| Elena González Sevilla | Diseño UI, desarrollo y GitHub / integración |

**Calendario de trabajo:** Análisis → Diseño → Desarrollo → Pruebas → Publicación

| Etapa | Tiempo |
|-------|--------|
| Objetivo principal | 5 min |
| Análisis funcional | 10 min |
| Planificación | 5 min |
| Diseño detallado | 10 min |
| Ejecución / prototipo | 15 min |
| Seguimiento y pruebas | 5 min |
| Aceptación | 3 min |
| Cierre / GitHub Pages | 2 min |
| **Total** | **55 min** |

## 4. Diseño

**Arquitectura propuesta:** Prototipo: sitio estático de una sola página que se ejecuta en el navegador. Versión productiva: tres capas (interfaz web → API REST → base de datos).

**Tecnologías:** HTML5, CSS3 y JavaScript para el prototipo; Git, GitHub y GitHub Pages para publicarlo. Para una versión futura: Node.js con Express y MySQL o PostgreSQL.

**Módulos:** Inicio, Citas, Pacientes, Tratamientos, Agenda.

**Navegación:**
```
[Inicio] [Citas] [Pacientes] [Tratamientos] [Agenda]
```

**Pantallas principales:**
- **Inicio:** 4 tarjetas de indicadores (total, pendientes, confirmadas, canceladas) y dos botones de acceso rápido.
- **Citas:** formulario (paciente, tratamiento, fecha, hora), filtro por estado y tabla con botones Confirmar y Cancelar.
- **Pacientes:** formulario (nombre, teléfono, correo) y tabla.
- **Tratamientos:** tabla con código, tratamiento, duración y precio (consulta, limpieza, resina (empaste), extracción, blanqueamiento, ortodoncia).
- **Agenda:** cuadrícula de 7 horarios por 5 días consecutivos a partir de hoy.

## 5. Ejecución

El prototipo está en `index.html` (estructura), `styles.css` (estilos) y `app.js` (lógica). Usa datos ficticios guardados en memoria; al recargar la página se reinician.

**Limitaciones conocidas:** la validación compara solo fecha y hora de inicio (no la duración del tratamiento); la agenda muestra únicamente cinco días a partir de hoy; los horarios son fijos (09:00–12:00 y 15:00–17:00).

## 6. Seguimiento y pruebas

| Prueba | Resultado esperado | Historia |
|--------|--------------------|----------|
| Registrar un paciente | Aparece en Pacientes y en la lista del formulario de citas. | HU1 |
| Agendar cita en horario libre | Se agrega a la tabla como Pendiente. | HU2 |
| Agendar cita en horario ocupado | Muestra mensaje de error y no la guarda. | HU3 |
| Confirmar o cancelar una cita | Cambia el estado y se actualizan los indicadores. | HU4 |
| Filtrar por estado | La tabla muestra solo el estado elegido. | HU5 |
| Abrir Agenda | Las citas activas aparecen en su día y hora. | HU6 |
| Abrir Tratamientos | Se ve el catálogo con precios. | HU7 |
| Abrir Inicio | Los indicadores coinciden con la tabla de citas. | HU8 |

## 7. Aceptación

**¿El prototipo demuestra la solución planteada?** Sí. Permite registrar pacientes, agendar citas, evitar empalmes, gestionar estados y visualizar la agenda de la clínica dental.

**Requisitos que se demuestran en vivo:**
1. RF1 – registrar un paciente en Pacientes.
2. RF3 – agendar una cita en Citas.
3. RF4 – intentar agendar en un horario ocupado y ver el error.
4. RF5 – confirmar o cancelar una cita y usar el filtro.
5. RF6 – ver la cita en la Agenda.
6. RF7 – ver cómo cambian los indicadores en Inicio.

## 8. Cierre y mantenimiento

**Publicación en GitHub Pages:**
1. Crear un repositorio y subir `index.html`, `styles.css`, `app.js` y `README.md` 

**Mantenimiento futuro:** conectar una base de datos, agregar inicio de sesión por roles, asignar citas por dentista, expediente clínico y odontograma, recordatorios por correo o WhatsApp, editar citas y generar reportes.