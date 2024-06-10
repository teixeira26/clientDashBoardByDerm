function visitsPerMonth(visits, month) {
    const result = [];
    const currentYear = new Date().getFullYear();
  
    // Filtra las visitas por el mes y año actual
    const filteredVisits = visits.filter(visit => {
      const date = new Date(visit.FECHA);
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
      if(visit['TIPO DE VISITA'].toUpperCase() === 'WHATSAPP') acc[apm].totalWhatsApp += 1;
      else if (visit['TIPO DE CONTACTO'].toUpperCase() === 'MEDICO') {
        acc[apm].totalMedico += 1;
      } else if (visit['TIPO DE CONTACTO'].toUpperCase() === 'FARMACIA') {
        acc[apm].totalFarmacias += 1;
      }
  
      return acc;
    }, {});
  
    // Convertir el objeto agrupado en un array y agregar el campo fecha
    for (const apm in groupedByAPM) {
      result.push({
        fecha: `${month}/${currentYear}`,
        apm: groupedByAPM[apm].apm,
        totalMedico: groupedByAPM[apm].totalMedico,
        totalFarmacias: groupedByAPM[apm].totalFarmacias,
        totalWhatsApp: groupedByAPM[apm].totalWhatsApp,
      });
    }
  
    return result;
  }
  
export default visitsPerMonth