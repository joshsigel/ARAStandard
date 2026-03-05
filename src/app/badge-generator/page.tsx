'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { CertificationBadge } from '@/components/badges/CertificationBadge';

type BadgeLevel = 1 | 2 | 3;
type BadgeVariant = 'dark-on-light' | 'light-on-dark' | 'mono-black' | 'mono-white';
type CertType = 'deployment' | 'platform';
type AssuranceClass = 'A' | 'B' | 'C';
type OperationalState = 'active' | 'monitoring-active' | 'monitoring-delayed' | 'revalidation' | 'suspended' | 'expired';

const operationalStates: { value: OperationalState; label: string; color: string }[] = [
  { value: 'active', label: 'Active', color: 'bg-green-500' },
  { value: 'monitoring-active', label: 'Monitoring Active', color: 'bg-green-500' },
  { value: 'monitoring-delayed', label: 'Monitoring Delayed', color: 'bg-amber-500' },
  { value: 'revalidation', label: 'Revalidation Required', color: 'bg-amber-500' },
  { value: 'suspended', label: 'Suspended', color: 'bg-red-500' },
  { value: 'expired', label: 'Expired', color: 'bg-gray-400' },
];

export default function BadgeGeneratorPage() {
  const [level, setLevel] = useState<BadgeLevel>(2);
  const [certId, setCertId] = useState('ARA-2026-00000');
  const [variant, setVariant] = useState<BadgeVariant>('dark-on-light');
  const [size, setSize] = useState(240);
  const [certType, setCertType] = useState<CertType>('deployment');
  const [assuranceClass, setAssuranceClass] = useState<AssuranceClass>('B');
  const [operationalState, setOperationalState] = useState<OperationalState>('active');
  const [embedOpen, setEmbedOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const svgRef = useRef<HTMLDivElement>(null);

  const downloadFilename = certType === 'platform'
    ? `ara-badge-platform-L${level}-${certId}`
    : `ara-badge-L${level}-${assuranceClass}-${certId}`;

  const downloadSVG = () => {
    if (!svgRef.current) return;
    const svg = svgRef.current.querySelector('svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${downloadFilename}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPNG = () => {
    if (!svgRef.current) return;
    const svg = svgRef.current.querySelector('svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const pxSize = size * 4; // 4x for high DPI
    canvas.width = pxSize;
    canvas.height = pxSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = new Image();
    img.onload = () => {
      if (variant === 'light-on-dark' || variant === 'mono-white') {
        ctx.fillStyle = '#1A2333';
        ctx.fillRect(0, 0, pxSize, pxSize);
      }
      ctx.drawImage(img, 0, 0, pxSize, pxSize);
      const pngUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = `${downloadFilename}.png`;
      a.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const embedCode = `<img src="https://arastandard.org/api/v1/badge/${certId}" alt="ARA Certified" width="${size}" height="${size}" />`;

  const copyEmbedCode = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = embedCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const variantBg = variant === 'light-on-dark' || variant === 'mono-white'
    ? 'bg-navy'
    : 'bg-white';

  const btnActive = 'bg-charcoal text-white border-charcoal';
  const btnInactive = 'bg-white text-steel border-border hover:border-border-dark';

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-muted mb-8">
        <Link href="/" className="hover:text-charcoal">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-charcoal">Badge Generator</span>
      </nav>

      <div className="max-w-4xl">
        <h1 className="text-3xl font-semibold text-charcoal mb-4">
          Certification Badge Generator
        </h1>
        <p className="text-base text-steel leading-relaxed mb-2 max-w-2xl">
          Generate ARA Certification Marks in authorized color variations.
          Badges produced here conform to the ARAF Trademark and Certification
          Mark Usage Policy (ARAF-ARA-TMK-2026-001).
        </p>
        <p className="text-xs text-muted mb-10 max-w-2xl">
          Note: These badges are for preview and reference purposes.
          Certified organizations receive official badge assets through the
          ARAF Certification Portal.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Controls */}
          <div className="space-y-6">
            {/* Certification Type */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Certification Type
              </label>
              <div className="flex gap-2">
                {([
                  { value: 'deployment' as CertType, label: 'Deployment' },
                  { value: 'platform' as CertType, label: 'Platform' },
                ]).map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setCertType(t.value)}
                    className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors ${
                      certType === t.value ? btnActive : btnInactive
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Level */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Certification Level
              </label>
              <div className="flex gap-2">
                {([1, 2, 3] as BadgeLevel[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLevel(l)}
                    className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors ${
                      level === l ? btnActive : btnInactive
                    }`}
                  >
                    Level {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Assurance Class — deployment only */}
            {certType === 'deployment' && (
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Assurance Class
                </label>
                <div className="flex gap-2">
                  {([
                    { value: 'A' as AssuranceClass, label: 'Class A (Periodic)' },
                    { value: 'B' as AssuranceClass, label: 'Class B (Monitored)' },
                    { value: 'C' as AssuranceClass, label: 'Class C (Continuous)' },
                  ]).map((cls) => (
                    <button
                      key={cls.value}
                      onClick={() => setAssuranceClass(cls.value)}
                      className={`px-3 py-2 text-xs font-medium rounded-md border transition-colors ${
                        assuranceClass === cls.value ? btnActive : btnInactive
                      }`}
                    >
                      {cls.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Operational State */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Operational State
              </label>
              <div className="grid grid-cols-2 gap-2">
                {operationalStates.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setOperationalState(s.value)}
                    className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md border transition-colors text-left ${
                      operationalState === s.value ? btnActive : btnInactive
                    }`}
                  >
                    <span className={`inline-block w-2 h-2 rounded-full shrink-0 ${s.color}`} />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Certification ID */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Certification ID
              </label>
              <input
                type="text"
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
                placeholder="ARA-2026-00000"
                className="w-full px-3 py-2 text-sm font-mono border border-border rounded-md focus:outline-none focus:border-navy"
              />
            </div>

            {/* Color Variation */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Color Variation
              </label>
              <div className="grid grid-cols-2 gap-2">
                {([
                  { value: 'dark-on-light', label: 'Standard (Dark on Light)' },
                  { value: 'light-on-dark', label: 'Reverse (Light on Dark)' },
                  { value: 'mono-black', label: 'Monochrome Black' },
                  { value: 'mono-white', label: 'Monochrome White' },
                ] as { value: BadgeVariant; label: string }[]).map((v) => (
                  <button
                    key={v.value}
                    onClick={() => setVariant(v.value)}
                    className={`px-3 py-2 text-xs font-medium rounded-md border transition-colors text-left ${
                      variant === v.value ? btnActive : btnInactive
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Size: {size}px
              </label>
              <input
                type="range"
                min={80}
                max={480}
                step={10}
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted mt-1">
                <span>80px (minimum)</span>
                <span>480px</span>
              </div>
            </div>

            {/* Download */}
            <div className="flex gap-3">
              <button
                onClick={downloadSVG}
                className="px-4 py-2 text-sm font-medium bg-charcoal text-white rounded-md hover:bg-navy transition-colors"
              >
                Download SVG
              </button>
              <button
                onClick={downloadPNG}
                className="px-4 py-2 text-sm font-medium border border-border text-charcoal rounded-md hover:bg-slate-50 transition-colors"
              >
                Download PNG (4x)
              </button>
            </div>

            {/* Embed Code */}
            <div className="border border-border rounded-lg">
              <button
                onClick={() => setEmbedOpen(!embedOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-charcoal hover:bg-slate-50 transition-colors rounded-lg"
              >
                <span>Embed Code</span>
                <svg
                  className={`w-4 h-4 text-muted transition-transform ${embedOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {embedOpen && (
                <div className="px-4 pb-4 space-y-3">
                  <div className="relative">
                    <pre className="bg-slate-50 border border-border rounded-md p-3 text-xs font-mono text-steel overflow-x-auto whitespace-pre-wrap break-all">
                      {embedCode}
                    </pre>
                    <button
                      onClick={copyEmbedCode}
                      className="absolute top-2 right-2 px-2 py-1 text-xs font-medium bg-white border border-border rounded text-steel hover:border-border-dark transition-colors"
                    >
                      {copied ? 'Copied!' : 'Copy Code'}
                    </button>
                  </div>
                  <div>
                    <p className="text-xs text-muted mb-2">Preview:</p>
                    <div className="bg-slate-50 border border-border rounded-md p-3 text-xs font-mono text-steel break-all">
                      <code>&lt;img src=&quot;https://arastandard.org/api/v1/badge/{certId}&quot; ... /&gt;</code>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Preview */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
              Preview
            </p>
            <div
              className={`${variantBg} border border-border rounded-lg p-10 flex items-center justify-center min-h-[320px]`}
              ref={svgRef}
            >
              <CertificationBadge
                level={level}
                certificationId={certId}
                size={size}
                variant={variant}
                assuranceClass={certType === 'deployment' ? assuranceClass : undefined}
                certType={certType}
                operationalState={operationalState}
              />
            </div>
            <p className="text-xs text-muted mt-3">
              Minimum display size: 80px diameter (digital), 0.75&quot; diameter (print).
              15% clear space required on all sides.
            </p>
          </div>
        </div>

        {/* Usage Notes */}
        <div className="mt-12 border border-border rounded-lg p-6">
          <h2 className="text-base font-semibold text-charcoal mb-3">
            Usage Requirements
          </h2>
          <ul className="text-sm text-steel space-y-2 leading-relaxed">
            <li>The ARA Certification Mark may only be displayed by organizations with a current, active ARA certification.</li>
            <li>The mark must be displayed in one of the four authorized color variations only.</li>
            <li>Minimum 15% clear space must be maintained on all sides of the mark.</li>
            <li>The Certification ID embedded in the mark must match the actual certification.</li>
            <li>The mark may not be used as a favicon, profile image, or avatar.</li>
            <li>Level 1 organizations may display the mark on certification documentation and company website only.</li>
            <li>Living badges must accurately reflect the current operational state of the certification.</li>
            <li>Platform certification badges may only be displayed by vendors with active platform certifications.</li>
            <li>The assurance class indicator must match the certified assurance class designation.</li>
          </ul>
          <p className="text-xs text-muted mt-4">
            Full usage requirements are defined in the{' '}
            <span className="font-medium">ARAF Trademark and Certification Mark Usage Policy</span>{' '}
            (ARAF-ARA-TMK-2026-001).
          </p>
        </div>
      </div>
    </div>
  );
}
