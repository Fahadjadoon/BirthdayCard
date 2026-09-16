document.addEventListener('DOMContentLoaded', function() {

    // --- Live Human-Friendly Cumulative Age Counter ---
    const birthDate = new Date('1999-09-17T00:00:00');
    const countdownElement = document.getElementById('countdown');

    function updateAge() {
        const now = new Date();

        // Total time lived in milliseconds
        const totalMs = now - birthDate;

        // Total units since birth
        const totalSeconds = Math.floor(totalMs / 1000);
        const totalMinutes = Math.floor(totalMs / (1000 * 60));
        const totalHours = Math.floor(totalMs / (1000 * 60 * 60));
        const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));

        // Completed years
        let years = now.getFullYear() - birthDate.getFullYear();
        const birthdayThisYear = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        if (now < birthdayThisYear) {
            years--;
        }

        // Total months elapsed since birth
        let months = (now.getFullYear() - birthDate.getFullYear()) * 12 + (now.getMonth() - birthDate.getMonth());
        if (now.getDate() < birthDate.getDate()) {
            months--;
        }

        countdownElement.innerHTML = `
            <div class="mt-8 max-w-4xl mx-auto px-2">
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
                    <div class="counter-card">
                        <div class="counter-number">${years}</div>
                        <div class="counter-label">Years</div>
                    </div>
                    <div class="counter-card">
                        <div class="counter-number">${months.toLocaleString()}</div>
                        <div class="counter-label">Months</div>
                    </div>
                    <div class="counter-card">
                        <div class="counter-number">${totalDays.toLocaleString()}</div>
                        <div class="counter-label">Days</div>
                    </div>
                    <div class="counter-card">
                        <div class="counter-number">${totalHours.toLocaleString()}</div>
                        <div class="counter-label">Hours</div>
                    </div>
                    <div class="counter-card">
                        <div class="counter-number">${totalMinutes.toLocaleString()}</div>
                        <div class="counter-label">Minutes</div>
                    </div>
                    <div class="counter-card counter-seconds">
                        <div class="counter-number">${totalSeconds.toLocaleString()}</div>
                        <div class="counter-label">Seconds</div>
                    </div>
                </div>
                <p class="mt-5 text-sm md:text-base text-white/90 italic tracking-wide font-normal">
                    Every moment of your journey is worth celebrating ♡
                </p>
            </div>
        `;

        const styleId = 'age-counter-styles';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.innerHTML = `
                .counter-card {
                    background: rgba(255, 255, 255, 0.18);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.35);
                    border-radius: 16px;
                    padding: 14px 12px;
                    min-width: 0; /* Keeps box structure tight on flex/grid overflow */
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                    transition: all 0.3s ease;
                }
                .counter-card:hover {
                    transform: translateY(-3px);
                    background: rgba(255, 255, 255, 0.25);
                    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.20);
                }
                .counter-number {
                    font-size: clamp(1rem, 2.5vw, 1.35rem); /* Responsive fluid font size */
                    font-weight: 700;
                    line-height: 1.2;
                    color: #ffffff;
                    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .counter-label {
                    margin-top: 4px;
                    font-size: 0.72rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: rgba(255, 255, 255, 0.85);
                }
                .counter-seconds {
                    animation: secondsGlow 1s ease-in-out infinite alternate;
                }
                @keyframes secondsGlow {
                    from { box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15); }
                    to { box-shadow: 0 8px 30px rgba(255, 183, 197, 0.45); }
                }
                @media (max-width: 640px) {
                    .counter-card { padding: 12px 8px; border-radius: 12px; }
                    .counter-label { font-size: 0.65rem; letter-spacing: 0.5px; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    updateAge();
    setInterval(updateAge, 1000);

    // --- Initialize AOS (Animate on Scroll) ---
    AOS.init({
        duration: 800,
        once: true,
    });

    // --- Sakura Petal Animation ---
    const canvas = document.getElementById('sakura-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let petals = [];
        const numPetals = 50;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function Petal() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height * 2 - canvas.height;
            this.w = 25 + Math.random() * 15;
            this.h = 20 + Math.random() * 10;
            this.opacity = this.w / 40;
            this.flip = Math.random();
            this.xSpeed = 1.5 + Math.random() * 2;
            this.ySpeed = 1 + Math.random() * 1;
            this.flipSpeed = Math.random() * 0.03;
        }

        Petal.prototype.draw = function() {
            if (this.y > canvas.height || this.x > canvas.width) {
                this.x = -this.w;
                this.y = Math.random() * canvas.height * 2 - canvas.height;
                this.xSpeed = 1.5 + Math.random() * 2;
                this.ySpeed = 1 + Math.random() * 1;
                this.flip = Math.random();
            }

            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.bezierCurveTo(
                this.x + this.w / 2, this.y - this.h / 2,
                this.x + this.w, this.y,
                this.x + this.w / 2, this.y + this.h / 2
            );
            ctx.bezierCurveTo(
                this.x, this.y + this.h,
                this.x - this.w / 2, this.y,
                this.x, this.y
            );
            ctx.closePath();
            ctx.fillStyle = '#FFB7C5';
            ctx.fill();
        };

        Petal.prototype.update = function() {
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            this.flip += this.flipSpeed;
            this.draw();
        };

        function createPetals() {
            petals = [];
            for (let i = 0; i < numPetals; i++) {
                petals.push(new Petal());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            petals.forEach(petal => petal.update());
            requestAnimationFrame(animate);
        }

        createPetals();
        animate();
    }
});