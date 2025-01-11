
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
        res.status(200).json(veiculos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao retornar veiculos", error });
    }
});

routerVeiculo.put('/', async (req, res) => {
    try {
        const veiculoAtualizado = await veiculoController.update(req.body.veiculo.id, req.body); // req.body.motorista.id TESTAR bem isto depois
        res.status(200).json(veiculoAtualizado);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar veiculo", error });
    }
});

routerVeiculo.delete('/', async (req, res) => {
    try {
        const veiculoDeletado = await veiculoController.delete(req.body);
        res.status(200).json(veiculoDeletado);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar veiculo", error });
    }
});