const totalDcPointsPorFarmaciaYAPM = (dcPoints, apmCarga, month) => {
    const result = {};
    const resultPreviousMonth = {};
    const currentYear = new Date().getFullYear();
  
    // Filtrar las recetas por el APM CARGA especificado y el mes dado
    const filteredDcPoints = dcPoints.filter(dcPoint => {
      const [day, monthd, year] = dcPoint['VV+'].split('/');
      const date = new Date(year, monthd - 1, day); // Ajuste del mes restando 1
      return dcPoint['APM'] === apmCarga && date.getMonth() === month && date.getFullYear() === currentYear;
    });

    const filteredDcPointsPreviousMonth = dcPoints.filter(dcPoint => {
        const [day, monthd, year] = dcPoint['VV+'].split('/');
        const date = new Date(year, monthd - 1, day); // Ajuste del mes restando 1
        return dcPoint['APM'] === apmCarga && date.getMonth() === month - 1 && date.getFullYear() === currentYear;
      
      });
  
    // Agrupar por farmacia y sumar las cantidades
    filteredDcPointsPreviousMonth.forEach(dcPoint => {
        const farmacia = dcPoint.FARMACIA.replace(/\s{2,}/g, ' ');
        const cantidad = Number(dcPoint.CANTIDAD);
    
        if (!resultPreviousMonth[farmacia]) {
          resultPreviousMonth[farmacia] = 0;
        }
        if(!isNaN(cantidad)){
          resultPreviousMonth[farmacia] += cantidad;
        }
      });

    filteredDcPoints.forEach(dcPoint => {
      const farmacia = dcPoint.FARMACIA.replace(/\s{2,}/g, ' ');
      const cantidad = Number(dcPoint.CANTIDAD);
  
      if (!result[farmacia]) {
        result[farmacia] = 0;
      }
      if(!isNaN(cantidad)){
        result[farmacia] += cantidad;
      }
    });

   
    // Convertir el resultado en un array de objetos
    const resultArray = Object.keys(result).map(farmacia => ({
      farmacia: farmacia,
      totalCantidad: result[farmacia],
      totalMesAnterior: resultPreviousMonth[farmacia] || 0,
    }));
  
    return resultArray.sort((x, y)=>y.totalCantidad-x.totalCantidad);
  }
  
  export default totalDcPointsPorFarmaciaYAPM;