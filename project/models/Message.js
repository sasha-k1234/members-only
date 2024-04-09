const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {DateTime} = require('luxon');

const MsgSchema = new Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    post_date:{type:Date,required:true},
    author:{
        type:Schema.Types.ObjectId,ref:"User"
    },
});

MsgSchema.virtual('postDate_formatted').get(function () {
    return DateTime.fromJSDate(this.post_date).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("Message",MsgSchema);