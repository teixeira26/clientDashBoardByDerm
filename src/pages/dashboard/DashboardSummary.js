import React, { useEffect, useRef, useState } from "react";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import PrintButton from "../../components/Buttons/PrintButton";
import RefreshButton from "../../components/Buttons/RefreshButton";
import InfoCard from "../../components/InfoCard";
import { createChart } from "lightweight-charts";

const DashboardSummary = () => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const [chartState, setChartState] = useState(false);
  
    


        
        const data = [

          { time: 12, value: 32.51, o:1982 },
          { time: 13, value: 31.11 },
          { time: 14, value: 27.02 },
          { time: "2018-12-25", value: 27.32 },
          { time: "2018-12-26", value: 25.17 },
          { time: "2018-12-27", value: 28.89 },
          { time: "2018-12-28", value: 25.46 },
          { time: "2018-12-29", value: 23.92 },
          { time: "2018-12-30", value: 22.68 },
          { time: "2018-12-31", value: 22.67 },
        ];
        


  const [pharmacyProducts, setPharmacyProducts] = useState([]);

 
  useEffect(() => {
    fetch("https://stringlab-ims-server.herokuapp.com/api/products/pharmacy")
      .then((res) => res.json())
      .then((products) => setPharmacyProducts(products.length));
  }, [pharmacyProducts]);

  
  return (
    <div className="p-4 mt-16">
      <div className="flex justify-between mb-6">
        <RefreshButton />
        <PrintButton />
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
            <div className="w-full aspect-video rounded-[4px] flex justify-start items-center gap-2 flex-col shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
            <p className="font-semibold">Visitas x Mes</p>
            <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: -10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="time" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="o" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />

          <Bar dataKey="value" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
            </div>
            

            <div className="grid grid-cols-2 grid-rows-2 gap-2">
            <InfoCard name={"By block oscuro"} status={369} />
            <InfoCard name={"Cleanser aqua"} status={386} />
            <InfoCard name={"Cleanser gel"} status={111} />
            <InfoCard name={"C + H"} status={222} />

            </div>
        </div>

  

    
    </div>
  );
};

export default DashboardSummary;
