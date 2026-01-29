// On crée un dictionnaire pour stocker les sons en boucle (loops) actifs
const sonsActifs = {};

function jouerSon(nomFichier, estUneBoucle = false) {
    // 1. On définit le chemin vers le fichier
    // Si ton site est dans un sous-dossier sur GitHub, 
    // ajoute le nom du projet devant : '/nom-du-projet/assets/sounds/...'
    const chemin = '/DandD/assets/sounds/' + nomFichier + '.mp3';

    // 2. Cas d'une AMBIANCE (Boucle)
    if (estUneBoucle) {
        if (sonsActifs[nomFichier]) {
            // Si le son joue déjà, on l'arrête (Toggle)
            sonsActifs[nomFichier].pause();
            delete sonsActifs[nomFichier];
            event.currentTarget.classList.remove('active'); // On retire l'effet visuel
        } else {
            // On crée le son, on active la boucle et on joue
            const audio = new Audio(chemin);
            audio.loop = true;
            audio.play();
            sonsActifs[nomFichier] = audio;
            event.currentTarget.classList.add('active'); // On ajoute l'effet visuel
        }
    } 
    // 3. Cas d'un BRUITAGE (One-shot)
    else {
        const audio = new Audio(chemin);
        audio.play().catch(error => {
            console.error("Erreur de lecture : Vérifiez le nom du fichier et le chemin.", error);
        });
    }
}

function stopperTout() {
    // On coupe toutes les boucles en cours
    for (let cle in sonsActifs) {
        sonsActifs[cle].pause();
    }
    // On vide le dictionnaire
    for (let cle in sonsActifs) delete sonsActifs[cle];
    
    // On retire le style "actif" de tous les boutons
    document.querySelectorAll('.sound-btn').forEach(btn => btn.classList.remove('active'));
}