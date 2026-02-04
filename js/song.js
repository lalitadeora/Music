
let params = new URLSearchParams(window.location.search);
let songId = params.get("id");
let autoplay = params.get("autoplay");

let audio = document.getElementById("audio");
let playBtn = document.getElementById("play");
let progress = document.getElementById("progress");
let current = document.getElementById("current");
let duration = document.getElementById("duration");
let artist= document.getElementById("artist");

fetch("./song.json")
.then(res => res.json())
.then(data => {
  let song = data.find(s => s.id == songId);

  document.getElementById("title").innerText = song.title;
  document.getElementById("cover").src = song.img;
  document.getElementById("artist").innerText = song.artist;
  audio.src = song.audio;
});


// by default Audio play hoga  when song wala page open hoga
 if (autoplay=="1" ) {
    audio.play().then(()=>{
 playBtn.innerText = "⏸️";
    }).catch(err =>{
      console.log("autoplay song:", err)
    })
   }


/* play pause */
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = "⏸️";
  } else {
    audio.pause();
    playBtn.innerText = "▶️";
  }
});

/* duration */
audio.addEventListener("loadedmetadata", () => {
  duration.innerText = formatTime(audio.duration);
});

/* progress */
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
  current.innerText = formatTime(audio.currentTime);
});

/* seek */
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
});

function formatTime(time) {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  return `${min}:${sec < 10 ? "0"+sec : sec}`;
}
