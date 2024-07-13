module.exports = class FinTransCategoryDto {
  id;
  name;
  type;

  constructor(model) {
    this.id = model._id;
    this.name = model.name;
    this.type = model.type;
  }
};
