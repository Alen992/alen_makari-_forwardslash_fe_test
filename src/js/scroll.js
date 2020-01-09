(function () {
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.nav');
        if (window.pageYOffset > 10) {
            nav.classList.add('nav__scrolled');
        } else {
            nav.classList.remove('nav__scrolled');
        }
    })

})();