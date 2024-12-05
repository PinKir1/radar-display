const socket = new WebSocket('ws://localhost:4000');

socket.addEventListener('open', () => {
    console.log('Connected to WebSocket server');
});

socket.addEventListener('message', (event) => {
    const radarData = parseRadarData(event.data);
    if (radarData && radarData.length > 0) {
        plotRadarData(radarData);
    } else {
        console.log('No targets detected');
    }
});

socket.addEventListener('close', () => {
    console.log('Connection closed');
});

socket.addEventListener('error', (error) => {
    console.error('WebSocket Error:', error);
});

function parseRadarData(data) {
    const parsedData = JSON.parse(data);
    if (!parsedData.echoResponses || parsedData.echoResponses.length === 0) return [];
    
    return parsedData.echoResponses.map(response => ({
        time: response.time,
        distance: calculateDistance(response.time),
        power: response.power,
        angle: parsedData.scanAngle,
    }));
}

function calculateDistance(time) {
    return (300000 * time) / 2; 
}
