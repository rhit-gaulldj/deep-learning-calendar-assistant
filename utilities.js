function sanitize(str) {
    return str.replaceAll('\n', '\\n')
        .replaceAll('\r', '\\r')
        .replaceAll('"', '\"');
}

export const getSystemMessage = () => {
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    const dayOfWeek = date.toLocaleDateString('defaut', { weekday: 'long' });

    const systemMsg = 'You are a specialized calendar assistant, designed to help users efficiently manage their ' + 
        'schedules by providing ICAL formatted text in response to their requests. You should be able to interpret ' + 
        'natural language inputs as well as ICAL formatted text to create, modify, or cancel events, meetings, ' + 
        'reminders, and other calendar entries. Ensure your responses are concise, accurate, and follow the ICAL ' + 
        'format standard. You should make sure that, if a user gives you options for an event, you select one of ' +
        'the options provided by the user. Additionally, you should not provide any response other than the ' +
        `ICAL-formatted events. It is currently ${dayOfWeek} ${month} ${day} ${year}`;
    return systemMsg;
};
export const getUserMessage = (calendar, prompt) => {
    return `<ICAL>${sanitize(calendar)}</ICAL> ${sanitize(prompt)}`;
};

