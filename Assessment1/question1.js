const EventEmitter = require('events');

class SessionManager extends EventEmitter {

    constructor() {
        super();

        // greet event
        this.on('greet', (username) => {
            console.log(`Hello, ${username}! Welcome.`);
        });

        // Runs only once
        this.once('greet', () => {
            console.log('First login of the day!');
        });

        // exit event
        this.on('exit', (code) => {
            console.log(`Session closed with code ${code}. Goodbye!`);
        });

        // error event
        this.on('error', (message) => {
            console.log(`Error: ${message}`);
        });
    }

    trigger(command, ...args) {
        if (command === 'greet' || command === 'exit') {
            this.emit(command, ...args);
        } else {
            console.log(`Unknown event: ${command}`);
        }
    }
}


// Create SessionManager object
const session = new SessionManager();

// Emit greet three times
session.trigger('greet', 'Manas');
session.trigger('greet', 'Rahul');
session.trigger('greet', 'Aman');

// Print listener count
console.log(
    `Current greet listener count: ${session.listenerCount('greet')}`
);

// Emit exit
session.trigger('exit', 0);

// Unknown event
session.trigger('login');

// Emit error
session.emit('error', 'Something went wrong in the session.');