// 👉 Custom format for Salaam dropdown
function formatOption(data) {
    if (!data.id) return data.text;

    const price = $(data.element).data("price") || "";
    const subtitle = $(data.element).data("subtitle") || "";
    const selectedValue = $("#salaamSelect").val();
    const isActive = data.id == selectedValue ? "active" : "";

    const html = `
  <div class="custom-option-card ${isActive}">
    <label class="checkbox">
      <input type="checkbox" disabled ${isActive ? "checked" : ""} />
      <span class="custom-checkmark"></span>
    </label>
    <div class="middle">
      <div class="title">${data.text}</div>
      <div class="subtitle">${subtitle}</div>
    </div>
    <div class="price">${price}</div>
  </div>
`;

    return html;
}

function formatSelection(data) {
    return data.text;
}

function activateDropdown(selector, useCustom) {
    const $select = $(selector);

    if (useCustom) {
        $select.select2({
            minimumResultsForSearch: 0,
            dropdownParent: $select.closest(".vs-select-wrapper"),
            templateResult: formatOption,
            templateSelection: formatSelection,
            escapeMarkup: function (m) {
                return m;
            },
        });
    } else {
        $select.select2({
            minimumResultsForSearch: 0,
            dropdownParent: $select.closest(".vs-select-wrapper"),
        });
    }

    $select.on("select2:open", function () {
        let $dropdown = $(".select2-container--open .select2-dropdown");
        setTimeout(function () {
            $dropdown.css({
                top: "100%",
                bottom: "auto",
                transform: "none",
                position: "absolute",
                left: "0",
            });
        }, 0);
        $select.closest(".vs-select-wrapper").addClass("select-open");
    });

    $select.on("select2:closing", function () {
        $select.closest(".vs-select-wrapper").removeClass("select-open");
    });

    if (useCustom) {
        $select.on("select2:select", function (e) {
            $(this).trigger("change.select2");

            const container = $(this).next(".select2-container").find(".select2-selection--single");
            if (e.params.data.id !== "") {
                container.addClass("red-selected");
            } else {
                container.removeClass("red-selected");
            }
        });
    } else {
        $select.on("select2:select", function (e) {
            const container = $(this).next(".select2-container").find(".select2-selection--single");
            if (e.params.data.id !== "") {
                container.addClass("red-selected");
            } else {
                container.removeClass("red-selected");
            }
        });
    }
}

$(document).ready(function () {
    activateDropdown("#salaamSelect", false);

    activateDropdown("#makeSelect", false);
    activateDropdown("#modelSelect", false);
    activateDropdown("#gearSelect", false);
    activateDropdown("#yearMin", false);
    activateDropdown("#yearMax", false);

    activateDropdown("#filterMake", false);
    activateDropdown("#filterModel", false);
    activateDropdown("#filterGear", false);
    activateDropdown("#filterYearMin", false);
    activateDropdown("#filterYearMax", false);
    activateDropdown("#filterPriceFrom", false);
    activateDropdown("#filterPriceTo", false);
    activateDropdown("#sortSelect", false);

    for (let year = 2000; year <= 2025; year++) {
        $("#yearMin").append(`<option value="${year}">${year}</option>`);
        $("#yearMax").append(`<option value="${year}">${year}</option>`);
    }

    $(".vs-select-wrapper").on("click", function (e) {
        if ($(e.target).closest(".select2-container").length) return;
        const $select = $(this).find("select");
        $select.select2("open");
    });
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

document.addEventListener("DOMContentLoaded", () => {
    const radioButtons = document.querySelectorAll('.button-group input[type="radio"]');

    radioButtons.forEach((radio) => {
        radio.addEventListener("change", (event) => {
            const groupName = event.target.name;
            const selectedValue = event.target.value;
            console.log(`${groupName} selection changed to: ${selectedValue}`);
        });
    });
});

const toggleBtn = document.getElementById("toggleBtn");
const moreOptions = document.getElementById("moreOptions");

toggleBtn.addEventListener("click", () => {
    const currentDisplay = window.getComputedStyle(moreOptions).display;

    if (currentDisplay === "none") {
        moreOptions.style.display = "block";
        toggleBtn.textContent = "View less";
    } else {
        moreOptions.style.display = "none";
        toggleBtn.textContent = "View more search options";
    }
});

window.addEventListener("resize", () => {
    const width = window.innerWidth;

    if (width >= 1025) {
        // Desktop: show by default, clear inline style
        moreOptions.style.display = "";
        toggleBtn.textContent = "View less"; // Desktop default is visible
    } else {
        // Mobile/tablet: hide by default
        moreOptions.style.display = "none";
        toggleBtn.textContent = "View more search options";
    }
});

const searchByTypeBtn = document.getElementById("searchByTypeBtn");
const searchByMakeBtn = document.getElementById("searchByMakeBtn");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const paginationDots = document.getElementById("paginationDots");

const vehicleTypesBlock = document.querySelector(".vehicle-types");
const vehicleMakesBlock = document.querySelector(".vehicle-makes");

let activeBlock = vehicleTypesBlock;
let currentPage = 0;
let itemsPerPage = 9;

function getItems(block) {
    return Array.from(block.querySelectorAll(".grid-item"));
}

function updatePagination() {
    // Make sure only one block is visible at a time
    vehicleTypesBlock.classList.add("hidden");
    vehicleMakesBlock.classList.add("hidden");
    activeBlock.classList.remove("hidden");

    // Hide all items in the active block
    const items = getItems(activeBlock);
    items.forEach((item) => item.classList.add("hidden"));

    // Show only items for the current page
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    items.slice(start, end).forEach((item) => item.classList.remove("hidden"));

    // Arrow visibility
    const totalPages = Math.ceil(items.length / itemsPerPage);
    leftArrow.classList.toggle("hidden", currentPage === 0);
    rightArrow.classList.toggle("hidden", currentPage >= totalPages - 1);

    // Pagination dots
    paginationDots.innerHTML = "";
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement("div");
        dot.className = `dot ${i === currentPage ? "active" : ""}`;
        dot.addEventListener("click", () => {
            currentPage = i;
            updatePagination();
        });
        paginationDots.appendChild(dot);
    }
}

searchByTypeBtn.addEventListener("click", () => {
    searchByTypeBtn.classList.add("active");
    searchByMakeBtn.classList.remove("active");

    activeBlock = vehicleTypesBlock;
    currentPage = 0;
    updatePagination();
});

searchByMakeBtn.addEventListener("click", () => {
    searchByMakeBtn.classList.add("active");
    searchByTypeBtn.classList.remove("active");

    activeBlock = vehicleMakesBlock;
    currentPage = 0;
    updatePagination();
});

rightArrow.addEventListener("click", () => {
    const items = getItems(activeBlock);
    const totalPages = Math.ceil(items.length / itemsPerPage);
    if (currentPage < totalPages - 1) {
        currentPage++;
        updatePagination();
    }
});

leftArrow.addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        updatePagination();
    }
});

function calculateItemsPerPage() {
    itemsPerPage = window.innerWidth <= 1024 ? 12 : 12;
}

window.addEventListener("resize", () => {
    calculateItemsPerPage();
    currentPage = 0;
    updatePagination();
});

window.onload = () => {
    calculateItemsPerPage();
    updatePagination();
};
