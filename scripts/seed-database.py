#!/usr/bin/env python3
"""
ARA Standard v1.1 — Database Seeding Script
Loads extracted document data into Supabase tables.

Usage:
  python3 scripts/seed-database.py

Requires:
  - SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables
  - Or a .env.local file in the project root
"""

import json
import os
import re
import sys

# Try to load .env.local
env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env.local')
if os.path.exists(env_path):
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                key, value = line.split('=', 1)
                os.environ[key.strip()] = value.strip()

try:
    from supabase import create_client, Client
except ImportError:
    print("Installing supabase-py...")
    os.system(f"{sys.executable} -m pip install supabase")
    from supabase import create_client, Client

SUPABASE_URL = os.environ.get('NEXT_PUBLIC_SUPABASE_URL', '')
SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY', '')

if not SUPABASE_URL or not SUPABASE_KEY:
    print("ERROR: Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local")
    sys.exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

EXTRACTED_DIR = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    'Documents', '002', 'extracted'
)

def load_json(filename):
    filepath = os.path.join(EXTRACTED_DIR, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)


# ─── Seed Domains ────────────────────────────────────────────────────────────

def seed_domains():
    """Seed 15 domains from ACR data (domains are sheet names in ACR spreadsheet)."""
    acr_data = load_json('ARAF_ARA_ACR_2026_002_Master.json')

    # Map domain names from ACR sheets
    domain_map = {
        1: ("Autonomy Scope Definition", "Autonomy Scope", "Operational boundaries, enforcement, and testing of autonomous system scope"),
        2: ("Decision Integrity", "Decision Integrity", "Traceability, anti-fabrication, instruction hierarchy, and decision quality"),
        3: ("Tool and API Governance", "Tool & API Gov.", "Tool invocation controls, permission scope, and API validation"),
        4: ("Identity and Permission Containment", "Identity & Perms", "Session-scoped permissions, multi-tenancy, and least privilege"),
        5: ("Data Privacy and Information Protection", "Data Privacy", "AI data policies, PII detection, cross-customer isolation, IP protection"),
        6: ("Failure Mode Containment", "Failure Modes", "Anomaly detection, safe fallback states, and cascading prevention"),
        7: ("Behavioral Reliability Under Stress", "Behavioral Reliability", "Multi-turn coherence, context compression, and resource constraints"),
        8: ("Adversarial Robustness", "Adversarial Robust.", "Injection resistance, role confusion, and red team validation"),
        9: ("Drift Detection and Stability", "Drift Detection", "Output distribution monitoring, behavioral variance, and revalidation"),
        10: ("Monitoring and Telemetry", "Monitoring & Telem.", "Action logging, anomaly alerts, and tamper-evident data"),
        11: ("Escalation and Human Override", "Human Override", "Emergency halt, human override, and escalation pathways"),
        12: ("Auditability and Transparency", "Auditability", "Decision logs, audit replay, and compliance reporting"),
        13: ("Societal Impact and Responsible Deployment", "Societal Impact", "CBRN/cyber controls, content safety, bias monitoring, transparency"),
        14: ("Operational Governance Controls", "Op. Governance", "Change control, release governance, incident response"),
        15: ("Physical Actuation Integrity", "Physical Actuation", "Sensor validation, actuator monitoring, emergency stops, hardware safety"),
    }

    # Count ACRs per domain from the data
    domain_acr_counts = {}
    for sheet_name, rows in acr_data.items():
        if sheet_name in ('Document Control', 'Summary', 'Overview', 'Metadata'):
            continue
        # Try to extract domain number from sheet name or first row
        for row in rows:
            acr_id = row.get('ACR ID', '')
            if acr_id and re.match(r'ACR-\d+\.\d+', acr_id):
                domain_num = int(acr_id.split('-')[1].split('.')[0])
                domain_acr_counts[domain_num] = domain_acr_counts.get(domain_num, 0) + 1

    domains = []
    for domain_id, (title, short_title, summary) in domain_map.items():
        slug = title.lower().replace(' ', '-').replace('&', 'and')
        acr_count = domain_acr_counts.get(domain_id, 0)
        domains.append({
            'id': domain_id,
            'slug': slug,
            'title': title,
            'short_title': short_title,
            'summary': summary,
            'acr_count': acr_count if acr_count > 0 else {
                1: 27, 2: 32, 3: 28, 4: 22, 5: 24, 6: 28, 7: 32,
                8: 38, 9: 24, 10: 30, 11: 22, 12: 26, 13: 22, 14: 25, 15: 30
            }.get(domain_id, 0),
            'risk_dimension': '',
            'applicability': json.dumps({'L1': True, 'L2': True, 'L3': True}),
            'risk_rationale': '',
            'version_introduced': '1.0' if domain_id not in (5, 13) else '1.1',
            'sort_order': domain_id,
        })

    print(f"Seeding {len(domains)} domains...")
    supabase.table('domains').upsert(domains, on_conflict='id').execute()
    print(f"  ✓ {len(domains)} domains seeded")


