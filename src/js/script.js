
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
		const originalText = checkoutButton.textContent;

		checkoutButton.textContent = 'Processing Checkout...';
		setTimeout(function() {
			checkoutButton.textContent = originalText;
	  }, 2000); 
 });
	});


document.addEventListener("DOMContentLoaded", function() {
	const shopNowButton = document.querySelector('.home .btn');
	const productsSection = document.querySelector('#products');

	// Event listener for "Shop Now" button
	shopNowButton.addEventListener('click', function(event) {
		 event.preventDefault();
		 productsSection.scrollIntoView({ behavior: 'smooth' });
	});
});

// JavaScript to toggle color options visibility and select color
const colorInput = document.querySelector('#colorInput');
const colorOptions = document.querySelector('#colorOptions').querySelectorAll('.color-option');

colorInput.addEventListener('focus', () => {
  document.getElementById('colorOptions').style.display = 'block';
});

colorInput.addEventListener('blur', () => {
  setTimeout(() => {
    document.getElementById('colorOptions').style.display = 'none';
  }, 200); 
});

colorOptions.forEach(option => {
  option.addEventListener('click', () => {
    colorInput.value = option.textContent;
    
    filterByColor(option.dataset.color);
  });
});


function filterByColor(color) {
  const selectedColors = [color]; 
  const order = document.querySelector('#latestBtn').classList.contains('active') ? 'latest' : 'popular';
  fetchImages(order, selectedColors);
}

// Event listeners for sorting buttons (Latest and Popular)
document.querySelector('#latestBtn').addEventListener('click', () => {
  document.querySelector('#latestBtn').classList.add('active');
  document.querySelector('#popularBtn').classList.remove('active');
  const selectedColors = Array.from(document.querySelectorAll('#colorFilter option:checked')).map(option => option.value);
  fetchImages('latest', selectedColors);
});

document.getElementById('popularBtn').addEventListener('click', () => {
  document.getElementById('latestBtn').classList.remove('active');
  document.getElementById('popularBtn').classList.add('active');
  const selectedColors = Array.from(document.querySelectorAll('#colorFilter option:checked')).map(option => option.value);
  fetchImages('popular', selectedColors);
});

// Fetch flower images from Pixaby API
const apiKey = '43903649-3af8d9c83249b581b93925d84';
const perPage = 6;
let currentPage = 1;

function fetchImages(order, colors) {
  const colorParams = colors.length > 0 ? `&colors=${colors.join(',')}` : '';
  const url = `https://pixabay.com/api/?key=${apiKey}&q=flowers&order=${order}&per_page=${perPage}&page=${currentPage}${colorParams}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayImages(data.hits);
    })
    .catch(error => console.error('Error fetching images:', error));
}

function displayImages(images) {
  const imageContainer = document.querySelector('#galleryContainer');
  imageContainer.innerHTML = '';

  images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image.webformatURL;
    imageContainer.appendChild(imgElement);
  });
}

// Initial load
fetchImages('popular', []);