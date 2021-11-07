var drawing = false;
var context, dataURL;

window.onload = function() {

    const clear = document.getElementById('btnClear');
    const modal = document.getElementById('modal-container');
    const back = document.getElementById('btnBack');
    const save = document.getElementById('btnSave');
    var lineWidth = document.getElementById('lineWidth');
    var colorChange = document.getElementById('colorChange');

    //setup canvas
    context = document.getElementById('myCanvas').getContext("2d");
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight-60;

    //clear button
    clear.addEventListener('click', () => {
        context.clearRect(0,0, context.canvas.width, context.canvas.height);
    });

    //back button
    back.addEventListener('click', () => {
        modal.classList.remove('show')
        dataURL = undefined; //clear data URL
    });

    //width scale
    lineWidth.addEventListener('change', () => {
        context.lineWidth = lineWidth.value;
    });

    //color picker for lines
    colorChange.addEventListener('change', () => {
        context.strokeStyle = colorChange.value;
    });

    //save
    save.addEventListener('click', () => {
        //dispay the modal
        modal.classList.add('show');
        dataURL = document.getElementById('myCanvas').toDataURL();
        document.getElementById('canvasImg').src = dataURL;
    });

    //mouse movement
    document.onmousemove = handleMouseMove;
    document.onmousedown = handleDown;
    document.onmouseup = handleUp;

    //style line
    context.strokeStyle = "#000";
    context.lineJoin = "round";
    context.lineWidth = 5;
}

function handleMouseMove(e) {
    if(drawing && dataURL === undefined) {
        context.lineTo(e.clientX, e.clientY);
        context.closePath();
        context.stroke();
        context.moveTo(e.clientX, e.clientY);
    } else {
        context.moveTo(e.clientX, e.clientY);
    }
}

function handleDown(e) {
    drawing = !drawing; 
    context.moveTo(e.clientX, e.clientY);
    context.beginPath();  
}

function handleUp() {
    drawing = !drawing;
}
