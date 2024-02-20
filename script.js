document.addEventListener("DOMContentLoaded", function (params) {

    const addtocartButton = document.querySelectorAll(".add-to-cart");
    const deleteAll = document.getElementById("delete-all")

    deleteAll.addEventListener("click", () => {
        localStorage.removeItem("basket")
        const cartItems = document.getElementById("cart-items");
        cartItems.innerText = "Empty";
        document.getElementById("total-price").innerText = "0"
    })

    addtocartButton.forEach((button) => {
        button.addEventListener("click", (e) => {
            const card = e.target.closest(".card");
            const product = {
                id: card.dataset.id,
                image: card.querySelector("img").src,
                title: card.querySelector("h2").innerText,
                price: parseFloat(
                    card.querySelector(".price").innerText.replace("$", "")
                ),
                quantity: 1,
            };
            addToCart(product);
            DisplayCart();
        });
    });

    function addToCart(addproduct) {
        let cart = JSON.parse(localStorage.getItem("basket")) || [];
        const existingProductIndex = cart.findIndex(
            (product) => product.id === addproduct.id
        );
        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += 1;
        } else {

            cart.push(addproduct);
        }
        localStorage.setItem("basket", JSON.stringify(cart));
        updateCartCount();
    }

    function DisplayCart() {
        let cart = JSON.parse(localStorage.getItem("basket")) || [];
        const cartItems = document.getElementById("cart-items");
        cartItems.innerHTML = "";
        cart.forEach((product) => {
            const productElement = document.createElement("div");
            productElement.id = "productElement"
            productElement.innerHTML = `<img class="cartImage" src="${product.image
                }"> ${product.title} Count: ${product.quantity} <br/> Price: ${(
                    product.quantity * product.price
                ).toFixed(2)}`;
            cartItems.appendChild(productElement);
        });
        const totalPrice = cart.reduce(
            (toplam, item) => toplam + item.price * item.quantity,
            0
        );
        document.getElementById("total-price").textContent = totalPrice.toFixed(2);
    }
    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem("basket")) || [];
        const totalCount = cart.reduce(
            (toplam, item) => (toplam += item.quantity),
            0
        );
        document.getElementById("cart-count").innerText = totalCount;
    }
    updateCartCount();
    DisplayCart();
});