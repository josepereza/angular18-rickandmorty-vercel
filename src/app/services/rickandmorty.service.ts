import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/character';

@Injectable({
  providedIn: 'root'
})
export class RickandmortyService {

  constructor() { }

  private readonly baseUrl = 'https://rickandmortyapi.com/api/character';
  private http = inject(HttpClient);

  getCharacters(page: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}?page=${page}`);
  }
}