let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume= document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');
const background = document.getElementById("video-background");
let playVideoBtn = document.getElementById("btn-change-background")


const cookieBox = document.querySelector(".wrapper"),
    acceptBtn = cookieBox.querySelector("button");

    acceptBtn.onclick = ()=>{
		//setting cookie for 1 month-> 7 days, after  it'll be expired automatically
		document.cookie = "Cookie=Aruka; max-age="+60*60*24*7;
		if(document.cookie){ //if cookie is set
		  cookieBox.classList.add("hide"); //hide cookie box
		}else{ //if cookie not set then alert an error
		  alert("Cookie can't be set! Please unblock this site from the cookie setting of your browser.");
		}
	  }
	  let checkCookie = document.cookie.indexOf("Cookie=Aruka"); //checking our cookie
	  //if cookie is set then hide the cookie box else show it
	  checkCookie != -1 ? cookieBox.classList.add("hide") : cookieBox.classList.remove("hide");
  
  


	document.cookie = "MENTORS=CRUSH; expires=Wed, 15-Jun-2022 16:00:00 UTC;";
	alert(document.cookie);


function playVideo(){
	if(background.paused){
	  background.play();
	  playVideoBtn.style.backgroundColor = '#ccc';
	  playVideoBtn.innerHTML = '<p style="color: black;">pause the video</p>'
	}else{
	  background.pause()
	  playVideoBtn.style.backgroundColor = '#FF8A65'
	  playVideoBtn.innerHTML = '<p style="color: white;">play the video</p>'
	}
}

let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

//create a audio Element
let track = document.createElement('audio');


//All songs list
let All_song = [
   {
     name: "Sparkle",
     path: "music/song1.mp3",
     img: "img/img1.jpg",
     singer: "Yojiro Noda"
   },
   {
     name: "Zenzenzense",
     path: "music/song2.mp3",
     img: "img/img2.jpg",
     singer: "Yojiro Noda"
   },
   {
     name: "Dream Lantern",
     path: "music/song3.mp3",
     img: "img/img3.jpg",
     singer: "Yojiro Noda"
   },
   {
     name: "Nandemonaiya",
     path: "music/song4.mp3",
     img: "img/img4.jpg",
     singer: "Akira Kuwahara"
   },
   {
     name: "Cafe at last",
     path: "music/song5.mp3",
     img: "img/img5.jpg",
     singer: "Akira Kuwahara"
   }
];


// All functions


// function load the track
function load_track(index_no){
	clearInterval(timer);
	reset_slider();

	track.src = All_song[index_no].path;
	title.innerHTML = All_song[index_no].name;	
	track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();

	timer = setInterval(range_slider ,1000);
	total.innerHTML = All_song.length;
	present.innerHTML = index_no + 1;
}

load_track(index_no);


//mute sound function
function mute_sound(){
	track.volume = 0;
	volume.value = 0;
	volume_show.innerHTML = 0;
}


// checking.. the song is playing or not
 function justplay(){
 	if(Playing_song==false){
 		playsong();

 	}else{
 		pausesong();
 	}
 }


// reset song slider
 function reset_slider(){
 	slider.value = 0;
 }

// play song
function playsong(){
  track.play();
  Playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

//pause song
function pausesong(){
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}


// next song
function next_song(){
	if(index_no < All_song.length - 1){
		index_no += 1;
		load_track(index_no);
		playsong();
	}else{
		index_no = 0;
		load_track(index_no);
		playsong();

	}
}


// previous song
function previous_song(){
	if(index_no > 0){
		index_no -= 1;
		load_track(index_no);
		playsong();

	}else{
		index_no = All_song.length;
		load_track(index_no);
		playsong();
	}
}


// change volume
function volume_change(){
	// <!--volume_show.innerHTML = recent_volume.value;-->
	track.volume = recent_volume.value / 100;
	volume_show.innerHTML=recent_volume.value;
	// track.volume=save_value/100;
	localStorage.setItem('sound',recent_volume.value);
}

// change slider position 
function change_duration(){
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

// autoplay function
function autoplay_switch(){
	if (autoplay==1){
       autoplay = 0;
       auto_play.style.background = "rgba(255,255,255,0.2)";
	}else{
       autoplay = 1;
       auto_play.style.background = "#FF8A65";
	}
}

function setVolumeFromStorage() {
	const volume = localStorage.getItem('sound');
	track.volume = volume / 100;
	volume_show.innerHTML= volume;
}

function range_slider(){
	let position = 0;
        
        // update slider position
		if(!isNaN(track.duration)){
		   position = track.currentTime * (100 / track.duration);
		   slider.value =  position;
	      }

       
       // function will run when the song is over
       if(track.ended){
       	 play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
           if(autoplay==1){
		       index_no += 1;
		       load_track(index_no);
		       playsong();
           }
	    }
     }