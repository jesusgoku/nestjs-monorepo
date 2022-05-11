export interface JsonPlaceHolderModuleOptions {
  baseUrl: string;
}

export interface PaginatedResourceOptions {
  limit: number;
  offset: number;
}

export interface UserDto {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressDto;
  phone: string;
  website: string;
  company: CompanyDto;
}

export interface AddressDto {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoDto;
}

export interface GeoDto {
  lat: string;
  lng: string;
}

export interface CompanyDto {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface PostDto {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface PhotoDto {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface AlbumDto {
  id: number;
  userId: number;
  title: string;
}

export interface CommentDto {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface TodoDto {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}
