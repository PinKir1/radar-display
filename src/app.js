function plotRadarData(data) {
    const radarPoints = data.map(target => ({
        distance: target.distance,
        angle: target.angle,
        power: target.power,
        color: getColorByPower(target.power),
        size: getSizeByPower(target.power),
    }));

    const trace = createRadarTrace(radarPoints);
    const layout = createRadarLayout();

    Plotly.newPlot('radar-chart', [trace], layout);
}

function createRadarTrace(radarPoints) {
    const distances = radarPoints.map(point => point.distance);
    const angles = radarPoints.map(point => point.angle);
    const colors = radarPoints.map(point => point.color);
    const sizes = radarPoints.map(point => point.size);

    return {
        type: 'scatterpolar',
        mode: 'markers',
        r: distances,
        theta: angles,
        marker: {
            color: colors,
            size: sizes,
            symbol: 'circle',
        },
    };
}

function createRadarLayout() {
    return {
        polar: {
            radialaxis: {
                visible: true,
                range: [0, 200],
            },
        },
        showlegend: false,
    };
}

function getColorByPower(power) {
    if (power > 0.8) return 'rgb(255, 0, 0)';
    if (power > 0.5) return 'rgb(255, 165, 0)';
    return 'rgb(0, 255, 0)';
}

function getSizeByPower(power) {
    if (power > 0.8) return 30;
    if (power > 0.5) return 15;
    return 7.5;
}
