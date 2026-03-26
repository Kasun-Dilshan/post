import { useMemo, useState } from 'react'

const fmt = (n) => (typeof n === 'number' ? 'Rs. ' + n.toLocaleString('en-US') : String(n))

function PlanCard({ title, items }) {
  const [selectedId, setSelectedId] = useState('')
  const chosen = items.find((d) => d.id === selectedId)

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card inv-card shadow border-0 rounded-4 h-100">
        <div className="card-header inv-head text-white text-center fs-5 fw-semibold rounded-top-4">
          {title}
        </div>
        <div className="card-body">
          <label className="form-label fw-semibold">Select Premium</label>
          <select className="form-select mb-3" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
            <option value="">— Choose —</option>
            {items.map((d) => (
              <option key={d.id} value={d.id}>
                {d.premiumLabel}
              </option>
            ))}
          </select>

          {chosen ? (
            <div>
              <div className="row g-2 mb-3">
                <div className="col-12">
                  <div className="p-3 bg-light rounded-3 border">
                    <div className="small text-muted">Payment</div>
                    <div className="fw-bold">{chosen.payment}</div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="p-3 bg-light rounded-3 border">
                    <div className="small text-muted">Maturity Year</div>
                    <div className="fw-bold">{chosen.maturityYear}</div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="p-3 bg-light rounded-3 border">
                    <div className="small text-muted">Maturity (Illustrated)</div>
                    <div className="fw-bold text-success">{fmt(chosen.maturityIllustrated)}</div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="p-3 bg-light rounded-3 border">
                    <div className="small text-muted">Maturity (Guaranteed)</div>
                    <div className="fw-bold text-primary">{fmt(chosen.maturityGuaranteed)}</div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="p-3 bg-light rounded-3 border">
                    <div className="small text-muted">Terms (Months)</div>
                    <div className="fw-bold">{chosen.termMonths}</div>
                  </div>
                </div>
              </div>

              <table className="table table-sm align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Field</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Premium', fmt(chosen.premium)],
                    ['Payment', chosen.payment],
                    ['Maturity Year', chosen.maturityYear],
                    ['Maturity (Illustrated)', fmt(chosen.maturityIllustrated)],
                    ['Maturity (Guaranteed)', fmt(chosen.maturityGuaranteed)],
                    ['Terms (Months)', chosen.termMonths],
                  ].map(([k, v]) => (
                    <tr key={k}>
                      <td>{k}</td>
                      <td>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="alert alert-success mb-0">Showing details for selected premium.</div>
            </div>
          ) : (
            <div className="text-muted small">Select a premium to view details.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export function GreenSavingPlansPage() {
  const PLANS = useMemo(
    () => ({
      plan1: [
        {
          id: 'one-time',
          premium: 200000,
          premiumLabel: 'Rs. 200,000 (One-time)',
          payment: 'Rs. 200,000 at 5 Years',
          maturityYear: '5 Years',
          maturityIllustrated: 1000000,
          maturityGuaranteed: 500000,
          termMonths: 'N/A',
        },
        {
          id: '23m',
          premium: 5250,
          premiumLabel: 'Rs. 5,250 (23 Months)Pay 40% initially (88,000)',
          payment: 'Rs. 208,750 at 5.6 Years',
          maturityYear: '5.6 Years',
          maturityIllustrated: 1000000,
          maturityGuaranteed: 500000,
          termMonths: 23,
        },
        {
          id: '36m',
          premium: 6120,
          premiumLabel: 'Rs. 6,120 (36 Months)',
          payment: 'Rs. 220,320 at 6 Years',
          maturityYear: '6 Years',
          maturityIllustrated: 1000000,
          maturityGuaranteed: 500000,
          termMonths: 36,
        },
        {
          id: '48m',
          premium: 4600,
          premiumLabel: 'Rs. 4,600 (48 Months)',
          payment: 'Rs. 220,800 at 7 Years',
          maturityYear: '7 Years',
          maturityIllustrated: 1000000,
          maturityGuaranteed: 500000,
          termMonths: 48,
        },
        {
          id: '60m',
          premium: 3700,
          premiumLabel: 'Rs. 3,700 (60 Months)',
          payment: 'Rs. 222,000 at 8 Years',
          maturityYear: '8 Years',
          maturityIllustrated: 1000000,
          maturityGuaranteed: 500000,
          termMonths: 60,
        },
      ],
      plan2: [
        {
          id: 'one-time',
          premium: 350000,
          premiumLabel: 'Rs. 350,000 (One-time)',
          payment: 'Rs. 350,000 at 5 Years',
          maturityYear: '5 Years',
          maturityIllustrated: 1750000,
          maturityGuaranteed: 875000,
          termMonths: 'N/A',
        },
        {
          id: '23m',
          premium: 9600,
          premiumLabel: 'Rs. 9,600 (23 Months)Pay 40% initially (140,000)',
          payment: 'Rs. 360,800 at 5.6 Years',
          maturityYear: '5.6 Years',
          maturityIllustrated: 1750000,
          maturityGuaranteed: 875000,
          termMonths: 23,
        },
        {
          id: '36m',
          premium: 10695,
          premiumLabel: 'Rs. 10,695 (36 Months)',
          payment: 'Rs. 385,020 at 6 Years',
          maturityYear: '6 Years',
          maturityIllustrated: 1750000,
          maturityGuaranteed: 875000,
          termMonths: 36,
        },
        {
          id: '48m',
          premium: 8025,
          premiumLabel: 'Rs. 8,025 (48 Months)',
          payment: 'Rs. 385,200 at 7 Years',
          maturityYear: '7 Years',
          maturityIllustrated: 1750000,
          maturityGuaranteed: 875000,
          termMonths: 48,
        },
        {
          id: '60m',
          premium: 6420,
          premiumLabel: 'Rs. 6,420 (60 Months)',
          payment: 'Rs. 385,200 at 8 Years',
          maturityYear: '8 Years',
          maturityIllustrated: 1750000,
          maturityGuaranteed: 875000,
          termMonths: 60,
        },
      ],
      plan3: [
        {
          id: 'one-time',
          premium: 525000,
          premiumLabel: 'Rs. 525,000 (One-time)',
          payment: 'Rs. 525,000 at 5 Years',
          maturityYear: '5 Years',
          maturityIllustrated: 2625000,
          maturityGuaranteed: 1312500,
          termMonths: 'N/A',
        },
        {
          id: '23m',
          premium: 13700,
          premiumLabel: 'Rs. 13,700 (23 Months)Pay 40% initially (210,000)',
          payment: 'Rs. 525,100 at 5.6 Years',
          maturityYear: '5.6 Years',
          maturityIllustrated: 2625000,
          maturityGuaranteed: 1312500,
          termMonths: 23,
        },
        {
          id: '36m',
          premium: 12065,
          premiumLabel: 'Rs. 12,065 (36 Months)',
          payment: 'Rs. 577,800 at 6 Years',
          maturityYear: '6 Years',
          maturityIllustrated: 2625000,
          maturityGuaranteed: 1312500,
          termMonths: 36,
        },
        {
          id: '48m',
          premium: 12035,
          premiumLabel: 'Rs. 12,035 (48 Months)',
          payment: 'Rs. 577,680 at 7 Years',
          maturityYear: '7 Years',
          maturityIllustrated: 2625000,
          maturityGuaranteed: 1312500,
          termMonths: 48,
        },
        {
          id: '60m',
          premium: 9625,
          premiumLabel: 'Rs. 9,625 (60 Months)',
          payment: 'Rs. 577,500 at 8 Years',
          maturityYear: '8 Years',
          maturityIllustrated: 2625000,
          maturityGuaranteed: 1312500,
          termMonths: 60,
        },
      ],
    }),
    [],
  )

  return (
    <>
      <style>{`
        :root{
          --inv-primary:#0ea76a;
          --inv-primary-2:#047857;
          --inv-text:#0f172a;
          --inv-muted:#475569;
          --inv-stroke: rgba(15,23,42,.10);
          --inv-card: rgba(255,255,255,.78);
          --inv-shadow: 0 22px 55px rgba(2,6,23,.12);
          --inv-ring: rgba(14,167,106,.22);
        }
        body.inv-body{
          min-height:100vh;
          background:
            radial-gradient(1100px 600px at 10% -10%, rgba(14,167,106,.22), transparent 55%),
            radial-gradient(900px 500px at 90% 0%, rgba(4,120,87,.18), transparent 60%),
            radial-gradient(800px 500px at 40% 105%, rgba(56,189,248,.10), transparent 60%),
            linear-gradient(180deg, #f7fbf7 0%, #ffffff 55%, #f5faf8 100%);
          color:var(--inv-text);
        }
        :focus-visible{outline:3px solid var(--inv-ring)!important;outline-offset:3px;border-radius:14px}
        .inv-topbar{
          display:flex;align-items:center;justify-content:space-between;
          gap:12px;flex-wrap:wrap;
          padding:14px 14px;
          border-radius:18px;
          background: rgba(255,255,255,.72);
          border:1px solid var(--inv-stroke);
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 30px rgba(2,6,23,.06);
        }
        .inv-brand{display:flex;align-items:center;gap:10px;font-weight:1000;letter-spacing:.6px;text-transform:uppercase;color:#0b2b1e}
        .inv-brand i{
          width:38px;height:38px;border-radius:14px;
          display:inline-flex;align-items:center;justify-content:center;
          background: linear-gradient(135deg, var(--inv-primary), var(--inv-primary-2));
          color:#fff;box-shadow: 0 14px 28px rgba(14,167,106,.22);
        }
        .inv-hero{
          margin-top:14px;
          border-radius:26px;
          overflow:hidden;
          border:1px solid var(--inv-stroke);
          background:
            radial-gradient(900px 450px at 10% 20%, rgba(14,167,106,.26), transparent 60%),
            radial-gradient(900px 450px at 90% 10%, rgba(4,120,87,.18), transparent 62%),
            linear-gradient(135deg, rgba(255,255,255,.72), rgba(255,255,255,.50));
          backdrop-filter: blur(10px);
          box-shadow: var(--inv-shadow);
        }
        .inv-hero .inner{padding:18px 18px}
        .inv-kicker{
          display:inline-flex;align-items:center;gap:8px;padding:7px 12px;border-radius:999px;
          background:rgba(14,167,106,.12);border:1px solid rgba(14,167,106,.18);
          color:#064e3b;font-weight:900;text-transform:uppercase;letter-spacing:.7px;font-size:12px
        }
        .inv-title{margin:10px 0 6px;font-weight:1000;letter-spacing:.2px}
        .inv-sub{margin:0;color:var(--inv-muted);font-weight:650;line-height:1.7}
        .btn.inv-btn-primary{
          border:0;
          background:linear-gradient(135deg, var(--inv-primary), var(--inv-primary-2));
          box-shadow: 0 16px 30px rgba(14,167,106,.20);
        }
        .btn.inv-btn-primary:hover{filter:brightness(.98)}
        .btn.inv-btn-outline{border:1px solid var(--inv-stroke)!important;background:rgba(255,255,255,.82)!important}
        .card.inv-card{
          background: var(--inv-card)!important;
          border:1px solid var(--inv-stroke)!important;
          backdrop-filter: blur(12px);
          transition: transform .18s ease, box-shadow .18s ease, background .18s ease, border-color .18s ease;
          overflow:hidden;
        }
        .card.inv-card:hover{
          transform: translateY(-3px);
          box-shadow: 0 26px 70px rgba(2,6,23,.14)!important;
          border-color: rgba(14,167,106,.25)!important;
          background: rgba(255,255,255,.88)!important;
        }
        .card-header.inv-head{
          border:0!important;
          background:linear-gradient(135deg, var(--inv-primary), var(--inv-primary-2))!important;
        }
        .form-select:focus{
          border-color: rgba(14,167,106,.55)!important;
          box-shadow: 0 0 0 .25rem rgba(14,167,106,.18)!important;
        }
        .table{border-radius:14px;overflow:hidden}
      `}</style>

      <div className="container my-4 inv-body">
        <div className="inv-topbar">
          <div className="inv-brand">
            <i className="fa-solid fa-leaf" aria-hidden="true" />
            <span>Green Saving Plans</span>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <a className="btn inv-btn-outline" href="/investments">
              <i className="fa-solid fa-arrow-left me-2" aria-hidden="true" />
              Investment Plans
            </a>
            <a className="btn inv-btn-primary text-white" href="/plantation">
              <i className="fa-solid fa-house me-2" aria-hidden="true" />
              Plantation Home
            </a>
          </div>
        </div>

        <div className="inv-hero">
          <div className="inner">
            <div className="inv-kicker">
              <i className="fa-solid fa-bolt" aria-hidden="true" /> Premium selector
            </div>
            <h1 className="inv-title">Pick a premium and view all details instantly.</h1>
            <p className="inv-sub">
              Select a premium under Plan 01–03 to see payment, maturity year, illustrated/guaranteed values,
              and the full breakdown table.
            </p>
          </div>
        </div>

        <div className="row g-4 mt-0">
          <PlanCard title="PLAN – 01" items={PLANS.plan1} />
          <PlanCard title="PLAN – 02" items={PLANS.plan2} />
          <PlanCard title="PLAN – 03" items={PLANS.plan3} />
        </div>
      </div>
    </>
  )
}

