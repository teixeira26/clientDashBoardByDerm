const recipesPerAPMandPerMonth = (recipes, month)=>{
    const result = [];
  const currentYear = new Date().getFullYear();

  const filteredRecipes = recipes.filter(recipe => {
    const [day, monthd, year] = recipe.fecha.split('/')
    const date = new Date(year, monthd, day);
    return date.getMonth() === month && date.getFullYear() === currentYear;
  });

  const groupedByAPMCarga = filteredRecipes.reduce((acc, recipe) => {
    const apmCarga = recipe['APM CARGA'];
    const cantidad = Number(recipe.CANTIDAD);

    if (!acc[apmCarga]) {
      acc[apmCarga] = {
        apmCarga: apmCarga,
        totalCantidad: 0,
      };
    }

    acc[apmCarga].totalCantidad += cantidad;

    return acc;
  }, {});

  for (const apmCarga in groupedByAPMCarga) {
    const apmData = groupedByAPMCarga[apmCarga];
    result.push({
      fecha: `${month + 1}/${currentYear}`, 
      apmCarga: apmData.apmCarga,
      totalCantidad: apmData.totalCantidad,
    });
  }
  result.sort((a, b) => b.totalCantidad - a.totalCantidad);

  return result;

}

export default recipesPerAPMandPerMonth