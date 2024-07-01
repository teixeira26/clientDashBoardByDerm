import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import { recipesGraphicContext } from "../contexts/recipesContext";
import RecipeBarDesktop from "./molecules/recipeBarDesktop";
import RecipeBarMobile from "./molecules/recipeBarMobile";
import RecipesList from "./molecules/recipesList";
import { getMonthInSpanish } from "../Services/Grafics/getMonthInSpanish";

export default function RecipesGraphic() {
  const {
    chartData,
    recipeCardTitle,
    previousClick,
    nextClick,
    handleClick,
    dashboardStep,
    pharmacysItem,
    actualMonth, 
    doctorsItem,
  } = useContext(recipesGraphicContext);
  return (
    <>
      {dashboardStep === 0 ? (
        <div className="w-full overflow-x-scroll md:overflow-hidden shadow px-6">
          <div
            className="w-[180%] md:w-full rounded-[4px] flex justify-start gap-2 flex-col pb-5  "
            id="left-box"
          >
            <div
              className="md:w-full rounded-[4px] flex justify-start gap-2 flex-col pb-5  "
              id="left-box"
            >
              <div className="flex items-center justify-between pt-6">
                <div className="flex justify-between items-center w-full">
                  <div className="flex">
                    <p className="font-semibold leading-none max-w-[250px] tracking-tight ">
                      {recipeCardTitle}
                    </p>
                  </div>
                </div>

                <div className="flex absolute right-2 md:relative">
                  <div
                    className="hover:bg-[#00000025] mr-6 cursor-pointer"
                    onClick={() => previousClick()}
                    title="Més Anterior"
                  >
                    <svg
                      className=" rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32px"
                      height="32px"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"
                        fill="#0F0F0F"
                      />
                    </svg>
                  </div>
                  <div
                    className="hover:bg-[#00000025] mr-6 cursor-pointer"
                    onClick={() => nextClick()}
                    title="Mes posterior"
                  >
                    <svg
                      className=""
                      xmlns="http://www.w3.org/2000/svg"
                      width="32px"
                      height="32px"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"
                        fill="#0F0F0F"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {chartData && chartData.length > 0 ? (
              <div>
                <>
                  <RecipeBarDesktop
                    chartData={chartData}
                    handleClick={handleClick}
                  />
                  <RecipeBarMobile
                    chartData={chartData}
                    handleClick={handleClick}
                  />
                </>
              </div>
            ) : chartData.length === 0 ? 'Sin datos' : (
              <div className="mb-4 ">
                <Skeleton width={"100%"} height={"60vh"}></Skeleton>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RecipesList title={`Recetas x Farmacias en el mes de ${getMonthInSpanish(actualMonth)}`} list={pharmacysItem.map(x=>({...x, item:x.farmacia }))} />
          <RecipesList title={`Recetas x Medicos en el mes de ${getMonthInSpanish(actualMonth)}`} list={doctorsItem.map(x=>({...x, item:x.doctor }))} />
        </div>
      )}
    </>
  );
}
