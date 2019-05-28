import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisionPageComponent } from './comparision-page.component';

describe('ComparisionPageComponent', () => {
  let component: ComparisionPageComponent;
  let fixture: ComponentFixture<ComparisionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparisionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
