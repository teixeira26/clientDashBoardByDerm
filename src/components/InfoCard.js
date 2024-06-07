import React from "react";

const InfoCard = ({ extraClass, name, status, icon, porcentaje }) => {
  return (
    <div
      className={`${extraClass} rounded-[4px] border bg-card text-card-foreground shadow`}
    >
      <div className="px-6 pb-2 pt-6 flex flex-row items-center justify-between space-y-0">
        <p className="tracking-tight text-sm font-medium">{name}</p>
        {icon}
      </div>
      <h3 className="text-2xl font-bold px-6">{status}</h3>
      <p className="text-xs text-muted-foreground px-6 pb-6">+{porcentaje}%</p>
    </div>
  );
};

export default InfoCard;
