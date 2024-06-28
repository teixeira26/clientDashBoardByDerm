import React from "react";
import VisitsGraphicProvider from "../contexts/visitsContext";
import DashboardSummary from "../pages/dashboard/DashboardSummary";
import RecipesGraphicProvider from "../contexts/recipesContext";

export default function DashboardTemplate() {
  return (
    <VisitsGraphicProvider>
      <RecipesGraphicProvider>
        <DashboardSummary />
      </RecipesGraphicProvider>
    </VisitsGraphicProvider>
  );
}
