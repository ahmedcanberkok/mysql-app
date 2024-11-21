const db = require('../config/db');

// Tüm çalışanları getir
const getAllEmployees = (req, res) => {
    const query = 'SELECT * FROM employees';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// ID'ye göre bir çalışan getir
const getEmployeesById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM employees WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Çalışan bulunamadı.' });
        }
        res.status(200).json(results[0]);
    });
};

// Bir çalışan ekle
const addEmployee = (req, res) => {
    const { name, gender, city, job_title, university, salary } = req.body;
    const query = 'INSERT INTO employees (name, gender, city, job_title, university, salary) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [name, gender, city, job_title, university, salary], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, name, gender, city, job_title, university, salary });
    });
};

// Bir çalışanı güncelle
const updateEmployee = (req, res) => {
    const { id } = req.params;
    const { name, gender, city, job_title, university, salary } = req.body;
    const query = 'UPDATE employees SET name = ?, gender = ?, city = ?, job_title = ?, university = ?, salary = ? WHERE id = ?';
    db.query(query, [name, gender, city, job_title, university, salary, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Çalışan bulunamadı.' });
        }
        res.status(200).json({ id, name, gender, city, job_title, university, salary });
    });
};

// Bir çalışanı sil
const deleteEmployee = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM employees WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Çalışan bulunamadı.' });
        }
        res.status(204).send();
    });
};

// Gender kolonundaki değerleri gruplama
const countByGender = (req, res) => {
    const query = 'SELECT gender, COUNT(*) AS count FROM employees GROUP BY gender';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};
// Job title kolonundaki değerleri dinamik olarak gruplandır ve say
const countByJobTitle = (req, res) => {
    const query = 'SELECT job_title, COUNT(*) AS count FROM employees GROUP BY job_title';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// City kolonundaki değerleri gruplama
const countByCity = (req, res) => {
    const query = 'SELECT city, COUNT(*) AS count FROM employees GROUP BY city';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};


module.exports = {
    getAllEmployees,
    getEmployeesById,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    countByGender,
    countByJobTitle,
    countByCity
};
