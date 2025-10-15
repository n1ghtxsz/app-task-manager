class Starfield {
    constructor() {
        this.container = document.getElementById('starsContainer');
        this.stars = [];
        this.starCount = 150;
        this.riseDuration = 2000; // 2 segundos para subir
        this.floatDuration = 15000; // 15 segundos para flutuação
        
        this.init();
    }

    init() {
        this.createStars();
        this.startRiseAnimation();
        
        // Iniciar flutuação após a subida
        setTimeout(() => {
            this.startFloatAnimation();
        }, this.riseDuration + 500);
    }

    createStars() {
        for (let i = 0; i < this.starCount; i++) {
            const star = document.createElement('div');
            const size = Math.random();
            
            // Definir tamanho da estrela
            if (size < 0.6) {
                star.className = 'star small';
            } else if (size < 0.9) {
                star.className = 'star medium';
            } else {
                star.className = 'star large';
            }
            
            // Adicionar cintilação aleatória
            if (Math.random() > 0.7) {
                star.classList.add('twinkling');
            }
            
            // Posição inicial (fora da tela, na parte inferior)
            const startX = Math.random() * 100;
            star.style.left = `${startX}%`;
            star.style.bottom = '-10px';
            
            // Brilho aleatório
            const brightness = 0.5 + Math.random() * 0.5;
            star.style.opacity = brightness;
            
            this.container.appendChild(star);
            this.stars.push({
                element: star,
                startX: startX,
                finalY: Math.random() * 100 // Posição final Y aleatória
            });
        }
    }

    startRiseAnimation() {
        this.stars.forEach((star, index) => {
            const delay = index * 20; // Delay escalonado para criar efeito de onda
            
            star.element.style.animation = `riseUp ${this.riseDuration}ms ease-out ${delay}ms forwards`;
            
            // Posição final Y
            setTimeout(() => {
                star.element.style.top = `${star.finalY}%`;
                star.element.style.bottom = 'auto';
            }, delay + this.riseDuration);
        });
    }

    startFloatAnimation() {
        this.stars.forEach((star, index) => {
            // Criar animação de flutuação única para cada estrela
            const floatX = (Math.random() - 0.5) * 100; // Movimento horizontal aleatório
            const floatY = (Math.random() - 0.5) * 50; // Movimento vertical aleatório
            const duration = this.floatDuration + Math.random() * 10000; // Duração aleatória
            const delay = Math.random() * 2000; // Delay aleatório
            
            // Criar keyframes dinâmicos para cada estrela
            const animationName = `float-${index}`;
            const keyframes = `
                @keyframes ${animationName} {
                    0% {
                        transform: translate(0, 0);
                    }
                    25% {
                        transform: translate(${floatX * 0.3}px, ${floatY * 0.3}px);
                    }
                    50% {
                        transform: translate(${floatX * 0.6}px, ${floatY * 0.6}px);
                    }
                    75% {
                        transform: translate(${floatX * 0.3}px, ${floatY * 0.3}px);
                    }
                    100% {
                        transform: translate(0, 0);
                    }
                }
            `;
            
            // Adicionar os keyframes ao documento
            const style = document.createElement('style');
            style.textContent = keyframes;
            document.head.appendChild(style);
            
            // Aplicar a animação
            star.element.style.animation = `
                ${animationName} ${duration}ms ease-in-out ${delay}ms infinite
            `;
        });
    }

    // Método para adicionar partículas de fundo
    addParticles() {
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 2 + 1;
            const left = Math.random() * 100;
            const delay = Math.random() * 20000;
            const duration = 15000 + Math.random() * 10000;
            
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${left}%;
                animation-delay: ${delay}ms;
                animation-duration: ${duration}ms;
            `;
            
            this.container.appendChild(particle);
        }
    }
}

// Inicializar quando o DOM estiver carregado
(() => {
  const starfield = new Starfield();

  // Adicionar partículas após 3s
  setTimeout(() => {
    starfield.addParticles();
  }, 3000);

  // Efeito de estrelas cadentes ocasionais
  setInterval(createShootingStar, 8000);
})();

// Função para criar estrelas cadentes
function createShootingStar() {
    if (Math.random() > 0.5) { // 50% de chance
        const container = document.getElementById('starsContainer');
        const shootingStar = document.createElement('div');
        
        shootingStar.className = 'shooting-star';
        shootingStar.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            box-shadow: 0 0 10px white;
            top: ${Math.random() * 30}%;
            left: ${Math.random() * 100}%;
            animation: shoot 2s linear forwards;
        `;
        
        // Adicionar keyframes para a estrela cadente
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shoot {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                100% {
                    transform: translate(${100 + Math.random() * 100}px, ${50 + Math.random() * 50}px) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        container.appendChild(shootingStar);
        
        // Remover após a animação
        setTimeout(() => {
            shootingStar.remove();
            style.remove();
        }, 2000);
    }
}

// Redimensionar estrelas quando a janela for redimensionada
window.addEventListener('resize', function() {
    // Recarregar a página para ajustar as posições
    // Em uma implementação mais avançada, você poderia recalcular as posições
    location.reload();
});