# ─── Seed ACRs ───────────────────────────────────────────────────────────────

def seed_acrs():
    """Seed all 410 ACRs from extracted JSON."""
    acr_data = load_json('ARAF_ARA_ACR_2026_002_Master.json')

    acrs = []
    for sheet_name, rows in acr_data.items():
        for row in rows:
            acr_id = row.get('ACR ID', '').strip()
            if not acr_id or not re.match(r'ACR-\d+\.\d+', acr_id):
                continue

            domain_num = int(acr_id.split('-')[1].split('.')[0])

            # Parse profile applicability
            profile = row.get('Profile Applicability', '')

            # Parse platform cert eligible
            pce = row.get('Platform Cert Eligible', 'N')
            platform_eligible = pce.strip().upper() in ('Y', 'YES', 'TRUE')

            acrs.append({
                'id': acr_id,
                'domain_id': domain_num,
                'domain': row.get('Domain', ''),
                'requirement_statement': row.get('Requirement Statement', ''),
                'evaluation_method': row.get('Evaluation Method', ''),
                'evidence_type': row.get('Evidence Type', ''),
                'min_cert_level': int(row.get('Min Cert Level', '1') or '1'),
                'risk_weight': int(row.get('Risk Weight', '1') or '1'),
                'failure_consequence': row.get('Failure Consequence', 'A'),
                'cross_references': [],
                'profile_applicability': profile,
                'evidence_specification': row.get('Evidence Specification', ''),
                'risk_dimension': row.get('Risk Dimension', ''),
                'framework_crosswalk_refs': row.get('Framework Crosswalk Refs', ''),
                'evaluation_frequency': row.get('Evaluation Frequency', ''),
                'l1_evidence_standard': row.get('L1 Evidence Standard', ''),
                'l2_l3_evidence_standard': row.get('L2/L3 Evidence Standard', ''),
                'platform_cert_eligible': platform_eligible,
                'version_introduced': '1.1' if domain_num in (5, 13) else '1.0',
            })

    print(f"Seeding {len(acrs)} ACRs...")
    # Upsert in batches of 50
    for i in range(0, len(acrs), 50):
        batch = acrs[i:i+50]
        supabase.table('acrs').upsert(batch, on_conflict='id').execute()
    print(f"  ✓ {len(acrs)} ACRs seeded")


# ─── Seed Certification Levels ───────────────────────────────────────────────

def seed_certification_levels():
    levels = [
        {
            'level': 1,
            'name': 'Foundation',
            'evaluation_methods': 'Policy review, evidence inspection, limited automated testing',
            'timeline': '3-4 weeks (Express pathway available)',
            'red_team_required': False,
            'validity_months': 12,
            'reassessment': 'Annual',
            'applicable_profiles': ['F', 'S'],
            'domain_thresholds': json.dumps({}),
        },
        {
            'level': 2,
            'name': 'Operational',
            'evaluation_methods': 'L1 + automated testing + operational evidence + human simulation',
            'timeline': '6-10 weeks',
            'red_team_required': False,
            'validity_months': 12,
            'reassessment': 'Semi-annual re-test, annual re-certification',
            'applicable_profiles': ['S', 'A'],
            'domain_thresholds': json.dumps({}),
        },
        {
            'level': 3,
            'name': 'Comprehensive',
            'evaluation_methods': 'L2 + SDK integration + mandatory ARAF-approved red team + 30-day stress testing',
            'timeline': '8-12 weeks initial',
            'red_team_required': True,
            'validity_months': 12,
            'reassessment': 'Continuous monitoring + quarterly formal review',
            'applicable_profiles': ['A', 'C'],
            'domain_thresholds': json.dumps({}),
        },
    ]
    print(f"Seeding {len(levels)} certification levels...")
    supabase.table('certification_levels').upsert(levels, on_conflict='level').execute()
    print(f"  ✓ {len(levels)} certification levels seeded")


# ─── Seed Assurance Classes ──────────────────────────────────────────────────

def seed_assurance_classes():
    classes = [
        {
            'class': 'A',
            'name': 'Periodic',
            'monitoring_requirement': 'None (event-triggered revalidation only)',
            'cadence': 'Annual or biannual re-evaluation',
            'lapse_window': '30 calendar days',
            'use_cases': 'Low-autonomy, low-consequence, reversible actions, internal operational with human review',
            'capo_required': False,
        },
        {
            'class': 'B',
            'name': 'Monitored',
            'monitoring_requirement': 'Active CAPO connection, minimum monthly telemetry batch delivery',
            'cadence': 'Minimum monthly batch delivery, event-triggered revalidation',
            'lapse_window': '14 calendar days',
            'use_cases': 'Operational business systems, moderate autonomy, regulated domains without life-safety',
            'capo_required': True,
        },
        {
            'class': 'C',
            'name': 'Continuously Assured',
            'monitoring_requirement': 'Persistent real-time CAPO connection, SLA-bound alerting (5-min critical, 60-sec emergency)',
            'cadence': 'Continuous real-time stream',
            'lapse_window': '72 hours (life-safety: immediate suspension, no grace period)',
            'use_cases': 'High-autonomy, high-consequence, regulated, life-safety without exception, critical infrastructure',
            'capo_required': True,
        },
    ]
    print(f"Seeding {len(classes)} assurance classes...")
    supabase.table('assurance_classes').upsert(classes, on_conflict='class').execute()
    print(f"  ✓ {len(classes)} assurance classes seeded")


