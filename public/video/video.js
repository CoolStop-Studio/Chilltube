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
    const query = localStorage.getItem('q');
    document.getElementById("top_search").value = query

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

document.addEventListener('DOMContentLoaded', function() {
    const top_search = document.getElementById('top_search');

    top_search.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            const term = top_search.value.trim();
            if (term !== '') {
                if (localStorage.getItem('c')) {
                    window.location.href = `/search?q=${encodeURIComponent(term)}&c=${localStorage.getItem('c')}`;
                } else {
                    window.location.href = `/search?q=${encodeURIComponent(term)}`;
                }
            }
        }
    });
});