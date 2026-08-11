import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Profile Queries & Mutations
export const getProfile = query({
  handler: async (ctx) => {
    return await ctx.db.query("profile").first();
  },
});

export const updateProfile = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("profile").first();
    if (existing) {
      await ctx.db.patch(existing._id, args);
      return existing._id;
    } else {
      return await ctx.db.insert("profile", args);
    }
  },
});

// Projects Queries & Mutations
export const getProjects = query({
  args: { category: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.category) {
      return await ctx.db
        .query("projects")
        .withIndex("by_category", (q) => q.eq("category", args.category!))
        .collect();
    }
    return await ctx.db.query("projects").collect();
  },
});

export const addProject = mutation({
  args: {
    title: v.string(),
    company: v.string(),
    category: v.string(),
    description: v.string(),
    tech_stack: v.array(v.string()),
    award_name: v.optional(v.string()),
    award_link: v.optional(v.string()),
    live_link: v.optional(v.string()),
    github_link: v.optional(v.string()),
    image: v.optional(v.string()),
    is_ongoing: v.boolean(),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("projects", args);
  },
});

export const updateProject = mutation({
  args: {
    id: v.id("projects"),
    title: v.string(),
    company: v.string(),
    category: v.string(),
    description: v.string(),
    tech_stack: v.array(v.string()),
    award_name: v.optional(v.string()),
    award_link: v.optional(v.string()),
    live_link: v.optional(v.string()),
    github_link: v.optional(v.string()),
    image: v.optional(v.string()),
    is_ongoing: v.boolean(),
    order: v.optional(v.number()),
  },
  handler: async (ctx, { id, ...data }) => {
    await ctx.db.patch(id, data);
  },
});

export const deleteProject = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Skills Queries & Mutations
export const getSkills = query({
  handler: async (ctx) => {
    return await ctx.db.query("skills").collect();
  },
});

export const addSkill = mutation({
  args: {
    name: v.string(),
    category: v.string(),
    proficiency: v.number(),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("skills", args);
  },
});

export const updateSkill = mutation({
  args: {
    id: v.id("skills"),
    name: v.string(),
    category: v.string(),
    proficiency: v.number(),
    order: v.optional(v.number()),
  },
  handler: async (ctx, { id, ...data }) => {
    await ctx.db.patch(id, data);
  },
});

export const deleteSkill = mutation({
  args: { id: v.id("skills") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Experience Queries & Mutations
export const getExperiences = query({
  handler: async (ctx) => {
    return await ctx.db.query("experience").collect();
  },
});

export const addExperience = mutation({
  args: {
    title: v.string(),
    company: v.string(),
    duration: v.string(),
    description: v.string(),
    is_academic: v.boolean(),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("experience", args);
  },
});

export const updateExperience = mutation({
  args: {
    id: v.id("experience"),
    title: v.string(),
    company: v.string(),
    duration: v.string(),
    description: v.string(),
    is_academic: v.boolean(),
    order: v.optional(v.number()),
  },
  handler: async (ctx, { id, ...data }) => {
    await ctx.db.patch(id, data);
  },
});

export const deleteExperience = mutation({
  args: { id: v.id("experience") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
