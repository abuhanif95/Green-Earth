const categoriesContainer = document.getElementById("categories-container");

async function loadCategories() {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/categories",
  );

  const data = await response.json();
  //   console.log(data);
  //   console.log(categoriesContainer);
  data.categories.forEach((category) => {
    // console.log(category);
    const btn = document.createElement("button");
    btn.className = "btn w-full";
    btn.textContent = category.category_name;
    categoriesContainer.appendChild(btn);
  });
}

loadCategories();
