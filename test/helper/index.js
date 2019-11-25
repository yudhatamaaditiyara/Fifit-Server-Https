/**
 * Copyright (C) 2019 Yudha Tama Aditiyara
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const http = require('http');
const https = require('https');
const config = require('./config');
const {Server} = require('../../');

/**
 * @+
 */
module.exports = {
  createServer(){
    return new Server(config.server);
  },
  createServerDefaultPort(){
    return new Server(config.serverDefaultPort);
  },
  createHttpRequest(options){
    return new Promise((resolve) => {
      let buffer = '';
      let headers = {};
      let request = http.get(Object.assign({path: '/'}, options), (response) => {
        headers = response.headers;
        response.setEncoding('utf-8');
        response.on('data', string => buffer += string);
        response.on('end', () => {
          resolve({buffer, headers, request, response});
          request.destroy();
        });
      });
    });
  },
  createHttpSecureRequest(options){
    return new Promise((resolve) => {
      let buffer = '';
      let headers = {};
      let request = https.get(Object.assign({rejectUnauthorized: false, path: '/'}, options), (response) => {
        headers = response.headers;
        response.setEncoding('utf-8');
        response.on('data', string => buffer += string);
        response.on('end', () => {
          resolve({buffer, headers, request, response});
          request.destroy();
        });
      });
    });
  }
};