$(document).ready(function() {
    let currentPlayer = 'X'; // X starts the game
    let moves = 0;
    let gameEnded = false;
  
    const cells = $('.cell');
    const turnDisplay = $('#turn');
    const resultDisplay = $('#result');
    const restartButton = $('#restart-btn');
  
    function checkWin(player) {
      const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
      ];
      return winningCombos.some(combination => {
        return combination.every(index => cells.eq(index).text() === player);
      });
    }
  
    function checkTie() {
      return moves === 9;
    }
  
    function cellClickHandler() {
      if ($(this).text() !== '' || gameEnded) return;
      $(this).text(currentPlayer);
      moves++;
      
      if (checkWin(currentPlayer)) {
        gameEnded = true;
        resultDisplay.text(`Player ${currentPlayer} wins!`).show();
      } else if (checkTie()) {
        gameEnded = true;
        resultDisplay.text('It\'s a tie!').show();
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnDisplay.text(`It's ${currentPlayer}'s turn`);
      }
    }
  
    function restartGame() {
      cells.text('');
      currentPlayer = 'X';
      moves = 0;
      gameEnded = false;
      resultDisplay.hide();
      turnDisplay.text(`It's ${currentPlayer}'s turn`);
    }
  
    cells.on('click', cellClickHandler);
    restartButton.on('click', restartGame);
  
    turnDisplay.text(`It's ${currentPlayer}'s turn`);
  });