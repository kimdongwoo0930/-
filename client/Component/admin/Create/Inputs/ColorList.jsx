import React from 'react';

const ColorList = ({ Color, setColor }) => {
    const ColorList = [
        '#FC5B3F',
        '#FCB03C',
        '#F2EB8D',
        '#6FB07F',
        '#7EBB41',
        '#BDCAF2',
        '#77A0F2',
        '#8B88F2',
        '#9177F2',
        '#F277DE',
    ];
    return (
        <div>
            {ColorList.map((color) => {
                return (
                    <div
                        style={{ backgroundColor: color, border: color === Color ? '2px solid black' : 'none' }}
                        onClick={() => setColor(color)}
                    ></div>
                );
            })}
        </div>
    );
};

export default ColorList;
