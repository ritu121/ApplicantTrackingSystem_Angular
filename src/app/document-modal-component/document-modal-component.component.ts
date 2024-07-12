import { Component, Input, viewChild} from '@angular/core';
// import { PdfViewerComponent, PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-document-modal-component',
  // standalone: true,
  // imports: [],
  templateUrl: './document-modal-component.component.html',
  styleUrl: './document-modal-component.component.scss'
})  
export class DocumentModalComponent {


  pdfSrc: string = 'https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf';
  currentPage: number = 1;

  onDocumentLoadComplete(pdf: any) {
    console.log('PDF loaded', pdf);
  }


}
