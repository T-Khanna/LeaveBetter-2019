import {Person} from './Person';

export enum EventCategory {
  Holiday,
  SickLeave,
  WorkFromHome
}

export class Event {
    person: Person;
    eventStart: Date;
    eventEnd: Date;
    category: EventCategory;
}

export class EventBuilder {
  event: Event;

  constructor() {
    this.event = new Event();
  }

  withDates(startDate: Date, endDate: Date) {
    this.event.eventStart = startDate;
    this.event.eventEnd = endDate;
    return this;
  }

  withCategory(category: EventCategory) {
    this.event.category = category;
    return this;
  }

  withPerson(person: Person) {
    this.event.person = person;
    return this;
  }

  build(): Event {
    return this.event;
  }
}
