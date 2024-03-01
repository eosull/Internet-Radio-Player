// Custom Play/Pause function with a little help from:
// https://css-tricks.com/lets-create-a-custom-audio-player/#aa-display-the-audio-duration


// Arrays with individually ID'd play/pause buttons
const playButtons = document.getElementsByClassName('audio-play');
const pauseButtons = document.getElementsByClassName('audio-pause');
// Audio element
const audio = document.querySelector('audio');
let state = 'play';

// Loop through all play buttons listening for clicks
for (const playButton of playButtons) {
  playButton.addEventListener('click', () => {
    if(state === 'play') {
      audio.play()
      playButton.classList.add('d-none')
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
      audio.pause()
      pauseButton.classList.replace('d-block', 'd-none')
      pauseButton.previousElementSibling.classList.replace('d-none', 'd-block')
      state = 'play';
    } else {
      state = 'pause';
    }
  });
}
