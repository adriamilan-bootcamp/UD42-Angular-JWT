import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Character } from '../models/character.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  baseUrl:string = "https://faker-rick-morty-api.herokuapp.com"

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.baseUrl + "/characters")
  }

  createCharacter(data:any): Observable<any> {
    return this.http.post(this.baseUrl + "/characters", data)
  }

  updateCharacter(id:any, data:any): Observable<any> {
    return this.http.put(this.baseUrl + "/characters/" + id, data)
  }

  delete(id:any): Observable<any> {
    return this.http.delete(this.baseUrl + "/characters/" + id)
  }

  getCharacter(id: any): Observable<any> {
    return this.http.get<Character>(this.baseUrl + "/characters/" + id )
  }

  findByName(title: any): Observable<any> {
    return this.http.get<Character[]>(this.baseUrl + "/characters?" + title )
  }

}
