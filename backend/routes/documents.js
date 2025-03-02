const router = require('express').Router();
const documentController = require('../controllers/document');
const auth = require('../middleware/auth');

router.post(`/create-new-document`, auth, documentController.createDocument);
router.get(`/get-all-documents`, auth, documentController.getAllDocuments);
router.delete(`/delete-document/:id`, auth, documentController.deleteDocument);

module.exports = router;
