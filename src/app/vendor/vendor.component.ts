
import { Component,ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EditEvent, GridComponent, GridDataResult, PageChangeEvent, RemoveEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, filterBy } from '@progress/kendo-data-query';
import { Vendor } from '../models/vendor.model';
import { VendorService } from '../services/vendor/vendor.service';
import { first } from 'rxjs/operators';
import { AlertboxModalComponent } from '../alertbox-modal/alertbox-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { ExcelExportComponent } from '@progress/kendo-angular-excel-export';

@Component({
  selector: 'app-vendor',
  // standalone: true,
  // imports: [],
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.scss'
})



export class VendorComponent implements OnInit {

  @ViewChild('excelExport', { static: false }) excelExport!: ExcelExportComponent;
  @ViewChild(GridComponent) grid!: GridComponent;

  get fa() { return this.VendorForm.controls; }

  VendorForm!: FormGroup;

  public pageSize = 20;
  public skip = 0;
  public vendorData: Vendor;
  public sort: SortDescriptor[] = [];
  public multiple = false;
  public allowUnsort = true;
  public currentItem: any;
  public vendorList!: Array<any>;
  submitted: boolean = false;
  btnlabel: string = "Save";
  error = "";
  public userName: any = ''
  public userId: any = ''
  public loading: boolean = false;

  selectedColumns: Array<any> = [
    'company',
    'contactName',
    'phone',
    'vendorType',
    'emailID',
    'requirement_Technologies',
    'vendorRelationshipWithClient',
    'website'
  ];
  // Define the title and width mappings
  columnTitles: { [key: string]: string } = {
    company: 'Company',
    contactName: 'ContactName',
    phone: 'Mobile #',
    vendorType: 'VendorType',
    emailID: 'EmailID',
    requirement_Technologies: 'Requirement/Technologies',
    vendorRelationshipWithClient: 'Vendor Relationship With Client',
  };


  public vendorTypelist: Array<{ text: string, value: number }> = [
    { text: 'Primary Vendor', value: 1 },
    { text: 'Sub Vendor', value: 2 },
  ];
  public defaultItem: { text: string, value: number } = { text: 'Select item...', value: 0 };

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private VendorService: VendorService,
    private router: Router,

  ) {
    this.vendorData = {} as Vendor;

    this.vendorData = new Vendor();
  }

  ngOnInit(): void {
    // this.userName=localStorage.getItem("name");
    this.userId = localStorage.getItem("userID");

    this.GetVendors()
  }

  navigate() {
    this.router.navigate(['vendor/addVendor']);  // Replace with your desired path
  }




  GetVendors() {
    this.loading = true
    this.VendorService.GetallVendors()
      .subscribe(
        vendorList => {
          this.vendorList = vendorList
          this.loading = false
        },
        error => (this.error = error),
        () => {
          // console.log("vendorList:", this.vendorList);

          //this.csvService.exportAsCSVFile(this.Class1EIPTags, filename);
          // this.spinner.hide();
        }
      )
  }
  editClick(dataItem: any) {
    this.router.navigate(['editVendor', dataItem.vendorID]);
  }

  // getVendorTypeObject(value: string): { text: string, value: number } | null {

  //   return this.vendorTypelist.find(item => item.text === value) || null;
  // }

  cancelClick() {
    this.vendorData = new Vendor();
    this.btnlabel = 'Save';

    // Reset the submitted flag
    this.submitted = false;

    this.VendorForm.reset({
      VendorType: { text: 'Select item...', value: 0 },
      Company: '',
      ContactName: '',
      Phone: '',
      EmailID: '',
      CreatedDate: new Date(),
      CreatedBy: this.userId,
      ModifiedBy: '',
      ModifiedDate: new Date(),
      Requirement_Technologies: '',
      VendorRelationshipWithClient: '',
      Website: ''
    });

    // Mark controls as pristine and untouched
    // Object.keys(this.VendorForm.controls).forEach(key => {
    //   const control = this.VendorForm.get(key);
    //   if (control) {
    //     control.markAsPristine();
    //     control.markAsUntouched();
    //   }
    // });
  }



  deleteClick(dataItem: any) {


    const dialogRef = this.dialog.open(AlertboxModalComponent);
    dialogRef.afterClosed().subscribe(result => {

      if (result.confirmed) {

        let id = dataItem.vendorID
        this.VendorService.DeleteVendors(id)
          .subscribe(
            (data: any) => {
              this.GetVendors()
            })
      }
    })
  }
  getColumnTitle(column: string): string {
    return this.columnTitles[column] || column;
  }

  exportToExcel(): void {
    const visibleColumns = this.grid.columns.toArray().filter((column: any) => !column.hidden).map((column: any) => column.field as string);
    const exportData: ExcelExportData = {
      data: this.vendorList.map(item => this.getSelectedColumns(item, visibleColumns)),
      group: []
    };
    this.excelExport.save(exportData);
  }

  getSelectedColumns(item: any, visibleColumns: string[]): any {
    let filteredObject: any = {};
    visibleColumns.forEach((column: string) => {
      filteredObject[column] = item[column];
    });
    return filteredObject;
  }

  ngDoCheck(): void {
    this.showFilteredColumns();
  }

  getFilteredColumns() {
    if (this.grid) {
      return this.grid.columns.toArray();
    }
    return [];
  }

  showFilteredColumns() {
    const filteredColumns = this.getFilteredColumns();
    this.selectedColumns = filteredColumns.filter(ele => ele.hidden == undefined || ele.hidden == false)
  }


  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.pageSize = event.take;

  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;

  }




}
