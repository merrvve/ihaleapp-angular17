import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MenuItem, Message, MessageService, TreeNode } from 'primeng/api';
import { TablodataService } from '../../services/tablodata.service';
import { Column } from '../../models/column.interface';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TreeTableModule } from 'primeng/treetable';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { SplitButtonModule } from 'primeng/splitbutton';
import { Subscription } from 'rxjs';
import { XlsxService } from '../../services/xlsx.service';
import { TenderService } from '../../services/tender.service';
import { MenubarModule } from 'primeng/menubar';
import { ExcludeColsPipe } from '../../utils/exclude-cols.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MenuModule,
    ToolbarModule,
    MultiSelectModule,
    FormsModule,
    TreeTableModule,
    InputNumberModule,
    ToastModule,
    DropdownModule,
    ContextMenuModule,
    NgClass,
    InputTextModule,
    DialogModule,
    RouterLink,
    ButtonModule,
    SplitButtonModule,
    MenubarModule,
    ExcludeColsPipe
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {

  @Input() currency!:string;
  

  files!: TreeNode[]; // tüm tablo
  cols!: Column[]; // tüm sütun nesneleri

  keepOriginal: boolean = true;
  selectedColumns!: Column[]; // görüntülenecek sütunlar
  selectionKeys: any = {};
  selectedNode!: TreeNode; // sağ tuşla seçilen node
  selectedNodes: TreeNode[] = []; // sağ tuşla seçilen node


  rowContextItems!: MenuItem[]; //Tablo üzerinde sağ tuşla gelen menü
  tableMenuItems!: MenuItem[]; //Dosya İşlemleri Menüsü

  messages: Message[] = []; // bilgilendirme mesajı

  subscription!: Subscription;
  visible: boolean = false;
  visibleExcelDialog: boolean = false;
  visibleRowDialog: boolean = false;
  visibleBirimDialog: boolean = false;
  visibleDeleteColDialog: boolean = false;
  visibleAnaBaslikDialog: boolean = false;
  delCols: Column[] = [];
  subscription2!: Subscription;
  selectedFile!: File;
  rowNum: number = 1;
  allKeys: string[] = [];
  selectedKey: string = '';
  allTreeTotal!: number; 

  currentWidth: number =100;
  tableStyle = {'width': this.currentWidth+'%', 'padding':'5rem'}




  showDialog() {
    this.visible = true;
  }

  constructor(
    private dataService: TablodataService,
    private excelService: XlsxService,
    private messageService: MessageService,
    private tenderService: TenderService
  ) {}

  ngOnInit(): void {
    // verileri yükle
    this.subscription = this.dataService.cols$.subscribe({
      next: (v) => {(this.cols = v);
        this.selectedColumns = this.cols;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
   
    this.subscription2 = this.dataService.datatree$.subscribe({
      next: (v) => {(
        this.files = v); 
        //this.updateChildCalculations(this.files);
        this.updateAllTreeTotal();
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
    // menüleri oluştur
    this.tableMenuItems = [
      {
          label: 'Dosya',
          icon: 'pi pi-file',
          items: [
            {
              label: 'Excel Dosyası Yükle',
              icon: 'pi pi-file-import',
              command: () => this.visibleExcelDialog=true,
            },
            {
              label: 'Excel Olarak Kaydet',
              icon: 'pi pi-file-export',
              command: () => this.exportAsExcel(),
            },
            {
              label: 'Taslaklarıma Kaydet',
              icon: 'pi pi-calculator',
              command: () => (this.saveDraft()),
            }
          ]
      },
      {
        label: 'Sütun Ekle',
        icon: 'pi pi-plus',
        items: [
          {
            label: 'Malzeme Birim Fiyat',
            icon: 'pi pi-shopping-bag',
            command: () => this.addBirimCol('Malzeme'),
          },
          {
            label: 'İşçilik Birim Fiyat',
            icon: 'pi pi-id-card',
            command: () => this.addBirimCol('İşçilik'),
          },
          {
            label: 'Diğer Birim Fiyat',
            icon: 'pi pi-calculator',
            command: () => (this.visibleBirimDialog = true),
          },
          {
            label: 'Diğer Sütun',
            icon: 'pi pi-server',
            command: () => this.showDialog(),
          },
        ]
      },
      {
        label: 'Sütun Sil',
        icon: 'pi pi-trash',
        command: () => {
          this.visibleDeleteColDialog=true
         }
      },
      {
        label: 'Ana Başlık Ekle',
        icon: 'pi pi-plus',
        command: () => {
          this.visibleAnaBaslikDialog=true;
         }
        },
      {
          label: 'Satır Ekle',
          icon: 'pi pi-plus',
          command: () => {
            this.getAllKeys(); 
            this.visibleRowDialog=true;
           }
      },
      {
          separator: true
      },
      {
        label: 'Seçilen Satırları Sil',
        icon: 'pi pi-trash',
        command: () => {
          this.deleteSelectedRows();
         }
    },
  ];
    this.rowContextItems = [
      {
        label: 'Başlık Olarak İşaretle',
        icon: 'pi pi-file-edit',
        command: (event) => this.addRowToNode(this.selectedNode, false),
      },
      {
        label: 'Alta Satır Ekle',
        icon: 'pi pi-plus',
        command: (event) => this.addRowToNode(this.selectedNode, true),
      },
      {
        label: 'Satırı yukarı taşı',
        icon: 'pi pi-arrow-up',
        command: (event) => this.moveRowUp(this.selectedNode),
      },
      {
        label: 'Satırı aşağı taşı',
        icon: 'pi pi-arrow-down',
        command: (event) => this.moveRowDown(this.selectedNode),
      },
      {
        label: 'Satırı Sil',
        icon: 'pi pi-eraser',
        command: (event) => this.deleteNode(this.selectedNode),
      },
      {
        label: 'Seçili Satırları Sil',
        icon: 'pi pi-trash',
        command: (event) => this.deleteSelectedRows(),
      },
       {
         label: 'Seçili Satırları Kopyala',
         icon: 'pi pi-copy',
         command: (event) => this.cutSelectedRows(true),
       },
      {
        label: 'Seçili Satırları Kes',
        icon: 'pi pi-copy',
        command: (event) => this.cutSelectedRows(false),
      },
      {
        label: 'Bu Satırın Altına Yapıştır',
        icon: 'pi pi-clone',
        command: (event) => this.pasteSelectedRows(this.selectedNode,true),
      },
      {
        label: 'Bu Başlığa Yapıştır',
        icon: 'pi pi-clone',
        command: (event) => this.pasteSelectedRows(this.selectedNode,false),
      },
    ];
    
  }

  addRowToNode(node: TreeNode, positionSpecified: boolean) {
    this.dataService.addRowToNode(node, positionSpecified);
    this.updateView();
    this.currentWidth =this.currentWidth *1.05;
    this.tableStyle.width= (this.currentWidth *1.05) +'%';
    this.expandAllNodes(this.files);
  }

  addNewNode(count:number=1) {
    let i=0
    while (i<count) {
      this.dataService.addNewNode(this.files);
      i+=1;
    }
    this.updateView();
    this.expandAllNodes(this.files);
  }

  showInfo() {
    this.messageService.add({
      severity: 'info',
      summary: 'Bilgi',
      detail:
        'Tablo üzerinde değişiklik yapmak için sağ tuşa tıklayarak açılan menüyü kullanabilirsiniz.',
    });
  }
  deleteNode(selectedNode: TreeNode<any>): void {
    
    //Satırı sil ve poz noları güncelle
    const result = this.dataService.deleteRow(selectedNode, this.files);
    if (result) {
      //Toplamı güncelle
      this.updateRowTotal(selectedNode);
      this.updateAllTreeTotal();
      this.updateView();
      return;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Satır Silinemedi',
        detail:
          'Tabloda başka ana başlık olmadığından seçtiğiniz ana başlık silinemedi.',
      });
      return;
    }
  }

  deleteCol(columns: Column[]) {
    for (let i = 0; i < columns.length; i++) {
      const index = this.cols.indexOf(columns[i]);
      if (i > -1) {
        
        this.cols.splice(index, 1);
        const related = columns[i].relatedField;
        if(related && related!=='') {
          const relatedIndex = this.cols.findIndex(x=>x.field==related);
          this.cols.splice(relatedIndex, 1);
        }
        this.currentWidth =this.currentWidth*0.9;
        this.tableStyle.width = this.currentWidth*0.9 +'%';
        this.messageService.add({
          severity: 'success',
          summary: 'Sütunlar Silindi',
          detail:
            'Seçtiğiniz sütun "' +
            this.cols[index].header +
            '" başarıyla silindi.',
        });
      }
    }

    this.delCols = [];
  }
  addOtherCol(name: string) {
    if (this.cols.find((x) => x.header == name)) {
      console.log('exist');
      this.messageService.add({
        severity: 'error',
        summary: 'Sütun Mevcut',
        detail:
          'Eklemek İstediğiniz sütunla aynı isimde bir sütun zaten olduğu için ekleme yapılmadı.',
      });
      return;
    }

    //Sütunları Güncelle

    this.dataService.addOtherCol(name, this.cols);

    this.visible = false;

    //Satırları Güncelle
    this.dataService.addColumnToTree(this.files, name, '');
    this.currentWidth = this.currentWidth * 1.1;
    this.tableStyle={'width':this.currentWidth+'%', 'padding':'5rem'}
  }

  addBirimCol(name: string = 'Diğer') {
    if (this.cols.find((x) => x.header == name + ' Birim Fiyat')) {
      console.log('exist');
      this.messageService.add({
        severity: 'error',
        summary: 'Sütun Mevcut',
        detail:
          'Eklemek İstediğiniz sütunla aynı isimde bir sütun zaten olduğu için ekleme yapılmadı.',
      });
      return;
    }

    this.dataService.addBirimCol(name, this.cols);
    let birimName = name + ' Birim Fiyat';
    let toplamName = name + ' Toplam Fiyat';

    this.dataService.addColumnToTree(this.files, birimName, null);

    this.dataService.addColumnToTree(this.files, toplamName, null);
    this.currentWidth = this.currentWidth * 1.15;
    this.tableStyle={'width':this.currentWidth+'%', 'padding':'5rem'}
  }

  expandAllNodes(nodes: TreeNode[]) {
    nodes.forEach((node) => {
      node.expanded = true;
      if (node.children) {
        this.expandAllNodes(node.children);
      }
    });
  }

  onCellEdit(event: any, rowData: any, field: string, rowNode: any) {
    if(event===undefined) {
      return;
    }
    
    if(rowNode.node?.children.length>0) {
      console.log("başlık")
      if(field!=="İş Tanımı") {
        rowData[field]=undefined;
      }
      
      return;
    }
    let col = this.cols.find((x) => x.field == field);
    const isMiktar: boolean = field.toLowerCase() == 'miktar';
    
    
    rowData[field] = event;

    if (col) {
      const updateTotal = ()=> {
        // Bu satırdaki toplamı hesapla
        let toplamCols = this.cols.filter((x) => (x.isToplam === true)&& (x.isBirimToplam=== false) && (x.field!=='Toplam Fiyat'));
        let toplam = 0;
        if (toplamCols) {
          for (let i = 0; i < toplamCols.length; i++) {
            const name = toplamCols[i].field;
            if(rowData[name]!==null && rowData[name]!==undefined)
            toplam += Number(rowData[name]);
          }
          if(toplam!==undefined && toplam!==null) {
            rowData["Toplam Fiyat"] = toplam;
          }
          // Ana toplamı güncelle
          const updateAllTotal = (rowNode:any)=> {
            if (rowNode.parent?.children) {
              let allToplam = 0;
              for (const child of rowNode.parent.children) {
                if(child.data["Toplam Fiyat"]!==null && child.data["Toplam Fiyat"]!==undefined) {
                  allToplam += child.data["Toplam Fiyat"];
                }
              }
              rowNode.parent.data["Toplam Fiyat"] = allToplam;
              console.log(rowNode.parent)
              if(rowNode.parent?.parent){
                updateAllTotal(rowNode.parent);
              }
            }
          }
          updateAllTotal(rowNode);
          this.updateAllTreeTotal();
        }
      }
      if (isMiktar) {
        const birimCols = this.cols.filter((x) => x.isBirim == true);
        let birimToplam = 0;
        if (birimCols) {
          for (let i = 0; i < birimCols.length; i++) {
            const rf = birimCols[i].relatedField;
            if (rf!==undefined && rf!==null && rowData[birimCols[i].field]!==undefined && rowData[birimCols[i].field]!==null && event!==undefined && event!==null) {
              rowData[rf] =
                Number(rowData[birimCols[i].field]) * Number(event);
            }
            const name = birimCols[i].field;
            if(rowData[name]!==undefined && rowData[name]!==null) {
              birimToplam += +(rowData[name]);
            
            }
            
          }
          if(birimToplam!==undefined && birimToplam!==null) {
            rowData['Toplam Birim Fiyat'] = birimToplam;
          }
          updateTotal();
        }
      }
      else {
        if (col.relatedField!==undefined && rowData['Miktar']!==null) {
          rowData[col.relatedField] = Number(event) * Number(rowData['Miktar']);
          const birimCols = this.cols.filter((x) => x.isBirim == true);
          let birimToplam = 0;
          if (birimCols) {
            for (let i = 0; i < birimCols.length; i++) {
              const name = birimCols[i].field;
              if(rowData[name]!==null && rowData[name]!==undefined) {
                birimToplam += +(rowData[name]);
              }
              
            }
            if(birimToplam!==undefined && birimToplam!==null) {
              rowData['Toplam Birim Fiyat'] = birimToplam;
            }
            updateTotal();
          }
        } 
        
        
        
        
        
        
        
      }
    }
  }

  exportAsExcel() {
    console.log(this.files, this.cols);
    let datalist = this.dataService.convertTreeToDatalist(
      this.files,
      this.cols,
    );
    console.log(datalist);
    this.excelService.exportAsExcelFile(datalist, 'deneme.xlsx');
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  importExcel() {   
    this.excelService.importExcelFile(this.selectedFile).then((data) => {
      console.log(data)
      this.dataService.loadData(data);
      this.selectedColumns = this.cols;
    });
  }

  saveDraft() {
    const tabloData = this.dataService.convertTreeToDatalist(
      this.files,
      this.cols,
    );
    this.dataService.currentData = tabloData;
    this.tenderService.createTender(true);
  }

  updateView() {
    this.files = [...this.files];
  }

  ngOnDestroy(): void {
    const tabloData = this.dataService.convertTreeToDatalist(
      this.files,
      this.cols,
    );
    this.dataService.currentData = tabloData;
    this.subscription.unsubscribe(); 
    this.subscription2.unsubscribe();
  }

  onCheck(key: string, node: TreeNode, rowData: any) {
    console.log(key, node, rowData, this.selectedNodes);
  }

  deleteSelectedRows() {
    for (const node of this.selectedNodes) {
      this.deleteNode(node);
    }
    this.selectedNodes = [];
  }

  addMultipleRows(key: string) {
    let foundNode : any;
    for (const node of this.files) {
      foundNode = this.dataService.findNodeByKey(node,key)
      if(foundNode) {
        break;
      }
    }
    console.log(foundNode,this.rowNum)
    if(foundNode) {
      
      for (let i = 0; i < this.rowNum; i++) {
        this.dataService.addRowToNode(foundNode);
      }
      this.updateView();
    }
    
  }

  pasteSelectedRows(targetNode: TreeNode, positionSpecified=false) {
    //if selected node has children, copy all
    for (const node of this.selectedNodes) {
      if((node.children && node.children.length>0) || !node.parent) {
          this.dataService.pasteNodeToNode(targetNode,node,positionSpecified);
      }
      else {
        if(node.parent && node.parent.partialSelected) {
          this.dataService.pasteNodeToNode(targetNode,node,positionSpecified);
        }
      }
      this.updateRowTotal(node);
    }
    //else the selected node has no children
      //if the parentnode is partially selected, take action
      //else ignore this node
    
     if (!this.keepOriginal) {
       this.deleteSelectedRows();
     }
    
    
    this.updateNodeTotal(targetNode);
    
    this.updateAllTreeTotal();
    this.updateView();
  }

  moveRowUp(node: TreeNode) {
    this.dataService.moveRowUp(node);
    this.updateView();
  }

  moveRowDown(node: TreeNode) {
    this.dataService.moveRowDown(node);
    this.updateView();
  }

  cutSelectedRows(keep: boolean) {
    this.keepOriginal = keep;
  }

  getAllKeys() {
    this.allKeys = this.dataService.getAllKeys(this.files)
  }

  updateChildCalculations(nodes: any[]) {
    for (const node of nodes) {
      if(node.children && node.children.length>0) {
        this.updateChildCalculations(node.children);
      }
      else {
        this.updateRowTotal(node);
        console.log(node, "updated")
        if(node.parent) {
          this.updateNodeTotal(node.parent);
        }
        
      }
    }
  }

  updateAllTreeTotal() {
    let total = 0;
    for(const node of this.files) {
      if(node.data["Toplam Fiyat"]) {
        total += +(node.data["Toplam Fiyat"]);
      }
  }
  this.allTreeTotal = total;
  this.dataService.allTreeTotal=total;

  }

  updateRowTotal (selectedNode:any) {
    if (selectedNode.parent) {
      if (selectedNode.parent.children) {
        let allToplam = 0;
        for (const child of selectedNode.parent.children) {
          if(child.data["Toplam Fiyat"]!==null && child.data["Toplam Fiyat"]!==undefined) {
            allToplam += child.data["Toplam Fiyat"];
          }
          
        }
        if(allToplam){
          selectedNode.parent.data["Toplam Fiyat"] = allToplam;
        }
        
      }
    }
  }

  updateNodeTotal(node: any) {
    let total =0;
    if(node.children?.length>0) {
      for (const child of node.children) {
        if(child.data["Toplam Fiyat"]!==null && child.data["Toplam Fiyat"]!==undefined) {
          total += +(child.data["Toplam Fiyat"]);
        }
       
      }
    }
    node.data["Toplam Fiyat"] = total;

    if(node.parent) {
      this.updateNodeTotal(node.parent);
    }
  }
  
}
