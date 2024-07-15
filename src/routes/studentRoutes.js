const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const multer = require('multer');
// const methodOverride = require('method-override');

const upload = multer({ dest: 'public/uploads' });

// router.use(methodOverride('_method'));

router.get('/', studentController.getHomePage);

router.get('/add', studentController.registerStudent);

router.post('/add', upload.single('profile_picture'), studentController.addStudent);

router.delete('/:id', studentController.deleteStudent);

router.get('/update/:id', studentController.updatePage);

router.put('/:id',upload.single('profile_picture'), studentController.updateStudent);

router.get('/aggregate-match', studentController.aggregateMatch);

module.exports = router;
