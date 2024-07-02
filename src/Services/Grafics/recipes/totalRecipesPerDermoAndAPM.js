const totalDcPointsPerDermoAndAPM = (dcPoints, apmCarga, month) => {
    const result = {};
    const resultPreviousMonth = {};
    const currentYear = new Date().getFullYear();
  
    const filteredRecipes = dcPoints.filter(dcPoint => {
      const [day, monthd, year] = dcPoint['VV+'].split('/');
      const date = new Date(year, monthd - 1, day); // Ajuste del mes restando 1
      return dcPoint['APM'] === apmCarga && date.getMonth() === month && date.getFullYear() === currentYear;
    });

    const filteredRecipesPreviousMonth = dcPoints.filter(dcPoint => {
        const [day, monthd, year] = dcPoint['VV+'].split('/');
        const date = new Date(year, monthd - 1, day); // Ajuste del mes restando 1
        return dcPoint['APM'] === apmCarga && date.getMonth() === month - 1 && date.getFullYear() === currentYear;
      });
  
    // Agrupar por dermo y sumar las cantidades
    filteredRecipesPreviousMonth.forEach(dcPoint => {
        const dermo = dcPoint.DERMOS.replace(/\s{2,}/g, ' ');
        const cantidad = Number(dcPoint.CANTIDAD);
    
        if (!resultPreviousMonth[dermo]) {
          resultPreviousMonth[dermo] = 0;
        }
    
        resultPreviousMonth[dermo] += cantidad;
      });

    filteredRecipes.forEach(dcPoint => {
      const dermo = dcPoint.DERMOS.replace(/\s{2,}/g, ' ');
      const cantidad = Number(dcPoint.CANTIDAD);
  
      if (!result[dermo]) {
        result[dermo] = 0;
      }
  
      result[dermo] += cantidad;
    });
    console.log(resultPreviousMonth, result)

   
    // Convertir el resultado en un array de objetos
    const resultArray = Object.keys(result).map(dermo => ({
      dermo: dermo,
      totalCantidad: result[dermo],
      totalMesAnterior: resultPreviousMonth[dermo] || 0,
    }));
  
    return resultArray.sort((x, y)=>y.totalCantidad-x.totalCantidad);
  }
  
  export default totalDcPointsPerDermoAndAPM;