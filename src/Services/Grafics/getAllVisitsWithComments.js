export const getAllVisitsWithComments =(visits)=>{
        // Mapea las visitas para devolver solo las propiedades especificadas
        const result = visits.map(visit => ({
          comentarios: visit['COMENTARIOS'],
          apm: visit.APM,
          fecha: visit.FECHA,
          tipoDeContacto: visit['TIPO DE CONTACTO'],
          tipoDeVisita: visit['TIPO DE VISITA'],
          contacto: visit['CONTACTO']
        }));
      
        // Ordena las visitas por fecha de más actual a más antiguo
        result.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      
        return result;
}