import React from "react";
import Skeleton from "react-loading-skeleton";

const InfoCard = ({ extraClass, name, status, icon, porcentaje, desktop, responsive }) => {
  return (
    <div
      className={`${extraClass} rounded-[4px] pb-6 border bg-card text-card-foreground shadow ${responsive &&  ' md:hidden' } ${desktop &&  'hidden md:block' }`}
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
      { status ? porcentaje && <p className="text-xs text-muted-foreground px-6 mt-1 ">{porcentaje}%</p> : <div className="w-8 h-4 mt-2 mx-6">
<Skeleton width={'100%'} height={'100%'}></Skeleton>
      </div>}
    </div>
  );
};

export default InfoCard;
