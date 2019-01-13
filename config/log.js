/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * https://sailsjs.com/docs/concepts/logging
 */

const winston = require('winston');
const dayjs = require('dayjs');
const path = require('path');

require('winston-daily-rotate-file');

const { combine, timestamp, printf } = winston.format;

const logPath = path.join(__dirname, '../logs');

const transports = [
  new (winston.transports.DailyRotateFile)({
    filename: `${logPath}/info-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'info',
  }),
  new (winston.transports.DailyRotateFile)({
    filename: `${logPath}/error-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'error',
  })
];

if (process.env.NODE_ENV !== 'production') {
  transports.push(new winston.transports.Console({
    level: 'debug'
  }));
}

const customLogger = winston.createLogger({
  format: combine(
    winston.format.colorize(),
    timestamp(),
    printf(info => `${dayjs(info.timestamp).format('YYYY-MM-DD HH:mm:ss')} ${info.level}: ${info.message}`),
  ),
  transports,
});

module.exports.log = {

  /***************************************************************************
  *                                                                          *
  * Valid `level` configs: i.e. the minimum log level to capture with        *
  * sails.log.*()                                                            *
  *                                                                          *
  * The order of precedence for log levels from lowest to highest is:        *
  * silly, verbose, info, debug, warn, error                                 *
  *                                                                          *
  * You may also set the level to "silent" to suppress all logs.             *
  *                                                                          *
  ***************************************************************************/

  custom: customLogger,
  level: 'verbose',
  // Disable captain's log so it doesn't prefix or stringify our meta data.
  inspect: false
};
