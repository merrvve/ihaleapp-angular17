import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class XlsxService {

  constructor() { }

  public exportAsExcelFile(rows: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(rows);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  
 
  // public importExcelFile(file: File): Promise<any[]> {
  //   return new Promise<any[]>((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.onload = (event: any) => {
  //       const data = new Uint8Array(event.target.result);
  //       const workbook = XLSX.read(data, { type: 'array' });
  //       const sheetName = workbook.SheetNames[0];
  //       const worksheet = workbook.Sheets[sheetName];
  //       const excelData = XLSX.utils.sheet_to_json(worksheet, { blankrows: true, header:1 });
  //       resolve(excelData);
  //     };
  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //     fileReader.readAsArrayBuffer(file); // Use readAsArrayBuffer to read the file
  //   });
  // }


  public importExcelFile(file: File): Promise<string[][]> {
    return new Promise<string[][]>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (event: any) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const excelData: string[][] = [];
        
        // Check if worksheet range is defined
        if (!worksheet['!ref']) {
          reject("Worksheet range is not defined.");
          return;
        }
        
        const range = XLSX.utils.decode_range(worksheet['!ref']);
        
        for (let row = range.s.r; row <= range.e.r; row++) {
          const rowData: string[] = [];
          for (let col = range.s.c; col <= range.e.c; col++) {
            const cellAddress = { c: col, r: row };
            const cellRef = XLSX.utils.encode_cell(cellAddress);
            const cell = worksheet[cellRef];
            rowData.push(cell ? cell.v : ''); // Push cell value or empty string if cell is empty
          }
          excelData.push(rowData);
        }
        resolve(excelData);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
      fileReader.readAsArrayBuffer(file); // Use readAsArrayBuffer to read the file
    });
  }
  
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const downloadLink: HTMLAnchorElement = document.createElement('a');
    const url: string = window.URL.createObjectURL(data);
    downloadLink.href = url;
    downloadLink.download = fileName;
    downloadLink.click();
  }
}