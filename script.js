const canvas = document.getElementById('sparkleCanvas');
const ctx = canvas.getContext('2d');
const btn = document.getElementById('surpriseBtn');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Butterfly class
class Butterfly {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 20 + 15;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.wingAngle = 0;
        this.wingSpeed = Math.random() * 0.1 + 0.05;
        this.color = 'rgba(255, 255, 255, 0.8)';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.wingAngle += this.wingSpeed;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        
        const wingFlap = Math.sin(this.wingAngle) * 0.4 + 0.6;
        
        // Left wing - heart shape
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(255, 182, 193, 0.6)';
        ctx.beginPath();
        const leftX = -this.size * 0.5 * wingFlap;
        ctx.moveTo(leftX * 0.3, 0);
        ctx.bezierCurveTo(leftX * 0.3, -this.size * 0.4, leftX, -this.size * 0.4, leftX, 0);
        ctx.bezierCurveTo(leftX, this.size * 0.3, leftX * 0.3, this.size * 0.5, leftX * 0.3, this.size * 0.5);
        ctx.bezierCurveTo(leftX * 0.3, this.size * 0.5, leftX * 0.5, this.size * 0.3, leftX * 0.5, 0);
        ctx.bezierCurveTo(leftX * 0.5, -this.size * 0.3, leftX * 0.3, -this.size * 0.3, leftX * 0.3, 0);
        ctx.closePath();
        ctx.fill();
        
        // Right wing - heart shape
        ctx.beginPath();
        const rightX = this.size * 0.5 * wingFlap;
        ctx.moveTo(rightX * 0.3, 0);
        ctx.bezierCurveTo(rightX * 0.3, -this.size * 0.4, rightX, -this.size * 0.4, rightX, 0);
        ctx.bezierCurveTo(rightX, this.size * 0.3, rightX * 0.3, this.size * 0.5, rightX * 0.3, this.size * 0.5);
        ctx.bezierCurveTo(rightX * 0.3, this.size * 0.5, rightX * 0.5, this.size * 0.3, rightX * 0.5, 0);
        ctx.bezierCurveTo(rightX * 0.5, -this.size * 0.3, rightX * 0.3, -this.size * 0.3, rightX * 0.3, 0);
        ctx.closePath();
        ctx.fill();
        
