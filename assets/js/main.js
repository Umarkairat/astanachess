document.addEventListener('DOMContentLoaded', () => {
  // --- HEADER SCROLL EFFECT ---
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.add('scrolled');
      }
    });
    // Set initially
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    }
  }

  // --- MOBILE NAV MENU ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const active = navLinks.classList.toggle('active');
      menuToggle.innerHTML = active ? '&#x2715;' : '&#x2630;'; // Close symbol vs Hamburger
    });

    // Close menu when clicking links
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '&#x2630;';
      });
    });
    // Clone callback button into mobile menu
    const headerCallbackBtn = document.getElementById('header-callback-btn');
    if (headerCallbackBtn) {
      const mobileBtn = headerCallbackBtn.cloneNode(true);
      mobileBtn.id = 'mobile-callback-btn';
      mobileBtn.style.display = 'block';
      mobileBtn.style.width = '100%';
      mobileBtn.style.textAlign = 'center';
      
      const li = document.createElement('li');
      li.style.marginTop = '20px';
      li.appendChild(mobileBtn);
      navLinks.appendChild(li);
    }
  }

  // --- CALLBACK MODAL ---
  const modalOverlay = document.getElementById('callback-modal');
  const modalClose = document.getElementById('modal-close');
  const modalTriggers = document.querySelectorAll('.open-modal');
  
  if (modalOverlay) {
    // Open modal
    modalTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock scroll
      });
    });

    // Close modal
    const closeModal = () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Unlock scroll
    };

    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    // Handle form submit (simulated success)
    const modalForm = modalOverlay.querySelector('form');
    const modalContainer = modalOverlay.querySelector('.modal-container');
    const modalPhone = document.getElementById('modal-phone');

    // Simple phone mask
    if (modalPhone) {
      modalPhone.addEventListener('input', function (e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        if (!x[1]) { e.target.value = '+7'; return; }
        if (x[1] !== '7' && x[1] !== '8') {
          x[1] = '7';
        }
        e.target.value = !x[2] ? '+7' : '+7 (' + x[2] + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
      });
    }

    if (modalForm) {
      modalForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = modalForm.querySelector('button[type="submit"]');
        const nameInput = document.getElementById('modal-name');
        const phoneInput = document.getElementById('modal-phone');
        
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Отправка...';
        submitBtn.disabled = true;

        const nameValue = nameInput ? nameInput.value.trim() : '';
        const phoneValue = phoneInput ? phoneInput.value.trim() : '';
        
        const message = `*Новая заявка: Центральный Шахматный Клуб!*\nИмя: ${nameValue}\nТелефон: ${phoneValue}`;
        
        // Отправка через Green API
        try {
          await fetch('https://7107.api.greenapi.com/waInstance7107644784/sendMessage/9d1735067fa743a3a923d8d955dddac72e1666d9b1e442f38e', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              chatId: '77785772516@c.us',
              message: message
            })
          });
        } catch (error) {
          console.error('Ошибка отправки в Green API:', error);
        }

        // Replace modal content with success message
        const originalContent = modalContainer.innerHTML;
          modalContainer.innerHTML = `
            <button class="modal-close" id="modal-close-success" aria-label="Закрыть">&times;</button>
            <div style="text-align: center; padding: 30px 10px;">
              <svg style="width: 80px; height: 80px; fill: var(--success); margin-bottom: 20px;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <h3 class="modal-title" style="color: var(--primary-gold); margin-bottom: 10px;">Заявка принята!</h3>
              <p style="color: var(--primary-gold); opacity: 0.9; font-size: 1.1rem; line-height: 1.5;">Спасибо, ваше обращение успешно отправлено.<br>Наш менеджер свяжется с вами в течение 15 минут.</p>
              <button class="btn btn-primary" id="modal-ok-btn" style="margin-top: 30px; width: 100%;">Отлично</button>
            </div>
          `;
          
          const closeSuccess = () => {
            closeModal();
            setTimeout(() => {
              modalContainer.innerHTML = originalContent; // Restore form for next time
              // Re-attach close listener to the original close button
              const newCloseBtn = document.getElementById('modal-close');
              if (newCloseBtn) newCloseBtn.addEventListener('click', closeModal);
              // Re-attach form listener (by reloading the page or we just let it be since it's a demo)
              // Actually, better to just reload the page or let the user navigate. 
              // Since it's just a UI demo, restoring HTML means we lose event listeners on the form.
              window.location.reload(); 
            }, 300);
          };

          document.getElementById('modal-close-success').addEventListener('click', closeSuccess);
          document.getElementById('modal-ok-btn').addEventListener('click', closeSuccess);

      });
    }
  }

  // --- COACHES FILTER SYSTEM ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const filterableItems = document.querySelectorAll('.trainer-card, .trainer-section-title');

  if (filterButtons.length > 0 && filterableItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const category = button.getAttribute('data-filter');

        filterableItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          
          if (category === 'all' || itemCategory === category) {
            item.style.display = item.classList.contains('trainer-section-title') ? 'block' : 'flex';
            // Trigger animation
            item.style.animation = 'none';
            item.offsetHeight; // Force reflow
            item.style.animation = 'fadeIn 0.4s ease-out forwards';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // --- DETAILS ACCORDION ANIMATION ---
  // Beautiful smooth transition for details/summary (Optional improvement for older browsers, native CSS is fine)
  const detailsElements = document.querySelectorAll('details.faq-item');
  detailsElements.forEach(details => {
    const summary = details.querySelector('summary');
    const content = details.querySelector('.faq-content');

    summary.addEventListener('click', (e) => {
      // Accordion effect - close others
      detailsElements.forEach(el => {
        if (el !== details && el.hasAttribute('open')) {
          el.removeAttribute('open');
        }
      });
    });
  });
  
  // --- GOOGLE TRANSLATE INTEGRATION ---
  const langButtons = document.querySelectorAll('.lang-switcher a');
  
  // Inject Google Translate script and element
  window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
      pageLanguage: 'ru',
      includedLanguages: 'ru,kk,en',
      autoDisplay: false
    }, 'google_translate_element');
  };

  const gtScript = document.createElement('script');
  gtScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.body.appendChild(gtScript);

  const gtDiv = document.createElement('div');
  gtDiv.id = 'google_translate_element';
  gtDiv.style.display = 'none';
  document.body.appendChild(gtDiv);

  const setLanguage = (langText) => {
    let langCode = 'ru';
    if (langText === 'kz') langCode = 'kk';
    if (langText === 'en') langCode = 'en';

    // Save choice
    localStorage.setItem('site_lang_gt', langCode);

    if (langCode === 'ru') {
      // Revert to original
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=' + window.location.hostname + '; path=/';
      // Click original banner close button if it exists
      const frame = document.querySelector('.goog-te-banner-frame');
      if (frame) {
          const innerDoc = frame.contentDocument || frame.contentWindow.document;
          const closeBtn = innerDoc.getElementById('restore');
          if (closeBtn) closeBtn.click();
      }
      setTimeout(() => window.location.reload(), 100);
      return;
    }

    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = langCode;
      combo.dispatchEvent(new Event('change'));
    }
  };

  if (langButtons.length > 0) {
    langButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update active class immediately on click
        langButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const langText = btn.innerText.toLowerCase().trim();
        setLanguage(langText);
      });
    });

    // Initialize active class on load based on cookie
    const gtCookie = document.cookie.split('; ').find(row => row.startsWith('googtrans='));
    let activeLang = 'ru';
    if (gtCookie) {
      if (gtCookie.includes('/kk')) activeLang = 'kz';
      if (gtCookie.includes('/en')) activeLang = 'en';
    }
    
    langButtons.forEach(btn => {
      if (btn.innerText.toLowerCase().trim() === activeLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
  
  // --- SCROLL REVEAL ANIMATIONS ---
  const revealElements = document.querySelectorAll('.reveal-up, .bento-item, .card, .stat-box');
  // Add class by default to animate
  revealElements.forEach(el => el.classList.add('reveal-up'));
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => observer.observe(el));
});
