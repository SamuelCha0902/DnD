// ==========================================
// 1. GESTION DES BRUITAGES ET BOUCLES COURTES
// ==========================================
const sonsActifs = {}; 

function jouerSon(nomFichier, estUneBoucle = false) {
    const chemin = '/DnD/assets/sounds/' + nomFichier + '.mp3';

    if (estUneBoucle) {
        if (sonsActifs[nomFichier]) {
            sonsActifs[nomFichier].pause();
            delete sonsActifs[nomFichier];
            if(event) event.currentTarget.classList.remove('active');
        } else {
            const audio = new Audio(chemin);
            audio.loop = true;
            audio.play();
            sonsActifs[nomFichier] = audio;
            if(event) event.currentTarget.classList.add('active');
        }
    } else {
        const audio = new Audio(chemin);
        audio.play();
    }
}

// ==========================================
// 2. GESTION DU LECTEUR DE MUSIQUE LONGUE
// ==========================================
let currentLongMusic = new Audio();

// On récupère les éléments HTML (ils doivent exister dans ta page)
const playPauseBtn = document.getElementById('play-pause-btn');
const seekSlider = document.getElementById('seek-slider');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');

function chargerAmbianceLongue(nomFichier, titre) {
    const chemin = '/DnD/assets/sounds/' + nomFichier + '.mp3';
    
    // On change la source et on joue
    currentLongMusic.src = chemin;
    document.getElementById('current-track-title').innerText = titre;
    currentLongMusic.play();
    
    if(playPauseBtn) playPauseBtn.innerText = "⏸";
}

function togglePlay() {
    if (currentLongMusic.paused) {
        currentLongMusic.play();
        if(playPauseBtn) playPauseBtn.innerText = "⏸";
    } else {
        currentLongMusic.pause();
        if(playPauseBtn) playPauseBtn.innerText = "▶";
    }
}

function skip(secondes) {
    currentLongMusic.currentTime += secondes;
}

// Mise à jour de la barre pendant la lecture
currentLongMusic.ontimeupdate = () => {
    if (seekSlider && !isNaN(currentLongMusic.duration)) {
        const progress = (currentLongMusic.currentTime / currentLongMusic.duration) * 100;
        seekSlider.value = progress;
        
        if(currentTimeDisplay) currentTimeDisplay.innerText = formatTime(currentLongMusic.currentTime);
        if(durationDisplay) durationDisplay.innerText = formatTime(currentLongMusic.duration);
    }
};

// Quand on déplace le curseur manuellement
if(seekSlider) {
    seekSlider.oninput = () => {
        const seekTo = currentLongMusic.duration * (seekSlider.value / 100);
        currentLongMusic.currentTime = seekTo;
    };
}

function formatTime(secondes) {
    let min = Math.floor(secondes / 60);
    let sec = Math.floor(secondes % 60);
    return min + ":" + (sec < 10 ? '0' + sec : sec);
}

// ==========================================
// 3. FONCTION DE SILENCE TOTAL
// ==========================================
function stopperTout() {
    // Stop les boucles courtes
    for (let cle in sonsActifs) {
        sonsActifs[cle].pause();
        delete sonsActifs[cle];
    }
    
    // Stop la musique longue
    currentLongMusic.pause();
    currentLongMusic.currentTime = 0;

    // Reset visuel
    document.querySelectorAll('.sound-btn').forEach(btn => btn.classList.remove('active'));
    if(playPauseBtn) playPauseBtn.innerText = "▶";
}