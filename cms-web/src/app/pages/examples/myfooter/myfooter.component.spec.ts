import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFooterComponent } from './myfooter.component';

describe('FooterComponent', () => {
  let component: MyFooterComponent;
  let fixture: ComponentFixture<MyFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
