module.exports = class MenuDto {
  id;
  name;
  sort;
  icon;
  typeId;

  constructor(model) {
    this.id = model._id;
    this.name = model.name;
    this.sort = model.sort;
    this.icon = model.icon;
    this.typeId = model.typeId;
  }
};
