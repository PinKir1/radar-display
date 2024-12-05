async function updateRadarConfig(config) {
    try {
        const response = await fetch('http://localhost:4000/config', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config),
        });
        if (!response.ok) throw new Error('Не удалось обновить конфиг');
        
        alert('Конфиг радара обновлен');
        return await response.json();
    } catch (error) {
        console.error('Ошибка обновления конфига радара:', error);
    }
}

document.getElementById('radar-config-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const config = getConfigFromForm();
    await updateRadarConfig(config);
    console.log('Конфиг радара обновлен:', config);
});

function getConfigFromForm() {
    return {
        measurementsPerRotation: parseInt(document.getElementById('measurementsPerRotation').value, 10),
        rotationSpeed: parseInt(document.getElementById('rotationSpeed').value, 10),
        targetSpeed: parseInt(document.getElementById('targetSpeed').value, 10),
    };
}
