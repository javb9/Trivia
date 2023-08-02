import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http:HttpClient) {}

  getCountrie():any{
    return this.http.get('https://restcountries.com/v3.1/all');
  }

}
