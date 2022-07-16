const image = document.querySelector('img');
const title = document.getElementById('title');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const songs = 15;


// Check if playing
let isPlaying = false;


// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    music.pause();
}

// PLay or pause
playBtn.addEventListener('click', () => (isPlaying? pauseSong() : playSong() ));

// Current song
let songIndex = 1;

// Update DOM

function loadSong(songInd) {
    title.textContent = songInd;
    music.src = `./music/${songInd}.mp3`;
}



// Previous song
function prevSong() {
    songIndex--;
    if(songIndex < 1) {
        songIndex = songs;
    };
    loadSong(songIndex);
    playSong();
}

// Next song
function nextSong() {
    songIndex++;
    if(songIndex > songs) {
        songIndex = 1;
    }
    loadSong(songIndex);
    playSong();
}

// // // On-load Select first song
loadSong(songIndex);

function updateProgressBar(e) {
    if(isPlaying) {
        const {duration, currentTime} = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        if(durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        };
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

    }
}

function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;
};

 
// Event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
