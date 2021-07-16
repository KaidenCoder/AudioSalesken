let music_name = "https://raw.githubusercontent.com/Xiija/TestFiles/master/Yuki%20%26%20Tako%2001.mp3";
let play_btn = document.querySelector("#play");
let range = document.querySelector("#range");
let total_time = 0;
let currentTime = 0;
let isPlaying = false;
let addCol = true
let song = new Audio();
var handle
let addColor = document.getElementById("added")


function playSong() {
    song.src = music_name;

    // Column add to graph
    function add() {
        addColor.innerHTML += `
                <div style="width: 10px; height: ${Math.floor(range.value - Math.random() * 30)}px;background: blue;">      
                </div>
            `
    }

    // Play the song on clicked when button displays as Play
    // Pause the song on clicked when button displays as Pause
    play_btn.addEventListener('click', function () {
        if (!isPlaying) {

            song.play();
            isPlaying = true;
            total_time = song.duration;
            range.max = total_time;

            // onClick on column graph, pause the song 
            addColor.addEventListener('click', function () {
                song.pause();
                document.getElementById("play_img").innerHTML = "PLAY";
                clearInterval(handle);
            })

            handle = setInterval(add, 3000)

            document.getElementById("play_img").innerHTML = "PAUSE";
        } else {
            addColor.addEventListener('click', function () {
                song.play();
                handle = setInterval(add, 3000)
                document.getElementById("play_img").innerHTML = "PAUSE";
            })
            clearInterval(handle)
            song.pause();
            isPlaying = false;
            document.getElementById("play_img").innerHTML = "PLAY";
        }

        // clear the column graph when song ends
        song.addEventListener('ended', function () {
            addColor.innerHTML = ""
            clearInterval(handle);
            song.currentTime = 0
            song.pause();
            isPlaying = false;
            range.value = 0;
            document.getElementById("play_img").innerHTML = "PLAY";
        })

        // Update the song timer to the current range value
        song.addEventListener('timeupdate', function () {
            range.value = song.currentTime;
        })

        range.addEventListener('change', function () {
            song.currentTime = range.value;
        })
    })
}

playSong()

