var player;

// Called automatically when the API is ready
function onYouTubeIframeAPIReady() {
    const params = new URLSearchParams(window.location.search);
    const video = params.get('v');

    player = new YT.Player('player', {
        height: window.innerHeight * 0.9,
        width: window.innerWidth,
        videoId: video, // <-- YouTube video ID
        playerVars: {
            autoplay: 0,
            controls: 1,
            rel: 0
        },
        events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
console.log("Player is ready!");
}

function onPlayerStateChange(event) {
console.log("State changed:", event.data);
}

// You can call methods like:
// player.playVideo();
// player.pauseVideo();
// player.seekTo(60); // jump to 1:00