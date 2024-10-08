const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')
const playListButton = document.getElementById('playlist')


const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton = document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress = document.getElementById('current-progress')

// *turn
let index

// *loop
let loop = true

// *list
const songsList = [{
        name: "One Of The Girls",
        link: "assets/oneofthegirls.mp3",
        artist: "Jennie",
        image: "assets/jenniy.jpeg"
    },
    {
        name: "chery chery lady",
        link: "assets/modern_talking.mp3",
        artist: "Modern Talking",
        image: "assets/Moderntalking.jpg"
    },
    {
        name: "Yad",
        link: "assets/yad.mp3",
        artist: "Яд - Эрика Лундмоен ",
        image: "assets/indir.jpeg"
    },
    {
        name: "The neighborhood",
        link: "assets/The_neighborhood.mp3",
        artist: "Softcore",
        image: "assets/neighbourhood.jpeg"
    }

]

//* Music assignment
const setSong = (arrayIndex) => {
    console.log(arrayIndex)
    let { name, link, artist, image } = songsList[arrayIndex]
    audio.src = link
    songName.innerHTML = name
    songArtist.innerHTML = artist
    songImage.src = image

    //* Set time
    audio.onloadedmetadata = () => {
        maxDuration.innerText = timeFormatter(audio.duration)
    }

    playListContainer.classList.add('hide')
    playAudio()
}

const timeFormatter = (timeInput) => {
    let minute = Math.floor(timeInput / 60)
    minute = minute < 10 ? "0" + minute : minute
    let second = Math.floor(timeInput % 60)
    second = second < 10 ? "0" + second : second
    return `${minute}:${second}`
}

//* Play music
const playAudio = () => {
    audio.play()
    pauseButton.classList.remove("hide")
    playButton.classList.add("hide")
}

//* Song stop
const pauseAudio = () => {
    audio.pause()
    pauseButton.classList.add("hide")
    playButton.classList.remove("hide")
}


//* Next Music
const nextSong = () => {
    if (loop) {
        if (index == (songsList.length - 1)) {
            index = 0
        } else {
            index++
        }
    } else {
        let randIndex = Math.floor(Math.random() * songsList.length)
        index = randIndex
    }
    setSong(index)
    playAudio()
}

const previousSong = () => {
    pauseAudio()
    if (index > 0) {
        index--
    } else {
        index = songsList.length - 1
    }
    setSong(index)
    playAudio()

}

//* Play and Pause
playButton.addEventListener("click", playAudio)
pauseButton.addEventListener("click", pauseAudio)

//* Next song
nextButton.addEventListener("click", nextSong)
prevButton.addEventListener("click", previousSong)

//* Mix Button
shuffleButton.addEventListener("click", () => {
    if (shuffleButton.classList.contains("active")) {
        shuffleButton.classList.remove("active")
        loop = true
    } else {
        shuffleButton.classList.add("active")
        loop = false
    }
})
repeatButton.addEventListener("click", () => {
    if (repeatButton.classList.contains("active")) {
        repeatButton.classList.remove("active")
        loop = true
    } else {
        repeatButton.classList.add("active")
        loop = false
    }
})

// * progress bar
progressBar.addEventListener('click', (event) => {
    let coordStart = progressBar.getBoundingClientRect().left
    console.log(coordStart)

    let coordEnd = event.clientX
    console.log(coordEnd)

    console.log("progressBar.offsetWidth: " + progressBar.offsetWidth)

    let progress = (coordEnd - coordStart) / progressBar.offsetWidth
    currentProgress.style.width = (audio.currentTime / audio.duration) * 100 + "%"

    console.log(progress)

    audio.currentTime = progress * audio.duration
    audio.play()
    pauseButton.classList.remove("hide")
    playButton.classList.add("hide")
})

setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
    currentProgress.style.width = (audio.currentTime / audio.duration)
}, 1000);

audio.addEventListener('timeupdate', () => {
    currentTimeRef.innerText = timeFormatter(audio.currentTime)
})


audio.onended = () => {
    nextSong()
}


const initializePlaylist = () => {
    for (let i in songsList) {
        playListSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
            <div class="playlist-image-container">
                <img src="${songsList[i].image}" />
            </div>
            <div class="playlist-song-details">
                <span id="playlist-song-name">
                    ${songsList[i].name}
                </span>
                <span id="playlist-song-artist-album">
                    ${songsList[i].artist}
                </span>
            </div>
        </li>
        `
    }
}

//* Refresh screen
window.onload = () => {
    index = 0
    setSong(index)
    playAudio()
}