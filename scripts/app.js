// DOM Elements
const body = document.body;
const triggerBtn = document.getElementById('trigger-btn');
const selectorOverlay = document.getElementById('selector-overlay');
const closeSelectorBtn = document.getElementById('close-selector-btn');
const contextBox = document.getElementById('context-box');
const resetBtn = document.getElementById('reset-btn');

const resultTitle = document.getElementById('result-title');
const resultText = document.getElementById('result-text');
const actionBtn = document.getElementById('action-btn');
const ambientBreathe = document.getElementById('ambient-breathe');

// Mood Configurations
const moodConfig = {
    depressed: {
        title: "Low Energy Mode.",
        text: "We've dimmed the lights and lowered the contrast. Your tasks are still here, but they aren't yelling at you anymore.",
        actionText: "Suggest an easy win",
        containerClass: 'anim-float'
    },
    anxious: {
        title: "Focus on the pulse.",
        text: "The dashboard is anchored in deep blue. Follow the breathing circle in the background if you feel overwhelmed.",
        actionText: "Block incoming messages",
        containerClass: ''
    },
    stressed: {
        title: "Structured & Grounded.",
        text: "Warm tones. No harsh white light. Let's look at one action item at a time.",
        actionText: "Hide overdue tasks",
        containerClass: ''
    },
    happy: {
        title: "Momentum.",
        text: "Bright, crisp, and clear. You've got the energy, the workspace is ready to keep up.",
        actionText: "Tackle the hardest task",
        containerClass: ''
    },
    overstimulated: {
        title: "Dark Room Mode.",
        text: "Lights out. High-contrast colors removed. The UI is quiet now.",
        actionText: "Hide sidebar",
        containerClass: ''
    },
    'burned-out': {
        title: "Brain Fog Engaged.",
        text: "Your workload is blurred out. You don't have to look at it until you explicitly hover over it.",
        actionText: "Mark all as read",
        containerClass: 'anim-blur'
    },
    delulu: {
        title: "Main Character Energy.",
        text: "These aren't tasks, they are plot points. You are literally unstoppable right now.",
        actionText: "Auto-complete everything",
        containerClass: 'anim-glow'
    },
    apathetic: {
        title: "Monospace / Monotone.",
        text: "Everything is grey. It doesn't really matter. We're just clicking buttons.",
        actionText: "Whatever",
        containerClass: 'font-mono'
    }
};

// Open Selector
triggerBtn.addEventListener('click', () => {
    selectorOverlay.classList.remove('hidden');
});

// Close Selector
closeSelectorBtn.addEventListener('click', () => {
    selectorOverlay.classList.add('hidden');
});

// Apply Mood
document.querySelectorAll('.mood-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const mood = e.target.getAttribute('data-mood');
        
        // Wipe slate clean
        body.className = '';
        ambientBreathe.classList.remove('anim-breathe');

        // Apply new mood class
        body.classList.add(`theme-${mood}`);
        const config = moodConfig[mood];

        // Populate Context Box
        resultTitle.textContent = config.title;
        resultText.textContent = config.text;
        actionBtn.textContent = config.actionText;

        // Manage UI visibility
        selectorOverlay.classList.add('hidden');
        contextBox.classList.remove('hidden');
        triggerBtn.classList.add('hidden'); // Hide the trigger button while a mood is active

        // Apply animations
        if (config.containerClass) {
            body.classList.add(config.containerClass);
        }
        if (mood === 'anxious') {
            ambientBreathe.classList.add('anim-breathe');
        }
    });
});

// Reset Dashboard
resetBtn.addEventListener('click', () => {
    body.className = '';
    ambientBreathe.classList.remove('anim-breathe');
    contextBox.classList.add('hidden');
    triggerBtn.classList.remove('hidden');
});
