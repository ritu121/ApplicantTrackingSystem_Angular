;
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EditEvent, GridComponent, GridDataResult, PageChangeEvent, RemoveEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, filterBy } from '@progress/kendo-data-query';

import { AlertboxModalComponent } from '../alertbox-modal/alertbox-modal.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadService } from '../services/fileupload/file-upload.service';
import { DocumentModalComponent } from '../document-modal-component/document-modal-component.component';



@Component({
  selector: 'app-modal',
  // standalone: true,
  // imports: [GridModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {



  form: any;
  public pageSize = 100;
  public skip = 0;
  // public gridData: any[];
  public sort: SortDescriptor[] = [];
  public multiple = false;
  public allowUnsort = true;
  public currentItem: any;
  public candidateId: string = '';

  uploadedFiles!: Array<any>;


  constructor(
    public modalRef: MatDialogRef<ModalComponent>,
    public dialog: MatDialog,
    private fileUploadService: FileUploadService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      file: [null]
    });
    this.candidateId = data.candidateId
  }

  @ViewChild('file1') Myfile1: any;
  fileToUpload1: File | null = null;
  fileName: '' | undefined;


  ngOnInit(): void {

    this.getallDocuments()

  }
  uploadSaveUrl = "saveUrl"; // should represent an actual API endpoint
  uploadRemoveUrl = "removeUrl"; // should represent an actual API endpoint

  onSelect(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.UploadDocuments(inputElement.files);
    }
  }

  UploadDocuments(files: FileList): void {
    let formData = new FormData();
    formData.append('ID', this.candidateId);
    
    

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      formData.append("file", file, file.name);
    }
    console.log(formData);
    this.fileUploadService.uploadFiles(formData).subscribe(response => {
      if (response) {
        this.getallDocuments()
      }

    }, error => {
      console.error('Upload error', error);
    });
  }

  getallDocuments() {
    this.fileUploadService.getFiles(this.candidateId).subscribe(
      data => (this.uploadedFiles = data),
      error => {
        console.error('Error fetching files data:', error);
      }
    );
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

  close(): void {
    this.modalRef.close();
    return;
  }

  saveFile = (event: any) => {
    console.log(event, "file events");
  }
  editClick(dataId: any) {
    this.currentItem = dataId
    // console.log(dataId, "selected dataId");
  }
  deleteClick(data: any) {

    let candidateId=data.candidate_ID
    let documentId=data.document_ID
    let fileName=data.fileName
    
    const dialogRef = this.dialog.open(AlertboxModalComponent);

    dialogRef.afterClosed().subscribe((result: any) => {

      if (result.confirmed) {
        this.fileUploadService.DeleteDocuments(candidateId,documentId,fileName)
          .subscribe(
            (data: any) => {
              console.log(data,"data");
              
             this.getallDocuments();
            })
      }
    })
  }
 

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.pageSize = event.take;

  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
  }
}
