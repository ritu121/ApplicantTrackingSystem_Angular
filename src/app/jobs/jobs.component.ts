
import { Component,ViewChild,  OnInit } from '@angular/core';
import { EditEvent, GridComponent, GridDataResult, PageChangeEvent, RemoveEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, filterBy } from '@progress/kendo-data-query';
import { JobsService } from '../services/jobs/jobs.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertboxModalComponent } from '../alertbox-modal/alertbox-modal.component';
import { first } from 'rxjs';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { ExcelExportComponent } from '@progress/kendo-angular-excel-export';


@Component({
  selector: 'app-jobs',
  // standalone: true,
  // imports: [],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss'
})
export class JobsComponent {
  @ViewChild('excelExport', { static: false }) excelExport!: ExcelExportComponent;
  @ViewChild(GridComponent) grid!: GridComponent;



  public pageSize = 20;
  public skip = 0;
  public sort: SortDescriptor[] = [];
  public multiple = false;
  public allowUnsort = true;
  public allJobs!: Array<any>;
  error:string='';
  public loading:boolean=false;
  public payload={
    Operation:'',
    JobID:''
  }

  selectedColumns: Array<any> = [
    'jobName',
    'vendorName',
    'jobVendorID',
    'description',
    'jobReleaseDate',
    'isActive'
  ];
  // Define the title and width mappings
  columnTitles: { [key: string]: string } = {
    jobName: 'Job Name',
    vendorName: 'Vendor',
    jobVendorID: 'Job ID',
    description: 'Description',
    jobReleaseDate: 'Job Release Date',
    isActive: 'Active/InActive',
  };

  constructor(
    public dialog: MatDialog,
    private JobsService: JobsService,
  
    private router: Router,
    private routers: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.GetallJobs()

  }

  GetallJobs() {
    this.loading=true
    this.JobsService.GetallJobs(null)
      .subscribe(
        jobList => {
          this.allJobs = jobList
          this.loading=false
        },
        error => (this.error = error),
        () => {
          // console.log("vendorList:", this.vendorList);
        }
      )
  }

  editClick(dataItem: any) {
    this.router.navigate(['add-jobs',dataItem.jobID]);
  }

  deleteData(dataItem: any) {
    this.payload.Operation='delete'
    this.payload.JobID=dataItem.jobID
    
    const dialogRef = this.dialog.open(AlertboxModalComponent);
  
    dialogRef.afterClosed().subscribe(result => {

      if(result.confirmed){
        this.JobsService.Delete_Jobs(this.payload)
        .pipe(first())
        .subscribe(
          (data: any) => {
            this.GetallJobs()
          })
        }
    });
  }
  navigate() {
    this.router.navigate(['add-jobs']);  // Replace with your desired path
  }

  getColumnTitle(column: string): string {
    return this.columnTitles[column] || column;
  }

  exportToExcel(): void {
    const visibleColumns = this.grid.columns.toArray().filter((column: any) => !column.hidden).map((column: any) => column.field as string);
    const exportData: ExcelExportData = {
      data: this.allJobs.map(item => this.getSelectedColumns(item, visibleColumns)),
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
