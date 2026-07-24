(() => {
  const root = document.documentElement;
  const body = document.body;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  const getLang = () => root.dataset.lang === 'en' ? 'en' : 'de';

  function setLanguage(language) {
    const lang = language === 'en' ? 'en' : 'de';
    root.dataset.lang = lang;
    root.lang = lang;

    document.querySelectorAll('.lang-toggle').forEach((button) => {
      button.dataset.current = lang;
      button.setAttribute(
        'aria-label',
        lang === 'de' ? 'Switch language to English' : 'Sprache auf Deutsch ändern'
      );
    });

    try {
      localStorage.setItem('dickheads-lang', lang);
    } catch {}
  }

  setLanguage(getLang());

  document.querySelectorAll('.lang-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      setLanguage(getLang() === 'de' ? 'en' : 'de');
    });
  });

  const header = document.querySelector('.site-header');
  const updateHeader = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const menuButton = document.querySelector('.menu-trigger');
  const navigation = document.querySelector('.nav-overlay');

  function setMenu(open) {
    if (!menuButton || !navigation) return;
    body.classList.toggle('nav-open', open);
    navigation.classList.toggle('is-open', open);
    navigation.setAttribute('aria-hidden', String(!open));
    menuButton.setAttribute('aria-expanded', String(open));
  }

  menuButton?.addEventListener('click', () => {
    setMenu(!body.classList.contains('nav-open'));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  if (finePointer && !reducedMotion) {
    let cursorX = -100;
    let cursorY = -100;
    let renderedX = -100;
    let renderedY = -100;

    document.addEventListener('pointermove', (event) => {
      cursorX = event.clientX;
      cursorY = event.clientY;
      root.style.setProperty('--pointer-x', `${event.clientX}px`);
      root.style.setProperty('--pointer-y', `${event.clientY}px`);
    }, { passive: true });

    const renderCursor = () => {
      renderedX += (cursorX - renderedX) * 0.24;
      renderedY += (cursorY - renderedY) * 0.24;
      root.style.setProperty('--cursor-x', `${renderedX}px`);
      root.style.setProperty('--cursor-y', `${renderedY}px`);
      requestAnimationFrame(renderCursor);
    };
    renderCursor();

    const cursor = document.querySelector('.cursor');
    document.querySelectorAll('a, button, summary, select, input, textarea').forEach((element) => {
      element.addEventListener('pointerenter', () => cursor?.classList.add('is-hovering'));
      element.addEventListener('pointerleave', () => cursor?.classList.remove('is-hovering'));
    });

    document.querySelectorAll('.magnetic').forEach((element) => {
      element.addEventListener('pointermove', (event) => {
        const bounds = element.getBoundingClientRect();
        const x = event.clientX - bounds.left - bounds.width / 2;
        const y = event.clientY - bounds.top - bounds.height / 2;
        element.style.transform = `translate3d(${x * 0.16}px, ${y * 0.16}px, 0)`;
      });
      element.addEventListener('pointerleave', () => {
        element.style.transform = '';
      });
    });
  }

  if (!reducedMotion) {
    document.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return;
      const ripple = document.createElement('i');
      ripple.className = 'click-ripple';
      ripple.style.left = `${event.clientX}px`;
      ripple.style.top = `${event.clientY}px`;
      document.body.append(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  }

  document.querySelectorAll('[data-tilt-card]').forEach((card) => {
    if (!finePointer || reducedMotion) return;
    const visual = card.querySelector('.product-visual');
    const object = card.querySelector('.object-form');

    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      const px = (event.clientX - bounds.left) / bounds.width - 0.5;
      const py = (event.clientY - bounds.top) / bounds.height - 0.5;
      visual?.style.setProperty('--tilt-x', `${px * 7}deg`);
      visual?.style.setProperty('--tilt-y', `${py * -6}deg`);
      object?.style.setProperty('--object-ry', `${px * 24}deg`);
      object?.style.setProperty('--object-rx', `${py * -14}deg`);
    });

    card.addEventListener('pointerleave', () => {
      visual?.style.removeProperty('--tilt-x');
      visual?.style.removeProperty('--tilt-y');
      object?.style.removeProperty('--object-ry');
      object?.style.removeProperty('--object-rx');
    });
  });

  const detailStage = document.querySelector('[data-detail-stage]');
  if (detailStage && finePointer && !reducedMotion) {
    const object = detailStage.querySelector('.object-form');
    detailStage.addEventListener('pointermove', (event) => {
      const bounds = detailStage.getBoundingClientRect();
      const px = (event.clientX - bounds.left) / bounds.width - 0.5;
      const py = (event.clientY - bounds.top) / bounds.height - 0.5;
      object?.style.setProperty('--object-ry', `${px * 46}deg`);
      object?.style.setProperty('--object-rx', `${py * -24}deg`);
    });
    detailStage.addEventListener('pointerleave', () => {
      object?.style.removeProperty('--object-ry');
      object?.style.removeProperty('--object-rx');
    });
  }

  const parade = document.querySelector('[data-parade]');
  if (parade) {
    const info = parade.querySelector('.parade-info');
    const title = parade.querySelector('[data-parade-title]');
    const code = parade.querySelector('[data-parade-code]');
    const de = parade.querySelector('[data-parade-summary-de]');
    const en = parade.querySelector('[data-parade-summary-en]');
    let changeTimer;

    const selectParadeItem = (item) => {
      parade.querySelectorAll('[data-parade-item]').forEach((candidate) => {
        candidate.classList.toggle('is-active', candidate === item);
      });

      info?.classList.add('is-changing');
      clearTimeout(changeTimer);
      changeTimer = window.setTimeout(() => {
        if (title) title.textContent = item.dataset.title || '';
        if (code) code.textContent = item.dataset.code || '';
        if (de) de.textContent = item.dataset.summaryDe || '';
        if (en) en.textContent = item.dataset.summaryEn || '';
        info?.classList.remove('is-changing');
      }, reducedMotion ? 0 : 120);
    };

    parade.querySelectorAll('[data-parade-item]').forEach((item) => {
      item.addEventListener('pointerenter', () => selectParadeItem(item));
      item.addEventListener('focus', () => selectParadeItem(item));
    });
  }

  const catalogue = document.querySelector('[data-catalogue]');
  if (catalogue) {
    const buttons = catalogue.querySelectorAll('[data-filter]');
    const items = catalogue.querySelectorAll('[data-catalogue-item]');
    const empty = catalogue.querySelector('[data-catalogue-empty]');

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        let visible = 0;

        buttons.forEach((candidate) => candidate.classList.toggle('is-active', candidate === button));
        items.forEach((item) => {
          const show = filter === 'all' || item.dataset.status === filter;
          item.hidden = !show;
          if (show) visible += 1;
        });

        if (empty) empty.hidden = visible !== 0;
      });
    });
  }

  const inquiryForm = document.querySelector('[data-inquiry-form]');
  if (inquiryForm) {
    const params = new URLSearchParams(window.location.search);
    const subjectInput = inquiryForm.querySelector('[name="subject"]');
    const objectInput = inquiryForm.querySelector('[name="object"]');
    const subject = params.get('subject');
    const object = params.get('object');

    if (subject && subjectInput?.querySelector(`option[value="${CSS.escape(subject)}"]`)) {
      subjectInput.value = subject;
    }
    if (object && objectInput?.querySelector(`option[value="${CSS.escape(object)}"]`)) {
      objectInput.value = object;
      subjectInput.value = 'object';
    }

    inquiryForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const message = inquiryForm.querySelector('[data-form-message]');

      if (!inquiryForm.checkValidity()) {
        inquiryForm.reportValidity();
        if (message) {
          message.textContent = getLang() === 'de'
            ? 'BITTE DIE MARKIERTEN FELDER AUSFÜLLEN.'
            : 'PLEASE COMPLETE THE REQUIRED FIELDS.';
        }
        return;
      }

      const data = new FormData(inquiryForm);
      const selectedObject = objectInput?.selectedOptions?.[0]?.textContent?.trim() || 'None';
      const mailSubject = `dickheads inquiry — ${selectedObject}`;
      const mailBody = [
        `Name: ${data.get('name')}`,
        `Email: ${data.get('email')}`,
        `Subject: ${data.get('subject')}`,
        `Object: ${selectedObject}`,
        '',
        String(data.get('message') || '')
      ].join('\n');

      if (message) {
        message.textContent = getLang() === 'de'
          ? 'MAILPROGRAMM WIRD GEÖFFNET …'
          : 'OPENING YOUR EMAIL APP …';
      }

      window.location.href =
        `mailto:studio@dickheads.shop?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
    });
  }

  const clock = document.querySelector('[data-chaos-clock]');
  if (clock) {
    const updateClock = () => {
      try {
        clock.textContent = new Intl.DateTimeFormat('de-DE', {
          timeZone: 'Europe/Berlin',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }).format(new Date());
      } catch {
        clock.textContent = 'NOW';
      }
    };
    updateClock();
    window.setInterval(updateClock, 30000);
  }

  if (!reducedMotion) {
    const wipe = document.querySelector('.page-wipe');
    document.querySelectorAll('a[href]').forEach((link) => {
      link.addEventListener('click', (event) => {
        if (
          event.defaultPrevented ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          link.target === '_blank' ||
          link.hasAttribute('download')
        ) return;

        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

        const url = new URL(link.href, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (url.pathname === window.location.pathname && url.hash) return;

        event.preventDefault();
        wipe?.classList.add('is-leaving');
        window.setTimeout(() => {
          window.location.href = url.href;
        }, 470);
      });
    });
  }
})();
