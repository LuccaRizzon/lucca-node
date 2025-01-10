
import { Router }  from 'express';
import { VeiculoController } from '../controller/VeiculoController';

export const routerVeiculo = Router();
const veiculoController = new VeiculoController();

routerVeiculo.post('/', async (req, res) => {
    try {
        const veiculoSalvo = await veiculoController.salvar(req.body);
        res.status(201).json(veiculoSalvo);
    } catch (error) {
        res.status(500).json({ message: "Erro ao salvar veiculo", error });
    }
});

routerVeiculo.get('/', async (req, res) => {
    try {
        const veiculos = await veiculoController.getAll();
        res.status(201).json(veiculos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao retornar veiculos", error });
    }
});
