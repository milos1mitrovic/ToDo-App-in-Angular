import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralHolderComponent } from './central-holder.component';

describe('CentralHolderComponent', () => {
  let component: CentralHolderComponent;
  let fixture: ComponentFixture<CentralHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentralHolderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentralHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
