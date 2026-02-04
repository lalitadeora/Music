let params = new URLSearchParams(window.location.search);

let autoplay = params.get("autoplay");
let currentId = params.get("id");
let audio= document.getElementById( "audio");
let songs =[];
let currentindex=0;


let playBtn = document.getElementById("play");
let progress = document.getElementById("progress");
let current = document.getElementById("current");
let duration = document.getElementById("duration");
let artist= document.getElementById("artist");
let btnnext = document.getElementById("btnnext");

let btnprevious = document.getElementById("btnprevious");


fetch("./song.json")
.then(res => res.json())
.then(data => {
    songs= data;
//   let song = data.find(s => s.id == currentId);
currentindex= songs.findIndex(song => song.id == currentId)

  
  loadsong(currentindex);
});

function loadsong(index){
    let song = songs[index];
     document.getElementById("title").innerText = song.title;
  document.getElementById("cover").src = song.img;
  document.getElementById("artist").innerText = song.artist;
  audio.src = song.audio;



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
}

/* Auto-NEXT when song ends */

audio.addEventListener("ended", () => {
  console.log("Song finished ");
   nextSong();
});



// Click Next song Btn for next song // 

    
    btnnext.addEventListener("click", ()=>{
 currentindex++;
  if (currentindex >= songs.length) {
    currentindex = 1; // 🔁 loop back to first song
  }

  loadsong(currentindex);
  console.log("next song")
})

 
// next song auto clicked .. // 
 function nextSong(){
    currentindex++;
    if(currentindex >= songs.length){
        currentindex=1;
    }
 loadsong(currentindex);
 console.log("next song auto clicked!")
 }


  // click Previous Song btn for previous song //

btnprevious.addEventListener("click", ()=>{

    currentindex--;
    if(currentindex < 0 ){
        currentindex = songs.length -1;
    }
    loadsong(currentindex)
    console.log("previous song auto");
})



// Previous song auto clicked! ... //
function prevSong() {
  currentindex--;

  if (currentindex < 0) {
    currentindex = songs.length - 1;
  }

  loadsong(currentindex);
  console.log("previous song auto");
}


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



/* swip Page */ 
let startX = 0;

document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) {
    nextSong(); // swipe left
  }

  if (endX - startX > 50) {
    prevSong(); // swipe right
  }
});
console.log("swip")