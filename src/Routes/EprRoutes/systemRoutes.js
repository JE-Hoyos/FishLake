const { Router } = require("express");
const router = Router();
//Middlewares
const { isAuthenticated } = require('../../Rules/UserRules/middlewares/authToken.js');
const { permissions } = require('../../Rules/ErpRules/middlewareERP');
//Rules
const { SystemRules } = require('../../Rules/ErpRules/systemRules');
const { ColabsRules } = require('../../Rules/ErpRules/colabRules');
const { PondsRules } = require('../../Rules/ErpRules/pondRules');
const { BatchesRules } = require('../../Rules/ErpRules/batchesRules');
const { OutlaysRules } = require('../../Rules/ErpRules/outlaysRules')

//**sistema */
// visitar perfil de systema
router.get('/Profile_system', isAuthenticated, SystemRules.readSystem);
router.post('/AddSpecie', isAuthenticated, permissions.master, SystemRules.addSpecie);
router.post('/AddCostCenter', isAuthenticated, permissions.master, SystemRules.addCenter);


//**colaboradores */
//Visitar lista de colaboradores
router.get('/callColabs', isAuthenticated, ColabsRules.callColabs);
//crear nuevo colaborador
router.post('/New_colab', isAuthenticated, permissions.newColabs, ColabsRules.createNewColab);


//**Estanques */
//Visitar lista de estanques
router.get('/callPonds', isAuthenticated, PondsRules.callPonds);
//Crear nuevo estanque
router.post('/New_pond', isAuthenticated, permissions.ponds, PondsRules.createNewPond);


//**Lotes de producción */
router.get('/callBatches', isAuthenticated, BatchesRules.callBatches);
router.post('/newBatche', isAuthenticated, BatchesRules.createNewBatche);
router.get('/batcheProfile/:id', isAuthenticated, BatchesRules.callBatcheProfile);

//**Etapas*/
//1.1. Captura y selección
router.post('/edit/BroodstockFishingBatche', isAuthenticated, BatchesRules.broodstockFishingEdit);
router.post('/remove/BroodstockFishingBatche', isAuthenticated, BatchesRules.broodstockFishingRemove);
//1.2. Inducción
router.post('/edit/BroodstockInductionBatche', isAuthenticated, BatchesRules.broodstockInductionBatche);
router.post('/remove/BroodstockInductionRemove', isAuthenticated, BatchesRules.broodstockInductionRemove);
//2. ovicultura
router.post('/edit/ovoculture', isAuthenticated, BatchesRules.ovocultureEdit);
router.post('/remove/ovoculture', isAuthenticated, BatchesRules.ovocultureRemove);
//3. larvicultura
router.post('/edit/larviculture', isAuthenticated, BatchesRules.larvicultureEdit);
router.post('/remove/larviculture', isAuthenticated, BatchesRules.larvicultureRemove);



//**Egresos*/
router.get('/call/outlay', isAuthenticated, OutlaysRules.callOutlay);

module.exports = router;