import React from 'react';

const Loader = () => {
    return (
        <div className="spinner"></div>
    )
}

const DashboardPageHeading = ({ name, value, buttons }) => {
    return (
        <div className="flex flex-col md:flex-row lg:flex-row justify-between items-center gap-y-4 mb-6">
            <h2 className='lg:text-2xl md:text-xl text-lg text-center font-bold'>
                {name} : <span className='badge badge-lg badge-secondary  bg-[#E87722] border-[#E87722] text-white'>{value ? value : <Loader />}</span>
            </h2>

            <div className='flex items-center gap-x-4'>
                {
                    buttons.map((button, index) => {
                        return <div key={index} >{button}</div>
                    })
                }
            </div>
        </div>
    );
};

export default DashboardPageHeading;