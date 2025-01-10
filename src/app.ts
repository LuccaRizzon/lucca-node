import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as logger from 'morgan';

import { ConectarServidorNoBd } from './config/db';
import { routerMotorista } from './routes/motorista';
import { routerVeiculo } from './routes/veiculo';

export const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));

ConectarServidorNoBd();

app.use('/motorista', routerMotorista);
app.use('/veiculo', routerVeiculo);

app.use('/', (req, res) => {
    res.status(200).send('Caminho padrão');
});
