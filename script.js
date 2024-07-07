document.addEventListener('DOMContentLoaded', () => {
    const holes = document.querySelectorAll('.hole');
    const scoreBoard = document.getElementById('score');
    const highScoreBoard = document.getElementById('highScore');
    const startButton = document.getElementById('startButton');
    const resetButton = document.getElementById('resetButton');
    const timer = document.getElementById('timer');
    let score = 0;
    let highScore = localStorage.getItem('highScore') || 0;
    highScoreBoard.textContent = highScore;
    let moleInterval;
    let gameDuration = 30; // 30 seconds
    let moleSpeed = 1000; // Interval for mole appearance in milliseconds

    startButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', resetGame);

    let timerInterval;

    function startGame() {
        score = 0;
        scoreBoard.textContent = score;
        timer.textContent = gameDuration;
        clearInterval(moleInterval); // Ensure no previous game is running
        moleInterval = setInterval(randomMole, moleSpeed);

        // Start the timer countdown
        startTimer();
    }

    function startTimer() {
        let countdown = gameDuration;
        timerInterval = setInterval(() => {
            countdown--;
            timer.textContent = countdown;
            if (countdown <= 0) {
                clearInterval(timerInterval);
                endGame();
            }
        }, 1000); // Update timer every second (1000 milliseconds)
    }

    function endGame() {
        clearInterval(moleInterval);
        alert('Game Over! Your score is: ' + score);
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
            highScoreBoard.textContent = highScore;
        }
    }

    function resetGame() {
        clearInterval(moleInterval);
        clearInterval(timerInterval); // Clear any running timer
        holes.forEach(hole => {
            hole.innerHTML = '';
        });
        score = 0;
        scoreBoard.textContent = score;
        gameDuration = 30; // Reset game duration to 30 seconds
        timer.textContent = gameDuration;
    }

    function randomMole() {
        holes.forEach(hole => {
            hole.innerHTML = '';
        });

        const randomHole = holes[Math.floor(Math.random() * holes.length)];
        const mouse = document.createElement('img');
        mouse.src = 'mouse.png'; // Path to your mouse image
        mouse.classList.add('mouse');
        randomHole.appendChild(mouse);
        setTimeout(() => {
            mouse.style.bottom = '0';
        }, 10);

        // Add bomb with a certain probability
        if (Math.random() < 0.3) { // 30% chance to add a bomb
            const bomb = document.createElement('img');
            bomb.src = 'bomb.png'; // Path to your bomb image
            bomb.classList.add('mouse'); // Reuse mouse class for animation
            randomHole.appendChild(bomb);
            setTimeout(() => {
                bomb.style.bottom = '0';
            }, 10);

            bomb.addEventListener('click', () => {
                endGameWithBomb();
            });
        }

        mouse.addEventListener('click', () => {
            score++;
            scoreBoard.textContent = score;
            mouse.style.bottom = '-50%';
            setTimeout(() => randomHole.innerHTML = '', 300);
        });

        setTimeout(() => {
            if (mouse.style.bottom === '0') {
                mouse.style.bottom = '-50%';
                setTimeout(() => randomHole.innerHTML = '', 300);
            }
        }, moleSpeed);
    }

    function endGameWithBomb() {
        clearInterval(moleInterval);
        clearInterval(timerInterval);
        alert('Game Over! You clicked the bomb.');
        holes.forEach(hole => {
            hole.innerHTML = '';
        });
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
            highScoreBoard.textContent = highScore;
        }
    }
});
