import DiagramChapter from '../models/DiagramChapter';
import DiagramDataItem from '../models/DiagramDataItem';
import DiagramCategory from '../models/DiagramCategory';
import DiagramChapterDto from '../dtos/diagramChapterDto';
import DiagramDataItemDto from '../dtos/diagramDataItemDto';
import DiagramCategoryDto from '../dtos/diagramCategoryDto';

class diagramService {
  // chapters
  async getChapterList(userId: any, menuId: any) {
    const categories = await DiagramChapter.find({ userId, menuId });
    if (!categories) {
      return [];
    } else {
      return categories.map(
        (transCategory: any) => new DiagramChapterDto(transCategory)
      );
    }
  }
  async updateChapter(userId: any, item: any) {
    if (!item.id) {
      const createdCategory = await DiagramChapter.create({
        userId,
        name: item.name,
        unit: item.unit,
        menuId: item.menuId,
      });
      const categoryDto = new DiagramChapterDto(createdCategory);
      return categoryDto ?? null;
    } else {
      const editChapter = await DiagramChapter.findOne({
        userId,
        _id: item.id,
      });
      if (editChapter) {
        editChapter.name = item.name;
        editChapter.unit = item.unit;
        editChapter.updatedAt = +new Date();
        await editChapter.save();
        const chapterDto = new DiagramChapterDto(editChapter);
        return chapterDto;
      } else {
        return null;
      }
    }
  }
  async deleteChapter(userId: any, id: any) {
    const item = await DiagramChapter.deleteOne({ userId, _id: id });
    if (!item) {
      return;
    } else {
      return id;
    }
  }

  // categories
  async getCategoryList(userId: any, chapterId: any) {
    const categories = await DiagramCategory.find({ userId, chapterId });
    if (!categories) {
      return [];
    } else {
      return categories.map((cat: any) => new DiagramCategoryDto(cat));
    }
  }
  async updateCategory(userId: any, item: any) {
    if (!item.id) {
      const createdCategory = await DiagramCategory.create({
        userId,
        name: item.name,
        chapterId: item.chapterId,
      });
      const categoryDto = new DiagramCategoryDto(createdCategory);
      return categoryDto ?? null;
    } else {
      const editCategory = await DiagramCategory.findOne({
        userId,
        _id: item.id,
      });
      if (editCategory) {
        editCategory.name = item.name;
        editCategory.updatedAt = +new Date();
        await editCategory.save();
        const categoryDto = new DiagramCategoryDto(editCategory);
        return categoryDto;
      } else {
        return null;
      }
    }
  }
  async deleteCategory(userId: any, id: any) {
    const item = await DiagramCategory.deleteOne({ userId, _id: id });
    if (!item) {
      return;
    } else {
      return id;
    }
  }
  // data
  async getDataList(userId: any, chapterId: any, categoryId: any) {
    let dataList;
    if (categoryId === '1') {
      dataList = await DiagramDataItem.find({ userId, chapterId });
    } else {
      dataList = await DiagramDataItem.find({ userId, categoryId });
    }

    if (!dataList) {
      return [];
    } else {
      return dataList.map((trans: any) => new DiagramDataItemDto(trans));
    }
  }

  async updateItem(userId: any, item: any) {
    if (!item.id) {
      const createdItem = await DiagramDataItem.create({
        userId,
        name: item.name,
        desc: item.desc,
        date: item.date,
        value: item.value,
        chapterId: item.chapterId,
        categoryId: item.categoryId,
      });
      const itemDto = new DiagramDataItemDto(createdItem);
      return itemDto ?? null;
    } else {
      const editItem: any = await DiagramDataItem.findOne({
        userId,
        _id: item.id,
      });
      if (editItem) {
        editItem.name = item.name;
        editItem.desc = item.desc;
        editItem.date = item.date;
        editItem.value = item.value;
        editItem.updatedAt = +new Date();
        editItem.categoryId = item.categoryId;
        await editItem.save();
        const itemDto = new DiagramDataItemDto(editItem);
        return itemDto;
      } else {
        return null;
      }
    }
  }

  async deleteItem(userId: any, id: any) {
    const item = await DiagramDataItem.deleteOne({ userId, _id: id });
    if (!item) {
      return;
    } else {
      return id;
    }
  }
}

export default new diagramService();
