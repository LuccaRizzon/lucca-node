import { AppDataSource } from "../data-source";
import "reflect-metadata";

export const ConectarServidorNoBd = async () => {
    try {
        await AppDataSource.initialize();
        console.log(`App conectado ao DB ${AppDataSource.options.database}`);

        process.on('SIGINT', async () => {
            await AppDataSource.destroy();
            console.log('Conexão com o DB fechada');
        });
    } catch (error) {
        console.error("Erro ao conectar ao DB:", error);
    }
};
