window.addEventListener("scroll", function () {
  const navbarCollapsible = document.querySelector("#mainNav");
  const navlink = document.querySelectorAll(".linkPage");

  if (window.scrollY === 0) {
    navbarCollapsible.classList.remove("navbar-shrink");
    for (let i = 0; i < navlink.length; i++) {
      navlink[i].classList.remove("navPadding");
    }
  } else {
    navbarCollapsible.classList.add("navbar-shrink");
    for (let i = 0; i < navlink.length; i++) {
      navlink[i].classList.add("navPadding");
    }
  }

  const btnNav = document.querySelector(".navbar-toggler");
  const bar = document.querySelector(".bar");

  btnNav.addEventListener("click", () => {
    btnNav.classList.toggle("active");
    bar.classList.toggle("transition");
    btnNav.classList.toggle("hov");
  });
});
