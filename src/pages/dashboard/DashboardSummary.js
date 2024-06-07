import React, { useEffect, useRef, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import PrintButton from "../../components/Buttons/PrintButton";
import RefreshButton from "../../components/Buttons/RefreshButton";
import InfoCard from "../../components/InfoCard";
import { BACKEND_URL } from "../../constants/constants";
import visitsPerMonth from "../../Services/Grafics/visitsPerMonth";
import { visitsPerApm } from "../../Services/Grafics/visitsPerAPM";
import { visitsPerAPMPerDay } from "../../Services/Grafics/visitsPerAPMPerDay";
import { getAllVisitsWithComments } from "../../Services/Grafics/getAllVisitsWithComments";

const DashboardSummary = () => {
  const [infoUnfiltered, setInfoUnfiltered] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [comments, setComments] = useState(null);
  const [actualMonth, setActualMonth] = useState(null);
  const [title, setTitle] = useState("Visitas por APM - Junio 2024");

  const handleClick = (event) => {
    const { activeTooltipIndex } =
      event.chartX && event.chartY ? event : { activeTooltipIndex: -1 };

    if (activeTooltipIndex >= 0) {
      if (title.includes("Visitas por APM")) {
        setChartData(
          visitsPerApm(chartData[activeTooltipIndex].apm, infoUnfiltered)
        );
        setTitle(
          `Visitas de ${chartData[activeTooltipIndex].apm} en los últimos meses`
        );
      }
      if (title.includes("en los últimos meses")) {
        setChartData(
          visitsPerAPMPerDay(
            infoUnfiltered,
            chartData[activeTooltipIndex].apm,
            parseInt(chartData[activeTooltipIndex].fecha.split("/")[0])
          )
        );
        setTitle(
          `Visitas de ${chartData[activeTooltipIndex].apm} - ${chartData[activeTooltipIndex].fecha}`
        );
      }
      console.log(chartData[activeTooltipIndex]);
    }
  };

  useEffect(() => {
    fetch(`${BACKEND_URL}/visits/getAll`)
      .then(async (res) => {
        const response = await res.json();
        setActualMonth(new Date().getMonth())
        setInfoUnfiltered(response);
        setChartData(visitsPerMonth(response, new Date().getMonth() -1));
        setComments(getAllVisitsWithComments(response))
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const data = [
    { time: "2018-12-25", medicos: 27.32, Farmacias: 21.32, name: "GBA.OESTE" },
    { time: "2018-12-25", medicos: 27.32, Farmacias: 21.32, name: "CORDOBA" },
    { time: "2018-12-25", medicos: 27.32, Farmacias: 21.32, name: "LA PLATA" },
    { time: "2018-12-25", medicos: 27.32, Farmacias: 21.32, name: "GBA.SUR" },
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

      <div className="grid grid-cols-4 gap-4 mb-4">
        <InfoCard
porcentaje={'20'}

          name={"Visitas en el més de Junio"}
          status={369}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="h-4 w-4 text-muted-foreground"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          }
        />
        <InfoCard
porcentaje={'???'}

          name={"Recetas en el més de Junio"}
          status={'386'}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="h-4 w-4 text-muted-foreground"
            >
              <path
                d="M7.2 21C6.07989 21 5.51984 21 5.09202 20.782C4.71569 20.5903 4.40973 20.2843 4.21799 19.908C4 19.4802 4 18.9201 4 17.8V6.2C4 5.07989 4 4.51984 4.21799 4.09202C4.40973 3.71569 4.71569 3.40973 5.09202 3.21799C5.51984 3 6.0799 3 7.2 3H16.8C17.9201 3 18.4802 3 18.908 3.21799C19.2843 3.40973 19.5903 3.71569 19.782 4.09202C20 4.51984 20 5.0799 20 6.2V7M8 7H14M8 15H9M8 11H12M11.1954 20.8945L12.5102 20.6347C13.2197 20.4945 13.5744 20.4244 13.9052 20.2952C14.1988 20.1806 14.4778 20.0317 14.7365 19.8516C15.0279 19.6486 15.2836 19.393 15.7949 18.8816L20.9434 13.7332C21.6306 13.0459 21.6306 11.9316 20.9434 11.2444C20.2561 10.5571 19.1418 10.5571 18.4546 11.2444L13.2182 16.4808C12.739 16.96 12.4994 17.1996 12.3059 17.4712C12.1341 17.7123 11.9896 17.9717 11.8751 18.2447C11.7461 18.5522 11.6686 18.882 11.5135 19.5417L11.1954 20.8945Z"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
        />
        <InfoCard
        porcentaje={'???'}
        name={"Previstos hechos en el més de Junio"} status={'???'} 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="h-4 w-4 text-muted-foreground"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>}
        />
        <InfoCard
        porcentaje={'???'}
        name={"Transfers hechos en el més de Junio"} status={'???'} 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="h-4 w-4 text-muted-foreground"><rect width="20" height="14" x="2" y="5" rx="2"></rect><path d="M2 10h20"></path></svg>
        }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="w-full aspect-video rounded-[4px] flex justify-start gap-2 flex-col shadow pb-5 col-span-2">
          <p className="font-semibold leading-none tracking-tight px-6 pt-6 pb-2">
            {title}
          </p>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              onClick={handleClick}
              width={500}
              height={300}
              data={
                chartData
                  ? chartData.map((x) => {
                      return {
                        Medicos: x.totalMedico,
                        Farmacias: x.totalFarmacias,
                        name:
                          title.includes("Tus visitas en los últimos meses") ||
                          title.includes("Visitas de")
                            ? x.fecha
                            : x.apm,
                      };
                    })
                  : []
              }
              margin={{
                top: 5,
                right: 30,
                left: -10,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={"12px"} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="Medicos"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="Farmacias"
                fill="#82ca9d"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full aspect-video rounded-[4px] flex justify-start gap-2 flex-col shadow pb-5 ">
          <p className="font-semibold leading-none tracking-tight px-6 pt-6 pb-2">
            Ultimos comentarios realizados
          </p>
          <hr />
          {comments &&
          <div className="px-6">
 { comments.map(x=>{
            return(
              <div className="">
                <div className="flex pt-6 pb-2 ">
                  <div className="bg-[#f8dfb7] mr-4 w-8 h-8 rounded-full flex justify-center items-center"><p className="font-semibold">
                  {x.apm[0]}
                    </p></div>
                    <></>
                <p className="font-semibold leading-none tracking-tight  ">
                  {x.apm}
                </p>
                <p className="text-xs text-muted-foreground px-4 text-[12px]">{x.fecha}</p>
               
                </div>
               
                <p>
                  {x.comentarios}
                </p>
                <p className="text-xs text-muted-foreground text-[12px]">relacionado con {x.tipoDeContacto.toLowerCase() === 'medico' ? 'el' : 'la'} {x.tipoDeContacto.toLowerCase()} <span className="font-semibold">{x.contacto}</span></p>
                <div>
              
                </div>
              </div>
            )
          })}
          </div>
        
          }
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
