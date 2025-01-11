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

    async update(id: number, motorista: Partial<Motorista>) {
        const motoristaRepository = AppDataSource.getRepository(Motorista);
        const veiculoRepository = AppDataSource.getRepository(Veiculo);

        const motoristaExistente = await motoristaRepository.findOneBy({ id });
        if (!motoristaExistente) {
            throw new Error(`Motorista com ID ${id} não encontrado`);
        }

        if (motorista.veiculo?.id && motorista.veiculo.id !== motoristaExistente.veiculo.id) {
            const veiculoUsado = await motoristaRepository.findOne({ where: { veiculo: { id: motorista.veiculo.id } } });
            if (veiculoUsado) {
                throw new Error("Não é possível atualizar. O veículo já está atrelado a outro motorista.");
            }
        }

        await motoristaRepository.update(id, motorista);

        const motoristaAtualizado = await motoristaRepository.findOneBy({ id });
        return motoristaAtualizado;
    }

    async delete(id: number) {
        const motoristaRepository = AppDataSource.getRepository(Motorista);

        const motoristaExistente = await motoristaRepository.findOneBy({ id });
        if (!motoristaExistente) {
            throw new Error(`Motorista com ID ${id} não encontrado`);
        }

        await motoristaRepository.delete(id);

        return { message: `Motorista com ID ${id} foi deletado com sucesso` };
    }
}