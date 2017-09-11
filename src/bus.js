import $ from 'jquery';

const messageBus = $({});
const callbacks = {};

/**
 * Sends a message to the message bus. All the listeners of the event will
 * get invoked and will receive the specified parameters in the callBack
 * function.
 *
 * @param {string}
 *            name - The name of the message.
 * @param {array}
 *            parameters - An array containing the parameters that will be
 *            sent to the listeners of the event.
 * @return {undefined}
 */
function send(name, parameters) {
  messageBus.trigger(name, parameters);
}

/**
 * Registers a listener of the specified message. Whenever the specified
 * message is sent, the specified callBack function will be invoked passing
 * the parameters specified in the send invocation
 *
 * @param {string}
 *            name - The name of the message.
 * @param {function}
 *            callBack - A function receiving (a) an "event" object and (b)
 *            the sequence of parameters specified in the call to send.
 * @return {undefined}
 */
function listen(name, callBack) {
  function f() {
    try {
      callBack.apply(this, arguments);
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    }
  }
  callbacks[callBack] = f;
  messageBus.bind(name, f);
}

/**
 * Removes a listener of the specified message.
 *
 * @param {string}
 *            name - The name of the message.
 * @param {function}
 *            callBack - The function registered in a previous "listen" call
 * @return {undefined}
 */
function stopListen(name, callBack) {
  messageBus.unbind(name, callbacks[callBack]);
}

function stopListenAll() {
  messageBus.unbind();
}

export default {
  send: send,
  listen: listen,
  stopListen: stopListen,
  stopListenAll: stopListenAll
};
