let isProcessingCommand = false; // Flag to track command processing

// Initialize Speech Recognition
function initializeSpeechRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-UK';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function(event) {
        const command = event.results[0][0].transcript.toLowerCase();
        processCommand(command);
    };

    recognition.onerror = function(event) {
        if (event.error === 'no-speech') {
            console.log('No speech detected.');
        } else {
            console.error('Speech recognition error:', event.error);
        }
    };

    recognition.onend = function() {
        if (!isProcessingCommand) {
            recognition.start();
        }
    };

    return recognition;
}

const recognition = initializeSpeechRecognition();

// Process the voice command
function processCommand(command) {
    if (isProcessingCommand) {
        return;
    }
    
    isProcessingCommand = true;

    switch (command) {
        case 'change to light theme':
            changeTheme('light');
            break;
        case 'change to dark theme':
            changeTheme('dark');
            break;
        case 'change color to red':
            changeBackgroundColor('red');
            break;
        case 'change color to green':
            changeBackgroundColor('green');
            break;
        case 'change color to blue':
            changeBackgroundColor('blue');
            break;
        case 'good morning':
            speak('Good morning! How can I assist you today?');
            break;
        case 'good afternoon':
            speak('Good afternoon! How can I assist you today?');
            break;
        case 'good evening':
            speak('Good evening! How can I assist you today?');
            break;
        case 'hello':
            speak('Hello! How can I help you?');
            break;
        case 'hi':
            speak('Hi! What can I do for you?');
            break;
        case 'reset to original mode':
            resetToOriginalMode();
            break;
        case 'go to home':
            navigateTo('home');
            break;
        case 'go to about':
            navigateTo('about');
            break;
        case 'go to upload':
            navigateTo('upload');
            break;
        default:
            speak('Sorry, I can\'t understand the command.');
            break;
    }

    setTimeout(() => {
        isProcessingCommand = false;
    }, 2000);
}

// Change the theme of the website
function changeTheme(theme) {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${theme}-theme`);
    speak(`Switched to ${theme} theme.`);
}

// Change the background color of the website
function changeBackgroundColor(colorName) {
    const colorMap = {
        'red': '#ff0000',
        'green': '#00ff00',
        'blue': '#0000ff',
        'yellow': '#ffff00',
        'cyan': '#00ffff',
        'magenta': '#ff00ff',
        'white': '#ffffff',
        'black': '#000000',
        'grey': '#808080',
        'orange': '#ffa500',
        'pink': '#ffc0cb',
        'purple': '#800080',
        // Add more colors or adjust as needed
    };

    const color = colorMap[colorName.toLowerCase()];
    if (color) {
        document.body.style.backgroundColor = color;
        speak(`Changing background color to ${colorName}.`);
    } else {
        speak('Sorry, that color is not recognized. Please specify a known color name.');
    }
}

// Reset the website to its original mode
function resetToOriginalMode() {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.style.backgroundColor = ''; // Reset background color
    document.body.style.backgroundImage = 'linear-gradient(135deg, #004d40, #ff5722)'; // Reset original gradient
    document.body.style.backgroundSize = '400% 400%'; // Reset background size
    speak('Resetting to the original mode.');
}

// Navigate to a specific section
function navigateTo(section) {
    const sectionMap = {
        'home': '/',
        'about': '/about',
        'upload': '/upload'
    };

    const url = sectionMap[section.toLowerCase()];
    if (url) {
        window.location.href = url;
        speak(`Navigating to ${section}.`);
    } else {
        speak('Sorry, that section is not recognized. Please specify a valid section.');
    }
}

// Speak the given text
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-UK';
    window.speechSynthesis.speak(speech);
}

// Event listener for voice command button
document.getElementById('voice-controls').querySelector('button').addEventListener('click', () => {
    recognition.start();
});
