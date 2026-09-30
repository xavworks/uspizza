// ================= MY ORDERS =================

const ORDERS_STORAGE_KEY = "usPizzaOrders";

const ordersList =
    document.getElementById("ordersList");


// ================= CURRENT USER =================

const USER_STORAGE_KEY = "usPizzaUser";

const currentUser =
    JSON.parse(
        localStorage.getItem(USER_STORAGE_KEY)
    );




// ================= LOAD ORDERS =================

let orders =
    JSON.parse(
        localStorage.getItem(ORDERS_STORAGE_KEY)
    ) || [];


// ================= RENDER ORDERS =================

function renderOrders() {

    if (!ordersList) return;


    // Not logged in
    if (!currentUser) {

        ordersList.innerHTML = `

            <div class="orders-empty">

                <div class="orders-empty-icon">
                    👤
                </div>

                <h2>Please login first</h2>

                <p>
                    Login to view your order history.
                </p>

                <a
                    href="login.html"
                    class="primary-btn"
                >
                    Login
                </a>

            </div>

        `;

        return;
    }


    // No orders
    if (orders.length === 0) {

        ordersList.innerHTML = `

            <div class="orders-empty">

                <div class="orders-empty-icon">
                    📦
                </div>

                <h2>No orders yet</h2>

                <p>
                    Your completed orders will appear here.
                </p>

                <a
                    href="index.html#menu"
                    class="primary-btn"
                >
                    Order Pizza
                </a>

            </div>

        `;

        return;
    }


    // Only show this user's orders
    const userOrders =
        orders.filter(
            order =>
                order.email.toLowerCase() ===
                currentUser.email.toLowerCase()
        );


    if (userOrders.length === 0) {

        ordersList.innerHTML = `

            <div class="orders-empty">

                <div class="orders-empty-icon">
                    📦
                </div>

                <h2>No orders yet</h2>

                <p>
                    You haven't placed an order yet.
                </p>

                <a
                    href="index.html#menu"
                    class="primary-btn"
                >
                    Order Pizza
                </a>

            </div>

        `;

        return;
    }


    ordersList.innerHTML = "";


    userOrders
        .slice()
        .reverse()
        .forEach(order => {

            const itemsHTML =
                order.items.map(item => {

                    const toppings =
                        item.toppings &&
                        item.toppings.length
                            ? ` • ${item.toppings.join(", ")}`
                            : "";

                    return `

                        <div class="order-item">

                            <img
                                src="${item.image}"
                                alt="${item.name}"
                            >

                            <div>

                                <strong>
                                    ${item.name}
                                </strong>

                                <p>
                                    ${item.size}
                                    •
                                    ${item.crust}
                                    ${toppings}
                                </p>

                                <span>
                                    Qty: ${item.quantity}
                                </span>

                            </div>

                        </div>

                    `;

                })
                .join("");


            ordersList.innerHTML += `

                <article class="order-card">

                    <div class="order-card-header">

                        <div>

                            <span class="order-label">
                                ORDER
                            </span>

                            <h2>
                                ${order.orderNumber}
                            </h2>

                        </div>

                        <span class="order-status">
                            ✓ ${order.status}
                        </span>

                    </div>


                    <div class="order-date">

                        <i class="fa-regular fa-calendar"></i>

                        ${order.date}

                        <span>•</span>

                        ${order.orderType}

                    </div>


                    <div class="order-items">

                        ${itemsHTML}

                    </div>


                    <div class="order-card-footer">

                        <span>
                            Total
                        </span>

                        <strong>
                            RM ${order.total.toFixed(2)}
                        </strong>

                    </div>

                </article>

            `;

        });

}


renderOrders();