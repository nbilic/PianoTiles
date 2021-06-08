
let img,mySound,slider,slider2,score = 0,width=400,height = 900;
let tiles = [];
let sounds = [];

function preload() {
  img = loadImage('sky.jpg');
  soundFormats('mp3', 'ogg','wav');
  mySound = loadSound('soundA.wav');
  
  let str1 = 'sound';
  let str2 = '.wav';
  let str3 = 'sounds/';
  
  for(let i = 0;i < 10;i++){
    let newStr = str1.concat(i);
    let newStr2 = newStr.concat(str2);
    let newStr3 = str3.concat(newStr2);
    sounds[i] = loadSound(newStr3);
  }
}

function setup() {
  createCanvas(width,height); 
  for(let i = 0;i < 4; i++){
    tiles[i] = new Tile(i*100,random(-200,-1200),100,200);
  }
  slider = createSlider(0, 255, 50);
  slider.position(width+10, 10);
  slider.style('width', '80px');
  
  slider2 = createSlider(0, 1, 0.2,0.1);
  slider2.position(width+10, 80);
  slider2.style('width', '80px')
  
  button = createButton('Reset');
  button.position(width+10, 50);
  button.mousePressed(reset);
  
}

let reset = () =>{
  score = 0;
  tiles.forEach(tile=>{
    tile.reset();
  });
  loop();
}


function mousePressed(){
  tiles.forEach(tile=>{
    tile.clicked(mouseX,mouseY);
  });
}


function draw() {
  background(img);
  for(let i = 0;i < width;i+=100){
    stroke(255);
    line(i,0,i,height);
  }
  
  tiles.forEach(tile=>{
    tile.show();
    tile.update();
  })

  textSize(32);
  fill(255);
  text(score, 340, 30);

}

class Tile{ 
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = 5;
    this.color = color(random(0,250),random(0,250),random(0,250));
    this.upperBound = -300;
    this.lowerBound = -1200;
  }
  
  show(){
    this.color.setAlpha(slider.value());
    fill(this.color);
    rect(this.x,this.y,this.w,this.h);
    
  }
  
  update(){
    this.y+= this.speed;
    if(this.y > height){
      noLoop();
      text('GAME OVER', 100, 450);
    }
  }
  
  reset(){
    this.y = random(this.upperBound, this.lowerBound);
    this.speed = 5;
  }
  
  clicked(mouseX,mouseY){
    if(mouseX > this.x && mouseX < this.x + this.w){
      if(mouseY > this.y && mouseY < this.y + this.h){
        this.y = random(this.upperBound, this.lowerBound);
        this.color = color(random(0,255),random(0,255),random(0,255));
        score++;
        this.speed+=0.5;
        
        let num = Math.floor(Math.random() * 10)
        sounds[num].setVolume(slider2.value());
        sounds[num].play();
    }
  }
}
}

