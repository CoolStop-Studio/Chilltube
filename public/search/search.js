window.onload = function() {
    init();
};

function onYouTubeApiLoad() {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q');

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
        $('#results').empty();

        results.forEach(item => {
        const title = item.snippet.title;
        const videoId = item.id.videoId;
        const thumb = item.snippet.thumbnails.default.url;

        $('#results').append(`
            <div class="result" onclick="window.location.href = '/video?v=${videoId}'">
                <img src="${thumb}" alt="${title}">
                <p href="/video?v=${videoId}" target="_blank">${title}</p>
            </div>
        `);
        });
    });
}