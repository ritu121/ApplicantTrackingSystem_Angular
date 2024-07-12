import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor } from '@progress/kendo-data-query';
import { SkillsService } from '../services/skills/skills.service';
import { MatDialog } from '@angular/material/dialog';
import { Skills } from '../models/skills.model';

@Component({
  selector: 'app-skills',
  // standalone: true,
  //imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {


  get fa() { return this.SkillsForm.controls; }

  SkillsForm!: FormGroup;
  public pageSize = 10;
  public skip = 0;
  public skillData: Skills;
  public sort: SortDescriptor[] = [];
  public multiple = false;
  public allowUnsort = true;
  public SkillList!: Array<any>;
  public isMultiple = true; // Added boolean variable for sorting mode
  submitted: boolean = false;
  btnlabel: string = "Save";
  // public gridView : any;
  error = "";
  public userId:any=''
  Failed: boolean = false;
  public message:string='';
  public loading:boolean=false;


  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private skillservice: SkillsService
  ) {
    this.skillData = {} as Skills;

    this.skillData = new Skills();
  }

  ngOnInit(): void {
    this.userId=localStorage.getItem("userID");
    this.getSkillDetails();

    this.SkillsForm = this.fb.group({
      SkillID: [null],
      SkillName: ['', Validators.required],
      IsActive: [true],
      UserID : this.userId
    });

    console.log( this.SkillsForm,"ONinit");
    
  }

  


  getSkillDetails(): void {
    this.loading=true
    this.skillservice.GetallskillDetails().subscribe(
      data => {
        this.SkillList = data;
        this.loading=false
      },
      error => {
        this.error = error;
        console.error("Error fetching skill details:", error);
      }
    );
  }

  onSave(): void {
    this.submitted = true;
    this.Failed = false;
    if (this.SkillsForm.invalid) {
      return;
    }

    this.skillData.UserID= this.userId;
    this.skillData = this.SkillsForm.value;

    console.log(this.skillData,"save click");
    

    if (this.SkillsForm.valid) {

      this.skillservice.Add_Skills(this.skillData).subscribe(
        data => {
          if(data){
            this.Failed = false;
            this.getSkillDetails();
            this.onCancel();
            this.userId=localStorage.getItem("userID");
          }
        },
        error => {
          this.Failed = true;
          this.message = "Skill Name already exists";
          console.error("Error saving skill:", error);
        }
      );
    }
  }


  editClick(dataItem: any) {
    this.btnlabel = 'Update'

    console.log(dataItem,"After Save");

    if (dataItem.skillID) {
      this.fa.SkillID.setValue(dataItem.skillID);
      this.fa.SkillName.setValue(dataItem.skillName);
      this.fa.IsActive.setValue(dataItem.isActive=='Active'? true : false)
    }

    else {


    }


  }


  onCancel(): void {
    this.btnlabel = 'Save';
    this.submitted = false;
    this.fa.SkillName.setValue('');
    this.fa.SkillID.setValue(null);
  }



  // loadItems(): void {
  //   this.gridView = {
  //     data: this.SkillList.slice(this.skip, this.skip + this.pageSize),
  //     total: this.SkillList.length
  //   };
  // }




  pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.pageSize = event.take;
    // this.loadItems();
  }

  sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    // this.loadItems();
  }





}