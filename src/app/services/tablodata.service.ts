import { Injectable } from '@angular/core';
import { Column } from '../models/column.interface';
import { TreeNode } from 'primeng/api';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TablodataService {
  public ornekData: any[][] = [
    [
      'Poz No',
      'İş Tanımı',
      'Marka',
      'Miktar',
      'Birim',
      'Malzeme Birim Fiyat',
      'İşçilik Birim Fiyat',
      'Toplam Birim Fiyat',
      'Malzeme Toplam Fiyat',
      'İşçilik Toplam Fiyat',
      'Toplam Fiyat',
    ],
    ['1', 'Başlık', '', '', '', '', ''],
    ['1.1', '', '', '', '', '', ''],
  ];

  public allTreeTotal!: number;
  public currentData: any[][] = [];

  birimCols = 0;
  private _datatreeSubject = new BehaviorSubject<any[]>(
    this.convertToTreeTable(this.ornekData),
  );
  datatree$ = this._datatreeSubject.asObservable();

  private _colsSubject = new BehaviorSubject<Column[]>(
    this.columns(this.ornekData),
  );
  cols$ = this._colsSubject.asObservable();

  constructor() {
    this.loadData(this.ornekData);
    this.allTreeTotal=0;
  }

  loadData(datalist: any[]) {
    this._colsSubject.next(this.columns(datalist));
    this._datatreeSubject.next(this.convertToTreeTable(datalist));
  }

  loadDataByColandDataTree(cols:Column[], datatree: TreeNode[]) {
    this._colsSubject.next(cols);
    this._datatreeSubject.next(datatree);
  }

  getDataTree() {
    return this._datatreeSubject.value;
  }

  getCols() {
    return this._colsSubject.value;
  }

  columns(ornekData: any[][]) {
    let cols: Column[] = [];
    const columnNames = ornekData[0];
    let len = columnNames.length;
    for (let i = 0; i < len; i++) {
      let editable = i === 0 ? false : true;
      let nf = false;
      let isToplam = columnNames[i].toLocaleLowerCase().includes('toplam');
      let isBirimToplam = columnNames[i].toLocaleLowerCase().includes('birim') && isToplam;
      let isBirim = columnNames[i].toLocaleLowerCase().includes('birim fiyat') && !isToplam;
      let relatedField=undefined;
      if (isBirim) {
        relatedField = columnNames[i].slice(0,-11) + "Toplam Fiyat";
        if(!columnNames.includes(relatedField)) {
          columnNames.push(relatedField);
        }
      }
      if (columnNames[i].toLocaleLowerCase().includes('miktar') || isToplam || isBirim) {
        nf = true;
      }
      editable = isToplam ? false : editable;
      

      cols.push({
        field: i===0 ? 'key' : columnNames[i],
        header: i===0 ? 'Poz No' : columnNames[i],
        editable: editable,
        numberField: nf,
        isBirim: isBirim,
        relatedField: relatedField,
        isBirimToplam: isBirimToplam,
        isToplam: isToplam,
      });
    }
    return cols;
    
  }

  convertToTreeTable(data: string[][], cols?: string[]): TreeNode[] {
    if (data.length < 2) {
      throw new Error(
        'Input data should have at least two lists: column names and row data.',
      );
    }
    let columns = [];

    if (cols) {
      columns = cols;
    } else {
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
      const key = String(row[0]);
      const parentNodeKey = key.includes('.')
        ? key.substring(0, key.lastIndexOf('.'))
        : null;
      const node = createNode(key, parentNodeKey);

      // Assign data to the node
      for (let j = 1; j < columns.length; j++) {
        node.data[columns[j]] = row[j];
        node.expanded = true;
      }
    }

    return result;
  }

  deleteRow(node: any, datatree: any[]) {
    // Ara başlık ya da satır sil
    if (node.parent?.children) {
      let foundIndex = node.parent.children.indexOf(node);
      node.parent.children.splice(foundIndex, 1);

      for (let i = foundIndex; i < node.parent.children.length; i++) {
        node.parent.children[i].data.key = node.parent.data.key + '.' + (i + 1);
      }
      return true;
    }

    //Parentı olmayan ana başlık sil
    else {
      let foundIndexTitle = datatree.indexOf(node);
      const len = datatree.length;
      if (len == 1) {
        return false; // tek bir ana başlık varsa silme false dön
      } else {
        datatree.splice(foundIndexTitle, 1);
        for (let i = foundIndexTitle; i < len - 1; i++) {
          datatree[i].data.key = i + 1;
          if (datatree[i].children.length > 0) {
            for (let j = 0; j < datatree[i].children.length; j++) {
              datatree[i].children[j].data.key =
                datatree[i].data.key + '.' + (j + 1);
            }
          }
        }
        return true;
      }
    }
  }

  convertTreeToDatalist(datatree: any[], cols: Column[]) {
    let datalist = [];
    let colNames = [];
    for (const col of cols) {
      colNames.push(col.field);
    }
    datalist.push(colNames);
    const addRowsToDataList = (node: any) => {
      let row = [];
      for (const value of colNames) {
        if (node.data[value]) {
          row.push(node.data[value]);
        } else {
          row.push('');
        }
      }
      datalist.push(row);
      if (node.children.length > 0) {
        for( const child of node.children) {
        addRowsToDataList(child)
      }
      }
    };
    for (let i = 0; i < datatree.length; i++) {
      addRowsToDataList(datatree[i]);

    }
    return datalist;
  }

  deleteCol(columns: Column[], delcols: Column[]) {
    for (let i = 0; i < delcols.length; i++) {
      const index = columns.indexOf(delcols[i]);
      if (i > -1) {
        columns.splice(index, 1);
      }
    }
    this._colsSubject.next(columns);
  }

  addOtherCol(name: string, columns: Column[]) {
    //Sütunları Güncelle
    columns.splice(2, 0, {
      field: name,
      header: name,
      editable: true,
      numberField: false,
      isBirim: false,
      isToplam: false,
      isBirimToplam: false
    });
    this._colsSubject.next(columns);
  }

  addBirimCol(name: string = 'Diğer', columns: Column[]) {
    const position = columns.length - 2 - this.birimCols;
    let birimName = name + ' Birim Fiyat';
    let toplamName = name + ' Toplam Fiyat';
    columns.splice(position, 0, {
      field: birimName,
      header: birimName,
      editable: true,
      numberField: true,
      relatedField: toplamName,
      isBirim: true,
      isToplam: false,
      isBirimToplam: false
    });

    columns.splice(columns.length - 1, 0, {
      field: toplamName,
      header: toplamName,
      editable: false,
      numberField: true,
      isBirim: false,
      isToplam: true,
      isBirimToplam: false
    });

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
      console.log(node,"found");
      return node;
    }
    else if (node.children) {
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

  addRowToNode(node: any, positionSpecified: boolean = false) {
    
    if (!positionSpecified) {
      const key = node.data.key;

      const len = node.children.length;
      const newKey =  key + '.' + String(len + 1);
      let newNode: TreeNode = {
        data: {
          
        },
        children: [],
        expanded: true,
      };
      for(const column of this.getCols()) {
        newNode.data[column.header]=''
      }
      newNode.data.key=newKey;
      node.children.push(newNode);
      
      return;
    } else {
      const key = node.parent.data.key;
      
      const position = node.parent.children.indexOf(node);
      const newKey = key + '.' + (position + 2);
      const newNode: TreeNode = {
        data: {
          
        },
        children: [],
        expanded: true,
      };
      for(const column of this.getCols()) {
        newNode.data[column.header]=''
      }
      newNode.data.key=newKey;
      node.parent.children.splice(position + 1, 0, newNode);

      for (let i = position + 2; i < node.parent.children.length; i++) {
        node.parent.children[i].data.key = node.parent.data.key + '.' + (i + 1);
      }

      return;
    }
  }
  pasteNodeToNode (targetNode: any, copiedNode: TreeNode) {
  
    
    targetNode.children.push(structuredClone(copiedNode));
    //update keys
    this.updateKeys(targetNode);
  }

  updateKeys(node: TreeNode) {
    //recursively update keys of a given node.
    const key = node.data.key;
    if(node.children) {
      let i = 0;
      for(const child of node.children) {
        child.data.key= key + '.' + (i + 1)
        if(child.children && child.children.length>0) {
          this.updateKeys(child);
        }
        i+=1;
      }
    }
  }
  pasteRowsToNode(targetNode: any, nodes: TreeNode[]) {
    const key = targetNode.data.key;
    let len = targetNode.children.length;
    for (const node of nodes) {
      // add the node with its children
      // const { key: _, ...dataWithoutKey } = node.data;
      // dataWithoutKey.key = key + '.' + (len + 1);
      // const newNode: TreeNode = {
      //   data: { ...dataWithoutKey },
      //   children: [],
      //   expanded: true,
      // };

      targetNode.children.push(node);
      // update keys
      len += 1;
    }
  }

  addNewNode(datatree: any[]) {
    const len = datatree.length;
    const newNode: TreeNode = {
      data: {
        key: String(len + 1),
      },
      children: [],
    };
    datatree.push(newNode);
    this._datatreeSubject.next(datatree);
  }

  moveRowUp(node: any) {
    if (node.parent) {
      const index = node.parent.children.indexOf(node);
      if (index > 0) {
        node.parent.children.splice(index, 1);
        node.parent.children.splice(index - 1, 0, node);
        node.data.key = node.parent.data.key + '.' + index;
        node.parent.children[index].data.key =
          node.parent.data.key + '.' + (index + 1);
      }
    }
  }

  moveRowDown(node: any) {
    if (node.parent) {
      const index = node.parent.children.indexOf(node);
      if (index > -1 && index + 1 < node.parent.children.length) {
        node.parent.children.splice(index, 1);
        node.parent.children.splice(index + 1, 0, node);
        node.data.key = node.parent.data.key + '.' + (index + 2);
        node.parent.children[index].data.key =
          node.parent.data.key + '.' + (index + 1);
      }
    }
  }

  getAllKeys(files: any) {
    let keys : string[] = [];
    
    for ( const node of files ) {
      keys.push(node.data.key)
      if(node.children?.length>0) {
        for (const child of node.children) {
          keys = keys.concat(this.getAllKeys(node.children));
        } 
      }
    }
    return keys;
  }

  
}
