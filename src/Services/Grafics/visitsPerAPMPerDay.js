export const visitsPerAPMPerDay = (visits, apm, month) => {
    // Filtra las visitas por el APM y el mes proporcionados
    const filteredVisits = visits.filter(visit => {
      return visit.APM === apm && parseInt(visit.FECHA.split('-')[1], 10) === month;
    });
    console.log(filteredVisits, visits, apm, month)
  
    // Array para almacenar las visitas agrupadas por día
    const groupedVisits = [];
  
    // Iterar sobre las visitas filtradas
    filteredVisits.forEach(visit => {
      const [year, month, day] = visit.FECHA.split('-')
      const key = `${day}/${month}/${year}`;
  
      // Buscar si ya existe un objeto para este día
      const existingVisit = groupedVisits.find(item => item.fecha === key);
  
      if (existingVisit) {
        if(visit['TIPO DE VISITA'].toUpperCase() === 'WHATSAPP') existingVisit.totalWhatsApp += 1;
        else if (visit['TIPO DE CONTACTO'].toUpperCase() === 'MEDICO') {
          existingVisit.totalMedico += 1;
        } else if (visit['TIPO DE CONTACTO'].toUpperCase() === 'FARMACIA') {
          existingVisit.totalFarmacias += 1;
        }
      } else {
        groupedVisits.push({
          fecha: key,
          apm: apm,
          totalMedico: visit['TIPO DE CONTACTO'].toUpperCase() === 'MEDICO' ? 1 : 0,
          totalFarmacias: visit['TIPO DE CONTACTO'].toUpperCase() === 'FARMACIA' ? 1 : 0,
          totalWhatsApp: visit['TIPO DE VISITA'].toUpperCase() === 'WHATSAPP' ? 1 : 0
        });
      }
    });
  
    // Ordenar el array por fecha (de menor a mayor)
    groupedVisits.sort((a, b) => {
      const [dayA, monthA, yearA] = a.fecha.split('/').map(Number);
      const [dayB, monthB, yearB] = b.fecha.split('/').map(Number);
      return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB);
    });
  
    return groupedVisits;
  };