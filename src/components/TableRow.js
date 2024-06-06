import React from 'react';

const TableRow = ({ tableRowsData }) => {
    return (
        <tr>
            {
                tableRowsData?.map((tableRowData, index) =>
                    {
                        console.log((parseInt(tableRowsData[4]) < parseInt(tableRowsData[3])), parseInt(tableRowsData[3]), parseInt(tableRowsData[4]))
                        if((parseInt(tableRowsData[4]) < parseInt(tableRowsData[3]) )&& index === 4 && !isNaN(parseInt(tableRowsData[3])))return <td  style={{ color: '#B91C1C'}} key={index}><p title='La cantidad es inferior a la cantidad minima establecida' className='font-semibold border-white border-solid border-[1px] cursor-pointer bg-[#FEE2E2] py-[2px] rounded-[32px] m-1  text-center'>{tableRowData}</p></td>
                        else if(index === 4 && !isNaN(parseInt(tableRowsData[3]))) return <td key={index} style={{ color: '#3e6051'}}><p title='Todo Ok' className='bg-[#c4fcdc] border-white border-solid border-[1px] rounded-[32px] font-semibold  m-1 py-[2px] text-center cursor-pointer'>{tableRowData}</p></td>
                        else return <td key={index}><p>{tableRowData}</p></td>
                         
                    } )
            }
        </tr>
    );
};

export default TableRow;