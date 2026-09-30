// =========================================================
// US PIZZA — CART + PIZZA CUSTOMIZER
// =========================================================

const CART_STORAGE_KEY = "usPizzaCart";

let cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];

function saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

let selectedProduct = null;
let customizerQuantity = 1;


// =========================================================
// ELEMENTS
// =========================================================

const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");


    const checkoutButton = document.querySelector(".checkout-btn");


// Customizer

const customizerOverlay =
    document.getElementById("customizerOverlay");

const customizerClose =
    document.getElementById("customizerClose");

const customizerImage =
    document.getElementById("customizerImage");

const customizerName =
    document.getElementById("customizerName");

const customizerDescription =
    document.getElementById("customizerDescription");

const customizerQuantityElement =
    document.getElementById("customizerQuantity");

const customizerMinus =
    document.getElementById("customizerMinus");

const customizerPlus =
    document.getElementById("customizerPlus");

const customizerTotal =
    document.getElementById("customizerTotal");

const customizerAdd =
    document.getElementById("customizerAdd");


// =========================================================
// OPEN CART
// =========================================================

function openCart() {

    cartDrawer.classList.add("open");

    overlay.classList.add("active");

    document.body.style.overflow = "hidden";
}


// =========================================================
// CLOSE CART
// =========================================================

function closeCartDrawer() {

    cartDrawer.classList.remove("open");

    overlay.classList.remove("active");

    document.body.style.overflow = "";
}


// =========================================================
// OPEN CUSTOMIZER
// =========================================================

function openCustomizer(button) {

    const productName =
        button.dataset.product;

    const price =
    Number(button.dataset.price);

const category =
    button.dataset.category || "Pizza";

selectedProduct = {
    name: productName,
    price: price,
    category: category,
    image: getProductImage(productName)
};

    customizerQuantity = 1;

    customizerName.textContent =
        productName;

    customizerDescription.textContent =
        "Make your pizza exactly the way you like it.";

    customizerImage.src =
        selectedProduct.image;

    customizerQuantityElement.textContent =
        customizerQuantity;

        const option1 =
    document.getElementById("customizerOption1");

const option2 =
    document.getElementById("customizerOption2");

const option3 =
    document.getElementById("customizerOption3");

    // Reset options

    document.querySelectorAll(
        'input[name="pizzaSize"]'
    ).forEach(input => {

        input.checked =
            input.value === "Regular";

    });


    document.querySelectorAll(
        'input[name="pizzaCrust"]'
    ).forEach(input => {

        input.checked =
            input.value === "Original";

    });


    document.querySelectorAll(
        '.topping-option input'
    ).forEach(input => {

        input.checked = false;

    });


    updateCustomizerPrice();

    customizerOverlay.classList.add("active");

    document.body.style.overflow = "hidden";
}


// =========================================================
// CLOSE CUSTOMIZER
// =========================================================

function closeCustomizer() {

    customizerOverlay.classList.remove("active");

    document.body.style.overflow = "";
}


// =========================================================
// GET PRODUCT IMAGE
// =========================================================

function getProductImage(productName) {

    const images = {

        "Chicken Supreme":
            "images/chicken-supreme.jpg",

        "Beef Pepperoni":
            "images/pepperoni.jpg",

        "Spicy Chicken":
            "images/spicy-chicken.jpg",

        "Cheese Lovers":
            "images/cheese-lovers.jpg"

    };

    return images[productName] ||
        "images/hero-pizza.jpg";
}


// =========================================================
// GET CUSTOMIZATION PRICE
// =========================================================

function getCustomizationPrice() {

    let extraPrice = 0;


    // Size

    const selectedSize =
        document.querySelector(
            'input[name="pizzaSize"]:checked'
        );

    if (selectedSize) {

        extraPrice +=
            Number(selectedSize.dataset.price);

    }


    // Crust

    const selectedCrust =
        document.querySelector(
            'input[name="pizzaCrust"]:checked'
        );

    if (selectedCrust) {

        extraPrice +=
            Number(selectedCrust.dataset.price);

    }


    // Toppings

    document.querySelectorAll(
        '.topping-option input:checked'
    ).forEach(input => {

        extraPrice +=
            Number(input.dataset.price);

    });


    return extraPrice;
}


// =========================================================
// UPDATE CUSTOMIZER PRICE
// =========================================================

function updateCustomizerPrice() {

    if (!selectedProduct) return;


    const customizationPrice =
        getCustomizationPrice();


    const singlePrice =
        selectedProduct.price +
        customizationPrice;


    const totalPrice =
        singlePrice *
        customizerQuantity;


    customizerTotal.textContent =
        `RM ${totalPrice.toFixed(2)}`;
}


// =========================================================
// CUSTOMIZER QUANTITY
// =========================================================

customizerPlus.addEventListener(
    "click",
    () => {

        customizerQuantity++;

        customizerQuantityElement.textContent =
            customizerQuantity;

        updateCustomizerPrice();

    }
);


customizerMinus.addEventListener(
    "click",
    () => {

        if (customizerQuantity > 1) {

            customizerQuantity--;

        }

        customizerQuantityElement.textContent =
            customizerQuantity;

        updateCustomizerPrice();

    }
);


// =========================================================
// WATCH OPTIONS
// =========================================================

document.querySelectorAll(
    'input[name="pizzaSize"], input[name="pizzaCrust"], .topping-option input'
).forEach(input => {

    input.addEventListener(
        "change",
        updateCustomizerPrice
    );

});


