import * as fs from 'fs';
import listService from './listService';
import CalendarData from '../models/CalendarData';
import CalendarDataDto from '../dtos/calendarDataDto';
import CalendarDayData from '../models/CalendarDayData';
import CalendarDayTask from '../models/CalendarDayTask';
import CalendarDayDataDto from '../dtos/calendarDayDataDto';
import CalendarDayTaskDto from '../dtos/calendarDayTaskDto';

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
  async getTasks(userId: any, menuId: any) {
    const items = await CalendarDayTask.find({ userId, menuId });
    if (!items) {
      return [];
    } else {
      return items.map((item: any) => new CalendarDayTaskDto(item));
    }
  }
  async getCalendarDayDataList(userId: any, menuId: any) {
    const dayDataList = await CalendarDayData.find({ userId, menuId });
    if (!dayDataList) {
      return [];
    } else {
      return dayDataList.map((item: any) => new CalendarDayDataDto(item));
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
      const tasks = await this.getTasks(userId, item.menuId);
      const dayDataList = await this.getCalendarDayDataList(userId, menuId);
      return { ...itemDto, deadlines, dayDataList, tasks };
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
        const dayDataList = await this.getCalendarDayDataList(
          userId,
          updatedItem.menuId
        );

        return { ...itemDto, deadlines, dayDataList };
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
      const dayDataList = await this.getCalendarDayDataList(
        userId,
        createdItem.menuId
      );

      return itemDto ? { ...itemDto, deadlines, dayDataList } : null;
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
      updatedItem.completedDayTaskIds = item.completedDayTaskIds;
      updatedItem.save();
      const itemDto = new CalendarDayDataDto(updatedItem);
      return itemDto;
    } else {
      const createdItem = await CalendarDayData.create({
        userId,
        note: item.note,
        date: item.date,
        menuId: item.menuId,
        completedDayTaskIds: item.completedDayTaskIds,
      });
      const itemDto = new CalendarDayDataDto(createdItem);
      return itemDto ? itemDto : null;
    }
  }
  async updateCalendarDayTask(userId: any, item: any) {
    const updatedItem = await CalendarDayTask.findOne({
      userId,
      _id: item.id,
    });
    if (updatedItem) {
      updatedItem.text = item.text;
      updatedItem.dayIds = item.dayIds;
      updatedItem.save();
      const itemDto = new CalendarDayTaskDto(updatedItem);
      return itemDto;
    } else {
      const createdItem = await CalendarDayTask.create({
        userId,
        text: item.text,
        menuId: item.menuId,
      });
      const itemDto = new CalendarDayTaskDto(createdItem);
      return itemDto ? itemDto : null;
    }
  }
  async deleteCalendarDayTask(userId: any, id: string) {
    const deletedItem = await CalendarDayTask.deleteOne({ userId, _id: id });
    if (deletedItem?.deletedCount) {
      return id;
    } else {
      return;
    }
  }
}

// module.exports = new calendarService();
export default new calendarService();
