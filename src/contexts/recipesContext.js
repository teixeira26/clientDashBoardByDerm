import { createContext, useEffect, useState } from "react";
import { getMonthInSpanish } from "../Services/Grafics/getMonthInSpanish";

import { BACKEND_URL } from "../constants/constants";
import { getRealAPMName } from "../Services/getRealApmNames";
import recipesPerAPMandPerMonth from "../Services/Grafics/recipes/recipesPerApmAndMonth";
import totalRecetasPorFarmaciaYAPM from "../Services/Grafics/recipes/totalRecipesPerPharmacyAndAPM";
import totalRecipesPerDoctorAndAPM from "../Services/Grafics/recipes/totalRecipesPerDoctorAndAPM";

export const recipesGraphicContext = createContext();

const RecipesGraphicProvider = ({ children }) => {
  const [infoUnfiltered, setInfoUnfiltered] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [actualMonth, setActualMonth] = useState(new Date().getMonth());
  const [recipeCardPorcentage, setRecipeCardPorcentaje] = useState();
  const [recipeCardTitle, setRecipeCardTitle] = useState(
    `Recetas en el mes de ${getMonthInSpanish(new Date().getMonth())}`
  );
  const [recipeCardValue, setRecipeCardValue] = useState(false);
  const [dashboardStep, setDashboardStep] = useState(0);
  const [pharmacysItem, setPharmacysItem] = useState(false);
  const [doctorsItem, setDoctorsItem] = useState(false);

  useEffect(() => {
    if(dashboardStep === 0){fetch(`${BACKEND_URL}/recipes/getAll`)
      .then(async (res) => {
        let response = await res.json();
        response = response.map((x) => {
          return { ...x, "APM CARGA": getRealAPMName(x["APM CARGA"]) };
        });
        setInfoUnfiltered(response);
        setChartData(recipesPerAPMandPerMonth(response, actualMonth + 1));
        const total = recipesPerAPMandPerMonth(
          response,
          actualMonth + 1
        ).reduce((x, y) => x + y.totalCantidad, 0);
        setRecipeCardValue(total);
        console.log(total, 'totaaal')
        setRecipeCardPorcentaje(
          Math.ceil(
            (total * 100) /
              recipesPerAPMandPerMonth(response, actualMonth).reduce(
                (x, y) => x + y.totalCantidad,
                0
              )
          ) - 100
        );
        setRecipeCardTitle(
          `Recetas en el mes de ${getMonthInSpanish(actualMonth)}`
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
        const totalPharmacysRecipes =  totalRecetasPorFarmaciaYAPM(
            infoUnfiltered,
            chartData[activeTooltipIndex].apmCarga,
            actualMonth
          )
          const totalPharmacysRecipesLastMonth =  totalRecetasPorFarmaciaYAPM(
            infoUnfiltered,
            chartData[activeTooltipIndex].apmCarga,
            actualMonth -1
          )
          const totaldoctorsRecipes =  totalRecipesPerDoctorAndAPM(
            infoUnfiltered,
            chartData[activeTooltipIndex].apmCarga,
            actualMonth
          )
      setPharmacysItem(
        totalPharmacysRecipes
      );
      setDoctorsItem(
       totaldoctorsRecipes
      );
      setDashboardStep(dashboardStep + 1);

      const total = totalPharmacysRecipes.reduce((x, y)=>x + y.totalCantidad ,0)
      const totalLastMonth = totalPharmacysRecipesLastMonth.reduce((x, y)=>x + y.totalCantidad ,0)

      setRecipeCardValue(total);

        setRecipeCardPorcentaje(
     totalLastMonth === 0 ? 0 : Math.ceil(
        (total * 100) /
          totalLastMonth
      )
    );
    setRecipeCardTitle(
        `Recetas de ${chartData[activeTooltipIndex].apmCarga} el mes de ${getMonthInSpanish(actualMonth)}`
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
    <recipesGraphicContext.Provider
      value={{
        infoUnfiltered,
        chartData,
        setActualMonth,
        actualMonth,
        recipeCardTitle,
        recipeCardPorcentage,
        recipeCardValue,
        previousClick,
        nextClick,
        handleClick,
        dashboardStep,
        pharmacysItem,
        setDashboardStep,
        doctorsItem,
        setDoctorsItem,
      }}
    >
      {children}
    </recipesGraphicContext.Provider>
  );
};

export default RecipesGraphicProvider;
