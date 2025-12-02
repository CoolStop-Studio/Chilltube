window.onload = function() {
    init();
};

function onYouTubeApiLoad() {
  const params = new URLSearchParams(window.location.search);
  const channel = params.get('c');

  const query = localStorage.getItem('q');
document.getElementById("top_search").value = query

    const request = gapi.client.youtube.channels.list({
        part: 'snippet',
        id: channel
    });

    request.execute(function(response) {
        console.log(JSON.stringify(response))
      });
}

const API_KEY = 'AIzaSyD3sYwQT-Q31roZcky7T_bskNIzGqTwQWM';

// Load client library
function init() {
    gapi.load('client', () => {
        gapi.client.setApiKey(API_KEY);
        gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
    });
}




document.addEventListener('DOMContentLoaded', function() {
    const top_search = document.getElementById('top_search');

    top_search.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            const term = top_search.value.trim();
            if (term !== '') {
                // redirect with query string
                window.location.href = `/search?q=${encodeURIComponent(term)}`;
            }
        }
    });
});