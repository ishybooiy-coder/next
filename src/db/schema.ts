import { pgTable, serial, text, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  price: integer("price").notNull(), // in cents
  description: text("description").notNull(),
  details: text("details").notNull(),
  image: text("image").notNull(),
  gallery: jsonb("gallery").$type<string[]>().notNull().default([]),
  materials: jsonb("materials").$type<string[]>().notNull().default([]),
  featured: boolean("featured").notNull().default(false),
  stock: integer("stock").notNull().default(10),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Product = typeof products.$inferSelect;

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
  author: text("author").notNull(),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
