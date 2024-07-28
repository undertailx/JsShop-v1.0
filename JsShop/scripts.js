document.addEventListener("DOMContentLoaded", function() {
    const cartCountElement = document.getElementById("cart-count");
    const cartModal = document.getElementById("cart-modal");
    const cartItemsElement = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const closeCartButton = document.getElementById("close-cart");
    const viewCartButton = document.getElementById("view-cart");

    let cart = [];
    let cartCount = 0;
    let totalPrice = 0;

    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const increaseButtons = document.querySelectorAll(".increase");
    const decreaseButtons = document.querySelectorAll(".decrease");

    // เพิ่มสินค้าไปในรายการ และแสดงการแจ้งเตือน
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function() {
            const product = button.parentElement;
            const productId = product.getAttribute("data-id");
            const productName = product.getAttribute("data-name");
            const productPrice = parseFloat(product.getAttribute("data-price"));
            const quantityElement = product.querySelector(".quantity");
            const quantity = parseInt(quantityElement.textContent);

            cart.push({ id: productId, name: productName, price: productPrice, quantity: quantity });
            cartCount += quantity;
            totalPrice += productPrice * quantity;

            cartCountElement.textContent = cartCount;
            alert("เพิ่มสินค้าไปยังรถเข็นแล้ว!");
        });
    });

    // เพิ่มจำนวนสินค้าที่กด ที่ละ 1
    
    increaseButtons.forEach(button => {
        button.addEventListener("click", function() {
            const quantityElement = button.previousElementSibling;
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity;
        });
    });

    
    decreaseButtons.forEach(button => {
        button.addEventListener("click", function() {
            const quantityElement = button.nextElementSibling;
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 1) {
                quantity--;
                quantityElement.textContent = quantity;
            }
        });
    });

    // แสดงรายการสินค้าที่สั่งไป 

    viewCartButton.addEventListener("click", function() {
        cartItemsElement.innerHTML = '';
        cart.forEach(item => {
            const listItem = document.createElement("li");
            listItem.textContent = `${item.name} - ${item.price} บาท - ${item.quantity} ชิ้น`;
            cartItemsElement.appendChild(listItem);
        });

        totalPriceElement.textContent = totalPrice;
        cartModal.style.display = "flex";
    });

    closeCartButton.addEventListener("click", function() {
        cartModal.style.display = "none";
    });
});
