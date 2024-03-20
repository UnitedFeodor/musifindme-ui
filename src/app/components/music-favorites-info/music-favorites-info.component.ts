import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { CardModule, GridModule, FormModule } from '@coreui/angular';
import { FlatArtistDto, FlatGenreDto, FlatInstrumentDto, FlatReleaseDto, FlatReleaseWtihArtistsDto, FlatSongDto, FlatSongWithArtistsDto } from '../../interfaces/user';
import { GenreService } from '../../services/genre.service';
import { ArtistService } from '../../services/artist.service';
import { ReleaseService } from '../../services/release.service';
import { SongService } from '../../services/song.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-music-favorites-info',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CardModule, GridModule, FormModule,NgSelectModule,],
  templateUrl: './music-favorites-info.component.html',
  styleUrl: './music-favorites-info.component.scss'
})
export class MusicFavoritesInfoComponent {
  @Input() startingForm!: FormGroup;
  @Output() subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<'forward' | 'back'> = new EventEmitter<'forward' | 'back'>()
  @Output() submitForm: EventEmitter<void> = new EventEmitter<void>(); // maybe submit string
  public musicFavoritesInfoForm!: FormGroup;

  public genres: FlatGenreDto[] = [];
  public artists: FlatArtistDto[] = [];
  public releases: FlatReleaseWtihArtistsDto[] = [];
  public songs: FlatSongWithArtistsDto[] = [];
item: any;

  constructor(
    private _fb: FormBuilder, 
    private genreService: GenreService, 
    private artistService: ArtistService,
    private releaseService: ReleaseService,
    private songService: SongService
  ) {}
 
  ngOnInit() {
    if (this.startingForm){

      let startFormValue: any = this.startingForm;
      console.log('startFormValue',startFormValue)

      // console.log(`let startFormValue in if`)
      this.musicFavoritesInfoForm = this._fb.group({
        genres: [startFormValue.genres, [Validators.required]],
        artists: [startFormValue.artists, [Validators.required]],
        releases: [startFormValue.releases, [Validators.required]],
        songs: [startFormValue.songs, [Validators.required]],
      });

      this.musicFavoritesInfoForm.get('genres')!.updateValueAndValidity();
      this.musicFavoritesInfoForm.get('artists')!.updateValueAndValidity();
      this.musicFavoritesInfoForm.get('releases')!.updateValueAndValidity();
      this.musicFavoritesInfoForm.get('songs')!.updateValueAndValidity();

    } else {
      this.musicFavoritesInfoForm = this._fb.group({
        genres: [[],[Validators.required]],
        artists: [[],[Validators.required]],
        releases: [[],[Validators.required]],
        songs: [[],[Validators.required]],
      })
    }
    this.loadArtists();
    this.loadGenres();
    this.loadReleases();
    this.loadSongs();
    this.subformInitialized.emit(this.musicFavoritesInfoForm);
  }

  loadGenres() {
    this.genreService.getAllGenres().subscribe(
      (data: FlatGenreDto[]) => {
        this.genres = data;
        console.log('Genres fetched successfully:', data);
      },
      error => {
        console.error('Error fetching instruments:', error);
      }
    );
  }

  loadSongs() {
    this.songService.getAllSongs().subscribe(
      (data: FlatSongWithArtistsDto[]) => {
        this.songs = data;
        console.log('Songs fetched successfully:', data);
      },
      error => {
        console.error('Error fetching songs:', error);
      }
    );
  }
  
  loadArtists() {
    this.artistService.getAllArtists().subscribe(
      (data: FlatArtistDto[]) => {
        this.artists = data;
        console.log('Artists fetched successfully:', data);
      },
      error => {
        console.error('Error fetching artists:', error);
      }
    );
  }
  
  loadReleases() {
    this.releaseService.getAllReleases().subscribe(
      (data: FlatReleaseWtihArtistsDto[]) => {
        this.releases = data;
        console.log('Releases fetched successfully:', data);
      },
      error => {
        console.error('Error fetching releases:', error);
      }
    );
  }
  
  customReleaseLabel(release: FlatReleaseWtihArtistsDto): string {
    let artistsLabel: string;
    if (release.artists.length <= 3) {
        artistsLabel = release.artists.map(artist => artist.name).join(', ');
    } else {
        artistsLabel = 'Various Artists';
    }
    return `${release.name} - ${artistsLabel} (${release.releaseYear} - ${release.releaseType})`;
  }

  customSongLabel(song: FlatSongWithArtistsDto): string {
    let artistsLabel: string;
      artistsLabel = song.artists.map(artist => artist.name).join(', ');
    return `${song.name} - ${artistsLabel}`;
  }


  doChangeStep(direction: 'forward' | 'back') {
    this.changeStep.emit(direction);
  }

  onSubmit() {
    console.log('MusicFavoritesInfoComponent submit')
    this.submitForm.emit();
  }

}
