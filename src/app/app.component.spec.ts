import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should contain header', () => {
    const header: HTMLHeadingElement =
      fixture.nativeElement.querySelector('header');
    expect(header).toBeTruthy();
  });
});
