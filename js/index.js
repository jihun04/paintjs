const canvas = document.getElementById("jsCanvas"),
  colors = document.getElementsByClassName("jsColor"),
  range = document.getElementById("jsRange"),
  mode = document.getElementById("jsMode"),
  save = document.getElementById("jsSave");
const ctx = canvas.getContext("2d");

const INITIAL_COLOR = "#2c2c2c",
  CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false,
  filling = false;


function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleColorClick() {
  const target = this;
  const color = target.style.backgroundColor;
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  target.classList.add("controls__color--click");
  target.addEventListener("transitionend", () => {
    target.classList.remove("controls__color--click");
    target.removeEventListener("click", this);
  });
}

function handleRangeInput(event) {
  const size = event.target.value;
  ctx.beginPath();
  ctx.lineWidth = size;
};

function handleModeClick() {
  if (filling) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨].jpeg";
  document.body.appendChild(link);
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", event => event.preventDefault());
}

for (const color of colors) {
  color.addEventListener("click", handleColorClick);
}

if (range) {
  range.addEventListener("input", handleRangeInput);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (save) {
  save.addEventListener("click", handleSaveClick);
}