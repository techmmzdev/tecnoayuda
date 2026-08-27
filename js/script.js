/* ========================================
   TecnoAyuda - JavaScript
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ========================================
  // Footer reutilizable
  // ========================================
  function renderFooter() {
    const placeholder = document.getElementById("footer-placeholder");
    if (!placeholder) return;
    placeholder.innerHTML = `
      <footer class="footer">
      <p>© 2026 MazaTech </p>
        <p>🛠️ TecnoAyuda — Tecnología al alcance de todos.</p>
        <div class="footer-links">
          <a href="index.html">Inicio</a>
          <a href="tutoriales.html">Tutoriales</a>
          <a href="diagnostico.html">Diagnóstico</a>
          <a href="nosotros.html">Sobre nosotros</a>
        </div>
      </footer>
    `;
  }
  renderFooter();

  // ========================================
  // 1. Menú móvil
  // ========================================
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuToggle.textContent = navLinks.classList.contains("active")
        ? "✕"
        : "☰";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.textContent = "☰";
      });
    });
  }

  // ========================================
  // 2. Filtros de tutoriales
  // ========================================
  const filterButtons = document.querySelectorAll(".filter-btn");
  const tutorialCards = document.querySelectorAll(".tutorial-card");
  const noResults = document.getElementById("noResults");
  const searchInput = document.getElementById("searchInput");

  let currentFilter = "todos";
  let currentSearch = "";

  function updateVisibility() {
    let visibleCount = 0;

    tutorialCards.forEach((card) => {
      const category = card.getAttribute("data-category");
      const keywords = card.getAttribute("data-keywords").toLowerCase();
      const title = card.querySelector("h3").textContent.toLowerCase();
      const description = card.querySelector("p").textContent.toLowerCase();

      const matchesFilter =
        currentFilter === "todos" || category === currentFilter;
      const matchesSearch =
        currentSearch === "" ||
        keywords.includes(currentSearch) ||
        title.includes(currentSearch) ||
        description.includes(currentSearch);

      if (matchesFilter && matchesSearch) {
        card.style.display = "";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    if (noResults) {
      noResults.classList.toggle("visible", visibleCount === 0);
    }
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-filter");
      updateVisibility();
    });
  });

  // ========================================
  // 3. Buscador de tutoriales
  // ========================================
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearch = e.target.value.toLowerCase().trim();
      updateVisibility();
    });
  }

  // ========================================
  // 4. Diagnóstico
  // ========================================
  const problemButtons = document.querySelectorAll(".problem-btn");
  const diagnosticResult = document.getElementById("diagnosticResult");
  const resultTitle = document.getElementById("resultTitle");
  const resultDescription = document.getElementById("resultDescription");
  const resultSteps = document.getElementById("resultSteps");
  const resultLink = document.getElementById("resultLink");
  const diagnosticModalOverlay = document.getElementById(
    "diagnosticModalOverlay",
  );
  const diagnosticModalTitle = document.getElementById("diagnosticModalTitle");
  const diagnosticModalCategory = document.getElementById(
    "diagnosticModalCategory",
  );
  const diagnosticModalBody = document.getElementById("diagnosticModalBody");
  const diagnosticModalClose = document.getElementById("diagnosticModalClose");

  function closeDiagnosticModal() {
    if (diagnosticModalOverlay) {
      diagnosticModalOverlay.classList.remove("active");
      diagnosticModalOverlay.setAttribute("aria-hidden", "true");
    }
    document.body.style.overflow = "";
  }

  function openDiagnosticModal(data) {
    if (
      !diagnosticModalOverlay ||
      !diagnosticModalTitle ||
      !diagnosticModalBody
    ) {
      return;
    }

    diagnosticModalTitle.textContent = data.title;
    if (diagnosticModalCategory) {
      diagnosticModalCategory.textContent = "Recomendación";
    }

    const stepsList = data.steps.map((step) => `<li>${step}</li>`).join("");
    const tutorialLink = data.tutorial
      ? `<a href="${data.tutorial}" class="btn btn-primary">Ver tutorial recomendado</a>`
      : "";

    diagnosticModalBody.innerHTML = `
      <p>${data.description}</p>
      <ul>${stepsList}</ul>
      ${tutorialLink}
    `;

    diagnosticModalOverlay.classList.add("active");
    diagnosticModalOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  const diagnostics = {
    lenta: {
      title: "🐌 Computadora lenta",
      description:
        "Puedes comenzar revisando los siguientes puntos para identificar qué está afectando el rendimiento de tu PC:",
      steps: [
        "Revisa los programas que se ejecutan al iniciar Windows.",
        "Verifica el espacio disponible en el disco duro.",
        "Identifica programas que consumen muchos recursos con el Administrador de tareas.",
        "Elimina archivos temporales y que ya no necesites.",
        "Considera agregar más memoria RAM si el problema persiste.",
      ],
      tutorial: "tutoriales.html#lenta",
    },
    internet: {
      title: "🌐 Sin conexión a Internet",
      description:
        "Para identificar el problema de conexión, puedes probar los siguientes pasos:",
      steps: [
        "Verifica si el módem o router está encendido y funcionando correctamente.",
        "Reinicia el módem: desconéctalo por 30 segundos y vuelve a conectarlo.",
        "Reinicia la computadora.",
        "Verifica si otros dispositivos pueden conectarse a la misma red.",
        "Ejecuta el solucionador de problemas de red de Windows.",
      ],
      tutorial: "tutoriales.html#internet",
    },
    espacio: {
      title: "💾 Poco espacio en disco",
      description:
        "Para liberar espacio en tu computadora, puedes seguir estos pasos:",
      steps: [
        'Usa la herramienta "Liberar espacio en disco" de Windows.',
        "Vacia la papelera de reciclaje.",
        "Desinstala programas que ya no utilices.",
        "Elimina archivos temporales y de caché del navegador.",
        "Mueve archivos grandes (fotos, videos) a un disco externo o nube.",
      ],
      tutorial: "tutoriales.html#espacio",
    },
    sonido: {
      title: "🔊 Sin sonido",
      description:
        "Si tu computadora no reproduce sonido, revisa lo siguiente:",
      steps: [
        "Verifica que los altavoces o auriculares estén encendidos y conectados correctamente.",
        "Revisa que el volumen no esté en silencio en Windows.",
        'Haz clic derecho en el ícono de sonido y selecciona "Abrir configuración de sonido".',
        "Verifica que el dispositivo de reproducción correcto esté seleccionado.",
        "Actualiza o reinstala los drivers de audio.",
      ],
      tutorial: null,
    },
    imagen: {
      title: "🖥️ No muestra imagen",
      description: "Si la pantalla no muestra imagen, intenta lo siguiente:",
      steps: [
        "Verifica que el monitor esté encendido y correctamente conectado.",
        "Revisa los cables de conexión (HDMI, VGA, DisplayPort).",
        "Si usas tarjeta gráfica dedicada, verifica que esté bien insertada.",
        "Prueba con otro cable o puerto de conexión.",
        "Reinicia la computadora y observa si aparece el logo de inicio.",
      ],
      tutorial: null,
    },
  };

  problemButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const problem = btn.getAttribute("data-problem");
      const data = diagnostics[problem];

      if (!data) return;

      problemButtons.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");

      if (diagnosticModalOverlay) {
        openDiagnosticModal(data);
        return;
      }

      resultTitle.textContent = data.title;
      resultDescription.textContent = data.description;

      resultSteps.innerHTML = "";
      data.steps.forEach((step) => {
        const li = document.createElement("li");
        li.textContent = step;
        resultSteps.appendChild(li);
      });

      if (data.tutorial) {
        resultLink.href = data.tutorial;
        resultLink.style.display = "inline-block";
      } else {
        resultLink.style.display = "none";
      }

      diagnosticResult.classList.add("visible");
      diagnosticResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });

  if (diagnosticModalClose) {
    diagnosticModalClose.addEventListener("click", closeDiagnosticModal);
  }

  if (diagnosticModalOverlay) {
    diagnosticModalOverlay.addEventListener("click", (e) => {
      if (e.target === diagnosticModalOverlay) {
        closeDiagnosticModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      diagnosticModalOverlay &&
      diagnosticModalOverlay.classList.contains("active")
    ) {
      closeDiagnosticModal();
    }
  });

  // ========================================
  // 5. Modal de tutoriales
  // ========================================
  const modalOverlay = document.getElementById("modalOverlay");
  const modalTitle = document.getElementById("modalTitle");
  const modalCategory = document.getElementById("modalCategory");
  const modalBody = document.getElementById("modalBody");
  const modalClose = document.getElementById("modalClose");
  const tutorialBtns = document.querySelectorAll("[data-tutorial]");

  const tutorialContent = {
    lenta: {
      title: "🐌 Computadora lenta",
      category: "Rendimiento",
      html: `
        <h3>Pasos para solucionar una computadora lenta</h3>
        <ol>
          <li><strong>Revisa los programas de inicio:</strong> Presiona <code>Ctrl + Shift + Esc</code> para abrir el Administrador de tareas. Ve a la pestaña "Inicio" y desactiva los programas que no necesites al iniciar Windows.</li>
          <li><strong>Verifica el espacio en disco:</strong> Abre el Explorador de archivos y revisa cuánto espacio libre tienes en el disco C:. Si está muy lleno, necesitarás liberar espacio.</li>
          <li><strong>Identifica programas pesados:</strong> En el Administrador de tareas, revisa la pestaña "Procesos" para ver qué programas están consumiendo más CPU y memoria.</li>
          <li><strong>Elimina archivos temporales:</strong> Presiona <code>Windows + R</code>, escribe <code>%temp%</code> y elimina los archivos de la carpeta que se abre.</li>
          <li><strong>Escanea en busca de virus:</strong> Usa Windows Defender o tu antivirus para hacer un análisis completo del sistema.</li>
        </ol>
        <div class="tip"><strong>💡 Consejo:</strong> Si después de estos pasos tu computadora sigue lenta, considera agregar más memoria RAM o consultar a un técnico.</div>
      `,
    },
    espacio: {
      title: "💾 Liberar espacio en disco",
      category: "Rendimiento",
      html: `
        <h3>Pasos para liberar espacio en tu computadora</h3>
        <ol>
          <li><strong>Usa la herramienta de Windows:</strong> Haz clic derecho en el disco C:, selecciona "Propiedades" y luego "Liberar espacio en disco".</li>
          <li><strong>Vacía la papelera de reciclaje:</strong> Haz clic derecho en la papelera del escritorio y selecciona "Vaciar papelera de reciclaje".</li>
          <li><strong>Desinstala programas:</strong> Ve a Configuración &gt; Aplicaciones &gt; Aplicaciones instaladas y elimina las que ya no uses.</li>
          <li><strong>Limpia el navegador:</strong> Elimina archivos temporales y caché desde la configuración de tu navegador.</li>
          <li><strong>Mueve archivos grandes:</strong> Transfiere fotos, videos y documentos a un disco duro externo o a la nube.</li>
        </ol>
        <div class="tip"><strong>💡 Consejo:</strong> Mantén al menos un 15-20% de espacio libre en tu disco para que Windows funcione correctamente.</div>
      `,
    },
    inicio: {
      title: "🚀 Programas de inicio",
      category: "Rendimiento",
      html: `
        <h3>Pasos para administrar los programas de inicio</h3>
        <ol>
          <li><strong>Abre el Administrador de tareas:</strong> Presiona <code>Ctrl + Shift + Esc</code> o haz clic derecho en la barra de tareas y selecciona "Administrador de tareas".</li>
          <li><strong>Ve a la pestaña "Inicio":</strong> Ahí verás todos los programas que se ejecutan automáticamente cuando enciendes la computadora.</li>
          <li><strong>Revisa cada programa:</strong> Observa la columna "Impacto de inicio" para identificar cuáles son los que más ralentizan el arranque.</li>
          <li><strong>Desactiva los innecesarios:</strong> Haz clic derecho en los programas que no necesites al iniciar y selecciona "Deshabilitar".</li>
          <li><strong>Reinicia la computadora:</strong> Para verificar que los cambios surtan efecto.</li>
        </ol>
        <div class="tip"><strong>💡 Consejo:</strong> No desactives programas del sistema como antivirus o controladores. Solo desactiva aplicaciones como Spotify, Skype, Discord, etc., que no necesitas al encender la PC.</div>
      `,
    },
    mantenimiento: {
      title: "🧹 Mantenimiento básico",
      category: "Mantenimiento",
      html: `
        <h3>Pasos para el mantenimiento básico de tu computadora</h3>
        <ol>
          <li><strong>Actualiza Windows:</strong> Ve a Configuración &gt; Windows Update y verifica que tengas las últimas actualizaciones instaladas.</li>
          <li><strong>Actualiza los drivers:</strong> Revisa que los controladores de hardware (especialmente gráficos y red) estén actualizados.</li>
          <li><strong>Limpia archivos temporales:</strong> Usa la herramienta de liberación de espacio en disco al menos una vez al mes.</li>
          <li><strong>Ejecuta un antivirus:</strong> Realiza un análisis completo con Windows Defender o tu antivirus para detectar amenazas.</li>
          <li><strong>Cuida el hardware:</strong> Mantén la computadora ventilada, limpia el polvo de las ventilaciones y evita colocarla sobre superficies blandas.</li>
        </ol>
        <div class="tip"><strong>💡 Consejo:</strong> Realiza un mantenimiento básico al menos una vez al mes para mantener tu computadora en óptimas condiciones.</div>
      `,
    },
    internet: {
      title: "🌐 Problemas de Internet",
      category: "Internet",
      html: `
        <h3>Pasos para solucionar problemas de conexión</h3>
        <ol>
          <li><strong>Verifica el módem/router:</strong> Asegúrate de que esté encendido y que las luces indicadoras estén funcionando normalmente.</li>
          <li><strong>Reinicia el módem:</strong> Desconéctalo de la corriente, espera 30 segundos y vuelve a conectarlo. Espera 2 minutos a que se reinicie completamente.</li>
          <li><strong>Reinicia la computadora:</strong> Muchos problemas de red se solucionan simplemente reiniciando el equipo.</li>
          <li><strong>Usa el solucionador de problemas:</strong> Haz clic derecho en el ícono de red en la barra de tareas y selecciona "Solucionar problemas".</li>
          <li><strong>Reinicia la tarjeta de red:</strong> Abre el Administrador de tareas, ve a "Dispositivos", haz clic derecho en tu adaptador de red y selecciona "Deshabilitar", luego "Habilitar" nuevamente.</li>
        </ol>
        <div class="tip"><strong>💡 Consejo:</strong> Si el problema persiste, prueba conectarte con un cable Ethernet directamente al router para descartar un problema con la conexión WiFi.</div>
      `,
    },
    seguridad: {
      title: "🛡️ Seguridad informática",
      category: "Seguridad",
      html: `
        <h3>Consejos para proteger tu computadora</h3>
        <ol>
          <li><strong>Mantén Windows actualizado:</strong> Las actualizaciones incluyen parches de seguridad importantes. Activa las actualizaciones automáticas.</li>
          <li><strong>Usa Windows Defender:</strong> El antivirus incluido en Windows es gratuito y bastante efectivo. Asegúrate de que esté activado.</li>
          <li><strong>No descargues archivos sospechosos:</strong> Evita descargar programas de fuentes no confiables. Usa siempre las páginas oficiales.</li>
          <li><strong>Cuidado con los enlaces:</strong> No hagas clic en enlaces de correos electrónicos o mensajes de desconocidos.</li>
          <li><strong>Haz copias de seguridad:</strong> Guarda tus archivos importantes en un disco externo o en la nube regularmente.</li>
        </ol>
        <div class="tip"><strong>💡 Consejo:</strong> Si descargaste algo sospechoso, ejecuta un análisis completo con Windows Defender en modo de escaneo offline.</div>
      `,
    },
  };

  function openModal(tutorialId) {
    const data = tutorialContent[tutorialId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalBody.innerHTML = data.html;
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  tutorialBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tutorialId = btn.getAttribute("data-tutorial");
      openModal(tutorialId);
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      modalOverlay &&
      modalOverlay.classList.contains("active")
    ) {
      closeModal();
    }
  });
});
