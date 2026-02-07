

let cart = JSON.parse(localStorage.getItem("cart"));

if (!Array.isArray(cart)) {
    cart = [];
}

const products = [
    {
        id: 1,
        name: "Wireless Mouse",
        price: 799,
        category: "Electronics"
    },
    {
        id: 2,
        name: "Keyboard",
        price: 1299,
        category: "Electronics"
    },
    {
        id: 3,
        name: "Water Bottle",
        price: 499,
        category: "Home"
    },
    {
        id: 4,
        name: "Notebook",
        price: 199,
        category: "Stationary"
    }
];


const productContainer = document.getElementById("product-container");

// if (productContainer) {
//     products.forEach(
//         (product) => {

function renderProducts(productList) {
    if (!productContainer) return;

    productContainer.innerHTML = "";

    productList.forEach((product) => {
        const productCard = document.createElement("div");

        productCard.innerHTML = `
             <h3>${product.name}</h3>
            <p>price: $${product.price}</p>
            <button data-id="${product.id}">Add to Cart</button>

        `

        const button = productCard.querySelector("button");

        button.addEventListener(
            "click", (event) => {
                const productId = parseInt(event.target.getAttribute("data-id"));
                addToCart(productId);
            }
        );

        productContainer.appendChild(productCard);
    }
    );
}

renderProducts(products);



function addToCart(productId) {
    const selectedProduct = products.find(function (product) {
        return product.id === productId;
    });

    if (!selectedProduct) {
        console.error("Product not found:", productId);
        return;
    }

    const existingItem = cart.find(item => item.id === productId);

    if(existingItem){
        existingItem.quantity += 1;
    }else {
        cart.push({
            ...selectedProduct,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    // alert("Product added to cart");
}


// cart rendering logic

const renderCart = () => {
    const cartContainer = document.getElementById("cart-container");
    const totalPriceElement = document.getElementById("total-price");

    // ⛔ If not on cart page, STOP
    if (!cartContainer || !totalPriceElement) return;

    // make sure cart is not empty

    let cart = JSON.parse(localStorage.getItem("cart"));

    if (!Array.isArray(cart)) {
        cart = [];
    }

    // clear the container first
    cartContainer.innerHTML = "";

    let totalPrice = 0;


    cart.forEach((item, index) => {
        const itemElement = document.createElement("div");

        itemElement.innerHTML = `
          <h4>${item.name}</h4>
          <p>Qty: ${item.quantity}</p>
          <p>price: $${item.price}</p>
          <button data-index="${index}">Remove</button>
        `;

        cartContainer.appendChild(itemElement);

        totalPrice += item.price * item.quantity;
    });

    // update total price display

    totalPriceElement.textContent = `Total: $${totalPrice}`;
}

document.addEventListener("DOMContentLoaded", function () {
    renderCart();
});


const removeItemFromCart = (index) => {

    let cart = JSON.parse(localStorage.getItem("cart"));

    if (!Array.isArray(cart)) {
        cart = [];
    }

 
    if(cart[index].quantity > 1){
        cart[index].quantity -= 1;
    }else{
        cart.splice(index, 1);
    }


    // save updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Re-render the cart
    renderCart();

}

const cartContainer = document.getElementById("cart-container");

if (cartContainer) {
    cartContainer.addEventListener(
        "click", (event) => {
            if (event.target.tagName === "BUTTON") {
                const index = parseInt(event.target.getAttribute("data-index"));
                removeItemFromCart(index);
            }
        });
}


const searchInput = document.getElementById("search-input");



if(searchInput){
    searchInput.addEventListener(
        "input", ()=>{
             console.log("Typing:", searchInput.value);
      const searchText = searchInput.value.toLowerCase();

      const filteredProducts = products.filter((product)=>{
        return product.name.toLowerCase().includes(searchText)
      });

      renderProducts(filteredProducts);
    });
}


const updateCartCount = () => {
  const cartCount = document.getElementById("cart-count");
  if (!cartCount) return;

  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalItems = storedCart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  cartCount.textContent = totalItems;
};

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});


