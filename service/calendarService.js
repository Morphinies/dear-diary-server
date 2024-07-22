const fs = require('fs');
const CalendarDataDto = require('../dtos/menuDto');
const CalendarData = require('../models/CalendarData');

class calendarService {
  async getCalendarData(userId, id) {
    const item = await CalendarData.findOne({ userId, _id: id });
    if (!item) {
      return;
    } else {
      return new CalendarDataDto(item);
    }
  }
  async update(userId, item) {
    if (item.id) {
      const updatedList = await CalendarData.findOne({ userId, _id: item.id });
      if (updatedList) {
        updatedList.icon = item.icon;
        updatedList.name = item.name;
        updatedList.sort = item.sort;
        updatedList.typeId = item.typeId;
        updatedList.updatedAt = +new Date();
        updatedList.save();
        const itemDto = new CalendarDataDto(updatedList);
        return itemDto;
      } else {
        return null;
      }
    } else {
      const createdItem = await CalendarData.create({
        userId,
        name: item.name,
        sort: item.sort,
        icon: item.icon,
        typeId: item.typeId,
      });
      const itemDto = new CalendarDataDto(createdItem);
      return itemDto ?? null;
    }
  }
  async delete(userId, itemId) {
    const item = await CalendarData.findOne({ userId, _id: itemId });
    if (item?.icon) {
      fs.unlinkSync(item.icon);
    }
    const deletedItem = await CalendarData.deleteOne({ userId, _id: itemId });
    if (deletedItem?.deletedCount) {
      return itemId;
    } else {
      return;
    }
  }
}

module.exports = new calendarService();
