import { useEffect, useMemo, useState } from 'react'

function formatLkr(n) {
  return `LKR ${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function InvestmentFixedIncomePage() {
  const baseIncome = useMemo(
    () => ({
      1: 2500,
      2: 3000,
      3: 3250,
      4: 3500,
      5: 4000,
      6: 4250,
      7: 4500,
      8: 4750,
    }),
    [],
  )

  const [amount, setAmount] = useState('')
  const [term, setTerm] = useState('')
  const [animatedMonthly, setAnimatedMonthly] = useState(0)

  const monthly = useMemo(() => {
    const a = Number(amount)
    const t = Number(term)
    if (!a || !t) return 0
    if (a >= 50000000 && t === 8) return a * 0.05
    return (a / 100000) * baseIncome[t]
  }, [amount, term, baseIncome])

  useEffect(() => {
    let raf = 0
    const start = 0
    const end = monthly
    const duration = 700
    const startTime = performance.now()
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const value = start + (end - start) * progress
      setAnimatedMonthly(value)
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [monthly])

  const showResult = Number(amount) > 0 && Number(term) > 0

  return (
    <>
      <style>{`
        :root{
          --primary:#0ea76a;
          --secondary:#047857;
          --ring: rgba(14,167,106,.22);
          --stroke: rgba(15,23,42,.10);
        }
        *{ box-sizing:border-box; font-family:system-ui,-apple-system,Segoe UI,Roboto; }
        body{
          margin:0;
          padding:16px;
          min-height:100vh;
          background:
            radial-gradient(1100px 600px at 10% -10%, rgba(14,167,106,.22), transparent 55%),
            radial-gradient(900px 500px at 90% 0%, rgba(4,120,87,.18), transparent 60%),
            radial-gradient(800px 500px at 40% 105%, rgba(56,189,248,.10), transparent 60%),
            linear-gradient(180deg, #f7fbf7 0%, #ffffff 55%, #f5faf8 100%);
        }
        .wrap{ max-width:560px; margin:0 auto; }
        .topbar{
          display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap;
          padding:14px 14px; border-radius:18px;
          background: rgba(255,255,255,.72);
          border:1px solid var(--stroke);
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 30px rgba(2,6,23,.06);
          margin: 0 auto 14px;
        }
        .brand{ display:flex; align-items:center; gap:10px; font-weight:1000; letter-spacing:.6px; text-transform:uppercase; color:#0b2b1e; }
        .brand i{
          width:38px;height:38px;border-radius:14px;
          display:inline-flex;align-items:center;justify-content:center;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color:#fff;
          box-shadow: 0 14px 28px rgba(14,167,106,.22);
        }
        .nav{ display:flex; gap:10px; flex-wrap:wrap; align-items:center; }
        .btnlink{
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:10px 14px; border-radius:999px;
          border:1px solid var(--stroke); text-decoration:none; color:#0f172a;
          font-weight:900; font-size:12px; text-transform:uppercase; letter-spacing:.35px;
          background: rgba(255,255,255,.82);
          transition:transform .18s ease, box-shadow .18s ease, background .18s ease;
        }
        .btnlink:hover{ transform:translateY(-1px); box-shadow:0 12px 26px rgba(2,6,23,.10); }
        .btnlink.primary{
          border-color:transparent; color:#fff;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          box-shadow: 0 16px 30px rgba(14,167,106,.20);
        }
        .container{ max-width:480px; margin:auto; }
        .card{
          background: rgba(255,255,255,.78);
          border:1px solid var(--stroke);
          backdrop-filter: blur(12px);
          border-radius:22px;
          padding:22px;
          box-shadow: 0 22px 55px rgba(2,6,23,.12);
        }
        .logo{ text-align:center; margin-bottom:18px; }
        .logo i{ font-size:42px; color:var(--primary); }
        .logo h1{ font-size:26px; color:var(--secondary); margin:8px 0 4px; font-weight:800; }
        .subtitle{ font-size:14px; color:#6b7280; }
        .input-group{ margin-top:18px; }
        label{ font-size:15px; font-weight:700; color:#374151; display:block; margin-bottom:6px; }
        select{
          width:100%; height:54px; padding:0 14px;
          border-radius:12px; border:2px solid #e5e7eb;
          font-size:16px; font-weight:600; background:#fff; outline:none;
          appearance:none;
          background-image:url("data:image/svg+xml;utf8,<svg fill='%23111827' height='18' viewBox='0 0 24 24' width='18'><path d='M7 10l5 5 5-5z'/></svg>");
          background-repeat:no-repeat;
          background-position:right 14px center;
        }
        select:focus{ border-color:var(--primary); box-shadow:0 0 0 4px var(--ring); }
        .result{ margin-top:22px; text-align:center; }
        .income-card{
          background:linear-gradient(135deg,var(--primary),var(--secondary));
          color:white; border-radius:18px;
          padding:26px 14px;
          box-shadow:0 10px 25px rgba(16,185,129,.35);
        }
        .income-label{ font-size:14px; opacity:.9; }
        .income-value{
          font-size:34px; font-weight:900; margin:8px 0;
          text-shadow:0 2px 6px rgba(0,0,0,.25);
          animation:pulse 2s infinite;
        }
        @keyframes pulse{ 0%{transform:scale(1)} 50%{transform:scale(1.05)} 100%{transform:scale(1)} }
        .info{
          margin-top:12px;
          background:#ecfdf5;
          padding:12px;
          border-radius:10px;
          font-size:13px;
          border-left:4px solid var(--primary);
        }
        @media(min-width:768px){
          body{ display:flex; align-items:center; justify-content:center; min-height:100vh; }
          .container{ max-width:520px; }
          .card{ padding:32px; box-shadow:0 20px 45px rgba(0,0,0,.12); }
          .logo h1{ font-size:32px; }
          .income-value{ font-size:44px; }
        }
      `}</style>

      <div className="wrap">
        <div className="topbar">
          <div className="brand">
            <i className="fa-solid fa-calculator" aria-hidden="true" />
            <span>Monthly Income</span>
          </div>
          <div className="nav">
            <a href="/investments" className="btnlink">
              <i className="fa-solid fa-arrow-left" aria-hidden="true" /> Investment Plans
            </a>
            <a href="/plantation" className="btnlink primary">
              <i className="fa-solid fa-house" aria-hidden="true" /> Plantation
            </a>
          </div>
        </div>

        <div className="container">
          <div className="card">
            <div className="logo">
              <i className="fas fa-leaf" />
              <h1>Investment Plans</h1>
              <div className="subtitle">Select amount and term</div>
            </div>

            <div className="input-group">
              <label>Investment Amount (LKR)</label>
              <select value={amount} onChange={(e) => setAmount(e.target.value)}>
                <option value="">Select Amount</option>
                <option value="100000">LKR 100,000</option>
                <option value="200000">LKR 200,000</option>
                <option value="500000">LKR 500,000</option>
                <option value="1000000">LKR 1,000,000</option>
                <option value="5000000">LKR 5,000,000</option>
                <option value="10000000">LKR 10,000,000</option>
                <option value="50000000">LKR 50,000,000+</option>
              </select>
            </div>

            <div className="input-group">
              <label>Investment Term</label>
              <select value={term} onChange={(e) => setTerm(e.target.value)}>
                <option value="">Select Term</option>
                <option value="1">1 Year</option>
                <option value="2">2 Years</option>
                <option value="3">3 Years</option>
                <option value="4">4 Years</option>
                <option value="5">5 Years</option>
                <option value="6">6 Years</option>
                <option value="7">7 Years</option>
                <option value="8">8 Years</option>
              </select>
            </div>

            {showResult ? (
              <div className="result" id="result">
                <div className="income-card">
                  <div className="income-label">Monthly Fixed Income</div>
                  <div className="income-value" id="monthly">
                    {formatLkr(animatedMonthly)}
                  </div>
                </div>
                <div className="info">Special: ≥ LKR 50,000,000 for 8 years receive enhanced income.</div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}

