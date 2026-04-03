const express = require('express');
const router = express.Router();
const Record = require('../models/Record'); 
const fetchuser = require('../middleware/fetchuser');


router.post('/add', fetchuser, async (req, res) => {
  try {
    const { amount, type, category, notes } = req.body;
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Only Admin can add records" });
    }

    const record = new Record({
      amount,
      type,
      category,
      notes,
      user: req.user.id 
    });

    const savedRecord = await record.save();
    res.json(savedRecord);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/fetchall', fetchuser, async (req, res) => {
  try {
    const records = await Record.find().sort({ date: -1 }); 
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/update/:id', fetchuser, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Only Admin can update records!" });
    }

    const { amount, type, category, notes } = req.body;
    const newData = {};
    if (amount) newData.amount = amount;
    if (type) newData.type = type;
    if (category) newData.category = category;
    if (notes) newData.notes = notes;

    const updatedRecord = await Record.findByIdAndUpdate(
      req.params.id, 
      { $set: newData }, 
      { new: true } 
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: "Record not found!" });
    }

    res.json({ message: "Record updated ", updatedRecord });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.delete('/delete/:id', fetchuser, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Only Admin can delete records!" });
    }

    const deletedRecord = await Record.findByIdAndDelete(req.params.id);    
    if (!deletedRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({ message: "Record deleted successfully " });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/filter', fetchuser, async (req, res) => {
  try {
    const { type, category } = req.query;
    let queryOptions = {};

    if (type) {
      queryOptions.type = type;
    }
    if (category) {
      queryOptions.category = category;
    }
    const filteredRecords = await Record.find(queryOptions).sort({ date: -1 });
    res.json(filteredRecords);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;