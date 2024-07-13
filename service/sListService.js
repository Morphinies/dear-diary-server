const SListItem = require('../models/SListItem');
const SListItemDto = require('../dtos/SListItemDto');

class SListsService {
  async getList(userId, menuId) {
    const list = await SListItem.find({ userId, menuId: menuId });
    if (!list) {
      return [];
    } else {
      return list.map((item) => new SListItemDto(item));
    }
  }
  async updateItem(userId, item) {
    if (item.id) {
      const updatedList = await SListItem.findOne({ userId, _id: item.id });
      if (updatedList) {
        updatedList.text = item.text;
        updatedList.desc = item.desc;
        updatedList.sort = item.sort;
        updatedList.updatedAt = +new Date();
        updatedList.deadline = item.deadline;
        updatedList.priority = item.priority;
        updatedList.isCompleted = item.isCompleted;
        await updatedList.save();
        const listDto = new SListItemDto(updatedList);
        return listDto;
      } else {
        return null;
      }
    } else {
      const createdList = await SListItem.create({
        userId,
        text: item.text,
        desc: item.desc,
        sort: item.sort,
        menuId: item.menuId,
        deadline: item.deadline,
        priority: item.priority,
        isCompleted: item.isCompleted,
      });
      const listDto = new SListItemDto(createdList);
      return listDto ?? null;
    }
  }
  async deleteItem(userId, item_id) {
    const item = await SListItem.deleteOne({ userId, _id: item_id });
    if (!item) {
      return;
    } else {
      return item_id;
    }
  }
  async updateItemSort(userId, item) {
    const sortingListItem = await SListItem.findOne({
      _id: item.id,
      userId,
    });
    const listItemSortNew = item.sort;
    const listItemSortOld = sortingListItem.sort;

    if (listItemSortNew < listItemSortOld) {
      await SListItem.updateMany(
        {
          sort: { $gte: listItemSortNew, $lte: listItemSortOld },
          _id: { $ne: item.id },
        },
        { $inc: { sort: 1 } }
      );
    } else if (listItemSortNew > listItemSortOld) {
      await SListItem.updateMany(
        {
          sort: { $gte: listItemSortOld, $lte: listItemSortNew },
          _id: { $ne: item.id },
        },
        { $inc: { sort: -1 } }
      );
    }
    if (listItemSortNew !== listItemSortOld) {
      // установки сортировки у задачи
      await SListItem.findOneAndUpdate(
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

module.exports = new SListsService();
