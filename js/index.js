/*      
let url="./song.json";
let response= fetch(url)
.then((valuee) =>{
   return valuee.json()
}).then((data)=>{
   console.log(data)
        inn="";
 data.forEach(item  => {
    inn += 
        ` <div class="card"  data-id="${item.id}">
        
           <img src="${item.img}"  alt="song">
           <h2>${item.title}</h2>
          

            <div class="btnsong">
        <i class="fa-solid fa-play"></i>
        </div>
       </div>
`
console.log("heooo")
    });
    document.getElementById("cardcontainer").innerHTML=inn;
    addClickEvents();
});



let btnsong = document.getElementById("btnsong");
 let audio = document.querySelector(".audio");
 

function addClickEvents(){
  let card = document.querySelectorAll(".card");
 card.forEach((songbtn =>{
 

   songbtn.addEventListener("click",()=>{
 let song_id = songbtn.getAttribute("song_id");
 window.location.href ="./songs.html?id=1";
 console.log("song ")
    })
 }))

}

*/


let url="./song.json";
let response= fetch(url)
.then((valuee) =>{
   return valuee.json()
}).then((data)=>{
   console.log(data)
        inn="";
 data.forEach(item  => {
    inn += 
        ` <div class="card"  data-id="${item.id}">
        
           <img src="${item.img}"  alt="song">
           <h2>${item.title}</h2>
          <p>${item.artist}</p>

            <div class="btnsong">
        <i class="fa-solid fa-play"></i>
        </div>
       </div>
`

    });
    document.getElementById("cardcontainer").innerHTML=inn;
    addClickEvents();
});


 

function addClickEvents(){
   document.querySelectorAll(".card").forEach(songcard =>{
  songcard.addEventListener("click", (e) =>{ 
    e.stopPropagation ();   // card pe Click pe song ka page opne hone se rokhne ke liye
      console.log("btnn clicked")
});

songcard.querySelector(".btnsong").addEventListener("click",()=>{   // button Click pe new song ka page open hoga
let songId = songcard.dataset.id;
window.location.href =`song.html?id=${songId}&autoplay=1`;
 console.log("song ")
 
 
    });


})

}











