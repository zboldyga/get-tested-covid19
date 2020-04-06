// Express
// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const prerenderIO = require('prerender-node');
//
// const PORT = 3000;
//
// const STATIC = path.resolve(__dirname, 'build');
// const INDEX = path.resolve(STATIC, 'index.html');
//
// const app = express();
//
// // web crawlers get pre-rendered / cached site, for SEO purposes.
// app.use(prerenderIO.set('prerenderToken', '9p5pJvs6jaM8NsCnllsU'));
//
//
// app.use(bodyParser.json());
//
// // Static content
// app.use(express.static(STATIC));
//
// // All GET request handled by INDEX file
// app.get('*', function (req, res) {
//   res.sendFile(INDEX);
// });
//
// // Start server
// app.listen(PORT, function () {
//   console.log('Server up and running on ', `http://localhost:${PORT}/`);
// });
//
//
//


import path from 'path'
import fs from 'fs'

import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

import App from '../App'
const STATIC = path.resolve(__dirname, 'build');
const INDEX = path.resolve(STATIC, 'index.html');

const PORT = 3000
const app = express()

const router = express.Router()


const serverRenderer = (req, res, next) => {
    fs.readFile(INDEX, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return res.status(500).send('An error occurred')
        }
        return res.send('hi there!');

        if(data.indexOf('root')) {
            return res.send('hi there!');
        }

        return res.send(
            data.replace(
                '<div id="root"></div>',
                `<div id="root"><span>Hey there!</span>${ReactDOMServer.renderToString(<App />)}</div>`
            )
        )
    })
}

router.use('*', serverRenderer);

// router.use(
//     express.static(STATIC, { maxAge: '30d' })
// );

app.use(router);
app.listen(PORT, () => {
    console.log('Server up and running on ', `http://localhost:${PORT}/`);
});
