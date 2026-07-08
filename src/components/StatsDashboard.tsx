'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Code, Star, GitFork, BookOpen, AlertCircle, RefreshCw, Trophy } from 'lucide-react';
import { Github } from '@/components/Icons';

// Interfaces for API structures
interface GithubProfile {
  username: string;
  avatarUrl: string;
  name: string;
  bio: string;
  publicRepos: number;
  followers: number;
  following: number;
  reposUrl: string;
}

interface GithubRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  htmlUrl: string;
}

interface LeetcodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalQuestions: number;
  easyQuestions: number;
  mediumQuestions: number;
  hardQuestions: number;
  acceptanceRate: number;
  ranking: number;
}

// Robust fallback static records
const FALLBACK_GITHUB_PROFILE: GithubProfile = {
  username: 'Dinesh2k06',
  avatarUrl: 'https://github.com/Dinesh2k06.png',
  name: 'Dinesh S',
  bio: 'B.Tech AI & Data Science Student | Aspiring AI & Generative AI Engineer',
  publicRepos: 18,
  followers: 12,
  following: 15,
  reposUrl: 'https://api.github.com/users/Dinesh2k06/repos',
};

const FALLBACK_GITHUB_REPOS: GithubRepo[] = [
  {
    name: 'Life-Lens',
    description: 'An AI-powered healthcare application providing personalized dietary recommendations and wellness indicators built using FlutterFlow and Gemini API.',
    language: 'Dart',
    stars: 3,
    forks: 1,
    htmlUrl: 'https://github.com/Dinesh2k06/Life-Lens',
  },
  {
    name: 'Sign-Language-to-Text-Converter',
    description: 'Computer vision and machine learning model that parses human hand gestures into readable textual characters in real-time.',
    language: 'Python',
    stars: 4,
    forks: 2,
    htmlUrl: 'https://github.com/Dinesh2k06/Sign-Language-to-Text-Converter',
  },
  {
    name: 'Portfolio-Website',
    description: 'Next.js App Router personal engineering portfolio styled with Tailwind CSS v4 and animated using Framer Motion.',
    language: 'TypeScript',
    stars: 1,
    forks: 0,
    htmlUrl: 'https://github.com/Dinesh2k06',
  },
  {
    name: 'AI-Agents-Sandbox',
    description: 'Experimental projects using LangChain and LangGraph to coordinate Multi-Agent structures solving research queries.',
    language: 'Python',
    stars: 2,
    forks: 0,
    htmlUrl: 'https://github.com/Dinesh2k06',
  }
];

const FALLBACK_LEETCODE: LeetcodeStats = {
  totalSolved: 142,
  easySolved: 76,
  mediumSolved: 58,
  hardSolved: 8,
  totalQuestions: 3300,
  easyQuestions: 820,
  mediumQuestions: 1720,
  hardQuestions: 760,
  acceptanceRate: 64.5,
  ranking: 312000,
};

const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes (reduced from 2 hours)

