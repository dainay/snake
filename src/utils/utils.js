import uniqid from 'uniqid';

export const generateRandomCoordinates = () => { 
    // console.log('GENERATE RANDOM COORDINATES');

    const id = uniqid();

    let min = 0;
    let max = 49;

    let x, y;
    
     x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
     y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;


    x *= 10;
    y *= 10;

    // console.log('x:', x, 'y:', y);

    return { x, y, id }; // return an object with x and y properties as keys and values as the random coordinates
};