// =========================================================
// ADD CUSTOMIZED PIZZA
// =========================================================

function addCustomizedPizza() {

    if (!selectedProduct) return;


    const selectedSize =
        document.querySelector(
            'input[name="pizzaSize"]:checked'
        );


    const selectedCrust =
        document.querySelector(
            'input[name="pizzaCrust"]:checked'
        );


    const toppings = [];


    document.querySelectorAll(
        '.topping-option input:checked'
    ).forEach(input => {

        toppings.push(input.value);

    });


    const customizationPrice =
        getCustomizationPrice();


    const unitPrice =
        selectedProduct.price +
        customizationPrice;


    const cartItem = {

        id: Date.now(),

        name: selectedProduct.name,

        image: selectedProduct.image,

        size: selectedSize.value,

        crust: selectedCrust.value,

        toppings: toppings,

        price: unitPrice,

        quantity: customizerQuantity

    };


    cart.push(cartItem);


    updateCart();

    saveCart();

    closeCustomizer();

    openCart();
}


// =========================================================
// ADD TO CART BUTTONS
// =========================================================

const menuGrid =
    document.getElementById("productGrid");

if (menuGrid) {

    menuGrid.addEventListener("click", (event) => {

        const button =
            event.target.closest(".add-cart-btn");

        if (!button) return;

        const category =
            button.dataset.category || "Pizza";


        // =========================
        // PIZZA
        // =========================

        if (category === "Pizza") {

            openCustomizer(button);

            return;
        }


        // =========================
        // OTHER MENU ITEMS
        // =========================

        const cartItem = {

            id: Date.now(),

            name: button.dataset.product,

            image:
                button.dataset.image ||
                "images/hero-pizza.jpg",

            category: category,

            size: null,

            crust: null,

            toppings: [],

            price:
                Number(button.dataset.price),

            quantity: 1

        };


        cart.push(cartItem);

        updateCart();

        saveCart();

        openCart();

    });

}


// =========================================================
// RENDER CART
// =========================================================

function renderCart() {

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <span>🛒</span>

                <h3>Your cart is empty</h3>

                <p>Add something delicious!</p>

            </div>

        `;

        return;
    }


    cartItems.innerHTML =
        cart.map((item, index) => {

            const itemTotal =
                item.price *
                item.quantity;


            const isPizza =
    item.category === "Pizza" ||
    item.size ||
    item.crust;

const toppingText =
    item.toppings && item.toppings.length > 0
        ? item.toppings.join(", ")
        : "";


            return `

                <div class="cart-item">

                    <div class="cart-item-image">

                        <img
                            src="${item.image}"
                            alt="${item.name}"
                        >

                    </div>


                    <div class="cart-item-info">

                        <h4>
                            ${item.name}
                        </h4>

                        ${isPizza ? `
    <span>
        ${item.size} • ${item.crust}
    </span>

    ${toppingText ? `
        <small>
            ${toppingText}
        </small>
    ` : ""}
` : ""}


                        <div class="quantity-controls">

                            <button
                                onclick="changeQuantity(${index}, -1)"
                            >
                                −
                            </button>

                            <strong>
                                ${item.quantity}
                            </strong>

                            <button
                                onclick="changeQuantity(${index}, 1)"
                            >
                                +
                            </button>

                        </div>

                    </div>


                    <div class="cart-item-right">

                        <strong>
                            RM ${itemTotal.toFixed(2)}
                        </strong>

                        <button
                            class="remove-item"
                            onclick="removeFromCart(${index})"
                        >
                            <i class="fa-solid fa-trash"></i>
                        </button>

                    </div>

                </div>

            `;

        }).join("");
}


// =========================================================
// UPDATE CART
// =========================================================

function updateCart() {

    renderCart();

    updateCartCount();

    updateCartTotal();
}


// =========================================================
// CART COUNT
// =========================================================

function updateCartCount() {

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    cartCount.textContent =
        totalItems;
}


// =========================================================
// CART TOTAL
// =========================================================

function updateCartTotal() {

    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                (item.price * item.quantity),
            0
        );

    cartTotal.textContent =
        `RM ${total.toFixed(2)}`;
}


// =========================================================
// CHANGE QUANTITY
// =========================================================

function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
    saveCart();
}


// =========================================================
// REMOVE
// =========================================================

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    saveCart();
}


// =========================================================
// CUSTOMIZER ADD BUTTON
// =========================================================

customizerAdd.addEventListener(
    "click",
    addCustomizedPizza
);


// =========================================================
// CUSTOMIZER CLOSE
// =========================================================

customizerClose.addEventListener(
    "click",
    closeCustomizer
);


// =========================================================
// CLICK OUTSIDE CUSTOMIZER
// =========================================================

customizerOverlay.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            customizerOverlay
        ) {

            closeCustomizer();

        }

    }
);


// =========================================================
// CART BUTTON
// =========================================================

cartButton.addEventListener(
    "click",
    openCart
);


// =========================================================
// CLOSE CART
// =========================================================

closeCart.addEventListener(
    "click",
    closeCartDrawer
);


// =========================================================
// CART OVERLAY
// =========================================================

overlay.addEventListener(
    "click",
    closeCartDrawer
);

// =========================================================
// CHECKOUT
// =========================================================

if (checkoutButton) {

    checkoutButton.addEventListener("click", () => {

        if (cart.length === 0) {
            return;
        }

        window.location.href = "checkout.html";

    });

}

// =========================================================
// START
// =========================================================

updateCart();