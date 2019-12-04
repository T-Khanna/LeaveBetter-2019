import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Event } from '../model/Event';

@Injectable({providedIn: 'root'})
export class EventsService {

  constructor(private http: HttpClient) { }

  addEvent(event) {
    const uri = 'http://localhost:4000/events/add';
    this.http.post(uri, event)
        .subscribe(res => console.log('Done'));
  }
}