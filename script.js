document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseList = document.getElementById('expense-list');
    const totalAmountDisplay = document.getElementById('total-amount');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let totalAmount = calculateTotal();

    renderExpenses();

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());

        if (name !== "" && !isNaN(amount) && amount > 0) {
            const newExpense = {
                id: Date.now(),
                name,
                amount
            };

            expenses.push(newExpense);
            saveExpensesTolocalStorage();
            renderExpenses();
            updateTotal();

            expenseNameInput.value = '';
            expenseAmountInput.value = '';
        }

    })

    function renderExpenses() {

        expenseList.innerHTML = '';
        expenses.forEach(expense => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${expense.name} - $${expense.amount.toFixed(2)}
                <button data-id="${expense.id}">Delete</button>
                `;
            expenseList.appendChild(li);
        })
    }

    function updateTotal() {
        totalAmount = calculateTotal();
        totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }

    function calculateTotal() {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    }

    function saveExpensesTolocalStorage() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    expenseList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const id = parseInt(e.target.getAttribute('data-id'));
            expenses = expenses.filter(expense => expense.id !== id);
            saveExpensesTolocalStorage();
            renderExpenses();
            updateTotal();
        }
    })
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