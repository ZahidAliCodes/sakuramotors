 function toggleMenu() {
    document.getElementById("mobileMenu").classList.toggle("open");
  }

  function toggleDropdown(e) {
    e.preventDefault();
    const parent = e.currentTarget.parentElement;
    parent.classList.toggle("open");
  }

  window.addEventListener("resize", function () {
    const mobileMenu = document.getElementById("mobileMenu");
    if (window.innerWidth > 991) {
      mobileMenu.classList.remove("open");
    }
  });