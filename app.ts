let timer: number = 25 * 60;
let interval: any = null;
let breaks: number = 0;
let focusScores: number[] = [];

function updateTimer() {
  const mins = Math.floor(timer / 60);
  const secs = timer % 60;
  document.getElementById('timer')!.innerText = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
  if (timer > 0) timer--;
  else clearInterval(interval);
}

function startSession() {
  if (!interval) interval = setInterval(updateTimer, 1000);
}

function pauseSession() {
  if (interval) {
    clearInterval(interval);
    interval = null;
    breaks++;
    document.getElementById('breaks')!.innerText = breaks.toString();
  }
}

function endSession() {
  const score = prompt('Rate your focus this session (1-5):');
  if (score) {
    focusScores.push(parseInt(score));
    const avgScore = Math.round(focusScores.reduce((a,b)=>a+b,0)/focusScores.length);
    document.getElementById('focusScore')!.innerText = avgScore.toString();
    adjustOptimalTime(avgScore);
    resetTimer();
  }
}

function adjustOptimalTime(avgScore: number) {
  let optimal = 25;
  if (avgScore >= 4) optimal = 30;
  else if (avgScore <= 2) optimal = 20;
  document.getElementById('optimalTime')!.innerText = optimal.toString();
}

function resetTimer() {
  clearInterval(interval);
  interval = null;
  timer = parseInt(document.getElementById('optimalTime')!.innerText) * 60;
  document.getElementById('timer')!.innerText = `${document.getElementById('optimalTime')!.innerText}:00`;
}

function reset() {
  clearInterval(interval);
  interval = null;
  timer = 25*60;
  breaks = 0;
  focusScores = [];
  document.getElementById('timer')!.innerText = '25:00';
  document.getElementById('breaks')!.innerText = '0';
  document.getElementById('focusScore')!.innerText = '0';
  document.getElementById('optimalTime')!.innerText = '25';
}
