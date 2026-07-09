import { useState } from 'react';
import { Avatoon, LipSyncAvatoon, type AvatoonGoal } from 'avatoon';
import './App.css';
import visemeJson from './visemeData.json';

// Resolve public assets against the Vite base URL so they work on GitHub Pages
// (served from the /avatoon/ subpath) as well as locally.
const avatarUrl = `${import.meta.env.BASE_URL}avatar.glb`;

const GITHUB_URL = 'https://github.com/khaledalam/avatoon';
const NPM_URL = 'https://www.npmjs.com/package/avatoon';
const SPONSOR_URL = 'https://github.com/sponsors/khaledalam';

const GOALS: AvatoonGoal[] = ['Normal', 'Muscle', 'Sleep'];

function App() {
  const [goal, setGoal] = useState<AvatoonGoal>('Normal');
  const [copied, setCopied] = useState(false);

  const copyInstall = () => {
    navigator.clipboard?.writeText('npm install avatoon').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="page">
      <header className="hero">
        <h1 className="hero__title">
          <span aria-hidden>🧠</span> Avatoon
        </h1>
        <p className="hero__tagline">
          Animated 3D avatars with real-time, viseme-driven lip-sync for{' '}
          <strong>React Three Fiber</strong>.
        </p>

        <button className="install" onClick={copyInstall} title="Copy to clipboard">
          <code>npm install avatoon</code>
          <span className="install__hint">{copied ? '✓ copied' : '📋'}</span>
        </button>

        <div className="hero__cta">
          <a className="btn btn--primary" href={GITHUB_URL} target="_blank" rel="noreferrer">
            ⭐ Star on GitHub
          </a>
          <a className="btn" href={NPM_URL} target="_blank" rel="noreferrer">
            📦 View on npm
          </a>
          <a className="btn btn--sponsor" href={SPONSOR_URL} target="_blank" rel="noreferrer">
            💖 Sponsor
          </a>
        </div>
      </header>

      <main className="demos">
        <section className="card">
          <div className="card__head">
            <h2>Audio-synced lip-sync</h2>
            <p>
              The <code>&lt;Avatoon&gt;</code> component plays audio and drives mouth
              shapes from a <code>visemeJson</code> timeline. Try a gesture preset:
            </p>
            <div className="goals" role="group" aria-label="Gesture preset">
              {GOALS.map(g => (
                <button
                  key={g}
                  className={`chip${goal === g ? ' chip--active' : ''}`}
                  onClick={() => setGoal(g)}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div className="stage">
            <Avatoon
              key={goal}
              glbUrl={avatarUrl}
              goal={goal}
              visemeJson={visemeJson}
              showPlayVoiceButton
              onRenderComplete={() => console.log('Render complete')}
            />
          </div>
        </section>

        <section className="card">
          <div className="card__head">
            <h2>Procedural lip-sync</h2>
            <p>
              The lightweight <code>&lt;LipSyncAvatoon&gt;</code> animates a natural
              talking mouth with no audio or viseme data — just hit play.
            </p>
          </div>
          <div className="stage stage--muted">
            <LipSyncAvatoon glbUrl={avatarUrl} />
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>
          Built by{' '}
          <a href="https://khaledalam.net/" target="_blank" rel="noreferrer">
            Khaled Alam
          </a>
        </span>
        <span className="dot">·</span>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <span className="dot">·</span>
        <a href={NPM_URL} target="_blank" rel="noreferrer">
          npm
        </a>
        <span className="dot">·</span>
        <a href={SPONSOR_URL} target="_blank" rel="noreferrer">
          Sponsor 💖
        </a>
        <span className="dot">·</span>
        <span>MIT License</span>
      </footer>
    </div>
  );
}

export default App;