export default function StatsDashboard() {
  const [githubProfile, setGithubProfile] = useState<GithubProfile | null>(null);
  const [githubRepos, setGithubRepos] = useState<GithubRepo[]>([]);
  const [leetcode, setLeetcode] = useState<LeetcodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [leetcodeError, setLeetcodeError] = useState<string | null>(null);

  const fetchStats = async (forceRefresh = false) => {
    setLoading(true);
    setIsDemoMode(false);
    setLeetcodeError(null);
    
    const cachedTime = localStorage.getItem('stats_cache_time');
    const hasCache = cachedTime && (Date.now() - parseInt(cachedTime)) < CACHE_DURATION;

    if (hasCache && !forceRefresh) {
      const cachedProfile = localStorage.getItem('github_profile');
      const cachedRepos = localStorage.getItem('github_repos');
      const cachedLeetcode = localStorage.getItem('leetcode_stats');
      
      if (cachedProfile && cachedRepos && cachedLeetcode) {
        setGithubProfile(JSON.parse(cachedProfile));
        setGithubRepos(JSON.parse(cachedRepos));
        setLeetcode(JSON.parse(cachedLeetcode));
        setLoading(false);
        return;
      }
    }

    try {
      const res = await fetch('/api/stats');
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      
      // Use dynamic stats if available, otherwise fallback to local high-fidelity constants
      const profile = data.githubProfile || FALLBACK_GITHUB_PROFILE;
      const repos = (data.githubRepos && data.githubRepos.length > 0) ? data.githubRepos : FALLBACK_GITHUB_REPOS;
      
      let leetcodeStats = data.leetcode;

      if (data.leetcodeError) {
        setLeetcodeError(data.leetcodeError);
      }

      // Client-side fallback if server-side LeetCode fetching was blocked by Cloudflare on Vercel
      if (!leetcodeStats) {
        try {
          const lcRes = await fetch('https://leetcode-stats-api.herokuapp.com/Dinesh__2006/');
          if (lcRes.ok) {
            const lcData = await lcRes.json();
            if (lcData.status === 'success') {
              leetcodeStats = {
                totalSolved: lcData.totalSolved,
                easySolved: lcData.easySolved,
                mediumSolved: lcData.mediumSolved,
                hardSolved: lcData.hardSolved,
                totalQuestions: lcData.totalQuestions || 3300,
                easyQuestions: lcData.easyQuestions || 820,
                mediumQuestions: lcData.mediumQuestions || 1720,
                hardQuestions: lcData.hardQuestions || 760,
                acceptanceRate: lcData.acceptanceRate,
                ranking: lcData.ranking,
              };
              // Clear error if backup succeeded
              setLeetcodeError(null);
            }
          }
        } catch (clientLcErr) {
          console.warn('Client-side fallback LeetCode fetch failed:', clientLcErr);
        }
      }

      if (!leetcodeStats) {
        throw new Error(data.leetcodeError || 'LeetCode API failed on both GraphQL and backup endpoints.');
      }

      // Save to cache
      localStorage.setItem('github_profile', JSON.stringify(profile));
      localStorage.setItem('github_repos', JSON.stringify(repos));
      localStorage.setItem('leetcode_stats', JSON.stringify(leetcodeStats));
      localStorage.setItem('stats_cache_time', Date.now().toString());

      setGithubProfile(profile);
      setGithubRepos(repos);
      setLeetcode(leetcodeStats);
      setIsDemoMode(!data.githubProfile || leetcodeStats === FALLBACK_LEETCODE);
    } catch (error) {
      console.warn('Network stats fetch failed. Displaying connection warnings.', error);
      setIsDemoMode(true);
      const errorMsg = error instanceof Error ? error.message : String(error);
      setLeetcodeError(errorMsg);
      
      // Load fallback data for GitHub, but set LeetCode to null to trigger the "Unable to fetch" UI
      setGithubProfile(FALLBACK_GITHUB_PROFILE);
      setGithubRepos(FALLBACK_GITHUB_REPOS);
      setLeetcode(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchStats();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const getDifficultyPercent = (solved: number, total: number) => {
    if (!total) return 0;
    return Math.min(100, Math.round((solved / total) * 100));
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Loading Skeletons */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-6 rounded-2xl animate-pulse flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-zinc-300 dark:bg-zinc-800" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 bg-zinc-300 dark:bg-zinc-800 rounded" />
              <div className="h-3 w-2/3 bg-zinc-300 dark:bg-zinc-800 rounded" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass-panel p-5 rounded-xl h-32 animate-pulse bg-zinc-100/50 dark:bg-zinc-900/20" />
            ))}
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="glass-panel p-6 rounded-2xl h-[400px] animate-pulse bg-zinc-100/50 dark:bg-zinc-900/20" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${leetcodeError ? 'bg-[#F43F5E] animate-pulse' : (isDemoMode ? 'bg-amber-500' : 'bg-emerald-600 animate-ping')}`} />
          <span className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400">
            {leetcodeError ? 'LeetCode Sync Failed (Unreachable)' : (isDemoMode ? 'Displaying local cache' : 'Live Connected Integration')}
          </span>
        </div>
        
        <button
          onClick={() => fetchStats(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-600 dark:text-zinc-400 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors border border-black/5 dark:border-white/5 cursor-pointer"
        >
          <RefreshCw size={12} className="animate-hover" />
          Sync Profiles
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT SIDE: GitHub Panel */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          {/* GitHub Header Card */}
          {githubProfile && (
            <div className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/5 to-transparent pointer-events-none" />
              <Image
                src={githubProfile.avatarUrl}
                alt={githubProfile.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full border-2 border-brand-indigo/30 shadow-md group-hover:scale-105 transition-transform duration-300"
              />
              <div className="text-center sm:text-left flex-1 space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <h4 className="text-lg font-bold font-display text-zinc-900 dark:text-white">
                    {githubProfile.name}
                  </h4>
                  <a
                    href={`https://github.com/${githubProfile.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-brand-indigo dark:text-brand-purple hover:underline"
                  >
                    @{githubProfile.username}
                  </a>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  {githubProfile.bio}
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-4 pt-2 text-[11px] font-mono text-zinc-500">
                  <span><strong>{githubProfile.publicRepos}</strong> Repos</span>
                  <span>•</span>
                  <span><strong>{githubProfile.followers}</strong> Followers</span>
                  <span>•</span>
                  <span><strong>{githubProfile.following}</strong> Following</span>
                </div>
              </div>
              <Github className="absolute right-4 top-4 text-zinc-200/50 dark:text-zinc-800/30 w-16 h-16 pointer-events-none group-hover:rotate-12 transition-transform duration-300" />
            </div>
          )}

          {/* GitHub Repos Grid */}
          <div className="space-y-4">
            <h5 className="text-sm font-semibold tracking-wide text-zinc-400 font-mono flex items-center gap-2">
              <BookOpen size={14} />
              Featured Repositories
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {githubRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel p-5 rounded-xl flex flex-col justify-between h-36 hover:scale-[1.01] hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold font-display text-zinc-900 dark:text-zinc-100 group-hover:text-brand-indigo dark:group-hover:text-brand-purple text-sm truncate max-w-[150px]">
                        {repo.name}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-brand-indigo/10 text-brand-indigo dark:text-brand-purple font-mono text-[9px] font-bold">
                        {repo.language}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {repo.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-500 pt-2 border-t border-black/5 dark:border-white/5">
                    <span className="flex items-center gap-1">
                      <Star size={10} />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={10} />
                      {repo.forks}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: LeetCode Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          {leetcode ? (
            <div className="glass-panel p-6 rounded-2xl flex flex-col h-full justify-between relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 to-transparent pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <Code className="text-amber-500" size={18} />
                    <h4 className="font-bold font-display text-zinc-900 dark:text-white">
                      LeetCode Metrics
                    </h4>
                  </div>
                  <a
                    href="https://leetcode.com/u/Dinesh__2006/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-amber-500 hover:underline"
                  >
                    @Dinesh__2006
                  </a>
                </div>

                {/* Progress Wheel solved problems */}
                <div className="flex items-center justify-around py-4">
                  {/* Circle SVG */}
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      {/* Grey Track */}
                      <circle
                        cx="56"
                        cy="56"
                        r="45"
                        className="fill-none stroke-zinc-200 dark:stroke-zinc-800"
                        strokeWidth="8"
                      />
                      {/* Yellow Progress representation of solved */}
                      <circle
                        cx="56"
                        cy="56"
                        r="45"
                        className="fill-none stroke-amber-500"
                        strokeWidth="8"
                        strokeDasharray={2 * Math.PI * 45}
                        strokeDashoffset={2 * Math.PI * 45 * (1 - Math.min(0.9, leetcode.totalSolved / 250))}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center font-display">
                      <span className="text-2xl font-extrabold text-zinc-950 dark:text-white leading-none">
                        {leetcode.totalSolved}
                      </span>
                      <span className="text-[9px] text-zinc-400 font-mono tracking-wider uppercase mt-1">
                        Solved
                      </span>
                    </div>
                  </div>

                  {/* Right numbers column */}
                  <div className="space-y-2.5 flex-1 max-w-[150px] ml-4">
                    {/* Easy */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-emerald-500 font-semibold">Easy</span>
                        <span className="text-zinc-500 dark:text-zinc-400 font-mono">{leetcode.easySolved}</span>
                      </div>
                      <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{ width: `${getDifficultyPercent(leetcode.easySolved, 200)}%` }}
                        />
                      </div>
                    </div>

                    {/* Medium */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-amber-500 font-semibold">Medium</span>
                        <span className="text-zinc-500 dark:text-zinc-400 font-mono">{leetcode.mediumSolved}</span>
                      </div>
                      <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-500 h-full rounded-full"
                          style={{ width: `${getDifficultyPercent(leetcode.mediumSolved, 150)}%` }}
                        />
                      </div>
                    </div>

                    {/* Hard */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-red-500 font-semibold">Hard</span>
                        <span className="text-zinc-500 dark:text-zinc-400 font-mono">{leetcode.hardSolved}</span>
                      </div>
                      <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-red-500 h-full rounded-full"
                          style={{ width: `${getDifficultyPercent(leetcode.hardSolved, 50)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* LeetCode Footer stats */}
              <div className="grid grid-cols-2 gap-3 border-t border-black/5 dark:border-white/5 pt-4 text-xs font-mono">
                <div className="p-3 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5 flex items-center gap-2">
                  <Trophy className="text-amber-500 w-5 h-5 flex-shrink-0" />
                  <div>
                    <span className="text-[8px] text-zinc-500 block uppercase font-bold">Acceptance</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">{leetcode.acceptanceRate}%</span>
                  </div>
                </div>
                <div className="p-3 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5 flex items-center gap-2">
                  <AlertCircle className="text-zinc-400 w-5 h-5 flex-shrink-0" />
                  <div>
                    <span className="text-[8px] text-zinc-500 block uppercase font-bold">Global Rank</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                      {leetcode.ranking.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-6 rounded-2xl flex flex-col h-full justify-between relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 to-transparent pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <Code className="text-[#F43F5E]" size={18} />
                    <h4 className="font-bold font-display text-zinc-900 dark:text-white">
                      LeetCode Metrics
                    </h4>
                  </div>
                  <a
                    href="https://leetcode.com/u/Dinesh__2006/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#F43F5E] hover:underline"
                  >
                    @Dinesh__2006
                  </a>
                </div>

                <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                  <AlertCircle className="text-[#F43F5E] w-10 h-10 animate-pulse" />
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    Unable to fetch latest LeetCode stats.
                  </span>
                  <p className="text-[10px] text-zinc-500 max-w-[280px]">
                    We couldn&apos;t connect to LeetCode&apos;s endpoint. Please click &ldquo;Sync Profiles&rdquo; to retry.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
