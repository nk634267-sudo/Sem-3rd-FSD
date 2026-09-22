const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('greet', () => {
    console.log('Hello! Welcome!');
});

emitter.on('exit', () => {
    console.log('Goodbye! Exiting...');
});

emitter.emit('greet');
emitter.emit('exit');
