import { createContext, useEffect, useState } from "react";
import { getMonthInSpanish } from "../Services/Grafics/getMonthInSpanish";
import { BACKEND_URL } from "../constants/constants";
import dcPointsPerAPMandPerMonth from "../Services/Grafics/recipes/dcPointsPerApmAndMonth";
import totalDcPointsPorFarmaciaYAPM from "../Services/Grafics/recipes/totalDcPointsPerPharmacyAndAPM";
import totalDcPointsPerDermoAndAPM from "../Services/Grafics/recipes/totalRecipesPerDermoAndAPM";
import { getRealAPMName } from "../Services/getRealApmNames";


export const dcPointsGraphicContext = createContext();

const DcPointsGraphicProvider = ({ children }) => {
  const [infoUnfiltered, setInfoUnfiltered] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [actualMonth, setActualMonth] = useState(new Date().getMonth());
  const [dcPointsCardPorcentage, setDcPointsCardPorcentaje] = useState();
  const [dcPointsCardTitle, setDcPointsCardTitle] = useState(
    `DC Points generados en el mes de ${getMonthInSpanish(new Date().getMonth())}`
  );
  const [dcPointsCardValue, setDcPointsCardValue] = useState(false);
  const [dashboardStep, setDashboardStep] = useState(0);
  const [pharmacysItem, setPharmacysItem] = useState(false);
  const [dermosItem, setDermosItem] = useState(false);

  useEffect(() => {
    if(dashboardStep === 0){fetch(`${BACKEND_URL}/dcPoints/getAll`)
      .then(async (res) => {
        let response = await res.json();
        response = response.map((x) => {
          return { ...x, "APM": getRealAPMName(x["APM"]), CANTIDAD: x.CANTIDAD && x.CANTIDAD > 0 ? x.CANTIDAD: 1};
        });

        setInfoUnfiltered(response);

        setChartData(dcPointsPerAPMandPerMonth(response, actualMonth + 1));
        const total = dcPointsPerAPMandPerMonth(
          response,
          actualMonth + 1
        ).reduce((x, y) => x + y.totalCantidad, 0);
        setDcPointsCardValue(total);
        setDcPointsCardPorcentaje(
          Math.ceil(
            (total * 100) /
              dcPointsPerAPMandPerMonth(response, actualMonth).reduce(
                (x, y) => x + y.totalCantidad,
                0
              )
          ) - 100
        );
        setDcPointsCardTitle(
          `Dc Points en el mes de ${getMonthInSpanish(actualMonth)}`
        );
      })
      .catch((err) => {
        console.log(err);
      });}
  }, [actualMonth, dashboardStep]);

  const handleClick = (event) => {
    const { activeTooltipIndex } =
      event.chartX && event.chartY ? event : { activeTooltipIndex: -1 };

    if (activeTooltipIndex >= 0) {
        const totalPharmacysdcPoints =  totalDcPointsPorFarmaciaYAPM(
            infoUnfiltered,
            chartData[activeTooltipIndex].apmCarga,
            actualMonth
          )
          const totalPharmacysdcPointsLastMonth =  totalDcPointsPorFarmaciaYAPM(
            infoUnfiltered,
            chartData[activeTooltipIndex].apmCarga,
            actualMonth -1
          )
          const totaldermosdcPoints =  totalDcPointsPerDermoAndAPM(
            infoUnfiltered,
            chartData[activeTooltipIndex].apmCarga,
            actualMonth
          )
      setPharmacysItem(
        totalPharmacysdcPoints
      );
      setDermosItem(
       totaldermosdcPoints
      );
      setDashboardStep(dashboardStep + 1);

      const total = totalPharmacysdcPoints.reduce((x, y)=>x + y.totalCantidad ,0)
      const totalLastMonth = totalPharmacysdcPointsLastMonth.reduce((x, y)=>x + y.totalCantidad ,0)

      setDcPointsCardValue(total);

        setDcPointsCardPorcentaje(
     totalLastMonth === 0 ? 0 : Math.ceil(
        (total * 100) /
          totalLastMonth
      )
    );
    setDcPointsCardTitle(
        `Dc Points de ${chartData[activeTooltipIndex].apmCarga} el mes de ${getMonthInSpanish(actualMonth)}`
      );
    }
  
 
  };

  const previousClick = () => {
    if (actualMonth >= new Date().getMonth() - 1)
      setActualMonth(actualMonth - 1);
  };

  const nextClick = () => {
    if (actualMonth <= new Date().getMonth() - 1)
      setActualMonth(actualMonth + 1);
  };

  return (
    <dcPointsGraphicContext.Provider
      value={{
        infoUnfiltered,
        chartData,
        setActualMonth,
        actualMonth,
        dcPointsCardTitle,
        dcPointsCardPorcentage,
        dcPointsCardValue,
        previousClick,
        nextClick,
        handleClick,
        dashboardStep,
        pharmacysItem,
        setDashboardStep,
        dermosItem,
        setDermosItem,
      }}
    >
      {children}
    </dcPointsGraphicContext.Provider>
  );
};

export default DcPointsGraphicProvider;
