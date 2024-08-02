import ListItem from '../models/ListItem';
import ListItemDto from '../dtos/listItemDto';

class ListService {
  async getList(userId: any, menuId: any) {
    const list = await ListItem.find({ userId, menuId: menuId });
    if (!list) {
      return [];
    } else {
      return list.map((item: any) => new ListItemDto(item));
    }
  }
  async getActiveList(userId: any, menuId: any) {
    const list = await ListItem.find({
      userId,
      menuId: menuId,
      isCompleted: false,
    });
    if (!list) {
      return [];
    } else {
      return list.map((item: any) => new ListItemDto(item));
    }
  }
  async updateItem(userId: any, item: any) {
    if (item.id) {
      const updatedList: any = await ListItem.findOne({ userId, _id: item.id });
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
      const createdList: any = await ListItem.create({
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
  async deleteItem(userId: any, item_id: any) {
    const item = await ListItem.deleteOne({ userId, _id: item_id });
    if (!item) {
      return;
    } else {
      return item_id;
    }
  }
  async updateItemSort(userId: any, item: any) {
    const sortingListItem: any = await ListItem.findOne({
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
  async completeItem(userId: any, item: any) {
    const updatedItem = await ListItem.findOne({
      _id: item.id,
      userId,
    });
    if (updatedItem) {
      updatedItem.isCompleted = true;
      await updatedItem.save();
      return { id: item.id };
    } else {
      return null;
    }
  }
}

export default new ListService();
