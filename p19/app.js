var date = new Date();
// /var count = date.getTime();// 
var nextYear = date.getFullYear()+1;
var count = new Date("Dec 31, "+(nextYear-1)+" 00:00:00").getTime();

console.log(count);

document.getElementById('year').innerHTML = nextYear;

var x = setInterval(function() {
    var now = new Date().getTime();
    var d = count - now;

    var day = Math.floor(d/(1000*60*60*24));
    var hour = Math.floor((d%(1000*60*60*24)) / (1000*60*60));
    var minute = Math.floor((d%(1000*60*60)) / (1000*60));
    var second = Math.floor((d%(1000*60)) / 1000);

    document.getElementById('day').innerHTML = day;
    document.getElementById('hour').innerHTML = hour;
    document.getElementById('minute').innerHTML = minute;
    document.getElementById('second').innerHTML = second;

    if(d<=0) {
        clearInterval(x);
    } 1000})