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

function filterModels(input) {
  const searchTerm = input.value.toLowerCase();
  const dropdown = input.closest(".vs-dropdown");
  const items = dropdown.querySelectorAll(".vs-dropdown-list li");
  const noResult = dropdown.querySelector(".vs-no-results");

  let matchCount = 0;
  items.forEach(li => {
    const text = li.textContent.toLowerCase();
    li.style.display = text.includes(searchTerm) ? "block" : "none";
    if (text.includes(searchTerm)) matchCount++;
  });

  noResult.style.display = matchCount === 0 ? "block" : "none";
}

function filterDropdown(input) {
  const searchTerm = input.value.toLowerCase();
  const dropdown = input.closest(".vs-dropdown");
  const items = dropdown.querySelectorAll(".vs-dropdown-list li");
  const noResult = dropdown.querySelector(".vs-no-results");

  let matchCount = 0;
  items.forEach(li => {
    const text = li.textContent.toLowerCase();
    li.style.display = text.includes(searchTerm) ? "block" : "none";
    if (text.includes(searchTerm)) matchCount++;
  });

  noResult.style.display = matchCount === 0 ? "block" : "none";
}

function populateYearDropdowns() {
  const yearDropdowns = document.querySelectorAll(".vs-year-dropdown .vs-dropdown-list");
  for (let year = 2000; year <= 2025; year++) {
    yearDropdowns.forEach(list => {
      const li = document.createElement("li");
      li.textContent = year;
      list.appendChild(li);
    });
  }

  setTimeout(addDropdownItemListeners, 100);
}

function addDropdownItemListeners() {
  const allItems = document.querySelectorAll(".vs-dropdown-menu li");
  allItems.forEach(item => {
    item.addEventListener("click", function () {
      const dropdown = item.closest(".vs-dropdown");
      const span = dropdown.querySelector("button span");

      // Set selected text
      span.textContent = item.textContent;

      // Make the selected text red
      span.style.color = "#343434";

      dropdown.classList.remove("open");
    });
  });
}

populateYearDropdowns();
addDropdownItemListeners();

// Search Input red border on focus and typing
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
  { type: "Hatchback", count: 2, image: "assets/Hatchback.svg", url: "hatchback.html" },
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
    link.innerHTML = `
      <div class="grid-item-title">
        ${item.type} (${item.count})
        <span class="arrow-icon"><i class="fa-regular fa-arrow-right"></i></span>
      </div>
      <img src="${item.image}" alt="${item.type}" />
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
