import GraphChapter from '../models/GraphChapter';
import GraphDataItem from '../models/GraphDataItem';
import GraphChapterDto from '../dtos/graphChapterDto';
import GraphDataItemDto from '../dtos/graphDataItemDto';

class graphService {
  // chapters
  async getChapterList(userId: any, menuId: any) {
    const categories = await GraphChapter.find({ userId, menuId });
    if (!categories) {
      return [];
    } else {
      return categories.map(
        (transCategory: any) => new GraphChapterDto(transCategory)
      );
    }
  }
  async updateChapter(userId: any, item: any) {
    if (!item.id) {
      const createdCategory = await GraphChapter.create({
        userId,
        name: item.name,
        unit: item.unit,
        menuId: item.menuId,
      });
      const categoryDto = new GraphChapterDto(createdCategory);
      return categoryDto ?? null;
    } else {
      const editChapter = await GraphChapter.findOne({
        userId,
        _id: item.id,
      });
      if (editChapter) {
        editChapter.name = item.name;
        editChapter.unit = item.unit;
        editChapter.updatedAt = +new Date();
        await editChapter.save();
        const chapterDto = new GraphChapterDto(editChapter);
        return chapterDto;
      } else {
        return null;
      }
    }
  }
  async deleteChapter(userId: any, id: any) {
    const item = await GraphChapter.deleteOne({ userId, _id: id });
    if (!item) {
      return;
    } else {
      return id;
    }
  }
  // data
  async getDataList(userId: any, chapterId: any) {
    let dataList;
    dataList = await GraphDataItem.find({ userId, chapterId });
    if (!dataList) {
      return [];
    } else {
      return dataList.map((trans: any) => new GraphDataItemDto(trans));
    }
  }

  async updateItem(userId: any, item: any) {
    if (!item.id) {
      const createdItem = await GraphDataItem.create({
        userId,
        name: item.name,
        desc: item.desc,
        date: item.date,
        value: item.value,
        chapterId: item.chapterId,
      });
      const itemDto = new GraphDataItemDto(createdItem);
      return itemDto ?? null;
    } else {
      const editItem: any = await GraphDataItem.findOne({
        userId,
        _id: item.id,
      });
      if (editItem) {
        editItem.name = item.name;
        editItem.desc = item.desc;
        editItem.date = item.date;
        editItem.value = item.value;
        editItem.updatedAt = +new Date();
        await editItem.save();
        const itemDto = new GraphDataItemDto(editItem);
        return itemDto;
      } else {
        return null;
      }
    }
  }

  async deleteItem(userId: any, id: any) {
    const item = await GraphDataItem.deleteOne({ userId, _id: id });
    if (!item) {
      return;
    } else {
      return id;
    }
  }
}

export default new graphService();
