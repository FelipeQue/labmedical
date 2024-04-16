import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsDetailComponent } from './records-detail.component';

describe('RecordsDetailComponent', () => {
  let component: RecordsDetailComponent;
  let fixture: ComponentFixture<RecordsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordsDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecordsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
