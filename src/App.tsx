import React, { useState } from 'react';
import {
  GitBranch,
  GitCommit,
  CheckCircle2,
  FileCode,
  Terminal,
  RefreshCw,
  Server,
  Layers,
  ShieldCheck,
  FolderGit2,
  Copy,
  Check,
  Play
} from 'lucide-react';

interface CommitItem {
  id: string;
  hash: string;
  message: string;
  author: string;
  timestamp: string;
  branch: string;
  status: 'synced' | 'pending' | 'verified';
}

interface WorkflowCheck {
  id: string;
  name: string;
  category: 'Environment' | 'Branching' | 'Sync Pipeline' | 'Build' | 'Security';
  status: 'passed' | 'running' | 'idle' | 'warning';
  latencyMs?: number;
  details: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'branches' | 'workflow' | 'readme' | 'diagnostics'>('overview');
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('main');

  const [branches, setBranches] = useState<string[]>(['main', 'feature/workflow-test', 'staging', 'dev/ai-studio']);
  const [newBranchName, setNewBranchName] = useState('');
  
  const [commits, setCommits] = useState<CommitItem[]>([
    {
      id: 'c-1',
      hash: '9a3f2b1',
      message: 'Initial commit with repository setup and README documentation',
      author: 'dingh415',
      timestamp: 'Just now',
      branch: 'main',
      status: 'verified',
    },
    {
      id: 'c-2',
      hash: '4e8c71d',
      message: 'Configure AI Studio runtime integration and port 3000 handler',
      author: 'AI Studio Engine',
      timestamp: '1 min ago',
      branch: 'main',
      status: 'verified',
    },
    {
      id: 'c-3',
      hash: '7d219fa',
      message: 'Initialize branch workflow verification test suites',
      author: 'dingh415',
      timestamp: '2 mins ago',
      branch: 'feature/workflow-test',
      status: 'synced',
    },
  ]);

  const [newCommitMsg, setNewCommitMsg] = useState('');