# ─── Seed System Profiles ───────────────────────────────────────────────────

def seed_system_profiles():
    profiles = [
        {
            'code': 'F',
            'name': 'Foundational',
            'acr_count': 97,
            'target_systems': 'Internal FAQ bots, MVP copilots, simple advisors',
            'characteristics': 'Text-only, internal use, no tool access, no sensitive data handling',
        },
        {
            'code': 'S',
            'name': 'Standard',
            'acr_count': 215,
            'target_systems': 'Enterprise workflow agents, customer service, content generation',
            'characteristics': 'Multi-turn, tool access, customer-facing, business data handling',
        },
        {
            'code': 'A',
            'name': 'Advanced',
            'acr_count': 368,
            'target_systems': 'Financial AI, healthcare AI, government AI',
            'characteristics': 'Multi-agent, multimodal, high-stakes decisions, regulated data',
        },
        {
            'code': 'C',
            'name': 'Comprehensive',
            'acr_count': 410,
            'target_systems': 'Autonomous vehicles, robotics, critical infrastructure',
            'characteristics': 'All capabilities, physical systems, CBRN-adjacent, critical infrastructure control',
        },
    ]
    print(f"Seeding {len(profiles)} system profiles...")
    supabase.table('system_profiles').upsert(profiles, on_conflict='code').execute()
    print(f"  ✓ {len(profiles)} system profiles seeded")


# ─── Seed Risk Factors ───────────────────────────────────────────────────────

def seed_risk_factors():
    factors = [
        {'id': 1, 'name': 'Degree of Autonomy', 'description': 'Extent of human oversight in system operation', 'examples': 'Fully autonomous vs. human-in-the-loop'},
        {'id': 2, 'name': 'Consequence Severity', 'description': 'Potential harm from system failures or errors', 'examples': 'Financial loss, physical injury, data breach'},
        {'id': 3, 'name': 'Reversibility', 'description': 'Can system actions be undone?', 'examples': 'Reversible data edits vs. irreversible physical actions'},
        {'id': 4, 'name': 'Breadth of Impact', 'description': 'How many people or systems are affected', 'examples': 'Single user vs. millions of customers'},
        {'id': 5, 'name': 'Regulatory Context', 'description': 'Is the system operating in a regulated domain?', 'examples': 'Healthcare, finance, critical infrastructure, aviation'},
        {'id': 6, 'name': 'Dependency Criticality', 'description': 'Do other autonomous systems depend on this one?', 'examples': 'Standalone agent vs. upstream data source for other agents'},
        {'id': 7, 'name': 'Operational Continuity', 'description': 'Is the system continuously active or discretely scheduled?', 'examples': '24/7 production vs. batch processing'},
    ]
    print(f"Seeding {len(factors)} risk factors...")
    supabase.table('risk_factors').upsert(factors, on_conflict='id').execute()
    print(f"  ✓ {len(factors)} risk factors seeded")


# ─── Seed CAPO SLAs ──────────────────────────────────────────────────────────

def seed_capo_slas():
    slas = [
        {'metric': 'Platform Availability', 'target': '99.9% monthly', 'class_applicability': ['B', 'C'], 'description': 'CAPO platform uptime SLA'},
        {'metric': 'Ingestion Latency', 'target': '<2 seconds (p99)', 'class_applicability': ['B', 'C'], 'description': 'Telemetry data ingestion latency'},
        {'metric': 'Compliance Check (Critical)', 'target': '<5 seconds', 'class_applicability': ['C'], 'description': 'Time to evaluate critical compliance events'},
        {'metric': 'Compliance Check (Standard)', 'target': '<60 seconds', 'class_applicability': ['B', 'C'], 'description': 'Time to evaluate standard compliance events'},
        {'metric': 'Alert Delivery', 'target': '<30 seconds', 'class_applicability': ['C'], 'description': 'Time from detection to alert delivery'},
        {'metric': 'Standard Update Deployment', 'target': '<24 hours', 'class_applicability': ['B', 'C'], 'description': 'Time to deploy standard version updates'},
        {'metric': 'Data Retention (Telemetry)', 'target': '13 months minimum', 'class_applicability': ['B', 'C'], 'description': 'Minimum telemetry data retention period'},
        {'metric': 'Data Retention (Audit Trail)', 'target': '7 years minimum', 'class_applicability': ['B', 'C'], 'description': 'Minimum audit trail retention period'},
        {'metric': 'Insurance Feed Availability', 'target': '99.9% monthly', 'class_applicability': ['B', 'C'], 'description': 'Availability of data feeds to insurer partners'},
        {'metric': 'Interoperability Export', 'target': '<48 hours', 'class_applicability': ['B', 'C'], 'description': 'Time to export data for CAPO portability'},
    ]
    print(f"Seeding {len(slas)} CAPO SLAs...")
    supabase.table('capo_slas').insert(slas).execute()
    print(f"  ✓ {len(slas)} CAPO SLAs seeded")


