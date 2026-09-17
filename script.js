
// Get HTML elements
const audio = document.getElementById("audio");

const title = document.getElementById("song-title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const previousBtn = document.getElementById("previous");

const progress = document.getElementById("progress");

const currentTime = document.getElementById("current-time");
const totalTime = document.getElementById("total-time");

const playlist = document.getElementById("playlist");
const autoplayBtn = document.getElementById("autoplayBtn");



// Music playlist
const songs = [
    {
        title: "kaka",
        artist: "Arijit Singh",
        file: "songs/song1.mp3"
    },

    {
        title: "fakira",
        artist: "Arijit Singh",
        file: "songs/song2.mp3"
    },

    {
        title: "isqde faniyar",
        artist: "Arijit Singh",
        file: "songs/song3.mp3"
    },

    {
        title: "Andaze karam",
        artist: "Arijit Singh",
        file: "songs/song4.mp3"
    },

    {
        title: "Sitare",
        artist: "Arijit Singh, Shilpa Rao",
        file: "songs/song5.mp3"
    }
];


// Current song number
let songIndex = 0;


// Autoplay status
let autoplay = false;


// Load a song
function loadSong(index) {

    const song = songs[index];

    title.textContent = song.title;
    artist.textContent = song.artist;

    audio.src = song.file;

    updatePlaylist();
}


// Play song
function playSong() {

    audio.play();

    playBtn.textContent = "⏸";
}


// Pause song
function pauseSong() {

    audio.pause();

    playBtn.textContent = "▶";
}


// Play/Pause button
playBtn.addEventListener("click", function() {

    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }

});


// Next song
nextBtn.addEventListener("click", function() {

    songIndex++;

    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    loadSong(songIndex);
    playSong();

});


// Previous song
previousBtn.addEventListener("click", function() {

    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songIndex);
    playSong();

});


// Update progress bar while song is playing
audio.addEventListener("timeupdate", function() {

    if (audio.duration) {

        const progressValue =
            (audio.currentTime / audio.duration) * 100;

        progress.value = progressValue;

        currentTime.textContent =
            formatTime(audio.currentTime);
    }

});


// Show total duration when song loads
audio.addEventListener("loadedmetadata", function() {

    totalTime.textContent =
        formatTime(audio.duration);

});


// Change song position using progress bar
progress.addEventListener("input", function() {

    const newTime =
        (progress.value / 100) * audio.duration;

    audio.currentTime = newTime;

});


// When song finishes
audio.addEventListener("ended", function() {

    if (autoplay) {

        songIndex++;

        if (songIndex >= songs.length) {
            songIndex = 0;
        }

        loadSong(songIndex);
        playSong();

    } else {

        playBtn.textContent = "▶";
    }

});


// Autoplay button
autoplayBtn.addEventListener("click", function() {

    autoplay = !autoplay;

    if (autoplay) {
        autoplayBtn.textContent = "Autoplay: ON";
    } else {
        autoplayBtn.textContent = "Autoplay: OFF";
    }

});


// Create playlist
function createPlaylist() {

    playlist.innerHTML = "";

    songs.forEach(function(song, index) {

        const li = document.createElement("li");

        li.textContent =
            song.title + " - " + song.artist;

        li.addEventListener("click", function() {

            songIndex = index;

            loadSong(songIndex);
            playSong();

        });

        playlist.appendChild(li);

    });

}


// Highlight current song
function updatePlaylist() {

    const items = playlist.querySelectorAll("li");

    items.forEach(function(item, index) {

        if (index === songIndex) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }

    });

}


// Convert seconds into MM:SS
function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);

    const secs = Math.floor(seconds % 60);

    return String(minutes).padStart(2, "0")
        + ":" +
        String(secs).padStart(2, "0");
}


// Start the player
createPlaylist();
loadSong(songIndex);
