import { AppDataSource } from "../data-source";
import { Motorista } from "../entity/Motorista";
import { Veiculo } from "../entity/Veiculo";

export class MotoristaController {
    async salvar (motorista: Motorista) {
        const motoristaRepository = AppDataSource.getRepository(Motorista);
        const veiculoRepository = AppDataSource.getRepository(Veiculo);

        const veiculo = await veiculoRepository.findOneBy({ id: motorista.veiculo.id });
        if (!veiculo) {
            throw new Error("Veiculo não encontrado");
        }

        const motoristaCriado = motoristaRepository.create(motorista);
        const motoristaSalvo = await motoristaRepository.save(motoristaCriado);
        return motoristaSalvo;
    }

    async getAll() {
        const motoristaRepository = AppDataSource.getRepository(Motorista);
        const motoristas = await motoristaRepository.find();
        return motoristas;
    }
}