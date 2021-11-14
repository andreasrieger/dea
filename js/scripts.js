/**
 * 
 */

const
  sigma = ['B', 'E', 'P', 'S', 'T', 'V', 'X'], //the alphabet of words
  seqProof = ['B', 'P', 'V', 'V', 'E'],
  min = 5,
  max = 15
  ;

var seq,
  runCount = 0,
  errorCount = 0
  ;


function runProof() {
  seqOutput.value = seqProof;
  startDea.classList.add('visible');
  startDea.classList.remove('invisible');
}

const btn = document.getElementById('generateSequence');
const output = document.getElementById('output');
const seqOutput = document.getElementById('output');
const startDea = document.getElementById('startDea');
const testDea = document.getElementById('testDea');
const response = document.getElementById('response');

if (btn) {
  btn.addEventListener('click', function (event) {
    seq = getSequence();
    output.innerText = seq;
    seqOutput.value = seq;
    startDea.classList.add('visible');
    startDea.classList.remove('invisible');
  })
}

testDea.addEventListener('click', () => {
  const result = runProof();
  response.innerText = result.response;
})


startDea.addEventListener('click', function () {
  const machine = new Dea(seq);
  startDea.classList.add('invisible');
  startDea.classList.remove('visible');
  // console.log(machine.response);
  if (machine.state == null) {
    response.innerText = "Fehler!";
  } else {
    response.innerText = "Neuer Status: " + machine.state;
  }
  runCount += 1;
  if (machine.state == null) errorCount += 1;
  if (errorCount == 3) {
    runProof(seqProof);
    errorCount = 0;
  }
  console.log(runCount);
  console.log(errorCount);
})

/**
* Getting a number between min and max
*/
const randomInt = () => {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
};

/**
* Getting a random selection of x words from sigma.
* X is a random number between min and max.
*/
function getSequence() {
  const
    n = sigma.length,
    arr = [],
    x = randomInt()
    ;

  for (let i = 0; i < x; i++) {
    arr.push(sigma[(0 + Math.floor(Math.random() * n)) % n]);
  }
  return arr;
}