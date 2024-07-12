import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor } from '@progress/kendo-data-query';
import { PostdetailsService } from '../services/postdetails/postdetails.service';
import { Postdetails } from '../models/postdetails.models';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs';

@Component({
  selector: 'app-postdetails',
  //standalone: true,
  //imports: [],
  templateUrl: './postdetails.component.html',
  styleUrl: './postdetails.component.scss'
})
export class PostdetailsComponent implements OnInit {


  get fa() { return this.postForm.controls; }

  postForm!: FormGroup;
  public pageSize = 10;
  public skip = 0;
  public PostDetailsData: Postdetails;
  public sort: SortDescriptor[] = [];
  public multiple = false;
  public allowUnsort = true;
  public postList!: Array<any>;
  submitted: boolean = false;
  btnlabel: string = "Save";
  error = "";
  public userName: any = ''
  public userId: any = ''
  public loading:boolean=false;

  public defaultItem: { text: string, value: number } = { text: 'Select item...', value: 0 };

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private postDetailsService: PostdetailsService) {
    this.PostDetailsData = {} as Postdetails;

    this.PostDetailsData = new Postdetails();

    
  }


  ngOnInit(): void {
    this.userName = localStorage.getItem("name");
    this.userId = localStorage.getItem("userID");
    this.getPostDetails();

    this.postForm = this.fb.group({

      PostID: [null],
      PostAppliedFor: ['', Validators.required],
      IsActive: [true,],
      IsActiveTile: [false,],
      UserID : this.userId
    });
  }

  onpostdetailsSubmit() {
    this.submitted = true;

    // if (this.postForm.invalid) {
    //   return;
    // }
    this.PostDetailsData.PostID = "";
    this.PostDetailsData = this.postForm.value;

    // console.log(this.PostDetailsData,"postdetails:")

    if (this.postForm.invalid) {
      return
    }

    if (this.postForm.valid) {
      this.submitted = false;
      this.postDetailsService.Add_Postdetails(this.PostDetailsData)
        .pipe(first())
        .subscribe(
          (data: any) => {
            this.getPostDetails();
            this.cancelClick();
            this.submitted = false;
          },
          error => {
            console.error("Error:", error);
          }
        );
    }
  } 

  editClick(dataItem: any) {


    console.log(dataItem, dataItem.isActiveTile === 'Active', 'dataItem');

    this.btnlabel = 'Update';

    if (dataItem.postID) {
      this.postForm.get('PostID')?.setValue(dataItem.postID);
      this.postForm.get('PostAppliedFor')?.setValue(dataItem.postAppliedFor);
      this.fa.IsActive.setValue(dataItem.isActive === 'Active' || dataItem.isActive === true);
      this.fa.IsActiveTile.setValue(dataItem.isActiveTile === 'Active' || dataItem.isActiveTile === true);
    }
  }

  // getOperationObject(value: string): { text: string, value: number } | null {

  //    return this.OperationList.find(item => item.text === value) || null;
  // }


  getPostDetails(): void {
    this.loading=true
    this.postDetailsService.GetallActivePost().subscribe(
      data => {
        this.postList = data;
        this.loading=false
      },
      error => {
        this.error = error;
        console.error("Error fetching post details:", error);
      }
    );
  }

  cancelClick() {
    this.btnlabel = 'Save';
    this.submitted = false;

    this.fa.PostID.setValue(null);
    this.fa.PostAppliedFor.setValue('');

    // this.postForm.reset({
    //   PostAppliedFor: '',
    //   IsActive: false,
    //   IsActiveTile: false
    // });
  }




  // loadItems(): void {
  //   this.gridView = {
  //     data: this.SkillList.slice(this.skip, this.skip + this.pageSize),
  //     total: this.SkillList.length
  //   };
  // }







  pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
  }

  sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
  }


}
