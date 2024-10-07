import s from './Food.module.scss';

const Food = ({ coordonates }) => { 


const style = {
    transform: `translate(${coordonates.x}px, ${coordonates.y}px)`,

};


    return (
        <div style={style} className={s.food}></div>
    );
}

export default Food;