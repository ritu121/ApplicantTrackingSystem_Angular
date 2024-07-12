import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterModel } from '../models/register.model';
import { RegisterService } from '../services/register/register.service';
import { SortDescriptor } from '@progress/kendo-data-query';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditEvent, PageChangeEvent, RemoveEvent } from '@progress/kendo-angular-grid';
import { AlertboxModalComponent } from '../alertbox-modal/alertbox-modal.component';
@Component({
  selector: 'app-register',
 // standalone: true,
 // imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  
   
  get fa() { return this.registerForm.controls; }

  registerForm!: FormGroup;

  public pageSize = 20;
  public skip = 0;
  public registerModeldata: RegisterModel;
  public sort: SortDescriptor[] = [];
  public multiple = false;
  public allowUnsort = true;
  public currentItem: any;
  public RegisterList!: Array<any>;
  public loading:boolean=false;

  public payload={
    Operation:'',
    UserID:''
  }

  submitted: boolean = false;
  btnlabel: string = "Save";
  error = ""
  
  
  
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private registerservice : RegisterService,
  
  )   


  { this.registerModeldata = {} as RegisterModel;
  
   this.registerModeldata = new RegisterModel(); }

  
  
   ngOnInit(): void {

    this.GetUsers();
  }  

  navigate() {
    this.router.navigate(['register/addregister']);  // Replace with your desired path
  }




  GetUsers() {
    this.loading=true
    this.registerservice.GetallRegisterDetails()
      .subscribe(
        RegisterList => {
          this.RegisterList = RegisterList
          this.loading=false
        },
        error => (this.error = error),
        () => {
        }
      )
  }
  
  deleteClick(dataItem: any) {
    // Set the operation to "delete"
    this.payload.Operation = "delete";
    this.payload.UserID = dataItem.userID;

    // Open the confirmation dialog
    const dialogRef = this.dialog.open(AlertboxModalComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result.confirmed) {
        // Call the service to delete the user
        this.registerservice.delete_User(this.payload)
         .subscribe(
            (data: any) => {
              // Refresh the user list
              this.GetUsers();
            },
            (error: any) => {
              console.error('Error deleting user:', error);
            }
          );
      }
    });
  }
  



  editClick(dataItem: any) {

    this.router.navigate(['editRegister',dataItem.userID]);
  
  }



//   cancelClick() {


//   this.registerModeldata = new registerModel();

//   this.btnlabel = 'Save';

//   // Reset the submitted flag
//   this.submitted = false;

//   this.registerForm.reset({
//     firstName: '',
//     lastName: '',
//     designation: '',
//     email: '',
   
//     DOB: '',
//     Gender: '',
//     Username: '',
//     Password: '',
//     ConfirmPassword: '',
//     Role: '',
//   });

// }



editHandler($event: EditEvent) {
  // throw new Error('Method not implemented.');
}
removeHandler($event: RemoveEvent) {
  // throw new Error('Method not implemented.');
}


public pageChange(event: PageChangeEvent): void {
  this.skip = event.skip;
  this.pageSize = event.take;

}

public sortChange(sort: SortDescriptor[]): void {
  this.sort = sort;

}
  

}
