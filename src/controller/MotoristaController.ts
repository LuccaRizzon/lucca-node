import { AppDataSource } from "../data-source";
import { Motorista } from "../entity/Motorista";
import { Veiculo } from "../entity/Veiculo";

export class MotoristaController {
    async salvar(motorista: Motorista) {
        const motoristaRepository = AppDataSource.getRepository(Motorista);
        const veiculoRepository = AppDataSource.getRepository(Veiculo);

        if (motorista.veiculo?.id) {
            const veiculo = await veiculoRepository.findOneBy({ id: motorista.veiculo.id });

            if (!veiculo) {
                throw new Error("Veiculo não encontrado");
            }
        }

        const motoristaCriado = motoristaRepository.create(motorista);
        const motoristaSalvo = await motoristaRepository.save(motoristaCriado);
        return motoristaSalvo;
    }

    async getAll(page: number, pageSize: number) {
        const motoristaRepository = AppDataSource.getRepository(Motorista);

        const [motoristas, total] = await motoristaRepository.findAndCount({
            relations: ["veiculo"],
            skip: (page - 1) * pageSize,
            take: pageSize,
        });

        return {
            data: motoristas,
            total,
            page,
            pageSize,
        };
    }

    async getById(id: number): Promise<Motorista | null> {
        const motoristaRepository = AppDataSource.getRepository(Motorista);
        const motorista = await motoristaRepository.findOne({
            where: { id },
            relations: ["veiculo"],
        });
        return motorista;
    }

    async update(id: number, motorista: Partial<Motorista>) {
        const motoristaRepository = AppDataSource.getRepository(Motorista);
        const veiculoRepository = AppDataSource.getRepository(Veiculo);

        const motoristaExistente = await motoristaRepository.findOne({
            where: { id },
            relations: ["veiculo"],
        });
    
        if (!motoristaExistente) {
            throw new Error(`Motorista com ID ${id} não encontrado`);
        }
    
        if (motorista.veiculo?.id && motorista.veiculo.id !== motoristaExistente.veiculo?.id) {
            const veiculoUsado = await motoristaRepository.findOne({
                where: { veiculo: { id: motorista.veiculo.id } },
                relations: ["veiculo"],
            });
    
            if (veiculoUsado) {
                throw new Error("Não é possível atualizar. O veículo já está atrelado a outro motorista.");
            }
    
            const novoVeiculo = await veiculoRepository.findOneBy({ id: motorista.veiculo.id });
            if (!novoVeiculo) {
                throw new Error("Veículo não encontrado");
            }
    
            motoristaExistente.veiculo = novoVeiculo;
        }
    
        if (motorista.nome) motoristaExistente.nome = motorista.nome;
        if (motorista.cpf) motoristaExistente.cpf = motorista.cpf.replace(/\D/g, "");
        if (motorista.rg) motoristaExistente.rg = motorista.rg.replace(/\D/g, "");
        if (motorista.telefone) motoristaExistente.telefone = motorista.telefone.replace(/\D/g, "");
    
        await motoristaRepository.save(motoristaExistente);
    
        const motoristaAtualizado = await motoristaRepository.findOne({
            where: { id },
            relations: ["veiculo"],
        });
    
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
