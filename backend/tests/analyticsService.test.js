const {
    calculateTotalScreenTime,
    findMostUsedApp,
    calculateProductivityScore
} = require('../src/services/analyticsService');

test('calculates total screen time correctly', () => {

    const records = [
        { duration: 60 },
        { duration: 90 }
    ];

    expect(
        calculateTotalScreenTime(records)
    ).toBe(150);
});

test('finds most used app correctly', () => {

    const records = [
        {
            app_name: 'YouTube',
            duration: 60
        },
        {
            app_name: 'ChatGPT',
            duration: 90
        },
        {
            app_name: 'YouTube',
            duration: 40
        }
    ];

    expect(
        findMostUsedApp(records)
    ).toBe('YouTube');
});

test('calculates productivity score correctly', () => {

    const records = [
        {
            category: 'Education',
            duration: 80
        },
        {
            category: 'Entertainment',
            duration: 20
        }
    ];

    expect(
        calculateProductivityScore(records)
    ).toBe(80);
});