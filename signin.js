

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