 import s from './Board.module.scss';
 import Snake from '../snake/Snake';
 import { useEffect, useState, useRef } from 'react';
 import gsap from 'gsap';
 import Food from '../food/Food';
import { generateRandomCoordinates } from '../../utils/utils';
import GameOver from '../gameOver/GameOver';
  

const Board = () => {

// console.log('Board component');

const [snakeData, setSnakeData] = useState([
    [0, 0],
    [10, 0]

]);   

const [foodData, setFoodData] = useState([]);
 
const timer = useRef(0);
const foodTimer = useRef(0);
const direction = useRef('RIGHT');
const cantChangeDirection = useRef(true);
const [gameOver, setGameOver] = useState(false);
const [speed, setSpeed] = useState(0.4);
const [score, setScore] = useState(0);
// console.log('Direction:', direction);


const gameIsOver = () => {
    console.log('GAME OVER');
    gsap.ticker.remove(gameLoop); //to fix all updating images
    setGameOver(true);
}

const replay = () => {
    setGameOver(false);
    setSnakeData([
        [0, 0],
        [10, 0]
    ]);
    setFoodData([]);
    direction.current = 'RIGHT';
    timer.current = 0;
    foodTimer.current = 0;
    setSpeed(0.4);
    setScore(0);

 }

const hasEatenFood = () => { 
    const head = snakeData[snakeData.length - 1];
    //compare to whole existed food.

    const match = foodData.find((_food) => head[0] === _food.x && head[1] === _food.y); //to find the food that the snake ate
   
    if (match) {
        const newFoodData = foodData.filter((_food) => _food !== match);
        setFoodData(newFoodData);

        if (speed > 0.05) {
            setSpeed(speed - 0.04);
        }
         
        return true;
    } else {
        return false;
    }
}

const snakeCollapsed = () => {
    let head = snakeData[snakeData.length - 1];
    let snake =[...snakeData];//create copy of the snake

    snake.pop(); //remove the head of the snake to not compare head with itself

    for (let i = 0; i < snake.length; i++) {
        if (head[0] === snake[i][0] && head[1] === snake[i][1]) {
            return true;
        }
    }

    return false;
}


const moveSnake = () => { 
    let newSnakeData = [...snakeData]; //for clone the table to work with later
let head = newSnakeData[newSnakeData.length - 1]; //get the head of the snake


    switch (direction.current) {
    
        case "UP":
            head = [head[0], head[1] - 10];
            break;
       
            case "DOWN":
            head = [head[0], head[1] + 10];
                
            break;

        case "LEFT":
            head = [head[0] - 10, head[1]];            
            break; 

        case "RIGHT":
            head = [head[0] + 10, head[1]];         
            break;
    
        default:
            break;
    }

    newSnakeData.push(head); //add the new head to the snake
    newSnakeData.shift(); //remove the first element of the array

const isDead = isOutOfBoard();
console.log('Is dead:', isDead);
const snakeAteItself = snakeCollapsed();

if (isDead || snakeAteItself) { 
    gameIsOver();
} else {

    const snakeAteFood = hasEatenFood(); 
    console.log('Snake ate food:', snakeAteFood);
   
    if (snakeAteFood) {
        newSnakeData.unshift([ ]);//add an element at the beginning of the table

        setScore((prev) => prev + 10); //update the score
    }

    setSnakeData (newSnakeData); //update the state with the new snake data
   
}

}



const isOutOfBoard = () => { 
    const head = snakeData[snakeData.length - 1];
    if (head[0] < 0 || head[0] >= 500 || head[1] < 0 || head[1] >= 500) {
        return true;
    }

    return false;
}


const onKeyDown = (e) => {

    if (cantChangeDirection.current === false) return; //to make change directlon only when it was updated visually

    cantChangeDirection.current = false;


switch (e.keyCode) {
    case 38:
        console.log('UP');
        if (direction.current !== 'DOWN') {
        direction.current = 'UP';}
        break;
    case 40:
        console.log('DOWN');
        if (direction.current !== 'UP') {
        direction.current = 'DOWN';}
        break;
    case 37:
        console.log('LEFT');
        if (direction.current !== 'RIGHT') {
        direction.current = 'LEFT';
    }
        break;
    case 39:
        console.log('RIGHT');
        if (direction.current !== 'LEFT') {
        direction.current = 'RIGHT';
        }
        break;
    default:
        break;
}}

const addFood = () => {
    // console.log('ADD FOOD');
    generateRandomCoordinates();
    let food = generateRandomCoordinates();
    console.log('Food:', food);
    setFoodData((prev) => [...prev, food]);
    
    console.log('Food data:', foodData);

}

const gameLoop = (time, deltaTime, frame) => {
    // console.log("Game loop", time, deltaTime, frame);
timer.current += deltaTime * 0.001;
foodTimer.current += deltaTime * 0.001;

    if (timer.current > speed) {
        //  console.log('MOVE SNAKE');
        timer.current = 0;
        moveSnake();
        cantChangeDirection.current = true;
    }

    if (foodTimer.current > 3 && foodData.length < 15) {
        // console.log('CREATE FOOD');
        foodTimer.current = 0;
        
        addFood();
    }


}


useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
     
    gsap.ticker.add(gameLoop);

    return () => {
        window.removeEventListener("keydown", onKeyDown);
        gsap.ticker.remove(gameLoop);
    }
  }, [snakeData]);



    return (


        <div className={s.board}> 
        <span className={s.score}> Score : {score}</span>
        <Snake data={snakeData}></Snake>
      {  gameOver && <GameOver replay={replay}></GameOver> }
        
        {
            foodData.map((food) => {
                // console.log('Food DDDDDDDDDDDDDD:', food);
                return <Food key={food.id} coordonates={food}></Food>
            })
        }
     
        </div>
    )
 };


export default Board;