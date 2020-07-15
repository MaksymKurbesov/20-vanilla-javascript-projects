const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');


// Song list
const songs = ['hey', 'summer', 'ukulele']

// Current song
let songIndex = 2;

// Init
loadSong(songs[songIndex])

function loadSong(song) {
  title.textContent = song

  audio.src = `./music/${song}.mp3`
  cover.src = `./images/${song}.jpg`
}

function playSong() {
  musicContainer.classList.add(`play`)
  playBtn.querySelector(`i.fas`).classList.remove(`fa-play`)
  playBtn.querySelector(`i.fas`).classList.add(`fa-pause`)

  audio.play()
}

function pauseSong() {
  musicContainer.classList.remove(`play`)

  playBtn.querySelector(`i.fas`).classList.add(`fa-play`)
  playBtn.querySelector(`i.fas`).classList.remove(`fa-pause`)

  audio.pause()
}

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex])
  audio.play()
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex])
  audio.play()
}

function updateProgress(evt) {
  const { duration, currentTime } = evt.srcElement;
  const progressPercent = (currentTime / duration) * 100

  progress.style.width = `${progressPercent}%`
}

function setProgress(evt) {
  const width = this.clientWidth;
  const clickX = evt.offsetX;
  const duration = audio.duration;
  
  audio.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener(`click`, () => {
  const isPlaying = musicContainer.classList.contains(`play`);

  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})

prevBtn.addEventListener(`click`, prevSong)
nextBtn.addEventListener(`click`, nextSong)

audio.addEventListener(`timeupdate`, updateProgress)
progressContainer.addEventListener(`click`, setProgress)

audio.addEventListener(`ended`, nextSong)