const FinTransCategory = require('../models/FinTransCategory');
const FinTransCategoryDto = require('../dtos/finTransCategoryDto');
const FinTrans = require('../models/FinTrans');
const FinTransDto = require('../dtos/finTransDto');

class financeService {
  // categories
  async getAllTransCategory(userId) {
    const categories = await FinTransCategory.find({ userId });
    if (!categories) {
      return [];
    } else {
      return categories.map(
        (transCategory) => new FinTransCategoryDto(transCategory)
      );
    }
  }
  async updateTransCategory(userId, transCategory) {
    if (!transCategory.id) {
      const createdCategory = await FinTransCategory.create({
        userId,
        type: transCategory.type,
        name: transCategory.name,
      });
      const categoryDto = new FinTransCategoryDto(createdCategory);
      return categoryDto ?? null;
    }
  }
  // transactions
  async getAllTransactions(userId) {
    const transactions = await FinTrans.find({ userId });
    if (!transactions) {
      return [];
    } else {
      return transactions.map((trans) => new FinTransDto(trans));
    }
  }
  async updateTransaction(userId, trans) {
    if (trans.id) {
      const updatedTrans = await FinTrans.findOne({ userId, _id: trans.id });
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
        const transDto = new FinTransDto(updatedTrans);
        return transDto ?? null;
      } else {
        return null;
      }
    } else {
      const createdTrans = await FinTrans.create({
        userId,
        sum: trans.sum,
        num: trans.num,
        type: trans.type,
        desc: trans.desc,
        date: trans.date,
        category: trans.category,
      });
      const transDto = new FinTransDto(createdTrans);
      return transDto ?? null;
    }
  }
  async delTransaction(userId, trans) {
    const deletedTrans = await FinTrans.deleteOne({ userId, _id: trans.id });
    if (deletedTrans) {
      return { id: trans.id };
    } else {
      return null;
    }
  }
}

module.exports = new financeService();
