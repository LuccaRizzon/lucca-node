import { AppDataSource } from "../data-source";
import { Motorista } from "../entity/Motorista";

export class MotoristaController {
    async salvar (motorista: Motorista) {
        const motoristaRepository = AppDataSource.getRepository(Motorista);
        const motoristaCriado = motoristaRepository.create(motorista);
        const motoristaSalvo = await motoristaRepository.save(motoristaCriado);
        return motoristaSalvo;
    }

    async getAll() {
        const motoristaRepository = AppDataSource.getRepository(Motorista);
        const motoristas = await motoristaRepository.find();
        return motoristas;
    }
    // const motoristaRepository = AppDataSource.getRepository(Motorista);
    // const motoristas = await motoristaRepository.find(Motorista);
}