(function ($) {
  ("use strict");

  // Inicializar o wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 45) {
      $(".navbar").addClass("sticky-top shadow-sm");
    } else {
      $(".navbar").removeClass("sticky-top shadow-sm");
    }
  });

  // Dropdown on mouse hover
  const $dropdown = $(".dropdown");
  const $dropdownToggle = $(".dropdown-toggle");
  const $dropdownMenu = $(".dropdown-menu");
  const showClass = "show";

  $(window).on("load resize", function () {
    if (this.matchMedia("(min-width: 992px)").matches) {
      $dropdown.hover(
        function () {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "true");
          $this.find($dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "false");
          $this.find($dropdownMenu).removeClass(showClass);
        }
      );
    } else {
      $dropdown.off("mouseenter mouseleave");
    }
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    margin: 24,
    dots: true,
    loop: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });

  // Validação de reservas
  function validarReserva() {
    const nome = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const datetime = document.getElementById("datetime").value;
    const pessoas = document.getElementById("select1").value;

    if (!nome || !email || !datetime || !pessoas) {
      alert("Por favor, preencha todos os campos.");
      return false;
    }

    // Verificar se a data/hora são válidas e no futuro
    const dataHora = new Date(datetime);
    const agora = new Date();

    if (isNaN(dataHora.getTime())) {
      alert("Data e Hora inválidas.");
      return false;
    } else if (dataHora < agora) {
      alert(
        "A data e hora são inválidas. (Dica: Verifique se a Data ainda não passou.)"
      );
      return false;
    }

    // Exibir mensagem de confirmação
    alert("Reserva recebida com sucesso!");
    return true;
  }

  // Associe a função ao formulário de reservas
  document
    .querySelector("#booking-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      if (validarReserva()) {
      }
    });

  // Validação de contacto
  function validarContacto() {
    const nome_contacto = document.getElementById("nameContacto").value;
    const email_contacto = document.getElementById("emailContacto").value;
    const assunto_contacto = document.getElementById("subjectContacto").value;
    const mensagem_contacto = document.getElementById("messageContacto").value;

    if (
      !nome_contacto ||
      !email_contacto ||
      !assunto_contacto ||
      !mensagem_contacto
    ) {
      alert("Por favor, preencha todos os campos.");
      return false;
    }

    // Exibir mensagem de confirmação
    alert("Reserva recebida com sucesso!");
    return true;
  }

  // Associe a função ao formulário de contacto
  document
    .querySelector("#contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      if (validarContacto()) {
      }
    });

  // Função para aplicar filtro
  function aplicarFiltro(filtro) {
    const itensMenu = document.querySelectorAll(".menu-item");

    itensMenu.forEach((item) => {
      // Exibe todos os itens se o filtro for "all"
      if (filtro === "all") {
        item.style.display = "block";
      } else {
        // Verifica se o item contém a classe correspondente ao filtro
        if (item.classList.contains(filtro)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      }
    });
  }

  //Menu - Sistema de Avaliação de Pratos
  // Seleciona todas as estrelas dentro dos elementos de avaliação
  document.querySelectorAll(".rating .star").forEach((star) => {
    // Adiciona um evento de clique a cada estrela
    star.addEventListener("click", function () {
      // Obtém o valor da estrela clicada (representando a nota)
      const value = this.getAttribute("data-value");

      // Seleciona todas as estrelas dentro do mesmo grupo de avaliação
      const allStars = this.parentNode.querySelectorAll(".star");

      // Remove a classe 'selected' de todas as estrelas para limpar seleções anteriores
      allStars.forEach((s) => s.classList.remove("selected"));

      // Adiciona a classe 'selected' à estrela clicada
      this.classList.add("selected");

      // Adiciona a classe 'selected' a todas as estrelas anteriores, marcando até a estrela clicada
      let prevSibling = this.previousElementSibling;
      while (prevSibling) {
        prevSibling.classList.add("selected");
        prevSibling = prevSibling.previousElementSibling; // Move para a estrela anterior
      }
    });
  });

})(jQuery);

