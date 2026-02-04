const params = new URLSearchParams(window.location.search);
const songId = params.get("id");

fetch("song.json")
.then(res => res.json())
.then(data => {
  const song = data.find(item => item.id == songId);

  document.getElementById("songImg").src = song.image;
  document.getElementById("songTitle").innerText = song.title;
  document.getElementById("songArtist").innerText = song.artist;
  document.getElementById("audio").src = song.audio;
  document.getElementById("lyricsBox").innerText = song.lyrics;
});

document.getElementById("lyricsBtn").onclick = () => {
  const box = document.getElementById("lyricsBox");
  box.style.display = box.style.display === "none" ? "block" : "none";
};
