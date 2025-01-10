
import { Router }  from 'express';
import { MotoristaController } from '../controller/MotoristaController';
import { VeiculoController } from '../controller/VeiculoController';

export const routerMotorista = Router();
const motoristaController = new MotoristaController();
const veiculoController = new VeiculoController();

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
