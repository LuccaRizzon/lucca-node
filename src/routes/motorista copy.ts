
import { Router }  from 'express';
import { MotoristaController } from '../controller/MotoristaController';
import { VeiculoController } from '../controller/VeiculoController';
import { Motorista } from '../entity/Motorista';

export const routerMotorista = Router();
const motoristaController = new MotoristaController();
const veiculoController = new VeiculoController();

routerMotorista.post('/', async (req, res) => {
    try {
        const data = req.body;
        const veiculo = await veiculoController.getById(data.veiculo.id);

        if (veiculo) {
            const motorista = new Motorista(data.nome, data.rg, data.cpf, data.telefone, veiculo);
            // const motoristaSalvo = await motoristaController.salvar(req.body);
            const motoristaSalvo = await motoristaController.salvar(motorista);
            res.status(201).json(motoristaSalvo);
        } else {
            res.status(404).json({ message: "Veiculo não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao salvar motorista", error });
    }
});

routerMotorista.get('/', async (req, res) => {
    try {
        const motoristas = await motoristaController.getAll();
        res.status(201).json(motoristas);
    } catch (error) {
        res.status(500).json({ message: "Erro ao retornar motoristas", error });
    }
});
