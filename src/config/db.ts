import { AppDataSource } from "../data-source";
import "reflect-metadata";

export const ConectarServidorNoBd = async () => {
    try {
        await AppDataSource.initialize();
        console.log(`App conectado ao DB ${AppDataSource.options.database}`);

        const handleExit = async () => {
            try {
                if (AppDataSource.isInitialized) {
                    await AppDataSource.destroy();
                    console.log('Conexão com o DB fechada');
                }
            } catch (error) {
                console.error('Erro ao fechar conexão com o DB:', error);
            } finally {
                process.exit(0);
            }
        };

        process.on('SIGINT', handleExit);
        process.on('SIGTERM', handleExit);
    } catch (error) {
        console.error("Erro ao conectar ao DB:", error);
    }
};
