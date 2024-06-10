export function visitsPerApm(apmName, visits) {
  // Filtrar las visitas por el APM proporcionado
  const filteredVisits = visits.filter(visit => visit.APM === apmName);

  // Array para almacenar las visitas agrupadas por mes
  const groupedVisits = [];

  // Iterar sobre las visitas filtradas
  filteredVisits.forEach(visit => {
    const date = new Date(visit.FECHA);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const key = `${month}/${year}`;

    // Buscar si ya existe un objeto para este mes y año
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
        apm: apmName,
        totalMedico: visit['TIPO DE CONTACTO'].toUpperCase() === 'MEDICO' ? 1 : 0,
        totalFarmacias: visit['TIPO DE CONTACTO'].toUpperCase() === 'FARMACIA' ? 1 : 0,
        totalWhatsApp: visit['TIPO DE VISITA'].toUpperCase() === 'WHATSAPP' ? 1 : 0
      });
    }
  });

  // Ordenar el array por fecha (de menor a mayor)
  groupedVisits.sort((a, b) => {
    const [monthA, yearA] = a.fecha.split('/').map(Number);
    const [monthB, yearB] = b.fecha.split('/').map(Number);
    return yearA - yearB || monthA - monthB;
  });

  return groupedVisits;
}