# ─── Seed Glossary ───────────────────────────────────────────────────────────

def seed_glossary():
    terms = [
        {'term': 'Autonomous System', 'definition': 'A software system, agent, multi-agent system, or physical system that executes actions, makes decisions, or interacts with external tools, data, or environments with a degree of independence from direct human instruction.', 'related_terms': ['Agent', 'Multi-Agent System'], 'version_introduced': '1.0'},
        {'term': 'Agent', 'definition': 'A software entity that perceives its environment and takes actions autonomously to achieve goals. In the ARA context, includes LLM-based agents, rule-based agents, and hybrid systems.', 'related_terms': ['Autonomous System', 'Multi-Agent System'], 'version_introduced': '1.0'},
        {'term': 'ACR', 'definition': 'Autonomous Control Requirement. A specific, testable requirement within the ARA Standard that certified systems must satisfy.', 'related_terms': ['Domain', 'Evaluation Method'], 'version_introduced': '1.0'},
        {'term': 'Domain', 'definition': 'A thematic grouping of related ACRs addressing a specific area of autonomous system reliability.', 'related_terms': ['ACR', 'Enterprise Risk Dimension'], 'version_introduced': '1.0'},
        {'term': 'AVB', 'definition': 'Authorized Validation Body. An organization accredited by ARAF to conduct ARA certification evaluations.', 'related_terms': ['ARAF', 'Evaluation'], 'version_introduced': '1.0'},
        {'term': 'ARAF', 'definition': 'Autonomous Reliability Assurance Foundation. The governing body that maintains the ARA Standard, accredits AVBs and CAPOs, and oversees the certification ecosystem.', 'related_terms': ['AVB', 'CAPO', 'TSB'], 'version_introduced': '1.0'},
        {'term': 'Blocking ACR', 'definition': 'An ACR classified as Blocking requires a minimum compliance score; failure results in automatic certification denial regardless of aggregate domain score.', 'related_terms': ['ACR', 'Conditional ACR'], 'version_introduced': '1.0'},
        {'term': 'Conditional ACR', 'definition': 'An ACR that contributes to domain scoring but does not independently prevent certification.', 'related_terms': ['ACR', 'Blocking ACR'], 'version_introduced': '1.0'},
        # v1.1 new terms
        {'term': 'Assurance Class', 'definition': 'The second axis of an ARA Deployment Certification. Describes the intensity of ongoing monitoring required to maintain certification in good standing. Class A (Periodic), Class B (Monitored), Class C (Continuously Assured). Determined by Risk Classification, not self-selected.', 'related_terms': ['Evaluation Level', 'Risk Classification', 'Deployment Certification'], 'version_introduced': '1.1'},
        {'term': 'Assurance Lapse', 'definition': 'State where a Deployment Certification\'s CAPO monitoring falls below the required frequency for its Assurance Class. Triggers a class-dependent remediation window; if unresolved, results in Suspension or Expiry.', 'related_terms': ['Assurance Class', 'CAPO'], 'version_introduced': '1.1'},
        {'term': 'Certification Inheritance', 'definition': 'Mechanism by which a Deployment Certification built on a Platform-Certified product carries forward the platform\'s ACR coverage, reducing the scope of the deployment-level evaluation to configuration-dependent and deployment-context ACRs only.', 'related_terms': ['Platform Certification', 'Deployment Certification'], 'version_introduced': '1.1'},
        {'term': 'Platform Certification', 'definition': 'ARA certification issued to a software platform, product, or autonomous system technology evaluated in a controlled Reference Environment. Certifies the technology as a product, independent of any specific production deployment. Issued to the technology vendor. Expressed as Evaluation Level only (no Assurance Class). Enables Certification Inheritance.', 'related_terms': ['Deployment Certification', 'Reference Environment', 'Certification Inheritance'], 'version_introduced': '1.1'},
        {'term': 'Deployment Certification', 'definition': 'ARA certification issued to a specific production instance of an autonomous system operated by an identified organization. Covers the full operational context including configuration, integrations, data environment, and use cases. Issued to the deploying organization. Expressed as Evaluation Level AND Assurance Class.', 'related_terms': ['Platform Certification', 'Assurance Class', 'Evaluation Level'], 'version_introduced': '1.1'},
        {'term': 'Reference Environment', 'definition': 'Controlled deployment environment used for Platform Certification evaluation. Must meet ARAF minimum conditions for ACR evaluation fidelity. Documented and attested by the evaluating AVB as representative of production-equivalent behavior.', 'related_terms': ['Platform Certification', 'AVB'], 'version_introduced': '1.1'},
        {'term': 'Risk Classification', 'definition': 'Formal assessment conducted by an accredited AVB determining the required Assurance Class for a Deployment Certification. Based on seven factors: degree of autonomy, consequence severity, reversibility, breadth of impact, regulatory context, dependency criticality, and operational continuity. Documented in a Risk Classification Report. Appealable to the TSB.', 'related_terms': ['Assurance Class', 'AVB', 'TSB'], 'version_introduced': '1.1'},
        {'term': 'Certified Technology Partner', 'definition': 'A consulting or implementation firm listed in the ARAF CTP Registry as having demonstrated ARA implementation competency. Not a certification — a registry designation. Does not confer evaluation authority or certification rights.', 'related_terms': ['ARAF'], 'version_introduced': '1.1'},
        {'term': 'CAPO', 'definition': 'Continuous Assurance Platform Operator. An ARAF-accredited technology company operating a monitoring platform that ingests telemetry from certified systems, runs real-time compliance checks, triggers revalidation alerts, and provides risk signals to AVBs and insurers. The infrastructure layer making persistent certification state possible.', 'related_terms': ['Assurance Class', 'ARAF', 'Telemetry'], 'version_introduced': '1.1'},
        {'term': 'Recognized Insurer Partner', 'definition': 'An insurance company or syndicate formally recognized by ARAF as qualified to underwrite autonomous system operational risk using ARA certification data and CAPO telemetry feeds.', 'related_terms': ['ARAF', 'CAPO'], 'version_introduced': '1.1'},
        {'term': 'Evaluation Level', 'definition': 'The first axis of an ARA certification. Describes the rigor of the evaluation performed. Level 1 Foundation, Level 2 Operational, Level 3 Comprehensive. Applies to both Platform and Deployment Certifications.', 'related_terms': ['Assurance Class', 'Certification Level'], 'version_introduced': '1.1'},
        {'term': 'System Profile', 'definition': 'A capability-based classification determining which ACRs apply to a given autonomous system. Four profiles: Foundational (97 ACRs), Standard (215), Advanced (368), Comprehensive (410).', 'related_terms': ['ACR', 'Statement of Applicability'], 'version_introduced': '1.1'},
        {'term': 'Statement of Applicability', 'definition': 'A mandatory document addressing all 410 ACRs with inclusion or exclusion justification for the system under evaluation. Required for all certification applications.', 'related_terms': ['ACR', 'System Profile'], 'version_introduced': '1.1'},
        {'term': 'TSB', 'definition': 'Technical Standards Board. The ultimate technical authority for the ARA Standard, responsible for standard development, interpretation, and dispute resolution.', 'related_terms': ['ARAF', 'Governance'], 'version_introduced': '1.0'},
    ]
    print(f"Seeding {len(terms)} glossary terms...")
    supabase.table('glossary').upsert(terms, on_conflict='term').execute()
    print(f"  ✓ {len(terms)} glossary terms seeded")


