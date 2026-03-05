'use client'

import Link from 'next/link'
import { useState } from 'react'

/* ─────────────── DATA ─────────────── */

const FACELESS_NICHES = [
    { id: 'dark_facts', emoji: '🖤', label: 'Dark & Disturbing Facts', desc: 'Shocking historical, psychological & world facts', example: '"Oxford University is older than the Aztec Empire..."' },
    { id: 'reddit_stories', emoji: '📖', label: 'Reddit True Stories', desc: 'Wild viral Reddit stories retold with anime visuals', example: '"AITA for refusing to give my sister my lottery winnings?"' },
    { id: 'horror_stories', emoji: '👻', label: 'Horror Stories', desc: 'Creepy paranormal tales and urban legends', example: '"She had been living in the attic for 3 years. We never knew."' },
    { id: 'motivational', emoji: '💪', label: 'Motivational Wisdom', desc: 'Anime-inspired life lessons and stoic philosophy', example: '"The moment you give up is the moment you let someone else win."' },
    { id: 'mythology', emoji: '⚡', label: 'Mythology & Legends', desc: 'Greek, Norse, Japanese & Hindu myths retold', example: '"Izanagi descended into the underworld to save his wife..."' },
    { id: 'fun_facts', emoji: '🧠', label: 'Mind-Blowing Facts', desc: 'Science, space, and history facts that sound impossible', example: '"A day on Venus is longer than a year on Venus."' },
    { id: 'true_crime', emoji: '🔍', label: 'True Crime', desc: 'Real heists, unsolved mysteries, and criminal cases', example: '"$500M in art stolen in 81 minutes. Zero arrests. Ever."' },
    { id: 'psychology', emoji: '🧬', label: 'Dark Psychology', desc: 'Manipulation tactics, cognitive biases, mind control', example: '"7 tricks narcissists use that most people fall for daily..."' },
    { id: 'japanese_culture', emoji: '🏯', label: 'Japanese Culture', desc: 'Samurai code, feudal Japan, bushido & traditions', example: '"The 47 Ronin: the true story that shook Japan forever."' },
    { id: 'anime_lore', emoji: '⚔️', label: 'Anime Lore Deep Dives', desc: 'Power systems, hidden meanings, character breakdowns', example: '"The true origin of the Nen system in Hunter x Hunter."' },
    { id: 'life_lessons', emoji: '🌱', label: 'Life Lessons', desc: 'Practical self-improvement and discipline tips', example: '"5 habits that separate the top 1% from everyone else."' },
    { id: 'crypto_finance', emoji: '💰', label: 'Finance & Crypto', desc: 'Money stories, investment lessons, crypto explained', example: '"The man who bought 10,000 BTC for $40 and forgot..."' },
]

const VISUAL_STYLES = [
    { id: 'dark_fantasy', emoji: '🗡️', label: 'Dark Fantasy', desc: 'Berserk/AoT style, gothic shadows' },
    { id: 'shonen', emoji: '⚔️', label: 'Shōnen Action', desc: 'Vibrant, dynamic — Demon Slayer style' },
    { id: 'realistic', emoji: '🎭', label: 'Anime Realistic', desc: 'Cinematic, photorealistic anime' },
    { id: 'cyberpunk', emoji: '🌃', label: 'Cyberpunk', desc: 'Neon city, Akira / Ghost in the Shell' },
    { id: 'manga', emoji: '📓', label: 'Manga B&W', desc: 'Black & white ink art style' },
    { id: 'ghibli', emoji: '🍃', label: 'Studio Ghibli', desc: 'Soft watercolor, Miyazaki warmth' },
    { id: 'watercolor', emoji: '🎨', label: 'Watercolor Anime', desc: 'Artistic, loose brushwork style' },
    { id: 'chibi', emoji: '🐱', label: 'Chibi / Kawaii', desc: 'Cute SD characters, pastel tones' },
]

