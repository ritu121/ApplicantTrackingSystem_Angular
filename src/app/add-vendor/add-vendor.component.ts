import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EditEvent, GridComponent, GridDataResult, PageChangeEvent, RemoveEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, filterBy } from '@progress/kendo-data-query';
import { Vendor } from '../models/vendor.model';
import { VendorService } from '../services/vendor/vendor.service';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';


@Component({
  selector: 'app-add-vendor',
  // standalone: true,
  // imports: [],
  templateUrl: './add-vendor.component.html',
  styleUrl: './add-vendor.component.scss'
})
export class AddVendorComponent {

  get fa() { return this.VendorForm.controls; }

  VendorForm!: FormGroup;

  public pageSize = 10;
  public skip = 0;
  public vendorData: Vendor;
  public sort: SortDescriptor[] = [];
  public multiple = false;
  public allowUnsort = true;
  public currentItem: any;
  submitted: boolean = false;
  btnlabel: string = "Save";
  error = ""
  vendordata: any;
  public userName: any = ''
  public userId: any = ''
  // public vendorTypelist!: Array<any>


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
    private routers: ActivatedRoute,
  ) {
    this.vendorData = {} as Vendor;
    this.vendorData = new Vendor();
  }


   ngOnInit(): void {
    this.userId = localStorage.getItem("userID");


    this.routers.params.forEach((params: Params) => {
      const LabelID = params['id'];



      this.vendorData = new Vendor();


      this.VendorService.Edit_vendor(LabelID)
        .subscribe((data) => {
          this.vendordata = data

          this.btnlabel = "Update";


          const vendorTypeObj = this.getvendorTypeObj(this.vendordata[0].vendorType);

  
          if (vendorTypeObj) {
            this.VendorForm.get('VendorType')?.setValue(vendorTypeObj);
          }


          this.fa.VendorID.setValue(this.vendordata[0].vendorID);
          this.fa.Company.setValue(this.vendordata[0].company);
          this.fa.ContactName.setValue(this.vendordata[0].contactName);
          this.fa.Phone.setValue(this.vendordata[0].phone);
          this.fa.EmailID.setValue(this.vendordata[0].emailID);
          this.fa.Requirement_Technologies.setValue(this.vendordata[0].requirement_Technologies);
          this.fa.VendorRelationshipWithClient.setValue(this.vendordata[0].vendorRelationshipWithClient);
          this.fa.Website.setValue(this.vendordata[0].website);
          // 

        })

    })


    this.VendorForm = this.fb.group({
      VendorID: [null],
      VendorType: [this.defaultItem],
      Company: ['', Validators.required],
      ContactName: ['',],
      Phone: [''],
      // Phone: ['', [Validators.pattern(/^\d+$/)]],
      EmailID: ['', [Validators.required, Validators.email]],
      Requirement_Technologies: [''],
      VendorRelationshipWithClient: [''],
      Website: [''],
      UserID : this.userId
    })

  }

  getvendorTypeObj(value: string): { text: string, value: number } | null {

    return this.vendorTypelist.find(item => item.text === value) || null;
  }


  onVendorSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.VendorForm.invalid) {
      return;
    }
    this.vendorData.VendorID = "";
    this.vendorData = this.VendorForm.value;

    this.vendorData.VendorType = this.fa.VendorType.value.value
   
    if (this.VendorForm.valid) {
      this.submitted = false;

      this.VendorService.Add_Vendor(this.vendorData)
        .pipe(first())
        .subscribe(
          (data: any) => {
            this.cancelClick()
            this.submitted = false
          })
    }
  }


  cancelClick(){
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
      Requirement_Technologies: '',
      VendorRelationshipWithClient: '',
      Website: ''
    });
    
    this.router.navigate(['/vendor'])

  }


}