# ─── Seed Sample Registry Entries ────────────────────────────────────────────

def seed_registry():
    """Seed sample registry entries demonstrating v1.1 two-axis model."""
    entries = [
        {
            'certification_id': 'ARA-2026-00142',
            'organization': 'Meridian Robotics',
            'system_name': 'Warehouse Orchestrator v4.2',
            'category': 'Physical',
            'certification_type': 'deployment',
            'certification_level': 3,
            'assurance_class': 'C',
            'version_certified_under': '1.1',
            'issue_date': '2026-01-15',
            'expiry_date': '2027-01-15',
            'monitoring_status': 'Compliant',
            'certification_status': 'Active',
            'scope_statement': 'Autonomous warehouse robot fleet orchestration including navigation, pick-and-place, and inter-robot coordination in multi-shift industrial environments.',
            'industry': 'Logistics & Warehousing',
            'capo_id': 'CAPO-001',
            'insurance_status': 'Insured',
            'revocation_history': json.dumps([]),
        },
        {
            'certification_id': 'ARA-2026-00187',
            'organization': 'Sentinel Financial',
            'system_name': 'Trade Executor Pro',
            'category': 'Agent',
            'certification_type': 'deployment',
            'certification_level': 3,
            'assurance_class': 'C',
            'version_certified_under': '1.1',
            'issue_date': '2026-02-01',
            'expiry_date': '2027-02-01',
            'monitoring_status': 'Compliant',
            'certification_status': 'Active',
            'scope_statement': 'Autonomous algorithmic trading system executing high-frequency trades across equity and derivatives markets with full decision authority within regulatory limits.',
            'industry': 'Financial Services',
            'capo_id': 'CAPO-002',
            'insurance_status': 'Insured',
            'revocation_history': json.dumps([]),
        },
        {
            'certification_id': 'ARA-2026-00203',
            'organization': 'Arcline Health',
            'system_name': 'ClinicalPath Advisor',
            'category': 'Agent',
            'certification_type': 'deployment',
            'certification_level': 1,
            'assurance_class': 'A',
            'version_certified_under': '1.1',
            'issue_date': '2026-02-15',
            'expiry_date': '2027-02-15',
            'monitoring_status': 'Compliant',
            'certification_status': 'Active',
            'scope_statement': 'Clinical decision support agent providing treatment pathway recommendations to physicians. Human physician retains all decision authority.',
            'industry': 'Healthcare',
            'insurance_status': 'Insured',
            'revocation_history': json.dumps([]),
        },
        {
            'certification_id': 'ARA-2026-00251',
            'organization': 'Greystone Energy',
            'system_name': 'GridSense Load Balancer',
            'category': 'Hybrid',
            'certification_type': 'deployment',
            'certification_level': 3,
            'assurance_class': 'C',
            'version_certified_under': '1.1',
            'issue_date': '2026-01-20',
            'expiry_date': '2027-01-20',
            'monitoring_status': 'Compliant',
            'certification_status': 'Active',
            'scope_statement': 'Autonomous power grid load balancing system managing real-time distribution across regional grid segments with predictive demand modeling.',
            'industry': 'Energy & Utilities',
            'capo_id': 'CAPO-001',
            'insurance_status': 'Insured',
            'revocation_history': json.dumps([]),
        },
        {
            'certification_id': 'ARA-2026-00289',
            'organization': 'NovaCraft Supply',
            'system_name': 'SupplyChain Copilot',
            'category': 'Agent',
            'certification_type': 'deployment',
            'certification_level': 2,
            'assurance_class': 'B',
            'version_certified_under': '1.1',
            'issue_date': '2026-03-01',
            'expiry_date': '2027-03-01',
            'monitoring_status': 'Warning',
            'certification_status': 'Active',
            'scope_statement': 'Multi-agent supply chain optimization system managing inventory, logistics routing, and vendor coordination across 12 distribution centers.',
            'industry': 'Supply Chain & Logistics',
            'capo_id': 'CAPO-003',
            'insurance_status': 'Insured',
            'revocation_history': json.dumps([]),
        },
        {
            'certification_id': 'ARA-2026-00312',
            'organization': 'Clearpoint Legal',
            'system_name': 'DocReview Analyst',
            'category': 'Agent',
            'certification_type': 'deployment',
            'certification_level': 1,
            'assurance_class': 'A',
            'version_certified_under': '1.1',
            'issue_date': '2026-02-10',
            'expiry_date': '2027-02-10',
            'monitoring_status': 'Compliant',
            'certification_status': 'Active',
            'scope_statement': 'Document review and analysis agent for legal discovery, operating under attorney supervision with all outputs requiring human review before use.',
            'industry': 'Legal Services',
            'revocation_history': json.dumps([]),
        },
        {
            'certification_id': 'ARA-2026-00345',
            'organization': 'AeroVect Aviation',
            'system_name': 'TarmacOps Handler',
            'category': 'Physical',
            'certification_type': 'deployment',
            'certification_level': 3,
            'assurance_class': 'C',
            'version_certified_under': '1.1',
            'issue_date': '2026-01-25',
            'expiry_date': '2027-01-25',
            'monitoring_status': 'Compliant',
            'certification_status': 'Active',
            'scope_statement': 'Autonomous ground handling vehicle fleet for airport tarmac operations including baggage transport, pushback, and de-icing coordination.',
            'industry': 'Aviation',
            'capo_id': 'CAPO-002',
            'insurance_status': 'Insured',
            'revocation_history': json.dumps([]),
        },
        {
            'certification_id': 'ARA-2026-00378',
            'organization': 'Tessera Communications',
            'system_name': 'ServiceAgent Multi-Channel',
            'category': 'Multi-Agent',
            'certification_type': 'deployment',
            'certification_level': 2,
            'assurance_class': 'B',
            'version_certified_under': '1.1',
            'issue_date': '2026-02-20',
            'expiry_date': '2027-02-20',
            'monitoring_status': 'Compliant',
            'certification_status': 'Active',
            'scope_statement': 'Multi-channel customer service agent system handling voice, chat, and email interactions with autonomous resolution authority for standard requests.',
            'industry': 'Telecommunications',
            'capo_id': 'CAPO-003',
            'insurance_status': 'Insured',
            'revocation_history': json.dumps([]),
        },
        # Platform certification examples
        {
            'certification_id': 'ARA-PLT-2026-00010',
            'organization': 'VertexAI Systems',
            'system_name': 'AgentForge Platform',
            'category': 'Agent',
            'certification_type': 'platform',
            'certification_level': 2,
            'assurance_class': None,
            'version_certified_under': '1.1',
            'issue_date': '2026-02-01',
            'expiry_date': '2027-02-01',
            'monitoring_status': 'Compliant',
            'certification_status': 'Active',
            'scope_statement': 'Enterprise agent development platform providing pre-built agent frameworks, tool integration layer, and monitoring infrastructure. Platform certification covers 180 ACRs in reference environment.',
            'industry': 'Technology',
            'revocation_history': json.dumps([]),
        },
        {
            'certification_id': 'ARA-PLT-2026-00015',
            'organization': 'RoboCore Industries',
            'system_name': 'AutonomyOS',
            'category': 'Physical',
            'certification_type': 'platform',
            'certification_level': 3,
            'assurance_class': None,
            'version_certified_under': '1.1',
            'issue_date': '2026-01-10',
            'expiry_date': '2027-01-10',
            'monitoring_status': 'Compliant',
            'certification_status': 'Active',
            'scope_statement': 'Real-time operating system for autonomous robots with built-in safety controllers, sensor fusion, and actuator management. Platform certification covers 320 ACRs including Domain 15.',
            'industry': 'Robotics & Manufacturing',
            'revocation_history': json.dumps([]),
        },
    ]
    print(f"Seeding {len(entries)} registry entries...")
    supabase.table('registry_entries').upsert(entries, on_conflict='certification_id').execute()
    print(f"  ✓ {len(entries)} registry entries seeded")


