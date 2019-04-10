const player = document.querySelector(".player")
const video = player.querySelector(".player__video")
const progress = player.querySelector(".progress")
const progressFilled = progress.querySelector(".progress__filled")
const playPauseButton = player.querySelector(".toggle")
const skipButtons = player.querySelectorAll("[data-skip]")
const sliders = player.querySelectorAll(".player__slider")

function updateProgress() {
    const percent = (video.currentTime / video.duration) * 100
    progressFilled.style.flexBasis = `${percent}%`
}

function updateButton() {
    if (video.paused) {
        playPauseButton.innerText = "►"
    } else {
        playPauseButton.innerText = "❚ ❚"
    }
}

function togglePlay() {
    if (video.paused) {
        video.play()
    } else {
        video.pause()
    }
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = scrubTime
}

function skip() {
    const skipSeconds = this.dataset.skip
    video.currentTime += parseFloat(skipSeconds)
}

function updateSliderValue() {
    video[this.name] = this.value
    if (this.name === "playbackRate") {
        this.previousElementSibling.innerText = `${this.value}x`
    }
}

let mouseDown = false;

video.addEventListener("timeupdate", updateProgress)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener("click", togglePlay)
progress.addEventListener("click", scrub)
progress.addEventListener("mousemove", (e) => mouseDown && scrub(e))
progress.addEventListener("mousedown", () => mouseDown = true)
progress.addEventListener("mouseup", () => mouseDown = false)
playPauseButton.addEventListener("click", togglePlay)
skipButtons.forEach(button => button.addEventListener("click", skip))
sliders.forEach(slider => slider.addEventListener("click", updateSliderValue))