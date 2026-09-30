// ================= DEAL BUTTON =================

const dealButton = document.querySelector(".deal-btn");

if (dealButton) {

    dealButton.addEventListener("click", () => {

        document
            .getElementById("menu")
            ?.scrollIntoView({
                behavior: "smooth"
            });

    });

}
// ================= VIEW MENU BUTTON =================

const viewMenuButton = document.querySelector(".categories .view-all");

if (viewMenuButton) {

    viewMenuButton.addEventListener("click", (event) => {

        event.preventDefault();

        document
            .getElementById("menu")
            ?.scrollIntoView({
                behavior: "smooth"
            });

    });

}

// ================= MENU DATA =================

const menuData = {

    Pizza: [
        {
            name: "Beef Pepperoni",
            price: 22.90,
            image: "images/pepperoni.jpg",
            description: "Loaded with beef pepperoni, mozzarella and rich tomato sauce."
        },
        {
            name: "Chicken Supreme",
            price: 24.90,
            image: "images/chicken-supreme.jpg",
            description: "Juicy chicken, mushrooms, onions, capsicum and mozzarella."
        },
        {
            name: "Spicy Chicken",
            price: 27.90,
            image: "images/spicy-chicken.jpg",
            description: "Spicy chicken, jalapeños, onions and extra cheese."
        },
        {
            name: "Cheese Lovers",
            price: 21.90,
            image: "images/cheese-lovers.jpg",
            description: "A cheesy combination of mozzarella, cheddar and parmesan."
        }
    ],

    Chicken: [
        {
            name: "Crispy Fried Chicken",
            price: 16.90,
            image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?q=80&w=800&auto=format&fit=crop",
            description: "Golden crispy chicken with a delicious crunchy coating."
        },
        {
            name: "Chicken Wings",
            price: 14.90,
            image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=800&auto=format&fit=crop",
            description: "Juicy chicken wings tossed in our signature sauce."
        },
        {
            name: "Spicy Chicken Bites",
            price: 15.90,
            image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop",
            description: "Crispy chicken bites with a spicy kick."
        },
        {
            name: "Chicken Tenders",
            price: 17.90,
            image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=80&w=800&auto=format&fit=crop",
            description: "Tender strips of crispy seasoned chicken."
        }
    ],

    Pasta: [
        {
            name: "Creamy Carbonara",
            price: 19.90,
            image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=800&auto=format&fit=crop",
            description: "Creamy pasta with rich sauce and parmesan."
        },
        {
            name: "Beef Bolognese",
            price: 21.90,
            image: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?q=80&w=800&auto=format&fit=crop",
            description: "Classic pasta with rich beef and tomato sauce."
        },
        {
            name: "Spaghetti Meatballs",
            price: 22.90,
            image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800&auto=format&fit=crop",
            description: "Spaghetti served with juicy meatballs and tomato sauce."
        },
        {
            name: "Creamy Chicken Pasta",
            price: 23.90,
            image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=800&auto=format&fit=crop",
            description: "Creamy pasta with tender chicken and parmesan."
        }
    ],

    Sides: [
        {
            name: "French Fries",
            price: 8.90,
            image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800&auto=format&fit=crop",
            description: "Crispy golden fries seasoned to perfection."
        },
        {
            name: "Cheesy Fries",
            price: 11.90,
            image: "https://images.unsplash.com/photo-1630431341973-02e1b662ec35?q=80&w=800&auto=format&fit=crop",
            description: "Golden fries loaded with creamy melted cheese."
        },
        {
            name: "Garlic Bread",
            price: 9.90,
            image: "https://images.unsplash.com/photo-1573140401552-3fab0b24306f?q=80&w=800&auto=format&fit=crop",
            description: "Warm toasted bread with garlic butter."
        },
        {
            name: "Chicken Nuggets",
            price: 12.90,
            image: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=800&auto=format&fit=crop",
            description: "Crispy bite-sized chicken nuggets."
        }
    ],

    Drinks: [
        {
            name: "Coca-Cola",
            price: 5.90,
            image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?q=80&w=800&auto=format&fit=crop",
            description: "Ice-cold Coca-Cola."
        },
        {
            name: "Iced Lemon Tea",
            price: 6.90,
            image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop",
            description: "Refreshing iced lemon tea."
        },
        {
            name: "Orange Juice",
            price: 7.90,
            image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=800&auto=format&fit=crop",
            description: "Fresh and refreshing orange juice."
        },
        {
            name: "Mineral Water",
            price: 3.90,
            image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=800&auto=format&fit=crop",
            description: "Cold bottled mineral water."
        }
    ]

};


// ================= CATEGORY MENU SWITCHER =================

const productGrid = document.getElementById("productGrid");

function renderMenu(category) {

    if (!productGrid) return;

    if (!menuData[category]) return;

    productGrid.innerHTML = "";

    menuData[category].forEach((product) => {

        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image">

                <div class="pizza-placeholder">
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >
                </div>

                <button class="heart-btn">
                    <i class="fa-regular fa-heart"></i>
                </button>

            </div>

            <div class="product-info">

                <div class="rating">
                    ★★★★★
                    <span>New</span>
                </div>

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <div class="product-bottom">

                    <strong>
                        From RM ${product.price.toFixed(2)}
                    </strong>

                    <button
                        class="add-cart-btn"
                        data-product="${product.name}"
                        data-price="${product.price}"
                        data-image="${product.image}"
                        data-category="${category}"
                    >
                        <i class="fa-solid fa-plus"></i>
                    </button>

                </div>

            </div>
        `;

        productGrid.appendChild(card);

    });
}


// CATEGORY BUTTONS

document.querySelectorAll(".category-card").forEach((card) => {

    card.addEventListener("click", () => {

        document
            .querySelectorAll(".category-card")
            .forEach((item) => {
                item.classList.remove("active");
            });

        card.classList.add("active");

        const category =
            card.querySelector("strong").textContent.trim();

        renderMenu(category);

        document
            .getElementById("menu")
            ?.scrollIntoView({
                behavior: "smooth"
            });

    });

});



// ================= INITIAL MENU =================

renderMenu("Pizza");