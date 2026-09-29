import { useState, useEffect, useRef, useCallback } from 'react'
import { Video, Camera, RefreshCw, CheckCircle2, AlertTriangle, X } from 'lucide-react'

/**
 * VideoChallengeCapture
 *
 * Generates a one-time challenge code that must appear on-screen
 * during a 15-second live recording — prevents merchants from
 * submitting pre-recorded video evidence.
 *
 * Props
 *   onCaptureComplete(blob, challengeCode) — fires when recording stops successfully
 *   onSkip()                               — fires if user opts for manual file upload
 */
export default function VideoChallengeCapture({ onCaptureComplete, onSkip }) {
  const [code, setCode]     = useState('')
  const [phase, setPhase]   = useState('idle')   // idle | ready | recording | done | error
  const [timer, setTimer]   = useState(15)
  const [stream, setStream] = useState(null)
  const [errMsg, setErrMsg] = useState('')

  const videoRef    = useRef(null)
  const recorderRef = useRef(null)
  const chunksRef   = useRef([])

  // ── generate a fresh challenge code ─────────────────────────
  const reset = useCallback(() => {
    stream?.getTracks().forEach(t => t.stop())
    setStream(null)
    setCode(`MV-${Math.floor(1000 + Math.random() * 9000)}`)
    setPhase('idle')
    setTimer(15)
    setErrMsg('')
  }, [stream])

  useEffect(() => { reset() }, []) // run once on mount

  // ── request camera access ────────────────────────────────────
  const openCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      setStream(s)
      if (videoRef.current) videoRef.current.srcObject = s
      setPhase('ready')
    } catch (err) {
      setErrMsg('Camera access denied. Allow camera permissions and try again.')
      setPhase('error')
    }
  }

  // ── start 15-second recording ────────────────────────────────
  const startRecording = () => {
    if (!stream) return
    chunksRef.current = []

    const rec = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp8,opus' })
    recorderRef.current = rec

    rec.ondataavailable = (e) => {
      if (e.data?.size > 0) chunksRef.current.push(e.data)
    }
    rec.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' })
      stream.getTracks().forEach(t => t.stop())
      setStream(null)
      setPhase('done')
      onCaptureComplete?.(blob, code)
    }

    rec.start()
    setPhase('recording')
    setTimer(15)
  }

  // ── countdown while recording ────────────────────────────────
  useEffect(() => {
    if (phase !== 'recording') return
    if (timer === 0) {
      recorderRef.current?.stop()
      return
    }
    const t = setTimeout(() => setTimer(p => p - 1), 1000)
    return () => clearTimeout(t)
  }, [phase, timer])

  // ── clean up camera on unmount ───────────────────────────────
  useEffect(() => () => stream?.getTracks().forEach(t => t.stop()), [stream])

  const cameraActive = phase === 'ready' || phase === 'recording'

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2 mb-1">
          <Video size={16} className="text-primary-600" />
          <h3 className="font-semibold text-slate-800">Live Video Evidence Capture</h3>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          To prevent pre-recorded uploads, you must display the one-time challenge code
          on screen throughout your 15-second recording.
        </p>
      </div>

      <div className="p-5 space-y-4">
        {/* ── Challenge code card ────────────────────────── */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700 mb-1">
            One-Time Challenge Code
          </p>
          <p className="text-3xl font-extrabold font-mono tracking-widest text-amber-900 my-1">
            {code}
          </p>
          <p className="text-xs text-amber-700">
            Hold this code clearly visible to the camera for the full 15 seconds.
          </p>
        </div>

        {/* ── Camera viewport ────────────────────────────── */}
        <div className="relative bg-slate-900 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
          {/* Live feed */}
          <video
            ref={videoRef}
            autoPlay muted playsInline
            className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
          />

          {/* Idle / error placeholder */}
          {!cameraActive && phase !== 'done' && (
            <div className="flex flex-col items-center gap-2 text-white/50">
              <Camera size={36} />
              <p className="text-sm">{phase === 'error' ? 'Camera unavailable' : 'Camera inactive'}</p>
            </div>
          )}

          {/* Done overlay */}
          {phase === 'done' && (
            <div className="absolute inset-0 bg-slate-900/80 flex flex-col items-center justify-center gap-2">
              <CheckCircle2 size={44} className="text-emerald-400" />
              <p className="text-white font-semibold">Recording Saved</p>
            </div>
          )}

          {/* REC badge */}
          {phase === 'recording' && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-red-600 px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-white text-xs font-bold">REC {timer}s</span>
            </div>
          )}

          {/* Challenge code overlay on live feed */}
          {cameraActive && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-1.5 rounded-full pointer-events-none">
              <span className="text-amber-300 font-mono font-bold text-sm tracking-widest">{code}</span>
            </div>
          )}
        </div>

        {/* ── Error message ──────────────────────────────── */}
        {phase === 'error' && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3">
            <AlertTriangle size={14} className="text-red-500 mt-0.5 shrink-0" />
            <p className="text-xs text-red-700">{errMsg}</p>
          </div>
        )}

        {/* ── Action buttons ─────────────────────────────── */}
        <div className="flex flex-col gap-2">
          {phase === 'idle' && (
            <button onClick={openCamera}
              className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white
                text-sm font-semibold py-2.5 rounded-xl hover:bg-primary-700 transition-colors">
              <Camera size={15} /> Open Camera &amp; Prepare
            </button>
          )}

          {phase === 'ready' && (
            <button onClick={startRecording}
              className="w-full flex items-center justify-center gap-2 bg-red-600 text-white
                text-sm font-semibold py-2.5 rounded-xl hover:bg-red-700 transition-colors">
              <span className="w-2.5 h-2.5 bg-white rounded-full" />
              Start 15-Second Recording
            </button>
          )}

          {phase === 'recording' && (
            <button disabled
              className="w-full flex items-center justify-center gap-2 bg-slate-300
                text-white text-sm font-semibold py-2.5 rounded-xl cursor-not-allowed">
              Recording in progress… ({timer}s remaining)
            </button>
          )}

          {phase === 'error' && (
            <button onClick={reset}
              className="w-full flex items-center justify-center gap-2 border border-slate-200
                text-slate-600 text-sm font-medium py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
              <RefreshCw size={14} /> Try Again
            </button>
          )}

          {phase === 'done' && (
            <div className="flex gap-2">
              <button onClick={reset}
                className="flex-1 flex items-center justify-center gap-2 border border-slate-200
                  text-slate-600 text-sm font-medium py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                <RefreshCw size={14} /> Re-record
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 text-white
                  text-sm font-semibold py-2.5 rounded-xl hover:bg-emerald-600 transition-colors">
                <CheckCircle2 size={14} /> Confirm &amp; Use
              </button>
            </div>
          )}

          {onSkip && phase !== 'done' && (
            <button onClick={onSkip}
              className="text-xs text-slate-400 hover:text-slate-600 text-center py-1 transition-colors">
              Skip — I'll upload a video file manually instead
            </button>
          )}
        </div>

        {/* ── Recording checklist ────────────────────────── */}
        {phase !== 'done' && (
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="text-xs font-semibold text-slate-600 mb-2">Recording checklist</p>
            <ul className="space-y-1.5">
              {[
                `Display challenge code (${code}) visibly throughout`,
                'Show the instrument serial number plate clearly',
                'Demonstrate zero-load reading on the instrument',
                'Apply test weights and show each reading',
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-xs text-slate-500">
                  <span className="text-primary-500 mt-px shrink-0">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
