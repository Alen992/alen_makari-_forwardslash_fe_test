let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("slider__slide");
    const dots = document.getElementsByClassName("slider__dot");
    const sliderImg = document.querySelector('.slider__img');
    const hoverPrev = document.querySelector('.slider__arrow--1').children[1].children[0];
    const hoverNext = document.querySelector('.slider__arrow--2').children[1].children[0];

    hoverPrev.src = `./dist/img/watch-small-${n - 1}.png`;
    hoverNext.src = `./dist/img/watch-small-${n + 1}.png`;


    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    sliderImg.src = `./dist/img/watch-${n}.png`;


}