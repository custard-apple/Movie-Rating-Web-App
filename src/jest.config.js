module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(css|scss|sass)$": "identity-obj-proxy",
    },
};