        // Wing decorations - pink gradient edges
        ctx.shadowBlur = 0;
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 0.5);
        gradient.addColorStop(0, 'rgba(255, 192, 203, 0)');
        gradient.addColorStop(1, 'rgba(255, 105, 180, 0.3)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(leftX * 0.3, 0);
        ctx.bezierCurveTo(leftX * 0.3, -this.size * 0.4, leftX, -this.size * 0.4, leftX, 0);
        ctx.bezierCurveTo(leftX, this.size * 0.3, leftX * 0.3, this.size * 0.5, leftX * 0.3, this.size * 0.5);
        ctx.bezierCurveTo(leftX * 0.3, this.size * 0.5, leftX * 0.5, this.size * 0.3, leftX * 0.5, 0);
        ctx.bezierCurveTo(leftX * 0.5, -this.size * 0.3, leftX * 0.3, -this.size * 0.3, leftX * 0.3, 0);
        ctx.closePath();
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(rightX * 0.3, 0);
        ctx.bezierCurveTo(rightX * 0.3, -this.size * 0.4, rightX, -this.size * 0.4, rightX, 0);
        ctx.bezierCurveTo(rightX, this.size * 0.3, rightX * 0.3, this.size * 0.5, rightX * 0.3, this.size * 0.5);
        ctx.bezierCurveTo(rightX * 0.3, this.size * 0.5, rightX * 0.5, this.size * 0.3, rightX * 0.5, 0);
        ctx.bezierCurveTo(rightX * 0.5, -this.size * 0.3, rightX * 0.3, -this.size * 0.3, rightX * 0.3, 0);
        ctx.closePath();
        ctx.fill();
        
        // Body
        ctx.fillStyle = 'rgba(255, 105, 180, 0.95)';
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(255, 105, 180, 0.7)';
        
        // Head
        ctx.beginPath();
        ctx.arc(0, -this.size * 0.35, this.size * 0.15, 0, Math.PI * 2);
        ctx.fill();
        
        // Body segments
        ctx.beginPath();
        ctx.ellipse(0, -this.size * 0.15, this.size * 0.13, this.size * 0.18, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.ellipse(0, 0.05 * this.size, this.size * 0.11, this.size * 0.15, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.ellipse(0, 0.22 * this.size, this.size * 0.09, this.size * 0.12, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Antennae
        ctx.strokeStyle = 'rgba(255, 105, 180, 0.9)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, -this.size * 0.42);
        ctx.quadraticCurveTo(-this.size * 0.1, -this.size * 0.55, -this.size * 0.18, -this.size * 0.6);
        ctx.moveTo(0, -this.size * 0.42);
        ctx.quadraticCurveTo(this.size * 0.1, -this.size * 0.55, this.size * 0.18, -this.size * 0.6);
        ctx.stroke();
        
        // Antennae tips
        ctx.fillStyle = 'rgba(255, 182, 193, 0.95)';
        ctx.beginPath();
        ctx.arc(-this.size * 0.18, -this.size * 0.6, this.size * 0.06, 0, Math.PI * 2);
        ctx.arc(this.size * 0.18, -this.size * 0.6, this.size * 0.06, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

// Balloon class
class Balloon {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 200;
        this.size = Math.random() * 30 + 20;
        this.speedY = -(Math.random() * 1 + 0.5);
        this.speedX = Math.random() * 0.5 - 0.25;
        this.color = this.getRandomColor();
        this.swingAngle = Math.random() * Math.PI * 2;
        this.swingSpeed = Math.random() * 0.02 + 0.01;
    }

    getRandomColor() {
        const colors = [
            'rgba(255, 255, 255, 0.8)',
            'rgba(255, 192, 203, 0.8)',
            'rgba(255, 182, 193, 0.8)',
            'rgba(255, 240, 245, 0.8)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y += this.speedY;
        this.swingAngle += this.swingSpeed;
        this.x += Math.sin(this.swingAngle) * 0.5 + this.speedX;

        if (this.y < -100) {
            this.y = canvas.height + 50;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.save();
        
        // Balloon
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.size * 0.7, this.size, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Balloon knot
        ctx.fillStyle = 'rgba(255, 192, 203, 0.9)';
        ctx.beginPath();
        ctx.arc(this.x, this.y + this.size, this.size * 0.15, 0, Math.PI * 2);
        ctx.fill();
        
        // String
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.size);
        for (let i = 0; i < 5; i++) {
            const stringY = this.y + this.size + (i * 10);
            const stringX = this.x + Math.sin(this.swingAngle + i * 0.5) * 3;
            ctx.lineTo(stringX, stringY);
        }
        ctx.stroke();
        
        ctx.restore();
    }
}

// Create butterflies and balloons
const butterflies = [];
const balloons = [];

for (let i = 0; i < 8; i++) {
    butterflies.push(new Butterfly());
}

for (let i = 0; i < 5; i++) {
    balloons.push(new Balloon());
}

class Sparkle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 2;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 6 - 3;
        this.life = 100;
        this.color = this.getRandomPinkShade();
    }

    getRandomPinkShade() {
        const pinks = [
            '#ff69b4', '#ff1493', '#ff85c1', '#ffc0cb',
            '#ffb6c1', '#ff6eb4', '#ff4da6', '#ff99cc'
        ];
        return pinks[Math.floor(Math.random() * pinks.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 2;
        this.size *= 0.97;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.life / 100;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
            const x = this.x + Math.cos(angle) * this.size;
            const y = this.y + Math.sin(angle) * this.size;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
            
            const midAngle = angle + Math.PI / 5;
            const midX = this.x + Math.cos(midAngle) * (this.size * 0.5);
            const midY = this.y + Math.sin(midAngle) * (this.size * 0.5);
            ctx.lineTo(midX, midY);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}

let sparkles = [];

function createSparkles(x, y, count) {
    for (let i = 0; i < count; i++) {
        sparkles.push(new Sparkle(x, y));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw and update balloons
    balloons.forEach(balloon => {
        balloon.update();
        balloon.draw();
    });
    
    // Draw and update butterflies
    butterflies.forEach(butterfly => {
        butterfly.update();
        butterfly.draw();
    });
    
    // Draw and update sparkles
    sparkles = sparkles.filter(sparkle => sparkle.life > 0);
    sparkles.forEach(sparkle => {
        sparkle.update();
        sparkle.draw();
    });
    
    requestAnimationFrame(animate);
}

animate();

if (btn) {
    btn.addEventListener('click', () => {
        const rect = btn.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        createSparkles(x, y, 100);
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createSparkles(
                    x + (Math.random() - 0.5) * 200,
                    y + (Math.random() - 0.5) * 200,
                    50
                );
            }, i * 100);
        }
        
        setTimeout(() => {
            window.location.href = 'page2.html';
        }, 1500);
    });
}
