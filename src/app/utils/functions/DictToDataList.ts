export function DictToDataList(dict: any) {
    
    if (dict) {
        let tableData = [];
      for (const key in dict) {
        tableData.push(dict[key]);
      }
      return tableData;
    }
    return null;
}