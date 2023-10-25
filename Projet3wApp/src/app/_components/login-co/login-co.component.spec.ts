import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCoComponent } from './login-co.component';

describe('LoginCoComponent', () => {
  let component: LoginCoComponent;
  let fixture: ComponentFixture<LoginCoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginCoComponent]
    });
    fixture = TestBed.createComponent(LoginCoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
