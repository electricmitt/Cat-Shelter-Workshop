const url = require('url');
const fs = require('fs');
const path = require('path');
const cats = require('../data/cats');

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;
    if(pathname === '/' && req.method === 'GET') {
        //Implement the logic for showing the home html view
        let filePath = path.normalize(path.join(__dirname, '../views/home/index.html'))
    } else {
        return true;
    }
}