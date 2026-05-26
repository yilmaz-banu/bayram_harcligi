document.addEventListener('DOMContentLoaded', () => {
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const mainImg = document.getElementById('main-img');
    const subTitle = document.getElementById('sub-title');
    const buttonContainer = document.getElementById('button-container');
    const ibanContainer = document.getElementById('iban-container');
    const copyBtn = document.getElementById('copy-btn');
    const ibanText = document.getElementById('iban-text').innerText;
    const mainTitle = document.getElementById('main-title');

    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = 'IBAN Kopyalandı! 💖';
    document.body.appendChild(toast);

    let noClickCount = 0;

    // Define the sequence of funny texts when they click NO
    const noTexts = [
        "Emin misin? 🥺 Lütfen bir daha düşün...",
        "Son kararın mı? 😭 Bak ağlarım...",
        "Beni çok üzüyorsun... Emin misin? 😢",
        "Bence yanlışlıkla bastın... Hadi EVET'e bas! 😤"
    ];

    // Handle NO button click
    btnNo.addEventListener('click', (e) => {
        if (noClickCount === 0) {
            mainImg.src = "fotograf1.png";
            subTitle.innerText = noTexts[0];
            noClickCount++;
        } else if (noClickCount === 1) {
            mainImg.src = "fotograf2.png";
            subTitle.innerText = noTexts[1];
            noClickCount++;
        } else if (noClickCount === 2) {
            mainImg.src = "fotograf3.png";
            subTitle.innerText = noTexts[2];
            noClickCount++;
        }
        
        // After 3rd click, start dodging
        if (noClickCount >= 3) {
            startDodging();
        }
    });

    // Make the button dodge when they try to hover it (after 3rd NO)
    btnNo.addEventListener('mouseover', () => {
        if (noClickCount >= 3) {
            startDodging();
        }
    });
    
    // For mobile touch
    btnNo.addEventListener('touchstart', (e) => {
        if (noClickCount >= 3) {
            e.preventDefault(); // Prevent click
            startDodging();
        }
    });

    function startDodging() {
        btnNo.classList.add('runaway');
        // Calculate random position within the container bounds
        const containerRect = buttonContainer.getBoundingClientRect();
        const btnRect = btnNo.getBoundingClientRect();
        
        // Random X and Y. We use a generous area to make it jump around
        const maxX = 150;
        const maxY = 150;
        
        const randomX = Math.floor(Math.random() * maxX * 2) - maxX;
        const randomY = Math.floor(Math.random() * maxY * 2) - maxY;

        btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
        subTitle.innerText = noTexts[3];
    }

    // Handle YES button click
    btnYes.addEventListener('click', () => {
        // Change to 4th image and show success
        mainImg.src = "fotograf4.png";
        mainTitle.innerText = "Biliyordum! 😍";
        subTitle.innerText = "Dünyanın en tatlı, en bonkör büyüğü sensin! 🎉";
        
        // Hide buttons, show IBAN
        buttonContainer.classList.add('hidden');
        ibanContainer.classList.remove('hidden');

        // Play Confetti!
        playConfetti();
    });

    function playConfetti() {
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#4facfe', '#00f2fe', '#ff758c', '#ffffff']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#4facfe', '#00f2fe', '#ff758c', '#ffffff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    }

    // Handle Copy IBAN
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(ibanText).then(() => {
            toast.classList.add('show');
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = `
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="#4caf50" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            `;
            setTimeout(() => {
                toast.classList.remove('show');
                copyBtn.innerHTML = originalHTML;
            }, 2000);
        }).catch(err => {
            console.error('Kopyalama basarisiz!', err);
            alert("Kopyalama başarısız oldu, lütfen manuel kopyalayın.");
        });
    });
});
