import s from "./Snake.module.scss";

const Snake = ({ data, segmentRotations }) => {
    
    const getStyle = (dot, i) => {
        // console.log("Dot i:", i);
        
      const style = {
        transform: `translate(${dot[0]}px, ${dot[1]}px) rotate(${segmentRotations[i] || 0}deg)`,
      };
  
      return style;
    };

    // console.log('Data array in Snake:', data);

    return (
        <>
        
            {data.map((dot, i) => {
                // console.log("Dot:", dot);
                return (
                    <div 
                        key={i} 
                        className={s.snakeDot} 
                        style={ getStyle (dot, i) }
                         
                    >
                        <svg width="100%" height="100%" viewBox="0 0 275 418" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M212.563 7.54178C220.394 2.00405 227.734 -0.332779 237.33 0.935312C238.025 1.02546 238.719 1.1156 239.435 1.20847C248.794 2.73026 256.235 7.66385 261.965 15.1865C278.917 43.5135 275.456 79.6329 269.119 110.452C268.646 112.763 268.19 115.076 267.734 117.389C265.596 127.985 262.65 138.129 259.102 148.336C258.792 149.252 258.482 150.168 258.163 151.112C256.397 155.819 253.997 159.341 250.849 163.269C249.724 164.68 249.724 164.68 248.576 166.118C248.002 166.83 247.428 167.542 246.837 168.275C240.237 166.798 233.637 165.315 227.039 163.826C224.795 163.321 222.549 162.817 220.304 162.314C217.076 161.592 213.851 160.864 210.625 160.135C209.62 159.911 208.615 159.688 207.58 159.457C206.643 159.245 205.706 159.032 204.741 158.812C203.917 158.627 203.094 158.442 202.245 158.251C200.062 157.644 198.234 157.04 196.304 155.848C195.704 153.118 195.704 153.118 195.501 149.609C195.364 147.69 195.364 147.69 195.224 145.732C195.181 145.056 195.138 144.38 195.094 143.683C194.299 131.5 192.573 121.233 187.329 110.105C183.724 100.311 182.456 91.0505 183.171 80.6647C183.225 79.8429 183.28 79.021 183.336 78.1743C185.542 53.8197 192.856 23.6351 212.563 7.54178Z" fill="black"/>
                            <path d="M192.104 171.319C192.838 171.532 193.571 171.744 194.327 171.963C203.918 174.731 213.541 177.375 223.172 180.001C241.308 184.977 241.308 184.977 243.992 187.087C243.491 206.837 237.663 227.845 223.5 242.088C217.61 246.39 210.615 248.977 203.28 248.497C195.242 247.138 188.826 243.354 183.715 236.974C180.074 230.257 178.179 223.951 177.745 216.35C177.621 215.314 177.497 214.278 177.369 213.21C178.244 197.477 184.241 184.608 192.104 171.319Z" fill="black"/>
                            <path d="M16.7183 177.605C17.308 177.062 17.8976 176.52 18.505 175.961C25.1458 170.456 33.6414 168.469 42.1854 169.045C49.5172 169.973 54.692 171.365 60.429 176.063C61.1149 176.618 61.8008 177.173 62.5075 177.745C73.1743 186.902 78.8663 198.742 83.3797 211.858C83.6633 212.653 83.9468 213.449 84.239 214.269C92.4292 238.128 95.4905 260.493 86.3418 284.401C82.1642 296.616 82.3726 310.087 81.9192 322.866C80.8255 323.154 79.7317 323.443 78.6047 323.74C71.2866 325.685 64.0423 327.694 56.8655 330.117C53.437 331.193 49.9579 331.962 46.4519 332.74C44.0157 333.339 41.7098 334.101 39.348 334.943C36.0921 336.015 33.799 336.733 30.4971 335.387C28.8323 333.506 27.6243 331.805 26.293 329.701C25.7187 328.871 25.1444 328.041 24.5527 327.185C19.6559 320.006 19.6559 320.006 20.1589 316.648C19.5062 316.551 18.8534 316.453 18.1809 316.352C14.9678 307.961 12.2293 299.507 9.86861 290.839C9.6645 290.094 9.46038 289.349 9.25008 288.581C4.82871 272.286 1.07021 255.806 0.462987 238.873C0.419355 237.78 0.375722 236.688 0.330768 235.563C0.103817 216.543 1.62561 191.238 16.7183 177.605Z" fill="black"/>
                            <path d="M36.7313 356.737C40.0443 355.537 43.3624 354.353 46.6817 353.171C47.6237 352.83 48.5657 352.489 49.5363 352.137C50.4413 351.817 51.3464 351.496 52.2789 351.166C53.5295 350.718 53.5295 350.718 54.8053 350.261C57.003 349.662 57.003 349.662 59.9699 350.106C60.0677 349.453 60.1655 348.8 60.2662 348.128C78.0415 342.25 78.0415 342.25 86.768 339.964C97.8436 355.343 104.883 372.392 102.549 391.558C101.028 399.973 97.1885 408.016 90.0769 413.093C82.1629 417.597 75.0883 418.147 66.3127 415.77C63.3088 414.28 60.6772 412.495 58.0045 410.481C56.7864 409.622 55.5671 408.764 54.3449 407.91C54.4427 407.258 54.5405 406.605 54.6412 405.932C54.0955 405.59 53.5498 405.248 52.9876 404.895C41.6401 396.224 34.2929 370.471 36.7313 356.737Z" fill="black"/>
                        </svg>

                    </div>
                );
            })}
        </>
    );
};

export default Snake;
