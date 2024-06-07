// Custom Play/Pause function with a little help from:
// https://css-tricks.com/lets-create-a-custom-audio-player/#aa-display-the-audio-duration


// Arrays with individually ID'd play/pause buttons
const playButtons = document.querySelectorAll('.audio-play');
const pauseButtons = document.querySelectorAll('.audio-pause');

const playbackBar = document.querySelector('.playback-footer')
const playbackBarHidden = document.querySelector('.playback-footer-hidden')
const hidePlayback = document.querySelector('#hide-playback')
const showPlayback = document.querySelector('#show-playback')
const playBackBarButton = document.querySelectorAll('.pb-bar-button')

// Web Audio API initialisation (for audio animation)
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
const analyser = audioContext.createAnalyser();

// Array of all buttons on site
const buttons = document.querySelectorAll('button');
// Listening for each button and calling button filter function if pressed
buttons.forEach(function(button) {
  button.addEventListener('click', function() {
      filterButtonPress(button);
  });
});

// Default button state is play
let state = 'paused';

function pauseCurrentStream() {
  // Run through audio elements to check if any are playing and pause the stream
  for (const stream of document.querySelectorAll('audio')) {
      stream.pause();
      // Replacing play icon and hiding pause
      changeStreamControls(stream.nextElementSibling.nextElementSibling, 'pause');
  }
}

function changeStreamControls(button, action) {
  if (action == 'play'){
    // Hide play button and display pause icon based on ids
    let buttonsToChange = document.querySelectorAll('#' + CSS.escape(button.id))
    buttonsToChange.forEach(function(control) {
      control.classList.add('d-none');
      control.nextElementSibling.classList.replace('d-none', 'd-block');
    })
    // And on playback bar
    document.querySelector('.pb-bar-play').classList.add('d-none');
    document.querySelector('.pb-bar-play').nextElementSibling.classList.replace('d-none', 'd-block');
  }
  else {
    // Hide pause button and display play icon based on ids
    let buttonsToChange = document.querySelectorAll('#' + CSS.escape(button.id))
    buttonsToChange.forEach(function(control) {
      control.classList.replace('d-block', 'd-none')
      control.previousElementSibling.classList.replace('d-none', 'd-block');
    })
  }
}

function filterButtonPress(button) {
  // Filter play and pause button presses
  if (button.id.includes('play-icon')){
    playStream(button);
  }
  else if (button.id.includes('pause-icon')){
    pauseStream(button);
  }
  else if (button.id == 'hide-playback') {
    hidePlaybackBar();
  }
  else if (button.id == 'hide-rand-playback') {
    hideRandPlaybackBar();
  }
  else if (button.id == 'show-playback') {
    showPlaybackBar();
  }
  else if (button.id == 'show-rand-playback') {
    showRandPlaybackBar();
  }
}

function playStream(button) {
  // Pause Currently running stream
  pauseCurrentStream();
  // Get audio id from custom button id
  let audioId = button.getAttribute('id').replace('play-icon', 'audio');
  let audio = document.querySelector('#' + CSS.escape(audioId));
  var playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.then(function() {
    }).catch(function(error) {
      // Playback Failed Error
      // To add UI element....
      console.log("Playback Failed!");
    });
  }
  changeStreamControls(button, 'play');
  // Get stream details and trigger playback bar
  let buttonId = button.getAttribute('id');
  document.querySelector('.station-title').innerHTML = extractStationInfo(buttonId, 'station-name');
  document.querySelector('.pb-station-country').innerHTML = extractStationInfo(buttonId, 'station-country');
  document.querySelector('.pb-station-homepage').href = extractStationInfo(buttonId, 'station-homepage');
  showPlaybackBar(buttonId);
}

function extractStationInfo(buttonId, idType) {
  let Id = buttonId.replace('play-icon', idType);
  return document.querySelector('#' + CSS.escape(Id)).innerHTML;
}

function pauseStream(button) {
  // Pause Currently Playing stream
  pauseCurrentStream();
  changeStreamControls(button, 'pause');
}

function showPlaybackBar(buttonId) {
  // Display Playback bar
  playbackBar.classList.remove('playback-footer-hidden', 'd-none');
  // Playback bar controls
  hidePlayback.classList.replace('d-none', 'd-block');
  showPlayback.classList.replace('d-block', 'd-none');
  // Adding Play/pause ids to link buttons
  if (buttonId) {
    document.querySelector('.pb-bar-play').id = buttonId;
    document.querySelector('.pb-bar-pause').id = buttonId.replace('play-icon', 'pause-icon');
  }
}

function showRandPlaybackBar(buttonId) {
  // Display Playback bar
  document.querySelector('#rand-playback-footer').classList.remove('playback-footer-hidden', 'd-none');
  // Playback bar controls
  document.querySelector('#hide-rand-playback').classList.replace('d-none', 'd-block');
  document.querySelector('#show-rand-playback').classList.replace('d-block', 'd-none');
  // Adding Play/pause ids to link buttons
  if (buttonId) {
    document.querySelector('.pb-bar-play').id = buttonId;
    document.querySelector('.pb-bar-pause').id = buttonId.replace('play-icon', 'pause-icon');
  }
}

function hidePlaybackBar() {
  playbackBar.classList.add('playback-footer-hidden');
  hidePlayback.classList.replace('d-block', 'd-none');
  showPlayback.classList.replace('d-none', 'd-block');
}   

function hideRandPlaybackBar() {
  document.querySelector('#rand-playback-footer').classList.add('playback-footer-hidden');
  document.querySelector('#hide-rand-playback').classList.replace('d-block', 'd-none');
  document.querySelector('#show-rand-playback').classList.replace('d-none', 'd-block');
}