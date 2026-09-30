const CART_STORAGE_KEY = "usPizzaCart";

let cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];

let selectedOrderType = "delivery";

const checkoutItems = document.getElementById("checkoutItems");
const checkoutSubtotal = document.getElementById("checkoutSubtotal");
const checkoutDelivery = document.getElementById("checkoutDelivery");
const checkoutTotal = document.getElementById("checkoutTotal");
const summaryItemCount = document.getElementById("summaryItemCount");

const orderTypeInputs = document.querySelectorAll(
    'input[name="orderType"]'
);

const deliveryOption = document.querySelector(
    'input[name="orderType"][value="delivery"]'
);

const pickupOption = document.querySelector(
    'input[name="orderType"][value="pickup"]'
);
const deliveryAddress = document.getElementById("deliveryAddress");

function formatPrice(price) {
    return `RM ${price.toFixed(2)}`;
}

function renderCheckout() {

    if (!checkoutItems) return;

    if (cart.length === 0) {
        checkoutItems.innerHTML = `
            <div class="empty-checkout">
                <div style="font-size:48px;">🛒</div>
                <p>Your cart is empty.</p>
                <a href="index.html">Browse Menu</a>
            </div>
        `;

        checkoutSubtotal.textContent = "RM 0.00";
        checkoutDelivery.textContent = "RM 0.00";
        checkoutTotal.textContent = "RM 0.00";
        summaryItemCount.textContent = "0 items";

        return;
    }

    let subtotal = 0;
    let itemCount = 0;

    checkoutItems.innerHTML = "";

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        subtotal += itemTotal;
        itemCount += item.quantity;

        const toppingsText = item.toppings && item.toppings.length
            ? item.toppings.join(", ")
            : "No extra toppings";

        checkoutItems.innerHTML += `
            <div class="checkout-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="checkout-item-image"
                >

                <div class="checkout-item-info">

                    <h4>${item.name}</h4>

                    <p>${item.size} · ${item.crust}</p>

                    <small>${toppingsText}</small>

                    <div class="checkout-item-bottom">
                        <span>Qty: ${item.quantity}</span>
                        <strong>${formatPrice(itemTotal)}</strong>
                    </div>

                </div>

            </div>
        `;
    });

   const deliveryFee = selectedOrderType === "delivery" ? 5 : 0;

    const total = subtotal + deliveryFee;

    checkoutSubtotal.textContent = formatPrice(subtotal);
    checkoutDelivery.textContent = formatPrice(deliveryFee);
    checkoutTotal.textContent = formatPrice(total);

    summaryItemCount.textContent =
        `${itemCount} ${itemCount === 1 ? "item" : "items"}`;
}

function setOrderType(type) {

    selectedOrderType = type;

    if (type === "delivery") {

        if (deliveryAddress) {
            deliveryAddress.style.display = "block";
        }

    } else {

        if (deliveryAddress) {
            deliveryAddress.style.display = "none";
        }
    }

    renderCheckout();
}

orderTypeInputs.forEach(input => {
    input.addEventListener("change", function () {
        setOrderType(this.value);
    });
});


const orderSuccess = document.getElementById("orderSuccess");
const successOrderNumber = document.getElementById("successOrderNumber");
const successOrderDetails = document.getElementById("successOrderDetails");
const successOrderTotal = document.getElementById("successOrderTotal");
const successOrderType = document.getElementById("successOrderType");
const successEstimate = document.getElementById("successEstimate");
const backHome = document.getElementById("backHome");


// ================= PLACE ORDER =================

const placeOrder =
    document.getElementById("placeOrder");

