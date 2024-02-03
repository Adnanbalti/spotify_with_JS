let songIndex = 0;
// console.log(songIndex);

const audioElement = new Audio('songs/1.mp3');
// console.log(audioElement);
const masterPlay = document.getElementById('masterplay');
const myProgressBar = document.getElementById('myProgressBar');
const gif = document.getElementById('gif');
const masterSongName = document.getElementById('masterSongName');
const songItems = Array.from(document.getElementsByClassName('songItem'));
const songPlayList = Array.from(document.getElementsByClassName('songPlayList'));

let songs = [
    { name: 'slam ishq pagal_world', filePath: 'songs/1.mp3', coverPath: 'covers/1.jpg' },
    { name: 'tu hi hai Ashiqi pagal_world', filePath: 'songs/2.mp3', coverPath: 'covers/2.jpg' },
    { name: 'jome jo pathan pagal_world', filePath: 'songs/3.mp3', coverPath: 'covers/3.jpg' },
    { name: 'hosh mai nh hai pagal_world', filePath: 'songs/4.mp3', coverPath: 'covers/4.jpg' },
    { name: 'chaleye jawan pagal_world', filePath: 'songs/5.mp3', coverPath: 'covers/5.jpg' },
    { name: 'ek mange agar pagal_world', filePath: 'songs/6.mp3', coverPath: 'covers/6.jpg' },
    { name: 'ishq sufiyana pagal_world', filePath: 'songs/7.mp3', coverPath: 'covers/7.jpg' },
    { name: 'jo tu mera hmdard hai pagal_world', filePath: 'songs/8.mp3', coverPath: 'covers/8.jpg' },
    { name: 'khabi jo badal pagal_world', filePath: 'songs/9.mp3', coverPath: 'covers/9.jpg' },
    { name: 'tu mile dil khile pagal_world', filePath: 'songs/10.mp3', coverPath: 'covers/10.jpg' }
];

songItems.forEach((element, i) => {
    // console.log(element, i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].name;
});

// Handle play/pause events
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterSongName.innerText = songs[songIndex].name;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener('timeupdate', () => {
    console.log(myProgressBar);

    // Seekbar 

    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', (e) => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100
})

const makeAllPlay = () => {
    songPlayList.forEach((element) => {
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
    })
}

songPlayList.forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay()
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].name;
        audioElement.play();
        audioElement.currentTime = 0;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    })

})

document.getElementById("next").addEventListener("click", () => {
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].name;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener("click", () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].name;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})