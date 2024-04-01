import { Injectable } from '@angular/core';
import { Column } from '../models/column.interface';
import { TreeNode } from 'primeng/api';


import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TablodataService {
  public ornekData: any[][] = [
    ['key', 'İş Tanımı', 'Marka', 'Miktar','Birim' ,'Toplam Birim Fiyat','Toplam'],
    ['1', 'Başlık', '', '','','','']
  ];

  birimCols = 0;
  private _datatreeSubject = new BehaviorSubject<any[]>(this.convertToTreeTable(this.ornekData));
  datatree$ = this._datatreeSubject.asObservable();

  private _colsSubject = new BehaviorSubject<Column[]>(this.columns(this.ornekData));
  cols$ = this._colsSubject.asObservable();


  constructor() { }

  loadData(datalist:any[]) {
    this._colsSubject.next(this.columns(datalist));
    this._datatreeSubject.next(this.convertToTreeTable(datalist));
  }

  columns(ornekData: any[][]) {
    let cols : Column[] =[]
    let len = ornekData[0].length;
    for(let i=0; i<len; i++) {
      let editable = i ===0 ? false : true;
      let nf=false;
      let isToplam = ornekData[0][i].toLocaleLowerCase().includes('toplam')
      if(ornekData[0][i].toLocaleLowerCase().includes('miktar') || isToplam ) {
          nf=true;
      }
      editable = isToplam ? false: editable;
      //birim toplamı diğer toplamlardan ayır
      isToplam = ornekData[0][i]==="Toplam Birim Fiyat" ? false : isToplam;
      //tüm toplamı diğerlerinden ayır
      isToplam = ornekData[0][i]==="Toplam" ? false : isToplam;
      
      console.log(ornekData[0][i], isToplam)
      
      cols.push({
        field: ornekData[0][i],
        header: ornekData[0][i],
        editable: editable,
        numberField: nf,
        isBirim: false,
        isToplam: isToplam
      })
    }
    return cols;
  }

  convertToTreeTable(data: string[][], cols?: string[]): TreeNode[] {
    if (data.length < 2) {
        throw new Error('Input data should have at least two lists: column names and row data.');
    }
    let columns = [];
    
    if (cols) {
      columns = cols;
    }
    else {
      columns = data[0];
    }
    const result: TreeNode[] = [];

    // Create a map to store nodes by their keys for easy access
    const nodesMap: { [key: string]: any } = {};

    // Function to create a new node if it doesn't exist
    const createNode = (key: string, parentKey: string | null = null) => {
      if (!nodesMap[key]) {
          const newNode: TreeNode = { data: { key }, children: [] };
          if (parentKey) {
              const parentNode = nodesMap[parentKey];
              parentNode.children.push(newNode);
          } else {
              result.push(newNode);
          }
          nodesMap[key] = newNode;
      }
      return nodesMap[key];
  };
  

    // Iterate through each row in the input data
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const key = row[0];
        const parentNodeKey = key.includes('.') ? key.substring(0, key.lastIndexOf('.')) : null;
        const node = createNode(key, parentNodeKey);

        // Assign data to the node
        for (let j = 1; j < columns.length; j++) {
            node.data[columns[j]] = row[j];
            node.expanded = true;
        }
    }

    return result;
}

  deleteRow(node: any,datatree: any[]) {
    // Ara başlık ya da satır sil
    if(node.parent?.children) {
      let foundIndex = node.parent.children.indexOf(node);
      node.parent.children.splice(foundIndex,1);
      
        for (let i = foundIndex; i<node.parent.children.length; i++){
          node.parent.children[i].data.key =node.parent.data.key + '.'+ (i+1);
        }
      return true;
      
    }

    //Parentı olmayan ana başlık sil
    else {
      let foundIndexTitle = datatree.indexOf(node);
      const len =datatree.length;
      if(len==1) {
        return false; // tek bir ana başlık varsa silme false dön
      }
      else {
        datatree.splice(foundIndexTitle,1);
        for (let i = foundIndexTitle; i<(len-1); i++){
          datatree[i].data.key=i+1;
        }
        return true;
      }
      
    }
  }

  convertTreeToDatalist(datatree: any[], cols: Column[]) {
    let datalist = [];
    let colNames = [];
    for (const col of cols ) {
      colNames.push(col.field);
    }
    datalist.push(colNames);
    for (let i=0; i<datatree.length; i++) {
      let row=[]
      for (const value of colNames) {
        if(datatree[i].data[value]) {
          row.push(datatree[i].data[value])
        }
        else {
          row.push('');
        }
      }
     datalist.push(row);
     if(datatree[i].children.length>0) {
      
      for (let j=0; j<datatree[i].children.length; j++) {

        let row=[]
        for (const value of colNames) {
          if(datatree[i].children[j].data[value]) {
            row.push(datatree[i].children[j].data[value])
          }
          else {
            row.push('');
          }
        }
        datalist.push(row);
      }
     }
    }
    return datalist;
  }

