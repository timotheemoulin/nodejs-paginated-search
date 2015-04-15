var should = require('chai').should(),
    paginatedSearch = require('../index'),
    getFilters = paginatedSearch.getFilters;

describe('#getFilters simple values', function () {
    var filters = getFilters({
        param1: {
            value: 'value1'
        },
        param2: {
            op: '=',
            value: 'value2'
        },
        param3: {
            op: 'like',
            value: 'value3'
        },
        param4: {
            op: 'in',
            value: 'value4'
        },
        param5: {
            op: 'nin',
            value: 'value5'
        }
    });

    it('return a filter object', function () {
        filters.should.be.an('object');
    });

    it('return a filter with property "param1" that equals "value1"', function () {
        filters.param1.should.equal('value1')
    });

    it('return a filter with property "param2" that equals "value2"', function () {
        filters.param2.should.equal('value2')
    });

    it('return a filter with property "param3" that is like "value3"', function () {
        filters.param3.toString().should.equal(new RegExp('^(.)*value3(.)*$', "i").toString())
    });
});

describe('#getFilters conditional array values', function () {
    var filters = getFilters({
        param1: [
            {
                value: 'value1'
            }
        ],
        param2: [
            {
                value: 'value2a',
                condition: false
            },
            {
                value: 'value2b',
                condition: true
            },
            {
                value: 'value2c',
                condition: false
            }
        ]
    });

    it('return a filter object', function () {
        filters.should.be.an('object');
    });

    it('return a filter with property "param1" that equals "value1"', function () {
        filters.param1.should.equal('value1')
    });

    it('return a filter with property "param2" that equals "value2b"', function () {
        filters.param2.should.equal('value2b')
    });
});

describe('#getFilters with source', function () {
    var filters = getFilters({
        param1: [
            {
                value: 'foo',
                source: {
                    foo: 'bar',
                    fooz: 'barz'
                }
            }
        ],
        param2: [
            {
                value: 'foo',
                condition: false,
                source: {
                    foo: 'value2a',
                    fooz: 'barz'
                }
            },
            {
                value: 'foo',
                condition: true,
                source: {
                    foo: 'value2b',
                    fooz: 'barz'
                }
            },
            {
                value: 'foo',
                condition: false,
                source: {
                    foo: 'value2c',
                    fooz: 'barz'
                }
            }
        ]
    });

    it('return a filter object', function () {
        filters.should.be.an('object');
    });
    console.log(filters);

    it('return a filter with property "param1" that equals "value1"', function () {
        filters.param1.should.equal('bar')
    });

    it('return a filter with property "param2" that equals "value2b"', function () {
        filters.param2.should.equal('value2b')
    });
});