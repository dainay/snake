import useStore from '../../utils/store';
import s from './Toggle.module.scss';
import { useEffect, useState } from 'react';

const Toggle = ({ mode }) => {

    const { mode:storeMode, removeMode, addMode} = useStore();//decomposition. rename variable mode to storeMode    

    // const [toggle, setToggle] = useState(false);

    // useEffect(() => {
     
    //     if (toggle) {
    //         addMode(mode);
    //     } else {
    //         removeMode(mode);
    //     }
      
        
    // }, [toggle]); // trigger or only on mount


    // useEffect(() => {  
    //     console.log(storeMode, 'storeMode'); 
    // }, [storeMode]);

    const handleClick = () => {
        if (storeMode.includes(mode)){
            removeMode(mode)
        } else {
            addMode(mode)
        }
    }
     
    return (
        <div className={s.wrapper} onClick={() => handleClick()}>
           
            <div className={s.toggle}>
                <div className={`${s.switch} ${storeMode.includes(mode) ? s.switch_active : ""}`}></div>
            </div>
            <span className={s.mode}>{mode}</span>
            
        </div>
    );
};

export default Toggle;