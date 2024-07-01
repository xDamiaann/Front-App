import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribuidorPedidosComponent } from './distribuidor-pedidos.component';

describe('DistribuidorPedidosComponent', () => {
  let component: DistribuidorPedidosComponent;
  let fixture: ComponentFixture<DistribuidorPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistribuidorPedidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistribuidorPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