deleteCol(columns: Column[],delcols: Column[]) {
  for (let i=0; i<delcols.length; i++){
    const index = columns.indexOf(delcols[i]);
    if(i>-1){
      columns.splice(index,1)
    }
  }
  this._colsSubject.next(columns);  
}


addOtherCol(name: string, columns: Column[]) {
  //Sütunları Güncelle
  columns.splice(2,0,{
    field: name,
    header: name,
    editable: true,
    numberField: false,
    isBirim: false,
    isToplam: false
  })
  this._colsSubject.next(columns);
}

addBirimCol(name: string = 'Diğer', columns: Column[]) {
  const position = columns.length -2 - this.birimCols;
  let birimName = name +' Birim Fiyat'
  let toplamName = name +' Toplam Fiyat'
  columns.splice(position,0,{
    field: birimName,
    header: birimName,
    editable: true,
    numberField: true,
    relatedField: toplamName,
    isBirim:true,
    isToplam: false
  });
  
 
  columns.splice(columns.length-1,0,{
    field: toplamName,
    header: toplamName,
    editable: false,
    numberField: true,
    isBirim: false,
    isToplam: true
  })

  this._colsSubject.next(columns);
  this.birimCols += 1;
  //this.dataService.addColumnToTree(this.files,toplamName,0);

}


addColumnToTree(dataTree: any[], columnName: string, value: any): void {
  // Iterate through each node in the dataTree
    const traverseTree = (node: any) => {
        // Add the new column with empty values to the node
        node.data[columnName] = value;

        // Recursively traverse through children
        for (const child of node.children) {
            traverseTree(child);
        }
    };

    // Traverse the tree starting from each root node
    for (const rootNode of dataTree) {
        traverseTree(rootNode);
    }
   this._datatreeSubject.next(dataTree);  
  }

  findNodeByKey(node: TreeNode, key: string): TreeNode | null {
    // Check if the current node has the given key
    if (node.data.key === key) {
        return node;
    }
    if(node.children) {
  // Traverse children nodes recursively
      for (const child of node.children) {
        const foundNode = this.findNodeByKey(child, key);
        if (foundNode !== null) {
            return foundNode;
        }
      }

    }    
    // Key not found in this branch
    return null;
  }

  addRowToNode(node: any) {
    const key = node.data.key;
    const len = node.children.length;
    const newNode : TreeNode = {
      data: {
        key: key+'.'+String(len+1)
      },
      children: [],
      expanded: true
    }
    node.children.push(newNode);
  }

  addNewNode(datatree: any[]) {
    const len = datatree.length;
    const newNode : TreeNode = {
      data: {
        key: String(len+1)
      },
      children: []
    }
    datatree.push(newNode);
    this._datatreeSubject.next(datatree);
  }

 
}