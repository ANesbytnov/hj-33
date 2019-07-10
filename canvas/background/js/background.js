/*jshint esversion: 6*/
'use strict';
const wall = document.querySelector('#wall');
const ctx = wall.getContext("2d");

// Генерация целого числа в диапазоне от min до max
const randomInt = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

// Генерация вещественного числа от min до max с количеством цифр после запятой = precision
function randomFloat(min, max, precision = 1) {
  const degree = Math.pow(10, precision);
  return randomInt(min * degree, max * degree) / degree;
}

// Функция времени № 1
function nextPoint1(x, y, time) {
  return {
    x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
    y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
  };
}

// Функция времени № 2
function nextPoint2(x, y, time) {
   return {
     x: x + Math.sin((x + (time / 10)) / 100) * 5,
     y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
   };
}

// Рисование кружка
function drawCircle() {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = '#FFFFFF';  
    ctx.lineWidth = this.size * 5;
    ctx.arc(
      this.currX,
      this.currY,
      this.size * 12,
      0, 
      2 * Math.PI
    );
    ctx.stroke(); 
    ctx.restore();
}

// Рисование крестика
function drawCross() {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = '#FFFFFF';  
    ctx.lineWidth = this.size * 5;
    ctx.rotate(Math.PI * this.angle / 180);
    ctx.moveTo(this.currX - this.size * 10, this.currY);
    ctx.lineTo(this.currX + this.size * 10, this.currY);
    ctx.stroke(); 
    ctx.moveTo(this.currX, this.currY - this.size * 10);
    ctx.lineTo(this.currX, this.currY + this.size * 10);
    ctx.stroke(); 
    ctx.restore();
}

const figures = [];       // массив объектов фигур
const countFigures = randomInt(50, 200); // количество объектов фигур
for (let i = 0; i < countFigures; i++) {
  figures.push({
    x: randomInt(0, wall.width),    // стартовый X
    y: randomInt(0, wall.height),   // стартовый Y (не меняется!)
    size: randomFloat(0.1, 0.6, 1), // У всех объектов должен быть определен относительный размер size, случайное число от 0.1 до 0.6 единиц, который влияет на другие параметры объекта. 
    speedRotate: randomFloat(-0.2, 0.2, 1),  // Крестик должен медленно поворачиваться со случайной скоростью в диапазоне -0.2 до 0.2 на тик (один этап перерисовки).
    angle: randomInt(0, 360),   // Также у крестика необходимо определить угол поворота от 0 до 360 градусов. 
    funcNextPoint: randomInt(0, 1) === 0 ? nextPoint1 : nextPoint2, // выбираем функцию времени
    funcDrawFigure: i + 1 > countFigures / 2 ? drawCircle : drawCross // выбираем тип фигуры (по сути - функцию отрисовки)
  });
}

// Перемещаем все фигуры в следующую позицию
function moveFigures() {
  for (let i = 0; i < countFigures; i++) {
    let result = figures[i].funcNextPoint(figures[i].x, figures[i].y, Date.now());
    figures[i].currX = result.x; // заводим новое поле, currX - текущий X
    figures[i].currY = result.y; // аналогично currY
    figures[i].angle += figures[i].speedRotate;
    // Если угол ушёл за диапазон 0-360, то возвращаемся в него
    if (figures[i].angle > 360) {
      figures[i].angle -= 360;
    } else if (figures[i].angle < 0) {
      figures[i].angle += 360;
    }
  }  
}

// Рисуем все фигуры
function drawFigures() {
  for (let i = 0; i < countFigures; i++) {
    figures[i].funcDrawFigure();
  }
}

setInterval(function() {
  ctx.clearRect(0, 0, wall.width, wall.height);   // зачистка
  moveFigures();
  drawFigures();
}, 50); //Фон должен перерисовываться со скоростью 20 кадров в секунду.