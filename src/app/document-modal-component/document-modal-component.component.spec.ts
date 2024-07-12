import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentModalComponentComponent } from './document-modal-component.component';

describe('DocumentModalComponentComponent', () => {
  let component: DocumentModalComponentComponent;
  let fixture: ComponentFixture<DocumentModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentModalComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
