// Sidebar cart elements
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

	// Load cart from local storage
	function loadCart() {
		 const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
		 totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;
		 itemCount = parseInt(localStorage.getItem('itemCount')) || 0;

		 savedCart.forEach(item => {
			  addItemToCart(item.title, item.price, false);
		 });

		 cartTotal.textContent = totalAmount.toFixed(2);
		 cartItemCount.textContent = itemCount;
	}

	// Save cart to local storage
	function saveCart() {
		 const cartItems = [];
		 cartContent.querySelectorAll('.cart-item').forEach(item => {
			  const title = item.querySelector('p:nth-child(1)').textContent;
			  const price = item.querySelector('p:nth-child(2)').textContent;
			  cartItems.push({ title, price });
		 });
		 localStorage.setItem('cartItems', JSON.stringify(cartItems));
		 localStorage.setItem('totalAmount', totalAmount.toFixed(2));
		 localStorage.setItem('itemCount', itemCount.toString());
	}

	function removeItemFromCart(item) {
		 const priceElement = item.querySelector('p:nth-child(2)');
		 const price = parseFloat(priceElement.textContent.replace('$', ''));
		 totalAmount -= price;
		 itemCount--;
		 cartTotal.textContent = totalAmount.toFixed(2);
		 cartItemCount.textContent = itemCount;
		 item.remove();
		 saveCart();
	}

	cartIcon.addEventListener('click', function() {
		 cartSidebar.classList.toggle('show');
	});

	// Add item to cart
	function addItemToCart(title, price, increment = true) {
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
		 if (increment) {
			  totalAmount += parseFloat(price.replace('$', ''));
			  itemCount++;
		 }
		 cartTotal.textContent = totalAmount.toFixed(2);
		 cartItemCount.textContent = itemCount;

		 if (increment) {
			  saveCart();
		 }
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

	// Load cart from local storage on page load
	loadCart();
});





// Event listener for "Shop Now" button
document.addEventListener("DOMContentLoaded", function() {
	const shopNowButton = document.querySelector('.home .btn');
	const productsSection = document.querySelector('#products');

	shopNowButton.addEventListener('click', function(event) {
		 event.preventDefault();
		 productsSection.scrollIntoView({ behavior: 'smooth' });
	});
});



// Filter by color
const colorInput = document.querySelector('#colorInput');
const colorOptions = document.querySelector('#colorOptions').querySelectorAll('.color-option');

colorInput.addEventListener('focus', () => {
  document.querySelector('#colorOptions').style.display = 'block';
});

colorInput.addEventListener('blur', () => {
  setTimeout(() => {
    document.querySelector('#colorOptions').style.display = 'none';
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

document.querySelector('#popularBtn').addEventListener('click', () => {
  document.querySelector('#latestBtn').classList.remove('active');
  document.querySelector('#popularBtn').classList.add('active');
  const selectedColors = Array.from(document.querySelectorAll('#colorFilter option:checked')).map(option => option.value);
  fetchImages('popular', selectedColors);
});



// Fetch flower images from Pixabay API
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

fetchImages('popular', []);



// Slideshow for the contact section
let slideIndex = 0;
  showSlide(slideIndex);

  document.querySelector('.prev').addEventListener('click', () => {
    changeSlide(-1);
  });

  document.querySelector('.next').addEventListener('click', () => {
    changeSlide(1);
  });

  function changeSlide(n) {
    showSlide(slideIndex += n);
  }

  function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }
    slides.forEach(slide => slide.style.display = 'none');
    slides[slideIndex].style.display = 'block';
  }


// Contact form success message
document.addEventListener('DOMContentLoaded', function () {
	const contactForm = document.querySelector('.contactForm');
	const successMessage = document.querySelector('.success-message');

	contactForm.addEventListener('submit', function (e) {
		 e.preventDefault(); 

		 const formData = new FormData(contactForm);

		 const formDataObj = {};
		 formData.forEach(function(value, key){
			  formDataObj[key] = value;
		 });

		 // Convert object to string and save to local storage
		 localStorage.setItem('formData', JSON.stringify(formDataObj));

		 successMessage.style.display = 'block'; 
		 contactForm.reset(); 

		 setTimeout(function() {
			successMessage.style.display = 'none';
		}, 3000);
	});
});


// Button for scrolling to top
const scrollToTopButton = document.querySelector('.scrollToTopButton');

function handleScroll() {
  if (window.pageYOffset > 100) { 
    scrollToTopButton.style.display = 'block';
  } else {
    scrollToTopButton.style.display = 'none';
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' 
  });
}

window.addEventListener('scroll', handleScroll);

scrollToTopButton.addEventListener('click', scrollToTop);
