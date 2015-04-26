/**
 * Apply a search and pagination to Mongoose query
 */

var mongoose = require('mongoose'),
    Query = mongoose.Query;

var computedFilters = {};

/**
 * Apply the pagination on the current query.
 * @param req, the current request containing the pagin and search objects
 * @return {Query}
 */
Query.prototype.paginatedSearch = function (req) {
    var pagin = {};
    // add pagination
    if (req.query.pagin) {
        pagin = JSON.parse(req.query.pagin);
    } else {
        pagin = {
            limit: 0,
            skip: 0
        };
    }

    return this.skip(pagin.skip).limit(pagin.limit)
};

/**
 * Return an object containing all the filters
 * @param filters, an object {property: value}
 */
exports.getFilters = function (filters) {

    computedFilters = {};

    for (var property in filters) {

        if (!Array.isArray(filters[property])) {
            filters[property] = [filters[property]];
        }

        for (var key in filters[property]) {

            var params = filters[property][key];

            var op = params.op || '=';
            var source = params.source || null;
            var condition = params.hasOwnProperty('condition') ? params.condition : true;

            if (source) {
                var key = typeof params === 'object' ? params.value : params;
                var value = source[key];
            } else {
                var value = typeof params === 'object' ? params.value : params;
            }

            if (value) {
                switch (op) {
                    case '=':
                        _addFilter(property, value, condition);
                        break;
                    case 'like':
                        _addFilter(property, new RegExp('^(.)*' + value + '(.)*$', "i"), condition);
                        break;
                    case 'in':
                        if (!Array.isArray(value)) {
                            value = [value];
                        }
                        _addFilter(property, {$in: value}, condition);
                        break;
                    case 'nin':
                        if (!Array.isArray(value)) {
                            value = [value];
                        }
                        _addFilter(property, {$nin: value}, condition);
                        break;
                }
            } else {
                delete computedFilters[property];
            }
        }
    }

    return computedFilters;
};

/**
 * Add a new filter if the condition returns true
 * @param property
 * @param value
 * @param condition
 * @private
 */
var _addFilter = function (property, value, condition) {

    if (condition === true) {
        computedFilters[property] = value;
    }
};