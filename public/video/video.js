var player;

function loadYouTubeAPI() {
    return new Promise((resolve) => {
        if (window.YT && window.YT.Player) { // If API is loaded already
            resolve(window.YT);
            return;
        }

        // Inject script into HTML
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);

        window.onYouTubeIframeAPIReady = () => resolve(window.YT); // 
    });
}

loadYouTubeAPI().then((YT) => {
    console.log("YT API Loaded");

    const params = new URLSearchParams(window.location.search);
    const video = params.get('v');

    player = new YT.Player('player', {
        height: window.innerHeight * 0.9,
        width: window.innerWidth,
        videoId: video,
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
});



function onPlayerReady(event) {
console.log("Player is ready!");
}

function onPlayerStateChange(event) {
console.log("State changed:", event.data);
}

while (true) {
    var el = document.getElementById("player")
    el.width = window.innerWidth + 'px'
    el.height = window.innerHeight - (0.12 * window.innerHeight) + 'px'
}

// You can call methods like:
// player.playVideo();
// player.pauseVideo();
// player.seekTo(60); // jump to 1:00