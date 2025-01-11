
import { Router }  from 'express';
import { MotoristaController } from '../controller/MotoristaController';
// import { VeiculoController } from '../controller/VeiculoController';

export const routerMotorista = Router();
const motoristaController = new MotoristaController();
// const veiculoController = new VeiculoController();

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
        const motoristas = await motoristaController.getAll();
        res.status(201).json(motoristas);
    } catch (error) {
        res.status(500).json({ message: "Erro ao retornar motoristas", error });
    }
});

routerMotorista.put('/', async (req, res) => {
    try {
        const motoristaAtualizado = await motoristaController.update(req.body.motorista.id, req.body); // req.body.motorista.id TESTAR bem isto depois
        res.status(200).json(motoristaAtualizado);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar motorista", error });
    }
});

routerMotorista.delete('/', async (req, res) => {
    try {
        const motoristaDeletado = await motoristaController.delete(req.body);
        res.status(200).json(motoristaDeletado);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar motorista", error });
    }
});