const SCHEDULES = [
    { id: 'daily', label: 'Daily', icon: '⚡', desc: '1 video per day — maximum growth' },
    { id: '3x_week', label: '3× a Week', icon: '🎬', desc: 'Mon / Wed / Fri posting' },
    { id: 'weekly', label: 'Weekly', icon: '📅', desc: '1 video every week' },
    { id: 'manual', label: 'Manual Only', icon: '✋', desc: 'Generate on demand, post yourself' },
]

type Step = 'niche' | 'style' | 'topic' | 'review' | 'generating' | 'result'

type SceneResult = {
    sceneNumber: number
    narration: string
    imageUrl: string
}

type FacelessResult = {
    title: string
    hook: string
    scenes: SceneResult[]
    callToAction: string
    hashtags: string[]
}

/* ─────────────── PAGE ─────────────── */

export default function FacelessPage() {
    const [step, setStep] = useState<Step>('niche')
    const [selectedNiche, setSelectedNiche] = useState<string | null>(null)
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
    const [topicHint, setTopicHint] = useState('')
    const [selectedSchedule, setSelectedSchedule] = useState('daily')
    const [error, setError] = useState<string | null>(null)
    const [result, setResult] = useState<FacelessResult | null>(null)

    const nicheData = FACELESS_NICHES.find(n => n.id === selectedNiche)
    const styleData = VISUAL_STYLES.find(s => s.id === selectedStyle)

    const STEPS: Step[] = ['niche', 'style', 'topic', 'review', 'result']
    const stepLabels = ['Niche', 'Style', 'Topic', 'Review', 'Result']
    const currentStepIndex = STEPS.indexOf(step === 'generating' ? 'review' : step)

    const handleGenerate = async () => {
        if (!selectedNiche || !selectedStyle) return
        setStep('generating')
        setError(null)
        setResult(null)

        try {
            const res = await fetch('/api/generate-faceless', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ niche: selectedNiche, visualStyle: selectedStyle, topicHint }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Failed to generate')
            setResult(data)
            setStep('result')
        } catch (err: any) {
            setError(err.message)
            setStep('review')
        }
    }

    return (
        <div className="relative min-h-screen flex flex-col px-4 sm:px-8 py-8 z-10">
            <header className="mb-8">
                <Link href="/dashboard" className="text-sm text-purple-400 hover:text-purple-300 transition mb-2 inline-block">
                    ← Back to Dashboard
                </Link>
                <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Faceless Series Creator</h1>
                    <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">New</span>
                </div>
                <p className="text-sm text-gray-500 max-w-xl">
                    Pick a content niche, choose your anime visual style, and AI generates a full viral video storyboard — ready to schedule and post daily.
                </p>

                {/* Step indicator */}
                <div className="flex flex-wrap items-center gap-2 mt-4 text-xs font-medium">
                    {stepLabels.map((label, i) => {
                        const isActive = i <= currentStepIndex
                        return (
                            <div key={label} className="flex items-center gap-2">
                                {i > 0 && <div className={`w-4 sm:w-6 h-px ${isActive ? 'bg-cyan-500' : 'bg-white/10'}`} />}
                                <span className={`px-2 sm:px-3 py-1 rounded-full border ${isActive ? 'border-cyan-500/50 bg-cyan-500/20 text-cyan-300' : 'border-white/10 bg-white/5 text-gray-600'}`}>
                                    {label}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </header>

            <main className="w-full max-w-5xl mx-auto">

                {/* ── STEP 1: CONTENT NICHE ── */}
                {step === 'niche' && (
                    <div className="animate-fade-in">
                        <h2 className="text-lg font-semibold text-gray-300 mb-2">Step 1: Choose Your Content Niche</h2>
                        <p className="text-xs text-gray-600 mb-5">What kind of viral content will your faceless anime channel post?</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {FACELESS_NICHES.map((niche) => (
                                <button
                                    type="button"
                                    key={niche.id}
                                    onClick={() => setSelectedNiche(niche.id)}
                                    className={`text-left p-4 rounded-2xl border transition-all duration-200
                                        ${selectedNiche === niche.id
                                            ? 'border-cyan-500/60 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                                            : 'border-white/[0.06] bg-white/[0.03] hover:border-cyan-500/20 hover:bg-cyan-500/[0.04] hover:-translate-y-0.5'
                                        }`}
                                >
                                    <div className="text-2xl mb-1.5">{niche.emoji}</div>
                                    <div className="text-sm font-semibold text-white">{niche.label}</div>
                                    <div className="text-xs text-gray-500 mt-0.5 mb-2">{niche.desc}</div>
                                    <div className="text-[10px] text-gray-600 italic leading-relaxed">{niche.example}</div>
                                </button>
                            ))}
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button
                                type="button"
                                onClick={() => selectedNiche && setStep('style')}
                                disabled={!selectedNiche}
                                className="btn-primary disabled:opacity-30"
                            >
                                Next: Pick Visual Style →
                            </button>
                        </div>
                    </div>
                )}

                {/* ── STEP 2: VISUAL STYLE ── */}
                {step === 'style' && (
                    <div className="animate-fade-in">
                        <h2 className="text-lg font-semibold text-gray-300 mb-2">Step 2: Choose Anime Visual Style</h2>
                        <p className="text-xs text-gray-600 mb-5">Every scene in your video will be AI-generated in this art style.</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {VISUAL_STYLES.map((style) => (
                                <button
                                    type="button"
                                    key={style.id}
                                    onClick={() => setSelectedStyle(style.id)}
                                    className={`text-center p-5 rounded-2xl border transition-all duration-200
                                        ${selectedStyle === style.id
                                            ? 'border-purple-500/60 bg-purple-500/15 shadow-[0_0_20px_rgba(124,58,237,0.2)]'
                                            : 'border-white/[0.06] bg-white/[0.03] hover:border-purple-500/30 hover:bg-purple-500/[0.06] hover:-translate-y-0.5'
                                        }`}
                                >
                                    <div className="text-3xl mb-2">{style.emoji}</div>
                                    <div className="text-sm font-semibold text-white">{style.label}</div>
                                    <div className="text-xs text-gray-500 mt-1">{style.desc}</div>
                                </button>
                            ))}
                        </div>
                        <div className="mt-8 flex justify-between">
                            <button type="button" onClick={() => setStep('niche')} className="btn-secondary">← Back</button>
                            <button
                                type="button"
                                onClick={() => selectedStyle && setStep('topic')}
                                disabled={!selectedStyle}
                                className="btn-primary disabled:opacity-30"
                            >
                                Next: Topic Hint →
                            </button>
                        </div>
                    </div>
                )}

                {/* ── STEP 3: TOPIC HINT ── */}
                {step === 'topic' && (
                    <div className="animate-fade-in max-w-2xl">
                        <h2 className="text-lg font-semibold text-gray-300 mb-2">Step 3: Topic Hint (Optional)</h2>
                        <p className="text-xs text-gray-600 mb-5">
                            Give the AI a specific topic or leave blank to let it pick the most viral angle for your niche.
                        </p>

                        <textarea
                            value={topicHint}
                            onChange={(e) => setTopicHint(e.target.value)}
                            rows={4}
                            placeholder={nicheData?.example?.replace(/"/g, '') ?? 'e.g. the story of the 47 Ronin samurai and their act of revenge...'}
                            className="input-field resize-none"
                        />
                        <p className="text-xs text-gray-600 mt-2">
                            Leave blank → AI picks the most viral topic in your niche automatically.
                        </p>

                        {/* Schedule picker */}
                        <div className="mt-8">
                            <h3 className="text-sm font-semibold text-gray-300 mb-3">Posting Schedule</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {SCHEDULES.map((s) => (
                                    <button
                                        type="button"
                                        key={s.id}
                                        onClick={() => setSelectedSchedule(s.id)}
                                        className={`text-center p-3 rounded-xl border transition-all duration-200
                                            ${selectedSchedule === s.id
                                                ? 'border-purple-500/50 bg-purple-500/10 text-purple-300'
                                                : 'border-white/[0.06] bg-white/[0.02] text-gray-500 hover:border-purple-500/20 hover:text-gray-300'
                                            }`}
                                    >
                                        <div className="text-lg mb-1">{s.icon}</div>
                                        <div className="text-xs font-semibold">{s.label}</div>
                                        <div className="text-[10px] mt-0.5 opacity-70">{s.desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 flex justify-between">
                            <button type="button" onClick={() => setStep('style')} className="btn-secondary">← Back</button>
                            <button type="button" onClick={() => setStep('review')} className="btn-primary">
                                Review & Generate →
                            </button>
                        </div>
                    </div>
                )}

                {/* ── STEP 4: REVIEW ── */}
                {step === 'review' && (
                    <div className="animate-fade-in max-w-2xl">
                        <h2 className="text-lg font-semibold text-gray-300 mb-5">Step 4: Review Your Series Setup</h2>

                        <div className="glass-card p-6 space-y-5">
                            <ReviewRow
                                label="Content Niche"
                                value={`${nicheData?.emoji} ${nicheData?.label}`}
                                sub={nicheData?.desc}
                                onEdit={() => setStep('niche')}
                            />
                            <div className="border-t border-white/5" />
                            <ReviewRow
                                label="Visual Style"
                                value={`${styleData?.emoji} ${styleData?.label}`}
                                sub={styleData?.desc}
                                onEdit={() => setStep('style')}
                            />
                            <div className="border-t border-white/5" />
                            <ReviewRow
                                label="Topic Hint"
                                value={topicHint.trim() || '(AI picks the best viral topic)'}
                                onEdit={() => setStep('topic')}
                            />
                            <div className="border-t border-white/5" />
                            <ReviewRow
                                label="Schedule"
                                value={SCHEDULES.find(s => s.id === selectedSchedule)?.label ?? 'Daily'}
                                sub={SCHEDULES.find(s => s.id === selectedSchedule)?.desc}
                                onEdit={() => setStep('topic')}
                            />
                        </div>

                        {error && (
                            <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
                        )}

                        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-3">
                            <button type="button" onClick={() => setStep('topic')} className="btn-secondary">← Back</button>
                            <button type="button" onClick={handleGenerate} className="btn-primary text-lg px-10 py-4">
                                ✨ Generate Faceless Episode →
                            </button>
                        </div>
                    </div>
                )}

                {/* ── GENERATING ── */}
                {step === 'generating' && (
                    <div className="animate-fade-in flex flex-col items-center justify-center py-20 text-center">
                        <div className="spinner mb-6" style={{ width: 56, height: 56 }} />
                        <h2 className="text-xl font-semibold text-white mb-2">Generating Your Faceless Episode...</h2>
                        <p className="text-sm text-gray-500 max-w-md mb-6">
                            Gemini is writing your viral script, then Replicate AI is painting 4 anime scenes in parallel. Usually takes 30–60 seconds.
                        </p>
                        <div className="flex flex-col gap-2 text-xs text-gray-600 max-w-xs w-full">
                            {['Writing viral script...', 'Generating 4 anime scenes in parallel...', 'Assembling storyboard...'].map((msg, i) => (
                                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                                    <span>{msg}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── RESULT: STORYBOARD ── */}
                {step === 'result' && result && (
                    <ResultStoryboard
                        result={result}
                        nicheData={nicheData}
                        styleData={styleData}
                        schedule={SCHEDULES.find(s => s.id === selectedSchedule)}
                        onRegenerate={() => {
                            setResult(null)
                            setStep('review')
                        }}
                        onNewSeries={() => {
                            setResult(null)
                            setSelectedNiche(null)
                            setSelectedStyle(null)
                            setTopicHint('')
                            setStep('niche')
                        }}
                    />
                )}

            </main>
        </div>
    )
}

/* ─────────────── REVIEW ROW ─────────────── */

function ReviewRow({ label, value, sub, onEdit }: { label: string; value: string; sub?: string; onEdit: () => void }) {
    return (
        <div className="flex items-start justify-between">
            <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</p>
                <p className="text-white font-semibold text-sm">{value}</p>
                {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
            </div>
            <button type="button" onClick={onEdit} className="text-xs text-cyan-400 hover:text-cyan-300 transition shrink-0 ml-4">
                Change
            </button>
        </div>
    )
}

/* ─────────────── RESULT STORYBOARD ─────────────── */

function ResultStoryboard({
    result,
    nicheData,
    styleData,
    schedule,
    onRegenerate,
    onNewSeries,
}: {
    result: FacelessResult
    nicheData: typeof FACELESS_NICHES[number] | undefined
    styleData: typeof VISUAL_STYLES[number] | undefined
    schedule: typeof SCHEDULES[number] | undefined
    onRegenerate: () => void
    onNewSeries: () => void
}) {
    return (
        <div className="animate-fade-in space-y-8">

            {/* Title & Hook */}
            <div className="glass-card p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-cyan-400 font-medium uppercase tracking-wider">{nicheData?.emoji} {nicheData?.label}</span>
                            <span className="text-gray-600">•</span>
                            <span className="text-xs text-purple-400 font-medium">{styleData?.emoji} {styleData?.label}</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight mb-3">{result.title}</h2>
                        <div className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                            <p className="text-xs text-cyan-400 font-semibold mb-1">Opening Hook</p>
                            <p className="text-sm text-gray-300 italic">&ldquo;{result.hook}&rdquo;</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                        <div className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-xs text-green-400 font-medium text-center">
                            ✓ Ready to Post
                        </div>
                        <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 text-center">
                            {schedule?.icon} {schedule?.label}
                        </div>
                    </div>
                </div>
            </div>

            {/* Scene Storyboard */}
            <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-4">Storyboard — {result.scenes.length} Scenes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {result.scenes.map((scene) => (
                        <div key={scene.sceneNumber} className="glass-card overflow-hidden">
                            {/* Scene image */}
                            <div className="relative w-full aspect-video bg-black overflow-hidden">
                                <img
                                    src={scene.imageUrl}
                                    alt={`Scene ${scene.sceneNumber}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 text-xs font-bold text-white border border-white/10">
                                    Scene {scene.sceneNumber}
                                </div>
                            </div>
                            {/* Narration */}
                            <div className="p-4">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-medium">Narrator says:</p>
                                <p className="text-sm text-gray-200 leading-relaxed">{scene.narration}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA & Hashtags */}
            <div className="glass-card p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-medium">Closing CTA</p>
                    <p className="text-sm text-gray-300 italic">&ldquo;{result.callToAction}&rdquo;</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-medium">Hashtags</p>
                    <div className="flex flex-wrap gap-1.5">
                        {result.hashtags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 border border-purple-500/20 text-purple-300">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Voice Coming Soon */}
            <div className="glass-card p-5 flex items-center gap-4">
                <div className="text-2xl opacity-50">🎙️</div>
                <div className="flex-1">
                    <p className="text-sm font-semibold text-white mb-0.5">AI Voiceover</p>
                    <p className="text-xs text-gray-500">Auto-generated narration voice will be added to each scene in a future update.</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 shrink-0">
                    Coming Soon
                </span>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link href="/dashboard/automations" className="btn-primary text-center block">
                    ⚡ Schedule This Series
                </Link>
                <button type="button" onClick={onRegenerate} className="btn-secondary">
                    🔄 Regenerate Episode
                </button>
                <button type="button" onClick={onNewSeries} className="btn-secondary">
                    ✨ New Series
                </button>
            </div>

        </div>
    )
}
