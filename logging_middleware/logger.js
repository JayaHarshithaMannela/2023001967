async function Log(stack, level, packageName, message) {
    const logData = {
        stack,
        level,
        package: packageName,
        message
    };

    console.log("Log Entry:", logData);

    return logData;
}

module.exports = Log;