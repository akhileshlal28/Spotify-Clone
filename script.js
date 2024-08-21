console.log("Welcome to Spotify")

// initialize variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3')
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let mainSongName = document.getElementById('mainSongName')
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs=[
    {songName: "Harr Funn Maula", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Way Down We Go", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Hymn of the Weekend", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Mark Henry - Theme Song", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
]

// play and pause song

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("bi-play-circle")
        masterPlay.classList.add("bi-pause-circle")
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("bi-pause-circle")
        masterPlay.classList.add("bi-play-circle")
        gif.style.opacity = 0
    }
})

audioElement.addEventListener('timeupdate', ()=>{
    // console.log('timeupdate')
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    console.log(progress)
    myProgressBar.value = progress
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})

songItems.forEach((element, i) => {
    console.log(element, i)
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItemplay")).forEach((element)=>{
    element.classList.remove("bi-pause-circle")
    element.classList.add("bi-play-circle")
    });
};

Array.from(document.getElementsByClassName("songItemplay")).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        if(audioElement.paused || audioElement.currentTime<=0){
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove("bi-play-circle");
            e.target.classList.add("bi-pause-circle")
            audioElement.src= `songs/${songIndex+1}.mp3`;
            mainSongName.innerText = songs[songIndex].songName;
            gif.style.opacity=1
            audioElement.play();
            masterPlay.classList.remove("bi-play-circle")
            masterPlay.classList.add("bi-pause-circle")
        }
        else{
            gif.style.opacity=0
            audioElement.pause();
            e.target.classList.add("bi-play-circle");
            e.target.classList.remove("bi-pause-circle")
            masterPlay.classList.add("bi-play-circle")
            masterPlay.classList.remove("bi-pause-circle")
        }
        
    })
});

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <=0){
        songIndex = 3;
    }else{
        songIndex -= 1;
    }
    audioElement.src= `songs/${songIndex+1}.mp3`;
    audioElement.play();
    mainSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove("bi-play-circle")
    masterPlay.classList.add("bi-pause-circle")
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >=3){
        songIndex = 0;
    }else{
        songIndex += 1;
    }
    audioElement.src= `songs/${songIndex+1}.mp3`;
    audioElement.play();
    mainSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove("bi-play-circle")
    masterPlay.classList.add("bi-pause-circle")
})

