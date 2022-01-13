import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagecpuserComponent } from './managecpuser.component';

describe('ManagecpuserComponent', () => {
  let component: ManagecpuserComponent;
  let fixture: ComponentFixture<ManagecpuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagecpuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagecpuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
