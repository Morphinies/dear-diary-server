const ListItem = require('../models/ListItem');
const ListItemDto = require('../dtos/ListItemDto');

class ListsService {
  async getList(userId, menuId) {
    const list = await ListItem.find({ userId, menuId: menuId });
    if (!list) {
      return [];
    } else {
      return list.map((item) => new ListItemDto(item));
    }
  }
  async updateItem(userId, item) {
    if (item.id) {
      const updatedList = await ListItem.findOne({ userId, _id: item.id });
      if (updatedList) {
        updatedList.text = item.text;
        updatedList.sort = item.sort;
        updatedList.updatedAt = +new Date();
        updatedList.deadline = item.deadline;
        updatedList.priority = item.priority;
        updatedList.isCompleted = item.isCompleted;
        await updatedList.save();
        const listDto = new ListItemDto(updatedList);
        return listDto;
      } else {
        return null;
      }
    } else {
      const createdList = await ListItem.create({
        userId,
        text: item.text,
        sort: item.sort,
        menuId: item.menuId,
        deadline: item.deadline,
        priority: item.priority,
        isCompleted: item.isCompleted,
      });
      const listDto = new ListItemDto(createdList);
      return listDto ?? null;
    }
  }
  async deleteItem(userId, item_id) {
    const item = await ListItem.deleteOne({ userId, _id: item_id });
    if (!item) {
      return;
    } else {
      return item_id;
    }
  }
  async updateItemSort(userId, item) {
    const sortingListItem = await ListItem.findOne({
      _id: item.id,
      userId,
    });
    const listItemSortNew = item.sort;
    const listItemSortOld = sortingListItem.sort;

    if (listItemSortNew < listItemSortOld) {
      await ListItem.updateMany(
        {
          sort: { $gte: listItemSortNew, $lte: listItemSortOld },
          _id: { $ne: item.id },
        },
        { $inc: { sort: 1 } }
      );
    } else if (listItemSortNew > listItemSortOld) {
      await ListItem.updateMany(
        {
          sort: { $gte: listItemSortOld, $lte: listItemSortNew },
          _id: { $ne: item.id },
        },
        { $inc: { sort: -1 } }
      );
    }
    if (listItemSortNew !== listItemSortOld) {
      // установки сортировки у задачи
      await ListItem.findOneAndUpdate(
        { _id: item.id },
        {
          $set: {
            updatedAt: +new Date(),
            sort: listItemSortNew,
          },
        }
      );
    }
    // массив задач
    return this.getList(userId, item.menuId);
  }
}

module.exports = new ListsService();
