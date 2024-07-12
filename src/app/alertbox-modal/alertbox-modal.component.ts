import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UploadModule } from '@progress/kendo-angular-upload';
import { GridModule } from '@progress/kendo-angular-grid';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EditEvent, GridComponent, GridDataResult, PageChangeEvent, RemoveEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, filterBy } from '@progress/kendo-data-query';
import { FileUploadService } from '../services/fileupload/file-upload.service';

@Component({
  selector: 'app-alertbox-modal',
  standalone: true,
  imports: [UploadModule,GridModule],
  templateUrl: './alertbox-modal.component.html',
  styleUrl: './alertbox-modal.component.scss'
})
export class AlertboxModalComponent {
  public pageSize = 100;
  public skip = 0;
  // public gridData: any[];
  public sort: SortDescriptor[] = [];
  public multiple = false;
  public allowUnsort = true;
  public currentItem: any;

  constructor(public modalRef: MatDialogRef<AlertboxModalComponent>,private fileUploadService: FileUploadService) { }

  onNoClick(): void {
    this.modalRef.close();
  }

  onYesClick(): void {
    this.modalRef.close({confirmed: true});
  }

  onSelect(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if(inputElement.files) {
     
    }
  }


  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.pageSize = event.take;

  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;

  }

}
