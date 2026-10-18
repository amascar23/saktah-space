/**
 * SAKTAH SPACE — OFFICIAL JAVASCRIPT & INTERACTIONS
 * Direction: Quiet Confidence
 * Technology: Vanilla JavaScript (ES6+), Zero External Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. RESPONSIVE MOBILE NAVIGATION
  // =========================================================================
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const siteNav = document.getElementById('site-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && siteNav) {
    const toggleNav = (open) => {
      const isOpen = open !== undefined ? open : !siteNav.classList.contains('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      siteNav.classList.toggle('is-open', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
    };

    navToggle.addEventListener('click', () => {
      toggleNav();
    });

    // Tutup menu saat pengguna mengklik link navigasi
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (siteNav.classList.contains('is-open')) {
          toggleNav(false);
        }
      });
    });

    // Tutup menu saat menekan tombol Escape (Aksesibilitas Keyboard)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
        toggleNav(false);
        navToggle.focus();
      }
    });

    // Tutup menu jika layar di-resize ke ukuran desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 992 && siteNav.classList.contains('is-open')) {
        toggleNav(false);
      }
    });
  }

  // =========================================================================
  // 2. PORTFOLIO CATEGORY FILTERING
  // =========================================================================
  const filterBtns = document.querySelectorAll('.portfolio-filters .filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-grid .portfolio-card');

  if (filterBtns.length > 0 && portfolioCards.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const selectedFilter = btn.getAttribute('data-filter');

        // Perbarui status aksesibilitas dan tombol aktif
        filterBtns.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Filter kartu portofolio
        portfolioCards.forEach((card) => {
          const cardCategory = card.getAttribute('data-category');
          if (selectedFilter === 'all' || cardCategory === selectedFilter) {
            card.classList.remove('is-hidden');
            // Sedikit delay mikro untuk efek transisi mulus
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  // =========================================================================
  // 3. FAQ ACCORDION (ENHANCED SINGLE-EXPAND INTERACTION)
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-accordion-list .faq-item');

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      item.addEventListener('toggle', () => {
        // Jika item ini baru dibuka, tutup item lain agar tampilan tetap rapi
        if (item.open) {
          faqItems.forEach((otherItem) => {
            if (otherItem !== item && otherItem.open) {
              otherItem.removeAttribute('open');
            }
          });
        }
      });
    });
  }

  // =========================================================================
  // 4. DARK MODE TOGGLE (PERSISTED & RESPECTS SYSTEM PREFERENCES)
  // =========================================================================
  const themeToggle = document.getElementById('themeToggle');
  const THEME_STORAGE_KEY = 'saktah_space_theme';

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeToggle) {
        themeToggle.setAttribute('aria-label', 'Beralih ke mode terang');
        themeToggle.setAttribute('title', 'Mode Terang');
      }
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeToggle) {
        themeToggle.setAttribute('aria-label', 'Beralih ke mode gelap');
        themeToggle.setAttribute('title', 'Mode Gelap');
      }
    }
  };

  // Inisialisasi tema awal: cek localStorage, fallback ke prefers-color-scheme
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (systemPrefersDark) {
    applyTheme('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    });
  }

  // =========================================================================
  // 5. LIGHTWEIGHT SCROLL REVEAL ANIMATIONS (WITH REDUCED-MOTION RESPECT)
  // =========================================================================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealTargets = document.querySelectorAll(
    '.service-card, .portfolio-card, .why-card, .timeline-step, .pricing-card, .testimonial-card, .faq-item'
  );

  if (!prefersReducedMotion && 'IntersectionObserver' in window && revealTargets.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealTargets.forEach((target) => {
      target.classList.add('reveal-item');
      revealObserver.observe(target);
    });
  } else {
    // Jika reduced motion aktif atau observer tidak didukung, pastikan elemen langsung tampil penuh
    revealTargets.forEach((target) => {
      target.classList.add('revealed');
    });
  }

  // =========================================================================
  // 6. WHATSAPP & CONTACT PLACEHOLDER MODAL NOTICE
  // =========================================================================
  const noticeModal = document.getElementById('contactNoticeModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalConfirmBtn = document.getElementById('modalConfirmBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');

  const openNoticeModal = (message) => {
    if (!noticeModal) return;
    if (message) {
      const modalBody = document.getElementById('modalBodyText');
      if (modalBody) {
        modalBody.innerHTML = `
          <p>${message}</p>
          <p class="modal-subtext">Untuk kebutuhan konsultasi dan diskusi proyek saat ini, Anda dapat mengirimkan email resmi ke <strong>halo@saktah.space</strong> atau kembali berkunjung saat nomor resmi telah dipublikasikan.</p>
        `;
      }
    }
    noticeModal.classList.add('is-active');
    noticeModal.setAttribute('aria-hidden', 'false');
    if (modalConfirmBtn) modalConfirmBtn.focus();
  };

  const closeNoticeModal = () => {
    if (!noticeModal) return;
    noticeModal.classList.remove('is-active');
    noticeModal.setAttribute('aria-hidden', 'true');
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeNoticeModal);
  if (modalConfirmBtn) modalConfirmBtn.addEventListener('click', closeNoticeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeNoticeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && noticeModal && noticeModal.classList.contains('is-active')) {
      closeNoticeModal();
    }
  });

  // Intersep tautan WhatsApp yang masih berupa placeholder
  const waLinks = document.querySelectorAll('a[href*="wa.me"]');
  waLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && (href.includes('[Placeholder') || href.includes('PlaceholderNomorWhatsApp'))) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        openNoticeModal(
          'Nomor WhatsApp resmi Saktah Space saat ini sedang dalam proses finalisasi operasional dan belum terhubung ke tautan otomatis.'
        );
      });
    }
  });

  // =========================================================================
  // 7. CONSULTATION INQUIRY FORM (HONEST SUBMISSION LIMITATION)
  // =========================================================================
  const inquiryForm = document.getElementById('inquiryForm');
  const formFeedback = document.getElementById('formFeedback');

  if (inquiryForm && formFeedback) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validasi form native
      if (!inquiryForm.checkValidity()) {
        inquiryForm.reportValidity();
        return;
      }

      const clientName = document.getElementById('clientName')?.value || 'Mitra';

      // ATURAN INTEGRITAS: Jangan pernah menampilkan pesan sukses palsu ("Pesan terkirim")
      // ketika belum ada backend pengiriman riil yang terkonfigurasi.
      formFeedback.className = 'form-feedback notice is-visible';
      formFeedback.innerHTML = `
        <strong>Pemberitahuan Sistem (Belum Ada Layanan Pengiriman Terpasang):</strong><br>
        Halo ${clientName}, terima kasih atas ketertarikan Anda. Formulir ini saat ini 
        <strong>belum terhubung ke backend pengiriman pesan otomatis</strong> 
        (layanan formulir pihak ketiga seperti Formspree, EmailJS, atau API server belum dikonfigurasi).<br><br>
        <em>Pesan Anda belum terkirim.</em> Untuk mengajukan konsultasi atau penawaran resmi saat ini, 
        silakan kirimkan email langsung ke <strong>halo@saktah.space</strong> dengan rincian kebutuhan Anda.
      `;

      formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // =========================================================================
  // 8. ACTIVE NAVIGATION LINK ON SCROLL (SPY NAVIGATION)
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              const href = link.getAttribute('href');
              if (href === `#${currentId}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      },
      {
        threshold: 0.3
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  console.log('Saktah Space interactive systems initialized successfully.');
});
