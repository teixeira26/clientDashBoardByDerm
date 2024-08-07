import * as XLSX from 'xlsx-js-style';

export const createExcel = (info, title) => {
    const validInfo = info.filter(item => item.category && item.name);

    const priorityCategories = ["Producto Final", "Testers", "Envases"];
    const priorityInfo = validInfo.filter(item => priorityCategories.includes(item.category));
    const otherInfo = validInfo.filter(item => !priorityCategories.includes(item.category));

    const sortedInfo = [
        ...priorityCategories.flatMap(category => priorityInfo.filter(item => item.category === category)),
        ...otherInfo.sort((a, b) => {
            return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
        })
    ];

    if (sortedInfo.length === 0) {
        console.error("No valid data to write to Excel.");
        return;
    }

    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;

    const worksheetData = [
        ['ID', 'Nombre', `Cantidad (${formattedDate})`]
    ];

    let currentCategory = '';
    sortedInfo.forEach(item => {
        if (item.category !== currentCategory) {
            worksheetData.push([null, ` `, null]); // Espacio en blanco
            worksheetData.push([null, `${item.category}`, null]); // Categoría
            worksheetData.push([null, ` `, null]); // Espacio en blanco
            currentCategory = item.category;
        }
        worksheetData.push([item.id, item.name, item.quantity]);
    });

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    const columnWidths = [
        { wch: 15 },
        { wch: 120 },
        { wch: 50 }
    ];
    worksheet['!cols'] = columnWidths;

    const headerStyle = {
        font: { bold: true, sz: 14, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "4F81BD" } }
    };

    worksheet['A1'].s = headerStyle;
    worksheet['B1'].s = headerStyle;
    worksheet['C1'].s = headerStyle;

    // Aplicar colores alternos a las filas
    const rows = XLSX.utils.decode_range(worksheet['!ref']);
    for (let R = rows.s.r + 1; R <= rows.e.r; R++) {
        const isEven = (R % 2 === 0);
        const rowStyle = { fill: { fgColor: { rgb: isEven ? "E0E0E0" : "FFFFFF" } } };
        for (let C = rows.s.c; C <= rows.e.c; C++) {
            const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
            if (!worksheet[cellAddress]) worksheet[cellAddress] = { t: 's', v: '' };
            worksheet[cellAddress].s = rowStyle;
        }
    }

    // Aplicar el tamaño de fuente aumentado para todas las celdas
    for (const cell in worksheet) {
        if (worksheet[cell].v && worksheet[cell].t !== 'z') {
            if (!worksheet[cell].s) worksheet[cell].s = {};
            worksheet[cell].s.font = { sz: 26 };
        }
    }

    // Aplicar estilo específico a las categorías
    worksheetData.forEach((row, rowIndex) => {
        if (row[1] && row[1].trim() !== '' && !row[0] && !row[2]) {
            const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: 1 });
            if (!worksheet[cellAddress].s) worksheet[cellAddress].s = {};
            worksheet[cellAddress].s.font = { sz: 28, bold: true, color: { rgb: "000000" } }; // Aumentar tamaño y poner en negrita
        }
    });

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    if (excelBuffer.length === 0) {
        console.error("Excel buffer is empty.");
        return;
    }

    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${title}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
