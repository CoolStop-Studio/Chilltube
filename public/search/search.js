window.onload = function() {
    init();
};

let query
let channel_ID
async function resolveChannelId(channel) {
    if (!channel || !channel.startsWith('@')) return channel; 

    const response = await gapi.client.youtube.search.list({
        part: 'snippet',
        q: channel,
        type: 'channel',
        maxResults: 1
    }); 

    const item = response.result.items[0];
    return item ? item.id.channelId : null;
}

async function onYouTubeApiLoad() {
  const params = new URLSearchParams(window.location.search);
  query = params.get('q');
  if (query != null) {
    document.getElementById("top_search_input").value = query
  }
  const channel = params.get('c');
  if (channel != null) {
    channel_ID = await resolveChannelId(channel);
  }
  localStorage.setItem('q', query);
  localStorage.setItem('c', channel);

  new_search(query, channel_ID)
}

function new_search(q, c, order) {
    if (query) {
        searchYouTube(query, channel_ID, order);
        return;
    } else if (channel_ID) {
        console.log("Loading recent channel videos...");
        searchYouTube(null, channel_ID, order);
        return; 
    }
    
    console.log("No search query and no channel provided");
}


const API_KEY = 'AIzaSyD3sYwQT-Q31roZcky7T_bskNIzGqTwQWM';

// Load client library
function init() {
    gapi.load('client', () => {
        gapi.client.setApiKey(API_KEY);
        gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
    });
}

let current_order = 'relevance'

function searchYouTube(query, channel, order) {
    const request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: query,
        channelId: channel,
        type: 'video',
        maxResults: 10,
        order: order,
        relevanceLanguage: 'en'
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





document.addEventListener('DOMContentLoaded', function() {
    const top_search = document.getElementById('top_search_input');

    top_search.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            const term = top_search.value.trim();
            if (term !== '') {
                if (localStorage.getItem('c') != 'null') {
                    window.location.href = `/search?q=${encodeURIComponent(term)}&c=${localStorage.getItem('c')}`;
                } else {
                    window.location.href = `/search?q=${encodeURIComponent(term)}`;
                }
            }
        }
    });
});

function switch_order() {
    document.getElementById("results").innerHTML = "Loading..."
    let button = document.getElementById("top_search_button")
    if (current_order == 'relevance') {
        current_order = 'date';
        button.innerHTML = "Date";
    }
    else if (current_order == 'date') {
        current_order = 'viewCount';
        button.innerHTML = "Views";
    }
    else if (current_order == 'viewCount') {
        current_order = 'relevance';
        button.innerHTML = "Relevance";
    }
    new_search(query, channel_ID, current_order);
}