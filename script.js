const scrollContainer = document.querySelector('.scroll-container');
let isScrolling;

function updateCards() {
  const cards = document.querySelectorAll('.card');
  const viewportCenter = window.innerHeight / 2;
  const threshold = window.innerHeight / 4;
  
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.top + rect.height / 2;
    const distanceFromCenter = Math.abs(cardCenter - viewportCenter);
    const proximity = Math.max(0, 1 - (distanceFromCenter / threshold));
    
    const scale = 1 + (proximity * 0.3);
    const brightness = 1 + (proximity * 0.1);
    
    card.style.transform = `scale(${scale})`;
    card.style.zIndex = Math.ceil(proximity * 10);
    card.style.filter = `brightness(${brightness})`;
    
    if (proximity > 0.8) {
      card.style.boxShadow = `
        0 ${12 + (proximity * 8)}px ${24 + (proximity * 16)}px rgba(0, 0, 0, 0.1),
        0 ${4 + (proximity * 4)}px ${8 + (proximity * 8)}px rgba(0, 0, 0, 0.05)
      `;
    } else {
      card.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)';
    }
  });
}

scrollContainer.addEventListener('scroll', () => {
  window.clearTimeout(isScrolling);
  requestAnimationFrame(updateCards);
  isScrolling = setTimeout(() => {
    // Additional cleanup if needed
  }, 66);
});

updateCards();
window.addEventListener('resize', updateCards);