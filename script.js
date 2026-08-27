// Dynamic Field Generator
function generateProductFields() {
    const count = parseInt(document.getElementById('productCount').value);
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        container.innerHTML += `
            <div>
                <h3>Product ${i + 1}</h3>
                <label for="productName-${i}">Product Name</label>
                <input type="text" id="productName-${i}"><br>
                <label for="productPrice-${i}">Price</label>
                <input type="number" id="productPrice-${i}" step="0.01"><br>
                <label for="productQuantity-${i}">Quantity</label>
                <input type="number" id="productQuantity-${i}"><br>
            </div>
        `;
    }
}

// Required Pure Functions
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
    switch (parseInt(option)) {
        case 1: return 0;
        case 2: return 80;
        case 3: return 150;
        default: return 0;
    }
}

// Main Logic & Event Handling
document.getElementById('calculateBtn').addEventListener('click', function() {
    const customerName = document.getElementById('customerName').value.trim();
    const productCountInput = document.getElementById('productCount').value;
    const count = parseInt(productCountInput);
    const validationMessage = document.getElementById('validationMessage');
    const orderSummary = document.getElementById('orderSummary');

    validationMessage.textContent = '';
    orderSummary.textContent = '';

    // Validation
    if (!customerName) {
        validationMessage.textContent = 'Please enter customer name.';
        return;
    }
    if (isNaN(count) || count <= 0) {
        validationMessage.textContent = 'Please enter a valid number of products.';
        return;
    }

    let subtotal = 0;
    let productsText = '';

    for (let i = 0; i < count; i++) {
        const nameInput = document.getElementById(`productName-${i}`);
        const priceInput = document.getElementById(`productPrice-${i}`);
        const qtyInput = document.getElementById(`productQuantity-${i}`);

        if (!nameInput || !priceInput || !qtyInput) {
            validationMessage.textContent = 'Please generate product fields first.';
            return;
        }

        const pName = nameInput.value.trim();
        const pPrice = parseFloat(priceInput.value);
        const pQty = parseInt(qtyInput.value);

        if (!pName || isNaN(pPrice) || pPrice <= 0 || isNaN(pQty) || pQty <= 0) {
            validationMessage.textContent = `Please enter valid details for Product ${i + 1}.`;
            return;
        }

        const itemAmount = calculateItemAmount(pPrice, pQty);
        subtotal += itemAmount;

        productsText += `${i + 1}. ${pName}\n   Price: ₱${pPrice.toFixed(2)}\n   Quantity: ${pQty}\n   Amount: ₱${itemAmount.toFixed(2)}\n`;
    }

    // Calculations
    const discountAmount = calculateDiscount(subtotal);
    let discountRateText = 'No discount';
    if (subtotal >= 5000) discountRateText = '10%';
    else if (subtotal >= 3000) discountRateText = '7%';
    else if (subtotal >= 1000) discountRateText = '5%';

    const deliveryOption = document.getElementById('deliveryOption').value;
    const deliveryFee = getDeliveryFee(deliveryOption);

    let deliveryTypeName = '';
    switch (parseInt(deliveryOption)) {
        case 1: 
        deliveryTypeName = 'Store Pickup'; 
            break;
        case 2: 
            deliveryTypeName = 'Standard Delivery'; 
            break;
        case 3: 
            deliveryTypeName = 'Express Delivery'; 
            break;
    }

    const finalAmount = subtotal - discountAmount + deliveryFee;

    // Output Generation
    orderSummary.innerText = 
`MINI STORE CHECKOUT SYSTEM
Customer: ${customerName}
${productsText}
ORDER SUMMARY
Subtotal: ₱${subtotal.toFixed(2)}
Discount Rate: ${discountRateText}
Discount Amount: ₱${discountAmount.toFixed(2)}
Delivery Type: ${deliveryTypeName}
Delivery Fee: ₱${deliveryFee.toFixed(2)}
Final Amount: ₱${finalAmount.toFixed(2)}`;
});
