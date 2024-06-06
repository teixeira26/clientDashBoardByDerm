import * as XLSX from 'xlsx';


export const createExcel = (info, title)=>{
        const workbook = XLSX.utils.book_new();
        const worksheetData = [
          Object.keys(info[0]),
        ];
        for(let i = 0; i < info.length; i++){
            const keys = Object.keys(info[0])
            const row = []
            for (let e = 0; e < keys.length; e++){
                row.push(info[i][keys[e]])
            }
            worksheetData.push(
                row
           )
        }
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
      
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${title}.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)
      
}