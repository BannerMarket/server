const Category = require('../../models/category.model');
const { send } = require('../../utils/response-utils');
const { handleError } = require('../../utils/error-handler');
const mongoose = require('mongoose');

const replaceIdWithCategories = (categoryIds, categories) => {
    return categoryIds.map(categoryId => categories.find(category => category._id == categoryId));
};

// @desc Get category by id
// @access Public
exports.interceptCategory = async (req, res, next) => {
  try {
      const id = req.params.id;
      const category = await Category.findById(id);

      if (!category) {
          return send(res, 404, `Category with id ${id} was not found`);
      }

      req.category = category;
      next();
  } catch (e) {
      handleError(res, e, 500);
  }
};

// @desc Get banners with full category data instead of only categoryIds
exports.resolveCategories = async (banners) => {
    const categoryIds = banners
        .map(banner => banner.categories)
        .reduce((categoryIds, curr) => categoryIds.concat(curr), []);

    const query = {'_id': {$in: categoryIds.map(categoryId => mongoose.Types.ObjectId(categoryId, {}))}};
    const categories = await Category.find(query);

    return banners
        .map(banner => ({...banner, categories: replaceIdWithCategories(banner.categories, categories)}));
};

// @desc Add new category
// @route POST /categories
// @access Public
// todo make access Private
exports.addNewCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        send(res, 200, null, category);
    } catch (e) {
        handleError(res, e, 500);
    }
};

// @desc Get all categories filtered by the query
// @route GET /categories
// @access Public
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});

        send(res, 200, null, categories);
    } catch (e) {
        handleError(res, e, 500);
    }
};

// @desc Get category by id
// @route GET /categories/category/:id
// @access Public
exports.getCategory = (req, res) => {
    const category = req.category;

    if (category) {
        return send(res, 200, null, category);
    }
};

// @desc Edit category by id
// @route POST /categories/category/:id
// @access Public
// todo make access Private
exports.editCategory = async (req, res) => {
    try {
        const category = req.category;

        if (!category) {
            return;
        }

        Object.keys(req.body)
            .forEach(key => category[key] = req.body[key]);

        await category.save();
        send(res, 201, null, category);
    } catch (e) {
        handleError(res, e, 500);
    }
};

// @desc Delete category by id
// @route DELETE /categories/category/:id
// @access Public
// todo make access Private
exports.deleteCategory = async (req, res) => {
    try {
        const category = req.category;

        if (!category) {
            return;
        }

        Object.keys(req.body)
            .forEach(key => category[key] = req.body[key]);

        await category.remove();
        send(res, 204);
    } catch (e) {
        handleError(res, e, 500);
    }
};

