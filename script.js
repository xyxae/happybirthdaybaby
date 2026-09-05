// Blow candles
const blowBtn = document.getElementById('blowBtn');
const wishMsg = document.getElementById('wishMsg');

blowBtn.addEventListener('click', () => {

  document.querySelectorAll('.flame').forEach((f, i) => {
    setTimeout(() => f.classList.add('out'), i * 90);
  });

  blowBtn.disabled = true;
  blowBtn.textContent = "wish made";

  setTimeout(() => {
    wishMsg.classList.add('show');
  }, 400);

  launchConfetti();

});


// Background music
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const volumeControl = document.getElementById('volumeControl');
const musicStatus = document.getElementById('musicStatus');

bgMusic.volume = 0.5;

function playMusic() {

  bgMusic.play().then(() => {

    musicToggle.textContent = '❚❚';
    musicStatus.textContent = 'playing';

  }).catch(() => {

    musicToggle.textContent = '▶';
    musicStatus.textContent = 'click to play';

  });

}

musicToggle.addEventListener('click', () => {

  if(bgMusic.paused) {

    playMusic();

  } else {

    bgMusic.pause();

    musicToggle.textContent = '▶';
    musicStatus.textContent = 'paused';

  }

});

volumeControl.addEventListener('input', () => {

  bgMusic.volume = volumeControl.value;

});

window.addEventListener('load', () => {

  playMusic();

});


// Envelope open
const envelope = document.getElementById('envelope');

envelope.addEventListener('click', () => {

  envelope.classList.toggle('open');

});


// Confetti
function launchConfetti(){

  const colors = [
    '#C4432B',
    '#E3A63B',
    '#8B9A6E',
    '#3A2E22',
    '#F1E6CB'
  ];

  for(let i = 0; i < 180; i++){

    const piece = document.createElement('div');

    piece.className = 'confetti-piece';

    piece.style.left =
      Math.random() * 100 + 'vw';

    piece.style.top =
      (Math.random() * -100) + 'vh';

    piece.style.width =
      (6 + Math.random() * 8) + 'px';

    piece.style.height =
      (10 + Math.random() * 12) + 'px';

    piece.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    piece.style.transform =
      `rotate(${Math.random() * 360}deg)`;

    document.body.appendChild(piece);

    const duration =
      4500 + Math.random() * 3500;

    const drift =
      (Math.random() - 0.5) * 400;

    const rotation =
      Math.random() * 1440;

    piece.animate(
      [
        {
          transform:
            `translate(0, 0) rotate(0deg)`,
          opacity:1
        },

        {
          transform:
            `translate(${drift}px, 120vh) rotate(${rotation}deg)`,
          opacity:.9
        }
      ],
      {
        duration:duration,
        easing:'cubic-bezier(.2,.7,.3,1)',
        fill:'forwards'
      }
    );

    setTimeout(() => {
      piece.remove();
    }, duration + 100);

  }

}


// Gallery photos

const flowers = [
  "images/flowers1.png",
  "images/flowers2.png"
];

const photos = [
  "images/image1.jpg",
  "images/image2.jpg"
];

const messages = [
  "images/nera.jpg",
  "images/dee.jpg",
  "images/siah.jpg",
  "images/cider.jpg",
  "images/dre.jpg"
];

// Gallery elements
const galleryModal =
  document.getElementById('galleryModal');

const galleryTitle =
  document.getElementById('galleryTitle');

const photoScroll =
  document.getElementById('photoScroll');

const musicList =
  document.getElementById('musicList');


// Playlist
const playlistSongs = [

  {
    title: "Someday",
    cover: "images/someday.jfif",
    audio: "tracks/someday.mp3"
  },



  {
    title: "Sweet Thing",
    cover: "images/sweetthing.jpg",
    audio: "tracks/sweetthing.mp3"
  },

  {
    title: "Kursunada",
    cover: "images/kursunada.jfif",
    audio: "tracks/kursunada.mp3"
  },

  {
    title: "I Like U",
    cover: "images/ilikeu.jfif",
    audio: "tracks/ilikeu.mp3"
  },

  {
    title: "Kung Maging Akin Ka",
    cover: "images/kmak.jfif",
    audio: "tracks/kmak.mp3"
  },

  {
    title: "My Girl",
    cover: "images/mygirl.jfif",
    audio: "tracks/mygirl.mp3"
  },

  {
    title: "Yakap",
    cover: "images/yakap.jfif",
    audio: "tracks/yakap.mp3"
  },

  {
    title: "Love You Right",
    cover: "images/lyr.jfif",
    audio: "tracks/lyr.mp3"
  },

  {
    title: "I Like Her",
    cover: "images/likeher.jpg",
    audio: "tracks/ilikeher.mp3"
  },

  {
    title: "Aphrodite",
    cover: "images/aphrodite.jpg",
    audio: "tracks/aphrodite.mp3"
  },


];


let currentPlaylistAudio = null;


// Normal photo gallery
function openGallery(title, photos){

  galleryTitle.textContent = title;

  photoScroll.innerHTML = '';

  photoScroll.style.display = 'flex';

  musicList.innerHTML = '';

  musicList.style.display = 'none';

  photos.forEach(photo => {

    const img =
      document.createElement('img');

    img.src = photo;
    img.alt = title;

    photoScroll.appendChild(img);

  });

  galleryModal.classList.add('show');

}


// Playlist gallery
function openMusicGallery(){

  galleryTitle.textContent = 'playlist';

  photoScroll.innerHTML = '';

  photoScroll.style.display = 'none';

  musicList.innerHTML = '';

  musicList.style.display = 'flex';

  playlistSongs.forEach(song => {

    const item =
      document.createElement('div');

    item.className = 'music-item';

    item.innerHTML = `

      <img
        class="music-cover"
        src="${song.cover}"
        alt="${song.title}"
      >

      <div class="music-info">

        <div class="music-title">
          ${song.title}
        </div>

        <audio
          class="music-audio"
          controls
          preload="metadata"
        >

          <source
            src="${song.audio}"
            type="audio/mpeg"
          >

        </audio>

      </div>

    `;

    const audio =
      item.querySelector('.music-audio');


    audio.addEventListener('play', () => {

      document
        .querySelectorAll('.music-audio')
        .forEach(otherAudio => {

          if(otherAudio !== audio){
            otherAudio.pause();
          }

        });


      document
        .querySelectorAll('.music-item')
        .forEach(otherItem => {

          if(otherItem !== item){
            otherItem.classList.remove('playing');
          }

        });


      item.classList.add('playing');

      currentPlaylistAudio = audio;

    });


    audio.addEventListener('pause', () => {

      item.classList.remove('playing');

    });


    audio.addEventListener('ended', () => {

      item.classList.remove('playing');

      currentPlaylistAudio = null;

    });


    musicList.appendChild(item);

  });


  galleryModal.classList.add('show');

}


// Close gallery
function closeGallery(){

  galleryModal.classList.remove('show');

  photoScroll.innerHTML = '';

  photoScroll.style.display = 'flex';

  musicList.innerHTML = '';

  musicList.style.display = 'none';


  document
    .querySelectorAll('.music-audio')
    .forEach(audio => {

      audio.pause();
      audio.currentTime = 0;

    });


  currentPlaylistAudio = null;

}


// Close by clicking outside
galleryModal.addEventListener('click', function(e){

  if(e.target === galleryModal){

    closeGallery();

  }

});


// Close with Escape
document.addEventListener('keydown', function(e){

  if(e.key === 'Escape'){

    closeGallery();

  }

});