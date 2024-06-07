export function getMonthInSpanish(monthNumber) {
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
  
    if (monthNumber < 0 || monthNumber > 11) {
      return 'Número de mes inválido';
    }
  
    return months[monthNumber];
  }
  