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

function setup()
{
  holeCanvas = createCanvas(windowWidth, windowHeight);

  inputValue = createInput();
  inputValue.size(90);
  inputValue.position(30,40);

  showImageButton = createButton("查詢");
  showImageButton.mouseClicked(showImage);
  showImageButton.position(30, 70);

  slider = createSlider(0, 255, 100);
  slider.position(200, 25);
  slider.style("width", "80px");

  createP("");
}

function draw()
{
  var val = slider.value();
  background(val);

  textSize(15);
  text("輸入日期(YYYYMMDD) :", 23, 21);

  if(105 < val && val < 155)
  {
    var color = [0];
    var string = [["", color]];
    drawtext(50, 50, string);
  }else
  {
    var color = [255 - val];
    var string = [["", color]];
    drawtext(50, 50, string);
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

  image[number] = createImg("Stock/"+ i +".png", "image not found");
  image[number].position(50, 100);

  closeButton[number] = createButton(i, number);
  closeButton[number].mouseClicked(closeImage);
  closeButton[number].position(350 + 100*number, 50);

  inputValue.value("");

  number++;
};

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
    closeButton[temp].position(350 + 100*(temp-1), 50);
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
  image[moveNumber] = createImg("https://raw.githubusercontent.com/Celine10811020/S/main/Stock/"+ i +".png", "image not found");
  image[moveNumber].position(x+15, y-5);
  clickTest = false;
}
