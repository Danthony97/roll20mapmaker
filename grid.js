

//run function one on load
gridLoop()

//angle set here to avoid being reset every update function
var angle = 0

var path = "media/wall.png"
var objDepth = -2

var mousedown

function gridLoop() {
//get desired y and x values
var grid_y =  document.getElementById("y").value;
var grid_x = document.getElementById("x").value;



//clear grid squares on update
removeGrid()

//Loop over Y and create a new grid with its pos
    for (y =1; y < grid_y; y++){
      //append the return of createGrid to index, pa
      document.getElementById("grid").appendChild(createGrid(0,y,"grid_" + y + "-0"));
      //Loop over x and create a new grid with its pos
      for (x =1; x < grid_x; x++){
            document.getElementById("grid").appendChild(createGrid(x,y,"grid_" + y + "-" + x));
        }
    }
    
}

function createGrid(x,y, name) {
    var div = document.createElement("div");
    div.className = name
    div.id = name
    div.style.width = "69px";
    div.style.height = "69px";
    div.style.border = "1px solid #000";
    div.style.position = "absolute"
    div.style.left = (69 * x) + "px"
    div.style.top = (69 * y) + "px"
    div.style.opacity = 0.25
    div.onmousedown = function() {clickId(event, name); mousedown = true}
    div.onmouseup = function() {mousedown = false}
    div.onmouseover = function() {select(div,mousedown)}
    div.onmouseleave = function() {deselect()}
    
    return div
}

function removeGrid(){
    var clear = document.getElementById("grid");
    clear.innerHTML = '';
}


function removeallobj(){
    var clear = document.getElementById("images");
    clear.innerHTML = '';
}


function select(div,mousedown){
    var img = document.createElement("img")
    img.src = path
    img.id = "outline"
    img.style.position = "absolute"
    img.style.left = div.style.left
    img.style.top = div.style.top
    img.style.zIndex = objDepth
    img.style.transformOrigin = "middle"
    img.style.transform = 'rotate(' + angle + "deg)";
    document.getElementById("images").appendChild(img)

    if (mousedown){ placeObj(div.className) }

}

function deselect(div){
    img = document.getElementById("outline");
    img.remove()
}

function clickId(event,name){
    switch (event.button){
        case 0:
        placeObj(name)
        break;
        
        case 1:
            rotate()
        break;

        case 2:
            if (document.getElementById("obj" + name)){
                removeObj(name)
            }
        break;
    }

}

function objUpdate(objId){
    switch (objId){
        case 0:
            path = "media/wall.png"
            objDepth = -2
        break;
        
        case 1:
            path = "media/floor.png"
            objDepth = -3
        break;
        
        case 2:
            path = "media/door.png"
            objDepth = -1
        break;

        case 3:
            path = "media/oob.png"
            objDepth = -4
        break;
    }

}

function placeObj(name){
    var outline = document.getElementById("outline");
    var obj = outline.cloneNode(true)
    obj.id = "obj" + name

    document.getElementById("images").appendChild(obj)

}

function removeObj(name){
    img = document.getElementById("obj" + name);
    img.remove()
}

function rotate(){
    img = document.getElementById("outline")
    angle = (angle + 90) % 360; 
    img.style.transform = 'rotate(' + angle + "deg)";
}

function screenShot(){
    html2canvas(document.body).then(function(canvas) {
        // Export the canvas to its data URI representation
        document.body.appendChild(canvas);
        html2canvas.width = 69 * document.getElementById("y").value
        html2canvas.height = 69 * document.getElementById("x").value
    });
}