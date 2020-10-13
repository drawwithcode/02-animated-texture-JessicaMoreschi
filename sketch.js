let mySnowflake=[];
let star={x:[], y:[], d:[]};
let snowSize=[];
let ii=0;
let strokeW;
let click_ini = true;


function setup() {
  createCanvas(windowWidth,windowHeight);

  //crea stelle (random ad ogni setup)
  const d = 50;
  for (let xx = d; xx < width; xx += random(d, d*5)) {
    for (let yy = d; yy < height; yy += random(d, d*5)) {
      star.x.push(xx);
      star.y.push(yy);
      star.d.push(d);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth,windowHeight)
}


function draw() {
  background("#324759");

  //display stelle
  push();
    stroke("#324759");
    strokeWeight(45);
    fill("#FFFFFF");
    for(let s = 0; s < star.x.length; s++){
      ellipse(star.x[s], star.y[s], star.d[s]);
    }
  pop();

  //display alberi
  push();
    noStroke();
    fill("#323741");
    triangle(windowWidth/6,windowHeight,windowWidth/6*2,windowHeight,windowWidth/6*1.5,windowHeight/1.5);
    triangle(windowWidth/6*4,windowHeight,windowWidth/6*5,windowHeight,windowWidth/6*4.5,windowHeight/1.5);
    triangle(windowWidth/10,windowHeight,windowWidth/10*2,windowHeight,windowWidth/10*1.5,windowHeight/1.3);
    triangle(windowWidth/10*8,windowHeight,windowWidth/10*9,windowHeight,windowWidth/10*8.5,windowHeight/1.3);
    triangle(windowWidth/10*6,windowHeight,windowWidth/10*7,windowHeight,windowWidth/10*6.5,windowHeight/1.3);
  pop();

  //display fiocchi
  for(let i = 0; i < mySnowflake.length; i++) {
    mySnowflake[i].display();
    mySnowflake[i].updating();
  }

  //display istruzioni iniziali
  if (click_ini == true) {
    push()
      stroke('#FFFFFF');
      strokeWeight(1);
      noFill();
      rect(width/15-45, height/10*9-30, 90, 70);
    pop()

    push()
      textAlign(CENTER);
      textSize(15);
      noStroke();
      fill('#FFFFFF');
      text('– CLICK –', width/15, height/10*9);
      text('let it snow', width/15, height/10*9+20);
    pop()
  }
}


//al click
function mouseClicked() {
  snowSize.push(random(5, 50));     //random dimensione stella
  strokeW = random(1, 3);           //random spessore stella
  addSnowflake();
  ii++;
  click_ini = false;                //togli istruzioni
}

//aggiungi fiocco
function addSnowflake() {
  const aSnowflake = new Snowflake (mouseX-snowSize[ii], mouseY-snowSize[ii], mouseX+snowSize[ii], mouseY+snowSize[ii], snowSize[ii], strokeW);
  mySnowflake.push(aSnowflake);
}

//generatore fiocchi
class Snowflake {
  constructor(temp_x1, temp_y1, temp_x2, temp_y2, tempsnowSize, temp_strokeW){
    this.x1 = temp_x1;
    this.y1 = temp_y1;
    this.x2 = temp_x2;
    this.y2 = temp_y2;
    this.snowSize = tempsnowSize;
    this.strokeW = temp_strokeW;
  }

  display(){
    stroke("white");
    strokeWeight(this.strokeW);
    //crea singolo fiocco
    line(this.x1, this.y1, this.x2, this.y2);
    line(this.x1+this.snowSize*2, this.y1, this.x2-this.snowSize*2, this.y2);
    line(this.x1+this.snowSize, this.y1, this.x2-this.snowSize, this.y2);
    line(this.x1, this.y1+this.snowSize, this.x2, this.y2-this.snowSize);
  }

  //caduta fiocchi
  updating(){
    this.y1 = this.y1+1;
    this.y2 = this.y2+1;
    this.x1 = this.x1+noise(this.x1);
    this.x2 = this.x2+noise(this.x1);
  }
}
