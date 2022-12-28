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
router.post('/editBroodstockFishingBatche', isAuthenticated, BatchesRules.broodstockFishingEdit);

module.exports = router;