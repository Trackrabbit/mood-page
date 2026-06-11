// DOM Elements
const body = document.body;
const dashboardWrapper = document.querySelector('.dashboard-wrapper');
const triggerBtn = document.getElementById('trigger-btn');
const selectorOverlay = document.getElementById('selector-overlay');
const closeSelectorBtn = document.getElementById('close-selector-btn');
const contextBox = document.getElementById('context-box');
const resetBtn = document.getElementById('reset-btn');
const actionBtn = document.getElementById('action-btn');

const resultTitle = document.getElementById('result-title');
const resultText = document.getElementById('result-text');
const ambientBreathe = document.getElementById('ambient-breathe');

let currentMood = "";
let sparkleHandler = null; // To track and remove the sparkle event listener

// The Arrays of Facts
const gentleFacts = [
    "Otters hold hands when they sleep so they don't drift apart.",
    "Cows have best friends and get stressed when separated.",
    "A group of pugs is called a grumble."
];
const boringFacts = [
    "A standard #2 pencil is yellow.",
    "The plastic thing on the end of a shoelace is an aglet.",
    "The dot over the letter 'i' is called a tittle."
];

// Mood Configurations (Action Text Updated)
const moodConfig = {
    depressed: {
        title: "Low Energy Mode.", text: "We've dimmed the lights. Your tasks are still here, but they aren't yelling at you.", actionText: "Give me an easy win", containerClass: 'anim-float'
    },
    anxious: {
        title: "Focus on the pulse.", text: "The dashboard is anchored in deep blue. Follow the breathing circle.", actionText: "Block out the noise", containerClass: ''
    },
    stressed: {
        title: "Structured & Grounded.", text: "Warm tones. No harsh white light. Let's look at one action item at a time.", actionText: "Sort this out", containerClass: ''
    },
    happy: {
        title: "Momentum.", text: "Bright, crisp, and clear. You've got the energy, the workspace is ready.", actionText: "Let's Go!", containerClass: ''
    },
    overstimulated: {
        title: "Dark Room Mode.", text: "Lights out. High-contrast colors removed. The UI is quiet now.", actionText: "Quiet the room completely", containerClass: ''
    },
    'burned-out': {
        title: "Brain Fog Engaged.", text: "Your workload is blurred out. You don't have to look at it.", actionText: "Clear the deck", containerClass: 'anim-blur'
    },
    delulu: {
        title: "Main Character Energy.", text: "These aren't tasks, they are plot points. You are unstoppable.", actionText: "Engage Plot Armor", containerClass: 'anim-glow'
    },
    apathetic: {
        title: "Monospace / Monotone.", text: "Everything is grey. It doesn't really matter.", actionText: "Whatever", containerClass: 'font-mono'
    }
};

// Open/Close Selector
triggerBtn.addEventListener('click', () => selectorOverlay.classList.remove('hidden'));
closeSelectorBtn.addEventListener('click', () => selectorOverlay.classList.add('hidden'));

// Apply Visual Mood
document.querySelectorAll('.mood-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
        currentMood = e.target.getAttribute('data-mood');
        
        body.className = '';
        ambientBreathe.classList.remove('anim-breathe');
        body.classList.add(`theme-${currentMood}`);
        
        const config = moodConfig[currentMood];
        resultTitle.textContent = config.title;
        resultText.textContent = config.text;
        actionBtn.textContent = config.actionText;

        selectorOverlay.classList.add('hidden');
        contextBox.classList.remove('hidden');
        triggerBtn.classList.add('hidden');

        if (config.containerClass) body.classList.add(config.containerClass);
        if (currentMood === 'anxious') ambientBreathe.classList.add('anim-breathe');
    });
});

