// Custom Play/Pause function with a little help from:
// https://css-tricks.com/lets-create-a-custom-audio-player/#aa-display-the-audio-duration


// variable for the button that will contain both icons
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const audio = document.querySelector('audio');
// variable that will store the button’s current state (play or pause)
let state = 'play';

playIcon.addEventListener('click', () => {
    if(state === 'play') {
      audio.play()
      playIcon.classList.add('d-none')
      pauseIcon.classList.replace('d-none', 'd-block')  
      state = 'pause';
    } else {
      state = 'play';
    }
  });

  pauseIcon.addEventListener('click', () => {
    if(state === 'pause') {
      audio.pause()
      pauseIcon.classList.replace('d-block', 'd-none')
      playIcon.classList.replace('d-none', 'd-block')
      state = 'play';
    } else {
      state = 'pause';
    }
  });