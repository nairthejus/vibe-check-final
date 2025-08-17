import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, SkipForward, ThumbsUp, Music2, SlidersHorizontal, Search, Sparkles, Activity } from "lucide-react";
const clamp = (n, min=0, max=1) => Math.max(min, Math.min(max, n));
const lerp = (a, b, t) => a + (b - a) * t;
function sliderToTarget(slider){ const t = slider/100; return { valence: lerp(0.2, 0.9, t), energy: lerp(0.2, 0.9, t) }; }
const CATALOG = [
  { id: 't1', title: 'Moonlit Streets', artist: 'Blue Atlas', valence: 0.28, energy: 0.35, dance: 0.48, tempo: 78, genre: 'lofi', moods: ['calm','melancholy'] },
  { id: 't2', title: 'Sunburst', artist: 'Neon Harbor', valence: 0.86, energy: 0.88, dance: 0.72, tempo: 124, genre: 'pop', moods: ['happy','energetic'] },
  { id: 't3', title: 'Quiet Focus', artist: 'Ada North', valence: 0.45, energy: 0.32, dance: 0.22, tempo: 70, genre: 'ambient', moods: ['focus','calm'] },
  { id: 't4', title: 'City Sprint', artist: 'Metroline', valence: 0.65, energy: 0.84, dance: 0.78, tempo: 130, genre: 'edm', moods: ['workout','commute'] },
  { id: 't5', title: 'Golden Hour', artist: 'Vera Lake', valence: 0.72, energy: 0.56, dance: 0.60, tempo: 102, genre: 'indie', moods: ['happy','chill'] },
  { id: 't6', title: 'Fog & Coffee', artist: 'Paper Trails', valence: 0.34, energy: 0.28, dance: 0.18, tempo: 62, genre: 'jazz', moods: ['calm','focus'] },
  { id: 't7', title: 'Skyline Drive', artist: 'Arcadian', valence: 0.58, energy: 0.62, dance: 0.66, tempo: 118, genre: 'alt', moods: ['uplifting'] },
  { id: 't8', title: 'Late Night Code', artist: 'Lumen', valence: 0.44, energy: 0.40, dance: 0.30, tempo: 86, genre: 'electronica', moods: ['focus','calm'] },
  { id: 't9', title: 'Citrus Rush', artist: 'Kite Club', valence: 0.78, energy: 0.76, dance: 0.70, tempo: 120, genre: 'pop', moods: ['happy','run'] },
  { id: 't10', title: 'Haze', artist: 'Glass Birds', valence: 0.26, energy: 0.22, dance: 0.14, tempo: 58, genre: 'ambient', moods: ['melancholy','sleep'] },
  { id: 't11', title: 'Raincheck', artist: 'Soft Circuit', valence: 0.52, energy: 0.48, dance: 0.55, tempo: 100, genre: 'indietronica', moods: ['chill'] },
  { id: 't12', title: 'Momentum', artist: 'Highline', valence: 0.69, energy: 0.82, dance: 0.80, tempo: 128, genre: 'edm', moods: ['workout'] },
];
const MOOD_CHIPS = ['calm','happy','melancholy','focus','workout','chill','uplifting'];
const ACTIVITIES = ['Focus','Commute','Workout','Relax'];
function scoreTrack(track, target, activityBias, searchTerm, exploration){
  const dv = track.valence - target.valence; const de = track.energy - target.energy; const dist = Math.sqrt(dv*dv + de*de);
  let base = 1 - dist;
  if(activityBias === 'Focus') base += (1 - track.energy) * 0.15;
  if(activityBias === 'Workout') base += track.energy * 0.15 + (track.tempo>120?0.05:0);
  if(activityBias === 'Commute') base += (track.dance*0.1) + (track.energy*0.05);
  if(activityBias === 'Relax') base += (1 - track.energy) * 0.12 + (1-track.tempo/140)*0.05;
  if(searchTerm){ const s = searchTerm.toLowerCase(); if(track.title.toLowerCase().includes(s) || track.artist.toLowerCase().includes(s)) base += 0.1; }
  const jitter = (Math.random() - 0.5) * exploration * 0.3; return base + jitter;
}
export default function VibeCheckMVP(){
  const [slider, setSlider] = useState(65);
  const [selectedMoods, setSelectedMoods] = useState(['happy']);
  const [activity, setActivity] = useState('Focus');
  const [search, setSearch] = useState('');
  const [played, setPlayed] = useState([]);
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [showActivityNudge, setShowActivityNudge] = useState(false);
  const baseTarget = sliderToTarget(slider);
  const target = useMemo(()=>{
    let v = baseTarget.valence; let e = baseTarget.energy;
    if(selectedMoods.includes('melancholy')) v = clamp(v - 0.15);
    if(selectedMoods.includes('happy')) v = clamp(v + 0.1);
    if(selectedMoods.includes('calm')) e = clamp(e - 0.1);
    if(selectedMoods.includes('workout')) e = clamp(e + 0.15);
    if(selectedMoods.includes('focus')) e = clamp(e - 0.08);
    if(selectedMoods.includes('uplifting')) { v = clamp(v + 0.07); e = clamp(e + 0.05); }
    return { valence: v, energy: e };
  }, [baseTarget, selectedMoods]);
  const exploration = clamp(0.25 + (dislikes.length*0.08) - (likes.length*0.05), 0.1, 0.6);
  const queue = useMemo(()=>{
    const candidates = CATALOG.filter(t => !played.includes(t.id));
    const scored = candidates.map(t => ({ t, s: scoreTrack(t, target, activity, search, exploration) + (likes.includes(t.id)?0.15:0) - (dislikes.includes(t.id)?0.2:0) }));
    scored.sort((a,b)=> b.s - a.s); return scored.map(x=>x.t).slice(0, 9);
  }, [target, activity, search, exploration, played, likes, dislikes]);
  const nowPlaying = queue[0];
  useEffect(()=>{ if(played.length>0 && played.length % 3 === 0){ setShowActivityNudge(true); } }, [played.length]);
  function toggleMood(m){ setSelectedMoods(prev => prev.includes(m) ? prev.filter(x=>x!==m) : [...prev, m]); }
  function onPlay(){ if(!nowPlaying) return; setPlayed(p=>[...p, nowPlaying.id]); }
  function onSkip(){ if(!nowPlaying) return; setDislikes(d=> d.includes(nowPlaying.id)? d : [...d, nowPlaying.id]); setPlayed(p=>[...p, nowPlaying.id]); }
  function onLike(){ if(!nowPlaying) return; setLikes(l=> l.includes(nowPlaying.id)? l : [...l, nowPlaying.id]); }
  function resetSession(){ setPlayed([]); setLikes([]); setDislikes([]); setShowActivityNudge(false); }
  const metrics = { plays: played.length, likes: likes.length, skips: dislikes.length, exploration: exploration.toFixed(2) };
  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100 flex flex-col items-center py-8 px-4">
      <div className="max-w-5xl w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Music2 className="w-7 h-7"/><h1 className="text-2xl font-semibold">VibeCheck — Guest Demo</h1>
          </div>
          <button onClick={resetSession} className="px-4 py-2 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-sm">Reset</button>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="col-span-2 bg-neutral-900 rounded-2xl p-4 shadow">
            <div className="flex items-center gap-2 mb-2">
              <SlidersHorizontal className="w-4 h-4"/><p className="text-sm text-neutral-300">Vibe Range</p>
            </div>
            <input type="range" min={0} max={100} value={slider} onChange={e=>setSlider(parseInt(e.target.value))} className="w-full"/>
            <div className="mt-2 text-xs text-neutral-400">Valence: {target.valence.toFixed(2)} · Energy: {target.energy.toFixed(2)}</div>
            <div className="mt-4">
              <p className="text-sm text-neutral-300 mb-2">Mood tags</p>
              <div className="flex flex-wrap gap-2">
                {MOOD_CHIPS.map(m => (
                  <button key={m} onClick={()=>toggleMood(m)} className={`px-3 py-1 rounded-2xl text-sm border ${selectedMoods.includes(m)?'bg-neutral-100 text-neutral-900 border-neutral-100':'border-neutral-700 hover:border-neutral-500'}`}>{m}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-neutral-900 rounded-2xl p-4 shadow">
            <div className="flex items-center gap-2 mb-3"><Activity className="w-4 h-4"/><p className="text-sm text-neutral-300">Activity</p></div>
            <div className="flex gap-2 flex-wrap">
              {ACTIVITIES.map(a=> (
                <button key={a} onClick={()=>setActivity(a)} className={`px-3 py-1 rounded-2xl text-sm border ${activity===a?'bg-neutral-100 text-neutral-900 border-neutral-100':'border-neutral-700 hover:border-neutral-500'}`}>{a}</button>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2"><Search className="w-4 h-4"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search title or artist" className="bg-neutral-800 rounded-lg px-3 py-2 text-sm w-full outline-none"/></div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-neutral-900 rounded-2xl p-4 shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3"><Sparkles className="w-5 h-5 text-neutral-300"/><h2 className="text-lg font-medium">Anchor track</h2></div>
              <div className="text-xs text-neutral-400">exploration {metrics.exploration}</div>
            </div>
            <div className="mt-4">
              {nowPlaying ? (
                <motion.div key={nowPlaying.id} initial={{opacity:0, y:8}} animate={{opacity:1,y:0}} className="flex items-center justify-between bg-neutral-800 rounded-xl px-4 py-3">
                  <div>
                    <div className="font-semibold">{nowPlaying.title}</div>
                    <div className="text-sm text-neutral-400">{nowPlaying.artist} · {nowPlaying.genre} · v{nowPlaying.valence.toFixed(2)} e{nowPlaying.energy.toFixed(2)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={onLike} className="p-2 rounded-full hover:bg-neutral-700" title="Like"><ThumbsUp className="w-5 h-5"/></button>
                    <button onClick={onSkip} className="p-2 rounded-full hover:bg-neutral-700" title="Skip"><SkipForward className="w-5 h-5"/></button>
                    <button onClick={onPlay} className="p-2 rounded-full bg-neutral-100 text-neutral-900" title="Play"><Play className="w-5 h-5"/></button>
                  </div>
                </motion.div>
              ) : (<div className="text-neutral-400 text-sm">Queue finished. Adjust the slider or reset session.</div>)}
            </div>
          </div>
          <div className="bg-neutral-900 rounded-2xl p-4 shadow">
            <h3 className="text-lg font-medium mb-3">Session metrics</h3>
            <ul className="text-sm text-neutral-300 space-y-1">
              <li>Plays: <span className="text-neutral-100 font-semibold">{metrics.plays}</span></li>
              <li>Likes: <span className="text-neutral-100 font-semibold">{metrics.likes}</span></li>
              <li>Skips: <span className="text-neutral-100 font-semibold">{metrics.skips}</span></li>
              <li>Queue length: <span className="text-neutral-100 font-semibold">{queue.length}</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-6 bg-neutral-900 rounded-2xl p-4 shadow">
          <h3 className="text-lg font-medium mb-3">Up next</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {queue.slice(1).map(t => (
              <div key={t.id} className="bg-neutral-800 rounded-xl px-4 py-3 flex items-center justify-between">
                <div><div className="font-medium">{t.title}</div><div className="text-sm text-neutral-400">{t.artist} · {t.genre}</div></div>
                <div className="text-xs text-neutral-400">v{t.valence.toFixed(2)} e{t.energy.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
        <AnimatePresence>
          {showActivityNudge && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div initial={{scale:0.95, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.95, opacity:0}} className="bg-neutral-900 rounded-2xl p-6 w-full max-w-md">
                <h4 className="text-lg font-semibold mb-2">Still good for this activity?</h4>
                <p className="text-sm text-neutral-300 mb-4">We can tighten recs if you switch.</p>
                <div className="flex gap-2 flex-wrap mb-4">
                  {ACTIVITIES.map(a=> (
                    <button key={a} onClick={()=>setActivity(a)} className={`px-3 py-1 rounded-2xl text-sm border ${activity===a?'bg-neutral-100 text-neutral-900 border-neutral-100':'border-neutral-700 hover:border-neutral-500'}`}>{a}</button>
                  ))}
                </div>
                <div className="flex justify-end gap-2">
                  <button onClick={()=>setShowActivityNudge(false)} className="px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-sm">Keep going</button>
                  <button onClick={()=>setShowActivityNudge(false)} className="px-3 py-2 rounded-lg bg-neutral-100 text-neutral-900 text-sm">Apply</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="mt-8 text-center text-xs text-neutral-400">Guest demo using a seeded catalog. Likes reduce exploration; skips increase it.</div>
      </div>
    </div>
  )
}
