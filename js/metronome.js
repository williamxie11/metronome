var key = ''; // Your EchoNest API key here!

var tapCount = 0;
var BPM = 0;
var startTapTime;
var lastTapTime;

var audio = new Audio();
audio.volume = 0.75;

$(audio).bind('ended', function() {
  update();
  getSongResults(BPM);
});

$(document).keypress(function(e) {
	if (e.keyCode === 32) { // spacebar
		update();
    animate();
    $('#metronome-tap').get(0).play();
    document.getElementById('metronome-tap').play();
    tapCount += 1;
	}
  if (e.keyCode === 114) { // r
    reset();
  }
  if (e.keyCode === 102) { // f
    getSongResults(BPM);
  }
});

function update() {
  var currentTime = new Date().getTime();
  if (tapCount === 0) {
    startTapTime = currentTime;
  }
  else if (currentTime - lastTapTime > 3000) {
    tapCount = 0;
    startTapTime = currentTime;
  }
  else {
    BPM = calculateBPM(currentTime);
  }
  lastTapTime = currentTime;
  $('.BPM').text(BPM);
}

function animate() {
  var drum = $('.drum');
  if (drum.hasClass('drum-left')) {
    drum.removeClass('drum-left').addClass('drum-right');
  }
  else if (drum.hasClass('drum-right')) {
    drum.removeClass('drum-right').addClass('drum-left');
  }
  else {
    drum.addClass('drum-left');
  }
}

function reset() {
	tapCount = 0;
  BPM = 0;
  audio.pause();
  update();
  
  $('#song-name').empty();
  $('#song-artist').empty();
  $('#song-album').empty();
  $('.drum').removeClass('drum-left').removeClass('drum-right');
}

function calculateBPM(currentTime) {
  var elapsedMinutes = 60000 / (currentTime - startTapTime);
  return Math.round(tapCount * elapsedMinutes);
}

function playSong(src) {
  audio.src = src;
  audio.play();
}

function updateSongView(res) {
  var songName = res.name;
  var artistName = res.artists[0].name;
  var albumImageSrc = res.album.images[1].url;
  var albumLink = res.external_urls.spotify;
  
  $('#song-name').text(songName);
  $('#song-artist').text(artistName);
  $('#song-album').html('<a target="_blank" href="' + albumLink + '"><img class="animated fadeIn album-image" src="' + albumImageSrc + '"></img></a>');
}