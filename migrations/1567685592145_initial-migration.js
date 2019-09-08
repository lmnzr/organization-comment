/* eslint-disable camelcase */

exports.up = pgm => {
    pgm.createTable("users", {
      id: "id",
      uuid: { type: "uuid", notNull: true },
      name: { type: "varchar(100)", notNull: true },
      email: { type: "varchar(50)", notNull: true,unique:true },
      password: { type: "varchar(100)", notNull: true },
      isadmin: { type: "bool", notNull: true },
      createdAt: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp")
      }
    },{ifNotExists:true});

    pgm.sql("INSERT INTO users (uuid,name,email,password,isadmin) VALUES ('a5678438-38d6-11e9-b1ca-7d1685deabce','admin','admin@system.com','$2b$09$i1bfvz4tuUj4L0cztd7THeh4EAI1oGrG0F9hlnkhFG9iSIa59RR6K',true) RETURNING *;");
    
    pgm.createTable("comments", {
      id: "id",
      email: { type: "varchar(100)", notNull: true },
      organization: { type: "varchar(100)", notNull: true },
      comment: { type: "text", notNull: true },
      createdAt: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp")
      },
      deletedAt: { type: "timestamp", notNull: false },
      deleterId: { type: "uuid", notNull: false },
      isdeleted: { type: "bool", notNull: true, default: false },
    },{ifNotExists:true});
  }

  exports.down = pgm => {
    pgm.dropTable("comments", {ifExists:true});
    pgm.dropTable("users", {ifExists:true});
  };