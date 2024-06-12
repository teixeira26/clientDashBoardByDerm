export const filterVisitsByDateRange = (visits) => {
    if(visits){const today = new Date();
    const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, today.getDate());

    console.log(visits)
    return visits.filter(visit => {
        const visitDate = new Date(visit.FECHA);
        return visitDate >= threeMonthsAgo && visitDate <= today;
    });}
};

