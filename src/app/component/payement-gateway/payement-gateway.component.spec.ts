import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayementGatewayComponent } from './payement-gateway.component';

describe('PayementGatewayComponent', () => {
  let component: PayementGatewayComponent;
  let fixture: ComponentFixture<PayementGatewayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayementGatewayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayementGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
