module.exports = class FinTransDto {
  id;
  sum;
  num;
  type;
  desc;
  date;
  category;
  updatedAt;
  createdAt;

  constructor(model) {
    this.id = model.id;
    this.sum = model.sum;
    this.num = model.num;
    this.type = model.type;
    this.desc = model.desc;
    this.date = model.date;
    this.category = model.category;
    this.updatedAt = model.updatedAt;
    this.createdAt = model.createdAt;
  }
};
