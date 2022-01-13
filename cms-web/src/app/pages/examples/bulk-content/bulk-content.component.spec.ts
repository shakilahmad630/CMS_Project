import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkContentComponent } from './bulk-content.component';

describe('BulkContentComponent', () => {
  let component: BulkContentComponent;
  let fixture: ComponentFixture<BulkContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
