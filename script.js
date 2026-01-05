document.addEventListener('DOMContentLoaded', () => {

    const products = [
        { id: 1, name: 'Laptop', price: 999.99 },
        { id: 2, name: 'Smartphone', price: 499.99 },
        { id: 3, name: 'Headphones', price: 199.99 }
    ];

    const cart = [];

    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart');

    const cartTotalMessage = document.getElementById('cart-total');
    const totalPriceDisplay = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(productDiv);

        // 
    });

    productList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const productId = parseInt(e.target.getAttribute('data-id'))
            const product = products.find(p => p.id === productId)
            addToCart(product)
        }
    })


    function addToCart(product) {
        cart.push(product)
        renderCart()
    }



    function renderCart() {
        cartItems.innerHTML = ''
        let totalPrice = 0

        if (cart.length) {
            emptyCartMessage.classList.add('hidden')
            cartTotalMessage.classList.remove('hidden')
            cart.forEach((item, index) => {
                totalPrice += item.price
                document.createElement('div');
                const cartItem = document.createElement('div')
                cartItem.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)}
                `
                cartItems.appendChild(cartItem)
                totalPriceDisplay.textContent = totalPrice.toFixed(2)
            })

        } else {
            emptyCartMessage.classList.add('hidden')
        }
    }

    checkoutBtn.addEventListener('click', () => {
        cart.length = 0
        alert('Thank you for your purchase!')
        totalPriceDisplay.textContent = (0).toFixed(2)

        renderCart()
    })
})