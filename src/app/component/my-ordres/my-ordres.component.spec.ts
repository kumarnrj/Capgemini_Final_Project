import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrdresComponent } from './my-ordres.component';

describe('MyOrdresComponent', () => {
  let component: MyOrdresComponent;
  let fixture: ComponentFixture<MyOrdresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOrdresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrdresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
