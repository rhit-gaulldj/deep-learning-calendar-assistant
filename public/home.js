function submit() {
    // Get the calendar and prompt to send to the API
    const calendar = document.getElementById('calendarEntry').value;
    const prompt = document.getElementById('promptEntry').value;

    // Clear the response text
    setResponse('');
    
    if (!calendar || calendar.length <= 0) {
        setError('Calendar is required');
        return;
    }
    if (!prompt || prompt.length <= 0) {
        setError('Prompt is required');
        return;
    }

    // Clear the error text
    setError('');
    
    // TODO: Remove hardcoding here
    const responsePromise = fetch(`http://localhost:3000/api/prompt`, {
        method: 'POST',
        body: JSON.stringify({
            calendar: calendar,
            prompt: prompt,
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    responsePromise.then(async res => {
        console.log('Status', res.status);
        if (res.status >= 400) {
            // There was an error
            setError(`Error when handling request: Code ${res.status}`);
        } else {
            const body = await res.json();
            setResponse(body.response);
        }
    });
}

function setError(err) {
    document.getElementById('errorText').textContent = err;
}
function setResponse(text) {
    document.getElementById('output').textContent = text;
}

function onLoad() {
    function handleSlider(sliderId, labelId) {
        const slider = document.getElementById(sliderId);
        const value = document.getElementById(labelId);
        value.innerHTML = `${slider.value}/10`; // Display the default slider value

        // Update the current slider value (each time you drag the slider handle)
        slider.oninput = function() {
            value.innerHTML = `${this.value}/10`;
        };
    }

    handleSlider('earlySlider', 'earlyValue');
    handleSlider('moveSlider', 'moveValue');
}