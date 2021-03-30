function selectView(cachedView){
    if(errorCheck(cachedView)) {
        model.currentPage = cachedView
    } else {
        errorCheck(cachedView)
    }
    updateView();
}


function deleteSong() {
    var myobj = document.getElementById("demo");
    myobj.remove();
  }

function errorCheck(cachedView){
    if(cachedView == ""){
        //console.log("er blank");
        return false
    } else {
        return true
    }
}

function selectedSong(selectedSong){
//sjekke om selectedSong finnes i modellen -> finnes ? true&update current : false
   for(song in model.songList){
       if(model.songList[song].songName == selectedSong){
           model.currentTrackSong = selectedSong
          return;
       }
   }
   return false     
}



