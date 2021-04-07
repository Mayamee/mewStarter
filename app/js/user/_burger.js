$(".burger").click(function (e) {
  e.preventDefault();
  $(this).toggleClass("_active");
  $("body").toggleClass("_lock"); //not important
  $(".header__nav").toggleClass("_active");
});
