module.exports = class MenuDto {
  id;
  deadlineMenuList;

  constructor(model) {
    this.id = model._id;
    this.name = model.deadlineMenuList;
  }
};
