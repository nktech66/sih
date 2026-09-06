import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  LayoutDashboard, ScanLine, History, FileText, BarChart3, Settings,
  ShieldCheck, Camera, Upload, Search, Bell, ChevronRight,
  CheckCircle2, AlertTriangle, XCircle, ArrowUpRight, Sparkles,
  Clock3, PackageCheck, Menu, X, Download
} from "lucide-react";
import "./styles.css";

const scans = [
  { id: "QSI-1048", product: "SunFresh Cooking Oil", category: "Edible Oil", score: 96, status: "Compliant", date: "29 Aug 2026" },
  { id: "QSI-1047", product: "DailyBite Biscuits", category: "Food", score: 71, status: "Review", date: "29 Aug 2026" },
  { id: "QSI-1046", product: "PureDrop Honey", category: "Food", score: 54, status: "Violation", date: "28 Aug 2026" },
  { id: "QSI-1045", product: "GlowCare Shampoo", category: "Personal Care", score: 89, status: "Compliant", date: "28 Aug 2026" }
];

function StatusBadge({ status }) {
  const Icon = status === "Compliant" ? CheckCircle2 : status === "Review" ? AlertTriangle : XCircle;
  return <span className={`badge ${status.toLowerCase()}`}><Icon size={14}/>{status}</span>;
}

