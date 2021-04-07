$(document).ready(function () {
  $(".preloader").addClass("fadeOut");
  $(".preloader__elem").addClass("scale");
  setTimeout(function () {
    $(".preloader").addClass("_none");
  }, 800);
  //   require ready function
  $("#date").html(`${new Date().getFullYear()}`);
  $(".form__phone").mask("+7(000)-000-00-00");

  const archors = $("a[href*='#']");
  for (const arch of archors) {
    arch.addEventListener("click", function (e) {
      e.preventDefault();
      if ($(".burger").hasClass("_active")) {
        $("body").removeClass("_lock");
        $(".burger").removeClass("_active");
        $(".header__nav").removeClass("_active");
      }
      const blockID = $(this).attr("href");
      const blockToScrolling = $(blockID)[0];
      const positionOfElem =
        blockToScrolling.getBoundingClientRect().top +
        pageYOffset -
        $(".header").height();
      window.scrollTo({
        top: positionOfElem,
        behavior: "smooth",
      });
    });
  }
  // $("body").removeClass("_lock");
  $(".slider").slick({
    arrows: true,
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    autoplaySpeed: 5000,
    pauseOnDotsHover: true,
    responsive: [
      {
        breakpoint: 1210,
        settings: {
          slidesToShow: 2,
          adaptiveWidth: true,
          infinite: true,
          arrows: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          adaptiveWidth: true,
          arrows: 0,
          infinite: true,
        },
      },
      {
        breakpoint: 880,
        settings: {
          slidesToShow: 2,
          adaptiveWidth: true,
          arrows: 0,
          infinite: true,
        },
      },

      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          adaptiveWidth: true,
          arrows: 0,
          infinite: true,
          autoplay: false,
        },
      },
    ],
  });
  //   $("*.slick-slide").;
  function sliderAnimate() {
    $(".slick-current").next().addClass("center-slide");
    $(".slider").on("beforeChange", function () {
      $("*.slick-slide").removeClass("center-slide");
    });
    $(".slider").on("afterChange", function () {
      $(".slick-current").next().addClass("center-slide");
    });
  }
  sliderAnimate();
  const container = document.querySelector(".gallery__columns");
  const gallerySizer = document.querySelector(".gallery__sizer");
  const shuffleGrid = new Shuffle(container, {
    itemSelector: ".gallery__item",
    sizer: gallerySizer,
  });
  $("#all").on("click", function (e) {
    e.preventDefault();
    shuffleGrid.filter();
  });
  $("#landing").on("click", function (e) {
    e.preventDefault();
    shuffleGrid.filter("landing");
  });
  $("#quiz").on("click", function (e) {
    e.preventDefault();
    shuffleGrid.filter("quiz");
  });
  $("#blog").on("click", function (e) {
    e.preventDefault();
    shuffleGrid.filter("blog");
  });
  $("#help").on("click", function (e) {
    e.preventDefault();
    shuffleGrid.filter("help");
  });
});
