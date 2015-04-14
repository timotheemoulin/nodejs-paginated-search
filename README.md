# Paginated Search

## Installation
```$ npm install git@github.com:timotheemoulin/nodejs-paginated-search.git```

## Usage
First, configure your filter values.
```js
// add filter from query
var filters = PaginatedSearch.getFilters({
    name: {
        op: 'like',
        value: 'John'
    },
    category: '123'
};
```
Then, add your filter to your Mongoose query and add ```.paginatedSearch(req)```
```js
User.find(filters).sort('name').paginatedSearch(req).exec(function (err, users) {
    if (err) {
        return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
        });
    } else {
        res.jsonp(users);
    }
});
```

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2015 Timothée Moulin <[http://timothee-moulin.me/](http://timothee-moulin.me/)>
