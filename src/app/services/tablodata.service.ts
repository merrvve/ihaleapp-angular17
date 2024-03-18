import { Injectable } from '@angular/core';
import { Column } from '../models/column.interface';

interface TreeNode {
  data: {
      key: string;
  };
  children: TreeNode[];
}




@Injectable({
  providedIn: 'root'
})
export class TablodataService {
  public ornekData: any[][] = [
    ['key', 'İş Tanımı', 'Marka', 'Birim', 'Miktar','Toplam'],
    ['1', 'Başlık', '', '','',''],
    ['1.1', 'x işi', 'Markası', 'metre',20,''],
    ['1.2', '', '', '','',''],
    ['1.2.1', '', '', '','','']
  ];


  constructor() { }

  columns(ornekData: any[][]) {
    let cols : Column[] =[]
    let len = ornekData[0].length;
    for(let i=0; i<len; i++) {
      let editable = i ===0 ? false : true;
      let nf=false;
      if(ornekData[0][i].toLocaleLowerCase().includes('miktar') || ornekData[0][i].toLocaleLowerCase().includes('toplam')) {
          nf=true;
      }
      cols.push({
        field: ornekData[0][i],
        header: ornekData[0][i],
        editable: editable,
        numberField: nf,
        isBirim: false,
        isToplam: false
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
    const result: any[] = [];

    // Create a map to store nodes by their keys for easy access
    const nodesMap: { [key: string]: any } = {};

    // Function to create a new node if it doesn't exist
    const createNode = (key: string, parentKey: string | null = null) => {
      if (!nodesMap[key]) {
          const newNode: any = { data: { key }, children: [] };
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
  }

  findNodeByKey(node: TreeNode, key: string): TreeNode | null {
    // Check if the current node has the given key
    if (node.data.key === key) {
        return node;
    }

    // Traverse children nodes recursively
    for (const child of node.children) {
        const foundNode = this.findNodeByKey(child, key);
        if (foundNode !== null) {
            return foundNode;
        }
    }

    // Key not found in this branch
    return null;
}

 addRowBelow(dataTree: any[], rowKey: string, parentKey: string): void {
  
  
  let parentNode: TreeNode |null = {
    data: {
      key: ''
    },
    children: []
  }
  
  for (const nodes of dataTree) {
    parentNode=this.findNodeByKey(nodes,parentKey)
  }

  if(parentNode) {
    const newNode: TreeNode = { data: { key:rowKey }, children: [] };
    parentNode.children.push(newNode);  
  }
 

}



}
