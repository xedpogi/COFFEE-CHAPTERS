let cart = JSON.parse(localStorage.getItem("cart")) || [];


function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countSpans = document.querySelectorAll('#cart-count');
    countSpans.forEach(span => {
        span.innerText = totalItems;
    });
}

function showNotification(message) {
    const notif = document.createElement('div');
    notif.className = 'cart-notification';
    notif.innerText = message;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2000);
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    saveCart();
    updateCartCount();
    showNotification(`${name} added to cart!`);
}

function changeQuantity(name, amount) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].quantity += amount;
            if (cart[i].quantity <= 0) {
                removeFromCart(name);
                return;
            }
            break;
        }
    }
    saveCart();
    updateCartCount();
    updateCartDisplay();
}


function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    saveCart();
    updateCartCount();
    updateCartDisplay();
}


function updateCartDisplay() {
    var cartDiv = document.getElementById('cart');
    if (!cartDiv) return;

    cartDiv.innerHTML = '';

    if (cart.length === 0) {
        cartDiv.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    var ul = document.createElement('ul');
    var total = 0;

    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];

        var li = document.createElement('li');
        li.innerHTML = item.name + " - ₱" + item.price + " x " + item.quantity + " ";

        // Minus
        var minusBtn = document.createElement('button');
        minusBtn.innerText = "-";
        (function(nameCopy){
            minusBtn.onclick = function() {
                changeQuantity(nameCopy, -1);
            };
        })(item.name);

        // Plus 
        var plusBtn = document.createElement('button');
        plusBtn.innerText = "+";
        (function(nameCopy){
            plusBtn.onclick = function() {
                changeQuantity(nameCopy, 1);
            };
        })(item.name);

        // Remove button
        var removeBtn = document.createElement('button');
        removeBtn.innerText = "Remove";
        (function(nameCopy){
            removeBtn.onclick = function() {
                removeFromCart(nameCopy);
            };
        })(item.name);

        li.appendChild(minusBtn);
        li.appendChild(plusBtn);
        li.appendChild(removeBtn);

        ul.appendChild(li);

        total += item.price * item.quantity;
    }

    cartDiv.appendChild(ul);

    var totalP = document.createElement('p');
    totalP.innerHTML = "<strong>Total: ₱" + total + "</strong>";
    cartDiv.appendChild(totalP);
}


//checkoutttt
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    const paymentMethod = document.getElementById('payment-method').value;

    //4 name
    const nameInput = document.getElementById("name");
    const name = nameInput.value.trim();
    
    if (name === "") {
        alert("Please enter your reference number before chck out.");
        nameInput.focus();
        return;
    }

    //4 ref num
    const referenceInput = document.getElementById("reference-number");
    const reference = referenceInput.value.trim();
    
    if (reference === "") {
        alert("Please enter your reference number before chck out.");
        referenceInput.focus();
        return;
    }

    // 4 address

    const addressInput = document.getElementById("address");
    const address = addressInput.value.trim();
    
    if (address === "") {
        alert("Please enter your address before check out.");
        referenceInput.focus();
        return;
    }

    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    alert(
        "Payment Method: " + paymentMethod +
        "\nReference Number: " + reference +
        "\nTotal: ₱" + total +
        "\nThank you for your order!"
    );

    cart = [];
    saveCart();
    updateCartCount();
    updateCartDisplay();
}

function toggleMenu() {
    document.getElementById("side-menu").classList.toggle("open");
}


const contactForm = document.querySelector(".contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Your message has been sent!");
        contactForm.reset();
    });
}


document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.href === window.location.href) link.classList.add("active");
});


document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateCartDisplay();
});

function filterMenu() {
    const query = document.getElementById("menu-search").value.toLowerCase();

    // Get all category headers <h1> except the first "Our Menu"
    const categoryTitles = Array.from(document.querySelectorAll(".menu-section h1:not(:first-of-type)"));

    categoryTitles.forEach(title => {
        const categoryGrid = title.nextElementSibling; // menu-grid after each <h1>
        const cards = categoryGrid.querySelectorAll(".menu-card");
        let hasMatch = false;

        cards.forEach(card => {
            const itemName = card.querySelector("p:nth-of-type(2)").textContent.toLowerCase();

            if (itemName.includes(query)) {
                card.style.display = "block";
                hasMatch = true;
            } else {
                card.style.display = "none";
            }
        });

        // SHOW category only if it contains at least one matching item
        if (hasMatch) {
            title.style.display = "block";
            categoryGrid.style.display = "grid";
        } else {
            title.style.display = "none";
            categoryGrid.style.display = "none";
        }
    });
}


const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    dots[i].classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

setInterval(nextSlide, 2000);


function showSlide(index) {
  slides.forEach((s,i)=> s.classList.remove('active'));
  dots.forEach((d,i)=> d.classList.remove('active'));
  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    current = i;
    showSlide(current);
  });
});

setInterval(() => {
  current = (current + 4) % slides.length;
  showSlide(current);
}, 1500);

showSlide(current);
