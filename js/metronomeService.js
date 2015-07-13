function getSongResults(tempo) {
  $.ajax({
    url: 'http://developer.echonest.com/api/v4/song/search',
    data: {
      api_key: key,
      format: 'json',
      min_tempo: tempo - 2,
      max_tempo: tempo + 2,
      rank_type: 'familiarity',
      sort: 'song_hotttnesss-desc',
      results: 100
    },
    success: function (response) {
      var songs = response.response.songs;
      var i = Math.floor(Math.random()*songs.length);
      getSongFromSpotify(songs[i].artist_name, songs[i].title);
    }
  });
}

function getSongFromSpotify(artist, song) {
  $.ajax({
    url: 'https://api.spotify.com/v1/search',
    data: {
      q: song + " artist:" + artist + " NOT remix",
      type: 'track',
      limit: 1
    }, 
    success: function (response) {
      if (response.tracks.items.length) {
        var song = response.tracks.items[0];
        updateSongView(song);
        playSong(song.preview_url);  
      }
      else {
        // Re-search since the song isn't playable through Spotify
        getSongResults(BPM);
      }
    }
  });
}
