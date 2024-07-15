module.exports = class DiagramChapterDto {
  id;
  name;
  unit;

  constructor(model) {
    this.id = model._id;
    this.name = model.name;
    this.unit = model.unit;
  }
};
