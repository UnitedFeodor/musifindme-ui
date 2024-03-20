export interface FlatUserDto {
    id: number;
    name: string;
    age: number;
    city: string;
    description: string;
    searchingFor: string;
    socials: Map<string, string>;
    email: string;
    artists: FlatArtistDto[];
    genres: GenreDto[];
    instruments: FlatInstrumentDto[];
    releases: FlatReleaseDto[];
    songs: FlatSongDto[];
  }
  
export interface FlatArtistDto {
    id: number;
    name: string;
  }
  
export interface GenreDto {
    id: number;
    name: string;
  
  }
  
export interface FlatInstrumentDto {
    id: number;
    name: string;
  }
  
export interface FlatReleaseDto {
    id: number;
    name: string;
    releaseType: string;
    releaseYear: number;
    recordLabel: string;
    producer: string;
    coverImageUrl: string;
    description: string;
  }
  
export interface FlatSongDto {
    id: number;
    name: string;
  }
  