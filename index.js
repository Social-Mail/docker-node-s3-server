const S3rver = require('s3rver');
const { fromEvent } = require('rxjs');
const { filter } = require('rxjs/operators');

const mountFS = process.env["STORAGE"] ?? "/tmp/s3rver_test_directory";

const instance = new S3rver({
  port: 4569,
  address: '0.0.0.0',
  silent: false,
  directory: '/tmp/s3rver_test_directory',
}).run((err, { address, port } = {}) => {
  if (err) {
    console.error(err);
  } else {
    console.log('now listening at address %s and port %d', address, port);
  }
});

const s3Events = fromEvent(instance, 'event');
s3Events.subscribe((event) => console.log(event));
s3Events
  .pipe(filter((event) => event.Records[0].eventName == 'ObjectCreated:Copy'))
  .subscribe((event) => console.log(event));