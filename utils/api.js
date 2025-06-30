export const sendCommand = async (user, command) => {
    try {
        const response = await fetch('https://to.internus.info/api/monkeyalpha', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, command })
        });
        return await response.json();
    } catch (error) {
        console.error('POST error:', error);
        return null;
    }
};

export const fetchStatistics = async () => {
    try {
        const response = await fetch('https://to.internus.info/api/monkeyalpha/statistics');
        return await response.json();
    } catch (error) {
        console.error('GET error:', error);
        return null;
    }
};
