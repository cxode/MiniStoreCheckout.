// script.js
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
    switch (Number(option)) {
        case 1:
            return 0;
        case 2:
            return 80;
        case 3:
            return 150;
        default:
            return 0;
    }
}

document.getElementById('productCount').addEventListener('input', function () {
    const count = Number(this.value);
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';

    if (count > 0) {
        for (let i = 0; i < count; i++) {
            const productDiv = document.createElement('div');
            
            const nameLabel = document.createElement('label');
            nameLabel.innerText = 'Product Name';
            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.id = `productName-${i}`;

            const priceLabel = document.createElement('label');
            priceLabel.innerText = 'Price';
            const priceInput = document.createElement('input');
            priceInput.type = 'number';
            priceInput.id = `productPrice-${i}`;

            const quantityLabel = document.createElement('label');
            quantityLabel.innerText = 'Quantity';
            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.id = `productQuantity-${i}`;

            productDiv.appendChild(nameLabel);
            productDiv.appendChild(nameInput);
            productDiv.appendChild(priceLabel);
            productDiv.appendChild(priceInput);
            productDiv.appendChild(quantityLabel);
            productDiv.appendChild(quantityInput);

            container.appendChild(productDiv);
        }
    }
});

document.getElementById('calculateBtn').addEventListener('click', function () {
    const nameInput = document.getElementById('customerName').value.trim();
    const countInput = Number(document.getElementById('productCount').value);
    const deliveryValue = document.getElementById('deliveryOption').value;
    
    const validationMessage = document.getElementById('validationMessage');
    const orderSummary = document.getElementById('orderSummary');

    validationMessage.innerText = '';
    orderSummary.innerText = '';

    if (!nameInput) {
        validationMessage.innerText = 'Please enter customer name.';
        return;
    }

    if (isNaN(countInput) || countInput <= 0) {
        validationMessage.innerText = 'Please enter a valid number of products.';
        return;
    }

    let subtotal = 0;
    let itemsSummaryHTML = '';

    for (let i = 0; i < countInput; i++) {
        const pNameElem = document.getElementById(`productName-${i}`);
        const pPriceElem = document.getElementById(`productPrice-${i}`);
        const pQtyElem = document.getElementById(`productQuantity-${i}`);

        if (!pNameElem || !pPriceElem || !pQtyElem) {
            validationMessage.innerText = 'Product fields missing.';
            return;
        }

        const pName = pNameElem.value.trim();
        const pPrice = Number(pPriceElem.value);
        const pQty = Number(pQtyElem.value);

        if (!pName) {
            validationMessage.innerText = `Please enter a name for product ${i + 1}.`;
            return;
        }
        if (isNaN(pPrice) || pPrice <= 0) {
            validationMessage.innerText = `Please enter a valid price for product ${i + 1}.`;
            return;
        }
        if (isNaN(pQty) || pQty <= 0) {
            validationMessage.innerText = `Please enter a valid quantity for product ${i + 1}.`;
            return;
        }

        const itemAmount = calculateItemAmount(pPrice, pQty);
        subtotal += itemAmount;

        itemsSummaryHTML += `${i + 1}. ${pName}<br>` +
            `Price: ₱${pPrice.toFixed(2)}<br>` +
            `Quantity: ${pQty}<br>` +
            `Amount: ₱${itemAmount.toFixed(2)}<br>`;
    }

    const discountAmount = calculateDiscount(subtotal);
    let discountRate = 'No discount';
    if (subtotal >= 5000) discountRate = '10%';
    else if (subtotal >= 3000) discountRate = '7%';
    else if (subtotal >= 1000) discountRate = '5%';

    const deliveryFee = getDeliveryFee(deliveryValue);
    let deliveryType = 'Store Pickup';
    if (Number(deliveryValue) === 2) deliveryType = 'Standard Delivery';
    if (Number(deliveryValue) === 3) deliveryType = 'Express Delivery';

    const finalAmount = subtotal - discountAmount + deliveryFee;

    orderSummary.innerHTML = 
        `Customer: ${nameInput}<br><br>` +
        `${itemsSummaryHTML}<br>` +
        `<strong>ORDER SUMMARY</strong><br>` +
        `Subtotal: ₱${subtotal.toFixed(2)}<br>` +
        `Discount Rate: ${discountRate}<br>` +
        `Discount Amount: ₱${discountAmount.toFixed(2)}<br>` +
        `Delivery Type: ${deliveryType}<br>` +
        `Delivery Fee: ₱${deliveryFee.toFixed(2)}<br>` +
        `Final Amount: ₱${finalAmount.toFixed(2)}`;
});