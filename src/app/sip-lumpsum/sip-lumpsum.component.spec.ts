import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SipLumpsumComponent } from './sip-lumpsum.component';

describe('SipLumpsumComponent', () => {
  let component: SipLumpsumComponent;
  let fixture: ComponentFixture<SipLumpsumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SipLumpsumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SipLumpsumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
