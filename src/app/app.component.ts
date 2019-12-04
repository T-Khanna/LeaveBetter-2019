import {Component, ViewChild} from '@angular/core';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import dayGridPlugin from '@fullcalendar/daygrid'; // for dayGridMonth view
import {EventBuilder, EventCategory} from './model/Event';
import {FullCalendarComponent} from "@fullcalendar/angular";
import {EventInput} from "@fullcalendar/core/structs/event";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'LeaveBetter';
  calendarPlugins = [interactionPlugin,  dayGridPlugin];
  eventBuilder:EventBuilder = new EventBuilder();
  calendarEvents:EventInput[] = [];

  // references calendar in template
  @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent;

  onCalendarDateChanged(info){
    this.eventBuilder.withDates(info.start, info.end);
  }

  onCategoryChanged(change: MatSelectChange) {
    this.eventBuilder.withCategory(parseInt(change.value));
  }

  submitEvent() {
    let event = this.eventBuilder.build();

    var type:string;
    switch (event.category) {
      case EventCategory.Holiday:
        type = "on annual leave";
        break;
      case EventCategory.WorkFromHome:
        type = "wfh";
        break;
      case EventCategory.SickLeave:
        type = "on sick leave";
        break;
      default:
        alert("Please select a category");
        return;
    }

    var range:string;
    let startDateInclusive = event.eventStart;
    let endDateInclusive = new Date(event.eventEnd.getTime());
    endDateInclusive.setDate(event.eventEnd.getDate() - 1);
    if (startDateInclusive.getTime() == endDateInclusive.getTime()) {
      range = startDateInclusive.toDateString();
    } else {
      range = startDateInclusive.toDateString() + " to " + endDateInclusive.toDateString();
    }

    if (confirm("Are you sure you are/will be " + type + " during " + range + "?")) {
      this.addNewEventToCalendar(event);
    }
  }

  constructor() {}

  // needed for ViewChild to load initialised calendar
  ngAfterViewInit() {
    // let dummyData = {
    //   entries: [
    //     new EventBuilder()
    //       .withDates(new Date(2019, 10, 26), new Date(2019, 11, 2))
    //       .withCategory(EventCategory.Holiday)
    //       .build(),
    //     new EventBuilder()
    //       .withDates(new Date(2019, 11, 14), new Date(2019, 11, 17))
    //       .withCategory(EventCategory.SickLeave)
    //       .build(),
    //     new EventBuilder()
    //       .withDates(new Date(2019, 11, 23), new Date(2020, 0, 6))
    //       .withCategory(EventCategory.WorkFromHome)
    //       .build(),
    //   ]
    // };

    // this.addExistingEventsToCalendar(dummyData);
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

    data.entries.forEach(event => this.addNewEventToCalendar(event));
  }

  addNewEventToCalendar(event) {
    setTimeout(() => {
      this.calendarEvents = this.calendarEvents.concat({
        title: EventCategory[event.category],
        start: event.eventStart,
        end: event.eventEnd
      });
    });
  };

  getCalendar() {
    return this.calendarComponent.getApi();
  }
}
