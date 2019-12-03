import { Component } from '@angular/core';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import dayGridPlugin from '@fullcalendar/daygrid'; // for dayGridMonth view
import { Event } from './model/Event';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LeaveBetter';
  calendarPlugins = [interactionPlugin,  dayGridPlugin];
  event:Event = new Event();

  onCalendarDateChanged(info){
    this.event.setDates(info.start, info.end);
  }

  submitEvent() {
    alert("event submitted");
  }

  constructor() {}
}
