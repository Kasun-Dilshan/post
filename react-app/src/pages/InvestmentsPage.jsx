export function InvestmentsPage() {
  return (
    <>
      <style>{`
        :root{
          --bg:#f3f6f0;
          --text:#0f172a;
          --muted:#64748b;
          --green:#39b54a;
          --green-d:#2e9c3d;
          --card:#ffffff;
          --shadow: 0 18px 40px rgba(2,6,23,.10);
        }
        *{box-sizing:border-box}
        html,body{margin:0;padding:0;font-family:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;color:var(--text);background:var(--bg)}
        a{color:inherit;text-decoration:none}
        :focus-visible{outline:3px solid rgba(57,181,74,.35);outline-offset:3px;border-radius:12px}
        .wrap{max-width:1080px;margin:0 auto;padding:40px 16px 60px}
        .pill-top{
          width:fit-content;
          margin: 0 auto 12px;
          padding:5px 10px;
          border-radius:999px;
          background:#fff;
          border:1px solid rgba(2,6,23,.08);
          color:#64748b;
          font-weight:800;
          font-size:10px;
          letter-spacing:.6px;
          text-transform:uppercase;
        }
        .title{text-align:center;margin: 0 auto 22px;}
        .title h1{
          margin:0;
          font-size:44px;
          font-weight:1000;
          letter-spacing:1px;
          text-transform:uppercase;
          color: var(--green);
        }
        .steps{
          display:grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap:14px;
          margin-top:18px;
          align-items:stretch;
        }
        .step{
          background: var(--green);
          color:#fff;
          border-radius:6px;
          padding:18px 18px 16px;
          box-shadow: 0 14px 30px rgba(57,181,74,.22);
          position:relative;
          min-height: 128px;
        }
        .step .num{position:absolute;top:12px;right:12px;font-weight:900;font-size:11px;opacity:.95;}
        .step .icon{
          width:34px;height:34px;border-radius:10px;
          display:inline-flex;align-items:center;justify-content:center;
          background: rgba(255,255,255,.14);
          border:1px solid rgba(255,255,255,.22);
          margin-bottom:10px;
        }
        .step h3{margin:0 0 6px;font-size:16px;font-weight:1000;}
        .step p{margin:0;font-size:12px;line-height:1.55;opacity:.92;max-width: 44ch;}
        .section{margin-top:60px;text-align:center;}
        .section h2{
          margin:0;
          font-size:30px;
          font-weight:1000;
          letter-spacing:1px;
          text-transform:uppercase;
          color: var(--green);
        }
        .plans{
          margin-top:30px;
          display:grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap:18px;
          align-items:start;
        }
        .plan{display:flex;flex-direction:column;align-items:center;gap:10px;}
        .plan-link{
          width:100%;
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:10px;
          padding:14px 10px;
          border-radius:12px;
          transition: transform .16s ease, box-shadow .16s ease, background .16s ease;
        }
        .plan-link:hover{
          background: rgba(255,255,255,.70);
          box-shadow: 0 14px 30px rgba(2,6,23,.08);
          transform: translateY(-2px);
        }
        .leaf{font-size:34px;line-height:1;}
        .plan strong{font-size:14px;font-weight:900;color:#111827;}
        .top-links{
          display:flex;
          justify-content:center;
          gap:10px;
          flex-wrap:wrap;
          margin-top:28px;
        }
        .top-links a{
          display:inline-flex;
          align-items:center;
          gap:8px;
          padding:10px 14px;
          border-radius:999px;
          background:#fff;
          border:1px solid rgba(2,6,23,.10);
          font-weight:900;
          font-size:12px;
          text-transform:uppercase;
          letter-spacing:.35px;
          box-shadow: 0 10px 22px rgba(2,6,23,.06);
        }
        .top-links a.primary{
          background: linear-gradient(135deg, var(--green), var(--green-d));
          color:#fff;
          border-color: transparent;
          box-shadow: 0 16px 30px rgba(57,181,74,.20);
        }
        @media (max-width: 980px){
          .steps{grid-template-columns:1fr}
          .plans{grid-template-columns: repeat(2, minmax(0, 1fr))}
          .title h1{font-size:38px}
        }
        @media (max-width: 560px){
          .plans{grid-template-columns:1fr}
          .title h1{font-size:34px}
        }
      `}</style>

      <div className="wrap">
        <div className="pill-top">Start your invest</div>
        <div className="title">
          <h1>How it works</h1>
        </div>

        <div className="steps" aria-label="How it works steps">
          <div className="step">
            <div className="num">Step 1</div>
            <div className="icon" aria-hidden="true">
              <i className="fa-solid fa-leaf" />
            </div>
            <h3>Choose your Plan</h3>
            <p>
              Choose from one of our personalized investment plans based on your risk capacity and
              financial objectives.
            </p>
          </div>
          <div className="step">
            <div className="num">Step 2</div>
            <div className="icon" aria-hidden="true">
              <i className="fa-solid fa-leaf" />
            </div>
            <h3>Invest</h3>
            <p>Use our salesperson to make your investment.</p>
          </div>
          <div className="step">
            <div className="num">Step 3</div>
            <div className="icon" aria-hidden="true">
              <i className="fa-solid fa-leaf" />
            </div>
            <h3>Track your Growth</h3>
            <p>
              Our team of experienced professionals has a proven track record of success across
              multiple industries including agriculture, travel, and beverages.
            </p>
          </div>
        </div>

        <div className="section">
          <h2>Our investment plans</h2>

          <div className="plans" aria-label="Investment plan links">
            <div className="plan">
              <a className="plan-link" href="/investments/fixed-income" aria-label="Open High Profit Plan">
                <div className="leaf" style={{ color: '#39b54a' }} aria-hidden="true">
                  <i className="fa-solid fa-leaf" />
                </div>
                <strong>High Profit Plan</strong>
              </a>
            </div>
            <div className="plan">
              <a className="plan-link" href="/investments/green" aria-label="Open Green Saving Plan">
                <div className="leaf" style={{ color: '#39b54a' }} aria-hidden="true">
                  <i className="fa-solid fa-leaf" />
                </div>
                <strong>Green Saving Plan</strong>
              </a>
            </div>
            <div className="plan">
              <a className="plan-link" href="/investments/silver" aria-label="Open Silver Plan">
                <div className="leaf" style={{ color: '#6b7280' }} aria-hidden="true">
                  <i className="fa-solid fa-leaf" />
                </div>
                <strong>Silver Plan</strong>
              </a>
            </div>
            <div className="plan">
              <a className="plan-link" href="/investments/gold" aria-label="Open Gold Plan">
                <div className="leaf" style={{ color: '#f59e0b' }} aria-hidden="true">
                  <i className="fa-solid fa-leaf" />
                </div>
                <strong>Gold Plan</strong>
              </a>
            </div>
          </div>

          <div className="top-links" aria-label="Navigation links">
            <a href="/plantation">
              <i className="fa-solid fa-arrow-left" aria-hidden="true" />
              Plantation
            </a>
            <a className="primary" href="/">
              <i className="fa-solid fa-house" aria-hidden="true" />
              Group Home
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

