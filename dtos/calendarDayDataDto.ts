export default class CalendarDayDataDto {
  id;
  note;
  date;
  completedDayTaskIds;

  constructor(model: any) {
    this.id = model._id;
    this.note = model.note;
    this.date = model.date;
    this.completedDayTaskIds = model.completedDayTaskIds;
  }
}
