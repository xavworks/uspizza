// ================= AUTH SYSTEM =================

const USER_STORAGE_KEY = "usPizzaUser";
const LOGIN_STORAGE_KEY = "usPizzaLoggedIn";


// ================= REGISTER =================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("registerName").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim();

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("registerConfirmPassword").value;


        // Check passwords
        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;
        }


        // Check password length
        if (password.length < 6) {

            alert("Password must be at least 6 characters.");

            return;
        }


        // Check whether an account already exists
        const existingUser =
            JSON.parse(localStorage.getItem(USER_STORAGE_KEY));


        if (
            existingUser &&
            existingUser.email.toLowerCase() === email.toLowerCase()
        ) {

            alert("An account with this email already exists.");

            return;
        }


        // Create user object
        const user = {
            name: name,
            email: email,
            password: password
        };


        // Save account
        localStorage.setItem(
            USER_STORAGE_KEY,
            JSON.stringify(user)
        );


        alert("Account created successfully! 🍕");


        // Go to login
        window.location.href = "login.html";

    });
}



// ================= LOGIN =================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;


        // Get saved account
        const savedUser =
            JSON.parse(localStorage.getItem(USER_STORAGE_KEY));


        // No account
        if (!savedUser) {

            alert("No account found. Please register first.");

            return;
        }


        // Check login
        if (
            savedUser.email.toLowerCase() === email.toLowerCase() &&
            savedUser.password === password
        ) {

            localStorage.setItem(
                LOGIN_STORAGE_KEY,
                "true"
            );


            const authMessage =
    document.getElementById("authMessage");

if (authMessage) {

    authMessage.textContent =
        `✓ Welcome back, ${savedUser.name}!`;

    authMessage.classList.add("show");

}


            setTimeout(() => {

    window.location.href = "index.html";

}, 1000);

        } else {

            alert("Incorrect email or password.");

        }

    });
}

// ================= NAVBAR ACCOUNT =================

const loggedIn =
    localStorage.getItem(LOGIN_STORAGE_KEY);

const currentUser =
    JSON.parse(localStorage.getItem(USER_STORAGE_KEY));

const loginLink =
    document.querySelector(".login-btn");

const accountDropdown =
    document.getElementById("accountDropdown");

const accountName =
    document.getElementById("accountName");

const accountEmail =
    document.getElementById("accountEmail");

const logoutButton =
    document.getElementById("logoutButton");


if (loggedIn === "true" && currentUser && loginLink) {

    // Update navbar
    loginLink.innerHTML = `
        <i class="fa-regular fa-user"></i>
        Hi, ${currentUser.name}
    `;

    loginLink.href = "#";


    // Update account information
    if (accountName) {
        accountName.textContent = currentUser.name;
    }

    if (accountEmail) {
        accountEmail.textContent = currentUser.email;
    }


    // Open / close dropdown
    loginLink.addEventListener("click", function (event) {

        event.preventDefault();

        if (accountDropdown) {

            accountDropdown.classList.toggle("active");

        }

    });


    // Logout
    if (logoutButton) {

        logoutButton.addEventListener("click", function () {

            localStorage.removeItem(LOGIN_STORAGE_KEY);

            if (accountDropdown) {
                accountDropdown.classList.remove("active");
            }

            window.location.reload();

        });

    }


    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {

        const accountWrapper =
            document.querySelector(".account-wrapper");

        if (
            accountWrapper &&
            !accountWrapper.contains(event.target)
        ) {

            if (accountDropdown) {
                accountDropdown.classList.remove("active");
            }

        }

    });

}