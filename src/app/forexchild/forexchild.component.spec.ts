import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexchildComponent } from './forexchild.component';

describe('ForexchildComponent', () => {
  let component: ForexchildComponent;
  let fixture: ComponentFixture<ForexchildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForexchildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForexchildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
