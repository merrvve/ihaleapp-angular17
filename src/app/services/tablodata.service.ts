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
  public ornekData: string[][] = [
    ['Key', 'İş Tanımı', 'Marka', 'Birim', 'Miktar','Toplam'],
    ['1', 'Başlık', '', '','',''],
    ['1.1', 'x işi', 'Markası', 'metre','20000',''],
    ['1.2', '', '', '','',''],
    ['1.2.1', '', '', '','','']
  ];


  constructor() { }

  columns(ornekData: string[][]) {
    let cols : Column[] =[]
    let len = ornekData[0].length;
    for(let i=0; i<len; i++) {
      let editable = i ===0 ? false : true;
      let nf = i===len-1 ? true : false;
      cols.push({
        field: ornekData[0][i],
        header: ornekData[0][i],
        editable: editable,
        numberField: nf
      })
    }
    return cols;
  }

  convertToTreeTable(data: string[][], columns:string[]): any[] {
    if (data.length < 2) {
        throw new Error('Input data should have at least two lists: column names and row data.');
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
        }
    }

    return result;
}


addColumnToTree(dataTree: any[], columnName: string): void {
  // Iterate through each node in the dataTree
  const traverseTree = (node: any) => {
      // Add the new column with empty values to the node
      node.data[columnName] = '';

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

  addRowBelow(dataTree: any[], rowIndex: number): void {
    // Generate a unique key for the new row
    const generateKey = () => {
        let maxKey = 0;
        const traverseTree = (node: any) => {
            const key = parseInt(node.data.key.split('.')[0]);
            if (key > maxKey) {
                maxKey = key;
            }
            for (const child of node.children) {
                traverseTree(child);
            }
        };
        for (const rootNode of dataTree) {
            traverseTree(rootNode);
        }
        return (maxKey + 1).toString();
    };

    // Function to update key values recursively
    const updateKeys = (node: any, parentKey: string) => {
        const oldKey = node.data.key;
        const newKey = parentKey ? `${parentKey}.${generateKey()}` : generateKey();
        node.data.key = newKey;

        // Recursively update key values for children
        for (const child of node.children) {
            updateKeys(child, newKey);
        }
    };

    // Find the node at the specified rowIndex
    let count = 0;
    let targetNode : TreeNode = {
      data: {
        key: ''
      },
      children: []
    } ;
    const findNodeAtIndex = (node: any) => {
        if (count === rowIndex) {
            targetNode = node;
            return;
        }
        count++;
        for (const child of node.children) {
            findNodeAtIndex(child);
        }
    };
    for (const rootNode of dataTree) {
        findNodeAtIndex(rootNode);
    }

    if (!targetNode) {
        throw new Error('Row index out of bounds.');
    }

    // Create a new row node
    const newRow: TreeNode = { data: { key: '' }, children: [] };
    updateKeys(newRow, targetNode.data.key);

    // Insert the new row node below the target node
    const index = dataTree.indexOf(targetNode);
    dataTree.splice(index + 1, 0, newRow);
  }

}
