import { AppDataSource } from "../data-source";
import { Veiculo } from "../entity/Veiculo";

export class VeiculoController {
    async salvar (veiculo: Veiculo) {
        const veiculoRepository = AppDataSource.getRepository(Veiculo);
        const veiculoCriado = veiculoRepository.create(veiculo);
        const veiculoSalvo = await veiculoRepository.save(veiculoCriado);
        return veiculoSalvo;
    }

    async getAll() {
        const veiculoRepository = AppDataSource.getRepository(Veiculo);
        const veiculos = await veiculoRepository.find();
        return veiculos;
    }

    async getById(id: number) {
        const veiculoRepository = AppDataSource.getRepository(Veiculo);
        const veiculo = veiculoRepository.findOneBy({ id });
        return veiculo;
    }

    async update(id: number, veiculo: Partial<Veiculo>) {
        const veiculoRepository = AppDataSource.getRepository(Veiculo);

        const veiculoExistente = await veiculoRepository.findOneBy({ id });
        if (!veiculoExistente) {
            throw new Error(`Veículo com ID ${id} não encontrado`);
        }

        await veiculoRepository.update(id, veiculo);

        const veiculoAtualizado = await veiculoRepository.findOneBy({ id });
        return veiculoAtualizado;
    }

    async delete(id: number) {
        const veiculoRepository = AppDataSource.getRepository(Veiculo);

        const veiculoExistente = await veiculoRepository.findOneBy({ id });
        if (!veiculoExistente) {
            throw new Error(`Veículo com ID ${id} não encontrado`);
        }

        await veiculoRepository.delete(id);

        return { message: `Veículo com ID ${id} foi deletado com sucesso` };
    }
}