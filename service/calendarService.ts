import * as fs from 'fs';
import listService from './listService';
import CalendarData from '../models/CalendarData';
import CalendarDataDto from '../dtos/calendarDataDto';
import CalendarDayData from '../models/CalendarDayData';
import CalendarDayDataDto from '../dtos/calendarDayDataDto';

class calendarService {
  async getDeadlines(userId: any, deadlineIds: any) {
    const deadlines = [];
    for (let deadlineListId of deadlineIds) {
      const listData = await listService.getActiveList(userId, deadlineListId);
      if (listData) {
        for (let itemData of listData) {
          deadlines.push(itemData);
        }
      }
    }
    return deadlines;
  }

  async getCalendarNotes(userId: any, menuId: any) {
    const notes = await CalendarDayData.find({ userId, menuId });
    if (!notes) {
      return [];
    } else {
      return notes.map((item: any) => new CalendarDayDataDto(item));
    }
  }

  async getCalendarData(userId: any, menuId: any) {
    const item = await CalendarData.findOne({ userId, menuId });
    if (!item) {
      return;
    } else {
      // добавление списка задач
      const itemDto = new CalendarDataDto(item);

      const deadlines = await this.getDeadlines(userId, item.deadlineIds);
      const notes = await this.getCalendarNotes(userId, menuId);
      return { ...itemDto, deadlines, notes };
    }
  }
  async updateCalendarData(userId: any, item: any) {
    if (item.id) {
      const updatedItem: any = await CalendarData.findOne({
        userId,
        _id: item.id,
      });
      if (updatedItem) {
        updatedItem.deadlineIds = item.deadlineIds;
        updatedItem.updatedAt = +new Date();
        updatedItem.save();

        const itemDto = new CalendarDataDto(updatedItem);

        const deadlines = await this.getDeadlines(userId, item.deadlineIds);
        const notes = await this.getCalendarNotes(userId, updatedItem.menuId);

        return { ...itemDto, deadlines, notes };
      } else {
        return null;
      }
    } else {
      const createdItem = await CalendarData.create({
        userId,
        menuId: item.menuId,
        deadlineIds: item.deadlineIds,
      });
      const itemDto = new CalendarDataDto(createdItem);

      const deadlines = await this.getDeadlines(userId, item.deadlineIds);
      const notes = await this.getCalendarNotes(userId, createdItem.menuId);

      return itemDto ? { ...itemDto, deadlines, notes } : null;
    }
  }
  async deleteCalendarData(userId: any, itemId: any) {
    const item: any = await CalendarData.findOne({ userId, _id: itemId });
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
  async updateCalendarDayData(userId: any, item: any) {
    const updatedItem = await CalendarDayData.findOne({
      userId,
      date: item.date,
      menuId: item.menuId,
    });
    if (updatedItem) {
      updatedItem.note = item.note;
      updatedItem.save();
      const itemDto = new CalendarDayDataDto(updatedItem);
      return itemDto;
    } else {
      const createdItem = await CalendarDayData.create({
        userId,
        note: item.note,
        date: item.date,
        menuId: item.menuId,
      });
      const itemDto = new CalendarDayDataDto(createdItem);
      return itemDto ? itemDto : null;
    }
  }
}

// module.exports = new calendarService();
export default new calendarService();
