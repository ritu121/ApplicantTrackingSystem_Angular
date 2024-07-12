import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register/register.service';
import { RegisterModel } from '../models/register.model';
import { first } from 'rxjs';


@Component({
  selector: 'app-addregister',
  //standalone: true,
  // imports: [],
  templateUrl: './addregister.component.html',
  styleUrl: './addregister.component.scss'
})
export class AddregisterComponent {

  registerForm!: FormGroup;
  password: string = '';
  confirmPassword: string = '';
  btnlabel: string = "Save";
  registerModeldata: any;
  submitted: any;
  selectedDate: Date = new Date();
  public userId: any = ''
  action: string = ''
  public max :Date = new Date();

  get fa() { return this.registerForm.controls; }

  constructor(
    private router: Router,
    private routers: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private registerservice: RegisterService,

  ) {
    this.registerModeldata = {} as RegisterModel;

    this.registerModeldata = new RegisterModel();
  }

  public RoleList: Array<{ text: string, value: number }> = [

    { text: 'Admin', value: 1 },
    { text: 'Normal', value: 2 },

  ];

  public defaultItem: { text: string, value: number } = { text: 'Select item...', value: 0 };


  ngOnInit(): void {

    this.userId = localStorage.getItem("userID");

    this.routers.params.forEach((params: Params) => {

      const LabelID = params['id'];
      if (LabelID !== undefined ) {
        this.action = 'Edit'

        this.registerModeldata = new RegisterModel();

        this.registerservice.Edit_register(LabelID)

          .subscribe((data) => {

            this.registerModeldata = data

            this.btnlabel = "update";
            const roleObj = this.getroleObj(this.registerModeldata[0].role);
            if (roleObj) {
              this.registerForm.get('Role')?.setValue(roleObj);
            }

            const dob = new Date(this.registerModeldata[0].dob);
            this.registerForm.get('DOB')?.setValue(dob);



            const genderValue = this.registerModeldata[0].gender;
            this.registerForm.get('Gender')?.setValue(genderValue);

            this.fa.UserID.setValue(this.registerModeldata[0].userID);
            this.fa.FirstName.setValue(this.registerModeldata[0].firstName);
            this.fa.LastName.setValue(this.registerModeldata[0].lastName);
            this.fa.Designation.setValue(this.registerModeldata[0].designation);
            this.fa.Email.setValue(this.registerModeldata[0].email);
            this.fa.Password.setValue(this.registerModeldata[0].password);
            this.fa.UserName.setValue(this.registerModeldata[0].userName);
            this.fa.ConfirmPassword.setValue(this.registerModeldata[0].password);
            // this.fa.Operation.setValue("update");
          })
      }





    })


    this.registerForm = this.fb.group({
      UserID: [null],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Operation: [''],
      Designation: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      DOB: ['', Validators.required],
      Gender: ['', Validators.required],
      UserName: ['', Validators.required],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', Validators.required],
      Role: [[], Validators.required],
      CreatedBy: this.userId,
    },
      {
        validator: this.mustMatch('password', 'ConfirmPassword')
      }
    );

  }

  getroleObj(value: string): { text: string, value: number } | null {

    return this.RoleList.find(item => item.text === value) || null;
  }

  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[password];
      const matchingControl = formGroup.controls[confirmPassword];

      if (matchingControl.errors && !matchingControl.errors['mismatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mismatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  setDOB() {
    const dob = '24-30-2024'; // Example date string in dd-MM-yyyy format
    const dateParts = dob.split('-');
    const formattedDate = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
    this.registerForm.get('DOB')?.setValue(formattedDate);
  }





  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log(this.registerForm);
      
      return;
    }
    // this.registerModeldata.UserID= null;
    this.registerModeldata = this.registerForm.value;


    this.registerModeldata.Role = this.fa.Role.value.text;

    if (this.registerModeldata && this.action!='Edit') {
      let currentJobReleaseDate = new Date(this.registerForm.get('DOB')?.value);
      currentJobReleaseDate.setDate(currentJobReleaseDate.getDate() + 1);
      this.registerModeldata.DOB = currentJobReleaseDate
    }


    if (this.registerForm.valid) {
      this.submitted = false;

      this.registerservice.Add_Update_delete_User(this.registerModeldata)

        .pipe(first())
        .subscribe(
          (data: any) => {
            console.log("data:", data);
            this.cancelClick()
            this.submitted = false
          })
    }
  }

  cancelClick() {
    this.registerModeldata = new RegisterModel();

    this.btnlabel = 'Save';

    // Reset the submitted flag
    this.submitted = false;

    this.registerForm.reset({
      FirstName: '',
      LastName: '',
      Designation: '',
      Operation: '',
      Elementmail: '',
      DOB: '',
      Gender: '',
      UserName: '',
      Password: '',
      ConfirmPassword: '',
      Role: '',
    });

    this.router.navigate(['/register'])


  }


}
