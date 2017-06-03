var mongoose = require('mongoose');

var BulletSchema = new Schema({ title: String, description: String, order: Number });
var GuideSchema = new Schema({
    firstJob: Boolean,
    job: String,
    education: String,
    bullets: [BulletSchema],
    description: String,
    language: String
})

module.exports = mongoose.model('Guide', GuideSchema);
