// DOM Elements
const body = document.body;
const container = document.getElementById('main-container');
const triggerBtn = document.getElementById('trigger-btn');
const initialView = document.getElementById('initial-view');
const selectorView = document.getElementById('selector-view');
const moodSelector = document.getElementById('mood-selector');
const resultView = document.getElementById('result-view');
const resetBtn = document.getElementById('reset-btn');

const resultTitle = document.getElementById('result-title');
const resultText = document.getElementById('result-text');
const actionBtn = document.getElementById('action-btn');
const ambientBreathe = document.getElementById('ambient-breathe');

// Mood Configurations
const moodConfig = {
    depressed: {
        title: "It's okay to just exist right now.",
        text: "No demands. No loud noises. We've dimmed the lights and slowed things down. Take all the time you need.",
        actionText: "Tell me something gentle",
        containerClass: 'anim-float'
    },
    anxious: {
        title: "Follow the circle.",
        text: "Breathe in as it grows. Breathe out as it shrinks. The nervous system just needs a steady rhythm to follow right now.",
        actionText: "Help me ground myself",
        containerClass: ''
    },
    stressed: {
        title: "Okay, let's sort this out.",
        text: "One thing at a time. No chaos, just structure. We can break down whatever is in front of you.",
        actionText: "Help me prioritize",
        containerClass: 'anim-grounded'
    },
    happy: {
        title: "Yes! Love this for you.",
        text: "Let's capture this energy! The page is genuinely celebrating with you.",
        actionText: "Let's celebrate!",
        containerClass: 'anim-pulse'
    },
    overstimulated: {
        title: "Shhh.",
        text: "We've turned off the lights and muted the internet. The contrast is low so it doesn't hurt your eyes. No one is perceiving you here.",
        actionText: "Give me one quiet, simple task",
        containerClass: ''
    },
    'burned-out': {
        title: "Battery at 1%.",
        text: "You don't need to be productive right now. The brain fog is real. Let's just exist on standby until the charger kicks in.",
        actionText: "Send me a mindless distraction",
        containerClass: 'anim-blur'
    },
    delulu: {
        title: "Main Character Energy.",
        text: "Plot armor is fully engaged. Whatever you're worrying about is just necessary character development for your upcoming season finale.",
        actionText: "Hype me up even more",
        containerClass: 'anim-glow'
    },
    apathetic: {
        title: "Whatever.",
        text: "Everything is just kind of 'eh' today. We're not sad, we're not mad, we're just completely and totally whelmed. And that's fine.",
        actionText: "Roll a random, pointless fact",
        containerClass: 'font-mono'
    }
};

// Step 1: Click "Mood" -> Show Selector
triggerBtn.addEventListener('click', () => {
    initialView.classList.add('hidden');
    selectorView.classList.remove('hidden');
    setTimeout(() => {
        moodSelector.classList.add('visible');
    }, 50);
});

// Step 2: Select Mood -> Transform Page
document.querySelectorAll('.mood-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const mood = e.target.getAttribute('data-mood');
        applyMood(mood);
    });
});

function applyMood(mood) {
    // Clean up old classes
    body.className = '';
    container.className = 'container';
    ambientBreathe.classList.remove('anim-breathe');

    // Hide selector, show results
    selectorView.classList.add('hidden');
    resultView.classList.remove('hidden');
    resetBtn.classList.remove('hidden');

    // Apply new theme and content
    body.classList.add(`theme-${mood}`);
    const config = moodConfig[mood];
    
    resultTitle.textContent = config.title;
    resultText.textContent = config.text;
    actionBtn.textContent = config.actionText;

    // Apply specific animations
    if (config.containerClass) {
        container.classList.add(config.containerClass);
    }
    if (mood === 'anxious') {
        ambientBreathe.classList.add('anim-breathe');
    }
}

// The Kicker: Reset everything back to zero context
resetBtn.addEventListener('click', () => {
    body.className = '';
    container.className = 'container';
    ambientBreathe.classList.remove('anim-breathe');
    
    resultView.classList.add('hidden');
    selectorView.classList.add('hidden');
    resetBtn.classList.add('hidden');
    
    initialView.classList.remove('hidden');
    moodSelector.classList.remove('visible');
    
    triggerBtn.textContent = "Mood.";
});
