export default class UserDto {
  email;
  id;
  isActivated;

  constructor(model: any) {
    this.id = model._id;
    this.email = model.email;
    this.isActivated = model.isActivated;
  }
}
