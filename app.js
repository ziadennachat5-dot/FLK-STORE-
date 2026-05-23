// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== MOBILE HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => observer.observe(el));

// ===== 3D TILT EFFECT ON HOVER =====
const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within element
    const y = e.clientY - rect.top;  // y position within element
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation angles (max 10 degrees)
    const rotateX = ((centerY - y) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    // Apply transform style
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
});

// ===== ACTIVE SECTION LINK HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.id;
    }
  });
  navAnchors.forEach(a => {
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = '#fff';
      a.style.borderBottom = '2px solid var(--p)';
    } else {
      a.style.color = '';
      a.style.borderBottom = '';
    }
  });
});

// ===== INTERACTIVE PRICING SELECTOR =====
const pCards = document.querySelectorAll('.pcard');
pCards.forEach(pCard => {
  const rows = pCard.querySelectorAll('.offer-row');
  const btn = pCard.querySelector('.pcard-btn');
  const category = pCard.querySelector('.offers-list').getAttribute('data-category');
  
  rows.forEach(row => {
    row.addEventListener('click', () => {
      // Deactivate all rows in this card
      rows.forEach(r => r.classList.remove('active'));
      
      // Activate clicked row
      row.classList.add('active');
      
      // Get selected info
      const amount = row.getAttribute('data-amount');
      
      // Update Button Link and Text
      const prefilledText = encodeURIComponent(`Hello FLK Store, I want to buy the ${category} ${amount} Coins offer.`);
      btn.href = `https://wa.me/212720697587?text=${prefilledText}`;
      btn.innerHTML = `<span class="btn-shimmer"></span>Buy ${category} ${amount} Coins`;
    });
  });
});

// ===== LIVE CHAT SIMULATOR =====
const feedMessagesContainer = document.querySelector('.feed-messages');
if (feedMessagesContainer) {
  const simulatedUsers = [
    { name: "Simohammed", avatar: "S", msg: "Recharged 12.8K coins, chokran FLK! 🙏", color: "#3b82f6" },
    { name: "Reda", avatar: "R", msg: "Account secure trading is top tier, highly recommended", color: "#22c55e" },
    { name: "Yassine", avatar: "Y", msg: "VIP group 1 is full, can I join group 2?", color: "#ec4899" },
    { name: "Fatima", avatar: "F", msg: "Fast delivery of my FF diamonds, best shop", color: "#eab308" },
    { name: "Amine", avatar: "A", msg: "GP recharge took literally 1 minute, real speed ⚡", color: "#06b6d4" },
    { name: "Hamza", avatar: "H", msg: "CR7 card OVR 99 account available? Dmed you", color: "#a855f7" }
  ];

  let userIndex = 0;

  setInterval(() => {
    const user = simulatedUsers[userIndex];
    
    // Create element
    const msgElement = document.createElement('div');
    msgElement.className = 'fm';
    msgElement.style.opacity = '0';
    msgElement.style.transform = 'translateY(15px)';
    msgElement.style.transition = 'all 0.4s ease';
    msgElement.innerHTML = `
      <div class="fm-av" style="background: linear-gradient(135deg, ${user.color}, #1e293b)">${user.avatar}</div>
      <div class="fm-body">
        <b>${user.name}</b>
        <span>${user.msg}</span>
      </div>
    `;

    // Append element
    feedMessagesContainer.appendChild(msgElement);
    
    // Trigger transition
    setTimeout(() => {
      msgElement.style.opacity = '1';
      msgElement.style.transform = 'translateY(0)';
    }, 50);

    // Keep only last 4 messages and remove oldest
    const currentMsgs = feedMessagesContainer.querySelectorAll('.fm');
    if (currentMsgs.length > 4) {
      const oldest = currentMsgs[0];
      oldest.style.opacity = '0';
      oldest.style.transform = 'translateY(-15px)';
      setTimeout(() => {
        oldest.remove();
      }, 400);
    }

    userIndex = (userIndex + 1) % simulatedUsers.length;
  }, 4500);
}
