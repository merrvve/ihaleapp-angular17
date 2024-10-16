export function ListToDict(currentTableData: any[]) {
    if(currentTableData) {
        let data: { [key: number]: any } = {};
        for (let i = 0; i < currentTableData.length; i++) {
          data[i] = currentTableData[i];
        }
        return data;
    }
    return null;    
}