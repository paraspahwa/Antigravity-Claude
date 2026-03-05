'use client'

import Link from 'next/link'
import { useState, useRef, useEffect, useCallback } from 'react'

const NICHES = [
    { id: 'shonen_action', emoji: '⚔️', label: 'Shōnen Action', desc: 'Dragon Ball, Naruto, One Piece style' },
    { id: 'isekai_fantasy', emoji: '🌀', label: 'Isekai Fantasy', desc: 'Transported to another world' },
    { id: 'mecha_sci_fi', emoji: '🤖', label: 'Mecha / Sci-Fi', desc: 'Gundam, Evangelion style' },
    { id: 'magical_girl', emoji: '✨', label: 'Mahō Shōjo', desc: 'Magical Girl transformation' },
    { id: 'slice_of_life', emoji: '🌸', label: 'Slice of Life', desc: 'School, romance, daily life' },
    { id: 'dark_fantasy', emoji: '🗡️', label: 'Dark Fantasy', desc: 'Berserk, Attack on Titan style' },
    { id: 'cyberpunk', emoji: '🌃', label: 'Cyberpunk', desc: 'Neon cities, hacking, future tech' },
    { id: 'horror_thriller', emoji: '👻', label: 'Horror / Thriller', desc: 'Junji Ito, psychological horror' },
    { id: 'sports', emoji: '🏀', label: 'Sports Anime', desc: 'Haikyuu, Kuroko no Basket' },
    { id: 'samurai_historical', emoji: '🏯', label: 'Samurai / Historical', desc: 'Edo period, feudal Japan' },
    { id: 'romance_drama', emoji: '💕', label: 'Romance / Drama', desc: 'Your Lie in April, Clannad' },
    { id: 'chibi_cute', emoji: '🐱', label: 'Chibi / Kawaii', desc: 'Adorable, SD-style characters' },
    { id: 'studio_ghibli', emoji: '🍃', label: 'Studio Ghibli', desc: 'Miyazaki-inspired wonder' },
    { id: 'demon_supernatural', emoji: '😈', label: 'Demon / Supernatural', desc: 'Demon Slayer, Jujutsu Kaisen' },
    { id: 'post_apocalyptic', emoji: '💀', label: 'Post-Apocalyptic', desc: 'Dr. Stone, survival themes' },
    { id: 'custom', emoji: '🖊️', label: 'Custom Niche', desc: 'Type your own below' },
]

const DURATIONS = [
    { id: '30s', label: '30 Seconds', desc: 'Quick TikTok / Reel', icon: '⚡', clipCount: 2 },
    { id: '60s', label: '1 Minute', desc: 'YouTube Short', icon: '🎬', clipCount: 3 },
    { id: '2min', label: '2 Minutes', desc: 'Extended Short', icon: '📽️', clipCount: 4 },
    { id: '5min', label: '5 Minutes', desc: 'Full Video', icon: '🎥', clipCount: 4 },
]

const SOUND_TRACKS = [
    { id: 'none', label: 'No Sound', emoji: '🔇', desc: 'Silent video' },
    { id: 'epic_orchestral', label: 'Epic Orchestral', emoji: '🎻', desc: 'Battle / dramatic scenes' },
    { id: 'lofi_chill', label: 'Lo-fi Chill', emoji: '☕', desc: 'Relaxed, study vibes' },
    { id: 'jpop_upbeat', label: 'J-Pop Upbeat', emoji: '🎤', desc: 'Energetic, fun anime OP' },
    { id: 'dark_ambient', label: 'Dark Ambient', emoji: '🌑', desc: 'Horror / mystery mood' },
    { id: 'piano_emotional', label: 'Emotional Piano', emoji: '🎹', desc: 'Sad / romantic scenes' },
    { id: 'electronic_edm', label: 'Electronic / EDM', emoji: '🎧', desc: 'Cyberpunk / action' },
    { id: 'traditional_jp', label: 'Traditional Japanese', emoji: '🏯', desc: 'Shamisen, koto, flute' },
    { id: 'rock_metal', label: 'Anime Rock', emoji: '🎸', desc: 'Shōnen battle energy' },
]

