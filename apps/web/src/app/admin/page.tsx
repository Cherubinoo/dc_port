"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@dc/backend/convex/_generated/api";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Edit3,
  Sparkles,
  Lock,
  LogOut,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  Briefcase,
  Wrench,
  Award,
  Layers,
  FileText
} from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const authState = sessionStorage.getItem("dc_admin_auth");
    if (authState === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "cherubino" && password === "Iamthatiam@1234") {
      sessionStorage.setItem("dc_admin_auth", "true");
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid username or password. Please try again.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("dc_admin_auth");
    setIsAuthenticated(false);
  };

  // Convex Queries
  const profile = useQuery(api.portfolio.getProfile);
  const projects = useQuery(api.portfolio.getProjects, {});
  const skills = useQuery(api.portfolio.getSkills);
  const experiences = useQuery(api.portfolio.getExperiences);

  // Convex Mutations
  const updateProfile = useMutation(api.portfolio.updateProfile);
  const addProject = useMutation(api.portfolio.addProject);
  const updateProject = useMutation(api.portfolio.updateProject);
  const deleteProject = useMutation(api.portfolio.deleteProject);
  const addSkill = useMutation(api.portfolio.addSkill);
  const updateSkill = useMutation(api.portfolio.updateSkill);
  const deleteSkill = useMutation(api.portfolio.deleteSkill);
  const addExperience = useMutation(api.portfolio.addExperience);
  const updateExperience = useMutation(api.portfolio.updateExperience);
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
    leadership: "",
    approach: "",
    email: "",
    phone: "",
    github: "",
    linkedin: "",
    resume: "",
    hero_image: "",
  });

  // Project Modal State
  const [editingProject, setEditingProject] = useState<any>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: "",
    company: "",
    category: "work",
    description: "",
    tech_stack: "",
    award_name: "",
    award_link: "",
    live_link: "",
    github_link: "",
    image: "",
    is_ongoing: false,
  });

  // Skill Form State
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [skillForm, setSkillForm] = useState({
    name: "",
    category: "Frontend",
    proficiency: 90,
  });

  // Experience Form State
  const [editingExp, setEditingExp] = useState<any>(null);
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [expForm, setExpForm] = useState({
    title: "",
    company: "",
    duration: "",
    description: "",
    is_academic: false,
  });

  // Sync profile data when loaded
  useEffect(() => {
    if (profile) {
      setProfileForm({
        name: profile.name || "",
        role: profile.role || "",
        bio: profile.bio || "",
        vision: profile.vision || "",
        current_focus: profile.current_focus || "",
        leadership: profile.leadership || "",
        approach: profile.approach || "",
        email: profile.email || "",
        phone: profile.phone || "",
        github: profile.github || "",
        linkedin: profile.linkedin || "",
        resume: profile.resume || "",
        hero_image: profile.hero_image || "",
      });
    }
  }, [profile]);

  const showNotification = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 3500);
  };

  // Save Profile
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(profileForm);
      showNotification("Profile details updated successfully!");
    } catch (err) {
      console.error(err);
      showNotification("Failed to update profile.");
    }
  };

  // Open Project Modal (Add or Edit)
  const openProjectModal = (proj?: any) => {
    if (proj) {
      setEditingProject(proj);
      setProjectForm({
        title: proj.title || "",
        company: proj.company || "",
        category: proj.category || "work",
        description: proj.description || "",
        tech_stack: (proj.tech_stack || []).join(", "),
        award_name: proj.award_name || "",
        award_link: proj.award_link || "",
        live_link: proj.live_link || "",
        github_link: proj.github_link || "",
        image: proj.image || "",
        is_ongoing: !!proj.is_ongoing,
      });
    } else {
      setEditingProject(null);
      setProjectForm({
        title: "",
        company: "",
        category: "work",
        description: "",
        tech_stack: "",
        award_name: "",
        award_link: "",
        live_link: "",
        github_link: "",
        image: "",
        is_ongoing: false,
      });
    }
    setIsProjectModalOpen(true);
  };

  // Save Project (Add / Edit)
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const techArray = projectForm.tech_stack
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title: projectForm.title,
      company: projectForm.company,
      category: projectForm.category,
      description: projectForm.description,
      tech_stack: techArray,
      award_name: projectForm.award_name || undefined,
      award_link: projectForm.award_link || undefined,
      live_link: projectForm.live_link || undefined,
      github_link: projectForm.github_link || undefined,
      image: projectForm.image || undefined,
      is_ongoing: projectForm.is_ongoing,
    };

    try {
      if (editingProject) {
        await updateProject({ id: editingProject._id, ...payload });
        showNotification("Project updated successfully!");
      } else {
        await addProject(payload);
        showNotification("New project added successfully!");
      }
      setIsProjectModalOpen(false);
    } catch (err) {
      console.error(err);
      showNotification("Failed to save project.");
    }
  };

  // Open Skill Modal
  const openSkillModal = (sk?: any) => {
    if (sk) {
      setEditingSkill(sk);
      setSkillForm({
        name: sk.name || "",
        category: sk.category || "Backend",
        proficiency: sk.proficiency || 90,
      });
    } else {
      setEditingSkill(null);
      setSkillForm({
        name: "",
        category: "Backend",
        proficiency: 90,
      });
    }
    setIsSkillModalOpen(true);
  };

  // Save Skill
  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await updateSkill({ id: editingSkill._id, ...skillForm });
        showNotification("Skill updated!");
      } else {
        await addSkill(skillForm);
        showNotification("Skill added!");
      }
      setIsSkillModalOpen(false);
    } catch (err) {
      console.error(err);
      showNotification("Failed to save skill.");
    }
  };

  // Open Experience Modal
  const openExpModal = (exp?: any) => {
    if (exp) {
      setEditingExp(exp);
      setExpForm({
        title: exp.title || "",
        company: exp.company || "",
        duration: exp.duration || "",
        description: exp.description || "",
        is_academic: !!exp.is_academic,
      });
    } else {
      setEditingExp(null);
      setExpForm({
        title: "",
        company: "",
        duration: "",
        description: "",
        is_academic: false,
      });
    }
    setIsExpModalOpen(true);
  };

  // Save Experience
  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingExp) {
        await updateExperience({ id: editingExp._id, ...expForm });
        showNotification("Experience milestone updated!");
      } else {
        await addExperience(expForm);
        showNotification("Experience milestone added!");
      }
      setIsExpModalOpen(false);
    } catch (err) {
      console.error(err);
      showNotification("Failed to save experience.");
    }
  };

  // Handle Database Reset / Seed
  const handleSeed = async () => {
    if (confirm("Reset and restore initial database seed data?")) {
      try {
        const res = await seedData();
        showNotification(res || "Database re-seeded!");
      } catch (err) {
        console.error(err);
        showNotification("Error seeding database.");
      }
    }
  };

  // Render Login Screen if unauthenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#060503] flex items-center justify-center p-4">
        <div className="w-full max-w-md glass-panel p-8 rounded-3xl border-[#FB6C00]/30 shadow-2xl space-y-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="p-4 rounded-2xl bg-[#FB6C00]/20 text-[#FFDD9C] border border-[#FB6C00]/40">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Admin CMS Authentication</h1>
            <p className="text-slate-400 text-xs font-mono">delightcherubino.com/admin</p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800/60 text-red-300 text-xs font-mono">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase font-semibold">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="cherubino"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:border-[#F9B637] outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase font-semibold">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:border-[#F9B637] outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E73F1E] via-[#FB6C00] to-[#F9B637] text-white font-bold text-sm shadow-lg shadow-[#FB6C00]/25 hover:brightness-110 transition-all border border-[#FFDD9C]/30"
            >
              Sign In to Admin CMS
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-slate-400 hover:text-white font-mono underline">
              Back to Portfolio Page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060503] text-slate-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2.5 rounded-full glass-panel text-slate-400 hover:text-white transition-colors border-[#FB6C00]/30"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                <span>Cherubino CMS Dashboard</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FB6C00]/20 text-[#FFDD9C] font-mono border border-[#FB6C00]/40">
                  Admin
                </span>
              </h1>
              <p className="text-slate-400 text-xs font-mono">delightcherubino.com/admin</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSeed}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-[#F9B637]/40 text-[#FFDD9C] hover:bg-[#FB6C00]/20 text-xs font-mono font-medium transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#F9B637]" />
              <span>Re-Seed Initial Data</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-950/60 border border-red-800/60 text-red-400 hover:bg-red-900/80 text-xs font-mono font-medium transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Status Toast */}
        {statusMsg && (
          <div className="p-4 rounded-xl bg-[#FB6C00]/20 border border-[#FB6C00]/50 text-[#FFDD9C] text-sm font-mono flex items-center gap-2 shadow-lg">
            <CheckCircle2 className="w-5 h-5 text-[#F9B637]" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/80">
          {(
            [
              { id: "profile", label: "Profile Info", icon: FileText },
              { id: "projects", label: "Projects & ChromaGrid", icon: Layers },
              { id: "skills", label: "Technical Skills", icon: Wrench },
              { id: "experience", label: "Journey Milestones", icon: Award },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-mono transition-all border-b-2 ${
                  isActive
                    ? "border-[#FB6C00] text-[#FFDD9C] font-semibold bg-[#FB6C00]/10"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <form onSubmit={handleSaveProfile} className="space-y-6 max-w-4xl glass-panel p-8 rounded-3xl border-slate-800">
            <h2 className="text-xl font-bold text-white mb-4">Edit Portfolio Profile Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-[#F9B637] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Role Title</label>
                <input
                  type="text"
                  value={profileForm.role}
                  onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-[#F9B637] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Hero Avatar / Image URL</label>
              <input
                type="text"
                value={profileForm.hero_image}
                onChange={(e) => setProfileForm({ ...profileForm, hero_image: e.target.value })}
                placeholder="/images/1.jpg"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-[#F9B637] outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Bio</label>
              <textarea
                rows={4}
                value={profileForm.bio}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-[#F9B637] outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Vision</label>
                <textarea
                  rows={3}
                  value={profileForm.vision}
                  onChange={(e) => setProfileForm({ ...profileForm, vision: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-[#F9B637] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Current Focus</label>
                <textarea
                  rows={3}
                  value={profileForm.current_focus}
                  onChange={(e) => setProfileForm({ ...profileForm, current_focus: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-[#F9B637] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Email</label>
                <input
                  type="text"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-[#F9B637] outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Phone</label>
                <input
                  type="text"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-[#F9B637] outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">GitHub URL</label>
                <input
                  type="text"
                  value={profileForm.github}
                  onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-[#F9B637] outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={profileForm.linkedin}
                  onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-[#F9B637] outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Resume PDF Path</label>
                <input
                  type="text"
                  value={profileForm.resume}
                  onChange={(e) => setProfileForm({ ...profileForm, resume: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-[#F9B637] outline-none font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#E73F1E] via-[#FB6C00] to-[#F9B637] text-white font-bold text-sm shadow-xl shadow-[#FB6C00]/20 hover:brightness-110 transition-all border border-[#FFDD9C]/40"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Details</span>
            </button>
          </form>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">All Projects & Case Studies</h2>
                <p className="text-xs text-slate-400 font-mono">Displayed via ChromaGrid in Selected Case Studies & Digital Crafts</p>
              </div>
              <button
                onClick={() => openProjectModal()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E73F1E] to-[#FB6C00] text-white font-bold text-xs shadow-lg hover:brightness-110 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects?.map((proj: any) => (
                <div
                  key={proj._id}
                  className="p-5 rounded-2xl glass-panel border-slate-800 flex flex-col justify-between gap-4 hover:border-[#FB6C00]/50 transition-all"
                >
                  <div className="space-y-3">
                    {proj.image ? (
                      <div className="w-full h-36 rounded-xl overflow-hidden border border-slate-700/60 relative">
                        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-full h-24 rounded-xl bg-slate-900 border border-dashed border-slate-700 flex items-center justify-center text-slate-500 text-xs font-mono gap-2">
                        <ImageIcon className="w-4 h-4" />
                        <span>No image assigned</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FB6C00]/20 text-[#FFDD9C] text-xs font-mono border border-[#FB6C00]/40 capitalize">
                        {proj.category}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{proj.company}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white">{proj.title}</h3>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{proj.description}</p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                    <button
                      onClick={() => openProjectModal(proj)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#F9B637]" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete project "${proj.title}"?`)) {
                          deleteProject({ id: proj._id });
                          showNotification("Project deleted!");
                        }
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/50 hover:bg-red-900/80 text-red-400 text-xs font-mono transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Technical Skills Stack</h2>
                <p className="text-xs text-slate-400 font-mono">Manage categories and proficiency percentages</p>
              </div>
              <button
                onClick={() => openSkillModal()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FB6C00] to-[#F9B637] text-white font-bold text-xs shadow-lg hover:brightness-110 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Skill</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {skills?.map((sk: any) => (
                <div key={sk._id} className="p-4 rounded-xl glass-panel border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white">{sk.name}</div>
                    <div className="text-xs font-mono text-[#F9B637] mt-0.5">
                      {sk.category} • {sk.proficiency}%
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openSkillModal(sk)}
                      className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#F9B637]" />
                    </button>
                    <button
                      onClick={() => {
                        deleteSkill({ id: sk._id });
                        showNotification("Skill deleted");
                      }}
                      className="p-2 rounded-lg bg-red-950/50 text-red-400 hover:bg-red-900/80 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === "experience" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Experience & Milestones</h2>
                <p className="text-xs text-slate-400 font-mono">Manage history timeline entries</p>
              </div>
              <button
                onClick={() => openExpModal()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E73F1E] to-[#FB6C00] text-white font-bold text-xs shadow-lg hover:brightness-110 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Milestone</span>
              </button>
            </div>

            <div className="space-y-4">
              {experiences?.map((exp: any) => (
                <div key={exp._id} className="p-5 rounded-2xl glass-panel border-slate-800 flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="text-xs font-mono text-[#F9B637]">{exp.duration} • {exp.company}</div>
                    <div className="text-lg font-bold text-white">{exp.title}</div>
                    <div className="text-xs text-slate-300 line-clamp-2 whitespace-pre-line">{exp.description}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openExpModal(exp)}
                      className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    >
                      <Edit3 className="w-4 h-4 text-[#F9B637]" />
                    </button>
                    <button
                      onClick={() => {
                        deleteExperience({ id: exp._id });
                        showNotification("Milestone deleted");
                      }}
                      className="p-2 rounded-lg bg-red-950/50 text-red-400 hover:bg-red-900/80 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Project Modal Form */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl glass-panel p-6 rounded-3xl border-slate-700 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h3>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#F9B637] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.company}
                    onChange={(e) => setProjectForm({ ...projectForm, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#F9B637] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Category *</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#F9B637] outline-none"
                  >
                    <option value="work">Work / Selected Case Studies</option>
                    <option value="personal">Personal / Digital Crafts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Image URL (Optional)</label>
                  <input
                    type="text"
                    value={projectForm.image}
                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                    placeholder="/images/2.jpg or https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#F9B637] outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Description *</label>
                <textarea
                  rows={4}
                  required
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#F9B637] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Tech Stack (comma-separated)</label>
                <input
                  type="text"
                  value={projectForm.tech_stack}
                  onChange={(e) => setProjectForm({ ...projectForm, tech_stack: e.target.value })}
                  placeholder="Python, YOLOv8, OpenCV, React"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#F9B637] outline-none font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Live Demo / App URL</label>
                  <input
                    type="text"
                    value={projectForm.live_link}
                    onChange={(e) => setProjectForm({ ...projectForm, live_link: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#F9B637] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">GitHub Repo URL</label>
                  <input
                    type="text"
                    value={projectForm.github_link}
                    onChange={(e) => setProjectForm({ ...projectForm, github_link: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#F9B637] outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Award Title (Optional)</label>
                  <input
                    type="text"
                    value={projectForm.award_name}
                    onChange={(e) => setProjectForm({ ...projectForm, award_name: e.target.value })}
                    placeholder="1st Prize - INNOVANZA 2025"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#F9B637] outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    id="ongoing"
                    checked={projectForm.is_ongoing}
                    onChange={(e) => setProjectForm({ ...projectForm, is_ongoing: e.target.checked })}
                    className="w-4 h-4 accent-[#FB6C00]"
                  />
                  <label htmlFor="ongoing" className="text-xs font-mono text-slate-300">
                    Ongoing Project
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-slate-800 text-slate-300 text-xs font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E73F1E] to-[#FB6C00] text-white font-bold text-xs shadow-lg"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Skill Modal Form */}
      {isSkillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md glass-panel p-6 rounded-3xl border-slate-700 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white">
                {editingSkill ? "Edit Skill" : "Add New Skill"}
              </h3>
              <button onClick={() => setIsSkillModalOpen(false)} className="p-2 text-slate-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSkill} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#F9B637] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Category *</label>
                <input
                  type="text"
                  required
                  value={skillForm.category}
                  onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                  placeholder="AI & ML, Backend, Frontend, System Design"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#F9B637] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Proficiency % ({skillForm.proficiency}%)</label>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={skillForm.proficiency}
                  onChange={(e) => setSkillForm({ ...skillForm, proficiency: parseInt(e.target.value) })}
                  className="w-full accent-[#FB6C00]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsSkillModalOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-slate-800 text-slate-300 text-xs font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FB6C00] to-[#F9B637] text-white font-bold text-xs shadow-lg"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Experience Modal Form */}
      {isExpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg glass-panel p-6 rounded-3xl border-slate-700 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white">
                {editingExp ? "Edit Milestone" : "Add New Milestone"}
              </h3>
              <button onClick={() => setIsExpModalOpen(false)} className="p-2 text-slate-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveExp} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Title / Role *</label>
                <input
                  type="text"
                  required
                  value={expForm.title}
                  onChange={(e) => setExpForm({ ...expForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#F9B637] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Company / Organization *</label>
                <input
                  type="text"
                  required
                  value={expForm.company}
                  onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#F9B637] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Duration *</label>
                <input
                  type="text"
                  required
                  value={expForm.duration}
                  onChange={(e) => setExpForm({ ...expForm, duration: e.target.value })}
                  placeholder="Aug 2025 – Present"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#F9B637] outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Description (Bullet points)</label>
                <textarea
                  rows={4}
                  value={expForm.description}
                  onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                  placeholder="• Point 1&#10;• Point 2"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#F9B637] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsExpModalOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-slate-800 text-slate-300 text-xs font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E73F1E] to-[#FB6C00] text-white font-bold text-xs shadow-lg"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
