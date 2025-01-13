import { Router, Request } from "express";
import { VeiculoController } from '../controller/VeiculoController';
import { Veiculo } from "../entity/Veiculo";

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
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        const veiculos = await veiculoController.getAll(page, pageSize);
        res.status(200).json(veiculos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao retornar veiculos", error });
    }
});

routerVeiculo.get('/:id', async (req: Request<{ id: number }>, res) => {
    try {
        const id = req.params.id
        const veiculos = await veiculoController.getById(id);
        res.status(200).json(veiculos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao retornar veiculos", error });
    }
});

routerVeiculo.put('/:id', async (req: Request<{ id: number, veiculo: Veiculo }>, res) => {
    try {
        const veiculoAtualizado = await veiculoController.update(req.params.id, req.body);
        res.status(200).json(veiculoAtualizado);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar veiculo", error });
    }
});

routerVeiculo.delete('/:id', async (req: Request<{ id: number }>, res) => {
    try {
        const id = req.params.id
        veiculoController.delete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar veiculo", error });
    }
});