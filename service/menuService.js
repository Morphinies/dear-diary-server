const fs = require('fs');
const Menu = require('../models/menu');
const MenuDto = require('../dtos/menuDto');

class MenuService {
  async getList(userId) {
    const list = await Menu.find({ userId });
    if (!list) {
      return;
    } else {
      return list.map((list) => new MenuDto(list));
    }
  }
  async getItem(userId, id) {
    const item = await Menu.findOne({ userId, _id: id });
    if (!item) {
      return;
    } else {
      return new MenuDto(item);
    }
  }
  async update(userId, item) {
    if (item.id) {
      const updatedList = await Menu.findOne({ userId, _id: item.id });
      if (updatedList) {
        updatedList.icon = item.icon;
        updatedList.name = item.name;
        updatedList.sort = item.sort;
        updatedList.typeId = item.typeId;
        updatedList.updatedAt = +new Date();
        updatedList.save();
        const itemDto = new MenuDto(updatedList);
        return itemDto;
      } else {
        return null;
      }
    } else {
      const createdItem = await Menu.create({
        userId,
        name: item.name,
        sort: item.sort,
        icon: item.icon,
        typeId: item.typeId,
      });
      const itemDto = new MenuDto(createdItem);
      return itemDto ?? null;
    }
  }
  async delete(userId, itemId) {
    const item = await Menu.findOne({ userId, _id: itemId });
    if (item?.icon) {
      fs.unlinkSync(item.icon);
    }
    const deletedItem = await Menu.deleteOne({ userId, _id: itemId });
    if (deletedItem?.deletedCount) {
      return itemId;
    } else {
      return;
    }
  }
}

module.exports = new MenuService();
