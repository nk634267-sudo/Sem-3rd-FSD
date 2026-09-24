const EventEmitter = require('events');

class Element extends EventEmitter {

    constructor(name, parent = null) {
        super();

        this.name = name;
        this.parent = parent;
    }

    addEventListener(type, handler) {
        this.on(type, handler);
    }

    removeEventListener(type, handler) {
        this.off(type, handler);
    }

    dispatchEvent(type, data) {

        const event = {
            type: type,
            target: this,
            currentTarget: this,
            data: data,
            stopped: false,

            stopPropagation() {
                this.stopped = true;
            }
        };

        let current = this;

        while (current) {

            event.currentTarget = current;

            current.emit(type, event);

            if (event.stopped) {
                break;
            }

            current = current.parent;
        }
    }
}


// Create hierarchy
const documentElement = new Element('document');
const form = new Element('form', documentElement);
const button = new Element('button', form);


// Button listener
function buttonHandler(event) {
    console.log(
        `Button: target=${event.target.name}, currentTarget=${event.currentTarget.name}`
    );
}


// Form listener
function formHandler(event) {
    console.log(
        `Form: target=${event.target.name}, currentTarget=${event.currentTarget.name}`
    );
}


// Document listener
function documentHandler(event) {
    console.log(
        `Document: target=${event.target.name}, currentTarget=${event.currentTarget.name}`
    );
}


// Add listeners
button.addEventListener('click', buttonHandler);
form.addEventListener('click', formHandler);
documentElement.addEventListener('click', documentHandler);


// Scenario A
console.log('\n--- Scenario A ---');

button.dispatchEvent('click', {
    message: 'Button clicked'
});


// Scenario B
console.log('\n--- Scenario B ---');

form.removeEventListener('click', formHandler);

function formStopHandler(event) {
    console.log(
        `Form: target=${event.target.name}, currentTarget=${event.currentTarget.name}`
    );

    event.stopPropagation();
}

form.addEventListener('click', formStopHandler);

button.dispatchEvent('click', {
    message: 'Second click'
});


// Scenario C
console.log('\n--- Scenario C ---');

button.removeEventListener('click', buttonHandler);

button.dispatchEvent('click', {
    message: 'Third click'
});


// Keypress event
console.log('\n--- Keypress ---');

form.addEventListener('keypress', (event) => {
    console.log(
        `Keypress: target=${event.target.name}, currentTarget=${event.currentTarget.name}, data=${event.data.key}`
    );
});

form.dispatchEvent('keypress', {
    key: 'Enter'
});