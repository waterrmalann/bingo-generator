var table = document.getElementById("myTable");
  var resetBtn = document.getElementById("resetButton");
  var bingoCount = 0;
  var bingoCounter = document.getElementById("bingoCount");

  // Function to create and shuffle the table
  function createAndShuffleTable() {
    table.innerHTML = ''; // Clear the table
    var numbers = [];
    for (var i = 1; i <= 25; i++) {
      numbers.push(i);
    }

    // Shuffle the numbers array
    for (var i = numbers.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = numbers[i];
      numbers[i] = numbers[j];
      numbers[j] = temp;
    }

    var count = 0;
    for (var i = 0; i < 5; i++) {
      var row = table.insertRow(i);
      for (var j = 0; j < 5; j++) {
        var cell = row.insertCell(j);
        cell.innerHTML = numbers[count];
        cell.addEventListener('click', function() {
          this.classList.add('strikethrough');
          checkForBingo();
        });
        count++;
      }
    }
  }

  // Check for Bingo occurrence
  function checkForBingo() {
    var cells = table.getElementsByTagName("td");

    var horizontalBingos = 0;
    var verticalBingos = 0;
    var diagonalBingos = 0;

    // Check for horizontal bingos
    for (var i = 0; i < 25; i += 5) {
      var row = Math.floor(i / 5);
      if (
        cells[i].classList.contains('strikethrough') &&
        cells[i + 1].classList.contains('strikethrough') &&
        cells[i + 2].classList.contains('strikethrough') &&
        cells[i + 3].classList.contains('strikethrough') &&
        cells[i + 4].classList.contains('strikethrough')
      ) {
        cells[i].classList.add('bingo');
        cells[i + 1].classList.add('bingo');
        cells[i + 2].classList.add('bingo');
        cells[i + 3].classList.add('bingo');
        cells[i + 4].classList.add('bingo');
        horizontalBingos++;
      }
    }

    // Check for vertical bingos
    for (var i = 0; i < 5; i++) {
      if (
        cells[i].classList.contains('strikethrough') &&
        cells[i + 5].classList.contains('strikethrough') &&
        cells[i + 10].classList.contains('strikethrough') &&
        cells[i + 15].classList.contains('strikethrough') &&
        cells[i + 20].classList.contains('strikethrough')
      ) {
        cells[i].classList.add('bingo');
        cells[i + 5].classList.add('bingo');
        cells[i + 10].classList.add('bingo');
        cells[i + 15].classList.add('bingo');
        cells[i + 20].classList.add('bingo');
        verticalBingos++;
      }
    }

    // Check for diagonal bingos
    if (
      cells[0].classList.contains('strikethrough') &&
      cells[6].classList.contains('strikethrough') &&
      cells[12].classList.contains('strikethrough') &&
      cells[18].classList.contains('strikethrough') &&
      cells[24].classList.contains('strikethrough')
    ) {
      cells[0].classList.add('bingo');
      cells[6].classList.add('bingo');
      cells[12].classList.add('bingo');
      cells[18].classList.add('bingo');
      cells[24].classList.add('bingo');
      diagonalBingos++;
    }

    if (
      cells[4].classList.contains('strikethrough') &&
      cells[8].classList.contains('strikethrough') &&
      cells[12].classList.contains('strikethrough') &&
      cells[16].classList.contains('strikethrough') &&
      cells[20].classList.contains('strikethrough')
    ) {
      cells[4].classList.add('bingo');
      cells[8].classList.add('bingo');
      cells[12].classList.add('bingo');
      cells[16].classList.add('bingo');
      cells[20].classList.add('bingo');
      diagonalBingos++;
    }

    bingoCount = horizontalBingos + verticalBingos + diagonalBingos;
    bingoCounter.textContent = bingoCount;
  }

  // Initial creation and shuffle of the table
  createAndShuffleTable();

  // Reset button functionality
  resetBtn.addEventListener('click', function() {
    bingoCount = 0;
    bingoCounter.textContent = bingoCount;
    var cells = table.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
      cells[i].classList.remove('strikethrough', 'bingo');
    }
    createAndShuffleTable();
  });
