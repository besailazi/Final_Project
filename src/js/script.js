// Fetch flower images from Unsplash API
function fetchFlowerImages() {
	const accessKey = 'AK1DjGs2S4HX5NHqMrYKl9-7EKhcTDtcPSHoFETjXbs'; 
	const apiUrl = `https://api.unsplash.com/photos/random?query=flower&count=6&client_id=${accessKey}`;

	fetch(apiUrl)
		  .then(response => response.json())
		  .then(data => {
				 const galleryContainer = document.querySelector('.gallery-container');
				 data.forEach(photo => {
						 const img = document.createElement('img');
						 img.src = photo.urls.regular;
						 img.alt = photo.alt_description;
						 galleryContainer.appendChild(img);
				 });
		  })
		  .catch(error => console.error('Error fetching flower images:', error));
}

// Call the function to fetch flower images when the page loads
window.addEventListener('load', fetchFlowerImages); 


// Sidebar for cart items
document.addEventListener("DOMContentLoaded", function() {
	const selectButtons = document.querySelectorAll('.select-btn');
	const cartSidebar = document.querySelector('.cart-sidebar');
	const closeSidebarButton = document.querySelector('.close-button');
	const checkoutButton = document.querySelector('.checkout-button');
	const cartContent = document.querySelector('.cart-content');
	const cartTotal = document.querySelector('.cart-total');
	const cartIcon = document.querySelector('.fa-shopping-cart');
	const cartItemCount = cartIcon.querySelector('span');

	let totalAmount = 0;
	let itemCount = 0;

	function removeItemFromCart(item) {
		const priceElement = item.querySelector('p:nth-child(2)');
		const price = parseFloat(priceElement.textContent.replace('$', ''));
		totalAmount -= price;
		itemCount--;
		cartTotal.textContent = totalAmount.toFixed(2);
		cartItemCount.textContent = itemCount;
		item.remove();
  }
    
  cartIcon.addEventListener('click', function() {
	cartSidebar.classList.toggle('show');
});

	// Function to add item to cart
	function addItemToCart(title, price) {
		 const item = document.createElement('div');
		 item.classList.add('cart-item');
		 item.innerHTML = `
			  <p>${title}</p>
			  <p>${price}</p>
			  <button class="remove-btn">Remove</button>
		 `;
		 cartContent.appendChild(item);

		 // Event listener for remove button
		 const removeButton = item.querySelector('.remove-btn');
		 removeButton.addEventListener('click', function() {
			  removeItemFromCart(item);
		 });
		 

		 // Update total amount and item count
		 totalAmount += parseFloat(price.replace('$', ''));
		 itemCount++;
		 cartTotal.textContent = totalAmount.toFixed(2);
		 cartItemCount.textContent = itemCount;
	}

	// Event listener for select buttons
	selectButtons.forEach(button => {
		 button.addEventListener('click', function() {
			  const cardBody = this.closest('.card-body');
			  const title = cardBody.querySelector('.card-title h2').innerText;
			  const price = cardBody.querySelector('.card-price h3').innerText;
			  addItemToCart(title, price);
			  cartSidebar.classList.add('show');
		 });
	});

	// Event listener for close button
	closeSidebarButton.addEventListener('click', function() {
		 cartSidebar.classList.remove('show');
	});

	// Event listener for checkout button
	checkoutButton.addEventListener('click', function() {
		 // Implement your checkout functionality here
		 alert('Checkout clicked!');
	});
});

document.addEventListener("DOMContentLoaded", function() {
	const shopNowButton = document.querySelector('.home .btn');
	const productsSection = document.getElementById('products');

	// Event listener for "Shop Now" button
	shopNowButton.addEventListener('click', function(event) {
		 event.preventDefault();
		 productsSection.scrollIntoView({ behavior: 'smooth' });
	});
});


  

