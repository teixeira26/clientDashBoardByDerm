const totalRecetasPorFarmaciaYAPM = (recipes, apmCarga, month) => {
    const result = {};
    const resultPreviousMonth = {};
    const currentYear = new Date().getFullYear();
  
    // Filtrar las recetas por el APM CARGA especificado y el mes dado
    const filteredRecipes = recipes.filter(recipe => {
      const [day, monthd, year] = recipe.fecha.split('/');
      const date = new Date(year, monthd - 1, day); // Ajuste del mes restando 1
      return recipe['APM CARGA'] === apmCarga && date.getMonth() === month && date.getFullYear() === currentYear;
    });

    const filteredRecipesPreviousMonth = recipes.filter(recipe => {
        const [day, monthd, year] = recipe.fecha.split('/');
        const date = new Date(year, monthd - 1, day); // Ajuste del mes restando 1
        return recipe['APM CARGA'] === apmCarga && date.getMonth() === month - 1 && date.getFullYear() === currentYear;
      });
  
    // Agrupar por farmacia y sumar las cantidades
    filteredRecipesPreviousMonth.forEach(recipe => {
        const farmacia = recipe.FARMACIA.replace(/\s{2,}/g, ' ');
        const cantidad = Number(recipe.CANTIDAD);
    
        if (!resultPreviousMonth[farmacia]) {
          resultPreviousMonth[farmacia] = 0;
        }
    
        resultPreviousMonth[farmacia] += 1;
      });

    filteredRecipes.forEach(recipe => {
      const farmacia = recipe.FARMACIA.replace(/\s{2,}/g, ' ');
      const cantidad = Number(recipe.CANTIDAD);
  
      if (!result[farmacia]) {
        result[farmacia] = 0;
      }
  
      result[farmacia] += 1;
    });
    console.log(resultPreviousMonth, result)

   
    // Convertir el resultado en un array de objetos
    const resultArray = Object.keys(result).map(farmacia => ({
      farmacia: farmacia,
      totalCantidad: result[farmacia],
      totalMesAnterior: resultPreviousMonth[farmacia] || 0,
    }));
  
    return resultArray.sort((x, y)=>y.totalCantidad-x.totalCantidad);
  }
  
  export default totalRecetasPorFarmaciaYAPM;