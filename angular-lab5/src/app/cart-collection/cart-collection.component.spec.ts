import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCollectionComponent } from './cart-collection.component';

describe('CartCollectionComponent', () => {
  let component: CartCollectionComponent;
  let fixture: ComponentFixture<CartCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
