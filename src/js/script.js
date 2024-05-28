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



// Filter color options
function generateColorOptions() {
	const colors = ['red', 'orange', 'yellow', 'green', 'turquoise', 'blue', 'lilac', 'pink', 'white'];
	const colorOptionsContainer = document.querySelector('#colorOptions');
	
	colors.forEach(color => {
	  const colorOption = document.createElement('div');
	  colorOption.classList.add('color-option');
	  colorOption.dataset.color = color;
	  colorOption.textContent = color.charAt(0).toUpperCase() + color.slice(1); // Capitalize the color name
	  colorOptionsContainer.appendChild(colorOption);
	  
	  colorOption.addEventListener('click', () => {
		 colorInput.value = colorOption.textContent;
		 filterByColor(color);
	  });
	});
 }
 
 
 generateColorOptions();
 
 
 colorInput.addEventListener('focus', () => {
	document.querySelector('#colorOptions').style.display = 'block';
 });
 
 
 colorInput.addEventListener('blur', () => {
	setTimeout(() => {
	  document.querySelector('#colorOptions').style.display = 'none';
	}, 200);
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
  const selectedColor = document.querySelector('#colorInput').dataset.color || ''; 
  fetchImages('latest', selectedColor ? [selectedColor] : []); 
});


document.querySelector('#popularBtn').addEventListener('click', () => {
  document.querySelector('#latestBtn').classList.remove('active');
  document.querySelector('#popularBtn').classList.add('active');
  const selectedColor = document.querySelector('#colorInput').dataset.color || ''; 
  fetchImages('popular', selectedColor ? [selectedColor] : []); 
});


document.querySelector('#searchInput').addEventListener('input', () => {
	const searchQuery = document.querySelector('#searchInput').value.trim();
	if (searchQuery !== '') {
	  fetchImages('popular', [], searchQuery); 
	}
 });


// Fetch flower images from Pixabay API
const apiKey = '43903649-3af8d9c83249b581b93925d84';
const perPage = 6;
let currentPage = 1;

function fetchImages(order, colors, searchQuery) {
  const colorParams = colors.length > 0 ? `&colors=${colors.join(',')}` : '';
  const searchParams = searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : '';
  const url = `https://pixabay.com/api/?key=${apiKey}&q=flowers&order=${order}&per_page=${perPage}&page=${currentPage}${colorParams}${searchParams}`;

  fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        displayImages(data.hits);
    })
    .catch(error => {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'An error occurred while fetching images. Please try again later.';
        document.body.appendChild(errorMessage);
    });
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

		 const formDataObj = {};
		 const formData = new FormData(contactForm);
		 for (const [key, value] of formData.entries()) {
			  formDataObj[key] = value;
		 }
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
