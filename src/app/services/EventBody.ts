export class EventBody {

    personId: String;
    eventStart: Date;
    endDate: Date;
    category: String;

    setData(personId: String){
        this.personId = personId;
        this.endDate = new Date();
    }
}