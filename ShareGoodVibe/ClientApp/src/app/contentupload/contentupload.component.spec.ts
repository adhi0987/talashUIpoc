import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentuploadComponent } from './contentupload.component';

describe('ContentuploadComponent', () => {
  let component: ContentuploadComponent;
  let fixture: ComponentFixture<ContentuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentuploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
