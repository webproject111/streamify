// Toggle play and pause
function togglePlay(audioId, button) {
    const audio = document.getElementById(audioId);
    const icon = button.querySelector('i');
  
    if (audio.paused) {
      audio.play();
      icon.classList.remove('fa-play');
      icon.classList.add('fa-pause');
    } else {
      audio.pause();
      icon.classList.remove('fa-pause');
      icon.classList.add('fa-play');
    }
  
    // Update progress bar immediately when the song starts
    updateProgress(audioId);
  }
  
  // Update the progress bar and time
  function updateProgress(audioId) {
    const audio = document.getElementById(audioId);
    const progressBar = document.getElementById('progressBar' + audioId.slice(-1));
    const currentTimeDisplay = document.getElementById('currentTime' + audioId.slice(-1));
    const durationDisplay = document.getElementById('duration' + audioId.slice(-1));
  
    // Update progress bar as the song plays
    audio.addEventListener('timeupdate', () => {
      const progress = (audio.currentTime / audio.duration) * 100;
      progressBar.value = progress;
  
      // Update current time display
      const minutes = Math.floor(audio.currentTime / 60);
      const seconds = Math.floor(audio.currentTime % 60);
      currentTimeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    });
  
    // Update the duration display once the song is loaded
    audio.addEventListener('loadeddata', () => {
      const minutes = Math.floor(audio.duration / 60);
      const seconds = Math.floor(audio.duration % 60);
      durationDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    });
  
    // Allow user to change progress through the progress bar
    progressBar.addEventListener('input', (e) => {
      const progress = e.target.value;
      audio.currentTime = (audio.duration * progress) / 100;
    });
  }
  
  // Set volume
  function setVolume(slider, audioId) {
    const audio = document.getElementById(audioId);
    audio.volume = slider.value;
  }
  
  // Skip forward 10 seconds
  function skipForward(audioId) {
    const audio = document.getElementById(audioId);
    audio.currentTime += 10; // Skip forward 10 seconds
  }
  
  // Skip backward 10 seconds
  function skipBackward(audioId) {
    const audio = document.getElementById(audioId);
    audio.currentTime -= 10; // Skip backward 10 seconds
  }
  
  // Search function
  function searchSongs() {
    const searchInput = document.getElementById('searchinput').value.toLowerCase();
    const songCards = document.querySelectorAll('.song-card');
  
    songCards.forEach(card => {
      const songTitle = card.getAttribute('data-title').toLowerCase();
      if (songTitle.includes(searchInput)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
  