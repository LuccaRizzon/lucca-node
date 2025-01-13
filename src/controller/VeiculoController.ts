import { AppDataSource } from "../data-source";
import { Veiculo } from "../entity/Veiculo";
import { Motorista } from "../entity/Motorista";

export class VeiculoController {
    async salvar(veiculo: Veiculo) {
        const veiculoRepository = AppDataSource.getRepository(Veiculo);
        const veiculoCriado = veiculoRepository.create(veiculo);
        const veiculoSalvo = await veiculoRepository.save(veiculoCriado);
        return veiculoSalvo;
    }

    async getAll(page: number, pageSize: number) {
        const veiculoRepository = AppDataSource.getRepository(Veiculo);
        const motoristaRepository = AppDataSource.getRepository(Motorista);

        const [veiculos, total] = await veiculoRepository.findAndCount({
            skip: (page - 1) * pageSize,
            take: pageSize,
        });

        const veiculosWithAvailability = await Promise.all(
            veiculos.map(async (veiculo) => {
                const isAssigned = await motoristaRepository.findOneBy({ veiculo: { id: veiculo.id } });

                return {
                    ...veiculo,
                    available: !isAssigned,
                };
            })
        );

        return {
            data: veiculosWithAvailability,
            total,
            page,
            pageSize,
        };
    }

    async getById(id: number): Promise<Veiculo | null> {
        const veiculoRepository = AppDataSource.getRepository(Veiculo);
        const veiculo = await veiculoRepository.findOne({
            where: { id }
        });
        return veiculo;
    }

    async update(id: number, veiculo: Partial<Veiculo>) {
        const veiculoRepository = AppDataSource.getRepository(Veiculo);

        const veiculoExistente = await veiculoRepository.findOneBy({ id });
        if (!veiculoExistente) {
            throw new Error(`Veículo com ID ${id} não encontrado`);
        }

        if (veiculo.placa) veiculoExistente.placa = veiculo.placa.replace(/\D/g, "");
        if (veiculo.renavam) veiculoExistente.renavam = veiculo.renavam.replace(/\D/g, "");

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
