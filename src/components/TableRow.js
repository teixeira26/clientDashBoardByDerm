import React from 'react';

const specialCases = [
    'ALARGADOR PESTAÑAS COVER WHIT BRUSHES',
    'VALVULAS CREAM PUMP 24/410',
    'ALARGADOR PESTAÑAS ENVASES',
    'ALARGADOR PESTAÑAS INNER',
    'VALVULAS GATILLOS',
    'POMOS S/I/C/T PLASTICO TUBE 30ML',
    'SILVER PUMP FOR 30ML PERAL ACRYLIC BOTTLE',
    'BOTELLA NUEVO S/I 30ML PEARL ACRYLIC BOTTLE',
];

const TableRow = ({ tableRowsData }) => {

    return (
        <tr className=''>
            {
                tableRowsData?.map((tableRowData, index) => {
                    if ((parseInt(tableRowsData[4]) < parseInt(tableRowsData[3])) && index === 4 && !isNaN(parseInt(tableRowsData[3]))) {
                        return (
                            <td 
                                className={`text-[#B91C1C]`} 
                                key={index}>
                                <p 
                                    title='La cantidad es inferior a la cantidad minima establecida' 
                                    className='font-semibold border-white border-solid border-[1px] cursor-pointer bg-[#FEE2E2] py-[2px] rounded-[32px] m-1 text-center'>
                                    {tableRowData}
                                </p>
                            </td>
                        );
                    } else if (index === 4 && !isNaN(parseInt(tableRowsData[3]))) {
                        return (
                            <td 
                                key={index} 
                                className={`text-[#3e6051]`}>
                                <p 
                                    title='Todo Ok' 
                                    className={`bg-[#c4fcdc] border-white border-solid border-[1px] rounded-[32px] font-semibold m-1 py-[2px] text-center cursor-pointer ${tableRowData === 'SALIDA' ? 'bg-red-400 text-white' : ''}`}>
                                    {tableRowData}
                                </p>
                            </td>
                        );
                    } else {
                        return (
                                <td className={`${index === 0 ? 'sticky left-0' : ''}`} key={index}>
                                    {specialCases.includes(tableRowData) ? (
                                        <div className='flex items-center bg-none'>
                                            {tableRowData}
                                            <span
                                                className="flex justify-center items-center ml-2 w-[20px] h-[20px] rounded-full cursor-pointer transition-all duration-300 hover:bg-red-300"
                                                title="Producto viejo"
                                            >
                                                <span className="w-[8px] h-[8px] bg-red-600 rounded-full block"></span>
                                            </span>
                                        </div>
                                    ) : tableRowData}
                                </td>
                        );
                    }
                })
            }
        </tr>
    );
};

export default TableRow;
