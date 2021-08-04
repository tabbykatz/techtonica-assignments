// main.js > index.js, call the entire thing as a function kinda like react
(function() {
  "use strict";



  /* selector helper function for elements*/
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

 /* event listener helper function for one or more elements to add to*/
  const upon = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

 /* scrolling event */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /* navbar on scroll (from aos)*/
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })

  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)
/* header scroll (from aos) */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /* back to top hide icon*/
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

 /* mobile nav */
  upon('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /* more scroll */
  upon('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)


  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

 /* loading circle */
  let loading = select('#loading');
  if (loading) {
    window.addEventListener('load', () => {
      loading.remove()
    });
  }

  /* typer */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /* filtering types in portfolio using isotope */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-filters li', true);

      upon('click', '#portfolio-filters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /* lightbox */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /* animate on scroll */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

    /* console log the form data */

    let submitButton = select('#submit');
    submitButton.addEventListener('click', function(event) {
      const listEls = [];
      let firstName = select('#firstName').value;
      let lastName = select('#lastName').value;
      let email = select('#email').value;
      let phone = select('#phone').value;


      let address = select('#address1').value;
      let city = select('#city').value;
      let state = select('#state').value;
      let zip = select('#zip').value;

      let msg = `Thanks for giving me all your personal information, ${firstName} ${lastName}! Here's what you gave me:\n
      ${firstName} ${lastName}\n${email}\n${phone}\n${address}\n${city}\n${state}\n${zip}`
      console.log(msg);
      event.preventDefault();
      }

    )
})()


