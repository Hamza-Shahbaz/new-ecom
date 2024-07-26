// Slider sec
$(".slide-sec").slick({
  dots: true,
  infinite: true,
  autoplay: true,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        arrows: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
      },
    },
  ],
});

// brand slider
$(".brand-slider").slick({
  dots: true,
  infinite: true,
  autoplay: true,
  arrows: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        arrows: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
      },
    },
  ],
});
// end
// featured slider
$(".featured-slider").slick({
  dots: true,
  infinite: true,
  autoplay: true,
  arrows: false,
  slidesToShow: 2,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        arrows: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
      },
    },
  ],
});
// end

// Product slider
$(document).ready(function () {
  $(".slider-single").slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    asNavFor: ".slider",
  });

  $(".slider").slick({
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    focusOnSelect: true,
    asNavFor: ".slider-single",
    prevArrow:
      "<img class='a-left slick-prev' src='assets/images/arrow-left.png'>",
    nextArrow:
      "<img class='a-right slick-next' src='assets/images/arrow-right.png'>",
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  });
});
// end

// Get Quote Form validation

(function () {
  "use strict";
  var forms = document.querySelectorAll(".needs-validation");
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// Sticky header

// window.addEventListener("scroll", function () {
//   var header = document.querySelector("header");
//   header.classList.toggle("sticky", window.scrollY > 0);
// })

// end Sticky header

// mobile sub menu
document.addEventListener("DOMContentLoaded", function () {
  if (window.matchMedia("(max-width: 991px)").matches) {
    document
      .querySelectorAll(".dropdown-submenu > a")
      .forEach(function (submenuLink) {
        submenuLink.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          submenuLink.nextElementSibling.classList.toggle("show");
          document
            .querySelectorAll(".dropdown-submenu.active")
            .forEach(function (submenu) {
              submenu.classList.remove("active");
            });
          submenuLink.closest(".dropdown-submenu").classList.add("active");
        });
      });
  }
});

// password show hide
const toggleButtons = document.querySelectorAll(".toggle-password");

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-target");
    const targetInput = document.getElementById(targetId);
    const inputType = targetInput.getAttribute("type");
    targetInput.setAttribute(
      "type",
      inputType === "password" ? "text" : "password"
    );
  });
});

// login tabs
function showTab(tabName) {
  if (tabName === "login") {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
    document
      .querySelector(".login-tabs span.active")
      .classList.remove("active");
    document
      .querySelector(".login-tabs span:nth-child(1)")
      .classList.add("active");
  } else if (tabName === "register") {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
    document
      .querySelector(".login-tabs span.active")
      .classList.remove("active");
    document
      .querySelector(".login-tabs span:nth-child(2)")
      .classList.add("active");
  }
}

// minus plus
$(document).ready(function () {
  $(".count").prop("disabled", true);
  $(document).on("click", ".plus", function () {
    $(".count").val(parseInt($(".count").val()) + 1);
  });
  $(document).on("click", ".minus", function () {
    $(".count").val(parseInt($(".count").val()) - 1);
    if ($(".count").val() == 0) {
      $(".count").val(1);
    }
  });
});

// dashboard tabs ankher tag
$(document).ready(function () {
  function activateSettingsTab() {
    $("#v-pills-settings-tab").tab("show");
    $("#settings").addClass("show active");
    $("#v-pills-setting").addClass("active");
  }
  $("#edit-account-btn, #edit-address-btn").click(function (event) {
    event.preventDefault();
    activateSettingsTab();
  });
});
// end

// type search product
$(document).ready(function () {
  $(".product-list").hide();
  $(".top-search").on("input", function () {
    $(".product-list").toggle($(this).val().trim() !== "");
  });
});
// end
