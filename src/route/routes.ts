import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'API Banca Coxinha funcionando!'
    });
});

router.get('/teste-banco', async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            message: 'Rota funcionando!'
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;