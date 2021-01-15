import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

const API_URL = environment.apiUrl;
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  currentArticle: any;

  constructor(private https: HttpClient) 
  { 

  }

  getData(url){
    return this.https.get(`${API_URL}/${url}&apiKey=${API_KEY}`);
  }
}
