import { int, text, bigint, index, singlestoreTableCreator } from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator((name) => `drive-clone_${name}`);

export const files = createTable("files_table", {
  id: bigint("id", { mode: "bigint", unsigned: true }).primaryKey().autoincrement(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  parent: bigint("parent", { mode: "bigint", unsigned: true }).notNull(),
  size: int("size").notNull(),
}, (t) => {
  return [
    index("parent_index").on(t.parent),
  ];
});

export const folders = createTable("folders_table", {
  id: bigint("id", { mode: "bigint", unsigned: true }).primaryKey().autoincrement(),
  name: text("name").notNull(),
  parent: bigint("parent", { mode: "bigint", unsigned: true }),
}, (t) => {
  return [
    index("parent_index").on(t.parent),
  ];
});
