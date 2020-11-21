

function makePalette() {

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
        let div = $('<div class="cell">');
        $('.grid').append(div);
    }
}
const makeGridCustom = (x, y) => {
    const gridWidth = 64 * y + 2;
    const cellWidth = gridWidth / x;
    const gridHeight = cellWidth * y

    const gridHeightString = Math.floor(gridHeight) + "px";
    const gridWidthString = Math.floor(gridWidth) + "px";
    const cellWidthString = Math.floor(cellWidth) + "px";
    
    $('div.cell').css({
        width: cellWidthString,
        height: cellWidthString
    });
    $('.grid').css({
        width: gridWidthString,
        height: gridHeightString
    });
    for (let i = 0; i < (x * y); i++) {
        let div = $('<div class="cell">');
        $('.grid').append(div);
    }
}

function onPaletteClick() {
    
    const targetElement = $( this );
    
    $('.palette button.active').removeClass('active');
    targetElement.addClass('active');

}

// function onGridClick() {
//     const target = $(this);
//     const colorSource = $('.palette .active').css('background-color');
//     if (target.css('background-color') === colorSource) {
//         target.css('background-color', "");
//     } else {
//         target.css('background-color', colorSource);
//     }
// }

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

$('.create-grid button').click(onCreateGridClick);

$('.grid .cell').mousedown(function () {
    mouseIsDown = true;
    const target = $(this);
    const colorSource = $('.palette .active').css('background-color');
    if (target.css('background-color') === colorSource) {
        target.css('background-color', "");
    } else {
        target.css('background-color', colorSource);
    }
    // console.log("mouse is down:" + mouseIsDown)
})

$('*').mouseup(function (){
    mouseIsDown = false;
    // console.log("mouse is down:" + mouseIsDown)
})
$('.grid .cell').mouseenter(function() {
    if (mouseIsDown === true) {
        const target = $(this);
        const colorSource = $('.palette .active').css('background-color');
        if (target.css('background-color') === colorSource) {
            target.css('background-color', "");
        } else {
            target.css('background-color', colorSource);
        }

    }
})

//having trouble making new colors active
//having trouble making new grids react to clicks