const {
    calculateGoalProgress,
    isGoalExceeded
} = require('../src/services/goalService');

test('calculates goal progress correctly', () => {
    expect(calculateGoalProgress(30, 60)).toBe(50);
});

test('limits goal progress to maximum 100', () => {
    expect(calculateGoalProgress(90, 60)).toBe(100);
});

test('detects exceeded goal', () => {
    expect(isGoalExceeded(75, 60)).toBe(true);
});

test('detects goal within limit', () => {
    expect(isGoalExceeded(40, 60)).toBe(false);
});