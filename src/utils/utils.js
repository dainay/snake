import uniqid from 'uniqid';
import gsap from 'gsap';
import useStore from "./store";

export const generateRandomCoordinates = (mode) => { 
    // console.log('GENERATE RANDOM COORDINATES');

// console.log(mode, 'mode into utils');
    

const id = uniqid();

let boardWidth = 850;
let boardHeight = 525;
let cellSize = 25;

let x, y;

if (mode.includes('corner')) {
    // console.log('corner mode');
    
    const side = Math.random();
    let maxCellsY = Math.floor(boardHeight / cellSize);
    let maxCellsX = Math.floor(boardWidth / cellSize);

    if (side <= 0.25) {
        // Left border
        x = 0;
        y = Math.floor(Math.random() * maxCellsY) * cellSize;
    } else if (side <= 0.5) {
        // Top border
        x = Math.floor(Math.random() * maxCellsX) * cellSize;
        y = 0;
    } else if (side <= 0.75) {
        // Right border
        x = (maxCellsX - 1) * cellSize;
        y = Math.floor(Math.random() * maxCellsY) * cellSize;
    } else {
        // Bottom border
        x = Math.floor(Math.random() * maxCellsX) * cellSize;
        y = (maxCellsY - 1) * cellSize;
    }

} else {
    
    let maxCellsX = Math.floor(boardWidth / cellSize);
    let maxCellsY = Math.floor(boardHeight / cellSize);

    x = Math.floor(Math.random() * maxCellsX) * cellSize;
    y = Math.floor(Math.random() * maxCellsY) * cellSize;
}

// console.log(x, y, id, 'x, y, id');

return { x, y, id };

 
};

export function defaultControls (e, direction) {
    
switch (e.keyCode) {
    case 38:
        // console.log('UP');
        if (direction.current !== 'DOWN') {
        direction.current = 'UP';}
        break;
    case 40:
        // console.log('DOWN');
        if (direction.current !== 'UP') {
        direction.current = 'DOWN';}
        break;
    case 37:
        // console.log('LEFT');
        if (direction.current !== 'RIGHT') {
        direction.current = 'LEFT';
    }
        break;
    case 39:
        // console.log('RIGHT');
        if (direction.current !== 'LEFT') {
        direction.current = 'RIGHT';
        }
        break;
    default:
        break;
}
}

export function reversedControls (e, direction) {
    
    switch (e.keyCode) {
        case 38:
            // console.log('UP');
            if (direction.current !== 'UP') {
            direction.current = 'DOWN';}
            break;
        case 40:
            // console.log('DOWN');
            if (direction.current !== 'DOWN') {
            direction.current = 'UP';}
            break;
        case 37:
            // console.log('LEFT');
            if (direction.current !== 'LEFT') {
            direction.current = 'RIGHT';
        }
            break;
        case 39:
            // console.log('RIGHT');
            if (direction.current !== 'RIGHT') {
            direction.current = 'LEFT';
            }
            break;
        default:
            break;
    }
    }

    const bang = new Audio('/audio/bang.mp3');
    let flashTween = null;

    export const runStudents = (newSnakeData, newSegmentRotations) => {
        if (newSnakeData.length > 3) {
            newSnakeData.splice(-2, 2);
            console.log('INSIDE THE RUN STUDENTS after removing 2 parts of the snake');
            newSegmentRotations.splice(-2, 2);

        } else {
          console.log('INSIDE THE RUN STUDENTS Snake is too short to apply trap effect.');
        }
      };
      
      

export const flashUser = () => {
    
    if (flashTween) flashTween.kill();

    bang.currentTime = 0;
    bang.play();
    document.querySelector('.flashbang').style.opacity = '1';

    flashTween = gsap.to('.flashbang', {
        opacity: 0,
        duration: 4,
        delay: 2, 
    });

    }

     export const triggerMode = () => {
        // console.log('TRIGGER MODE');
        const modes = ['corner', 'impossible', 'reversed'];
        const selectedMode = modes[Math.floor(Math.random() * modes.length)];

        useStore.getState().addMode(selectedMode);

        setTimeout(() => {
            // console.log('set timeout');
            useStore.getState().removeMode(selectedMode);
        }, 2000);

       
        
     }
