
let currentScheme = localStorage.scheme ? localStorage.scheme : 'light';
setScheme(currentScheme);
let htmlColorSchemeBtn;

function setScheme(scheme) {
    
    let validatedScheme = ['light', 'dark'].includes(scheme) ? scheme : 'light';
    localStorage.scheme = validatedScheme; 
    currentScheme = validatedScheme;
    document.documentElement.dataset.scheme = validatedScheme;
};

function switchScheme() {
    
    if (currentScheme === 'dark') {setScheme('light');} else {setScheme('dark');};
};

document.addEventListener('DOMContentLoaded', function() {

    htmlColorSchemeBtn = document.getElementById('js-color-scheme-btn');
    htmlColorSchemeBtn.addEventListener('click', () => { switchScheme(); });
});
