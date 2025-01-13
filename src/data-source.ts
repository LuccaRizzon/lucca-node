import { DataSource } from "typeorm";
import { Motorista } from "./entity/Motorista";
import { Veiculo } from "./entity/Veiculo";

export const AppDataSource = new DataSource({
    type: "postgres", // or your database type
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "lucca",
    entities: [Motorista, Veiculo],
    synchronize: true, // Optional: Sync database schema automatically
    logging: true, // Optional: Enable logging
});
