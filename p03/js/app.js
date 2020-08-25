var vid = document.getElementById("myVideo");
var fillBar = document.getElementById("fill");
var seekBar = document.getElementById("seek-bar");
var currentTime = document.getElementById("currentTime");
var volumeSlider = document.getElementById("volume");
var volme = document.getElementById("speaker");

seekBar.addEventListener('click', seek);


function seek(e) {
    var percent = e.offsetX / this.offsetWidth;
    vid.currentTime = percent * vid.duration;
}
function playOrPause(){
    
    if(vid.paused){
        vid.play();
        document.getElementById('playBtn').innerHTML = "<i class=\"inner-controls fa fa-pause\" style=\"color: #dba74a;\" onclick=\"playOrPause()\" ></i>";
    }
    else{
        vid.pause();
        document.getElementById('playBtn').innerHTML = "<i class=\"inner-controls fa fa-play\" style=\"color: #dba74a;\" onclick=\"playOrPause()\" ></i>";
    }
}

function revind() {
    vid.currentTime = Math.max(0, vid.currentTime -10);
}

function forward() {
    vid.currentTime = vid.currentTime + 10;
}

vid.addEventListener('timeupdate',function(){
    
    var position = vid.currentTime / vid.duration;
        
    fillBar.style.width = position * 100 +'%';
    
    convertTime(Math.round(vid.currentTime));
    
    if(vid.ended){
        document.getElementById('playBtn').innerHTML = "<i class=\"inner-controls fa fa-play\" style=\"color: #dba74a;\"></i>";
    }
});

function convertTime(seconds)
        {
            var min = Math.floor(seconds / 60);
            var sec = seconds % 60;
            
            min = (min < 10) ? "0" + min : min;
            sec = (sec < 10) ? "0" + sec : sec;
            currentTime.textContent = min + ":" + sec;
            
            totalTime(Math.round(vid.duration));
        }
        
        function totalTime(seconds)
        {
            var min = Math.floor(seconds / 60);
            var sec = seconds % 60;
            
            min = (min < 10) ? "0" + min : min;
            sec = (sec < 10) ? "0" + sec : sec;
            currentTime.textContent += " / " + min + ":" + sec;
        }


function changeVolume(){
    
    vid.volume = volumeSlider.value;
    
    if(volumeSlider.value == 0){
        
        document.getElementById('speaker').innerHTML = "<i class=\" fa fa-volume-down\" style=\"color: #dba74a;\"></i>";
    }
    else{
        document.getElementById('speaker').innerHTML = "<i class=\" fa fa-volume-up\" style=\"color: #dba74a;\"></i>";
    }
}


function myFullScreen() {
    if(vid.requestFullscreen) {
        vid.requestFullscreen();
    }
    else if(vid.mozRequestFullScreen) {
        vid.mozRequestFullScreen();
    }
}