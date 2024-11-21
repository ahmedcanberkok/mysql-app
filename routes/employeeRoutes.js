const express = require('express');
const {
    getAllEmployees,
    getEmployeesById,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    countByJobTitle,
    countByGender,
    countByCity
} = require('../controllers/employeeController');

const router = express.Router();

// Tüm çalışanları getir
router.get('/', getAllEmployees);

// ID'ye göre bir çalışan getir
router.get('/:id', getEmployeesById);

// Yeni bir çalışan ekle
router.post('/', addEmployee);

// Çalışanı güncelle
router.put('/:id', updateEmployee);

// Çalışanı sil
router.delete('/:id', deleteEmployee);

router.get('/stats/gender', countByGender);

router.get('/stats/job-title', countByJobTitle);

router.get('/stats/city', countByCity);

module.exports = router;
