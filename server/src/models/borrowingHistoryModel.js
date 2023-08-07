const mongoose = require('mongoose');

const borrowingHistorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    borrow_date: Date,
    return_date: Date
});

const BorrowingHistory = mongoose.model('BorrowingHistory', borrowingHistorySchema);

module.exports = BorrowingHistory;
