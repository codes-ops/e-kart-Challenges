let products = [];


// Get all products

storeData.categories.forEach(category => {
    category.subcategories.forEach(subcategory => {
        subcategory.products.forEach(product => {
            products.push(product);
        });

    });

});


// Sort by price
products.sort((a, b) => a.price - b.price);


// Binary search

function lowerBound(target) {

    let left = 0;
    let right = products.length;

    while (left < right) {

        let middle = Math.floor((left + right) / 2);

        if (products[middle].price < target) {
            left = middle + 1;
        } else {
            right = middle;
        }
    }

    return left;
}


// Find closest products

function findClosestProducts(target, count = 5) {

    let position = lowerBound(target);

    let left = position - 1;
    let right = position;

    let result = [];

    while (
        result.length < count &&
        (left >= 0 || right < products.length)
    ) {

        if (left < 0) {

            result.push(products[right]);
            right++;

        } else if (right >= products.length) {

            result.push(products[left]);
            left--;

        } else {

            let leftDifference =
                Math.abs(products[left].price - target);

            let rightDifference =
                Math.abs(products[right].price - target);

            if (leftDifference <= rightDifference) {

                result.push(products[left]);
                left--;

            } else {

                result.push(products[right]);
                right++;
            }
        }
    }

    return result;
}


// Format price

function formatPrice(price) {

    return "₹" + price.toLocaleString("en-IN");

}


// Display products

function displayProducts(productList) {

    const container =
        document.getElementById("productsContainer");

    const count =
        document.getElementById("resultCount");

    container.innerHTML = "";

    if (productList.length === 0) {

        container.innerHTML = `
            <p class="message">
                No products found.
            </p>
        `;

        count.textContent = "";

        return;
    }

    count.textContent =
        productList.length + " products";

    productList.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-name">
                ${product.name}
            </div>

            <div class="product-brand">
                Brand: ${product.brand}
            </div>

            <div class="product-price">
                ${formatPrice(product.price)}
            </div>

            <div class="product-rating">
                ⭐ ${product.rating}
            </div>

            <button
                class="view-button"
                onclick="viewProduct('${product.id}')"
            >
                View Product
            </button>

        `;

        container.appendChild(card);

    });
}


// Search by price

function searchByPrice() {

    const input =
        document.getElementById("targetPrice");

    const target =
        Number(input.value);

    if (!target || target < 0) {

        alert("Please enter a valid price.");

        return;
    }

    const results =
        findClosestProducts(target, 5);

    document.getElementById("resultTitle").textContent =
        "Closest Products";

    displayProducts(results);
}


// Find products in range

function findProductsInRange(minPrice, maxPrice) {

    const start =
        lowerBound(minPrice);

    const end =
        lowerBound(maxPrice + 1);

    return products.slice(start, end);
}


// Range search

function searchByRange() {

    const minPrice =
        Number(document.getElementById("minPrice").value);

    const maxPrice =
        Number(document.getElementById("maxPrice").value);

    if (!minPrice || !maxPrice) {

        alert("Please enter valid prices.");

        return;
    }

    if (minPrice > maxPrice) {

        alert(
            "Minimum price cannot be greater than maximum price."
        );

        return;
    }

    const results =
        findProductsInRange(minPrice, maxPrice);

    document.getElementById("resultTitle").textContent =
        "Products in Price Range";

    displayProducts(results);
}


// View product

function viewProduct(id) {

    const product =
        products.find(product => product.id === id);

    if (!product) {
        return;
    }

    alert(
        product.name +
        "\n\nBrand: " + product.brand +
        "\nPrice: " + formatPrice(product.price) +
        "\nRating: ⭐ " + product.rating
    );
}


// Buttons

document
    .getElementById("searchButton")
    .addEventListener("click", searchByPrice);

document
    .getElementById("rangeButton")
    .addEventListener("click", searchByRange);


// Enter key

document
    .getElementById("targetPrice")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            searchByPrice();
        }

    });

document
    .getElementById("minPrice")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            searchByRange();
        }

    });

document
    .getElementById("maxPrice")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            searchByRange();
        }

    });


    


    