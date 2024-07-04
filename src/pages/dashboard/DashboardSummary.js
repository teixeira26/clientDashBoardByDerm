import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import RefreshButton from "../../components/Buttons/RefreshButton";
import InfoCard from "../../components/InfoCard";

import {
  OPTION_FOUR,
  OPTION_ONE,
  OPTION_TREE,
  OPTION_TWO,
} from "../../constants/dashboardMenus";
import VisitsGraphicProvider, {
  visitsGraphicContext,
} from "../../contexts/visitsContext.js";
import GraficsFactoryTemplate from "../../components/graficsFactory.template.js";
import GraphicsFactory from "../../components/graphicsFactory.js";
import { recipesGraphicContext } from "../../contexts/recipesContext.js";
import { dcPointsGraphicContext } from "../../contexts/dcPointsContext.js";

const DashboardSummary = () => {
  const [active, setActive] = useState(OPTION_ONE);

  window.addEventListener("load", () => {
    const leftBox = document.getElementById("left-box");
    const rightBox = document.getElementById("right-box");
    rightBox.style.height = `${leftBox.offsetHeight}px`;
  });

  window.addEventListener("resize", () => {
    const leftBox = document.getElementById("left-box");
    const rightBox = document.getElementById("right-box");
    rightBox.style.height = `${leftBox.offsetHeight}px`;
    rightBox.style.maxHeight = `${leftBox.offsetHeight}px`;
  });
  const { visitsCardPorcentage, visitsCardTitle, visitsCardValue } =
    useContext(visitsGraphicContext);

  const { recipeCardPorcentage, recipeCardTitle, recipeCardValue } = useContext(
    recipesGraphicContext
  );

  const { dcPointsCardTitle, dcPointsCardPorcentage, dcPointsCardValue } =
    useContext(dcPointsGraphicContext);

  return (
    <div className="p-4 mt-16">
      <div className="flex justify-between mb-6">
        <RefreshButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4  gap-4 mb-4">
        <InfoCard
          onClick={visitsCardValue ? () => {
            setActive(OPTION_ONE);
          } : ()=>{}}
          porcentaje={visitsCardPorcentage}
          name={visitsCardTitle}
          status={visitsCardValue}
          extraClass={active === OPTION_ONE ? "bg-[#F5F6F6] " : ""}
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          }
        />
        <InfoCard
          extraClass={active === OPTION_TWO ? "bg-[#F5F6F6] " : ""}
          onClick={recipeCardValue ? () => {
            setActive(OPTION_TWO);
          } : ()=>{}}
          porcentaje={recipeCardPorcentage}
          name={recipeCardTitle}
          status={recipeCardValue}
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
          extraClass={active === OPTION_TREE ? "bg-[#F5F6F6] " : ""}
          onClick={dcPointsCardValue ? () => {
            setActive(OPTION_TREE);
          }: ()=>{}}
          porcentaje={dcPointsCardPorcentage}
          name={dcPointsCardTitle}
          status={dcPointsCardValue}
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
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          }
        />
        <InfoCard
          extraClass={active === OPTION_FOUR ? "bg-[#F5F6F6] " : ""}
          onClick={() => {
            setActive(OPTION_FOUR);
          }}
          porcentaje={""}
          name={"Transfers hechos en el més de Junio"}
          status={"Proximamente"}
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
              <rect width="20" height="14" x="2" y="5" rx="2"></rect>
              <path d="M2 10h20"></path>
            </svg>
          }
        />
      </div>

      <GraphicsFactory type={active} />
    </div>
  );
};

export default DashboardSummary;
