import React from 'react';

const InfoCard = ({ extraClass, name, status }) => {
    return (
        <div className={`${extraClass} flex flex-col items-center justify-center gap-2 bg-white rounded-[4px] p-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] text-black`}>
            <p className='font-semibold text-center'>{name}</p>
            <h3 className="text-xl font-bold badge badge-lg badge-secondary bg-[#E87722] text-white">{status}</h3>
        </div>
    );
};

export default InfoCard;