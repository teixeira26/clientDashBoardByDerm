import React from "react";
import Skeleton from "react-loading-skeleton";

const InfoCard = ({ extraClass, name, status, icon, porcentaje, desktop, responsive, onClick }) => {
  return (
    <div
      onClick={onClick} className={`${extraClass} rounded-[4px] cursor-pointer pb-6 border bg-card text-card-foreground shadow ${responsive &&  ' md:hidden' } ${desktop &&  'hidden md:block' }`}
    >
      <div className="px-6 pb-2 pt-6 flex flex-row items-center justify-between space-y-0">
        <p className="tracking-tight text-sm font-medium">{name}</p>
        {icon}
      </div>
      {status ? <h3 className="text-2xl font-bold px-6 ">{status}</h3> : 
      <div className="w-16 h-8 mx-6">
<Skeleton width={'100%'} height={'100%'} ></Skeleton>
      </div>
      }
      { status ? (porcentaje || porcentaje === 0) && <p className={`text-xs text-muted-foreground px-6 mt-1 font-semibold ${(porcentaje && porcentaje >= 0 )? 'text-green-500': 'text-red-500'}`}>{porcentaje > 0 ? `+${porcentaje}%`:porcentaje < 0 ? `${porcentaje}%` : '-'}</p> : <div className="w-8 h-4 mt-2 mx-6">
<Skeleton width={'100%'} height={'100%'}></Skeleton>
      </div>}
    </div>
  );
};

export default InfoCard;
