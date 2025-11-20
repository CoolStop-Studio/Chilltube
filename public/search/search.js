window.onload = function() {
    init();
};

function onYouTubeApiLoad() {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q');
  document.getElementById("top_search").value = query
  localStorage.setItem('q', query);

  if (query) {
    searchYouTube(query);
  } else {
    console.log('No search query provided');
  }
}



const API_KEY = 'AIzaSyD3sYwQT-Q31roZcky7T_bskNIzGqTwQWM';

// Load client library
function init() {
    gapi.load('client', () => {
        gapi.client.setApiKey(API_KEY);
        gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
    });
}

function searchYouTube(query) {
    const request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 30
    });

    request.execute(response => {
        const results = response.items;
        if (results.length > 0) {
            console.log("Results found")
            $('#results').empty();  

            results.forEach(item => {
                const title = item.snippet.title;
                const videoId = item.id.videoId;
                const thumb = item.snippet.thumbnails.high.url;
                const channel = item.snippet.channelTitle
                const time = timeAgo(item.snippet.publishedAt);
                $('#results').append(`
                    <div class="result" onclick="window.location.href = '/video?v=${videoId}'">
                        <img src="${thumb}" alt="${title}">
                        <div>
                            <h3>${title}</h3>
                            <p>${channel} | ${time}</p>
                        </div>
                    </div>
                `);
            });
        } else {
            console.log("No results found")
            document.getElementById("results").innerHTML = "No results :("
        }
    });
}





document.addEventList987ener('DOMContentLoaded', function() {
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