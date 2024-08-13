export default class CalendarDayTaskDto {
  id;
  text;
  dayIds;

  constructor(model: any) {
    this.id = model._id;
    this.text = model.text;
    this.dayIds = model.dayIds;
  }
}
