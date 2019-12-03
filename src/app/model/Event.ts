import {Person} from './Person';

enum EventCategory {
  Holiday,
  SickLeave,
  WorkFromHome
}

export class Event {

    person: Person;
    eventStart: Date;
    eventEnd: Date;
    category: EventCategory;

    public setDates(startDate: Date, endDate: Date) {
      this.eventStart = startDate;
      this.eventEnd = endDate;
    }
}