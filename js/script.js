  function toggleDropdownMenu(button) {
    const dropdown = button.parentElement;
    const allDropdowns = document.querySelectorAll('.vs-dropdown');

    allDropdowns.forEach(d => {
      if (d !== dropdown) d.classList.remove('open');
    });

    dropdown.classList.toggle('open');
  }

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".vs-dropdown")) {
      document.querySelectorAll(".vs-dropdown").forEach(d => d.classList.remove("open"));
    }
  });

  $.fn.select2.amd.require(['select2/dropdown/attachBody'], function (AttachBody) {
    const originalPositionDropdown = AttachBody.prototype._positionDropdown;

    AttachBody.prototype._positionDropdown = function () {
      const offset = this.$container.offset();
      const containerHeight = this.$container.outerHeight(false);

      const dropdownCss = {
        top: offset.top + containerHeight + "px",
        left: offset.left + "px",
        width: this.$container.outerWidth(false) + "px",
        position: 'absolute'
      };

      this.$dropdownContainer.css(dropdownCss);

      this._reposition = false;

      this.$dropdownContainer.find('.select2-dropdown').css({
        transform: 'none'
      });
    };
  });

  function activateDropdown(selector) {
    const $select = $(selector);

    $select.select2({
      minimumResultsForSearch: 0,
      dropdownParent: $select.closest('.vs-select-wrapper')
    });

    $select.on('select2:opening', function () {
      $select.closest('.vs-select-wrapper').addClass('select-open');
    });

    $select.on('select2:closing', function () {
      $select.closest('.vs-select-wrapper').removeClass('select-open');
    });

    $select.on('select2:select', function (e) {
      const container = $(this).next('.select2-container').find('.select2-selection--single');
      if (e.params.data.id !== '') {
        container.addClass('red-selected');
      } else {
        container.removeClass('red-selected');
      }
    });
$select.on('select2:open', function () {
  if (window.innerWidth <= 768) {
    const offsetTop = $(this).offset().top;
    $('html, body').animate({
      scrollTop: offsetTop - 100
    }, 0);
  }
});
    $select.closest('.vs-select-wrapper').on('click', function () {
      $select.select2('open');
    });
  }

  $(document).ready(function () {
    activateDropdown('#makeSelect');
    activateDropdown('#modelSelect');
    activateDropdown('#gearSelect');
    activateDropdown('#yearMin');
    activateDropdown('#yearMax');

    for (let year = 2000; year <= 2025; year++) {
      $('#yearMin').append(`<option value="${year}">${year}</option>`);
      $('#yearMax').append(`<option value="${year}">${year}</option>`);
    }
  });
const input = document.querySelector(".vs-search-input input");
const form = document.querySelector(".vs-search-input");

function updateSearchStyle() {
  if (input.value.trim() !== "") {
    form.classList.add("active");
    input.classList.add("has-text");
  } else {
    form.classList.remove("active");
    input.classList.remove("has-text");
  }
}

input.addEventListener("input", updateSearchStyle);
input.addEventListener("blur", updateSearchStyle);
input.addEventListener("focus", updateSearchStyle);


// serach by
const vehicleTypes = [
  { type: "Large Bus", count: 2, image: "assets/large-bus.svg", url: "large-bus.html" },
  { type: "Mini Bus", count: 2, image: "assets/mini-bus.svg", url: "mini-bus.html" },
  { type: "Heavy Truck", count: 2, image: "assets/heavy-truck.svg", url: "heavy-truck.html" },
  { type: "Light Truck", count: 2, image: "assets/light-truck.svg", url: "light-truck.html" },
  { type: "Van", count: 2, image: "assets/van.svg", url: "van.html" },
  { type: "Mini Van", count: 2, image: "assets/mini-van.svg", url: "mini-van.html" },
  { type: "Suv", count: 2, image: "assets/suv.svg", url: "suv.html" },
  { type: "Sedan", count: 2, image: "assets/sedan.svg", url: "sedan.html" },
  { type: "Wagon", count: 2, image: "assets/wagon.svg", url: "wagon.html" },
  { type: "Hatchback", count: 2, image: "assets/hatchback.svg", url: "hatchback.html" },
  { type: "Pick Up", count: 2, image: "assets/pick-up.svg", url: "pick-up.html" },
  { type: "Machinery", count: 2, image: "assets/machinery.svg", url: "machinery.html" },
  { type: "Large bus", count: 2, image: "assets/mini-bus.svg", url: "large-bus-alt.html" }
];

