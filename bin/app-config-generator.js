#!/usr/bin/env node
const getUrl = require('../lib/scheduling');
let url = process.argv[2].replace('*-api', process.argv[3])
getUrl(url, process.argv[4], process.argv[5], process.argv[3])