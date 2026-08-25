// DOM Elements
const productCount = document.getElementById("productCount");
const productsContainer = document.getElementById("productsContainer");
const validationMessage = document.getElementById("validationMessage");
const orderSummary = document.getElementById("orderSummary");

// Helper Functions
function calculateItemAmount(price, quantity) {
    return price * quantity;
}

function calculateDiscount(subtotal) {
    if (subtotal >= 5000) {
        return subtotal * 0.10;
    } else if (subtotal >= 3000) {
        return subtotal * 0.07;
    } else if (subtotal >= 1000) {
        return subtotal * 0.05;
    } else {
        return 0;
    }
}

function getDeliveryFee(option) {
    switch (option) {
        case "1":
            return 0;
        case "2":
            return 80;
        case "3":
            return 150;
        default:
            return 0;
    }
}

// Event Listener: Generate Dynamic Product Inputs
document.getElementById("generateBtn").addEventListener("click", function () {
    const count = Number(productCount.value);

    productsContainer.innerHTML = "";
    orderSummary.innerHTML = "";

    if (count <= 0 || !Number.isInteger(count)) {
        validationMessage.textContent = "Please enter a valid number of products.";
        return;
    }

    validationMessage.textContent = "";

    for (let i = 0; i < count; i++) {
        productsContainer.innerHTML += `
            <h3>Product ${i + 1}</h3>

            <label for="productName-${i}">Product Name</label>
            <input type="text" id="productName-${i}">

            <br><br>

            <label for="productPrice-${i}">Price</label>
            <input type="number" id="productPrice-${i}" min="1" step="0.01">

            <br><br>

            <label for="productQuantity-${i}">Quantity</label>
            <input type="number" id="productQuantity-${i}" min="1">

            <hr>
        `;
    }
});

// Event Listener: Calculate Order Summary
document.getElementById("calculateBtn").addEventListener("click", function () {
    const customerNameInput = document.getElementById("customerName");
    const deliveryOptionInput = document.getElementById("deliveryOption");

    if (!customerNameInput || !deliveryOptionInput) {
        validationMessage.textContent = "Form elements (customerName or deliveryOption) are missing in HTML.";
        return;
    }

    const customerName = customerNameInput.value.trim();
    const count = Number(productCount.value);

    // Clear previous feedback
    validationMessage.textContent = "";
    orderSummary.innerHTML = "";

    // Validations
    if (customerName === "") {
        validationMessage.textContent = "Please enter the customer name.";
        return;
    }

    if (count <= 0 || !Number.isInteger(count)) {
        validationMessage.textContent = "Please enter a valid number of products.";
        return;
    }

    if (productsContainer.children.length === 0) {
        validationMessage.textContent = "Please click Generate Products first.";
        return;
    }

    let subtotal = 0;
    let productDetails = "";

    // Process each product row
    for (let i = 0; i < count; i++) {
        const nameInput = document.getElementById(`productName-${i}`);
        const priceInput = document.getElementById(`productPrice-${i}`);
        const quantityInput = document.getElementById(`productQuantity-${i}`);

        if (!nameInput || !priceInput || !quantityInput) {
            validationMessage.textContent = `Error reading inputs for Product ${i + 1}.`;
            return;
        }

        const productName = nameInput.value.trim();
        const price = Number(priceInput.value);
        const quantity = Number(quantityInput.value);

        if (productName === "") {
            validationMessage.textContent = `Please enter the name of Product ${i + 1}.`;
            return;
        }

        if (isNaN(price) || price <= 0) {
            validationMessage.textContent = `Please enter a valid price for ${productName}.`;
            return;
        }

        if (isNaN(quantity) || quantity <= 0 || !Number.isInteger(quantity)) {
            validationMessage.textContent = `Please enter a valid quantity for ${productName}.`;
            return;
        }

        const amount = calculateItemAmount(price, quantity);
        subtotal += amount;

        productDetails += `
            <h3>${i + 1}. ${productName}</h3>
            <p>Price: ₱${price.toFixed(2)}</p>
            <p>Quantity: ${quantity}</p>
            <p>Amount: ₱${amount.toFixed(2)}</p>
        `;
    }

    // Discounts
    const discountAmount = calculateDiscount(subtotal);
    let discountRate = "0%";
    if (subtotal >= 5000) discountRate = "10%";
    else if (subtotal >= 3000) discountRate = "7%";
    else if (subtotal >= 1000) discountRate = "5%";

    // Delivery Options
    const deliveryOption = deliveryOptionInput.value;
    if (!deliveryOption) {
        validationMessage.textContent = "Please select a delivery option.";
        return;
    }

    const deliveryFee = getDeliveryFee(deliveryOption);
    let deliveryType = "Unknown";

    switch (deliveryOption) {
        case "1":
            deliveryType = "Store Pickup";
            break;
        case "2":
            deliveryType = "Standard Delivery";
            break;
        case "3":
            deliveryType = "Express Delivery";
            break;
    }

    const finalAmount = subtotal - discountAmount + deliveryFee;

    // Render Summary
    orderSummary.innerHTML = `
        <h2>ORDER SUMMARY</h2>
        <p><strong>Customer:</strong> ${customerName}</p>
        <hr>
        ${productDetails}
        <hr>
        <p><strong>Subtotal:</strong> ₱${subtotal.toFixed(2)}</p>
        <p><strong>Discount Rate:</strong> ${discountRate}</p>
        <p><strong>Discount Amount:</strong> ₱${discountAmount.toFixed(2)}</p>
        <p><strong>Delivery Type:</strong> ${deliveryType}</p>
        <p><strong>Delivery Fee:</strong> ₱${deliveryFee.toFixed(2)}</p>
        <hr>
        <h2>Final Amount: ₱${finalAmount.toFixed(2)}</h2>
    `;
});