# ─── Seed Ecosystem Directories ──────────────────────────────────────────────

def seed_ecosystem():
    avbs = [
        {'id': 'AVB-001', 'name': 'Kestrel Assurance Group', 'authorization_level': 'Full', 'regions': ['North America', 'Europe'], 'specializations': ['Financial Systems', 'Multi-Agent', 'Physical Systems'], 'status': 'Active', 'contact_url': 'https://kestrelassurance.example.com'},
        {'id': 'AVB-002', 'name': 'Apex Validation Partners', 'authorization_level': 'Enhanced', 'regions': ['North America', 'Asia Pacific'], 'specializations': ['Healthcare AI', 'Agent Systems'], 'status': 'Active', 'contact_url': 'https://apexvalidation.example.com'},
        {'id': 'AVB-003', 'name': 'Nordic Standards Institute', 'authorization_level': 'Full', 'regions': ['Europe', 'Middle East'], 'specializations': ['Critical Infrastructure', 'Energy', 'Robotics'], 'status': 'Active', 'contact_url': 'https://nordicstandards.example.com'},
        {'id': 'AVB-004', 'name': 'Pacific Rim Certification', 'authorization_level': 'Basic', 'regions': ['Asia Pacific'], 'specializations': ['Enterprise AI', 'Customer Service'], 'status': 'Active', 'contact_url': 'https://pacrimcert.example.com'},
        {'id': 'AVB-005', 'name': 'Veridian Compliance Labs', 'authorization_level': 'Enhanced', 'regions': ['North America'], 'specializations': ['Legal AI', 'Document Processing', 'Voice AI'], 'status': 'Active', 'contact_url': 'https://veridianlab.example.com'},
    ]

    capos = [
        {'id': 'CAPO-001', 'name': 'Sentinel Assurance Platform', 'classes_served': ['B', 'C'], 'regions': ['Global'], 'status': 'Active', 'capabilities': 'Full real-time monitoring, insurance feeds, multi-tenant, 99.95% SLA'},
        {'id': 'CAPO-002', 'name': 'TrustGrid Monitoring', 'classes_served': ['B', 'C'], 'regions': ['North America', 'Europe'], 'status': 'Active', 'capabilities': 'Real-time and batch monitoring, regulatory reporting, automated alerting'},
        {'id': 'CAPO-003', 'name': 'AssureConnect', 'classes_served': ['B'], 'regions': ['North America', 'Asia Pacific'], 'status': 'Active', 'capabilities': 'Batch monitoring, telemetry aggregation, compliance dashboards'},
    ]

    insurers = [
        {'id': 'INS-001', 'name': 'Meridian Underwriters', 'coverage_types': ['Professional Indemnity', 'Cyber Liability', 'Operational Error'], 'regions': ['North America', 'Europe'], 'ara_partner_since': '2026-01'},
        {'id': 'INS-002', 'name': 'Pacific Shield Insurance', 'coverage_types': ['General Liability', 'Product Liability', 'Cyber Liability'], 'regions': ['Asia Pacific', 'North America'], 'ara_partner_since': '2026-02'},
        {'id': 'INS-003', 'name': 'Continental Risk Partners', 'coverage_types': ['Professional Indemnity', 'E&O', 'General Liability'], 'regions': ['Europe', 'Middle East'], 'ara_partner_since': '2026-01'},
    ]

    print("Seeding ecosystem directories...")
    supabase.table('avb_directory').upsert(avbs, on_conflict='id').execute()
    print(f"  ✓ {len(avbs)} AVBs seeded")
    supabase.table('capo_directory').upsert(capos, on_conflict='id').execute()
    print(f"  ✓ {len(capos)} CAPOs seeded")
    supabase.table('insurer_directory').upsert(insurers, on_conflict='id').execute()
    print(f"  ✓ {len(insurers)} insurers seeded")


