import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlobuploadComponent } from './blobupload.component';

describe('BlobuploadComponent', () => {
  let component: BlobuploadComponent;
  let fixture: ComponentFixture<BlobuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlobuploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlobuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
