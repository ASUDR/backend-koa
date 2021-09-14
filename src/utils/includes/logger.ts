import winston from 'winston';

export default winston.createLogger({
  levels: winston.config.syslog.levels,
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/debug.log', level: 'debug' }),
    new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
    new winston.transports.File({ filename: 'logs/warn.log', level: 'warn' }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' })
  ]
});
