// Custom Play/Pause function with a little help from:
// https://css-tricks.com/lets-create-a-custom-audio-player/#aa-display-the-audio-duration


// Arrays with individually ID'd play/pause buttons
const playButtons = document.querySelectorAll('.audio-play');
const pauseButtons = document.querySelectorAll('.audio-pause');

const playbackBar = document.querySelector('.playback-footer')
const playbackBarHidden = document.querySelector('.playback-footer-hidden')
const hidePlaybackBar = document.querySelector('#hide-playback')
const showPlaybackBar = document.querySelector('#show-playback')
const playBackBarButton = document.querySelector('pb-bar-button')

// Default button state is play
let state = 'play';

// Loop through all play buttons listening for clicks
for (const playButton of playButtons) {
  playButton.addEventListener('click', () => {
    if(state === 'play') {
      // Selecting audio element using custom ID format
      let audioId = playButton.getAttribute('id').replace('play-icon', 'audio');
      let audio = document.querySelector('#' + CSS.escape(audioId));
      audio.play()
      // Getting station name and sending to playback bar
      let stationNameId = playButton.getAttribute('id').replace('play-icon', 'station-name');
      let stationName = document.querySelector('#' + CSS.escape(stationNameId)).innerHTML;
      document.querySelector('.station-title').innerHTML = stationName;
      // Listening for click in playback bar
      // document.querySelector('#playback-bar-play-icon').addEventListener('click', () => {
      //   audio.play()
      // });
      // Swapping Play button to pause
      playButton.classList.add('d-none')
      playbackBar.classList.replace('d-none', 'd-block')
      playButton.nextElementSibling.classList.replace('d-none', 'd-block')
      state = 'pause';
    } else {
      state = 'play';
    }
  });
}

// Loop through all pause buttons listening for clicks
for (const pauseButton of pauseButtons) {
  pauseButton.addEventListener('click', () => {
    if(state === 'pause') {
      // Selecting audio element using custom ID format
      let audioId = pauseButton.getAttribute('id').replace('pause-icon', 'audio');
      let audio = document.querySelector('#' + CSS.escape(audioId));
      audio.pause()
      // Listening for pause click in playback bar
      // document.querySelector('#playback-bar-pause-icon').addEventListener('click', () => {
      //   audio.pause();
      // });


      pauseButton.classList.replace('d-block', 'd-none')
      pauseButton.previousElementSibling.classList.replace('d-none', 'd-block')
      state = 'play';
    } else {
      state = 'pause';
    }
  });
}

hidePlaybackBar.addEventListener('click', () => {
  playbackBar.classList.add('playback-footer-hidden');
  hidePlaybackBar.classList.replace('d-block', 'd-none');
  showPlaybackBar.classList.replace('d-none', 'd-block');
});

showPlaybackBar.addEventListener('click', () => {
  playbackBar.classList.remove('playback-footer-hidden');
  hidePlaybackBar.classList.replace('d-none', 'd-block');
  showPlaybackBar.classList.replace('d-block', 'd-none');
});
