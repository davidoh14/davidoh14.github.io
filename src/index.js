const keyboard = [
'1', '2', '3','4', '5', '6', '7', '8', '9', '0', '-', 
'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 
'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';',
'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']

// const Cmin11 = ['C']


const keys = document.querySelectorAll('.key')

keys.forEach(key => {
    key.addEventListener('click', () => playNote(key))
})

document.addEventListener('keydown', e => {
    if (e.repeat) return
    const key = e.key;
    const keyIndex = keyboard.indexOf(key);

    if (keyIndex > -1) playNote(keys[keyIndex])
})

document.addEventListener('keyup', e => {
    const key = e.key;
    const keyIndex = keyboard.indexOf(key);

    const divKey = keys[keyIndex]
    const note = divKey.dataset.note
    const octave = divKey.dataset.octave

    if (keyIndex > -1) {
        keys[keyIndex].classList.remove('active');
        const playingNote = Object.keys(playing).filter(key => key === `${note}${octave}`)
        const noteAudio = playing[playingNote]
        stopNote(noteAudio);
    }
})

const playing = {}; // playing[playingNote] = noteAudio
console.log(playing)

function playNote(key){
    if (!key.dataset.note) return;
    const noteURL = "samples/piano/" + key.dataset.note + key.dataset.octave + ".wav";
    const noteAudio = new Audio(noteURL)

    noteAudio.play()
    noteAudio.classList.add('playing')
    playing[`${key.dataset.note}${key.dataset.octave}`] = noteAudio
    console.log(playing)

    key.classList.add('active')
    noteAudio.addEventListener('ended', () => key.classList.remove('active'))
    key.addEventListener('keyup', () => console.log('blah'))
}

function stopNote(noteAudio){
    noteAudio.volume = Math.min(1, noteAudio.volume)
    const fadePoint = noteAudio.currentTime;

    noteAudio.pause();

    const temp = Object.values(playing).filter(val => val === noteAudio)
    console.log(temp)
    // playing.remove()
    // const fadeAudio = setInterval(function () {
    //     if ((noteAudio.currentTime >= fadePoint) && (noteAudio.volume != 0.00)) {
    //         // console.log('2')
    //         noteAudio.volume -= 0.10;
    //     } else if (noteAudio.volume === 0.00) {
    //         // console.log('3')
    //         clearInterval(fadeAudio);
    //     } else {
    //         // console.log('4')
    //     }
    // }, 200);
}

const chords = document.querySelectorAll('.chord')
chords.forEach(chord => {
    chord.addEventListener('click', () => playToggle(chord));
})

function playToggle(chord){
    if (chord.classList.contains('active')) {
        pauseChord(chord);
    } else {
        playChord(chord);
    }
}

function playChord(chord){
    const chordURL = "samples/LANDR/" + chord.dataset.chord + ".wav"
    console.log(chordURL)
    const chordAudio = new Audio(chordURL);
    console.log(chordAudio)

    chordAudio.play();
    chordAudio.loop = true;
    chord.classList.add('active')
}

function pauseChord(chord){
    const chordURL = "samples/LANDR/" + chord.dataset.chord + ".wav"
    const chordAudio = new Audio(chordURL);
    chordAudio.pause();
    chord.classList.remove('active')
}

// loop pause, change to buttons
// separate notes from octaves
// loop through each key and set a src file that takes in the respective note and octave
// be able to decrement octave 
// instrument variable 
// create array for each key, and logic to only permit notes in that key
// toggle for staccato vs legato
// relook into setInterval

