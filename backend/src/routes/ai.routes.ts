import express from 'express';
import { analyzeCodeController, deleteProblemByIdController, getAllProblemsController, updateProblemByIdController, getProblemByIdController} from '../controllers/ai.controller';

const router = express.Router();

router.post('/analyze-code', analyzeCodeController);
router.get('/problems', getAllProblemsController);
router.get('/problems/:id', getProblemByIdController)
router.put('/problems', updateProblemByIdController)
router.delete('/problems/:id', deleteProblemByIdController)

export default router;
