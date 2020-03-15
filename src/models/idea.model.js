const mongoose = require("mongoose");
const { Schema } = mongoose;

const IdeaSchema = new Schema({
    idea: { type: string, required: true },
    description: { type: string },
    upvotes: [{ type: Boolean }],
    downvotes: [{ type: Boolean }],
    author: { type: Schema.Types.ObjectId, ref: "user", required: true, autopopulate: true},
    coments: [{ type: Schema.Types.ObjectId, ref: "comment", required: true, autopopulate: true}]
});


// plugins
IdeaSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("idea", IdeaSchema);