$(document).ready(function(){

  window.onload = googleClient;

  $('#searcher').on('mousedown', function(e){
    e.preventDefault();
    getResults();
  });

  $(document).keydown(function(x){
    if(x.keycode===13){
      getResults();
    }
  });

  function googleClient(){
    gapi.client.setApiKey('AIzaSyAArhYbIkYyTY5rYZBhlD3SWVHwgaHHCN4');
    gapi.client.load('youtube', 'v3', function(){
      console.log('ready');
    });
  }

  function getResults(){
    var query = $('input[type=text]').val();
    var search = gapi.client.youtube.search.list({
        part:'snippet',
        type: 'video',
        q: '"'+query+' acapella"',
        maxResults: 50
        //order: 'viewCount'
      });
      search.execute(function(get){
        var results = get.result;
        showResults(results);
      });
  }

  function showResults(x){
    $('input[type=text], textarea').val('');
    $('#search-results').html('');
    $.each(x.items, function(z,y){
      link = y.id.videoId;
      url = y.snippet.thumbnails.high.url;
      name=y.snippet.title;
      $('#search-results').append('<li class="list"><a href=https://www.youtube.com/watch?v='+link+
        ' target="_blank"><img src='+url+
        '></a></li>');
      $('#search-results').append('<p class="inner"><a href=https://www.youtube.com/watch?v='+link+
        ' target="_blank">'+name+'</a></p>');
    });

  }

  function newSearch(){
    $('#search-results').html('');
    $("input[type=text], textarea").val("");
  }


});
