//declare functions

function makePalette() {
    //color palette setup

    const PALETTE = [
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'purple',
        'pink',
        'white',
        'black'
    ];

    for (let index = 0; index < PALETTE.length; index = index + 1) {
        // access the color
        const nextColor = PALETTE[index]
        // rest of code below
        $('.palette').append($('<button>').css('background-color', nextColor))
        
    }
    $('.palette button').first().addClass('active');
}

let makeGrid = () => {
    for (let i = 0; i < 64; i++) {
        let div = $('<div class="cell borders">');
        $('.grid').append(div);
    }
}


const makeGridCustom = (x, y) => {
    
    const cellWidth = Math.floor(514 / x); 
    const gridWidth = (cellWidth * x) + 2;//how to avoid +2
    const gridHeight = cellWidth * y

    const gridHeightString = Math.floor(gridHeight) + "px";
    const gridWidthString = Math.floor(gridWidth) + "px";
    const cellWidthString = Math.floor(cellWidth) + "px";
    
    for (let i = 0; i < (x * y); i++) {
        let div = $('<div class="cell borders">');
        $('.grid').append(div);
    }

    $('div.cell')
        .css('flex-basis', cellWidthString)
        .css('height', cellWidthString);
    $('.grid')
    .css({
        width: gridWidthString,
        height: gridHeightString
    });

    //call event listeners
    $('.grid .cell').mousedown(onMousedown);
    $('*').mouseup(onMouseup);
    $('.grid .cell').mouseenter(onMouseenter);

}

//event handlers

function onPaletteClick() {
    
    const targetElement = $( this );
    
    $('.palette button.active').removeClass('active');
    targetElement.addClass('active');

}




function onClearClick() {
    $('.grid .cell').css('background-color', '');
}
function onFillAllClick() {
    const colorSource = $('.palette .active').css('background-color');
    $('.grid .cell').css('background-color', colorSource)
}
function onFillEmptyClick() {
    const colorSource = $('.palette .active').css('background-color');
    const cells = $('.grid .cell');
    for(let i = 0; i < cells.length; i++) {
        let nextElement = $(cells[i])
        if (nextElement.css('background-color') === 'rgba(0, 0, 0, 0)') {
            nextElement.css('background-color', colorSource);
        }

    }
}
function onAddColorClick() {
    const colorSource = $('.controls input').val();
    $('.palette button.active').removeClass('active');
    $('.palette').prepend($('<button>').css('background-color', colorSource).addClass('active'));

    //call event listeners
    $('.palette button').click(onPaletteClick);

}

function onCreateGridClick() {
    //clear grid
    $('.grid').html('');
    //create new grid
    let x = $('.create-grid input.columns').val();
    console.log("x: " + x);
    let y = $('.create-grid input.rows').val();
    console.log("y: " + y);
    makeGridCustom(x, y);

}

function onMousedown () {

    mouseIsDown = true;
    const target = $(this);
    const colorSource = $('.palette .active').css('background-color');
    if (target.css('background-color') === colorSource) {
        target.css('background-color', "");
    } else {
        target.css('background-color', colorSource);
    }
}

function onMouseup () {
        mouseIsDown = false;
        // console.log("mouse is down:" + mouseIsDown)
}
function onMouseenter () {
    if (mouseIsDown === true) {
        const target = $(this);
        const colorSource = $('.palette .active').css('background-color');
        if (target.css('background-color') === colorSource) {
            target.css('background-color', "");
        } else {
            target.css('background-color', colorSource);
        }

    }
}

function onToggleBordersClick () {
    $('.grid .cell')
    .toggleClass('borders')
}

//set variables
let mouseIsDown = false;

//call functions
makeGrid();
makePalette();

//Event Listeners
$('.palette button').click(onPaletteClick);

// $('.grid div.cell').click(onGridClick);
$('.controls .clear').click(onClearClick);
$('.controls .fill-all').click(onFillAllClick);
$('.controls .fill-empty').click(onFillEmptyClick);
$('.controls .add-color').click(onAddColorClick);
$('.controls .toggle-borders').click(onToggleBordersClick);

$('.create-grid button').click(onCreateGridClick);

$('.grid .cell').mousedown(onMousedown);
$('*').mouseup(onMouseup);
$('.grid .cell').mouseenter(onMouseenter);

//having trouble making new colors active
//having trouble making new grids react to clicks