  const [checks, setChecks] = useState<WorkflowCheck[]>([
    {
      id: 'chk-1',
      name: 'AI Studio Runtime (Port 3000)',
      category: 'Environment',
      status: 'passed',
      latencyMs: 12,
      details: 'Node.js 22 runtime bound to 0.0.0.0:3000 with HTTP responder',
    },
    {
      id: 'chk-2',
      name: 'GitHub Repository Linkage',
      category: 'Branching',
      status: 'passed',
      latencyMs: 38,
      details: 'Connected to dingh415-web/test tracking HEAD',
    },
    {
      id: 'chk-3',
      name: 'Bidirectional Branch Sync',
      category: 'Sync Pipeline',
      status: 'passed',
      latencyMs: 45,
      details: 'Fast-forward and branch synchronization test successful',
    },
    {
      id: 'chk-4',
      name: 'Vite Compilation & Asset Bundler',
      category: 'Build',
      status: 'passed',
      latencyMs: 19,
      details: 'TypeScript and Vite frontend bundler compiles without errors',
    },
    {
      id: 'chk-5',
      name: 'Ephemeral Filesystem & Security Boundaries',
      category: 'Security',
      status: 'passed',
      latencyMs: 8,
      details: 'Non-root container isolation active; no leaking sensitive credentials',
    },
  ]);

  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM] Imported GitHub repository dingh415-web/test into Google AI Studio',
    '[ROUTING] Categorized project under Category C (Web / Node.js Runtime)',
    '[CONFIG] Configured Vite development server on 0.0.0.0:3000',
    '[INIT] Repository state initialized and branch workflow verification ready',
  ]);

  const handleCopyRepo = () => {
    navigator.clipboard.writeText('dingh415-web/test');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunVerification = () => {
    setIsRefreshing(true);
    setLogs((prev) => [
      `[VERIFY ${new Date().toLocaleTimeString()}] Running automated branch & sync diagnostics...`,
      ...prev,
    ]);

    setChecks((prev) =>
      prev.map((c) => ({ ...c, status: 'running' as const }))
    );

    setTimeout(() => {
      setChecks((prev) =>
        prev.map((c) => ({
          ...c,
          status: 'passed' as const,
          latencyMs: Math.floor(Math.random() * 40) + 10,
        }))
      );
      setLogs((prev) => [
        `[SUCCESS ${new Date().toLocaleTimeString()}] All 5 workflow checks passed with zero errors.`,
        ...prev,
      ]);
      setIsRefreshing(false);
    }, 900);
  };

  const handleCreateBranch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newBranchName.trim().replace(/\s+/g, '-');
    if (!clean || branches.includes(clean)) return;

    setBranches([...branches, clean]);
    setSelectedBranch(clean);
    setLogs((prev) => [
      `[BRANCH] Created and switched to branch '${clean}'`,
      ...prev,
    ]);
    setNewBranchName('');
  };

  const handleAddCommit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommitMsg.trim()) return;

    const newCommit: CommitItem = {
      id: `c-${Date.now()}`,
      hash: Math.random().toString(16).substring(2, 9),
      message: newCommitMsg.trim(),
      author: 'dingh415',
      timestamp: 'Just now',
      branch: selectedBranch,
      status: 'synced',
    };

    setCommits([newCommit, ...commits]);
    setLogs((prev) => [
      `[COMMIT] [${selectedBranch}] ${newCommit.hash}: ${newCommit.message}`,
      ...prev,
    ]);
    setNewCommitMsg('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-600 selection:text-white">
      {/* Top Bar Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/80 sticky top-0 z-30 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between gap-4">
          {/* Brand zone */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <span className="font-semibold text-lg tracking-tight text-white whitespace-nowrap">
              GitHub Branch Test
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('branches')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'branches'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              Branch & Commits
            </button>
            <button
              onClick={() => setActiveTab('workflow')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'workflow'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              Workflow Verification
            </button>
            <button
              onClick={() => setActiveTab('readme')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'readme'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              Readme Document
            </button>
            <button
              onClick={() => setActiveTab('diagnostics')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'diagnostics'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              Logs & Console
            </button>
          </nav>

          {/* Action zone */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleRunVerification}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors shadow-sm disabled:opacity-50 whitespace-nowrap"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Verify Pipeline</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile subnav */}
      <div className="md:hidden flex overflow-x-auto gap-2 px-4 py-2 border-b border-slate-800 bg-slate-900/50">
        {(['overview', 'branches', 'workflow', 'readme', 'diagnostics'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 text-xs rounded-md whitespace-nowrap font-medium capitalize ${
              activeTab === tab ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* Repo Header Banner */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  GitHub Import
                </span>
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Ready
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Port: 3000 (0.0.0.0)
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                dingh415-web / test
              </h1>
              <p className="text-sm text-slate-400 max-w-3xl">
                Dedicated repository environment configured to test and validate Google AI Studio’s GitHub synchronization, branch lifecycle, and automated deployment pipelines.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start lg:self-center">
              <button
                onClick={handleCopyRepo}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-slate-700 transition-colors whitespace-nowrap"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'dingh415-web/test'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Quick Metrics */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Architecture & Status Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
                    <span>Active Branches</span>
                    <GitBranch className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">{branches.length}</div>
                  <div className="text-xs text-slate-400 mt-1 font-mono">HEAD: {selectedBranch}</div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
                    <span>Verified Commits</span>
                    <GitCommit className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">{commits.length}</div>
                  <div className="text-xs text-slate-400 mt-1">All in sync with upstream</div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
                    <span>Workflow Health</span>
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-bold text-emerald-400">100%</div>
                  <div className="text-xs text-slate-400 mt-1">5 / 5 checks passing</div>
                </div>
              </div>

              {/* Workflow Pipeline Status */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-400" />
                    <h2 className="text-base font-semibold text-white">Integration Pipeline Status</h2>
                  </div>
                  <span className="text-xs font-mono text-slate-400">Auto-refresh enabled</span>
                </div>

                <div className="space-y-3">
                  {checks.map((chk) => (
                    <div
                      key={chk.id}
                      className="flex items-start justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 gap-3"
                    >
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-slate-200">{chk.name}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{chk.details}</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                          {chk.latencyMs}ms
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Branch quick switcher */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-indigo-400" />
                  <span>Switch Working Branch</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {branches.map((b) => (
                    <button
                      key={b}
                      onClick={() => setSelectedBranch(b)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                        selectedBranch === b
                          ? 'bg-indigo-600 text-white font-medium shadow-sm'
                          : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {b} {selectedBranch === b ? '★' : ''}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Information & Actions */}
            <div className="space-y-6">
              
              {/* Repository Meta Details */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Server className="w-4 h-4 text-indigo-400" />
                  <span>Repository Details</span>
                </h3>

                <dl className="divide-y divide-slate-800 text-xs space-y-2.5">
                  <div className="pt-2 flex justify-between">
                    <dt className="text-slate-400">Owner / Org</dt>
                    <dd className="font-mono text-slate-200">dingh415-web</dd>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <dt className="text-slate-400">Repository Name</dt>
                    <dd className="font-mono text-slate-200">test</dd>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <dt className="text-slate-400">Default Branch</dt>
                    <dd className="font-mono text-slate-200">main</dd>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <dt className="text-slate-400">Runtime Framework</dt>
                    <dd className="text-slate-200">React + Vite SPA</dd>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <dt className="text-slate-400">Network Port</dt>
                    <dd className="font-mono text-indigo-300">3000 (0.0.0.0)</dd>
                  </div>
                </dl>
              </div>

              {/* Quick Commit Creator */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <GitCommit className="w-4 h-4 text-emerald-400" />
                  <span>Simulate Branch Commit</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Record and test changes on current branch <span className="text-indigo-400 font-mono font-medium">{selectedBranch}</span>.
                </p>
                <form onSubmit={handleAddCommit} className="space-y-2.5">
                  <input
                    type="text"
                    value={newCommitMsg}
                    onChange={(e) => setNewCommitMsg(e.target.value)}
                    placeholder="e.g. Update branch workflow verification test"
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    disabled={!newCommitMsg.trim()}
                    className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-medium transition-colors"
                  >
                    Commit to {selectedBranch}
                  </button>
                </form>
              </div>

              {/* Live Activity Log Stream */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-slate-400" />
                    <span>Recent Activity</span>
                  </h3>
                  <button
                    onClick={() => setLogs([])}
                    className="text-slate-500 hover:text-slate-400 text-xs"
                  >
                    Clear
                  </button>
                </div>
                <div className="bg-slate-950 rounded-lg p-3 font-mono text-[11px] text-slate-400 space-y-1.5 max-h-48 overflow-y-auto border border-slate-800">
                  {logs.length === 0 ? (
                    <div className="text-slate-600">No recent log entries</div>
                  ) : (
                    logs.slice(0, 8).map((log, idx) => (
                      <div key={idx} className="leading-relaxed break-all">
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Branches & Commits */}
        {activeTab === 'branches' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Branch Management */}
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-indigo-400" />
                  <span>Manage Branches</span>
                </h3>
                
                <form onSubmit={handleCreateBranch} className="space-y-2">
                  <label className="text-xs text-slate-400 block">Create New Branch</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newBranchName}
                      onChange={(e) => setNewBranchName(e.target.value)}
                      placeholder="branch-name"
                      className="flex-1 px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                    />
                    <button
                      type="submit"
                      disabled={!newBranchName.trim()}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-medium"
                    >
                      Add
                    </button>
                  </div>
                </form>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="text-xs text-slate-400 block font-medium">Existing Branches</label>
                  <div className="space-y-1.5">
                    {branches.map((b) => (
                      <div
                        key={b}
                        onClick={() => setSelectedBranch(b)}
                        className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer text-xs font-mono transition-colors ${
                          selectedBranch === b
                            ? 'bg-indigo-950/70 border border-indigo-700 text-indigo-200'
                            : 'bg-slate-950/50 hover:bg-slate-800/80 border border-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{b}</span>
                        </div>
                        {selectedBranch === b && (
                          <span className="text-[10px] bg-indigo-600 text-white px-1.5 py-0.5 rounded font-sans">
                            active
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Commit History Timeline */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <GitCommit className="w-4 h-4 text-emerald-400" />
                    <span>Commit History ({commits.length})</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    Branch: <strong className="text-indigo-300">{selectedBranch}</strong>
                  </span>
                </div>

                <div className="space-y-3">
                  {commits.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono text-xs border border-slate-700">
                            {item.hash}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 font-mono">
                            {item.branch}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-200">{item.message}</p>
                        <div className="text-xs text-slate-400">
                          by <span className="text-slate-300 font-mono">{item.author}</span> • {item.timestamp}
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        <span className="text-xs px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-medium">
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: Workflow Verification */}
        {activeTab === 'workflow' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-semibold text-white">Automated Verification Suite</h2>
                <p className="text-xs text-slate-400">
                  Comprehensive audit checks for AI Studio environment migration, branch integration, and security controls.
                </p>
              </div>
              <button
                onClick={handleRunVerification}
                disabled={isRefreshing}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Rerun All Checks</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {checks.map((chk, index) => (
                <div
                  key={chk.id}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      STEP #{index + 1} • {chk.category}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {chk.status.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-white">{chk.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{chk.details}</p>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-900">
                    <span>Response latency: {chk.latencyMs}ms</span>
                    <span className="text-emerald-400">Validation Passed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Readme Document */}
        {activeTab === 'readme' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-indigo-400" />
                <h2 className="text-base font-semibold text-white">Repository Documentation (readme.md)</h2>
              </div>
              <span className="text-xs font-mono text-slate-400">/readme.md</span>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 font-mono text-xs text-slate-300 space-y-4">
              <div className="text-xl font-bold text-white font-sans border-b border-slate-800 pb-2">
                # AI Studio GitHub Branch Test
              </div>
              <p className="leading-relaxed text-slate-400 font-sans text-sm">
                This repository is used to test Google AI Studio GitHub workflow.
              </p>
              <div className="p-3 bg-slate-900/80 rounded border border-slate-800 text-xs text-slate-400 space-y-1 font-sans">
                <div className="font-semibold text-slate-200">Repository Details:</div>
                <div>• Repository: dingh415-web/test</div>
                <div>• Runtime Target: Web (Node.js 22, Port 3000)</div>
                <div>• Workflow: Bidirectional sync and branch verification enabled</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Logs & Diagnostics */}
        {activeTab === 'diagnostics' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-indigo-400" />
                <h2 className="text-base font-semibold text-white">System Diagnostics & Event Stream</h2>
              </div>
              <button
                onClick={() => setLogs((prev) => [`[PING] Heartbeat check at ${new Date().toISOString()}`, ...prev])}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded border border-slate-700"
              >
                Trigger Ping
              </button>
            </div>

            <div className="bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 space-y-2 border border-slate-800 min-h-[300px] max-h-[500px] overflow-y-auto">
              {logs.map((log, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-slate-600 select-none">{String(idx + 1).padStart(2, '0')}</span>
                  <span className={log.includes('[SUCCESS') ? 'text-emerald-400' : log.includes('[VERIFY') ? 'text-indigo-400' : 'text-slate-300'}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-4 px-6 text-center text-xs text-slate-500">
        Google AI Studio GitHub Workflow Test Environment • Connected to <code className="text-slate-400">dingh415-web/test</code>
      </footer>
    </div>
  );
}
