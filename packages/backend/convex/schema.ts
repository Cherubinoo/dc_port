import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  profile: defineTable({
    name: v.string(),
    role: v.string(),
    bio: v.string(),
    vision: v.string(),
    approach: v.optional(v.string()),
    leadership: v.optional(v.string()),
    current_focus: v.string(),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    github: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    resume: v.optional(v.string()),
    hero_image: v.optional(v.string()),
  }),

  projects: defineTable({
    title: v.string(),
    company: v.string(),
    category: v.string(), // "work" | "personal"
    description: v.string(),
    tech_stack: v.array(v.string()),
    award_name: v.optional(v.string()),
    award_link: v.optional(v.string()),
    live_link: v.optional(v.string()),
    github_link: v.optional(v.string()),
    image: v.optional(v.string()),
    is_ongoing: v.boolean(),
    order: v.optional(v.number()),
  }).index("by_category", ["category"]),

  skills: defineTable({
    name: v.string(),
    category: v.string(),
    proficiency: v.number(),
    order: v.optional(v.number()),
  }).index("by_category", ["category"]),

  experience: defineTable({
    title: v.string(),
    company: v.string(),
    duration: v.string(),
    description: v.string(),
    is_academic: v.boolean(),
    order: v.optional(v.number()),
  }),
});
