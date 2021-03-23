import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JwtAuthLibComponent } from './jwt-auth-lib.component';

describe('JwtAuthLibComponent', () => {
  let component: JwtAuthLibComponent;
  let fixture: ComponentFixture<JwtAuthLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JwtAuthLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JwtAuthLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
