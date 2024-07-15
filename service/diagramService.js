const DiagramChapter = require('../models/DiagramChapter');
const DiagramDataItem = require('../models/DiagramDataItem');
const DiagramCategory = require('../models/DiagramCategory');
const DiagramChapterDto = require('../dtos/diagramChapterDto');
const DiagramDataItemDto = require('../dtos/diagramDataItemDto');
const DiagramCategoryDto = require('../dtos/diagramCategoryDto');

class diagramService {
  // chapters
  async getChapterList(userId, menuId) {
    const categories = await DiagramChapter.find({ userId, menuId });
    if (!categories) {
      return [];
    } else {
      return categories.map(
        (transCategory) => new DiagramChapterDto(transCategory)
      );
    }
  }
  async updateChapter(userId, item) {
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
  async deleteChapter(userId, id) {
    const item = await DiagramChapter.deleteOne({ userId, _id: id });
    if (!item) {
      return;
    } else {
      return id;
    }
  }

  // categories
  async getCategoryList(userId, chapterId) {
    const categories = await DiagramCategory.find({ userId, chapterId });
    if (!categories) {
      return [];
    } else {
      return categories.map((cat) => new DiagramCategoryDto(cat));
    }
  }
  async updateCategory(userId, item) {
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
  async deleteCategory(userId, id) {
    const item = await DiagramCategory.deleteOne({ userId, _id: id });
    if (!item) {
      return;
    } else {
      return id;
    }
  }
  // data
  async getDataList(userId) {
    const transactions = await DiagramDataItem.find({ userId });
    if (!transactions) {
      return [];
    } else {
      return transactions.map((trans) => new DiagramDataItemDto(trans));
    }
  }
  async updateTransaction(userId, trans) {
    if (trans.id) {
      const updatedTrans = await DiagramDataItem.findOne({
        userId,
        _id: trans.id,
      });
      if (updatedTrans) {
        updatedTrans.sum = trans.sum;
        updatedTrans.num = trans.num;
        updatedTrans.type = trans.type;
        updatedTrans.desc = trans.desc;
        updatedTrans.date = trans.date;
        updatedTrans.title = trans.title;
        updatedTrans.updatedAt = +new Date();
        updatedTrans.category = trans.category;
        updatedTrans.save();
        const transDto = new DiagramDataItemDto(updatedTrans);
        return transDto ?? null;
      } else {
        return null;
      }
    } else {
      const createdTrans = await DiagramDataItem.create({
        userId,
        sum: trans.sum,
        num: trans.num,
        type: trans.type,
        desc: trans.desc,
        date: trans.date,
        category: trans.category,
      });
      const transDto = new DiagramDataItemDto(createdTrans);
      return transDto ?? null;
    }
  }
  async delTransaction(userId, trans) {
    const deletedTrans = await DiagramDataItem.deleteOne({
      userId,
      _id: trans.id,
    });
    if (deletedTrans) {
      return { id: trans.id };
    } else {
      return null;
    }
  }
}

module.exports = new diagramService();
