const { Model } = require("objection");

class Note extends Model {
  static get tableName() {
    return "notes";
  }
  static get relationMappings() {
    const User = require("./user");
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: "notes.owner_id",
          to: "users.user_id",
        },
      },
    };
  }
}

module.exports = Note;
