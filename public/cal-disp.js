const ICAL = require('./ical.min.js');

module.exports.getCalHtml = function (ical) {
    const jcal = ICAL.parse(ical);
    const component = new ICAL.Component(jcal);
    const events = component.getAllSubcomponents('vevent');
    const eventStrings = events.map(evData => {
        const event = new ICAL.Event(evData);

        const start = event.startDate.toJSDate();
        const end = event.startDate.toJSDate();
        return `
        UID: ${event.uid}<br>
        Summary: ${event.summary}<br>
        Desc: ${event.description}<br>
        Start: ${start.toLocaleString()}<br>
        End: ${end.toLocaleString()}<br>
        Duration: ${Math.abs(end.getHours() - start.getHours())}
        `;
    });
    return eventStrings.join('<br>');
};