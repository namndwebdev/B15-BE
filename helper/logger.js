const winston = require('winston');
const path = require('path')
const DailyRotateFile = require('winston-daily-rotate-file');
const createLogger = (title) => {
    const logger = winston.createLogger({
        level: 'error',
        format: winston.format.simple(),
        defaultMeta: { API: title, time: new Date() },
        transports: [
            new DailyRotateFile({
                level: 'error',
                filename: path.join(__dirname, '../logs/error-%DATE%.log'),
                datePattern: 'YYYY-MM-DD-HH',
                zippedArchive: true,
                maxSize: '2m',
                maxFiles: '14d'
              })
        ],
    });
    return logger
}

module.exports = {
    createLogger
}