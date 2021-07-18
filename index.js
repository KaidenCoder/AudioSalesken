let music_name = "https://raw.githubusercontent.com/Xiija/TestFiles/master/Yuki%20%26%20Tako%2001.mp3"
let play_btn = document.querySelector("#play");
let range = document.querySelector("#range");
let total_time = 0;
let currentTime = 0;
let isPlaying = false;
let addCol = true
let song = new Audio();
var handle
let canvas = document.querySelector('canvas')
var c = canvas.getContext('2d')
var val = 2


function playSong() {
    song.src = music_name;
    function add() {
        val = range.value
        c.fillRect(val, 50, 5, Math.floor((Math.random() - 0.5) * 70))
    }

    play_btn.addEventListener('click', function () {
        if (!isPlaying) {
            song.play();
            isPlaying = true;
            canvas.height = song.duration
            canvas.width = song.duration
            total_time = song.duration;
            range.max = total_time;
            handle = setInterval(add, 1000)
            document.getElementById("play_img").innerHTML = "PAUSE";
        } else {
            clearInterval(handle)
            song.pause();
            isPlaying = false;
            document.getElementById("play_img").innerHTML = "PLAY";
        }

        song.addEventListener('ended', function () {
            clearInterval(handle);
            song.currentTime = 0
            song.pause();
            isPlaying = false;
            range.value = 0;
            document.getElementById("play_img").innerHTML = "PLAY";
        })
        song.addEventListener('timeupdate', function () {
            range.value = song.currentTime;
        })
        range.addEventListener('change', function () {
            song.currentTime = range.value;
        })

    })

}

playSong()

