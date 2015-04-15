# Paginated Search

## Installation
Install the plugin from npmjs repository.
```$ npm install paginated-search```

If the npmjs repository should not respond, you can install the plugin from Github.
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
[The MIT License](http://opensource.org/licenses/MIT)

## Contribution
If you would like to improve this plugin, make your changes and send me a pull request.

## Release History
* 0.0.2 Initial Release
=======
Copyright (c) 2015 Timothée Moulin [http://timothee-moulin.me/](http://timothee-moulin.me/)