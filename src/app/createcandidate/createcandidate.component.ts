import { Component, HostListener, OnInit, Injectable } from '@angular/core';
import { UploadModule } from '@progress/kendo-angular-upload';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ModalComponent } from '../documentmodal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpProgressEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, of, concat } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CandidateService } from '../services/candidate/candidate.service';
import { PostdetailsService } from '../services/postdetails/postdetails.service';
import { CandidateModel } from '../models/candidate.model';
import { first } from 'rxjs/operators';
import { Params } from '@angular/router';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';


interface City {
  name: string,
  code: string
}



@Component({
  selector: 'app-createcandidate',
  // standalone: true,
  // imports: [],
  templateUrl: './createcandidate.component.html',
  styleUrl: './createcandidate.component.scss',

})
export class CreatecandidateComponent implements OnInit {
  myForm: any;
  submitted: any;
  candidateModel: any;
  //submitted: boolean;
  formSubmitted = false;
  route: any;
  public allskills!: Array<any>;
  public allposts!: Array<any>;
  selectedSkills: string = "";
  receivedData: any;
  spinner: any;
  error: any;
  candidateRegionTest: boolean = false;
  btnName: string = "Save";
  ResumeName: string = "";
  OldResumeName: string = "";
  candidateId: string = '';
  // router: any;
  get fa() { return this.myForm.controls; }
  public candit: CandidateModel | undefined;
  selectedFile: File | null = null;
  public userName: any = ''
  public userId: any = ''
  public max :Date = new Date();


  constructor(
    private routers: Router,
    public dialog: MatDialog,
    private router: ActivatedRoute,
    private RouterD: Router,
    private fb: FormBuilder, private candidateService: CandidateService, private postdetails: PostdetailsService) {
  }



  public candidateTypedropdown: Array<{ text: string, value: number }> = [
    { text: 'India', value: 1 },
    { text: 'US', value: 2 },
  ];
  public defaultItem: { text: string, value: number } = { text: 'Select item...', value: 0 };


  public statusType: Array<{ text: string, value: number }> = [
    { text: 'OPEN', value: 1 },
    { text: 'ON-HOLD', value: 2 },
    { text: 'SELECTED', value: 3 },
    { text: 'REJECTED', value: 4 },
    { text: 'INTERVIEWED', value: 5 }
  ];
  public defaultItem1: { text: string, value: number } = { text: 'Select item...', value: 0 };

  public jobType: Array<{ text: string, value: number }> = [
    { text: 'Full Time', value: 0 },
    { text: 'Contract', value: 1 },
  ];


  public visaType: Array<{ text: string, value: number }> = [
    { text: 'CPT/OPT', value: 1 },
    { text: 'H1', value: 2 },
    { text: 'GC', value: 3 },
    { text: 'USC', value: 4 },
  ];
  public defaultItem3: { text: string, value: number } = { text: 'Select item...', value: 0 };

  canddata: any;

