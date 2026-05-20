function calculateGoalProgress(currentUsage, targetMinutes) {
    if (!targetMinutes || targetMinutes <= 0) {
        return 0;
    }

    return Math.min(
        Math.round((currentUsage / targetMinutes) * 100),
        100
    );
}

function isGoalExceeded(currentUsage, targetMinutes) {
    return currentUsage > targetMinutes;
}

module.exports = {
    calculateGoalProgress,
    isGoalExceeded
};