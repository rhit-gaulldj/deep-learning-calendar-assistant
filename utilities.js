function sanitize(str) {
    return str.replaceAll('\n', '\\n')
        .replaceAll('\r', '\\r')
        .replaceAll('"', '\"');
}

export const getSystemMessage = (preferences) => {
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    const dayOfWeek = date.toLocaleDateString('default', { weekday: 'long' });

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Note: This will use the date/time for the server, not the client. In production, the client would send that
    // info over in their request so the server runs the prompt as if it is in the client's time.
    // For simplicity, we do time calculations server-side. It will work in testing since we'll run the server
    // on the same computer as the client anyway.

    const systemMsg = 'You are a helpful, accurate, and creative calendar assistant that is capable of understanding that events should be scheduled around specific times depending on the meaning of their titles.\n\n' + 
        'You will be receiving requests from the user involving ICAL formatted text then natural language. The requests will be in the following format:\n' + 
        '<ICAL> *ICAL text here* </ICAL>\n*natural language here*\n\n' + 
        'You will interpret the ICAL as a calendar and interpret the natural language as a request to add, delete or modify events to or on the calendar represented by the ICAL formatted text.\n' + 
        'Your response will always be in the form:\n' +
        '*explaining your reasoning and understanding of the request*\n<ICAL> *modified version of the given ICAL text* </ICAL>' +
        'If the natural language request is ambiguous, you will do your best to always provide a calendar in response that satisfies the request according to the following preferences on a scale from 1-10 where 1 means strongly dislikes, and 10 means strongly prefers:\n' +
        `Preference to schedule events early in the day: ${preferences.early}\nWillingness to move existing events to make room for new events: ${preferences.move}\n\n` +
        'If you have follow up questions, be sure to respond with your first attempt as well as asking the questions.\n' +
        `It is currently ${dayOfWeek} ${month} ${day} ${year} and you should assume all the times are in the ${tz} timezone`;
    return systemMsg;
};
export const getUserMessage = (calendar, prompt) => {
    return `${sanitize(prompt)} <ICAL>${sanitize(calendar)}</ICAL>`;
};

