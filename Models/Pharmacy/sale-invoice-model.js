const mongoose = require("mongoose");

const SaleInvoiceSchema = new mongoose.Schema({
    InvoiceNo: {
        type: String,
        required: [true, "Rack name is Required"]
    },
    invoiceDate: {
        type: Date,
        required: [true, "Invoice Date is Required"]
    },
    prescribedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "staff",
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patient",
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: { type: Date, },
    headerRemarks: { type: String },
    isSelected: { type: Boolean, default: false },
    InvoiceDetailList: [
        {
            storeRecordId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ItemsInStore',
                required: [true, "Store Record Id is Required"]
            },
            store: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'definestores',
                required: [true, "Store is Required"]
            },
            Medicine: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'DefDrugs',
                required: [true, "Medicine is Required"]
            },
            MfgDate: { type: Date },
            expDate: { type: Date },
            packSize: { type: String },
            medicinetype: { type: String },
            batchNo: { type: String },
            Qty: { type: Number, required: [true, "Qty is required"] },
            rate: { type: Number, required: [true, "Rate is Required"] },
            discountType: { type: String },
            discount: { type: Number },
            finalAmount: {
                type: Number,
                required: [true, "final amount is required"]
            },
            remarks: { type: String },
            storeName: String,
            MedicineName: String,
            MedicineTypeName: String,
            previousQtyInUpdateCase: Number
        },
    ],
});

const saleInvoiceModel = mongoose.model("saleInvoice", SaleInvoiceSchema)
module.exports = saleInvoiceModel