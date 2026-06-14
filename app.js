document.addEventListener('DOMContentLoaded', () => {
  // 1. Modal Dialog Logic
  const leadModal = document.getElementById('leadModal');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const leadForm = document.getElementById('leadForm');

  const openModal = () => {
    leadModal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Disable scroll under modal
  };

  const closeModal = () => {
    leadModal.classList.remove('open');
    document.body.style.overflow = ''; // Restore scroll
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  closeModalBtn.addEventListener('click', closeModal);

  // Close modal when clicking outside of the form card
  leadModal.addEventListener('click', (e) => {
    if (e.target === leadModal) {
      closeModal();
    }
  });

  // Handle Form Submission
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('leadName').value;
    const email = document.getElementById('leadEmail').value;
    const countryCode = document.getElementById('leadCountry').value;
    const phone = document.getElementById('leadPhone').value;

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.textContent = 'Обработка...';
    submitBtn.disabled = true;

    // Simulate sending data to API / Telegram bot
    setTimeout(() => {
      // Create a nice success UI replacement inside the modal
      const fbmCard = document.querySelector('.fbm');
      fbmCard.innerHTML = `
        <div class="center" style="padding: 20px 0;">
          <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="#22c55e" stroke-width="2.5" style="margin-bottom: 20px;">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <h3 class="h3-22 mb8">Регистрация успешна!</h3>
          <p class="body-m muted mb20">Система AI Advertiser Starter отправлена вам. Проверьте ваш Telegram или перейдите по ссылке ниже:</p>
          <a href="https://t.me/ai_hustlers_bot" target="_blank" class="btn-primary" style="text-decoration:none; animation:none; width:100%; display:flex;">
            Открыть обучение в Telegram
          </a>
        </div>
      `;
    }, 1500);
  });

  // 2. Video Autoplay Trigger
  const videoContainer = document.getElementById('videoContainer');
  const videoOverlay = document.getElementById('videoOverlay');
  const videoIframe = document.getElementById('videoIframe');

  videoOverlay.addEventListener('click', () => {
    videoContainer.classList.add('playing');
    // Change YouTube src to trigger autoplay
    const currentSrc = videoIframe.src;
    if (currentSrc.includes('?')) {
      videoIframe.src = currentSrc + '&autoplay=1';
    } else {
      videoIframe.src = currentSrc + '?autoplay=1';
    }
  });

  // 3. Dynamic Vertical Tools Roller
  const rollerTrack = document.getElementById('rollerTrack');
  const items = Array.from(rollerTrack.querySelectorAll('.roller-item'));
  let currentIndex = 0;

  // Clone items to fill space and enable infinite loops if needed
  const itemHeight = 76; // item height + gap

  const updateRoller = () => {
    // Highlight the active item
    items.forEach((item, idx) => {
      if (idx === currentIndex) {
        item.classList.add('on');
      } else {
        item.classList.remove('on');
      }
    });

    // Translate track
    const offset = -currentIndex * itemHeight;
    rollerTrack.style.transform = `translateY(${offset}px)`;
    rollerTrack.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';

    currentIndex = (currentIndex + 1) % items.length;
  };

  // Run immediately and set interval
  updateRoller();
  setInterval(updateRoller, 2200);
});
