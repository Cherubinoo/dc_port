"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@dc/backend/convex/_generated/api";
import { ArrowLeft, Save, Plus, Trash2, Edit3, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const profile = useQuery(api.portfolio.getProfile);
  const projects = useQuery(api.portfolio.getProjects, {});
  const skills = useQuery(api.portfolio.getSkills);
  const experiences = useQuery(api.portfolio.getExperiences);

  const updateProfile = useMutation(api.portfolio.updateProfile);
  const addProject = useMutation(api.portfolio.addProject);
  const deleteProject = useMutation(api.portfolio.deleteProject);
  const addSkill = useMutation(api.portfolio.addSkill);
  const deleteSkill = useMutation(api.portfolio.deleteSkill);
  const addExperience = useMutation(api.portfolio.addExperience);
  const deleteExperience = useMutation(api.portfolio.deleteExperience);
  const seedData = useMutation(api.seed.seedData);

  const [activeTab, setActiveTab] = useState<"profile" | "projects" | "skills" | "experience">("profile");
  const [statusMsg, setStatusMsg] = useState("");

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: "",
    role: "",
    bio: "",
    vision: "",
    current_focus: "",
    email: "",
    phone: "",
    github: "",
    linkedin: "",
    resume: "",
  });

  // Sync profile data when loaded
  React.useEffect(() => {
    if (profile) {
      setProfileForm({
        name: profile.name || "",
        role: profile.role || "",
        bio: profile.bio || "",
        vision: profile.vision || "",
        current_focus: profile.current_focus || "",
        email: profile.email || "",
        phone: profile.phone || "",
        github: profile.github || "",
        linkedin: profile.linkedin || "",
        resume: profile.resume || "",
      });
    }
  }, [profile]);

  // Handle Profile Save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(profileForm);
      setStatusMsg("Profile updated successfully!");
      setTimeout(() => setStatusMsg(""), 3000);
    } catch (err) {
      console.error(err);
      setStatusMsg("Error updating profile");
    }
  };

  // Handle Seed
  const handleSeed = async () => {
    try {
      const res = await seedData();
      setStatusMsg(res || "Database seeded!");
      setTimeout(() => setStatusMsg(""), 3000);
    } catch (err) {
      console.error(err);
      setStatusMsg("Error seeding data");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-full glass-panel text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Convex Portfolio Admin</h1>
              <p className="text-slate-400 text-xs font-mono">Managed via agile-flamingo-652.convex.cloud</p>
            </div>
          </div>

          <button
            onClick={handleSeed}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs shadow-lg transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Reset & Seed Initial Data</span>
          </button>
        </div>

        {statusMsg && (
          <div className="p-4 rounded-xl bg-blue-950/80 border border-blue-700/60 text-blue-300 text-sm font-medium">
            {statusMsg}
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-slate-800/80">
          {(["profile", "projects", "skills", "experience"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-mono capitalize transition-all border-b-2 ${
                activeTab === tab
                  ? "border-blue-500 text-blue-400 font-semibold"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <form onSubmit={handleSaveProfile} className="space-y-6 max-w-3xl glass-panel p-6 rounded-2xl border-slate-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Role Title</label>
                <input
                  type="text"
                  value={profileForm.role}
                  onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Bio</label>
              <textarea
                rows={4}
                value={profileForm.bio}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Vision</label>
              <textarea
                rows={3}
                value={profileForm.vision}
                onChange={(e) => setProfileForm({ ...profileForm, vision: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-blue-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Email</label>
                <input
                  type="text"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Phone</label>
                <input
                  type="text"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm shadow-md transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
          </form>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects?.map((proj: any) => (
                <div key={proj._id} className="p-4 rounded-xl glass-panel border-slate-800 flex items-start justify-between">
                  <div>
                    <div className="text-xs font-mono text-blue-400 uppercase">{proj.category} • {proj.company}</div>
                    <div className="text-lg font-bold text-slate-100">{proj.title}</div>
                    {proj.award_name && <div className="text-xs text-amber-400 font-semibold mt-1">🏆 {proj.award_name}</div>}
                  </div>
                  <button
                    onClick={() => deleteProject({ id: proj._id })}
                    className="p-2 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/60 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {skills?.map((sk: any) => (
                <div key={sk._id} className="p-4 rounded-xl glass-panel border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-200">{sk.name}</div>
                    <div className="text-xs font-mono text-slate-400">{sk.category} • {sk.proficiency}%</div>
                  </div>
                  <button
                    onClick={() => deleteSkill({ id: sk._id })}
                    className="p-2 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/60 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === "experience" && (
          <div className="space-y-4">
            {experiences?.map((exp: any) => (
              <div key={exp._id} className="p-4 rounded-xl glass-panel border-slate-800 flex items-start justify-between">
                <div>
                  <div className="text-xs font-mono text-emerald-400">{exp.duration} • {exp.company}</div>
                  <div className="text-lg font-bold text-slate-100">{exp.title}</div>
                </div>
                <button
                  onClick={() => deleteExperience({ id: exp._id })}
                  className="p-2 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/60 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
