'use client';

import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import type { ConsortiumMember } from '@/types';

function SectorBadge({ sector }: { sector: string }) {
  const cls =
    sector === 'Assessment'
      ? 'bg-charcoal text-white border-charcoal'
      : sector === 'Platform Vendor'
        ? 'bg-navy text-white border-navy'
        : sector === 'Monitoring'
          ? 'bg-slate-600 text-white border-slate-600'
          : sector === 'Insurance'
            ? 'bg-slate-100 text-steel border-slate-300'
            : 'bg-blue-50 text-navy border-blue-100';
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded border ${cls}`}
    >
      {sector}
    </span>
  );
}

function MemberCard({ member }: { member: ConsortiumMember }) {
  return (
    <div className="border border-border rounded-lg p-5 hover:border-border-dark transition-colors">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-sm font-semibold text-charcoal">{member.name}</h3>
        <SectorBadge sector={member.sector} />
      </div>
      <p className="text-xs text-muted font-mono">
        Joined {member.joinDate}
      </p>
    </div>
  );
}

function TierSection({
  title,
  description,
  members,
  badgeColor,
}: {
  title: string;
  description: string;
  members: ConsortiumMember[];
  badgeColor: string;
}) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-xl font-semibold text-charcoal">{title}</h2>
        <span
          className={`inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider rounded ${badgeColor}`}
        >
          {members.length} members
        </span>
      </div>
      <p className="text-sm text-steel leading-relaxed mb-6 max-w-2xl">
        {description}
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}

interface Props {
  foundingMembers: ConsortiumMember[];
  contributingMembers: ConsortiumMember[];
  observerMembers: ConsortiumMember[];
}

export function ConsortiumClient({
  foundingMembers,
  contributingMembers,
  observerMembers,
}: Props) {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Ecosystem', href: '/ecosystem' },
          { label: 'Consortium' },
        ]}
        className="mb-8"
      />

      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-charcoal mb-4">
          ARA Consortium
        </h1>
        <p className="text-base text-steel leading-relaxed max-w-3xl">
          Organizations contributing to the development and evolution of the ARA
          Standard through technical expertise, operational experience, and
          industry perspective. Consortium members participate in working groups,
          public comment processes, and governance elections.
        </p>
      </header>

      <TierSection
        title="Founding Members"
        description="Charter participants with permanent TSB nomination rights. Founding Members were instrumental in establishing the ARA Standard and governance framework."
        members={foundingMembers}
        badgeColor="bg-navy text-white"
      />

      <TierSection
        title="Contributing Members"
        description="Active participants with working group access. Contributing Members participate directly in standard development, domain working groups, and public comment review."
        members={contributingMembers}
        badgeColor="bg-charcoal text-white"
      />

      <TierSection
        title="Observer Members"
        description="Read-only access to development processes. Observer Members can attend working group sessions, review drafts, and submit public comments."
        members={observerMembers}
        badgeColor="bg-slate-200 text-steel"
      />

      {/* How to Join */}
      <section className="border border-border rounded-lg p-6 bg-slate-50 mb-12">
        <h2 className="text-lg font-semibold text-charcoal mb-3">
          Joining the ARA Consortium
        </h2>
        <div className="space-y-3 text-sm text-steel leading-relaxed max-w-3xl">
          <p>
            The ARA Consortium welcomes organizations from across the autonomous
            systems ecosystem. Membership is open to technology companies,
            research institutions, assessment firms, insurance providers, and
            civil society organizations.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mt-4">
            <div className="border border-border bg-white rounded-lg p-4">
              <h3 className="text-sm font-semibold text-charcoal mb-1">
                Observer Tier
              </h3>
              <p className="text-xs text-muted">
                Read-only access to working groups, draft reviews, and public
                comment submissions. Open to all organizations.
              </p>
            </div>
            <div className="border border-border bg-white rounded-lg p-4">
              <h3 className="text-sm font-semibold text-charcoal mb-1">
                Contributing Tier
              </h3>
              <p className="text-xs text-muted">
                Active participation in working groups, standard development, and
                governance elections. Requires demonstrated expertise.
              </p>
            </div>
            <div className="border border-border bg-white rounded-lg p-4">
              <h3 className="text-sm font-semibold text-charcoal mb-1">
                Founding Tier
              </h3>
              <p className="text-xs text-muted">
                Closed. Founding membership was established during ARA Standard
                initial development and is not currently accepting new members.
              </p>
            </div>
          </div>
          <p className="mt-4">
            To inquire about consortium membership, contact{' '}
            <span className="font-medium text-charcoal">
              consortium@araf.org
            </span>
            .
          </p>
        </div>
      </section>

      {/* Related Links */}
      <div className="border-t border-border pt-10">
        <h2 className="text-lg font-semibold text-charcoal mb-4">
          Related Documentation
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
          <Link
            href="/governance"
            className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
              Governance Framework
            </h3>
            <p className="text-xs text-muted">
              TSB structure, advisory bodies, and the standard development
              process.
            </p>
          </Link>
          <Link
            href="/ecosystem"
            className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
              Ecosystem Overview
            </h3>
            <p className="text-xs text-muted">
              All participant categories and how they work together.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
