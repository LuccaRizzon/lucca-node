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
}