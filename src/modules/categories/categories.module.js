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

module.exports = {
    addNewCategory,
    getCategories,
};
