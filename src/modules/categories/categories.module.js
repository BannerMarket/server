const Category = require('../../models/category.model');

function addNewCategory(req, res) {
    const name = req.body.name;
    const parentId = typeof req.body.parentId === 'string' ? req.body.parentId : 'null';
    const sortOrder = typeof req.body.sortOrder === 'number' ? req.body.sortOrder : NaN;

    if (!name || Number.isNaN(sortOrder)) {
        return res.sendStatus(400);
    }

    const category = new Category({name, parentId, sortOrder});

    category.save(err => {
        if (err) {
            return res.send(err);
        }
        res.status(200).json(category);
    });
}

function getCategories(req, res) {
    const query = req.query;
    Category.find(query, (err, categories) => {
        if (err) {
            return res.send(err);
        }
        res.json(categories);
    });
}

function interceptCategory(req, res, next) {
    const id = req.params.id;

    Category.findById(id, (err, category) => {
        if (err) {
            return res.send(err);
        }

        if (!category) {
            return res.sendStatus(404);
        }
        req.category = category;
        next();
    });
}

function getCategory(req, res) {
    const category = req.category;

    if (category) {
        res.json(category);
    }
}

function editCategory(req, res) {
    const category = req.category;

    if (category) {
        Object.keys(req.body)
            .forEach(key => category[key] = req.body[key]);

        category.save(err => {
            if (err) {
                return res.send(err);
            }
            res.status(201).send(category);
        });
    }
}

function deleteCategory(req, res) {
    const category = req.category;

    if (category) {
        category.remove(err => {
            if (err) {
                return res.send(err);
            }

            return res.sendStatus(204);
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
