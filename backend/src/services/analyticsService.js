function calculateTotalScreenTime(records) {
    return records.reduce((total, record) => {
        return total + record.duration;
    }, 0);
}

function findMostUsedApp(records) {
    if (records.length === 0) {
        return '-';
    }

    const appTotals = {};

    records.forEach(record => {
        appTotals[record.app_name] =
            (appTotals[record.app_name] || 0) + record.duration;
    });

    let topApp = '-';
    let maxTime = 0;

    for (let app in appTotals) {
        if (appTotals[app] > maxTime) {
            maxTime = appTotals[app];
            topApp = app;
        }
    }

    return topApp;
}

function calculateProductivityScore(records) {
    const productiveCategories = [
        'productivity',
        'study',
        'education',
        'coding',
        'work',
        'reading',
        'research',
        'design'
    ];

    const total = calculateTotalScreenTime(records);

    if (total === 0) {
        return 0;
    }

    const productiveTime = records.reduce((sum, record) => {
        const category = record.category.toLowerCase();

        const isProductive = productiveCategories.some(productiveCategory =>
            category.includes(productiveCategory)
        );

        return isProductive ? sum + record.duration : sum;
    }, 0);

    return Math.round((productiveTime / total) * 100);
}

module.exports = {
    calculateTotalScreenTime,
    findMostUsedApp,
    calculateProductivityScore
};