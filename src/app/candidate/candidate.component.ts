import { Component,ViewChild,OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DashboardService } from '../services/dashboard/dashboard.service';
import { DataBindingDirective, EditEvent, PageChangeEvent, RemoveEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, process } from "@progress/kendo-data-query";
import { Router,NavigationEnd } from '@angular/router';
import { AlertboxModalComponent } from '../alertbox-modal/alertbox-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExcelExportComponent } from '@progress/kendo-angular-excel-export';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { GridComponent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-candidate',
  // standalone: true,
  // imports: [],
  templateUrl: './candidate.component.html',
  styleUrl: './candidate.component.scss'
})
export class CandidateComponent implements OnInit{

  @ViewChild('excelExport', { static: false }) excelExport!: ExcelExportComponent;
  @ViewChild(GridComponent) grid!: GridComponent;


totalItems: number = 100; // Total number of items for pagination
currentPage: number = 1; // Current page number
pageSize: number = 20; // Number of items per page
public sort: SortDescriptor[] = [];
searchText: string = ''; // Search text for filtering
error: any;
public loading:boolean=false;

gridView!: Array<any>;
  public skip = 0;
  public allowUnsort = true;
  public multiple = false;

  selectedColumns: Array<any> = [
    'candidateName',
    'candidateEmail',
    'gender',
    'postAppliedFor',
    'totalExperience',
    'expectedCTC',
    'dob',
    'mobile',
    'state',
    'city',
    'skillName',
    'finalStatus'
  ];

  // Define the title and width mappings
  columnTitles: { [key: string]: string } = {
    candidateName: 'Candidate Name',
    candidateEmail: 'Email',
    gender: 'Gender',
    postAppliedFor: 'Post Applied For',
    totalExperience: 'Total Experience',
    expectedCTC : 'Expected CTC',
    dob: 'Date of Birth',
    mobile: 'Mobile',
    state: 'State',
    city: 'City',
    skillName: 'Skills',
    finalStatus: 'Status'
  };

 
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private DashboardService: DashboardService,


  ) { }

  ngOnInit(): void {
    this.loadGridData();
  }

  private loadGridData(): void {
    this.loading=true

    this.DashboardService.GetAllCandidateDetails(null, null).subscribe(
      data => {
        this.gridView = data
        this.loading=false;
      },
      error => {
        console.error('Error fetching grid data:', error);
      }
    );
  }
  navigate() {
    this.router.navigate([`/createcandidate`]);  // Replace with your desired path
  }
  editData(dataItem: any) {
    // debugger
    console.log(dataItem);
    //this.dataService.setData(dataItem);
    this.router.navigate([`/createcandidate`, dataItem.candidateID]);  
  }
  

  deleteData(dataItem: any) {
    let id=dataItem.candidateID
    const dialogRef = this.dialog.open(AlertboxModalComponent);
  
    dialogRef.afterClosed().subscribe(result => {

      if(result.confirmed){
      this.DashboardService.DeleteCandidate(dataItem.candidateID)
      .subscribe(
        (data: any) => {
          this.loadGridData();
        })
       
      }
      
    });
  }

  getColumnTitle(column: string): string {
    return this.columnTitles[column] || column;
  }

  exportToExcel(): void {
    const visibleColumns = this.grid.columns.toArray().filter((column: any) => !column.hidden).map((column: any) => column.field as string);
    const exportData: ExcelExportData = {
      data: this.gridView.map(item => this.getSelectedColumns(item, visibleColumns)),
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

  ngDoCheck():void{
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
    this.selectedColumns = filteredColumns.filter(ele=>ele.hidden == undefined || ele.hidden == false)
  }




  @ViewChild(MatPaginator) paginator!: MatPaginator;


  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.pageSize = event.take;

  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;

  }
}
