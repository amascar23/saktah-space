/**
 * SAKTAH SPACE — OFFICIAL JAVASCRIPT & INTERACTIONS
 * Direction: Quiet Confidence
 * Technology: Vanilla JavaScript (ES6+), Zero External Dependencies
 */

// =========================================================================
// KONFIGURASI RESMI SAKTAH SPACE
// =========================================================================
const SAKTAH_WA_NUMBER = "6281234567890"; // Ganti dengan nomor WhatsApp aktif Saktah Space diawali 62

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

    // Tutup menu saat mengklik area di luar navigasi mobile
    document.addEventListener('click', (e) => {
      if (siteNav.classList.contains('is-open') && !siteNav.contains(e.target) && !navToggle.contains(e.target)) {
        toggleNav(false);
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
  // 2. PORTFOLIO CATEGORY FILTERING & CASE STUDY MODAL
  // =========================================================================
  const filterBtns = document.querySelectorAll('.portfolio-filters .filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-grid .portfolio-card');

  // Filter Kategori Portofolio (Animasi Transisi Lembut Fade-in)
  if (filterBtns.length > 0 && portfolioCards.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const selectedFilter = btn.getAttribute('data-filter');

        // Perbarui status aksesibilitas & tombol aktif
        filterBtns.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Saring kartu portofolio dengan efek transisi lembut
        portfolioCards.forEach((card) => {
          const cardCategory = card.getAttribute('data-category');
          const isMatch = selectedFilter === 'all' || cardCategory === selectedFilter;

          if (isMatch) {
            card.classList.remove('is-hidden');
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px)';
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                card.style.transition = 'opacity 300ms cubic-bezier(0.16, 1, 0.3, 1), transform 300ms cubic-bezier(0.16, 1, 0.3, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              });
            });
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  // Pop-up Detail Karya (Case Study Modal)
  const caseStudyModal = document.getElementById('caseStudyModal');
  const caseStudyBackdrop = document.getElementById('caseStudyBackdrop');
  const caseStudyCloseBtn = document.getElementById('caseStudyCloseBtn');
  const modalProjectCategory = document.getElementById('modalProjectCategory');
  const modalProjectTitle = document.getElementById('modalProjectTitle');
  const modalProjectChallenge = document.getElementById('modalProjectChallenge');
  const modalProjectSolution = document.getElementById('modalProjectSolution');
  const modalWaBtn = document.getElementById('modalWaBtn');

  const openCaseStudyModal = (card) => {
    if (!caseStudyModal || !card) return;

    const category = card.getAttribute('data-project-category') || 'Karya';
    const title = card.getAttribute('data-project-title') || card.querySelector('.portfolio-title')?.textContent || 'Detail Karya';
    const challenge = card.getAttribute('data-project-challenge') || 'Tantangan proyek berfokus pada pembangunan kredibilitas dan kejelasan identitas digital.';
    const solution = card.getAttribute('data-project-solution') || 'Saktah Space merancang solusi beretika dengan estetika modern yang tenang dan berdampak nyata.';
    const customWaText = card.getAttribute('data-project-wa') || `Halo Saktah Space, saya tertarik berdiskusi mengenai proyek serupa: ${title}`;

    if (modalProjectCategory) modalProjectCategory.textContent = category;
    if (modalProjectTitle) modalProjectTitle.textContent = title;
    if (modalProjectChallenge) modalProjectChallenge.textContent = challenge;
    if (modalProjectSolution) modalProjectSolution.textContent = solution;

    if (modalWaBtn) {
      modalWaBtn.href = `https://wa.me/${SAKTAH_WA_NUMBER}?text=${encodeURIComponent(customWaText)}`;
    }

    caseStudyModal.classList.add('is-active');
    caseStudyModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open'); // Mencegah scrolling latar belakang saat modal aktif

    if (caseStudyCloseBtn) caseStudyCloseBtn.focus();
  };

  const closeCaseStudyModal = () => {
    if (!caseStudyModal) return;
    caseStudyModal.classList.remove('is-active');
    caseStudyModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  };

  // Pasang listener pada seluruh kartu portofolio dan tombol detailnya
  portfolioCards.forEach((card) => {
    card.addEventListener('click', () => {
      openCaseStudyModal(card);
    });

    // Aksesibilitas keyboard (Enter / Spasi) pada kartu
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    const projectTitle = card.querySelector('.portfolio-title')?.textContent || '';
    card.setAttribute('aria-label', `Buka studi kasus ${projectTitle}`);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCaseStudyModal(card);
      }
    });
  });

  if (caseStudyCloseBtn) caseStudyCloseBtn.addEventListener('click', closeCaseStudyModal);
  if (caseStudyBackdrop) caseStudyBackdrop.addEventListener('click', closeCaseStudyModal);

  // Keyboard Escape untuk menutup modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && caseStudyModal && caseStudyModal.classList.contains('is-active')) {
      closeCaseStudyModal();
    }
  });

  // =========================================================================
  // 2B. PACKAGE SIMULATION MODAL (RINCIAN & SIMULASI PAKET DENGAN ESTIMATOR LIVE)
  // =========================================================================
  const packageSimulasiModal = document.getElementById('packageSimulasiModal');
  const simulasiBackdrop = document.getElementById('simulasiBackdrop');
  const simulasiCloseBtn = document.getElementById('simulasiCloseBtn');
  const simulasiTierTag = document.getElementById('simulasiTierTag');
  const simulasiModalTitle = document.getElementById('simulasiModalTitle');
  const simulasiPriceBadge = document.getElementById('simulasiPriceBadge');
  const simulasiModalDesc = document.getElementById('simulasiModalDesc');
  const simulasiDeliverablesList = document.getElementById('simulasiDeliverablesList');
  const simulasiLeadTime = document.getElementById('simulasiLeadTime');
  const simulasiRevision = document.getElementById('simulasiRevision');
  const simulasiGuarantee = document.getElementById('simulasiGuarantee');
  const simulasiWaBtn = document.getElementById('simulasiWaBtn');
  const simulasiTotalDisplay = document.getElementById('simulasiTotalDisplay');
  const addonChecks = packageSimulasiModal ? packageSimulasiModal.querySelectorAll('.simulasi-addon-check') : [];

  let currentBasePrice = 0;
  let currentPackageName = 'Paket Pilihan';

  const formatRupiah = (num) => 'Rp' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  const updateSimulasiCalculation = () => {
    let total = currentBasePrice;
    const selectedAddons = [];

    addonChecks.forEach((chk) => {
      if (chk.checked) {
        const addonPrice = parseInt(chk.getAttribute('data-price'), 10) || 0;
        const addonName = chk.getAttribute('data-name') || '';
        total += addonPrice;
        selectedAddons.push({ name: addonName, price: addonPrice });
      }
    });

    const formattedTotal = formatRupiah(total);
    if (simulasiTotalDisplay) simulasiTotalDisplay.textContent = formattedTotal;
    if (simulasiPriceBadge) simulasiPriceBadge.textContent = formattedTotal;

    if (simulasiWaBtn) {
      const waLines = [
        "Assalamu'alaikum / Halo Tim Saktah Space,",
        "",
        "Saya tertarik memesan dan berkonsultasi mengenai paket layanan:",
        `• Paket Pilihan: ${currentPackageName} (${formatRupiah(currentBasePrice)})`
      ];

      if (selectedAddons.length > 0) {
        waLines.push("• Fitur Tambahan (Add-Ons):");
        selectedAddons.forEach((a) => {
          waLines.push(`  - ${a.name} (+${formatRupiah(a.price)})`);
        });
      }

      waLines.push(`• Total Estimasi Investasi: ${formattedTotal}`);
      waLines.push("");
      waLines.push("Mohon informasi ketersediaan jadwal pengerjaan dan langkah selanjutnya. Terima kasih.");

      simulasiWaBtn.href = `https://wa.me/${SAKTAH_WA_NUMBER}?text=${encodeURIComponent(waLines.join('\n'))}`;
    }
  };

  // Pasang listener pada checkbox add-on simulasi
  addonChecks.forEach((chk) => {
    chk.addEventListener('change', updateSimulasiCalculation);
  });

  const openSimulasiModal = (btn) => {
    if (!packageSimulasiModal || !btn) return;

    const name = btn.getAttribute('data-name') || 'Paket Pilihan';
    const tag = btn.getAttribute('data-tag') || 'Paket';
    const price = btn.getAttribute('data-price') || 'Rp0';
    const desc = btn.getAttribute('data-desc') || '';
    const leadtime = btn.getAttribute('data-leadtime') || 'Sesuai kesepakatan';
    const deliverablesRaw = btn.getAttribute('data-deliverables') || '';
    const revision = btn.getAttribute('data-revision') || '2x Putaran Revisi';
    const guarantee = btn.getAttribute('data-guarantee') || 'Jaminan kualitas & kejujuran visual Saktah Space';

    currentPackageName = name;
    const parsedPrice = parseInt(price.replace(/[^0-9]/g, ''), 10);
    currentBasePrice = isNaN(parsedPrice) ? 0 : parsedPrice;

    if (simulasiTierTag) simulasiTierTag.textContent = tag;
    if (simulasiModalTitle) simulasiModalTitle.textContent = name;
    if (simulasiModalDesc) simulasiModalDesc.textContent = desc;
    if (simulasiLeadTime) simulasiLeadTime.textContent = leadtime;
    if (simulasiRevision) simulasiRevision.textContent = revision;
    if (simulasiGuarantee) simulasiGuarantee.textContent = guarantee;

    // Reset pilihan add-on ke posisi awal
    addonChecks.forEach((chk) => {
      chk.checked = false;
    });

    // Render deliverables
    if (simulasiDeliverablesList) {
      simulasiDeliverablesList.innerHTML = '';
      const items = deliverablesRaw.split('|').filter(item => item.trim().length > 0);
      items.forEach((itemText) => {
        const li = document.createElement('li');
        li.textContent = itemText.trim();
        simulasiDeliverablesList.appendChild(li);
      });
    }

    // Perbarui kalkulasi harga dan pesan WhatsApp
    updateSimulasiCalculation();

    packageSimulasiModal.classList.add('is-active');
    packageSimulasiModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');

    if (simulasiCloseBtn) simulasiCloseBtn.focus();
  };

  const closeSimulasiModal = () => {
    if (!packageSimulasiModal) return;
    packageSimulasiModal.classList.remove('is-active');
    packageSimulasiModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  };

  const simulasiBtns = document.querySelectorAll('.btn-package-simulasi');
  simulasiBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openSimulasiModal(btn);
    });
  });

  if (simulasiCloseBtn) simulasiCloseBtn.addEventListener('click', closeSimulasiModal);
  if (simulasiBackdrop) simulasiBackdrop.addEventListener('click', closeSimulasiModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && packageSimulasiModal && packageSimulasiModal.classList.contains('is-active')) {
      closeSimulasiModal();
    }
  });

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
  // 4B. LANGUAGE SWITCHER TOAST FEEDBACK
  // =========================================================================
  const langBtns = document.querySelectorAll('.lang-btn');
  let langToast = document.querySelector('.lang-toast');
  if (!langToast) {
    langToast = document.createElement('div');
    langToast.className = 'lang-toast';
    langToast.setAttribute('role', 'status');
    langToast.setAttribute('aria-live', 'polite');
    document.body.appendChild(langToast);
  }

  let toastTimeout = null;
  const showLangToast = (message) => {
    if (!langToast) return;
    langToast.textContent = message;
    langToast.classList.add('is-visible');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      langToast.classList.remove('is-visible');
    }, 3200);
  };

  if (langBtns.length > 0) {
    langBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        langBtns.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        if (lang === 'en') {
          showLangToast('English version is being prepared. Consultations are available in ID & EN via WhatsApp.');
        } else {
          showLangToast('Bahasa Indonesia aktif.');
        }
      });
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
  // 6. WHATSAPP AUTO-INTEGRATION & SYNC
  // =========================================================================
  // Sinkronisasi otomatis seluruh tombol & tautan WhatsApp di halaman dengan SAKTAH_WA_NUMBER
  const waLinks = document.querySelectorAll('a[href*="wa.me"]');
  waLinks.forEach((link) => {
    const currentHref = link.getAttribute('href');
    if (currentHref) {
      // Perbarui nomor tujuan ke SAKTAH_WA_NUMBER tanpa mengubah pesan text query
      const updatedHref = currentHref.replace(
        /wa\.me\/(\[PlaceholderNomorWhatsApp\]|[0-9]+)/,
        `wa.me/${SAKTAH_WA_NUMBER}`
      );
      link.setAttribute('href', updatedHref);
    }
  });

  // Tampilkan nomor WhatsApp resmi terformat pada footer
  const footerWaNumber = document.querySelector('.footer-wa-number');
  if (footerWaNumber) {
    if (SAKTAH_WA_NUMBER.startsWith('62')) {
      const formatted = `+62 ${SAKTAH_WA_NUMBER.slice(2, 5)}-${SAKTAH_WA_NUMBER.slice(5, 9)}-${SAKTAH_WA_NUMBER.slice(9)}`;
      footerWaNumber.textContent = formatted;
    } else {
      footerWaNumber.textContent = SAKTAH_WA_NUMBER;
    }
  }

  // Dukungan Modal Notifikasi (tetap siaga jika dibutuhkan oleh fungsi lain)
  const noticeModal = document.getElementById('contactNoticeModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalConfirmBtn = document.getElementById('modalConfirmBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');

  const closeNoticeModal = () => {
    if (!noticeModal) return;
    noticeModal.classList.remove('is-active');
    noticeModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeNoticeModal);
  if (modalConfirmBtn) modalConfirmBtn.addEventListener('click', closeNoticeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeNoticeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && noticeModal && noticeModal.classList.contains('is-active')) {
      closeNoticeModal();
    }
  });

  // =========================================================================
  // 7. CONSULTATION INQUIRY FORM (WHATSAPP AUTOMATIC INTEGRATION)
  // =========================================================================
  const inquiryForm = document.getElementById('inquiryForm');
  const formFeedback = document.getElementById('formFeedback');

  if (inquiryForm && formFeedback) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const clientNameInput = document.getElementById('clientName');
      const clientBrandInput = document.getElementById('clientBrand');
      const serviceNeededSelect = document.getElementById('serviceNeeded');
      const projectNotesInput = document.getElementById('projectNotes');

      const clientName = clientNameInput ? clientNameInput.value.trim() : '';
      const clientBrand = clientBrandInput ? clientBrandInput.value.trim() : '';
      const serviceNeeded = serviceNeededSelect ? serviceNeededSelect.value : '';
      const projectNotes = projectNotesInput ? projectNotesInput.value.trim() : '';

      // 1. Validasi Kolom Wajib: Nama Lengkap
      if (!clientName) {
        formFeedback.className = 'form-feedback error is-visible';
        formFeedback.innerHTML = '<strong>Pengingat:</strong> Mohon isi Nama Lengkap Anda terlebih dahulu.';
        if (clientNameInput) clientNameInput.focus();
        formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
      }

      // 2. Validasi Kolom Wajib: Layanan / Paket yang Dipilih
      if (!serviceNeeded) {
        formFeedback.className = 'form-feedback error is-visible';
        formFeedback.innerHTML = '<strong>Pengingat:</strong> Silakan pilih salah satu Layanan / Paket yang Anda butuhkan.';
        if (serviceNeededSelect) serviceNeededSelect.focus();
        formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
      }

      // Ambil teks deskriptif dari opsi layanan yang dipilih
      const selectedServiceText =
        serviceNeededSelect.options[serviceNeededSelect.selectedIndex]?.text || serviceNeeded;

      // 3. Rangkai pesan salam profesional dan terstruktur dalam Bahasa Indonesia
      const messageLines = [
        "Assalamu'alaikum / Halo Tim Saktah Space,",
        "",
        "Saya ingin berkonsultasi mengenai proyek dengan rincian berikut:",
        `• Nama Lengkap: ${clientName}`,
        `• Nama Usaha / Brand: ${clientBrand || '-'}`,
        `• Layanan / Paket yang Dipilih: ${selectedServiceText}`,
        `• Catatan Singkat / Sasaran: ${projectNotes || '-'}`,
        "",
        "Mohon informasi ketersediaan jadwal konsultasi dan langkah selanjutnya. Terima kasih."
      ];

      const waMessage = messageLines.join('\n');
      const waUrl = `https://wa.me/${SAKTAH_WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

      // 4. Tampilkan pesan status pengalihan ramah
      formFeedback.className = 'form-feedback success is-visible';
      formFeedback.innerHTML = `
        <strong>Menghubungkan ke WhatsApp Resmi Saktah Space...</strong><br>
        Rincian pesan Anda telah siap. Jika jendela WhatsApp tidak terbuka otomatis, 
        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: underline; font-weight: 700; color: inherit;">
          klik di sini untuk membuka obrolan WhatsApp
        </a>.
      `;

      formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // 5. Buka tautan WhatsApp di tab baru secara otomatis
      window.open(waUrl, '_blank', 'noopener,noreferrer');
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
        threshold: 0.2,
        rootMargin: '-20% 0px -60% 0px'
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // =========================================================================
  // 9. FLOATING ACTION BUTTONS (BACK TO TOP & WHATSAPP SHORTCUT)
  // =========================================================================
  const backToTopBtn = document.getElementById('backToTopBtn');
  const floatingWaBtn = document.getElementById('floatingWaBtn');

  if (floatingWaBtn) {
    floatingWaBtn.href = `https://wa.me/${SAKTAH_WA_NUMBER}?text=${encodeURIComponent("Halo Saktah Space, saya ingin berkonsultasi mengenai proyek saya.")}`;
  }

  if (backToTopBtn) {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  console.log('Saktah Space interactive systems initialized successfully.');
});
