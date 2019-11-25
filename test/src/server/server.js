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
const assert = require('assert');
const https = require('https');
const config = require('../../helper/config');
const helper = require('../../helper');

describe('Server', () => {
  it('must be Server#options.host === config.server.host', () => {
    let server = helper.createServer();
    assert.strictEqual(server.options.host, config.server.host);
  });

  it('must be Server#options.port === config.server.port', () => {
    let server = helper.createServer();
    assert.strictEqual(server.options.port, config.server.port);
  });

  it('must be Server#options.options.key === config.server.options.key', () => {
    let server = helper.createServer();
    assert.strictEqual(server.options.options.key, config.server.options.key);
  });

  it('must be Server#options.options.cert === config.server.options.cert', () => {
    let server = helper.createServer();
    assert.strictEqual(server.options.options.cert, config.server.options.cert);
  });

  it('must be Server#resource instanceof https.Server', () => {
    let server = helper.createServer();
    assert.ok(server.resource instanceof https.Server);
  });

  it('must be Server#isStarted === false', () => {
    let server = helper.createServer();
    assert.ok(server.isStarted === false);
  });

  it('must be work createServer()', (done) => {
    let server = helper.createServer();
    server.listen((request, response) => {
      response.end(request.href);
    });
    server.start().then(() => {
      helper.createHttpSecureRequest({
        host: server.options.host,
        port: server.options.port
      }).then(({buffer}) => {
        assert.strictEqual(buffer, 'https://' + server.options.host + ':' + server.options.port + '/');
        server.stop().then(done);
      });
    });
  });

  it('must be work createServerDefaultPort()', (done) => {
    let server = helper.createServerDefaultPort();
    server.listen((request, response) => {
      response.end(request.href);
    });
    server.start().then(() => {
      helper.createHttpSecureRequest({
        host: server.options.host
      }).then(({buffer}) => {
        assert.strictEqual(buffer, 'https://' + server.options.host + '/');
        server.stop().then(done);
      });
    });
  });
});