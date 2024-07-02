import React from "react";
import VisitsGraphicProvider from "../contexts/visitsContext";
import DashboardSummary from "../pages/dashboard/DashboardSummary";
import RecipesGraphicProvider from "../contexts/recipesContext";
import DcPointsGraphicProvider from "../contexts/dcPointsContext";

export default function DashboardTemplate() {
  return (
    <VisitsGraphicProvider>
      <RecipesGraphicProvider>
        <DcPointsGraphicProvider>
          <DashboardSummary />
        </DcPointsGraphicProvider>
      </RecipesGraphicProvider>
    </VisitsGraphicProvider>
  );
}