function Sidebar({ page, setPage, open, setOpen }) {
  const items = [
    ["dashboard", "Dashboard", LayoutDashboard],
    ["scan", "Scan Product", ScanLine],
    ["history", "Inspection History", History],
    ["reports", "Reports", FileText],
    ["analytics", "Analytics", BarChart3],
  ];
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="brand">
        <div className="brand-mark"><ShieldCheck size={22}/></div>
        <div><strong>QSI</strong><span>Quality Scan Intelligence</span></div>
        <button className="icon-btn mobile-close" onClick={() => setOpen(false)}><X size={20}/></button>
      </div>
      <div className="nav-label">WORKSPACE</div>
      <nav>
        {items.map(([id, label, Icon]) => (
          <button key={id} className={`nav-item ${page === id ? "active" : ""}`} onClick={() => {setPage(id); setOpen(false)}}>
            <Icon size={19}/><span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button className="nav-item"><Settings size={19}/><span>Settings</span></button>
        <div className="profile-mini">
          <div className="avatar">NK</div>
          <div><b>Inspector</b><span>QSI Admin</span></div>
        </div>
      </div>
    </aside>
  );
}

function Header({ setOpen }) {
  return <header className="topbar">
    <button className="icon-btn mobile-menu" onClick={() => setOpen(true)}><Menu size={22}/></button>
    <div className="crumb">Inspection Workspace <ChevronRight size={15}/> <b>Overview</b></div>
    <div className="top-actions">
      <button className="icon-btn"><Bell size={19}/><i></i></button>
      <div className="top-avatar">NK</div>
    </div>
  </header>
}

function Dashboard({ setPage }) {
  return <main className="content">
    <div className="hero-row">
      <div>
        <p className="eyebrow">INSPECTION INTELLIGENCE</p>
        <h1>Good afternoon, Inspector.</h1>
        <p className="sub">Monitor packaged-commodity compliance from one workspace.</p>
      </div>
      <button className="primary" onClick={() => setPage("scan")}><ScanLine size={18}/> Scan Product</button>
    </div>

    <section className="stats">
      <Stat label="Products Scanned" value="1,248" delta="+12.4%" icon={ScanLine}/>
      <Stat label="Compliant" value="932" delta="+8.2%" icon={CheckCircle2}/>
      <Stat label="Needs Review" value="80" delta="+3.1%" icon={Clock3}/>
      <Stat label="Violations" value="236" delta="-5.8%" icon={AlertTriangle}/>
    </section>

    <section className="grid-two">
      <div className="panel">
        <div className="panel-head"><div><h2>Compliance overview</h2><p>Last 30 days</p></div><button className="ghost">View analytics <ArrowUpRight size={15}/></button></div>
        <div className="donut-wrap">
          <div className="donut"><div><strong>74.7%</strong><span>compliance</span></div></div>
          <div className="legend">
            <Legend label="Compliant" value="74.7%" type="ok"/>
            <Legend label="Needs review" value="6.4%" type="review"/>
            <Legend label="Violation" value="18.9%" type="bad"/>
          </div>
        </div>
      </div>
      <div className="panel">
        <div className="panel-head"><div><h2>Quick actions</h2><p>Start an inspection</p></div></div>
        <div className="quick-grid">
          <button onClick={() => setPage("scan")}><div className="quick-icon"><Camera/></div><b>Scan with camera</b><span>Capture a label</span></button>
          <button onClick={() => setPage("scan")}><div className="quick-icon"><Upload/></div><b>Upload image</b><span>Analyze a package</span></button>
          <button onClick={() => setPage("history")}><div className="quick-icon"><History/></div><b>View history</b><span>Past inspections</span></button>
          <button onClick={() => setPage("reports")}><div className="quick-icon"><FileText/></div><b>Generate report</b><span>Export evidence</span></button>
        </div>
      </div>
    </section>

    <section className="panel table-panel">
      <div className="panel-head"><div><h2>Recent inspections</h2><p>Latest product assessments</p></div><button className="ghost" onClick={() => setPage("history")}>View all <ArrowUpRight size={15}/></button></div>
      <ScanTable rows={scans.slice(0,4)} />
    </section>
  </main>
}

function Stat({label,value,delta,icon:Icon}) {
  return <div className="stat-card"><div className="stat-top"><div className="stat-icon"><Icon size={18}/></div><span className="delta">{delta}</span></div><strong>{value}</strong><span>{label}</span></div>
}
function Legend({label,value,type}) { return <div className="legend-row"><i className={`dot ${type}`}></i><span>{label}</span><b>{value}</b></div> }

function ScanPage({ setPage }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(false);
  const start = () => { setAnalyzing(true); setTimeout(() => {setAnalyzing(false); setResult(true)}, 1200) };
  return <main className="content">
    <div className="hero-row compact">
      <div><p className="eyebrow">NEW INSPECTION</p><h1>Scan a packaged product</h1><p className="sub">Upload a clear label image to run QSI's demo compliance pipeline.</p></div>
    </div>
    {!result && !analyzing && <div className="scan-layout">
      <div className="upload-card">
        <div className="upload-visual"><ScanLine size={34}/></div>
        <h2>Upload product label</h2>
        <p>PNG, JPG or WEBP · Best results with a straight, well-lit label photo.</p>
        <button className="primary" onClick={start}><Upload size={18}/> Choose image</button>
        <div className="or">or</div>
        <button className="secondary" onClick={start}><Camera size={18}/> Use camera</button>
      </div>
      <div className="how-card">
        <p className="eyebrow">QSI PIPELINE</p>
        <h2>From image to evidence</h2>
        {["Image quality & perspective check","OCR extracts visible declarations","AI maps text to structured fields","Rule engine checks applicable requirements","Report stores evidence and findings"].map((x,i)=><div className="step" key={x}><span>{String(i+1).padStart(2,"0")}</span><p>{x}</p></div>)}
      </div>
    </div>}
    {analyzing && <div className="analysis-card"><div className="spinner"></div><p className="eyebrow">QSI ENGINE</p><h2>Analyzing product label…</h2><p>Running image processing, OCR, field extraction and compliance checks.</p><div className="progress"><i></i></div></div>}
    {result && <ResultPage onBack={() => setResult(false)} setPage={setPage}/>}
  </main>
}

function ResultPage({onBack,setPage}) {
  return <div className="result">
    <div className="result-top"><div><p className="eyebrow">ANALYSIS COMPLETE · QSI-1049</p><h1>Potential non-compliance detected</h1><p className="sub">Demo result for “DailyBite Biscuits 500 g”. Review findings before enforcement action.</p></div><button className="secondary" onClick={onBack}><ScanLine size={17}/> New scan</button></div>
    <div className="result-grid">
      <div className="score-card"><span>COMPLIANCE SCORE</span><div className="big-score">78<small>/100</small></div><StatusBadge status="Review"/><p>Most mandatory fields were detected. Two items need human verification.</p></div>
      <div className="panel fields"><div className="panel-head"><div><h2>Detected declarations</h2><p>OCR + AI field extraction</p></div></div>
        {[
          ["Manufacturer / Packer","DailyBite Foods Pvt. Ltd.","ok"],
          ["Net Quantity","500 g","ok"],
          ["MRP","₹120","ok"],
          ["Pack / Manufacture Date","06/2026","ok"],
          ["Consumer Care","Not detected","bad"],
          ["Country of Origin","Not required / not detected","review"]
        ].map(([a,b,c])=><div className="field-row" key={a}><div><span>{a}</span><b>{b}</b></div><i className={c}>{c==="ok"?<CheckCircle2 size={17}/>:c==="bad"?<XCircle size={17}/>:<AlertTriangle size={17}/>}</i></div>)}
      </div>
    </div>
    <div className="grid-two result-lower">
      <div className="panel"><div className="panel-head"><div><h2>Evidence & findings</h2><p>Explainable assessment</p></div></div>
        <div className="evidence-box"><div className="fake-pack"><div className="pack-title">DAILYBITE</div><div>CRISPY BISCUITS</div><strong>NET QTY 500 g</strong><strong>MRP ₹120</strong><small>PKD 06/2026</small></div><div className="callout"><XCircle size={18}/><div><b>Consumer-care declaration not detected</b><span>Review the original package image before finalizing the finding.</span></div></div></div>
      </div>
      <div className="panel"><div className="panel-head"><div><h2>AI explanation</h2><p>Evidence-backed summary</p></div><Sparkles size={19}/></div><div className="ai-box">The scan detected manufacturer, net quantity, MRP and pack-date information. Consumer-care information was not confidently detected. The image quality is sufficient for review, but the final determination should be made against the applicable rule version.</div><button className="primary full" onClick={() => setPage("reports")}><Download size={17}/> Generate report</button></div>
    </div>
  </div>
}

function ScanTable({rows}) {
  return <div className="table-scroll"><table><thead><tr><th>Inspection</th><th>Product</th><th>Category</th><th>Score</th><th>Status</th><th>Date</th></tr></thead><tbody>{rows.map(r=><tr key={r.id}><td><b>{r.id}</b></td><td>{r.product}</td><td>{r.category}</td><td><b>{r.score}%</b></td><td><StatusBadge status={r.status}/></td><td>{r.date}</td></tr>)}</tbody></table></div>
}

function HistoryPage() { return <main className="content"><div className="hero-row compact"><div><p className="eyebrow">RECORDS</p><h1>Inspection history</h1><p className="sub">Search and review previous product scans.</p></div></div><div className="panel"><div className="searchbar"><Search size={18}/><input placeholder="Search product, inspection ID or category…"/></div><ScanTable rows={scans}/></div></main> }
function ReportsPage() { return <main className="content"><div className="hero-row compact"><div><p className="eyebrow">DOCUMENTS</p><h1>Compliance reports</h1><p className="sub">Evidence-backed reports generated from inspections.</p></div></div><div className="report-grid">{["QSI-1049 · DailyBite Biscuits","QSI-1048 · SunFresh Cooking Oil","QSI-1046 · PureDrop Honey"].map((x,i)=><div className="panel report-card" key={x}><div className="report-icon"><FileText/></div><b>{x}</b><span>{i===0?"Review required":i===1?"Compliant":"Violation detected"}</span><button className="secondary"><Download size={15}/> Export PDF</button></div>)}</div></main> }
function AnalyticsPage() { return <main className="content"><div className="hero-row compact"><div><p className="eyebrow">INSIGHTS</p><h1>Compliance analytics</h1><p className="sub">Understand inspection trends and recurring violations.</p></div></div><div className="stats"><Stat label="Avg. Compliance" value="82.4%" delta="+4.8%" icon={BarChart3}/><Stat label="Top Issue" value="Care info" delta="38%" icon={AlertTriangle}/><Stat label="Food Scans" value="684" delta="+9.2%" icon={PackageCheck}/><Stat label="Avg. Review Time" value="2m 18s" delta="-14%" icon={Clock3}/></div><div className="panel chart-panel"><div className="panel-head"><div><h2>Inspection volume</h2><p>Illustrative demo analytics</p></div></div><div className="bars">{[42,58,46,74,62,88,71,94,79,66,82,97].map((h,i)=><div className="bar-col" key={i}><div style={{height:`${h}%`}}></div><span>{i+1}</span></div>)}</div></div></main> }

function App() {
  const [page,setPage] = useState("dashboard");
  const [open,setOpen] = useState(false);
  const Page = page==="dashboard"?Dashboard:page==="scan"?ScanPage:page==="history"?HistoryPage:page==="reports"?ReportsPage:AnalyticsPage;
  return <div className="app"><Sidebar page={page} setPage={setPage} open={open} setOpen={setOpen}/><div className="main"><Header setOpen={setOpen}/><Page setPage={setPage}/></div></div>
}

createRoot(document.getElementById("root")).render(<App />);
