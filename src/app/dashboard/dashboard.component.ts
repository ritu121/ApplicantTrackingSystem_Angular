import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { DashboardService } from '../services/dashboard/dashboard.service';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { DataBindingDirective, EditEvent, PageChangeEvent, RemoveEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, process } from "@progress/kendo-data-query";
import { Router, NavigationEnd } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AlertboxModalComponent } from '../alertbox-modal/alertbox-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup,Validators  } from '@angular/forms';
import { FileUploadService } from '../services/fileupload/file-upload.service';



@Component({
  selector: 'app-dashboard',
  // standalone: true,
  // imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {
  public dateForm!: FormGroup;
  public max :Date = new Date();


  constructor(
    private fb: FormBuilder,
    private routers: Router,
    public dialog: MatDialog,
    private DashboardService: DashboardService,
    private router: Router,
    private datePipe: DatePipe,
    private fileUploadService: FileUploadService,
    
  ) { }
  dataset !: Array<any>;

  // dataset = [
  //   { header: '.NET', title: 'Title 1', description1: 'OPEN :10',description2: 'SELECTED :4',description3: 'ON-HOLD :2',description4: 'REJECTED :6', bgColor: 'bg-primary' },
  //   { header: 'JAVA', title: 'Title 2', description1: 'OPEN :14',description2: 'SELECTED :2',description3: 'ON-HOLD :4',description4: 'REJECTED :4', bgColor: 'bg-secondary' },
  //   { header: 'SQL', title: 'Title 3', description1: 'OPEN :12',description2: 'SELECTED :1',description3: 'ON-HOLD :5',description4: 'REJECTED :5', bgColor: 'bg-success' },
  //   { header: 'QA', title: 'Title 3', description1: 'OPEN :16',description2: 'SELECTED :3',description3: 'ON-HOLD :6',description4: 'REJECTED :3', bgColor: 'bg-info' },
  //   { header: 'REACT', title: 'Title 3', description1: 'OPEN :13',description2: 'SELECTED :0',description3: 'ON-HOLD :2',description4: 'REJECTED :5', bgColor: 'bg-danger' },
  //   { header: 'Angular', title: 'Title 3', description1: 'OPEN :10',description2: 'SELECTED :3',description3: 'ON-HOLD :1',description4: 'REJECTED :8', bgColor: 'bg-warning' },
  //   // Add more data items as needed
  // ];

  //dataSource: any[] = [/* Your data source array */];
  columnsToDisplay: string[] = ['id', 'name', 'email'];
  totalItems: number = 100; // Total number of items for pagination
  currentPage: number = 1; // Current page number
  pageSize: number = 20; // Number of items per page
  public sort: SortDescriptor[] = [];
  searchText: string = ''; // Search text for filtering
  error: any;
  // fromDate:  Date | null = null;
  // toDate:  Date | null = null;

  gridView!: Array<any>;
  public skip = 0;
  public allowUnsort = true;
  public multiple = false;

  public userName: any = ''
  public userId: any = ''
  public loading:boolean=false;

  selectedOption: string = 'Choose Status';

  items: { color: string, header: string, number: number }[] = [
    { color: '#FF5733', header: '.NET', number: 1 },
    { color: '#33FF57', header: 'JAVA', number: 2 },
    { color: '#3357FF', header: 'SQL', number: 3 },
    { color: '#FF33A1', header: 'QA', number: 4 },
    { color: '#F3FF33', header: 'ANGULAR', number: 5 }
  ];

  ngOnInit(): void {
    
    this.userName = localStorage.getItem("name");
    this.userId = localStorage.getItem("userID");



    this.getCandidatesCount()
    this.loadGridData();

    this.dateForm = this.fb.group({
      fromDate: [null],
      toDate: [null]
    });

    this.routers.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }


  private loadGridData(): void {
    this.loading=true
    this.DashboardService.GetAllDetails(null, null).subscribe(
      data => {
        this.gridView = data
      this.loading=false
      },
      error => {
        console.error('Error fetching grid data:', error);
      }
    );
  }

  public search(): void {
    // Implement your search functionality here
    const formValues = this.dateForm?.value;
    this.searchData();
  }
  
  public clear(): void {
    this.dateForm?.reset({
      fromDate: null,
      toDate: null
    });
    this.loadGridData();
  }

  searchData() {
    const fromDate = this.dateForm?.get('fromDate')?.value;
    const toDate = this.dateForm?.get('toDate')?.value;


    let formattedFromDate = this.datePipe.transform(fromDate, 'yyyy-MM-dd');
    let formattedToDate = this.datePipe.transform(toDate, 'yyyy-MM-dd');

    
    this.DashboardService.GetAllDetails(formattedFromDate, formattedToDate).subscribe(
      data => {
        this.gridView = data
      },
      error => {
        console.error('Error fetching grid data:', error);
      }
    );
  }


  // Fromdate(value: Date) {
  //   this.fromDate = value
  // }
  // Todate(value: Date) {
  //   this.toDate = value
  // }
  // search() {

  //   this.searchData()
  // }

  // clear() {
  //   this.fromDate = null;
  //   this.toDate =null;
  // }

  getCandidatesCount = () => {
    this.DashboardService.GetallDashboardcount()
      .subscribe(
        dataset => (this.dataset = dataset),
        error => (this.error = error),
        () => {
          // console.log("vendorList:", this.dataset);
        }
      )

  }

  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.pageSize = event.take;

  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;

  }

  editData(dataItem: any) {
    //this.dataService.setData(dataItem);
    this.router.navigate([`/createcandidate`, dataItem.candidateID]);
  }


  getDocumentsArray(documents: string) {

    if (!documents) {
      // console.log('No documents found');
      return [];
    }
    // console.log(documents, "documents");
    return documents.split(',').map(filename => filename.trim());

  }
  dounloadclick(filename: any, candidateId: any) {
    this.downloadFile(filename, candidateId);
  }


  downloadFile(fileName: string, candidateId: string) {
    this.fileUploadService.downloadFile(fileName, candidateId).subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);

        // Create a link element, set its href, download attribute and trigger a click
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the blob URL after the download
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error downloading file:', error);
        // Handle error as needed
      }
    );
  }


  deleteData(dataItem: any) {
    let id = dataItem.candidateID
    const dialogRef = this.dialog.open(AlertboxModalComponent);

    dialogRef.afterClosed().subscribe(result => {

      if (result.confirmed) {
        this.DashboardService.DeleteCandidate(dataItem.candidateID)
          .subscribe(
            (data: any) => {
              this.loadGridData();
            })

      }

    });




  }
}