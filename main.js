var image = [];
var i = 0;
var number = 0;
var closeButton = [];
var moveButton = [];
var x = 35;
var y = 105;
var r = 20;
var moveNumber = 0;
var clickTest = false;
var imageNumber = [];
var drawLine = false;
var imageOpacity = false;

const root = document.documentElement;

function setup()
{
  holeCanvas = createCanvas(windowWidth, windowHeight);
  background(255);

  textSize(15);
  text("輸入日期(YYYYMMDD) :", 23, 21);

  inputValue = createInput();
  inputValue.size(90);
  inputValue.position(30,40);

  showImageButton = createButton("查詢");
  showImageButton.mouseClicked(showImage);
  showImageButton.position(30, 70);

  drawButton = createButton("畫線");
  drawButton.mouseClicked(drawOrLine);
  drawButton.position(105, 70);

  lineButton = createButton("十字線");
  lineButton.mouseClicked(drawOrLine);
  lineButton.position(100, 70);
  lineButton.hide();

  clearLineButton = createButton("清除畫線");
  clearLineButton.mouseClicked(clearLine);
  clearLineButton.position(180, 70);

  filterButton = createButton("對比圖片");
  filterButton.mouseClicked(filterImg);
  filterButton.position(280, 70);

  createP("");
}

function draw()
{
  if(drawLine === false)
  {
    background(255);
    line(mouseX, 0, mouseX, windowHeight);
    line(0, mouseY, windowWidth, mouseY);
  }

  if(mouseIsPressed && number != 0)
  {
    if(moveButton[moveNumber].value() === moveNumber && clickTest === true)
    {
      x = mouseX;
      y = mouseY;
      moveButton[moveNumber].position(x-5, y-5);
    }
  }

  if(clickTest === false && drawLine === true)
  {
    stroke(0);
    if (mouseIsPressed === true)
    {
      line(mouseX, mouseY, pmouseX, pmouseY);
    }
  }
}

function drawtext(x, y, text_array)
{
  var pos_x = x;
  for(var j = 0; j < text_array.length; ++j)
  {
      var part = text_array[j];
      var t = part[0];
      var c = part[1];
      var w = textWidth( t );
      fill(c);
      text(t, pos_x, y);
      pos_x += w;
  }
}

function showImage()
{
  i = inputValue.value();

  imageNumber[number] = i;

  moveButton[number] = createButton("+", number);
  moveButton[number].mousePressed(produceMoveNumber);
  moveButton[number].mouseReleased(moveImage);
  moveButton[number].position(30, 100);

  image[number] = createImg("https://raw.githubusercontent.com/Celine10811020/Stock/main/Stock/"+ i +".PNG", "image not found");
  image[number].position(50, 100);

  closeButton[number] = createButton(i, number);
  closeButton[number].mouseClicked(closeImage);
  closeButton[number].position(375 + 100*number, 45);

  inputValue.value("");

  number++;
}

function closeImage()
{
  this.hide();
  var temp = this.value();
  image[temp].hide();
  moveButton[temp].hide();

  var tmp = number-temp;
  for(var j=1; j<tmp; j++)
  {
    temp++;
    image[temp-1] = image[temp];
    moveButton[temp-1] = moveButton[temp];
    moveButton[temp].value(temp-1);
    imageNumber[temp-1] = imageNumber[temp];
    closeButton[temp].position(375 + 100*(temp-1), 45);
    closeButton[temp-1] = closeButton[temp];
    closeButton[temp].value(temp-1);
  }

  if(number > 0)
  {
      number--;
  }
}

function produceMoveNumber()
{
  moveNumber = this.value();
  clickTest = true;
}

function moveImage()
{
  var temp = this.value();
  i = imageNumber[temp];
  image[moveNumber].hide();
  image[moveNumber] = createImg("https://raw.githubusercontent.com/Celine10811020/Stock/main/Stock/"+ i +".PNG", "image not found");
  image[moveNumber].position(x+15, y-5);
  clickTest = false;
}

function drawOrLine()
{
  if(drawLine === false)
  {
    drawButton.hide();
    lineButton.show();
    drawLine = true;
    background(255);
  }else
  {
    drawButton.show();
    lineButton.hide();
    drawLine = false;
  }
}

function clearLine()
{
  background(255);
}

function filterImg()
{
  if(imageOpacity === false)
  {
    imageOpacity = true;

    root.style.setProperty('--filterNumber', 50);
  }else
  {
    imageOpacity = false;
    root.style.setProperty('--filterNumber', 100);
  }
}
