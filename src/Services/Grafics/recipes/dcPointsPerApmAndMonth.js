const dcPointsPerAPMandPerMonth = (dcPoints, month)=>{
    const result = [];
  const currentYear = new Date().getFullYear();

  const filteredDcPoints = dcPoints.filter(dcPoint => {
    const [day, monthd, year] = dcPoint['VV+'].split('/')
    const date = new Date(year, monthd, day);
    return date.getMonth() === month && date.getFullYear() === currentYear;
  });

  const groupedByAPMCarga = filteredDcPoints.reduce((acc, dcPoint) => {
    const apmCarga = dcPoint.APM;
    const cantidad = Number(dcPoint.CANTIDAD);

    if (!acc[apmCarga]) {
      acc[apmCarga] = {
        apmCarga: apmCarga,
        totalCantidad: 0,
      };
    }
    if(!isNaN(cantidad)){
      acc[apmCarga].totalCantidad += cantidad;

    }

    return acc;
  }, {});

  for (const apmCarga in groupedByAPMCarga) {
    const apmData = groupedByAPMCarga[apmCarga];
    result.push({
      fecha: `${month}/${currentYear}`, 
      apmCarga: apmData.apmCarga,
      totalCantidad: apmData.totalCantidad,
    });
  }
  result.sort((a, b) => b.totalCantidad - a.totalCantidad);

  return result;

}

export default dcPointsPerAPMandPerMonth