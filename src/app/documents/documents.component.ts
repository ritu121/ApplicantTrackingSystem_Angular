import { Component,OnInit} from '@angular/core';
import { ModalComponent } from '../documentmodal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-documents',
  // standalone: true,
  // imports: [],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent {

  constructor(public dialog: MatDialog) {}

  openPopup(): void {
    const dialogRef = this.dialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  } 
}