type Step = 'niche' | 'duration' | 'prompt' | 'review' | 'generating' | 'result'

export default function CreateVideoPage() {
    const [step, setStep] = useState<Step>('niche')
    const [selectedNiche, setSelectedNiche] = useState<string | null>(null)
    const [selectedDuration, setSelectedDuration] = useState<string | null>(null)
    const [customPrompt, setCustomPrompt] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [videoLoading, setVideoLoading] = useState(false)
    const [videoResult, setVideoResult] = useState<{ urls: string[]; totalSeconds: number } | null>(null)
    const [result, setResult] = useState<{
        enhancedPrompt: string;
        avatarUrl: string;
    } | null>(null)

    const selectedNicheData = NICHES.find(n => n.id === selectedNiche)
    const selectedDurationData = DURATIONS.find(d => d.id === selectedDuration)

    const handleGenerate = async (overridePrompt?: string) => {
        if (!selectedNiche) return
        setStep('generating')
        setLoading(true)
        setError(null)
        setResult(null)
        setVideoResult(null)

        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ niche: selectedNiche, customPrompt: overridePrompt ?? customPrompt }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Failed to generate')
            setResult(data)
            setStep('result')
        } catch (err: any) {
            setError(err.message)
            setStep('review')
        } finally {
            setLoading(false)
        }
    }

    const handleGenerateVideo = async () => {
        if (!result?.avatarUrl) return
        setVideoLoading(true)
        setError(null)

        try {
            const res = await fetch('/api/generate-video', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageUrl: result.avatarUrl, duration: selectedDuration }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Failed to generate video')
            setVideoResult({ urls: data.videoUrls, totalSeconds: data.totalSeconds })
        } catch (err: any) {
            setError(err.message)
        } finally {
            setVideoLoading(false)
        }
    }

    return (
        <div className="relative min-h-screen flex flex-col px-4 sm:px-8 py-8 z-10">
            <header className="mb-8">
                <Link href="/dashboard" className="text-sm text-purple-400 hover:text-purple-300 transition mb-2 inline-block">
                    ← Back to Dashboard
                </Link>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Create Anime Video</h1>

                {/* Step Indicator */}
                <div className="flex flex-wrap items-center gap-2 mt-4 text-xs font-medium">
                    {['Niche', 'Duration', 'Prompt', 'Review', 'Result'].map((s, i) => {
                        const stepOrder: Step[] = ['niche', 'duration', 'prompt', 'review', 'result']
                        const currentIndex = stepOrder.indexOf(step === 'generating' ? 'review' : step)
                        const isActive = i <= currentIndex
                        return (
                            <div key={s} className="flex items-center gap-2">
                                {i > 0 && <div className={`w-4 sm:w-6 h-px ${isActive ? 'bg-purple-500' : 'bg-white/10'}`} />}
                                <span className={`px-2 sm:px-3 py-1 rounded-full border ${isActive ? 'border-purple-500/50 bg-purple-500/20 text-purple-300' : 'border-white/10 bg-white/5 text-gray-600'}`}>
                                    {s}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </header>

            <main className="w-full max-w-5xl mx-auto">

                {/* ── STEP 1: NICHE SELECTION ── */}
                {step === 'niche' && (
                    <div className="animate-fade-in">
                        <h2 className="text-lg font-semibold text-gray-300 mb-5">Step 1: Choose Your Anime Niche</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                            {NICHES.map((niche) => (
                                <button
                                    type="button"
                                    key={niche.id}
                                    onClick={() => setSelectedNiche(niche.id)}
                                    className={`
                    text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer
                    ${selectedNiche === niche.id
                                            ? 'border-purple-500/60 bg-purple-500/15 shadow-[0_0_20px_rgba(124,58,237,0.2)]'
                                            : 'border-white/[0.06] bg-white/[0.03] hover:border-purple-500/30 hover:bg-purple-500/[0.06] hover:-translate-y-0.5'
                                        }
                  `}
                                >
                                    <div className="text-2xl mb-1.5">{niche.emoji}</div>
                                    <div className="text-sm font-semibold text-white">{niche.label}</div>
                                    <div className="text-xs text-gray-500 mt-0.5">{niche.desc}</div>
                                </button>
                            ))}
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button
                                type="button"
                                onClick={() => selectedNiche && setStep('duration')}
                                disabled={!selectedNiche}
                                className="btn-primary disabled:opacity-30"
                            >
                                Next: Choose Duration →
                            </button>
                        </div>
                    </div>
                )}

                {/* ── STEP 2: DURATION SELECTION ── */}
                {step === 'duration' && (
                    <div className="animate-fade-in">
                        <h2 className="text-lg font-semibold text-gray-300 mb-5">Step 2: Choose Video Duration</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {DURATIONS.map((dur) => (
                                <button
                                    type="button"
                                    key={dur.id}
                                    onClick={() => setSelectedDuration(dur.id)}
                                    className={`
                    text-center p-6 rounded-2xl border transition-all duration-200 cursor-pointer
                    ${selectedDuration === dur.id
                                            ? 'border-cyan-500/60 bg-cyan-500/15 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                                            : 'border-white/[0.06] bg-white/[0.03] hover:border-cyan-500/30 hover:bg-cyan-500/[0.06] hover:-translate-y-0.5'
                                        }
                  `}
                                >
                                    <div className="text-3xl mb-2">{dur.icon}</div>
                                    <div className="text-base font-semibold text-white">{dur.label}</div>
                                    <div className="text-xs text-gray-500 mt-1">{dur.desc}</div>
                                    <div className="text-[10px] text-cyan-500/60 mt-1.5">{dur.clipCount} clips generated</div>
                                </button>
                            ))}
                        </div>
                        <div className="mt-8 flex justify-between">
                            <button type="button" onClick={() => setStep('niche')} className="btn-secondary">
                                ← Back
                            </button>
                            <button
                                type="button"
                                onClick={() => selectedDuration && setStep('prompt')}
                                disabled={!selectedDuration}
                                className="btn-primary disabled:opacity-30"
                            >
                                Next: Add Prompt →
                            </button>
                        </div>
                    </div>
                )}

                {/* ── STEP 3: CUSTOM PROMPT ── */}
                {step === 'prompt' && (
                    <div className="animate-fade-in max-w-2xl">
                        <h2 className="text-lg font-semibold text-gray-300 mb-5">Step 3: Custom Story / Prompt (Optional)</h2>
                        <textarea
                            value={customPrompt}
                            onChange={(e) => setCustomPrompt(e.target.value)}
                            rows={5}
                            placeholder="e.g. A lone samurai standing atop a cliff, overlooking a moonlit battlefield shrouded in cherry blossoms..."
                            className="input-field resize-none"
                        />
                        <p className="text-xs text-gray-600 mt-2">
                            Leave blank to let AI auto-generate a story based on your niche.
                        </p>
                        <div className="mt-8 flex justify-between">
                            <button type="button" onClick={() => setStep('duration')} className="btn-secondary">
                                ← Back
                            </button>
                            <button type="button" onClick={() => setStep('review')} className="btn-primary">
                                Next: Review Settings →
                            </button>
                        </div>
                    </div>
                )}

                {/* ── STEP 4: REVIEW & CONFIRM ── */}
                {step === 'review' && (
                    <div className="animate-fade-in max-w-2xl">
                        <h2 className="text-lg font-semibold text-gray-300 mb-5">Step 4: Review Your Settings</h2>

                        <div className="glass-card p-6 space-y-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Anime Niche</p>
                                    <p className="text-white font-semibold">{selectedNicheData?.emoji} {selectedNicheData?.label}</p>
                                    <p className="text-xs text-gray-500">{selectedNicheData?.desc}</p>
                                </div>
                                <button type="button" onClick={() => setStep('niche')} className="text-xs text-purple-400 hover:text-purple-300 transition">Change</button>
                            </div>
                            <div className="border-t border-white/5" />
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Video Duration</p>
                                    <p className="text-white font-semibold">{selectedDurationData?.icon} {selectedDurationData?.label}</p>
                                    <p className="text-xs text-gray-500">{selectedDurationData?.desc} — {selectedDurationData?.clipCount} clips</p>
                                </div>
                                <button type="button" onClick={() => setStep('duration')} className="text-xs text-purple-400 hover:text-purple-300 transition">Change</button>
                            </div>
                            <div className="border-t border-white/5" />
                            <div className="flex items-start justify-between">
                                <div className="flex-1 mr-4">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Custom Prompt</p>
                                    <p className="text-sm text-gray-300">{customPrompt.trim() || '(Auto-generate from niche)'}</p>
                                </div>
                                <button type="button" onClick={() => setStep('prompt')} className="text-xs text-purple-400 hover:text-purple-300 transition whitespace-nowrap">Change</button>
                            </div>
                        </div>

                        {error && (
                            <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
                        )}

                        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-3">
                            <button type="button" onClick={() => setStep('prompt')} className="btn-secondary">← Back to Prompt</button>
                            <button type="button" onClick={() => handleGenerate()} className="btn-primary text-lg px-10 py-4">✨ Generate Avatar & Story</button>
                        </div>
                    </div>
                )}

                {/* ── GENERATING STATE ── */}
                {step === 'generating' && (
                    <div className="animate-fade-in flex flex-col items-center justify-center py-20 text-center">
                        <div className="spinner mb-6" style={{ width: 56, height: 56 }}></div>
                        <h2 className="text-xl font-semibold text-white mb-2">Crafting Your Anime World...</h2>
                        <p className="text-sm text-gray-500 max-w-md">
                            Google Gemini is writing your story and Replicate AI is painting your avatar. This usually takes 15–30 seconds.
                        </p>
                    </div>
                )}

                {/* ── STEP 5: RESULTS ── */}
                {step === 'result' && result && (
                    <ResultStep
                        result={result}
                        selectedDurationData={selectedDurationData}
                        videoLoading={videoLoading}
                        videoResult={videoResult}
                        error={error}
                        onGenerateVideo={handleGenerateVideo}
                        onEditAvatar={(editedPrompt) => {
                            setCustomPrompt(editedPrompt)
                            handleGenerate(editedPrompt)
                        }}
                        onRegenerate={() => {
                            setResult(null)
                            setVideoResult(null)
                            setStep('review')
                        }}
                    />
                )}

            </main>
        </div>
    )
}

/* ─────────────────────────────────────────────── */
/* ─── RESULT STEP WITH AVATAR & VIDEO EDITORS ── */
/* ─────────────────────────────────────────────── */

function ResultStep({
    result,
    selectedDurationData,
    videoLoading,
    videoResult,
    error,
    onGenerateVideo,
    onEditAvatar,
    onRegenerate,
}: {
    result: { enhancedPrompt: string; avatarUrl: string }
    selectedDurationData: typeof DURATIONS[number] | undefined
    videoLoading: boolean
    videoResult: { urls: string[]; totalSeconds: number } | null
    error: string | null
    onGenerateVideo: () => void
    onEditAvatar: (editedPrompt: string) => void
    onRegenerate: () => void
}) {
    const [isEditingAvatar, setIsEditingAvatar] = useState(false)
    const [editedPrompt, setEditedPrompt] = useState(result.enhancedPrompt)
    const [selectedSound, setSelectedSound] = useState('none')
    const [showSoundPicker, setShowSoundPicker] = useState(false)
    const [videoStory, setVideoStory] = useState('')
    const [storyLoading, setStoryLoading] = useState(false)

    const selectedSoundData = SOUND_TRACKS.find(s => s.id === selectedSound)

    const handleAutoGenerateStory = async () => {
        setStoryLoading(true)
        try {
            const res = await fetch('/api/generate-story', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ avatarPrompt: result.enhancedPrompt }),
            })
            const data = await res.json()
            if (res.ok && data.story) {
                setVideoStory(data.story)
            }
        } catch (err) {
            console.error('Story generation failed:', err)
        } finally {
            setStoryLoading(false)
        }
    }

    return (
        <div className="animate-fade-in space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* ── LEFT: Avatar Preview & Editor ── */}
                <div className="glass-card p-6">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-gray-400">Generated Avatar</h3>
                        <button
                            type="button"
                            onClick={() => setIsEditingAvatar(!isEditingAvatar)}
                            className="text-xs text-purple-400 hover:text-purple-300 transition px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10"
                        >
                            {isEditingAvatar ? '✕ Cancel Edit' : '✏️ Edit Avatar'}
                        </button>
                    </div>

                    <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-white/10">
                        <img
                            src={result.avatarUrl}
                            alt="Generated Anime Avatar"
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* Avatar Edit Panel */}
                    {isEditingAvatar && (
                        <div className="mt-4 space-y-3 animate-fade-in">
                            <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                                <p className="text-xs text-purple-300 font-semibold mb-2">✏️ Edit the AI Prompt &amp; Regenerate</p>
                                <p className="text-xs text-gray-500 mb-3">
                                    Modify the prompt to change hair, outfit, expression, pose, background, or anything else.
                                </p>
                                <textarea
                                    value={editedPrompt}
                                    onChange={(e) => setEditedPrompt(e.target.value)}
                                    rows={6}
                                    className="input-field resize-none text-xs"
                                />
                                <button
                                    type="button"
                                    onClick={() => onEditAvatar(editedPrompt)}
                                    className="btn-primary w-full mt-3 text-sm"
                                >
                                    🔄 Regenerate Avatar with Edits
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Prompt Display (when not editing) */}
                    {!isEditingAvatar && (
                        <div className="mt-4">
                            <h3 className="text-sm font-semibold text-gray-400 mb-2">AI Prompt Used</h3>
                            <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-400 max-h-28 overflow-y-auto whitespace-pre-wrap">
                                {result.enhancedPrompt}
                            </div>
                        </div>
                    )}
                </div>

                {/* ── RIGHT: Video Generation & Sound Editor ── */}
                <div className="glass-card p-6 flex flex-col">
                    <h3 className="text-sm font-semibold text-gray-400 mb-3">Video Generation</h3>

                    {/* Duration info */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 mb-4">
                        <p className="text-xs text-gray-500 mb-1">Selected Duration</p>
                        <p className="text-white font-semibold">{selectedDurationData?.icon} {selectedDurationData?.label}</p>
                        <p className="text-xs text-cyan-500/70 mt-1">
                            {selectedDurationData?.clipCount} clips generated in parallel (~4s each, looped to fill duration)
                        </p>
                    </div>

                    {/* Sound Selection */}
                    <SoundEditor
                        selectedSound={selectedSound}
                        setSelectedSound={setSelectedSound}
                        showSoundPicker={showSoundPicker}
                        setShowSoundPicker={setShowSoundPicker}
                        selectedSoundData={selectedSoundData}
                    />

                    {error && (
                        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                            {error}
                        </div>
                    )}

                    {/* Generate / Result Actions */}
                    <div className="mt-auto space-y-3">
                        {!videoResult ? (
                            <>
                                <button
                                    type="button"
                                    onClick={onGenerateVideo}
                                    disabled={videoLoading}
                                    className="btn-primary w-full text-base py-4"
                                >
                                    {videoLoading
                                        ? `🎬 Generating ${selectedDurationData?.clipCount ?? 1} clip${(selectedDurationData?.clipCount ?? 1) > 1 ? 's' : ''}... (2–5 min)`
                                        : '🎬 Animate to Video →'
                                    }
                                </button>
                                {videoLoading && (
                                    <p className="text-xs text-gray-600 text-center">
                                        Clips are generated in parallel. Please keep this tab open.
                                    </p>
                                )}
                                <button
                                    type="button"
                                    onClick={onRegenerate}
                                    className="btn-secondary w-full"
                                >
                                    ← Change Settings &amp; Regenerate
                                </button>
                            </>
                        ) : (
                            <>
                                <MultiClipPlayer
                                    clips={videoResult.urls}
                                    totalSeconds={videoResult.totalSeconds}
                                />

                                {selectedSound !== 'none' && (
                                    <div className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-xs text-cyan-300 flex items-center gap-2">
                                        <span>{selectedSoundData?.emoji}</span>
                                        <span>Background: {selectedSoundData?.label} — will be mixed on export</span>
                                    </div>
                                )}

                                <a
                                    href={videoResult.urls[0]}
                                    download="animeforge_video.mp4"
                                    className="btn-primary w-full block text-center"
                                >
                                    ⬇ Download Video
                                </a>
                                <button
                                    type="button"
                                    onClick={onRegenerate}
                                    className="btn-secondary w-full"
                                >
                                    🔄 Start Over with New Settings
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* ── FULL WIDTH: Video Story Panel ── */}
                <div className="glass-card p-6 lg:col-span-2">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-gray-400">📖 Video Story — What should this avatar do?</h3>
                        <button
                            type="button"
                            onClick={handleAutoGenerateStory}
                            disabled={storyLoading}
                            className="text-xs text-cyan-400 hover:text-cyan-300 transition px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 disabled:opacity-40"
                        >
                            {storyLoading ? '✨ Writing...' : '✨ Auto-Generate Story'}
                        </button>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">
                        Describe the actions, emotions, and scenes you want in the video. This story guides the animation.
                    </p>
                    <textarea
                        value={videoStory}
                        onChange={(e) => setVideoStory(e.target.value)}
                        rows={5}
                        placeholder={`e.g. The samurai slowly draws his katana as cherry blossoms drift past. He takes a battle stance, eyes glowing with determination. The camera zooms in on his face as lightning crackles in the background...`}
                        className="input-field resize-none text-sm"
                    />
                    {videoStory && (
                        <div className="mt-3 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <p className="text-xs text-green-400">Story ready — it will guide your video generation</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

/* ─────────────────────────────── */
/* ─── MULTI-CLIP VIDEO PLAYER ── */
/* ─────────────────────────────── */

function formatSeconds(secs: number) {
    if (secs < 60) return `${secs}s`
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return s > 0 ? `${m}m ${s}s` : `${m}m`
}

function MultiClipPlayer({ clips, totalSeconds }: { clips: string[]; totalSeconds: number }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [elapsed, setElapsed] = useState(0)
    const [completed, setCompleted] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const startTimeRef = useRef<number>(Date.now())
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        startTimeRef.current = Date.now()
        timerRef.current = setInterval(() => {
            const secs = Math.floor((Date.now() - startTimeRef.current) / 1000)
            setElapsed(secs)
            if (secs >= totalSeconds) {
                setCompleted(true)
                if (timerRef.current) clearInterval(timerRef.current)
            }
        }, 1000)
        return () => { if (timerRef.current) clearInterval(timerRef.current) }
    }, [totalSeconds])

    const handleEnded = () => {
        if (!completed) {
            setCurrentIndex(i => (i + 1) % clips.length)
        }
    }

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load()
            videoRef.current.play().catch(() => {})
        }
    }, [currentIndex])

    const progress = Math.min(elapsed / totalSeconds, 1)

    return (
        <div className="space-y-3">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black">
                <video
                    ref={videoRef}
                    src={clips[currentIndex]}
                    autoPlay
                    className="w-full h-full object-contain"
                    onEnded={handleEnded}
                />
                {completed && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-white font-semibold mb-1">Video Complete</p>
                            <p className="text-xs text-gray-400">
                                {clips.length} unique clip{clips.length > 1 ? 's' : ''} looped to fill {formatSeconds(totalSeconds)}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Progress bar */}
            <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Clip {currentIndex + 1} / {clips.length}</span>
                    <span>{formatSeconds(elapsed)} / {formatSeconds(totalSeconds)}</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-1000 rounded-full"
                        style={{ width: `${progress * 100}%` }}
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>
                    {clips.length} clip{clips.length > 1 ? 's' : ''} generated — cycling to fill {formatSeconds(totalSeconds)}
                </span>
            </div>
        </div>
    )
}

/* ─────────────────────────────────────────────────── */
/* ─── SOUND EDITOR WITH PREVIEW, UPLOAD & RECORD ── */
/* ─────────────────────────────────────────────────── */

function SoundEditor({
    selectedSound,
    setSelectedSound,
    showSoundPicker,
    setShowSoundPicker,
    selectedSoundData,
}: {
    selectedSound: string
    setSelectedSound: (id: string) => void
    showSoundPicker: boolean
    setShowSoundPicker: (v: boolean) => void
    selectedSoundData: typeof SOUND_TRACKS[number] | undefined
}) {
    const [playingTrack, setPlayingTrack] = useState<string | null>(null)
    const [customAudioName, setCustomAudioName] = useState<string | null>(null)
    const [customAudioUrl, setCustomAudioUrl] = useState<string | null>(null)
    const [isRecording, setIsRecording] = useState(false)
    const [recordedUrl, setRecordedUrl] = useState<string | null>(null)
    const [recordingTime, setRecordingTime] = useState(0)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const chunksRef = useRef<Blob[]>([])
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current = null
            }
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [])

    const handlePlayPreview = useCallback((trackId: string) => {
        if (playingTrack === trackId) {
            audioRef.current?.pause()
            setPlayingTrack(null)
            return
        }
        audioRef.current?.pause()
        const ctx = new AudioContext()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        const frequencies: Record<string, number> = {
            epic_orchestral: 220, lofi_chill: 330, jpop_upbeat: 440,
            dark_ambient: 165, piano_emotional: 262, electronic_edm: 523,
            traditional_jp: 294, rock_metal: 370,
        }
        osc.frequency.value = frequencies[trackId] || 440
        osc.type = 'sine'
        gain.gain.value = 0.15
        osc.connect(gain).connect(ctx.destination)
        osc.start()
        setTimeout(() => { osc.stop(); ctx.close(); setPlayingTrack(null) }, 2000)
        setPlayingTrack(trackId)
    }, [playingTrack])

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        const url = URL.createObjectURL(file)
        setCustomAudioName(file.name)
        setCustomAudioUrl(url)
        setRecordedUrl(null)
        setSelectedSound('custom_upload')
    }

    const handleStartRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            const recorder = new MediaRecorder(stream)
            chunksRef.current = []
            recorder.ondataavailable = (e) => chunksRef.current.push(e.data)
            recorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
                const url = URL.createObjectURL(blob)
                setRecordedUrl(url)
                setCustomAudioUrl(null)
                setCustomAudioName(null)
                setSelectedSound('custom_recording')
                stream.getTracks().forEach(t => t.stop())
            }
            recorder.start()
            mediaRecorderRef.current = recorder
            setIsRecording(true)
            setRecordingTime(0)
            timerRef.current = setInterval(() => setRecordingTime(t => t + 1), 1000)
        } catch (err) {
            console.error('Microphone access denied:', err)
        }
    }

    const handleStopRecording = () => {
        mediaRecorderRef.current?.stop()
        setIsRecording(false)
        if (timerRef.current) clearInterval(timerRef.current)
    }

    const playCustomAudio = (url: string) => {
        audioRef.current?.pause()
        const audio = new Audio(url)
        audioRef.current = audio
        audio.play()
    }

    const formatTime = (secs: number) => {
        const m = Math.floor(secs / 60).toString().padStart(2, '0')
        const s = (secs % 60).toString().padStart(2, '0')
        return `${m}:${s}`
    }

    return (
        <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-500 uppercase tracking-wider">🎵 Background Music</p>
                <button
                    type="button"
                    onClick={() => setShowSoundPicker(!showSoundPicker)}
                    className="text-xs text-cyan-400 hover:text-cyan-300 transition"
                >
                    {showSoundPicker ? 'Collapse ▲' : 'Choose Sound →'}
                </button>
            </div>

            {/* Current selection preview */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                <span className="text-xl">{
                    selectedSound === 'custom_upload' ? '📁' :
                        selectedSound === 'custom_recording' ? '🎙️' :
                            selectedSoundData?.emoji
                }</span>
                <div className="flex-1">
                    <p className="text-sm font-medium text-white">{
                        selectedSound === 'custom_upload' ? customAudioName || 'Uploaded Audio' :
                            selectedSound === 'custom_recording' ? 'Voice Recording' :
                                selectedSoundData?.label
                    }</p>
                    <p className="text-xs text-gray-500">{
                        selectedSound === 'custom_upload' ? 'Your uploaded audio file' :
                            selectedSound === 'custom_recording' ? 'Recorded via microphone' :
                                selectedSoundData?.desc
                    }</p>
                </div>
                {(selectedSound === 'custom_upload' && customAudioUrl) && (
                    <button type="button" onClick={() => playCustomAudio(customAudioUrl!)} className="text-xs text-cyan-400 hover:text-cyan-300">▶ Play</button>
                )}
                {(selectedSound === 'custom_recording' && recordedUrl) && (
                    <button type="button" onClick={() => playCustomAudio(recordedUrl!)} className="text-xs text-cyan-400 hover:text-cyan-300">▶ Play</button>
                )}
            </div>

            {/* Expanded Picker */}
            {showSoundPicker && (
                <div className="mt-3 space-y-4 animate-fade-in">

                    {/* Built-in Tracks */}
                    <div>
                        <p className="text-xs text-gray-600 mb-2 font-medium">Built-in Tracks</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {SOUND_TRACKS.map((track) => (
                                <div
                                    key={track.id}
                                    className={`
                                        flex items-center gap-2 p-3 rounded-xl border transition-all duration-200 cursor-pointer
                                        ${selectedSound === track.id
                                            ? 'border-cyan-500/60 bg-cyan-500/15 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                                            : 'border-white/[0.06] bg-white/[0.03] hover:border-cyan-500/30 hover:bg-cyan-500/[0.06]'
                                        }
                                    `}
                                    onClick={() => setSelectedSound(track.id)}
                                >
                                    {track.id !== 'none' && (
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); handlePlayPreview(track.id) }}
                                            className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-xs text-white hover:bg-white/20 transition shrink-0"
                                        >
                                            {playingTrack === track.id ? '⏹' : '▶'}
                                        </button>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs font-medium text-white truncate">{track.emoji} {track.label}</div>
                                        <div className="text-[10px] text-gray-500 truncate">{track.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upload Custom Audio */}
                    <div>
                        <p className="text-xs text-gray-600 mb-2 font-medium">Upload Your Own</p>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="audio/mp3,audio/wav,audio/ogg,audio/mpeg,audio/webm"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full p-3 rounded-xl border border-dashed border-white/10 bg-white/[0.02] hover:border-purple-500/30 hover:bg-purple-500/[0.03] transition text-center group"
                        >
                            <span className="text-sm text-gray-400 group-hover:text-purple-300 transition">📁 Click to upload MP3, WAV, or OGG</span>
                        </button>
                        {customAudioUrl && (
                            <div className="mt-2 p-2 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                                <span className="text-xs text-gray-400 truncate">📁 {customAudioName}</span>
                                <button type="button" onClick={() => playCustomAudio(customAudioUrl!)} className="text-xs text-cyan-400 hover:text-cyan-300 shrink-0 ml-2">▶ Preview</button>
                            </div>
                        )}
                    </div>

                    {/* Voice Recording */}
                    <div>
                        <p className="text-xs text-gray-600 mb-2 font-medium">Record Voiceover</p>
                        {!isRecording ? (
                            <button
                                type="button"
                                onClick={handleStartRecording}
                                className="w-full p-3 rounded-xl border border-white/10 bg-white/[0.02] hover:border-red-500/30 hover:bg-red-500/[0.03] transition flex items-center justify-center gap-2"
                            >
                                <span className="w-3 h-3 rounded-full bg-red-500" />
                                <span className="text-sm text-gray-400">🎙️ Start Recording</span>
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleStopRecording}
                                className="w-full p-3 rounded-xl border border-red-500/40 bg-red-500/10 transition flex items-center justify-center gap-2"
                            >
                                <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-sm text-red-300">⏹ Stop Recording ({formatTime(recordingTime)})</span>
                            </button>
                        )}
                        {recordedUrl && !isRecording && (
                            <div className="mt-2 p-2 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                                <span className="text-xs text-gray-400">🎙️ Voice recording ready</span>
                                <button type="button" onClick={() => playCustomAudio(recordedUrl!)} className="text-xs text-cyan-400 hover:text-cyan-300 shrink-0 ml-2">▶ Preview</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
