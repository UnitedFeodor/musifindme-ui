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
    genres: FlatGenreDto[];
    instruments: FlatInstrumentDto[];
    releases: FlatReleaseDto[];
    songs: FlatSongDto[];
  }
export interface CreateUserDto {
    name: string;
    age: number;
    city: string;
    description: string;
    searchingFor: string;
    socials: { [key: string]: string };
    email: string;
    password: string;
    artists: number[];
    genres: number[];
    instruments: number[];
    releases: number[];
    songs: number[];
  }
  
  export interface FullUserDto {
    id: number;
    name: string;
    age: number;
    city: string;
    description: string;
    searchingFor: string;
    socials: { [key: string]: string };
    email: string;
    artists: FlatArtistDto[];
    genres: FlatGenreDto[];
    instruments: FlatInstrumentDto[];
    releases: FlatReleaseDto[];
    songs: FlatSongDto[];
  }
  
export interface FlatArtistDto {
    id: number;
    name: string;
  }

export interface FlatReleaseWtihArtistsDto {
  id: number;
  name: string;
  releaseType: string;
  releaseYear: number;
  coverImageUrl: string;
  artists: FlatArtistDto[];
}
  
export interface FlatGenreDto {
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

export interface FlatSongWithArtistsDto {
  id: number;
  name: string;
  artists: FlatArtistDto[];
}
  