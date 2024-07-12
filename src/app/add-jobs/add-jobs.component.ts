import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EditEvent, GridComponent, GridDataResult, PageChangeEvent, RemoveEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, filterBy } from '@progress/kendo-data-query';
import { JobsService } from '../services/jobs/jobs.service';
import { VendorService } from '../services/vendor/vendor.service';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { JobsModel } from '../models/jobs.model';

import { Params } from '@angular/router';

@Component({
  selector: 'app-add-jobs',
  // standalone: true,
  // imports: [],
  templateUrl: './add-jobs.component.html',
  styleUrl: './add-jobs.component.scss'
})
export class AddJobsComponent {




  defaultItem: any;


  get fa() { return this.JobsForm.controls; }
  JobsForm!: FormGroup;
  jobsdata: any;

  public pageSize = 10;
  public skip = 0;
  public jobsData: JobsModel;
  public sort: SortDescriptor[] = [];
  public multiple = false;
  public allowUnsort = true;
  public currentItem: any;
  submitted: boolean = false;
  btnlabel: string = "Save";
  error = "";
  public userName: any = '';
  public userId: any = '';
  public vendorList!: Array<any>;

  public Jobs: JobsModel | undefined;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private JobsService: JobsService,
    private VendorService: VendorService,
    private router: Router,
    private routers: ActivatedRoute,
  ) {
    this.jobsData = {} as JobsModel;
    this.jobsData = new JobsModel();
  }



  ngOnInit(): void {
    this.GetVendors()

    this.userId = localStorage.getItem("userID");

    this.routers.params.forEach((params: Params) => {
      const LabelID = params['id'];
      if (LabelID !== undefined ) {
        this.GetVendors2(LabelID)
        
      }
    })

    this.JobsForm = this.fb.group({
      JobID: [null],
      JobVendorID: [''],
      JobName: ['', Validators.required],
      Description: [''],
      JobReleaseDate: ['', Validators.required],
      IsActive: [true],
      VendorID: [[], Validators.required],
      UserID: this.userId
    })
  }

  getJobsObject(value: string): | null {
    console.log(this.vendorList, "valuevaluevaluevalue");
    return this.vendorList.find(item => item.vendorID === value) || null;

  }
  // getCandidateTypeObject(value: number): { text: string, value: number } | null {
  //   return this.candidateTypedropdown.find(item => item.value === value) || null;
  // }

  onJobsSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.JobsForm.invalid) {
      return;
    }
    this.jobsData.JobID = "";
    this.jobsData = this.JobsForm.value;


    this.Jobs = this.JobsForm.value;
    if (this.Jobs) {
      this.Jobs.VendorID = this.JobsForm.value.VendorID.vendorID;
      // Get the current JobReleaseDate value
      let currentJobReleaseDate = new Date(this.JobsForm.get('JobReleaseDate')?.value);  
      currentJobReleaseDate.setDate(currentJobReleaseDate.getDate() + 1);

      this.Jobs.JobReleaseDate = currentJobReleaseDate
    }


    // this.Jobs.Vendor = this.JobsForm.value.Vendor.Vendor;
    if (this.JobsForm.valid) {
      this.submitted = false;

      this.JobsService.Add_Jobs(this.jobsData)
        .pipe(first())
        .subscribe(
          (data: any) => {
            this.cancelClick()
            this.submitted = false
          })
    }
  }

  GetVendors() {
    this.VendorService.GetVendorsDrop()
      .subscribe(
        data => {
          this.vendorList = data
          console.log(this.vendorList, 'this.vendorList');
        },
        error => (this.error = error),
        () => {
          // console.log("vendorList:", this.vendorList);
        }
      )
  }

  GetVendors2(LabelID : any) {
    this.VendorService.GetVendorsDrop()
      .subscribe(
        data => {
          this.vendorList = data
          console.log(this.vendorList, 'this.vendorList');
          this.Getdata(LabelID);
        },
        error => (this.error = error),
        () => {
          // console.log("vendorList:", this.vendorList);
        }
      )
  }

  Getdata(LabelID: any) {
    console.log(this.vendorList, "from oninit this.vendorList");

    this.jobsdata = new JobsModel();

    this.JobsService.GetallJobs(LabelID)

      .subscribe((dataItem) => {
        this.btnlabel = "update";

        const dob = new Date(dataItem.jobReleaseDate);
        this.JobsForm.get('JobReleaseDate')?.setValue(dob);

        const jobObj = this.getJobsObject(dataItem.vendorID);

        if (jobObj) {
          this.JobsForm.get('VendorID')?.setValue(jobObj);
        }

        this.fa.JobID.setValue(dataItem.jobID);
        this.fa.JobName.setValue(dataItem.jobName);
        this.fa.Description.setValue(dataItem.description);
        this.fa.JobVendorID.setValue(dataItem.jobVendorID);
        this.fa.IsActive.setValue(dataItem.isActive)

      })
  }

  // getvendorTypeObj(value: string): { text: string, value: number } | null {
  //   return this.vendorList.find(item => item.contactName === value) || null;
  // }

  cancelClick() {

    // this.JobsForm.reset({
    //   JobName: '',
    //   Description: '',
    //   JobVendorID: '',
    //   JobReleaseDate: '',
    //   VendorID: [],
    //   IsActive: false
    // });
    this.router.navigate(['jobs']);

  }



  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.pageSize = event.take;
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
  }

}
