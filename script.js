const container = document.getElementById("container");
let mouseDown = false;

const createNew = document.getElementById("createNew");
createNew.addEventListener("click", () => {
  const size = document.getElementById("gridSize").value;
  container.innerHTML = "";
  document.addEventListener("mousedown", () => {
    mouseDown = true;
  });
  document.addEventListener("mouseup", () => {
    mouseDown = false;
  });
  createGrid(size);
});

const chosenColor = document.getElementById("chosenColor");
const pickColorRadio = document.getElementById("pickColor");

// Add an event listener to the color picker
chosenColor.addEventListener("input", () => {
  // Automatically select the radio button
  pickColorRadio.checked = true;
});

// Create grid using specified size
function createGrid(size) {
  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.id = `row${i}`;
    row.className = "row";
    row.style.flexBasis = `${100 / size}%`;
    for (let j = 0; j < size; j++) {
      const cell = document.createElement("div");
      cell.id = `cell${j + i * size}`;
      cell.className = "cell";
      cell.style.flexBasis = `${100 / size}%`;
      cell.addEventListener("mouseover", () => {
        if (mouseDown) {
          colorCell(cell);
        }
      });
      row.appendChild(cell);
    }
    container.appendChild(row);
  }
}

function colorCell(cell) {
  const choices = document.getElementsByName("colorScheme");
  let colorChoice;
  for (let i = 0; i < choices.length; i++) {
    if (choices[i].checked) {
      colorChoice = choices[i].value;
      break;
    }
  }

  // Generate random color
  if (colorChoice == "random") {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    cell.style.backgroundColor = color;
  }
  // Fill from chosen color
  else if (colorChoice == "pickColor") {
    cell.style.backgroundColor = document.getElementById("chosenColor").value;
  }
}