// --- THE INTERVENTIONS (Action Button Logic) ---
actionBtn.addEventListener('click', () => {
    
    // Depressed: Gentle fact -> Fades -> Clean Slate
    if (currentMood === 'depressed') {
        const factDiv = document.createElement('div');
        factDiv.className = 'fact-overlay';
        factDiv.textContent = gentleFacts[Math.floor(Math.random() * gentleFacts.length)];
        document.body.appendChild(factDiv);
        
        setTimeout(() => factDiv.classList.add('fact-fade-out'), 5000);
        setTimeout(() => {
            factDiv.remove();
            dashboardWrapper.classList.add('clean-slate');
        }, 7000);
    }

    // Anxious: 16-Second Blackout Takeover
    if (currentMood === 'anxious') {
        ambientBreathe.classList.add('breathing-takeover');
        dashboardWrapper.classList.add('dashboard-blurred');
        setTimeout(() => {
            ambientBreathe.classList.remove('breathing-takeover');
            dashboardWrapper.classList.remove('dashboard-blurred');
        }, 16000); // Two full 8-second breathing cycles
    }

    // Stressed: Funnel + Time Travel + Chunking
    if (currentMood === 'stressed') {
        document.querySelector('.subtitle').textContent = "There is plenty of time.";
        document.querySelectorAll('.big-number')[1].textContent = "0"; // Erase overdue tasks
        document.querySelector('.task-card ul').classList.add('funnel-vision');
        
        const firstTask = document.querySelector('.task-card li');
        firstTask.innerHTML = `<strong>Finalize Q3 Report:</strong><br><br><input type="checkbox"> 1. Open document<br><input type="checkbox"> 2. Read first paragraph<br><input type="checkbox"> 3. Decide next step`;
    }

    // Happy: Confetti + Hype Man + Gamification
    if (currentMood === 'happy') {
        document.querySelector('h1').textContent = "You are literally crushing it right now.";
        
        // Confetti cannon
        const colors = ['#22c55e', '#3b82f6', '#ec4899', '#eab308'];
        for(let i=0; i<75; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.random() * colors.length | 0];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }

        // Gamification Combo
        let combo = 0;
        document.querySelectorAll('.task-card input').forEach(cb => {
            cb.addEventListener('change', (e) => {
                if(e.target.checked) {
                    combo++;
                    const popup = document.createElement('div');
                    popup.className = 'combo-multiplier';
                    popup.textContent = `x${combo} COMBO!`;
                    popup.style.left = e.clientX + 'px';
                    popup.style.top = (e.clientY - 20) + 'px';
                    document.body.appendChild(popup);
                    setTimeout(() => popup.remove(), 1000);
                }
            });
        });
    }

    // Overstimulated: Zen Mode Extreme
    if (currentMood === 'overstimulated') {
        dashboardWrapper.classList.add('zen-mode');
    }

    // Burned Out: Inbox Zero Illusion + The Sweep
    if (currentMood === 'burned-out') {
        // Drop metrics to zero
        let count = 142;
        const interval = setInterval(() => {
            count -= Math.floor(Math.random() * 10) + 2;
            if(count <= 0) { count = 0; clearInterval(interval); document.querySelectorAll('.big-number')[0].style.color = '#737373'; }
            document.querySelectorAll('.big-number')[0].textContent = count;
        }, 50);

        // Auto-sweep tasks
        const checkboxes = document.querySelectorAll('.task-card input[type="checkbox"]');
        checkboxes.forEach((cb, index) => {
            setTimeout(() => {
                cb.checked = true;
                cb.parentElement.style.textDecoration = "line-through";
                cb.parentElement.style.opacity = "0.3";
            }, index * 600);
        });
    }

    // Delulu: Re-brand + Sparkle Cursor
    if (currentMood === 'delulu') {
        document.querySelectorAll('.card h3')[1].textContent = "Fashionably Late Masterpieces";
        document.querySelectorAll('.card h3')[2].textContent = "Main Character Quests";
        
        sparkleHandler = (e) => {
            if(Math.random() > 0.3) return; // Don't spawn on *every* single pixel
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.textContent = '✨';
            sparkle.style.left = e.clientX + 'px';
            sparkle.style.top = e.clientY + 'px';
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        };
        document.addEventListener('mousemove', sparkleHandler);
    }

    // Apathetic: The Shrug + Boring Fact Overlay
    if (currentMood === 'apathetic') {
        dashboardWrapper.classList.add('tilt-shrug');
        
        const factDiv = document.createElement('div');
        factDiv.className = 'fact-overlay';
        factDiv.textContent = boringFacts[Math.floor(Math.random() * boringFacts.length)];
        document.body.appendChild(factDiv);
        
        setTimeout(() => factDiv.classList.add('fact-fade-out'), 4000);
        setTimeout(() => factDiv.remove(), 6000);
    }

    // Hide the action button after clicking so they don't spam it
    actionBtn.style.display = 'none';
});

// --- RESET THE WORLD ---
resetBtn.addEventListener('click', () => {
    // Remove all classes
    body.className = '';
    ambientBreathe.classList.remove('anim-breathe', 'breathing-takeover');
    dashboardWrapper.classList.remove('clean-slate', 'dashboard-blurred', 'funnel-vision', 'zen-mode', 'tilt-shrug');
    
    // Remove specific event listeners
    if(sparkleHandler) {
        document.removeEventListener('mousemove', sparkleHandler);
        sparkleHandler = null;
    }

    // Restore hidden UI and texts
    contextBox.classList.add('hidden');
    triggerBtn.classList.remove('hidden');
    actionBtn.style.display = 'block';

    // Reload the page to guarantee a fresh, untampered dashboard
    // (This is the easiest way to undo aggressive DOM manipulation like text overwriting)
    setTimeout(() => location.reload(), 200); 
});
