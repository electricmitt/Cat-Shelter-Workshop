const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring')
const cats = require('../data/cats.json');
const breeds = require('../data/breeds.json');
const formidable = require('formidable');


module.exports = (req, res) => {
  const pathname = url.parse(req.url).pathname;
  console.log("[home.js 10]home pathname is ", pathname);
  if (pathname === '/' && req.method === 'GET') {
    // Implement the logic for showing the home html view
    let filePath = path.normalize(
      path.join(__dirname, '../views/home/index.html')
    );
    fs.readFile(filePath, (err, data) => {
      if(err) {
        console.log(err);
        res.write(404, {
          "Content-Type": "text/plain"
        });
        res.write(404);
        res.end();
        return
      } 
      res.writeHead(200, {
        "Content-Type": "text/html" 
      });
      res.write(data);
      res.end();
    });

  } else if (pathname === '/cats/add-cat' && req.method === 'GET') {
    let filePath = path.normalize(path.join(__dirname, '../views/addCat.html'));

    const index = fs.createReadStream(filePath);

    index.on('data', (data) => {
      let catBreedPlaceHolder = breeds.map( (breed) => `<option value="${breed}">${breed}</option>`);
      let modifiedData = data.toString().replace('{{catBreeds}}', catBreedPlaceHolder);
      res.write(modifiedData);
    });
    index.on('end', () => {
      res.end();
    })
    index.on('error', (err) => {
      console.log(err);
    })

  } else if (pathname === '/cats/add-breed' && req.method === 'GET') {
    let filePath = path.normalize(path.join(__dirname, '../views/addBreed.html'));

    const index = fs.createReadStream(filePath);

    index.on('data', (data) => {
      res.write(data);
    });
    index.on('end', () => {
      res.end();
    })
    index.on('error', (err) => {
      console.log(err);
    })
  } else if (pathname === '/cats/add-cat' && req.method === 'POST') {

    const index = fs.createReadStream(filePath);

    index.on('data', (data) => {
      res.write(data);
    });
    index.on('end', () => {
      res.end();
    })
    index.on('error', (err) => {
      console.log(err);
    })

  } else if (pathname === '/cats/add-breed' && req.method === 'POST') {
    let formData = "";

    req.on('data', (data) => {
      formData += data;
      let parsedData = qs.parse(formData);

      fs.readFile('./data/breeds.json', 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        let currentBreeds = JSON.parse(data);
        console.log(currentBreeds);
        console.log(parsedData.breed);
        // currentBreeds.push(parsedData.breed);
        console.log(currentBreeds);
        currentBreeds.push(parsedData.breed);
        let updatedBreeds = JSON.stringify(currentBreeds);
          console.log(updatedBreeds)

        fs.writeFile('./data/breeds.json', updatedBreeds, 'utf-8', () => {
          console.log
        })

        res.writeHead(201, { location: '/'})
        res.end();
      })
    });
  } else {
    return true;
  }
} 