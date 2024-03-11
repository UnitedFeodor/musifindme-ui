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
    instruments: InstrumentDto[];
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
  
export interface InstrumentDto {
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
  