const Category = require('../../models/category.model');
const { send } = require('../../utils/response-utils');

function addNewCategory(req, res) {
    const name = req.body.name;
    const parentId = typeof req.body.parentId === 'string' ? req.body.parentId : 'null';
    const sortOrder = typeof req.body.sortOrder === 'number' ? req.body.sortOrder : NaN;

    if (!name || Number.isNaN(sortOrder)) {
        return send(res, 400, `Bad arguments`);
    }

    const category = new Category({name, parentId, sortOrder});

    category.save(err => {
        if (err) {
            return send(res, 500, err);
        }
        send(res, 200, null, category);
    });
}

function getCategories(req, res) {
    const query = req.query;
    Category.find(query, (err, categories) => {
        if (err) {
            return send(res, 500, err);
        }
        send(res, 200, null, categories);
    });
}

function interceptCategory(req, res, next) {
    const id = req.params.id;

    Category.findById(id, (err, category) => {
        if (err) {
            return send(res, 500, err);
        }

        if (!category) {
            return send(res, 404, `Category with id ${id} not found`);
        }
        req.category = category;
        next();
    });
}

function getCategory(req, res) {
    const category = req.category;

    if (category) {
        return send(res, 200, null, category);
    }
}

function editCategory(req, res) {
    const category = req.category;

    if (category) {
        Object.keys(req.body)
            .forEach(key => category[key] = req.body[key]);

        category.save(err => {
            if (err) {
                return send(res, 500, err);
            }
            send(res, 201, null, category);
        });
    }
}

function deleteCategory(req, res) {
    const category = req.category;

    if (category) {
        category.remove(err => {
            if (err) {
                return send(res, 500, err);
            }

            return send(res, 204);
        });
    }
}

module.exports = {
    interceptCategory,
    addNewCategory,
    getCategories,
    editCategory,
    getCategory,
    deleteCategory,
};
