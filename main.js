document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.navbar .middle-side .nav-links');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
});




// Get the buttons and content containers
const buttons = document.querySelectorAll('.btn');
const contentContainers = document.querySelectorAll('.content-container');

// Show all content containers by default
contentContainers.forEach((container) => container.style.display = 'block');

// Add event listeners to the buttons
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    buttons.forEach((btn) => btn.classList.remove('active'));

    // Add active class to the current button
    button.classList.add('active');

    // Get the target content container
    const targetContent = button.getAttribute('data-target');

    // Show or hide content containers based on the target content
    contentContainers.forEach((container) => {
      if (targetContent === 'all' || container.getAttribute('data-content') === targetContent) {
        container.style.display = 'block';
      } else {
        container.style.display = 'none';
      }
    });
  });
});


// Add to cart

document.addEventListener('DOMContentLoaded', function() {
  const cartItems = document.getElementById('cart-items');

  cartItems.addEventListener('click', function(event) {
    if (event.target.classList.contains('increase-btn')) {
      updateItemCount(event.target, 1);
    } else if (event.target.classList.contains('decrease-btn')) {
      updateItemCount(event.target, -1);
    }
  });

  function updateItemCount(button, change) {
    const cartItem = button.closest('.cart-item');
    const countElem = cartItem.querySelector('.item-count');
    let count = parseInt(countElem.textContent, 10);
    
    count += change;

    if (count <= 0) {
      cartItem.remove();  // Remove item if count is 0 or less
    } else {
      countElem.textContent = count;
    }
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const cartButton = document.getElementById('cart-button');
  const cart = document.getElementById('cart');
  const closeCartButton = document.getElementById('close-cart');
  const cartItemsContainer = document.getElementById('cart-items');
  let cartItems = [];

  // Toggle cart visibility
  cartButton.addEventListener('click', () => {
      cart.classList.toggle('open');
  });

  closeCartButton.addEventListener('click', () => {
      cart.classList.remove('open');
  });

  // Handle adding to cart
  document.querySelectorAll('.for').forEach(button => {
      button.addEventListener('click', (e) => {
          const productId = e.target.getAttribute('data-id');
          const productName = e.target.getAttribute('data-name');
          const productImage = e.target.getAttribute('data-image');

          const existingItemIndex = cartItems.findIndex(item => item.id === productId);

          if (existingItemIndex === -1) {
              cartItems.push({ id: productId, name: productName, image: productImage, quantity: 1 });
          } else {
              cartItems[existingItemIndex].quantity += 1;
          }
          updateCart();
      });
  });

  // Update cart UI
  function updateCart() {
      cartItemsContainer.innerHTML = '';
      cartItems.forEach(item => {
          const cartItem = document.createElement('div');
          cartItem.className = 'cart-item';
          cartItem.innerHTML = `
              <img src="${item.image}" alt="${item.name}">
              <span>${item.name}</span>
              <button class="decrease-btn" data-id="${item.id}">-</button>
              <span class="item-count">${item.quantity}</span>
              <button class="increase-btn" data-id="${item.id}">+</button>
              <button class="remove-item" data-id="${item.id}">Remove</button>
          `;
          cartItemsContainer.appendChild(cartItem);
      });

      // Update cart button count with icon
      cartButton.innerHTML = `<i class="fas fa-shopping-bag"></i> (${cartItems.length})`;

      // Add remove item functionality
      document.querySelectorAll('.remove-item').forEach(button => {
          button.addEventListener('click', (e) => {
              const productId = e.target.getAttribute('data-id');
              cartItems = cartItems.filter(item => item.id !== productId);
              updateCart();
          });
      });

      // Add increase and decrease functionality
      document.querySelectorAll('.increase-btn').forEach(button => {
          button.addEventListener('click', (e) => {
              const productId = e.target.getAttribute('data-id');
              const itemIndex = cartItems.findIndex(item => item.id === productId);
              cartItems[itemIndex].quantity += 1;
              updateCart();
          });
      });

      document.querySelectorAll('.decrease-btn').forEach(button => {
          button.addEventListener('click', (e) => {
              const productId = e.target.getAttribute('data-id');
              const itemIndex = cartItems.findIndex(item => item.id === productId);
              cartItems[itemIndex].quantity -= 1;
              if (cartItems[itemIndex].quantity <= 0) {
                  cartItems.splice(itemIndex, 1);
              }
              updateCart();
          });
      });
  }
});





