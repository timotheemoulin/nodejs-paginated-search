# Paginated Search

## Installation
Install the plugin from NPMJs repository.

```$ npm install paginated-search```

If the NPMJs repository should not respond, you can install the plugin from Github.

```$ npm install git@github.com:timotheemoulin/nodejs-paginated-search.git```

Use the ```--save``` option to add the plugin to your *package.json* file.

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

Then, add your filter to your Mongoose query and add ```.paginatedSearch(req)``` after querying your model.

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

## Tests
Test are automated. Just launch the ```npm test``` command to run all the tests.
If you would like to add your own test, you can edit the *test/index.js* file.

## License
[The MIT License](LICENSE-MIT)
Copyright (c) 2015 Timothée Moulin [http://timothee-moulin.me/](http://timothee-moulin.me/)

## Contribution
If you would like to improve this plugin, make your changes and send me a pull request.

## Release History
* 0.0.3 Plugin added to NPMJs
* 0.0.2 Documentation, tests, and license updated
* 0.0.1 Initial Release
