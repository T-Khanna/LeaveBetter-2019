import { Component } from '@angular/core';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import dayGridPlugin from '@fullcalendar/daygrid'; // for dayGridMonth view

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LeaveBetter';
  calendarPlugins = [interactionPlugin,  dayGridPlugin];
  constructor() {}
}
