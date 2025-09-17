let isPreparation = true;
let isExercise = false;
let isPaused = false;
let preparationTime = 10;
let exerciseTime = 60;
let restTime = 10;
let totalTime = 0;
let interval;
const alertSound = document.getElementById("alertSound");

function updateTimerDisplay(time) {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    document.getElementById("timer").textContent = `${minutes}:${seconds}`;
}

function updateTotalTimeDisplay() {
    const minutes = String(Math.floor(totalTime / 60)).padStart(2, '0');
    const seconds = String(totalTime % 60).padStart(2, '0');
    document.getElementById("total-time").innerHTML = '<img src="https://cdn-icons-png.flaticon.com/512/2088/2088617.png" width="30" height="30"> Tiempo Total: ' + `${minutes}:${seconds}`;
}

function startTimer() {
    let timeLeft = isPreparation ? preparationTime : (isExercise ? exerciseTime : restTime);
    const container = document.querySelector(".container");
    container.className = "container " + (isPreparation ? "preparacion" : (isExercise ? "ejercicio" : "descanso"));
    document.getElementById("status").textContent = isPreparation ? "Preparación" : (isExercise ? "EJERCICIO 💪" : "Descanso 😌");

    interval = setInterval(() => {
        if (isPaused) return;

        timeLeft--;
        updateTimerDisplay(timeLeft);

        if (!isPreparation && isExercise) totalTime++;
        updateTotalTimeDisplay();

        if (timeLeft === 4) {
            alertSound.play();
        }

        if (totalTime === 2400) {
            clearInterval(interval);
            alert("¡Felicidades! Has completado 40 minutos 🎉");
        }

        if (timeLeft === 0) {
            clearInterval(interval);
            if (isPreparation) {
                isPreparation = false;
                isExercise = true;
            } else {
                isExercise = !isExercise;
                restTime = parseInt(document.getElementById("restTimeInput").value, 10);
            }
            startTimer();
        }
    }, 1000);
}

document.getElementById("startButton").addEventListener("click", () => {
    clearInterval(interval);
    isPaused = false;
    isPreparation = true;
    isExercise = false;
    startTimer();
});

document.getElementById("pauseButton").addEventListener("click", () => {
    isPaused = !isPaused;
    document.getElementById("pauseButton").textContent = isPaused ? "CONTINUAR" : "PAUSA";
});

document.getElementById("resetButton").addEventListener("click", () => {
    clearInterval(interval);
    isPreparation = true;
    isExercise = false;
    totalTime = 0;
    updateTimerDisplay(preparationTime);
    updateTotalTimeDisplay();
    document.getElementById("status").textContent = "Preparación";
    document.querySelector(".container").className = "container preparacion";
    document.getElementById("pauseButton").textContent = "PAUSA";
    isPaused = false;
});

updateTimerDisplay(preparationTime);
updateTotalTimeDisplay();