  ngOnInit(): void {
    this.userName = localStorage.getItem("name");
    this.userId = localStorage.getItem("userID");

    this.routers.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });

   


    this.GetSkills()
    this.GetPosts()

    this.myForm = this.fb.group({ logUserName: ['Default Text'] });

    this.router.params.forEach((params: Params) => {
      const LabelID = params['id'];
      //  this.fa.PostID.setValue(params['id'])

      this.candidateId = LabelID;

      if (LabelID !== undefined) {
        this.Editcandidate()
      }
    });

    this.myForm = this.fb.group({
      candidateID: [null],
      UserID: this.userId,
      PostID: [[], [Validators.required]],
      Source: ['', Validators.required],
      SkillName: [[], Validators.required],
      Surname: ['', Validators.required],
      CandidateFirstName: ['', Validators.required],
      FatherName: [''],
      HusbandName: [],
      DOB: ['', Validators.required],
      Gender: ['', Validators.required],
      City: ['', Validators.required],
      MaritalStatus: [''],
      Address: ['', Validators.required],
      State: ['', Validators.required],
      PIN: [],
      Mobile: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      CandidateEmail: ['', [Validators.required, Validators.email]],
      Tno: [],
      LanguagesKnown: [],
      CurrentCTC: [''],
      ExpectedCTC: [''],
      NoticePeriod: [''],
      TotalExperience: ['', Validators.required],
      HoldAnyOffer: [''],
      Course1: [],
      School1: [],
      Yearofpassing1: [],
      PercentageofMarks1: [],
      DistinctionORAwardsReceived1: [],
      Course2: [],
      School2: [],
      Yearofpassing2: [],
      PercentageofMarks2: [],
      DistinctionORAwardsReceived2: [],
      Course3: [],
      School3: [],
      Yearofpassing3: [],
      PercentageofMarks3: [],
      DistinctionORAwardsReceived3: [],
      Course4: [],
      School4: [],
      Yearofpassing4: [],
      PercentageofMarks4: [],
      DistinctionORAwardsReceived4: [],
      Organization1: [],
      PositionHeld1: [],
      StartingSalary1: [],
      LastDrawnSalary1: [],
      DOJ1: [null],
      DOL1: [null],
      ROL1: [],
      Organization2: [],
      PositionHeld2: [],
      StartingSalary2: [],
      LastDrawnSalary2: [],
      DOJ2: [null],
      DOL2: [null],
      ROL2: [],
      Organization3: [],
      PositionHeld3: [],
      StartingSalary3: [],
      LastDrawnSalary3: [],
      DOJ3: [null],
      DOL3: [null],
      ROL3: [],
      Organization4: [],
      PositionHeld4: [],
      StartingSalary4: [],
      LastDrawnSalary4: [],
      DOJ4: [null],
      DOL4: [null],
      ROL4: [""],
      InterviewDate1: [],
      Interviewer1: [""],
      ModeofInterview1: [],
      RatingTechinical1: [],
      RatingCommunication1: [],
      RatingTest1: [],
      Comments1: [""],
      InterviewStatus1: [],
      InterviewDate2: [],
      Interviewer2: [],
      ModeofInterview2: [],
      RatingTechinical2: [],
      RatingCommunication2: [],
      RatingTest2: [],
      Comments2: [""],
      InterviewStatus2: [],
      InterviewDate3: [],
      Interviewer3: [],
      ModeofInterview3: [],
      RatingTechinical3: [],
      RatingCommunication3: [],
      RatingTest3: [],
      Comments3: [""],
      InterviewStatus3: [],
      HRFeedback: [],
      FinalStatus: [, Validators.required],
      CandidateType: [[], Validators.required],
      JobTitle: [""],
      JobType: [[]],
      VendorNameOREmployerName: [""],
      PassportNo: [""],
      Nationality: [""],
      VisaType: [],
      IndiaResidenceAddress: [""],
      ForeignResidenceAddress: [""],
      DriverLicence: [""],
      SSN: [""],
      FilePath: ['']
    })

  }

  defaultItemValidator(control: AbstractControl): ValidationErrors | null {
    return control.value === 0 ? { defaultItemSelected: true } : null;
  }

  getCandidateTypeObject(value: number): { text: string, value: number } | null {
    return this.candidateTypedropdown.find(item => item.value === value) || null;
  }
  getCandidateStatusObject(value: string): { text: string, value: number } | null {
    return this.statusType.find(item => item.text === value) || null;
  }

  getPostAppliedObject(value: string): { text: string, value: number } | null {
    return this.allposts.find(item => item.postID === value) || null;
  }
  getJobTypeObject(value: number): { text: string, value: number } | null {
    return this.jobType.find(item => item.value === value) || null;
  }
  getVisaTypeObject(value: number): { text: string, value: number } | null {
    return this.visaType.find(item => item.value === value) || null;
  }

  // getskillsNameObject(value: string): { text: string, value: number } | null {
  //   return this.allskills.find(item => item.text === value) || null;
  // }



  GetSkills() {
    this.candidateService.GetallActiveskill()
      .subscribe(
        skills => (this.allskills = skills),
        error => (this.error = error),
        () => {
          // console.log("allskills:", this.allskills);
          //this.csvService.exportAsCSVFile(this.Class1EIPTags, filename);
          // this.spinner.hide();
        }
      )
  }

  GetPosts() {
    this.postdetails.GetallPostDetails()
      .subscribe(
        posts => (this.allposts = posts),
        error => (this.error = error),
        () => {
          // console.log("allskills:", this.allskills);
          //this.csvService.exportAsCSVFile(this.Class1EIPTags, filename);
          // this.spinner.hide();
        }
      )
  }

  Editcandidate() {
    this.btnName = "Üpdate"
    this.candit = new CandidateModel();
    this.candidateService.Edit_candit(this.candidateId)
      .subscribe((data) => {
        this.canddata = data;

        const candidateTypeObj = this.getCandidateTypeObject(this.canddata.item2[0].candidateType);
        if (candidateTypeObj) {
          this.myForm.get('CandidateType')?.setValue(candidateTypeObj);
        }

        if (this.canddata.item2[0].candidateType === 2) {
          this.candidateRegionTest = true;
        }

        const candidateStatusObj = this.getCandidateStatusObject(this.canddata.item2[0].finalStatus);
        if (candidateStatusObj) {
          this.myForm.get('FinalStatus')?.setValue(candidateStatusObj)?._rawValidators;
        }
        const visaTypeObj = this.getVisaTypeObject(this.canddata.item2[0].visaType);
        if (visaTypeObj) {
          this.myForm.get('VisaType')?.setValue(visaTypeObj)?._rawValidators;
        }

        const jobTypeObj = this.getJobTypeObject(this.canddata.item2[0].jobType);

        if (jobTypeObj) {
          this.myForm.get('JobType')?.setValue(jobTypeObj);
        }

        const genderValue = this.canddata.item2[0].gender === 'Male' ? "M" : "F";
        this.myForm.get('Gender')?.setValue(genderValue)?._rawValidators;



        const sourceValue = this.canddata.item2[0].source === 'Job Portal' ? "1" : "0";
        this.myForm.get('Source')?.setValue(sourceValue)?._rawValidators;

        const dob = new Date(this.canddata.item2[0].dob);
        this.myForm.get('DOB')?.setValue(dob)?._rawValidators;

        //date of joining
        if (this.canddata.item2[0].doJ1 != null) {
          const dOJ1 = new Date(this.canddata.item2[0].doJ1);
          this.myForm.get('DOJ1')?.setValue(dOJ1)?._rawValidators;
        }

        if (this.canddata.item2[0].doJ2 != null) {
          const dOJ2 = new Date(this.canddata.item2[0].doJ2);
          this.myForm.get('DOJ2')?.setValue(dOJ2)?._rawValidators;
        }

        if (this.canddata.item2[0].doJ3 != null) {
          const dOJ3 = new Date(this.canddata.item2[0].doJ3);
          this.myForm.get('DOJ3')?.setValue(dOJ3)?._rawValidators;
        }


        //date of leaving

        if (this.canddata.item2[0].doL1 != null) {
          const dOL1 = new Date(this.canddata.item2[0].doL1);
          this.myForm.get('DOL1')?.setValue(dOL1)?._rawValidators;
        }

        if (this.canddata.item2[0].doL2 != null) {
          const dOL2 = new Date(this.canddata.item2[0].doL2);
          this.myForm.get('DOL2')?.setValue(dOL2)?._rawValidators;
        }

        if (this.canddata.item2[0].doL3 != null) {
          const dOL3 = new Date(this.canddata.item2[0].doL3);
          this.myForm.get('DOL3')?.setValue(dOL3)?._rawValidators;
        }


        const MaritalStatusValue = this.canddata.item2[0].maritalStatus === 'Married' ? '1' : '0';
        this.myForm.get('MaritalStatus')?.setValue(MaritalStatusValue)?._rawValidators;

        const HoldAnyOfferValue = this.canddata.item2[0].holdAnyOffer === true ? 'yes' : 'no';
        this.myForm.get('HoldAnyOffer')?.setValue(HoldAnyOfferValue)?._rawValidators;



        if (this.allskills && this.allskills.length > 0) {
          const SkillNamesTypeObj = this.canddata.item2[0].skillName.split(',').map((skills: string) => {
            return this.allskills.find(s => s.skillName === skills.trim());
          }).filter((skill: any) => skill !== undefined);

          this.myForm.get('SkillName')?.setValue(SkillNamesTypeObj)?._rawValidators;

        }

        // if (this.allposts && this.allposts.length > 0) {
        //   const postsTypeObj = this.canddata.item2[0].postID.split(',').map((posts: string) => {
        //     return this.allposts.find(s => s.postID === posts.trim());
        //   }).filter((post: any) => post !== undefined);

        //   this.myForm.get('PostID')?.setValue(postsTypeObj);
        // }


        const postAppliedObj = this.getPostAppliedObject(this.canddata.item2[0].postID);


        if (postAppliedObj) {
          this.myForm.get('PostID')?.setValue(postAppliedObj);
        }

        // debugger
        // this.fa.Source.setValue(this.canddata.item2[0].source),
        // this.fa.SkillName.setValue(this.canddata.item2[0].skillName),
        this.fa.candidateID.setValue(this.canddata.item2[0].candidateID)
        this.fa.Surname.setValue(this.canddata.item2[0].surname),
          this.fa.CandidateFirstName.setValue(this.canddata.item2[0].candidateName),
          this.fa.FatherName.setValue(this.canddata.item2[0].fatherName),
          this.fa.HusbandName.setValue(this.canddata.item2[0].husbandName),
          this.fa.Address.setValue(this.canddata.item2[0].address),
          this.fa.City.setValue(this.canddata.item2[0].city),
          this.fa.State.setValue(this.canddata.item2[0].state),
          this.fa.Mobile.setValue(this.canddata.item2[0].mobile),
          this.fa.CandidateEmail.setValue(this.canddata.item2[0].candidateEmail),
          this.fa.Tno.setValue(this.canddata.item2[0].tno),
          this.fa.LanguagesKnown.setValue(this.canddata.item2[0].languagesKnown),
          this.fa.CurrentCTC.setValue(this.canddata.item2[0].currentCTC),
          this.fa.ExpectedCTC.setValue(this.canddata.item2[0].expectedCTC),
          this.fa.NoticePeriod.setValue(this.canddata.item2[0].noticePeriod),
          this.fa.TotalExperience.setValue(this.canddata.item2[0].totalExperience),
          this.fa.Course1.setValue(this.canddata.item2[0].course1),
          this.fa.School1.setValue(this.canddata.item2[0].school1),
          this.fa.Yearofpassing1.setValue(this.canddata.item2[0].yearofpassing1),
          this.fa.PercentageofMarks1.setValue(this.canddata.item2[0].percentageofMarks1),
          this.fa.DistinctionORAwardsReceived1.setValue(this.canddata.item2[0].distinctionORAwardsReceived1),
          this.fa.Course2.setValue(this.canddata.item2[0].course2),
          this.fa.School2.setValue(this.canddata.item2[0].school2),
          this.fa.Yearofpassing2.setValue(this.canddata.item2[0].yearofpassing2),
          this.fa.PercentageofMarks2.setValue(this.canddata.item2[0].percentageofMarks2),
          this.fa.DistinctionORAwardsReceived2.setValue(this.canddata.item2[0].distinctionORAwardsReceived2),
          this.fa.Course3.setValue(this.canddata.item2[0].course3),
          this.fa.School3.setValue(this.canddata.item2[0].school3),
          this.fa.Yearofpassing3.setValue(this.canddata.item2[0].yearofpassing3),
          this.fa.PercentageofMarks3.setValue(this.canddata.item2[0].percentageofMarks3),
          this.fa.DistinctionORAwardsReceived3.setValue(this.canddata.item2[0].distinctionORAwardsReceived3),
          this.fa.Course4.setValue(this.canddata.item2[0].course4),
          this.fa.School4.setValue(this.canddata.item2[0].school4),
          this.fa.Yearofpassing4.setValue(this.canddata.item2[0].yearofpassing4),
          this.fa.PercentageofMarks4.setValue(this.canddata.item2[0].percentageofMarks4),
          this.fa.DistinctionORAwardsReceived4.setValue(this.canddata.item2[0].distinctionORAwardsReceived4),
          this.fa.Organization1.setValue(this.canddata.item2[0].organization1),
          this.fa.PositionHeld1.setValue(this.canddata.item2[0].positionHeld1),
          this.fa.StartingSalary1.setValue(this.canddata.item2[0].startingSalary1),
          this.fa.LastDrawnSalary1.setValue(this.canddata.item2[0].lastDrawnSalary1),
          this.fa.Organization2.setValue(this.canddata.item2[0].organization2),
          this.fa.PositionHeld2.setValue(this.canddata.item2[0].positionHeld2),
          this.fa.StartingSalary2.setValue(this.canddata.item2[0].startingSalary2),
          this.fa.LastDrawnSalary2.setValue(this.canddata.item2[0].lastDrawnSalary2),
          this.fa.Organization2.setValue(this.canddata.item2[0].organization2),
          this.fa.PositionHeld2.setValue(this.canddata.item2[0].positionHeld2),
          this.fa.StartingSalary2.setValue(this.canddata.item2[0].startingSalary2),
          this.fa.Organization3.setValue(this.canddata.item2[0].organization3),
          this.fa.PositionHeld3.setValue(this.canddata.item2[0].positionHeld3),
          this.fa.StartingSalary3.setValue(this.canddata.item2[0].startingSalary3),
          this.fa.LastDrawnSalary3.setValue(this.canddata.item2[0].lastDrawnSalary3),
          this.fa.Organization4.setValue(this.canddata.item2[0].organization4),
          this.fa.PositionHeld4.setValue(this.canddata.item2[0].positionHeld4),
          this.fa.StartingSalary4.setValue(this.canddata.item2[0].startingSalary4),
          this.fa.InterviewDate1.setValue(this.canddata.item2[0].interviewDate1),
          this.fa.Interviewer1.setValue(this.canddata.item2[0].interviewer1),
          this.fa.ModeofInterview1.setValue(this.canddata.item2[0].modeofInterview1),
          this.fa.RatingTechinical1.setValue(this.canddata.item2[0].ratingTechnical1),
          this.fa.RatingCommunication1.setValue(this.canddata.item2[0].ratingCommunication1),
          this.fa.RatingTest1.setValue(this.canddata.item2[0].ratingTest1),
          this.fa.Comments1.setValue(this.canddata.item2[0].comments1),
          this.fa.InterviewStatus1.setValue(this.canddata.item2[0].interviewStatus1),
          this.fa.InterviewDate2.setValue(this.canddata.item2[0].interviewDate2),
          this.fa.Interviewer2.setValue(this.canddata.item2[0].interviewer2),
          this.fa.ModeofInterview2.setValue(this.canddata.item2[0].modeofInterview2),
          this.fa.RatingTechinical2.setValue(this.canddata.item2[0].ratingTechnical2),
          this.fa.RatingCommunication2.setValue(this.canddata.item2[0].ratingCommunication2),
          this.fa.RatingTest2.setValue(this.canddata.item2[0].ratingTest2),
          this.fa.Comments2.setValue(this.canddata.item2[0].comments2),
          this.fa.InterviewStatus2.setValue(this.canddata.item2[0].interviewStatus2),
          this.fa.Interviewer3.setValue(this.canddata.item2[0].interviewer3),
          this.fa.ModeofInterview3.setValue(this.canddata.item2[0].modeofInterview3),
          this.fa.RatingTechinical3.setValue(this.canddata.item2[0].ratingTechnical3),
          this.fa.RatingCommunication3.setValue(this.canddata.item2[0].ratingCommunication3),
          this.fa.RatingTest3.setValue(this.canddata.item2[0].ratingTest3),
          this.fa.Comments3.setValue(this.canddata.item2[0].comments3),
          this.fa.InterviewStatus3.setValue(this.canddata.item2[0].interviewStatus3),
          this.fa.HRFeedback.setValue(this.canddata.item2[0].hrFeedback),
          this.fa.JobTitle.setValue(this.canddata.item2[0].jobTitle),
          this.fa.ROL1.setValue(this.canddata.item2[0].roL1),
          this.fa.ROL2.setValue(this.canddata.item2[0].roL2),
          this.fa.ROL3.setValue(this.canddata.item2[0].roL3),
          this.fa.PassportNo.setValue(this.canddata.item2[0].passportNo),
          this.fa.Nationality.setValue(this.canddata.item2[0].nationality),
          this.fa.VendorNameOREmployerName.setValue(this.canddata.item2[0].vendorNameOREmployerName),
          this.fa.IndiaResidenceAddress.setValue(this.canddata.item2[0].indiaResidenceAddress),
          this.fa.ForeignResidenceAddress.setValue(this.canddata.item2[0].foreignResidenceAddress),
          this.fa.DriverLicence.setValue(this.canddata.item2[0].driverLicence),
          this.fa.SSN.setValue(this.canddata.item2[0].ssn)
        this.fa.PIN.setValue(this.canddata.item2[0].pin)

        this.ResumeName = this.canddata.item2[0].resume
        this.OldResumeName = this.canddata.item2[0].resume
      },
      )
  }


  CandidatetypeChange(event: any) {
    console.log(event.value);

    if (event.value === 2) {
      this.candidateRegionTest = true;
    } else {
      this.candidateRegionTest = false;
    }

  }
  openPopup(Id: any): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { candidateId: Id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.Editcandidate()
    });
  }



  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    // if (file) {
    //   this.selectedFile = event.target.files[0];
    // }
    if (file) {
      this.selectedFile = file;
      this.ResumeName = file.name;  // Since file is guaranteed to be defined here, no need for optional chaining
    } else {
      this.ResumeName = ""; // Reset to an empty string if no file is selected
    }
  }


  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.dropdownOpen = false;
    }
  }
  dropdownOpen: boolean = false;

  toggleDropdown() {

    this.dropdownOpen = !this.dropdownOpen;
  }

  onCandidateSubmit() {
    this.submitted = true;
    // debugger
    // stop here if form is invalid
    // this.myForm.markAllAsTouched(); // Mark all fields as touched to trigger validation
    // this.fa.PostID.updateValueAndValidity(); // Trigger validation check for PostID

    if (this.myForm.invalid) {
      
      window.scrollTo(0, 0);
      return;
    }
    console.log(this.myForm.value, "this.candit");
    this.selectedSkills = this.myForm.value.SkillName.map((skill: { skillName: any; }) => skill.skillName).join(', ');
    // this.canddata = this.myForm.value;
    this.candit = this.myForm.value;





    if (this.candit) {
      this.candit.SkillName = this.selectedSkills;
      this.candit.FinalStatus = (this.myForm.value.FinalStatus ? this.myForm.value.FinalStatus.value : null);
      this.candit.HoldAnyOffer = this.myForm.value.HoldAnyOffer === 'yes';
      this.candit.JobType = (this.myForm.value.JobType ? this.myForm.value.JobType.value : null);
      this.candit.VisaType = (this.myForm.value.VisaType ? this.myForm.value.VisaType.value : null);
      this.candit.CandidateType = (this.myForm.value.CandidateType ? this.myForm.value.CandidateType.value : null);
      this.candit.PostID = this.myForm.value.PostID.postID;
      this.candit.FilePath = this.OldResumeName;

      let currentJobReleaseDate = new Date(this.myForm.get('DOB')?.value);
      currentJobReleaseDate.setDate(currentJobReleaseDate.getDate() + 1);
      this.candit.DOB = currentJobReleaseDate


      if (this.myForm.get('DOJ1')?.value != null) {
        let dateofjoin1 = new Date(this.myForm.get('DOJ1')?.value);
        dateofjoin1?.setDate(dateofjoin1.getDate() + 1);
        this.candit.DOJ1 = dateofjoin1
      } else {
        this.candit.DOJ1 = null
      }


      if (this.myForm.get('DOJ2')?.value != null) {
        let dateofjoin2 = new Date(this.myForm.get('DOJ2')?.value);
        dateofjoin2?.setDate(dateofjoin2.getDate() + 1);
        this.candit.DOJ2 = dateofjoin2
      } else {
        this.candit.DOJ2 = null
      }

      if (this.myForm.get('DOJ3')?.value != null) {
        let dateofjoin3 = new Date(this.myForm.get('DOJ3')?.value);
        dateofjoin3?.setDate(dateofjoin3.getDate() + 1);
        this.candit.DOJ3 = dateofjoin3
      } else {
        this.candit.DOJ3 = null
      }


      if (this.myForm.get('DOL1')?.value != null) {
        let dateofleave1 = new Date(this.myForm.get('DOL1')?.value);
        dateofleave1?.setDate(dateofleave1.getDate() + 1);
        this.candit.DOL1 = dateofleave1
      } else {
        this.candit.DOL1 = null
      }

      if (this.myForm.get('DOL2')?.value != null) {
        let dateofleave2 = new Date(this.myForm.get('DOL2')?.value);
        dateofleave2?.setDate(dateofleave2.getDate() + 1);
        this.candit.DOL2 = dateofleave2
      } else {
        this.candit.DOL2 = null
      }

      if (this.myForm.get('DOL3')?.value != null) {
        let dateofleave3 = new Date(this.myForm.get('DOL3')?.value);
        dateofleave3?.setDate(dateofleave3.getDate() + 1);
        this.candit.DOL3 = dateofleave3
      } else {
        this.candit.DOL3 = null
      }
    }





    if (this.myForm.valid) {

      this.submitted = false;
      const formData = new FormData();

      formData.append('obj', JSON.stringify(this.candit));
      if (this.selectedFile) {
        formData.append('file', this.selectedFile, this.selectedFile.name);
      }
      else {
        formData.append('file', new Blob(), '');
      }



      this.candidateService.addCandidate(formData).subscribe({
        next: (res) => {

          this.submitted = true;
          this.RouterD.navigate(['/candidates']);

        },
        error: (e) => console.error(e)
      });

    }


  }

  navigate() {
    this.routers.navigate([`/candidates`]);  // Replace with your desired path
  }
  cancelClick() {
    this.routers.navigate([`/candidates`]);
  }

}

@Injectable()
export class UploadInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (req.url === "saveUrl") {
      const events: Observable<HttpEvent<unknown>>[] = [0, 30, 60, 100].map(
        (x) =>
          of(<HttpProgressEvent>{
            type: HttpEventType.UploadProgress,
            loaded: x,
            total: 100,
          }).pipe(delay(1000))
      );

      const success = of(new HttpResponse({ status: 200 })).pipe(delay(1000));
      events.push(success);

      return concat(...events);
    }

    if (req.url === "removeUrl") {
      return of(new HttpResponse({ status: 200 }));
    }

    return next.handle(req);
  }
}




