import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TringularDisplayComponent } from './tringular-display.component';

describe('TringularDisplayComponent', () => {
  let component: TringularDisplayComponent;
  let fixture: ComponentFixture<TringularDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TringularDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TringularDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
