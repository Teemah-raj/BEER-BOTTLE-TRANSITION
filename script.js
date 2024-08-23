let count = 10
let isPaused = false 
let currentInterval = 10
let intervalId = null
let messageID = null

let h1 = document.getElementById("h1") 
let startBtn = document.getElementById("start")
let pauseBtn = document.getElementById("pause")
const stopBtn = document.getElementById("stop")

function beer(){
    setTimeout(() => {
        if (!isPaused) {
          updateMessage(currentInterval);
          currentInterval--;
          
        }else {
            clearTimeout()
            resetButton()
        }

        intervalId = setInterval(() => {
            h1.classList.remove("visible")
            h1.classList.add("hidden")
            if (currentInterval >= 0 && !isPaused){
                updateMessage(currentInterval)
                currentInterval--
            } else if (currentInterval < 0){
                clearInterval(intervalId)
                h1.classList.remove("hidden");
                h1.classList.add("visible");
                resetButton()
            }
            }
        , 5000); 
        }, 1000)
    }

function updateMessage(i){
    messageID = setInterval(() => {
        if (i == 0){
            h1.innerText = (`No more bottles of beer on the wall, no more bottles of beer. Go to the store and buy some more, ${count} bottles of beer on the wall.`);
        } else if (i == 1){
            h1.innerText =(`${i} bottle of beer on the wall, ${i} bottle of beer. Take one down and pass it around, no more bottles of beer on the wall.`);
        } else if (i == 2) {
            h1.innerText =(`${i} bottles of beer on the wall, ${i} bottles of beer. Take one down and pass it around, ${i - 1} bottle of beer on the wall.`);
        }  else {
            h1.innerText =(`${i} bottles of beer on the wall, ${i} bottles of beer. Take one down and pass it around, ${i - 1} bottles of beer on the wall.`);
        }
        h1.classList.remove("hidden")
        h1.classList.add("visible")
        clearInterval(messageID)
        
},500);
    }

function resetButton(){
    startBtn.innerText = "Start"
    pauseBtn.innerText = "Pause"
    pauseBtn.disabled = true
    h1.innerText = "BEER SONG TRANSITION"

    clearInterval(messageID)
    clearInterval(intervalId)
    currentInterval = 10 
}

startBtn.addEventListener("click", () => {
    if (startBtn.innerText === "Start" || startBtn.innerText === "Restart"){
        currentInterval = 10
        beer()
        isPaused = false
        startBtn.innerText = "Restart"
        pauseBtn.disabled = false
    }
})

pauseBtn.addEventListener("click", () => {
    if (pauseBtn.innerText === "Pause"){
        isPaused = true
        clearInterval(intervalId)
        pauseBtn.innerText = "Resume"
    } else if (pauseBtn.innerText === "Resume"){
        isPaused = false
        pauseBtn.innerText = "Pause"
        beer()
    }
})

stopBtn.addEventListener("click", resetButton)

resetButton()