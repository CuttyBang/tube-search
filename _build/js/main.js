$(document).ready(function(){
  'use strict';

  var link,url,name;
  clearInputs();
  window.onload = googleClient;

  $('#searcher').on('mousedown', function(){
    if($('input[type=text]').val() === ''){
      $('#search-results').append("<h2>Wait! I need an artist to search for!</h2>")
    }
    else{
      getResults();
    }
  });

  $(document).keypress(function(e){
    if(e.which === 13){
      if($('input[type=text]').val() === ''){
        $('#search-results').append("<h2>Wait! I need an artist to search for!</h2>")
      }
      else{
        getResults();
      }
    }
  });

  function clearInputs(){
    $('input[type=text], textarea').val('');
    $('#search-results').html('');
  }

  function googleClient(){
    gapi.client.setApiKey('AIzaSyAArhYbIkYyTY5rYZBhlD3SWVHwgaHHCN4');
    gapi.client.load('youtube', 'v3', function(){
    });
  }

  function getResults(){
    clearInputs();
    var query = $('input[type=text]').val();
    var search = gapi.client.youtube.search.list({
        part:'snippet',
        type: 'video',
        q: '"'+query+' acapella"',
        maxResults: 50
        //order: 'viewCount'
      });
      if($('input[type=text]').val() === ''){
        $('#search-results').append("<h2>Hold on!! I need an artist to search for!</h2>");
      }else{
        search.execute(function(get){
          var results = get.result;
          showResults(results);
        });
      }

  }

  function showResults(x){
    if(x.items.length === 0){
      $('#search-results').append("<h2>Sorry, I couldn't find any acapellas for that search</h2>");
    }
    $.each(x.items, function(z,y){
       link = y.id.videoId;
       url = y.snippet.thumbnails.high.url;
       name=y.snippet.title;
      $('#search-results').append('<a href=https://www.youtube.com/watch?v='+link+
        ' target="_blank"><img src='+url+'></a><div><p class="titles inner"><a href="http://www.youtubeinmp3.com/download/?video='+'https://www.youtube.com/watch?v='+link+'" target="_blank">'+name+'</a></p></div>');
    });
  }
  //'http://www.youtubeinmp3.com/download/?video='+'https://www.youtube.com/watch?v='+link+''

  function show(track){
    $.ajax({
      url: 'https://kashyap32-youtubetomp3-v1.p.mashape.com/',
      type: 'GET',
      data: "'"+track+"'",
      dataType: 'text',
      success: function(data) { $('body').append('<div><p class="titles inner"><a href="'+data+'"</a></p></div>');},
      error: function(err) {console.log(err); },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", 'NiAnfW53c4mshBu0PFGedd1RvMN1p1jp00Bjsn2LImX1wNdeJM');
      }
    });
  }


//href=https://www.youtube.com/watch?v='+link+' target="_blank"
//<div><p class="titles inner"><a href="#">'+name+'</a></p></div>

});
