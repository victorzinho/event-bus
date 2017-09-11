import bus from '../bus.js';

beforeEach(function () {
  bus.stopListenAll();
});

it('sends and listens', function () {
  var obj = {
    value: 57
  };
  bus.listen('test', function (e, msg) {
    expect(msg).toBe(obj);
  });
  bus.send('test', obj);
});

it('stops listening', function () {
  function callback() {
    fail('Callback has been called');
  }

  bus.listen('test', callback);
  bus.stopListen('test', callback);
  bus.send('test');
});

it('stops listening all', function () {
  function callback() {
    fail('Callback has been called');
  }

  bus.listen('test', callback);
  bus.stopListenAll();
  bus.send('test');
});
