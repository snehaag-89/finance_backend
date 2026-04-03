const express = require('express');
const router = express.Router();
const Record = require('../models/Record');
const fetchuser = require('../middleware/fetchuser'); 
router.get('/summary', fetchuser, async (req, res) => {
  try {

    const records = await Record.find(); 
    let totalIncome = 0;
    let totalExpense = 0;

    records.forEach(record => {
      if (record.type === 'income') {
        totalIncome += record.amount;
      } else if (record.type === 'expense') {
        totalExpense += record.amount;
      }
    });

    const netBalance = totalIncome - totalExpense;
    const categoryTotals = await Record.aggregate([
      { 
        $group: { 
          _id: "$category",
          totalAmount: { $sum: "$amount" } 
        } 
      }
    ]);

    const recentActivity = await Record.find()
      .sort({ date: -1 })
      .limit(5); 
    res.json({
      overview: {
        totalIncome,
        totalExpense,
        netBalance,
        totalTransactions: records.length
      },
      categoryTotals, 
      recentActivity 
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;