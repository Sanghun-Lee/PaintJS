// 캔버스에 마우스를 가져다 대면 그 위치를 알 수 있게 만들어 보자.
const canvas = document.getElementById("jsCanvas");
// 캔버스 객체 사용하기
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveButton = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_WIDTH = 700;
const CANVAS_HIEGHT = 700;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HIEGHT;

// 펜의 기본적인 색상을 의미한다. (검은색)
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HIEGHT);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

stopPainting = () => {
  painting = false;
};

onMouseMove = event => {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};

startPainting = () => {
  painting = true;
};

handleCanvasClick = () => {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HIEGHT);
  }
};

handleCM = event => {
  event.preventDefault();
  alert("마우스 오른쪽 버튼을 사용할 수 없습니다.");
};

if (canvas) {
  // 캔버스가 있으면 캔버스에 이벤트를 추가한다.
  canvas.addEventListener("mousemove", onMouseMove);
  // 마우스가 클릭되었을 때 이벤트
  canvas.addEventListener("mousedown", startPainting);
  // 마우스에서 손을 뗐을 때
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

handleColorClick = event => {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = ctx.strokeStyle;
};

handleRangeChange = event => {
  const size = event.target.value;
  ctx.lineWidth = size;
};

handleModeClick = () => {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
};

handleSaveClick = () => {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
};

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveButton) {
  saveButton.addEventListener("click", handleSaveClick);
}
