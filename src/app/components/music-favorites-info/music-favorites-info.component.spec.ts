import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicFavoritesInfoComponent } from './music-favorites-info.component';

describe('MusicFavoritesInfoComponent', () => {
  let component: MusicFavoritesInfoComponent;
  let fixture: ComponentFixture<MusicFavoritesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicFavoritesInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MusicFavoritesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
