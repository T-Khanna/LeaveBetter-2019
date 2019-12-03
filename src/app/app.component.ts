import {Component, ViewChild} from '@angular/core';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import dayGridPlugin from '@fullcalendar/daygrid'; // for dayGridMonth view
import {Event} from './model/Event';
import {FullCalendarComponent} from "@fullcalendar/angular";
import {EventInput} from "@fullcalendar/core/structs/event";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'LeaveBetter';
  calendarPlugins = [interactionPlugin,  dayGridPlugin];
  event:Event = new Event();
  calendarEvents:EventInput[];

  // references calendar in template
  @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent;


  onCalendarDateChanged(info){
    this.event.setDates(info.start, info.end);
  }

  submitEvent() {
    alert("event submitted");
  }

  constructor() {}

  ngOnInit() {
    this.calendarEvents = [];
  }

  // needed for ViewChild to load initialised calendar
  ngAfterViewInit() {
    let dummyData = {
      entries: [
        {
          start_date: new Date(2019, 10, 26),
          end_date: new Date(2019, 11, 2),
        },
        {
          start_date: new Date(2019, 11, 14),
          end_date: new Date(2019, 11, 17),
        },
        {
          start_date: new Date(2019, 11, 23),
          end_date: new Date(2020, 0, 6),
        },
      ]
    };

    this.addExistingEventsToCalendar(dummyData);
  }

  addExistingEventsToCalendar(data) {
    let calendar = this.getCalendar();

    let currentDate = calendar.getDate();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    let monthStartDate = new Date(year, month, 1);
    // HACK ALERT: below is a cheeky hack to get last day of the month
    let monthEndDate = new Date(year, month + 1, 0);

    console.log("DATES TO CHECK");
    console.log("Start of month: " + monthStartDate);
    console.log("End of month: " + monthEndDate);
    console.log("Today: " + currentDate);

    console.log("ENTRIES");
    console.log(data);

    data.entries.forEach(entry => {
      this.addNewEventToCalendar(
        "Hello world", entry.start_date, entry.end_date
      );

    })
  }

  addNewEventToCalendar(title, startDate, endDate) {
    setTimeout(() => {
      this.calendarEvents = this.calendarEvents.concat({
        title: title,
        start: startDate,
        end: endDate
      });
    });
  };

  getCalendar() {
    return this.calendarComponent.getApi();
  }
}
