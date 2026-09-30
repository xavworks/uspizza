// ================= AI FOOD FINDER =================

const aiInput = document.getElementById("aiInput");
const aiSend = document.getElementById("aiSend");
const aiBubble = document.querySelector(".ai-bubble");

function showAIMessage(message) {

    if (!aiBubble) return;

    aiBubble.innerHTML = message;

}


// ================= PIZZAS =================

const aiPizzas = {

    pepperoni: {
        name: "Beef Pepperoni",
        price: 22.90,
        image: "images/pepperoni.jpg"
    },

    "chicken supreme": {
        name: "Chicken Supreme",
        price: 24.90,
        image: "images/chicken-supreme.jpg"
    },

    "spicy chicken": {
        name: "Spicy Chicken",
        price: 27.90,
        image: "images/spicy-chicken.jpg"
    },

    "cheese lovers": {
        name: "Cheese Lovers",
        price: 21.90,
        image: "images/cheese-lovers.jpg"
    }

};


// ================= FIND PIZZA =================

function findPizza(message) {

    const text = message.toLowerCase();

    if (text.includes("pepperoni")) {
        return aiPizzas.pepperoni;
    }

    if (
        text.includes("spicy") ||
        text.includes("spicy chicken")
    ) {
        return aiPizzas["spicy chicken"];
    }

    if (
        text.includes("cheese") ||
        text.includes("cheesy")
    ) {
        return aiPizzas["cheese lovers"];
    }

    if (
        text.includes("supreme") ||
        text.includes("chicken supreme")
    ) {
        return aiPizzas["chicken supreme"];
    }

    return null;
}


// ================= FIND QUANTITY =================

function findQuantity(message) {

    const text = message.toLowerCase();

    const numberMatch =
        text.match(/\b(\d+)\b/);

    if (numberMatch) {
        return parseInt(numberMatch[1]);
    }

    const words = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5
    };

    for (const word in words) {

        if (text.includes(word)) {
            return words[word];
        }

    }

    return 1;
}


// ================= FIND SIZE =================

function findSize(message) {

    const text = message.toLowerCase();

    if (
        text.includes("xl") ||
        text.includes("extra large")
    ) {
        return {
            name: "XL",
            price: 9
        };
    }

    if (
        text.includes("large") ||
        text.includes("big")
    ) {
        return {
            name: "Large",
            price: 5
        };
    }

    if (text.includes("medium")) {
        return {
            name: "Medium",
            price: 3
        };
    }

    if (
        text.includes("small") ||
        text.includes("little")
    ) {
        return {
            name: "Small",
            price: 0
        };
    }

    return {
        name: "Regular",
        price: 0
    };
}


// ================= FIND CRUST =================

function findCrust(message) {

    const text = message.toLowerCase();

    if (
        text.includes("cheesy crust") ||
        text.includes("cheese crust")
    ) {
        return {
            name: "Cheesy Crust",
            price: 4
        };
    }

    if (
        text.includes("thin crust") ||
        text.includes("thin")
    ) {
        return {
            name: "Thin",
            price: 2
        };
    }

    return {
        name: "Original",
        price: 0
    };
}


// ================= FIND TOPPINGS =================

function findToppings(message) {

    const text = message.toLowerCase();

    const toppings = [];


    if (
        text.includes("extra cheese") ||
        text.includes("more cheese")
    ) {

        toppings.push({
            name: "Extra Cheese",
            price: 3
        });

    }


    if (text.includes("mushroom")) {

        toppings.push({
            name: "Mushrooms",
            price: 2
        });

    }


    if (
        text.includes("jalapeno") ||
        text.includes("jalapeño")
    ) {

        toppings.push({
            name: "Jalapeño",
            price: 2
        });

    }


    return toppings;
}


// ================= ADD AI ORDER =================

function addAIOrder(message) {

    const pizza = findPizza(message);


    if (!pizza) {

        showAIMessage(
    `🤖 I'm not sure which pizza you want.<br><br>
    Try something like:<br>
    <strong>"3 large pepperoni pizzas with extra cheese"</strong>`
);

return;
    }


    const quantity =
        findQuantity(message);

    const size =
        findSize(message);

    const crust =
        findCrust(message);

    const toppings =
        findToppings(message);


    // ================= PRICE =================

    let unitPrice =
        pizza.price;

    unitPrice += size.price;

    unitPrice += crust.price;


    toppings.forEach(topping => {

        unitPrice += topping.price;

    });


    // ================= CART =================

    const CART_STORAGE_KEY =
        "usPizzaCart";

    let cart =
        JSON.parse(
            localStorage.getItem(CART_STORAGE_KEY)
        ) || [];


    const cartItem = {

        id: Date.now(),

        name: pizza.name,

        image: pizza.image,

        size: size.name,

        crust: crust.name,

        toppings: toppings.map(
            topping => topping.name
        ),

        price: unitPrice,

        quantity: quantity

    };


    cart.push(cartItem);


    localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cart)
    );


    // ================= MESSAGE =================

    const toppingText =
    toppings.length > 0
        ? ` with ${toppings.map(topping => topping.name).join(", ")}`
        : "";

const aiResponse =
    `🍕 <strong>Got it!</strong><br><br>
    I've added <strong>${quantity} × ${size.name} ${pizza.name}</strong>${toppingText}
    to your cart.<br><br>
    <strong>RM ${(unitPrice * quantity).toFixed(2)}</strong>`;

sessionStorage.setItem(
    "usPizzaAIResponse",
    aiResponse
);


    // Refresh so the existing cart displays it
    window.location.reload();

}


// ================= SEND BUTTON =================

if (aiSend) {

    aiSend.addEventListener("click", () => {

        const message =
            aiInput.value.trim();

        if (!message) {
            return;
        }

        addAIOrder(message);

    });

}


// ================= ENTER KEY =================

if (aiInput) {

    aiInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                event.preventDefault();

                aiSend.click();

            }

        }
    );

}
// ================= SHOW LAST AI RESPONSE =================

const savedAIResponse =
    sessionStorage.getItem("usPizzaAIResponse");

if (savedAIResponse) {

    showAIMessage(savedAIResponse);

    sessionStorage.removeItem(
        "usPizzaAIResponse"
    );

}