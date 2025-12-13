const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const screenQuestion = document.getElementById('screen-question');
const screenAnswer = document.getElementById('screen-answer');

/* switch to yay screen when YES is clicked */
yesBtn.addEventListener('click', () => {
  screenQuestion.classList.remove('active');
  screenAnswer.classList.add('active');
});

/* move NO button around whole screen, keeping it visible and away from YES */

noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('click', moveNoButton);

function moveNoButton() {
  const yesRect = yesBtn.getBoundingClientRect();
  const noRect  = noBtn.getBoundingClientRect();

  const maxX = window.innerWidth  - noRect.width;
  const maxY = window.innerHeight - noRect.height;

  let x, y, tries = 0;

  do {
    x = Math.random() * maxX;
    y = Math.random() * maxY;
    tries++;
  } while (isOverYesViewport(x, y, noRect, yesRect) && tries < 20);

  noBtn.style.left = x + 'px';
  noBtn.style.top  = y + 'px';
}

function isOverYesViewport(x, y, noRect, yesRect) {
  const noLeft   = x;
  const noTop    = y;
  const noRight  = noLeft + noRect.width;
  const noBottom = noTop  + noRect.height;

  return !(
    noRight  < yesRect.left  ||
    noLeft   > yesRect.right ||
    noBottom < yesRect.top   ||
    noTop    > yesRect.bottom
  );
}
