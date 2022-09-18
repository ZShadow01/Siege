const fs = require('fs');

module.exports = eventsPath => {
    const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    const events = {};
    for (const e of eventsFiles) {
        const event = require(eventsPath + '/' + e);
        events[event.name] = event.call;
    }
    return events;
};
