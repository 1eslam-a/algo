function createParticles() {
    const container = document.querySelector('.particles-container');
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random properties
      const size = Math.random() * 20 + 5;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * 10;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;
      
      container.appendChild(particle);
    }
  }

 
  function createFloatingShapes() {
    const container = document.querySelector('.floating-shapes');
    
    
    for (let i = 1; i <= 3; i++) {
      const shape = document.createElement('div');
      shape.classList.add('floating-shape');
      
      const size = Math.random() * 200 + 100;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 10;
      const blur = Math.random() * 10 + 5;
      
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.left = `${posX}%`;
      shape.style.top = `${posY}%`;
      shape.style.animationDuration = `${duration}s`;
      shape.style.animationDelay = `${delay}s`;
      shape.style.filter = `blur(${blur}px)`;
      
      
      if (i === 1) {
        shape.style.background = 'radial-gradient(circle, rgba(255,255,255,0.2), transparent)';
        shape.style.borderRadius = '50%';
      } else if (i === 2) {
        shape.style.background = 'linear-gradient(45deg, rgba(255,255,255,0.15), transparent)';
        shape.style.borderRadius = '30% 70% 70% 30% / 30% 30% 70% 70%';
      } else {
        shape.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.1), transparent)';
        shape.style.borderRadius = '60% 40% 30% 70% / 60% 30% 70% 40%';
      }
      
      container.appendChild(shape);
    }
  }

  function startTransition() {
    const overlay = document.getElementById('transitionOverlay');
    const landing = document.getElementById('landing');
    const button = event.target;
    
   
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    
   
    overlay.style.animation = 'slideUp 0.8s cubic-bezier(0.65, 0, 0.35, 1) forwards';
    
   
    landing.style.animation = 'fadeOut 0.5s ease-out forwards';
    
    
    setTimeout(() => {
      window.location.href = "firrst.html";
    }, 800);
  }

 
  window.onload = function() {
    createParticles();
    createFloatingShapes();
    
   
    const nextPage = new Image();
    nextPage.src = "firrst.html";
  };