if (placeOrder) {

    placeOrder.addEventListener("click", () => {

        // Check cart
        if (cart.length === 0) {

            alert("Your cart is empty.");

            return;
        }


        // Customer details
        const fullName =
            document
                .getElementById("customerName")
                ?.value
                .trim();

        const phone =
            document
                .getElementById("customerPhone")
                ?.value
                .trim();

        const email =
            document
                .getElementById("customerEmail")
                ?.value
                .trim();


        // Validate contact details
        if (!fullName || !phone || !email) {

            alert(
                "Please complete your contact details."
            );

            return;
        }


        // Calculate subtotal
        let subtotal = 0;

        cart.forEach(item => {

            subtotal +=
                item.price * item.quantity;

        });


        // Delivery fee
        const deliveryFee =
            selectedOrderType === "delivery"
                ? 5
                : 0;


        const total =
            subtotal + deliveryFee;


        // Generate order number
        const orderNumber =
            "US" +
            Math.floor(
                10000 + Math.random() * 90000
            );


        // Current date
        const orderDate =
            new Date().toLocaleString(
                "en-MY",
                {
                    dateStyle: "medium",
                    timeStyle: "short"
                }
            );

        const currentUser =
    JSON.parse(
        localStorage.getItem("usPizzaUser")
    );

if (!currentUser) {

    alert("Please login before placing an order.");

    return;
}

        // ================= ORDER OBJECT =================
     
        const newOrder = {

            orderNumber: orderNumber,

            name: fullName,

            phone: phone,

            email: currentUser.email,

            orderType:
                selectedOrderType === "delivery"
                    ? "Delivery"
                    : "Pickup",

            items: cart,

            subtotal: subtotal,

            deliveryFee: deliveryFee,

            total: total,

            status: "Placed",

            date: orderDate

        };


        // ================= SAVE ORDER =================

        const ORDERS_STORAGE_KEY =
            "usPizzaOrders";


        let orders =
            JSON.parse(
                localStorage.getItem(
                    ORDERS_STORAGE_KEY
                )
            ) || [];


        orders.push(newOrder);


        localStorage.setItem(
            ORDERS_STORAGE_KEY,
            JSON.stringify(orders)
        );


        // ================= CLEAR CART =================

        localStorage.removeItem(
            CART_STORAGE_KEY
        );


       // ================= SHOW ORDER SUCCESS =================

const orderSuccess =
    document.getElementById("orderSuccess");

const successCustomerName =
    document.getElementById("successCustomerName");

const successOrderNumber =
    document.getElementById("successOrderNumber");

const successOrderItems =
    document.getElementById("successOrderItems");

const successOrderTotal =
    document.getElementById("successOrderTotal");

const successOrderType =
    document.getElementById("successOrderType");

const successEstimate =
    document.getElementById("successEstimate");


// Customer name
if (successCustomerName) {
    successCustomerName.textContent =
        fullName;
}


// Order number
if (successOrderNumber) {
    successOrderNumber.textContent =
        `#${orderNumber}`;
}


// Total
if (successOrderTotal) {
    successOrderTotal.textContent =
        `RM ${total.toFixed(2)}`;
}


// Order type + estimate
if (selectedOrderType === "delivery") {

    if (successOrderType) {
        successOrderType.textContent =
            "Delivery";
    }

    if (successEstimate) {
        successEstimate.textContent =
            "Estimated delivery: 30–45 minutes";
    }

} else {

    if (successOrderType) {
        successOrderType.textContent =
            "Pickup";
    }

    if (successEstimate) {
        successEstimate.textContent =
            "Ready for pickup in 20–30 minutes";
    }

}


// Order items
if (successOrderItems) {

    successOrderItems.innerHTML = "";

    cart.forEach(item => {

        const toppingsText =
            item.toppings &&
            item.toppings.length
                ? ` • ${item.toppings.join(", ")}`
                : "";

        successOrderItems.innerHTML += `

            <div class="success-item">

                <div>

                    <strong>
                        ${item.quantity} × ${item.name}
                    </strong>

                    <span>
                        ${item.size}
                        •
                        ${item.crust}
                        ${toppingsText}
                    </span>

                </div>

                <strong>
                    RM ${(item.price * item.quantity).toFixed(2)}
                </strong>

            </div>

        `;

    });

}


// Show confirmation screen
if (orderSuccess) {

    orderSuccess.classList.add("active");

}

    });

}


renderCheckout();