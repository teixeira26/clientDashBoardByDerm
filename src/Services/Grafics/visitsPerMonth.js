function visitsPerMonth(visits, month) {
  const result = [];
  const currentYear = new Date().getFullYear();
  console.log(month, new Date(visits[0].FECHA).getMonth(), visits[0])
  // Filtra las visitas por el mes y año actual
  const filteredVisits = visits.filter(visit => {
    const [year, monthVisit, day] = visit.FECHA.split('-')
    const date = new Date(year, monthVisit-1, day);
    return date.getMonth() === month && date.getFullYear() === currentYear;
  });

  // Agrupa las visitas por APM
  const groupedByAPM = filteredVisits.reduce((acc, visit) => {
    const apm = visit.APM;

    if (!acc[apm]) {
      acc[apm] = {
        apm: apm,
        totalMedico: 0,
        totalFarmacias: 0,
        totalWhatsApp: 0,
      };
    }
    if (visit['TIPO DE VISITA'].toUpperCase() === 'WHATSAPP') acc[apm].totalWhatsApp += 1;
    else if (visit['TIPO DE CONTACTO'].toUpperCase() === 'MEDICO') {
      acc[apm].totalMedico += 1;
    } else if (visit['TIPO DE CONTACTO'].toUpperCase() === 'FARMACIA') {
      acc[apm].totalFarmacias += 1;
    }

    return acc;
  }, {});

  // Convertir el objeto agrupado en un array y agregar el campo fecha
  for (const apm in groupedByAPM) {
    const apmData = groupedByAPM[apm];
    const totalVisits = apmData.totalMedico + apmData.totalFarmacias + apmData.totalWhatsApp;
    result.push({
      fecha: `${month + 1}/${currentYear}`, // +1 para que el mes sea en formato humano (1-12)
      apm: apmData.apm,
      totalMedico: apmData.totalMedico,
      totalFarmacias: apmData.totalFarmacias,
      totalWhatsApp: apmData.totalWhatsApp,
      sum: totalVisits,
    });
  }

  // Ordenar el array por totalVisits (de mayor a menor)
  result.sort((a, b) => b.sum - a.sum);

  return result;
}

export default visitsPerMonth;