import { Router, Request } from "express";
import { MotoristaController } from '../controller/MotoristaController';
import { Motorista } from "../entity/Motorista";

export const routerMotorista = Router();
const motoristaController = new MotoristaController();

routerMotorista.post('/', async (req, res) => {
    try {
        const motoristaSalvo = await motoristaController.salvar(req.body);
        res.status(201).json(motoristaSalvo);
    } catch (error) {
        res.status(500).json({ message: "Erro ao salvar motorista", error });
    }
});

routerMotorista.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        const motoristas = await motoristaController.getAll(page, pageSize);
        res.status(200).json(motoristas);
    } catch (error) {
        res.status(500).json({ message: "Erro ao retornar motoristas", error });
    }
});

routerMotorista.get('/:id', async (req: Request<{ id: number }>, res) => {
    try {
        const id = req.params.id
        const motoristas = await motoristaController.getById(id);
        res.status(200).json(motoristas);
    } catch (error) {
        res.status(500).json({ message: "Erro ao retornar motoristas", error });
    }
});

routerMotorista.put('/:id', async (req: Request<{ id: number, motorista: Motorista }>, res) => {
    try {
        const motoristaAtualizado = await motoristaController.update(req.params.id, req.body);
        res.status(200).json(motoristaAtualizado);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar motorista", error });
    }
});

routerMotorista.delete('/:id', async (req: Request<{ id: number }>, res) => {
    try {
        const id = req.params.id
        await motoristaController.delete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar motorista", error });
    }
});
