// 👉 Custom format for Salaam dropdown
function formatOption(data) {
    if (!data.id) return data.text;

    const price = $(data.element).data("price") || "";
    const subtitle = $(data.element).data("subtitle") || "";
    const selectedValue = $("#salaamSelect").val();
    const isActive = data.id == selectedValue ? "active" : "";

    const html = `
    <div class="custom-option-card ${isActive}">
      <div class="checkbox"></div>
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
    activateDropdown("#salaamSelect", true);

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

const cars = [
    {
        id: "car-1",
        image: "assets/card-img.jpg",
        title: "Nissan Civilian",
        priceFOB: "$7,879",
        description: "Inspection & Insurance Final Country",
        details: {
            stockNo: "9067",
            gear: "Manual",
            engineCC: "1800",
            year: "2005/1",
            engineModel: "7K",
            seating: "8",
            model: "GK-KM70",
            bodyType: "Light Truck",
        },
        features: ["ABS", "Auto Door", "CD player", "MP3", "+2 more"],
        finalPrice: "-",
        isGreenPrice: false,
        hasExtraDescription: false, // ✅
    },
    {
        id: "car-2",
        image: "assets/card-img.jpg",
        title: "Nissan Civilian",
        originalPrice: "$8,489",
        priceFOB: "$7,879",
        description: "(C&F)",
        details: {
            stockNo: "9067",
            gear: "Manual",
            engineCC: "1800",
            year: "2005/1",
            engineModel: "7K",
            seating: "8",
            model: "GK-KM70",
            bodyType: "Light Truck",
        },
        features: ["ABS", "Auto Door", "CD player", "MP3", "+2 more"],
        finalPrice: "$7,879",
        isGreenPrice: true,
        hasExtraDescription: true, // ✅
    },
    {
        id: "car-3",
        image: "assets/card-img.jpg",
        title: "Nissan Civilian",
        priceFOB: "$7,879",
        description: "(C&F)",
        details: {
            stockNo: "9067",
            gear: "Manual",
            engineCC: "1800",
            year: "2005/1",
            engineModel: "7K",
            seating: "8",
            model: "GK-KM70",
            bodyType: "Light Truck",
        },
        features: ["ABS", "Auto Door", "CD player", "MP3", "+2 more"],
        finalPrice: "-",
        isGreenPrice: false,
        hasExtraDescription: true, // ✅
    },
    {
        id: "car-4",
        image: "assets/card-img.jpg",
        title: "Nissan Civilian",
        priceFOB: "$7,879",
        description: "(C&F)",
        details: {
            stockNo: "9067",
            gear: "Manual",
            engineCC: "1800",
            year: "2005/1",
            engineModel: "7K",
            seating: "8",
            model: "GK-KM70",
            bodyType: "Light Truck",
        },
        features: ["ABS", "Auto Door", "CD player", "MP3", "+2 more"],
        finalPrice: "$7,879",
        isGreenPrice: false,
        isReserved: true,
        hasExtraDescription: true, // ✅
    },
    {
        id: "car-5",
        image: "assets/card-img.jpg",
        title: "Nissan Civilian",
        priceFOB: "$7,879",
        description: "Inspection & Insurance Final Country",
        details: {
            stockNo: "9067",
            gear: "Manual",
            engineCC: "1800",
            year: "2005/1",
            engineModel: "7K",
            seating: "8",
            model: "GK-KM70",
            bodyType: "Light Truck",
        },
        features: ["ABS", "Auto Door", "CD player", "MP3", "+2 more"],
        finalPrice: "-",
        isGreenPrice: false,
        hasExtraDescription: false, // ✅
    },
    {
        id: "car-6",
        image: "assets/card-img.jpg",
        title: "Nissan Civilian",
        priceFOB: "$7,879",
        description: "Inspection & Insurance Final Country",
        details: {
            stockNo: "9067",
            gear: "Manual",
            engineCC: "1800",
            year: "2005/1",
            engineModel: "7K",
            seating: "8",
            model: "GK-KM70",
            bodyType: "Light Truck",
        },
        features: ["ABS", "Auto Door", "CD player", "MP3", "+2 more"],
        finalPrice: "-",
        isGreenPrice: false,
        hasExtraDescription: false, // ✅
    },
    {
        id: "car-7",
        image: "assets/card-img.jpg",
        title: "Nissan Civilian",
        priceFOB: "$7,879",
        description: "Inspection & Insurance Final Country",
        details: {
            stockNo: "9067",
            gear: "Manual",
            engineCC: "1800",
            year: "2005/1",
            engineModel: "7K",
            seating: "8",
            model: "GK-KM70",
            bodyType: "Light Truck",
        },
        features: ["ABS", "Auto Door", "CD player", "MP3", "+2 more"],
        finalPrice: "-",
        isGreenPrice: false,
        hasExtraDescription: false, // ✅
    },
    {
        id: "car-8",
        image: "assets/card-img.jpg",
        title: "Nissan Civilian",
        priceFOB: "$7,879",
        description: "Inspection & Insurance Final Country",
        details: {
            stockNo: "9067",
            gear: "Manual",
            engineCC: "1800",
            year: "2005/1",
            engineModel: "7K",
            seating: "8",
            model: "GK-KM70",
            bodyType: "Light Truck",
        },
        features: ["ABS", "Auto Door", "CD player", "MP3", "+2 more"],
        finalPrice: "-",
        isGreenPrice: false,
        hasExtraDescription: false, // ✅
    },
    {
        id: "car-9",
        image: "assets/card-img.jpg",
        title: "Nissan Civilian",
        priceFOB: "$7,879",
        description: "Inspection & Insurance Final Country",
        details: {
            stockNo: "9067",
            gear: "Manual",
            engineCC: "1800",
            year: "2005/1",
            engineModel: "7K",
            seating: "8",
            model: "GK-KM70",
            bodyType: "Light Truck",
        },
        features: ["ABS", "Auto Door", "CD player", "MP3", "+2 more"],
        finalPrice: "-",
        isGreenPrice: false,
        hasExtraDescription: false, // ✅
    },
    {
        id: "car-10",
        image: "assets/card-img.jpg",
        title: "Nissan Civilian",
        priceFOB: "$7,879",
        description: "Inspection & Insurance Final Country",
        details: {
            stockNo: "9067",
            gear: "Manual",
            engineCC: "1800",
            year: "2005/1",
            engineModel: "7K",
            seating: "8",
            model: "GK-KM70",
            bodyType: "Light Truck",
        },
        features: ["ABS", "Auto Door", "CD player", "MP3", "+2 more"],
        finalPrice: "-",
        isGreenPrice: false,
        hasExtraDescription: false, // ✅
    },
    {
        id: "car-11",
        image: "assets/card-img.jpg",
        title: "Nissan Civilian",
        priceFOB: "$7,879",
        description: "Inspection & Insurance Final Country",
        details: {
            stockNo: "9067",
            gear: "Manual",
            engineCC: "1800",
            year: "2005/1",
            engineModel: "7K",
            seating: "8",
            model: "GK-KM70",
            bodyType: "Light Truck",
        },
        features: ["ABS", "Auto Door", "CD player", "MP3", "+2 more"],
        finalPrice: "-",
        isGreenPrice: false,
        hasExtraDescription: false, // ✅
    },
    {
        id: "car-12",
        image: "assets/card-img.jpg",
        title: "Nissan Civilian",
        priceFOB: "$7,879",
        description: "Inspection & Insurance Final Country",
        details: {
            stockNo: "9067",
            gear: "Manual",
            engineCC: "1800",
            year: "2005/1",
            engineModel: "7K",
            seating: "8",
            model: "GK-KM70",
            bodyType: "Light Truck",
        },
        features: ["ABS", "Auto Door", "CD player", "MP3", "+2 more"],
        finalPrice: "-",
        isGreenPrice: false,
        hasExtraDescription: false, // ✅
    },
    {
        id: "car-13",
        image: "assets/card-img.jpg",
        title: "Nissan Civilian",
        priceFOB: "$7,879",
        description: "Inspection & Insurance Final Country",
        details: {
            stockNo: "9067",
            gear: "Manual",
            engineCC: "1800",
            year: "2005/1",
            engineModel: "7K",
            seating: "8",
            model: "GK-KM70",
            bodyType: "Light Truck",
        },
        features: ["ABS", "Auto Door", "CD player", "MP3", "+2 more"],
        finalPrice: "-",
        isGreenPrice: false,
        hasExtraDescription: false, // ✅
    },
];

const listingsContainer = document.getElementById("car-listings-container");

const carListingsHTML = cars
    .map(
        (car) => `
      <div class="car-card card-shadow">
        <!-- Image Section -->
        <div class="image-section">
          <img src="${car.image}" alt="${car.title}">
          <!-- Top Right Buttons -->
          <div class="top-right-buttons">
            <button class="image-action-btn">
             MP3 interface
            </button>
            <button class="image-action-btn">
              ABS
            </button>
          </div>
          <!-- Top Left Reserved Button -->
          ${
              car.isReserved
                  ? `
            <button class="top-left-reserved-btn">
              Reserved
            </button>
          `
                  : ""
          }
          <!-- Conditional Image Overlay -->
          ${
              car.isReserved
                  ? `
            <div class="reserved-image-overlay"></div>
          `
                  : ""
          }
        </div>
        
        <!-- Details Section -->
        <div class="details-section">
          <div class="border-center"></div>
          <div>
            <h2>${car.title}</h2>
            <div class="details-grid">
              <p><span class="font-semibold">Stock no:</span> <b>${car.details.stockNo}</b></p>
              <p><span class="font-semibold">Engine model:</span> <b>${car.details.engineModel}</b></p>
              <p><span class="font-semibold">Gear:</span> <b>${car.details.gear}</b></p>
              <p><span class="font-semibold">Seating:</span> <b>${car.details.seating}</b></p>
              <p><span class="font-semibold">Engine CC:</span> <b>${car.details.engineCC}</b></p>
              <p><span class="font-semibold">Model:</span> <b>${car.details.model}</b></p>
              <p><span class="font-semibold">Year:</span> <b>${car.details.year}</b></p>
              <p><span class="font-semibold">Body Type:</span> <b>${car.details.bodyType}</b></p>
            </div>
            <div class="features-container">
              ${car.features
                  .map(
                      (feature) => `
                    <span class="feature-badge">
                      ${feature}
                    </span>
                  `
                  )
                  .join("")}
            </div>
          </div>

          <!-- Price and Inquire Section -->
          <div class="price-inquire-section">
            <div class="price-inquire-iner">
              ${car.originalPrice ? `<p class="original-price">was ${car.originalPrice}</p>` : ""}
              <p class="main-price ${car.isGreenPrice ? "price-green" : "price-red"}">
                ${car.isGreenPrice ? '<i class="fa-solid fa-circle-arrow-down-right"></i>' : ""}${car.priceFOB} <span class="price-fob-text">Price (FOB)</span>
              </p>
              
              <!-- Main description: red if isGreenPrice OR hasExtraDescription -->
              <p class="description-text ${car.isGreenPrice || car.hasExtraDescription ? "description-red" : ""}">${car.description}</p>

              <!-- Extra new description if hasExtraDescription is true -->
              ${car.hasExtraDescription ? `<p class="description-text description-red">Dar Es Salaam</p>` : ""}
            </div>
            <p class="final-price-text">Final Price <span class="price-red">${car.finalPrice}</span></p>

            <div class="inquire-button-container">
              <a href="details.html" class="inquire-button">
                Inquire
              </a>
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join("");

listingsContainer.innerHTML = carListingsHTML;

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
    { type: "Large bus", count: 2, image: "assets/mini-bus.svg", url: "large-bus-alt.html" },
];

const makers = [
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
    { type: "Tayota", count: 2, image: "assets/tayota.svg", url: "tayota-alt.html" },
];

function renderList(data, containerId) {
    const container = document.getElementById(containerId);

    data.forEach((item) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = item.url;
        a.innerHTML = `<img src="${item.image}" alt="${item.type} icon"> ${item.type} (${item.count})`;
        li.appendChild(a);
        container.appendChild(li);
    });
}

renderList(vehicleTypes, "vehicle-list");
renderList(makers, "maker-list");

const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

const words = document.querySelectorAll(".word");

words.forEach((word, i) => {
    const isLast = word.classList.contains("last");

    tl.to(
        word,
        {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
        },
        i * 3
    );

    if (isLast) {
        tl.to(
            word,
            {
                backgroundColor: "var(--white)",
                color: "var(--primary-light)",
                fontStyle: "italic",
                duration: 0.1,
            },
            i * 3 + 0.8
        );
    }

    tl.to(word, {
        duration: 1.5,
    });

    tl.to(word, {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.in",
    });

    if (isLast) {
        tl.to(word, {
            backgroundColor: "transparent",
            color: "var(--white)",
            fontStyle: "normal",
            duration: 0.1,
        });
    }
});
