import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRowMixedComponent } from './table-row-mixed.component';

describe('TableRowMixedComponent', () => {
  let component: TableRowMixedComponent;
  let fixture: ComponentFixture<TableRowMixedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableRowMixedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableRowMixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
