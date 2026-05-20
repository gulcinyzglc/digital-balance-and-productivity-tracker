exports.calculateStats = (usageData) => {

    const totalTime = usageData.reduce(
        (sum, item) => sum + item.duration,
        0
    );

    const productiveTime = usageData
        .filter(item => item.type === 'productive')
        .reduce((sum, item) => sum + item.duration, 0);

    const unproductiveTime = usageData
        .filter(item => item.type === 'unproductive')
        .reduce((sum, item) => sum + item.duration, 0);

    const productivityScore = totalTime === 0
        ? 0
        : Math.round((productiveTime / totalTime) * 100);

    const appTotals = {};

    usageData.forEach(item => {
        appTotals[item.appName] =
            (appTotals[item.appName] || 0) + item.duration;
    });

    const topApps = Object.entries(appTotals)
        .map(([app, duration]) => ({
            app,
            duration
        }))
        .sort((a, b) => b.duration - a.duration)
        .slice(0, 5);

    const mostUsedApp = topApps.length > 0
        ? topApps[0].app
        : null;

    return {
        totalTime,
        productiveTime,
        unproductiveTime,
        productivityScore,
        mostUsedApp,
        topApps
    };
};