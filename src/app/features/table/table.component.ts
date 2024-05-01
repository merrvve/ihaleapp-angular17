import { Component, OnInit } from '@angular/core';
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

import { Subscription } from 'rxjs';
import { XlsxService } from '../../services/xlsx.service';
import { IhaleService } from '../../services/ihale.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MenuModule,
    ToolbarModule,
    MultiSelectModule,
    FormsModule,
    ButtonModule,
    TreeTableModule,
    InputNumberModule,
    ToastModule,
    DropdownModule,
    ContextMenuModule,
    NgClass,
    InputTextModule,
    DialogModule,
    RouterLink,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  files!: TreeNode[]; // tüm tablo
  cols!: Column[]; // tüm sütun nesneleri

  keepOriginal: boolean = true;
  selectedColumns!: Column[]; // görüntülenecek sütunlar
  selectionKeys: any = {};
  selectedNode!: TreeNode; // sağ tuşla seçilen node
  selectedNodes: TreeNode[] = []; // sağ tuşla seçilen node

  rowContextItems!: MenuItem[]; //Tablo üzerinde sağ tuşla gelen menü
  addColItems!: MenuItem[]; //Sütun Ekle Menüsü

  messages: Message[] = []; // bilgilendirme mesajı

  subscription!: Subscription;
  visible: boolean = false;
  visibleExcelDialog: boolean = false;
  visibleRowDialog: boolean = false;
  visibleBirimDialog: boolean = false;
  visibleDeleteColDialog: boolean = false;
  delCols: Column[] = [];
  subscription2!: Subscription;
  selectedFile!: File;
  rowNum: number = 1;
  allKeys: string[] = [];
  selectedKey: string = '';

  showDialog() {
    this.visible = true;
  }

  constructor(
    private dataService: TablodataService,
    private excelService: XlsxService,
    private messageService: MessageService,
    private ihaleService: IhaleService,
  ) {}

  ngOnInit(): void {
    // verileri yükle
    this.subscription = this.dataService.cols$.subscribe({
      next: (v) => (this.cols = v),
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
    this.selectedColumns = this.cols;
    this.subscription2 = this.dataService.datatree$.subscribe({
      next: (v) => (this.files = v),
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
    // menüleri oluştur

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
        label: 'Seçili Satırları Koopyala',
        icon: 'pi pi-copy',
        command: (event) => this.cutSelectedRows(true),
      },
      {
        label: 'Seçili Satırları Kes',
        icon: 'pi pi-copy',
        command: (event) => this.cutSelectedRows(false),
      },
      {
        label: 'Yapıştır',
        icon: 'pi pi-clone',
        command: (event) => this.pasteSelectedRows(this.selectedNode),
      },
    ];

    this.addColItems = [
      {
        label: 'Malzeme Birim Fiyat',
        icon: 'pi pi-shopping-bag',
        command: (event) => this.addBirimCol('Malzeme'),
      },
      {
        label: 'İşçilik Birim Fiyat',
        icon: 'pi pi-id-card',
        command: (event) => this.addBirimCol('İşçilik'),
      },
      {
        label: 'Diğer Birim Fiyat',
        icon: 'pi pi-calculator',
        command: (event) => (this.visibleBirimDialog = true),
      },
      {
        label: 'Diğer Sütun',
        icon: 'pi pi-server',
        command: (event) => this.showDialog(),
      },
    ];
  }

  addRowToNode(node: TreeNode, positionSpecified: boolean) {
    this.dataService.addRowToNode(node, positionSpecified);
    this.updateView();
    this.expandAllNodes(this.files);
  }

  addNewNode() {
    this.dataService.addNewNode(this.files);
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
    if (selectedNode.children) {
      if (selectedNode.children.length > 0) {
        if (
          !window.confirm(
            'Seçtiğiniz başlığın tüm alt kırılımlarıyla birlikte silinmesini onaylıyor musunuz?',
          )
        ) {
          this.messageService.add({
            severity: 'error',
            summary: 'İptal',
            detail: 'Satır silinmesi işlemi kullanıcı tarafından iptal edildi.',
          });

          return;
        }
      }
    }
    //Satırı sil ve poz noları güncelle
    const result = this.dataService.deleteRow(selectedNode, this.files);
    if (result) {
      //Toplamı güncelle
      if (selectedNode.parent) {
        if (selectedNode.parent.children) {
          let allToplam = 0;
          for (const child of selectedNode.parent.children) {
            allToplam += child.data.Toplam;
          }
          selectedNode.parent.data.Toplam = allToplam;
        }
      }
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
        this.messageService.add({
          severity: 'success',
          summary: 'Sütunlar Silindi',
          detail:
            'Seçtiğiniz sütun "' +
            this.cols[index].header +
            '" başarıyla silindi.',
        });
        this.cols.splice(index, 1);
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
    let col = this.cols.find((x) => x.field == field);
    const isMiktar: boolean = field.toLowerCase() == 'miktar';
    if(rowNode.children) {
      if(rowNode.children.length>0) {
        return;
      }  
    }
    
    rowData[field] = event;

    if (col) {
      if (col.relatedField || isMiktar) {
        if (col.relatedField) {
          rowData[col.relatedField] = Number(event) * Number(rowData['Miktar']);
          const birimCols = this.cols.filter((x) => x.isBirim == true);
          let birimToplam = 0;
          if (birimCols) {
            for (let i = 0; i < birimCols.length; i++) {
              // birimToplam+= Number(rowData[birimCols[i].field])
              const name = birimCols[i].field;
              birimToplam += rowData[name];
            }
            rowData['Toplam Birim Fiyat'] = birimToplam;
          }
        } else if (isMiktar) {
          const birimCols = this.cols.filter((x) => x.isBirim == true);
          let birimToplam = 0;
          if (birimCols) {
            for (let i = 0; i < birimCols.length; i++) {
              // birimToplam+= Number(rowData[birimCols[i].field])
              const name = birimCols[i].field;
              birimToplam += rowData[name];
              const rf = birimCols[i].relatedField;
              if (rf) {
                rowData[rf] =
                  Number(rowData[birimCols[i].field]) * Number(event);
              }
            }
            rowData['Toplam Birim Fiyat'] = birimToplam;
          }
        }
        // Bu satırdaki toplamı hesapla
        const toplamCols = this.cols.filter((x) => x.isToplam == true);
        let toplam = 0;
        if (toplamCols) {
          for (let i = 0; i < toplamCols.length; i++) {
            const name = toplamCols[i].field;
            console.log(name, rowData, rowData[name]);
            toplam += Number(rowData[name]);
          }
          rowData['Toplam'] = toplam;

          if (rowNode.parent.children) {
            let allToplam = 0;
            for (const child of rowNode.parent.children) {
              if(child.data.Toplam) {
                allToplam += child.data.Toplam;
              }
            }
            rowNode.parent.data.Toplam = allToplam;
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
    let excelData;
    this.excelService.importExcelFile(this.selectedFile).then((data) => {
      (excelData = data), this.dataService.loadData(excelData);
    });
  }

  saveDraft() {}

  updateView() {
    this.files = [...this.files];
  }

  ngOnDestroy(): void {
    const tabloData = this.dataService.convertTreeToDatalist(
      this.files,
      this.cols,
    );
    this.ihaleService.tabloData = tabloData;
    this.subscription.unsubscribe(); // Unsubscribe to prevent memory leaks
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
    }
    if(foundNode) {
      for (let i = 0; i < this.rowNum; i++) {
        this.dataService.addRowToNode(foundNode);
      }
      this.updateView();
    }
    
  }

  pasteSelectedRows(node: TreeNode) {
    if (node.parent) {
      this.dataService.pasteRowsToNode(node.parent, this.selectedNodes);
    } else {
      this.dataService.pasteRowsToNode(node, this.selectedNodes);
    }
    if (!this.keepOriginal) {
      this.deleteSelectedRows();
    }
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

}
