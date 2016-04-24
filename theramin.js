const A0 = 27.5;
const C8 = 4186;

const context = new (window.AudioContext || window.webkitAudioContext)();
const osc     = context.createOscillator();
const mouseGain  = context.createGain();
const toggleGain = context.createGain();

osc.connect(mouseGain);
mouseGain.connect(toggleGain);
toggleGain.connect(context.destination);

toggleGain.gain.value = 0;
osc.frequency.value = 440;
osc.start();

function logScale(n, min, max) {
  const top = Math.log(max);
  const bot = Math.log(min);
  const scale = top - bot;
  return Math.exp(bot + scale * n);
}

document.onmousemove = function(event) {
  const y = 1 - event.pageY / window.innerHeight;
  const x = event.pageX / window.innerWidth;
  osc.frequency.value  = logScale(x, A0, C8)
  mouseGain.gain.value = logScale(y, 0.02, 1);
}

document.onmousedown = function() { toggleGain.gain.value = 1; }
document.onmouseup   = function() { toggleGain.gain.value = 0; }
