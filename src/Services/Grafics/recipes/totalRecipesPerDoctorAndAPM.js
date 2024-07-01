const totalRecipesPerDoctorAndAPM = (recipes, apmCarga, month) => {
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
  
    // Agrupar por doctor y sumar las cantidades
    filteredRecipesPreviousMonth.forEach(recipe => {
        const doctor = recipe.MEDICO.replace(/\s{2,}/g, ' ');
        const cantidad = Number(recipe.CANTIDAD);
    
        if (!resultPreviousMonth[doctor]) {
          resultPreviousMonth[doctor] = 0;
        }
    
        resultPreviousMonth[doctor] += cantidad;
      });

    filteredRecipes.forEach(recipe => {
      const doctor = recipe.MEDICO.replace(/\s{2,}/g, ' ');
      const cantidad = Number(recipe.CANTIDAD);
  
      if (!result[doctor]) {
        result[doctor] = 0;
      }
  
      result[doctor] += cantidad;
    });
    console.log(resultPreviousMonth, result)

   
    // Convertir el resultado en un array de objetos
    const resultArray = Object.keys(result).map(doctor => ({
      doctor: doctor,
      totalCantidad: result[doctor],
      totalMesAnterior: resultPreviousMonth[doctor] || 0,
    }));
  
    return resultArray.sort((x, y)=>y.totalCantidad-x.totalCantidad);
  }
  
  export default totalRecipesPerDoctorAndAPM;