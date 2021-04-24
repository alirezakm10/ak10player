/*
js have variable hoisting and we should declare all our variable and get all DOM class & ids
after we start to writhing entire code to have a clean code script also
if you needs increase the speed of script runing you can remove my comments and minify the entire code 
and then use it.
 */
let thumbnail = document.querySelector("#thumbnail");
const progressBar = document.querySelector("#progress-bar");
const hoveredTime = document.querySelector(".hoveredTime");
const hoveredTimeMessage = document.querySelector(".hoveredTimeMessage");
const background = document.querySelector("#background");
let pPause = document.querySelector("#pPause");
let song = document.querySelector("#song");

/*
one of the main functiona in writing players with js for play and pause the track.
*/
let songIndex = 0;
let songs = [
  "./assets/musics/1.mp3",
  "./assets/musics/2.mp3",
  "./assets/musics/3.mp3",
  "./assets/musics/4.mp3",
];
thumbnails = [
  "./assets/thumbs/1.jpg",
  "./assets/thumbs/2.jpg",
  "./assets/thumbs/3.jpg",
  "./assets/thumbs/4.jpg",
];
backgrounds = [
  "./assets/backgrounds/1.jpg",
  "./assets/backgrounds/2.jpg",
  "./assets/backgrounds/3.jpg",
  "./assets/backgrounds/4.jpg",
];
let playing = true;
let playPause = () => {
  const song = document.querySelector("#song");
  if (playing) {
    thumbnail.style.transform = "scale(1.15)";
    $("#pPause").attr("class", "icofont-ui-pause icofont-2x");
    song.play();
    playing = false;

    // if (songIndex == 0) {
    //   var ofs = 0;

    //   window.setInterval(function () {
    //     $("#imp").css(
    //       "background",
    //       "rgba(255,0,0," + Math.abs(Math.sin(ofs)) + ")"
    //     );
    //     ofs += 0.01;
    //   }, 30);
    // }
    if (songIndex == 0) {
      const changeTime = 20000;
      backgroundIndex = 0;
      setInterval(() => {
        backgroundIndex++;
        if (backgroundIndex == backgrounds.length) {
          backgroundIndex = 0;
        }
        background.src = backgrounds[backgroundIndex];
      }, changeTime);
    }
  } else {
    thumbnail.style.transform = "scale(1)";
    $("#pPause").attr("class", "icofont-ui-play icofont-2x");
    song.pause();
    playing = true;
  }
};
song.addEventListener("ended", function () {
  nextSong();
});
function nextSong() {
  songIndex++;
  if (songIndex >= songs.length) {
    songIndex = 0;
  }

  song.src = songs[songIndex];
  thumbnail.src = thumbnails[songIndex];
  background.src = backgrounds[backgroundIndex];
  playing = true;
  playPause();
}
function prevSong() {
  songIndex--;
  if (songIndex < 1) {
    songIndex = 0;
  } else {
  }
  song.src = songs[songIndex];
  thumbnail.src = thumbnails[songIndex];
  playPause();
}

/*
we use this function to call it in setInterval() js method for time updaiting.
*/
let updateProgressValue = () => {
  progressBar.value = song.currentTime;
  progressBar.max = song.duration;
  document.querySelector(".currentTime").innerHTML = formatTime(
    song.currentTime
  );
  document.querySelector(".durationTime").innerHTML = formatTime(song.duration);
  if (document.querySelector(".durationTime").innerHTML === "NaN:NaN") {
    document.querySelector(".durationTime").innerHTML = "0:00";
  } else {
    document.querySelector(".durationTime").innerHTML = formatTime(
      Math.floor(song.duration)
    );
  }
};

/*
hande made function that we used it for time outputs in minutes and seconds without flitering
time in updateProgressValue function with our formatTime function we get time of the sound in
milliseconds and it's not user friendly.
*/
function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds - min * 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `0${min}:${sec}`;
}

/*
show update time of progressBar apart of real current time when user wants to see progressbar.value
before select value.
*/
progressBar.addEventListener("mousemove", function (e) {
  hoveredTimeMessage.innerHTML = "Hovered Time";
  hoveredTime.style.transform = "scale(1.50)";
  hoveredTimeMessage.style.transform = "scale(1.50)";
  let pointerTime = e.target.value;
  hoveredTime.innerHTML = formatTime(pointerTime);

  progressBar.addEventListener("mouseout", function (e) {
    hoveredTime.style.display = "none";
    hoveredTimeMessage.style.display = "none";
    hoveredTime.style.transform = "scale(1)";
    hoveredTimeMessage.style.transform = "scale(1)";
  });
  progressBar.addEventListener("mouseover", function (e) {
    hoveredTime.style.display = "block";
    hoveredTimeMessage.style.display = "block";
  });
});

/*
setInterval method run our updateProgressValue() function each 500 milliseconds
 for currentTime API automation.
 */
setInterval(updateProgressValue, 500);

/*
this hande make function is for user selected value of the song
 to go forward or backward in current track Time.
 */
function changeProgressBar() {
  song.currentTime = progressBar.value;
}
function download() {
  let link = $(".download").attr("href",`${songs[songIndex]}`);
  window.location.url="index.html";
  alert(link);
}
// function audio(){

// }
