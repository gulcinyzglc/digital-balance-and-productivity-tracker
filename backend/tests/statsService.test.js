const {
    calculateStats
} = require('../src/services/statsService');

test('calculates productivity statistics correctly', () => {
    const usageData = [
        {
            appName: 'ChatGPT',
            type: 'productive',
            duration: 75
        },
        {
            appName: 'Netflix',
            type: 'unproductive',
            duration: 60
        }
    ];

    const result = calculateStats(usageData);

    expect(result.totalTime).toBe(135);
    expect(result.productiveTime).toBe(75);
    expect(result.unproductiveTime).toBe(60);
    expect(result.productivityScore).toBe(56);
    expect(result.mostUsedApp).toBe('ChatGPT');
});