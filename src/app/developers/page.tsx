import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Developer Portal — ARA Standard',
  description:
    'Integrate ARA compliance into your development lifecycle. SDK integration, telemetry schema, API reference, and machine-readable access for autonomous system certification.',
};

const quickStartSteps = [
  {
    number: 1,
    title: 'Choose your System Profile',
    description:
      'Select your profile — Foundational (F), Standard (S), Advanced (A), or Comprehensive (C) — to determine which ACRs apply to your system.',
  },
  {
    number: 2,
    title: 'Integrate the Telemetry SDK',
    description:
      'Install the @araf/telemetry-sdk package and configure it with your ARA System Identifier and telemetry endpoint for continuous monitoring readiness.',
  },
  {
    number: 3,
    title: 'Use the API',
    description:
      'Query ACRs, check regulatory framework mappings, search the certification registry, and verify certifications programmatically via the REST API.',
  },
];

const navCards = [
  {
    title: 'SDK Integration Guide',
    description:
      'Install and configure the Telemetry SDK. Event types, batching, error handling, and class-specific integration differences.',
    href: '/developers/sdk',
  },
  {
    title: 'Telemetry Schema',
    description:
      'Base event schema, event type payloads, transport requirements by assurance class, and data retention policies.',
    href: '/developers/telemetry',
  },
  {
    title: 'API Reference',
    description:
      'REST API endpoints for ACRs, domains, frameworks, registry search, and certification verification with examples.',
    href: '/developers/api',
  },
  {
    title: 'Machine Access',
    description:
      'Machine-readable endpoints, JSON Schema definitions, JSON-LD structured data, and AI agent ingestion guide.',
    href: '/ai-access',
  },
];

export default function DevelopersPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb
        items={[{ label: 'Home', href: '/' }, { label: 'Developers' }]}
        className="mb-8"
      />

      {/* Page header */}
      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-charcoal mb-4">
          Developer Portal
        </h1>
        <p className="text-base text-steel leading-relaxed max-w-3xl">
          Integrate ARA compliance into your development lifecycle. The ARA
          developer platform provides SDKs, APIs, and schema definitions to help
          you build, monitor, and certify autonomous systems against the ARA
          Standard.
        </p>
      </header>

      {/* Quick Start */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal mb-6">
          Quick Start
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {quickStartSteps.map((step) => (
            <div
              key={step.number}
              className="border border-border rounded-lg p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-charcoal text-white text-sm font-semibold shrink-0">
                  {step.number}
                </span>
                <h3 className="text-sm font-semibold text-charcoal">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm text-steel leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Navigation cards */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal mb-6">
          Resources
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {navCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
            >
              <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-2">
                {card.title}
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                {card.description}
              </p>
              <span className="inline-block mt-3 text-xs font-medium text-navy group-hover:underline">
                View docs &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Architecture overview */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal mb-4">
          Architecture Overview
        </h2>
        <p className="text-sm text-steel leading-relaxed max-w-3xl mb-6">
          The ARA developer platform consists of three main components that
          connect your system to the ARA certification infrastructure. The
          architecture varies by Assurance Class: Class A systems self-monitor,
          while Class B and Class C systems route telemetry through a CAPO
          (Continuous Assurance Platform Operator).
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-slate-50 border-b border-border px-5 py-3">
            <h3 className="text-sm font-semibold text-charcoal">
              Data Flow
            </h3>
          </div>
          <div className="px-5 py-6">
            <div className="flex flex-wrap items-center gap-3 text-sm font-mono">
              <span className="px-4 py-2 bg-charcoal text-white rounded">
                Your System
              </span>
              <span className="text-slate-400">&rarr;</span>
              <span className="px-4 py-2 bg-navy text-white rounded">
                Telemetry SDK
              </span>
              <span className="text-slate-400">&rarr;</span>
              <span className="px-4 py-2 bg-slate-200 text-charcoal rounded border border-slate-300">
                CAPO <span className="text-xs text-muted">(Class B/C)</span>
              </span>
              <span className="text-slate-400">&rarr;</span>
              <span className="px-4 py-2 bg-charcoal text-white rounded">
                ARA Registry
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Code example */}
      <section>
        <h2 className="text-2xl font-semibold text-charcoal mb-4">
          Example: Telemetry Initialization
        </h2>
        <p className="text-sm text-steel leading-relaxed max-w-3xl mb-6">
          Initialize the Telemetry SDK and begin tracking decision events in
          your system. The SDK batches events and transmits them to the
          configured endpoint.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-slate-50 border-b border-border px-5 py-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-charcoal">
              TypeScript
            </h3>
            <span className="text-xs text-muted font-mono">
              telemetry-init.ts
            </span>
          </div>
          <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
            <code>{`import { ARATelemetry } from '@araf/telemetry-sdk';

const telemetry = new ARATelemetry({
  systemId: 'ARA-2026-XXXXX',
  profile: 'standard',
  endpoint: 'https://capo.example.com/ingest',
});

telemetry.trackDecision({
  domain: 'decision-integrity',
  action: 'recommendation',
  confidence: 0.94,
  reasoning: 'Based on policy rules #14, #22',
});`}</code>
          </pre>
        </div>
      </section>
    </div>
  );
}
