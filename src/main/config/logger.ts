import pino from 'pino';

class Logger {
    private static instance: pino.Logger;

    private constructor() {
        const isProductionEnv = process.env.APP_ENVIRONMENT === 'prod';

        const pinoOptions = {
            level: isProductionEnv ? 'info' : 'debug',
            transport: isProductionEnv
                ? undefined
                : {
                    target: 'pino-pretty',
                    options: {
                        colorize: true, 
                        translateTime: true, 
                        ignore: 'pid,hostname',
                    },
                },
        };
        Logger.instance = pino(pinoOptions);
    }

    public static getInstance(): pino.Logger {
        if (!Logger.instance) {
            new Logger(); 
        }
        return Logger.instance;
    }
}

export default Logger.getInstance();