# ─── Seed Regulatory Frameworks ──────────────────────────────────────────────

def seed_regulatory_frameworks():
    frameworks = [
        {'id': 'nist-800-53', 'name': 'NIST SP 800-53', 'edition': 'Rev. 5', 'acrs_mapped': 157, 'coverage_pct': 44.6, 'unique_requirements': 39, 'status': 'PRIMARY', 'description': 'Security and Privacy Controls for Information Systems and Organizations'},
        {'id': 'nist-ai-rmf', 'name': 'NIST AI RMF', 'edition': 'AI 100-1 (2023)', 'acrs_mapped': 166, 'coverage_pct': 41.8, 'unique_requirements': 17, 'status': 'PRIMARY', 'description': 'AI Risk Management Framework'},
        {'id': 'cosai', 'name': 'CoSAI', 'edition': 'July 2024', 'acrs_mapped': 64, 'coverage_pct': 16.1, 'unique_requirements': 12, 'status': 'PRIMARY', 'description': 'Coalition for Secure AI'},
        {'id': 'iso-42005', 'name': 'ISO/IEC 42005', 'edition': '2025', 'acrs_mapped': 58, 'coverage_pct': 14.6, 'unique_requirements': 18, 'status': 'PRIMARY', 'description': 'AI System Impact Assessment'},
        {'id': 'iec-61508', 'name': 'IEC 61508', 'edition': 'Current', 'acrs_mapped': 48, 'coverage_pct': 13.6, 'unique_requirements': 3, 'status': 'PRIMARY', 'description': 'Functional Safety of Electrical/Electronic/Programmable Safety-related Systems'},
        {'id': 'owasp-llm', 'name': 'OWASP LLM Top 10', 'edition': '2025', 'acrs_mapped': 47, 'coverage_pct': 13.4, 'unique_requirements': 5, 'status': 'PRIMARY', 'description': 'Top 10 Security Risks for Large Language Model Applications'},
        {'id': 'iso-27001', 'name': 'ISO/IEC 27001', 'edition': '2022', 'acrs_mapped': 45, 'coverage_pct': 12.8, 'unique_requirements': 17, 'status': 'PRIMARY', 'description': 'Information Security Management Systems'},
        {'id': 'iso-42006', 'name': 'ISO/IEC 42006', 'edition': '2025', 'acrs_mapped': 40, 'coverage_pct': 10.1, 'unique_requirements': 14, 'status': 'PRIMARY', 'description': 'Requirements for Bodies Providing Audit and Certification of AI Management Systems'},
        {'id': 'eu-ai-act', 'name': 'EU AI Act', 'edition': '2024', 'acrs_mapped': 32, 'coverage_pct': 9.1, 'unique_requirements': 6, 'status': 'PRIMARY', 'description': 'European Union Artificial Intelligence Act'},
        {'id': 'iso-42001', 'name': 'ISO/IEC 42001', 'edition': '2023', 'acrs_mapped': 23, 'coverage_pct': 6.5, 'unique_requirements': 5, 'status': 'PRIMARY', 'description': 'AI Management System'},
        {'id': 'csa-aicm', 'name': 'CSA AICM', 'edition': 'Current', 'acrs_mapped': 23, 'coverage_pct': 5.8, 'unique_requirements': 23, 'status': 'PRIMARY', 'description': 'Cloud Security Alliance AI Controls Matrix'},
        {'id': 'mitre-atlas', 'name': 'MITRE ATLAS', 'edition': 'Current', 'acrs_mapped': 18, 'coverage_pct': 4.5, 'unique_requirements': 10, 'status': 'PRIMARY', 'description': 'Adversarial Threat Landscape for AI Systems'},
        {'id': 'iec-62443', 'name': 'IEC 62443', 'edition': 'Current', 'acrs_mapped': 3, 'coverage_pct': 0.9, 'unique_requirements': 1, 'status': 'PRIMARY', 'description': 'Industrial Communication Networks - Network and System Security'},
        {'id': 'soc-2', 'name': 'SOC 2', 'edition': 'Type II', 'acrs_mapped': 0, 'coverage_pct': 0, 'unique_requirements': 0, 'status': 'REFERENCE', 'description': 'System and Organization Controls 2'},
    ]
    print(f"Seeding {len(frameworks)} regulatory frameworks...")
    supabase.table('regulatory_frameworks').upsert(frameworks, on_conflict='id').execute()
    print(f"  ✓ {len(frameworks)} regulatory frameworks seeded")


# ─── Main ────────────────────────────────────────────────────────────────────

def main():
    print("=" * 60)
    print("ARA Standard v1.1 — Database Seeding")
    print("=" * 60)
    print(f"Supabase URL: {SUPABASE_URL}")
    print(f"Extracted data: {EXTRACTED_DIR}")
    print()

    # Order matters due to foreign key constraints
    seed_domains()
    seed_acrs()
    seed_certification_levels()
    seed_assurance_classes()
    seed_system_profiles()
    seed_risk_factors()
    seed_capo_slas()
    seed_glossary()
    seed_registry()
    seed_ecosystem()
    seed_regulatory_frameworks()

    print()
    print("=" * 60)
    print("Seeding complete!")
    print("=" * 60)


if __name__ == '__main__':
    main()
