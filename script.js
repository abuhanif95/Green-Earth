const categoriesContainer = document.getElementById("categories-container");
const treesContainer = document.getElementById("trees-container");
const loadingSpinner = document.getElementById("loading-spinner");
const allTreesBtn = document.getElementById("all-trees-btn");

function showLoading() {
  loadingSpinner.classList.remove("hidden");
  treesContainer.innerHTML = "";
}

function hideLoading() {
  loadingSpinner.classList.add("hidden");
}

async function loadCategories() {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/categories",
  );

  const data = await response.json();
  data.categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.className = "btn w-full";
    btn.textContent = category.category_name;
    btn.onclick = () => selectCategory(category.id, btn);
    categoriesContainer.appendChild(btn);
  });
}

async function selectCategory(categoryId, btn) {
  showLoading();
  const allButtons = document.querySelectorAll(
    "#categories-container button, #all-trees-btn",
  );
  allButtons.forEach((btn) => {
    btn.classList.remove("btn-success");
  });
  btn.classList.add("btn-success");

  const response = await fetch(
    `https://openapi.programming-hero.com/api/category/${categoryId}`,
  );
  const data = await response.json();
  displayTrees(data.plants);
  hideLoading();
}

allTreesBtn.addEventListener("click", () => {
  const allButtons = document.querySelectorAll(
    "#categories-container button, #all-trees-btn",
  );
  allButtons.forEach((btn) => {
    btn.classList.remove("btn-success");
  });
  allTreesBtn.classList.add("btn-success");
  loadTrees();
});

async function loadTrees() {
  showLoading();
  const response = await fetch(
    "https://openapi.programming-hero.com/api/plants",
  );
  const data = await response.json();
  hideLoading();
  displayTrees(data.plants);
  hideLoading();
}

function displayTrees(trees) {
  trees.forEach((tree) => {
    const card = document.createElement("div");
    card.className = "card bg-base-100 shadow-sm";
    card.innerHTML = `
        <figure>
          <img
            src="${tree.image}"
            alt="${tree.name}"
            title = "${tree.name}"
            class = "h-48 w-full object-cover"
          />
        </figure>
        <div class="card-body">
           <h2 class="card-title">${tree.name}</h2>
           <p class="line-clamp-2">${tree.description}</p>
           <div class="badge badge-success">${tree.category}</div>
           <div class="card-actions flex justify-between items-center">
             <h2 class="font-bold text-2xl text-red-600">$${tree.price}</h2>
             <button class="btn btn-success border-0">Cart</button>
           </div>
        </div>
    `;
    treesContainer.appendChild(card);
  });
}

loadCategories();
loadTrees();
