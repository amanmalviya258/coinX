import { createLogger, format, transports } from 'winston'; 

const logger = createLogger({
    level: 'info', // Adjust the logging level if needed (e.g., 'debug', 'warn' )
    format: format.combine(
        format.timestamp(),
        format.simple() 
    ),
    transports: [
        new transports.Console() // For now, simply log to the console
    ]
});
export default logger;