const vehicleMakes = [
  { type: "Tayota", count: 9, image: "assets/tayota.svg", url: "tayota.html" },
  { type: "Mitsubishi", count: 2, image: "assets/mitsubishi.svg", url: "mitsubishi.html" },
  { type: "Nissan", count: 2, image: "assets/nissan.svg", url: "nissan.html" },
  { type: "Isuzu", count: 2, image: "assets/isuzu.svg", url: "isuzu.html" },
  { type: "Hino", count: 2, image: "assets/hino.svg", url: "hino.html" },
  { type: "Suzuki", count: 2, image: "assets/suzuki.svg", url: "suzuki.html" },
  { type: "Mercedes - Benz", count: 2, image: "assets/benz.svg", url: "mercedes-benz.html" },
  { type: "Volvo", count: 2, image: "assets/volvo.svg", url: "volvo.html" },
  { type: "BMW", count: 2, image: "assets/bmw.svg", url: "bmw.html" },
  { type: "Ford", count: 2, image: "assets/ford.svg", url: "ford.html" },
  { type: "Honda", count: 2, image: "assets/honda.svg", url: "honda.html" },
  { type: "Mazda", count: 2, image: "assets/mazda.svg", url: "mazda.html" },
  { type: "Tayota", count: 2, image: "assets/tayota.svg", url: "tayota-alt.html" }
];

let activeData = vehicleTypes;
let currentPage = 0;
let itemsPerPage = 9;

const gridContainer = document.getElementById('gridContainer');
const searchByTypeBtn = document.getElementById('searchByTypeBtn');
const searchByMakeBtn = document.getElementById('searchByMakeBtn');
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');
const paginationDots = document.getElementById('paginationDots');

function renderGridItems(dataSet) {
  gridContainer.innerHTML = '';
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToRender = dataSet.slice(startIndex, endIndex);

  itemsToRender.forEach(item => {
    const link = document.createElement('a');
    link.className = 'grid-item';
    link.href = item.url;

    // Determine the class for the image based on which data set is used.
    let imageClass = '';
    if (dataSet === vehicleTypes) {
      imageClass = 'vehicle-type-image';
    } else if (dataSet === vehicleMakes) {
      imageClass = 'vehicle-make-image';
    }

    link.innerHTML = `
      <div class="grid-item-title">
        ${item.type} (${item.count})
        <span class="arrow-icon"><i class="fa-regular fa-arrow-right"></i></span>
      </div>
      <img src="${item.image}" alt="${item.type}" class="${imageClass}" />
    `;
    gridContainer.appendChild(link);
  });

  updateArrowVisibility(dataSet);
  renderPaginationDots(dataSet);
}


function updateArrowVisibility(dataSet) {
  const totalPages = Math.ceil(dataSet.length / itemsPerPage);
  leftArrow.classList.toggle('hidden', currentPage === 0);
  rightArrow.classList.toggle('hidden', currentPage >= totalPages - 1);
}

function renderPaginationDots(dataSet) {
  paginationDots.innerHTML = '';
  const totalPages = Math.ceil(dataSet.length / itemsPerPage);
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement('div');
    dot.className = `dot ${i === currentPage ? 'active' : ''}`;
    dot.addEventListener('click', () => {
      currentPage = i;
      renderGridItems(dataSet);
    });
    paginationDots.appendChild(dot);
  }
}

searchByTypeBtn.addEventListener('click', () => {
  activeData = vehicleTypes;
  searchByTypeBtn.classList.add('active');
  searchByMakeBtn.classList.remove('active');
  currentPage = 0;
  renderGridItems(activeData);
});

searchByMakeBtn.addEventListener('click', () => {
  activeData = vehicleMakes;
  searchByMakeBtn.classList.add('active');
  searchByTypeBtn.classList.remove('active');
  currentPage = 0;
  renderGridItems(activeData);
});

rightArrow.addEventListener('click', () => {
  const totalPages = Math.ceil(activeData.length / itemsPerPage);
  if (currentPage < totalPages - 1) {
    currentPage++;
    renderGridItems(activeData);
  }
});

leftArrow.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    renderGridItems(activeData);
  }
});

function calculateItemsPerPage() {
  itemsPerPage = window.innerWidth <= 1024 ? 12 : 12;
}

window.addEventListener('resize', () => {
  calculateItemsPerPage();
  currentPage = 0;
  renderGridItems(activeData);
});

window.onload = () => {
  calculateItemsPerPage();
  renderGridItems(activeData);
};


document.addEventListener('DOMContentLoaded', () => {
            const slidesWrapper = document.getElementById('slidesWrapper');
            const prevButton = document.getElementById('prevButton');
            const nextButton = document.getElementById('nextButton');
            const dotNavigation = document.getElementById('dotNavigation');
            const slides = document.querySelectorAll('.slide');
            let currentIndex = 0;

            const updateSlider = () => {
                const offset = -currentIndex * 100;
                slidesWrapper.style.transform = `translateX(${offset}%)`;
                updateDots();
            };

            const createDots = () => {
                dotNavigation.innerHTML = ''; // Clear existing dots
                slides.forEach((_, index) => {
                    const dot = document.createElement('div');
                    dot.classList.add('dot-hero');
                    if (index === currentIndex) {
                        dot.classList.add('active');
                    }
                    dot.addEventListener('click', () => {
                        currentIndex = index;
                        updateSlider();
                    });
                    dotNavigation.appendChild(dot);
                });
            };

            const updateDots = () => {
                const dots = document.querySelectorAll('.dot-hero');
                dots.forEach((dot, index) => {
                    if (index === currentIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            };

            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
                updateSlider();
            });

            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
                updateSlider();
            });

            createDots();
            updateSlider();
        });