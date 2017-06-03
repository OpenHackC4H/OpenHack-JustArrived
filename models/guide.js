var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BulletSchema = new Schema({ title: { type: String, required: true },
                                description: String,
                                order: { type: Number, required: true }});
var GuideSchema = new Schema({
    title: { type: String, required: true },
    firstJob: { type: Boolean, required: true },
    job: { type: String, required: true },
    education: { type: String, required: true },
    bullets: { type: [BulletSchema], required: true },
    upvotes: { type: Number, required: true },
    description: String,
    language: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true }
})

module.exports = mongoose.model('Guide', GuideSchema);
