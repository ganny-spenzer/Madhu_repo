const canvas = document.getElementById('butterflyCanvas');
const ctx = canvas.getContext('2d');
const sunflowerCanvas = document.getElementById('sunflowerCanvas');
const sunflowerCtx = sunflowerCanvas ? sunflowerCanvas.getContext('2d') : null;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

if (sunflowerCanvas) {
    sunflowerCanvas.width = window.innerWidth;
    sunflowerCanvas.height = window.innerHeight;
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (sunflowerCanvas) {
        sunflowerCanvas.width = window.innerWidth;
        sunflowerCanvas.height = window.innerHeight;
    }
});

// Sunflower class
class Sunflower {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 40 + 30;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        this.swayAngle = Math.random() * Math.PI * 2;
        this.swaySpeed = Math.random() * 0.02 + 0.01;
        this.opacity = Math.random() * 0.4 + 0.3;
    }

    update() {
        this.rotation += this.rotationSpeed;
        this.swayAngle += this.swaySpeed;
    }

    draw() {
        if (!sunflowerCtx) return;
        
        sunflowerCtx.save();
        sunflowerCtx.globalAlpha = this.opacity;
        sunflowerCtx.translate(this.x, this.y);
        sunflowerCtx.rotate(this.rotation + Math.sin(this.swayAngle) * 0.1);
        
        // Draw petals
        for (let i = 0; i < 12; i++) {
            sunflowerCtx.save();
            sunflowerCtx.rotate((Math.PI * 2 * i) / 12);
            
            // Petal
            sunflowerCtx.fillStyle = '#FFD700';
            sunflowerCtx.beginPath();
            sunflowerCtx.ellipse(this.size * 0.5, 0, this.size * 0.3, this.size * 0.15, 0, 0, Math.PI * 2);
            sunflowerCtx.fill();
            
            sunflowerCtx.restore();
        }
        
        // Center
        sunflowerCtx.fillStyle = '#8B4513';
        sunflowerCtx.beginPath();
        sunflowerCtx.arc(0, 0, this.size * 0.25, 0, Math.PI * 2);
        sunflowerCtx.fill();
        
        // Center details
        sunflowerCtx.fillStyle = '#654321';
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 * i) / 8;
            const x = Math.cos(angle) * this.size * 0.15;
            const y = Math.sin(angle) * this.size * 0.15;
            sunflowerCtx.beginPath();
            sunflowerCtx.arc(x, y, this.size * 0.05, 0, Math.PI * 2);
            sunflowerCtx.fill();
        }
        
        sunflowerCtx.restore();
    }
}

// Create sunflowers
const sunflowers = [];
if (sunflowerCanvas) {
    for (let i = 0; i < 12; i++) {
        sunflowers.push(new Sunflower());
    }
}

class PageTurnButterfly {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 25 + 20;
        this.speedX = (Math.random() - 0.5) * 8;
        this.speedY = (Math.random() - 0.5) * 8;
        this.wingAngle = 0;
        this.wingSpeed = Math.random() * 0.15 + 0.1;
        this.life = 100;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.wingAngle += this.wingSpeed;
        this.rotation += this.rotationSpeed;
        this.life -= 1;
        this.speedY += 0.1;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.life / 100;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        const wingFlap = Math.sin(this.wingAngle) * 0.4 + 0.6;
        
        // Left wing
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(255, 182, 193, 0.8)';
        ctx.beginPath();
        const leftX = -this.size * 0.5 * wingFlap;
        ctx.moveTo(leftX * 0.3, 0);
        ctx.bezierCurveTo(leftX * 0.3, -this.size * 0.4, leftX, -this.size * 0.4, leftX, 0);
        ctx.bezierCurveTo(leftX, this.size * 0.3, leftX * 0.3, this.size * 0.5, leftX * 0.3, this.size * 0.5);
        ctx.closePath();
        ctx.fill();
        
        // Right wing
        ctx.beginPath();
        const rightX = this.size * 0.5 * wingFlap;
        ctx.moveTo(rightX * 0.3, 0);
        ctx.bezierCurveTo(rightX * 0.3, -this.size * 0.4, rightX, -this.size * 0.4, rightX, 0);
        ctx.bezierCurveTo(rightX, this.size * 0.3, rightX * 0.3, this.size * 0.5, rightX * 0.3, this.size * 0.5);
        ctx.closePath();
        ctx.fill();
        
        // Body
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(255, 105, 180, 0.95)';
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 0.12, this.size * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

let butterflies = [];

function createButterflyBurst() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 20; i++) {
        butterflies.push(new PageTurnButterfly(centerX, centerY));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw sunflowers
    if (sunflowerCtx) {
        sunflowerCtx.clearRect(0, 0, sunflowerCanvas.width, sunflowerCanvas.height);
        sunflowers.forEach(sunflower => {
            sunflower.update();
            sunflower.draw();
        });
    }
    
    // Draw butterflies
    butterflies = butterflies.filter(b => b.life > 0);
    butterflies.forEach(butterfly => {
        butterfly.update();
        butterfly.draw();
    });
    
    requestAnimationFrame(animate);
}

animate();

const nextBtn = document.getElementById('nextBtn');
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        createButterflyBurst();
        setTimeout(() => {
            // Detect current page and navigate to next
            const currentPage = window.location.pathname;
            console.log('Current page:', currentPage);
            
            if (currentPage.includes('page4.html') || currentPage.endsWith('page4.html')) {
                console.log('Navigating to page5.html');
                window.location.href = 'page5.html';
            } else if (currentPage.includes('page3.html') || currentPage.endsWith('page3.html')) {
                console.log('Navigating to page4.html');
                window.location.href = 'page4.html';
            } else if (currentPage.includes('page2.html') || currentPage.endsWith('page2.html')) {
                console.log('Navigating to page3.html');
                window.location.href = 'page3.html';
            } else {
                console.log('Default fallback to page3.html');
                window.location.href = 'page3.html';
            }
        }, 1500);
    });
}
