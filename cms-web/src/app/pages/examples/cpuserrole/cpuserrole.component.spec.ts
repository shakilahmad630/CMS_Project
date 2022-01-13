import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuserroleComponent } from './cpuserrole.component';

describe('CpuserroleComponent', () => {
  let component: CpuserroleComponent;
  let fixture: ComponentFixture<CpuserroleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpuserroleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpuserroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
