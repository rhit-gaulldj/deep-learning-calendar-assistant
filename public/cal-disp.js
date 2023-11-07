function getCalHtml(ical) {
    const jcal = ICAL.prase(ical);
    const component = new ICAL.Component(jcal);
    const events = component.getAllSubcomponents('vevent');
    console.log(events);
    for (const evData of events) {
        const event = new ICAL.Event(evData);
        console.log(event.summary);
    }
    return `Test!`;
}