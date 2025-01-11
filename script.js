// To-Do List
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const addTodoButton = document.getElementById("add-todo");

addTodoButton.addEventListener("click", () => {
  if (todoInput.value.trim() !== "") {
    const li = document.createElement("li");
    li.textContent = todoInput.value;
    todoList.appendChild(li);
    todoInput.value = "";
  }
});

// Timer
let timerInterval;
const timerDisplay = document.getElementById("timer-display");
const startTimerButton = document.getElementById("start-timer");
const resetTimerButton = document.getElementById("reset-timer");
let timeRemaining = 25 * 60;

function updateTimer() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

startTimerButton.addEventListener("click", () => {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      if (timeRemaining > 0) {
        timeRemaining--;
        updateTimer();
      } else {
        clearInterval(timerInterval);
        timerInterval = null;
      }
    }, 1000);
  }
});

resetTimerButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timeRemaining = 25 * 60;
  updateTimer();
});

// Notes App
const noteInput = document.getElementById("note-input");
const saveNoteButton = document.getElementById("save-note");
const notesList = document.getElementById("notes-list");

saveNoteButton.addEventListener("click", () => {
  if (noteInput.value.trim() !== "") {
    const p = document.createElement("p");
    p.textContent = noteInput.value;
    notesList.appendChild(p);
    noteInput.value = "";
  }
});

// Productivity Graph
const ctx = document.getElementById("productivity-chart").getContext("2d");
new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [
      {
        label: "Tasks Completed",
        data: [3, 5, 2, 4, 6],
        borderColor: "#fff",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  },
  options: {
    scales: {
      x: {
        ticks: {
          color: "#fff",
        },
        grid: {
          color: "#444",
        },
      },
      y: {
        ticks: {
          color: "#fff",
        },
        grid: {
          color: "#444",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#fff",
        },
      },
    },
  },
});

// Timer history
const timerHistory = [];
const timerHistoryContainer = document.createElement("div");
timerHistoryContainer.id = "timer-history";
document.getElementById("timer").appendChild(timerHistoryContainer);

function addTimerToHistory() {
  const elapsedTime = 25 * 60 - timeRemaining;
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  timerHistory.push(formattedTime);
  updateTimerHistory();
}

function updateTimerHistory() {
  timerHistoryContainer.innerHTML = "<h4>Timer History</h4>";
  const historyList = document.createElement("ul");
  timerHistory.forEach((time, index) => {
    const li = document.createElement("li");
    li.textContent = `#${index + 1}: ${time}`;
    historyList.appendChild(li);
  });
  timerHistoryContainer.appendChild(historyList);
}

// Update timer function to add to history when it reaches zero
startTimerButton.addEventListener("click", () => {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      if (timeRemaining > 0) {
        timeRemaining--;
        updateTimer();
      } else {
        clearInterval(timerInterval);
        timerInterval = null;
        addTimerToHistory(); // Add to history when timer finishes
      }
    }, 1000);
  }
});

// Reset timer also resets the current timing but not history
resetTimerButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timeRemaining = 25 * 60;
  updateTimer();
});
