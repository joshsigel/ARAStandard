-- ARA Standard v1.1 — Supabase Database Schema
-- Run this in the Supabase SQL Editor to create all tables

-- ─── Domains ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS domains (
  id integer PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  short_title text NOT NULL,
  summary text NOT NULL DEFAULT '',
  acr_count integer NOT NULL DEFAULT 0,
  risk_dimension text NOT NULL DEFAULT '',
  applicability jsonb NOT NULL DEFAULT '{"L1": true, "L2": true, "L3": true}',
  risk_rationale text NOT NULL DEFAULT '',
  version_introduced text NOT NULL DEFAULT '1.0',
  sort_order integer NOT NULL DEFAULT 0
);

-- ─── ACRs ───────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS acrs (
  id text PRIMARY KEY, -- e.g. "ACR-1.01"
  domain_id integer NOT NULL REFERENCES domains(id),
  domain text NOT NULL DEFAULT '',
  requirement_statement text NOT NULL DEFAULT '',
  evaluation_method text NOT NULL DEFAULT '',
  evidence_type text NOT NULL DEFAULT '',
  min_cert_level integer NOT NULL DEFAULT 1,
  risk_weight integer NOT NULL DEFAULT 1,
  failure_consequence text NOT NULL DEFAULT 'A',
  cross_references text[] DEFAULT '{}',
  profile_applicability text NOT NULL DEFAULT '',
  evidence_specification text NOT NULL DEFAULT '',
  risk_dimension text NOT NULL DEFAULT '',
  framework_crosswalk_refs text NOT NULL DEFAULT '',
  evaluation_frequency text NOT NULL DEFAULT '',
  l1_evidence_standard text NOT NULL DEFAULT '',
  l2_l3_evidence_standard text NOT NULL DEFAULT '',
  platform_cert_eligible boolean NOT NULL DEFAULT false,
  version_introduced text NOT NULL DEFAULT '1.0'
);

CREATE INDEX IF NOT EXISTS idx_acrs_domain_id ON acrs(domain_id);
CREATE INDEX IF NOT EXISTS idx_acrs_min_cert_level ON acrs(min_cert_level);
CREATE INDEX IF NOT EXISTS idx_acrs_profile ON acrs(profile_applicability);
CREATE INDEX IF NOT EXISTS idx_acrs_platform_cert ON acrs(platform_cert_eligible);

-- ─── Certification Levels ───────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS certification_levels (
  level integer PRIMARY KEY,
  name text NOT NULL,
  evaluation_methods text NOT NULL DEFAULT '',
  timeline text NOT NULL DEFAULT '',
  red_team_required boolean NOT NULL DEFAULT false,
  validity_months integer NOT NULL DEFAULT 12,
  reassessment text NOT NULL DEFAULT '',
  applicable_profiles text[] DEFAULT '{}',
  domain_thresholds jsonb NOT NULL DEFAULT '{}'
);

-- ─── Assurance Classes ──────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS assurance_classes (
  class text PRIMARY KEY, -- A, B, C
  name text NOT NULL,
  monitoring_requirement text NOT NULL DEFAULT '',
  cadence text NOT NULL DEFAULT '',
  lapse_window text NOT NULL DEFAULT '',
  use_cases text NOT NULL DEFAULT '',
  capo_required boolean NOT NULL DEFAULT false
);

-- ─── System Profiles ────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS system_profiles (
  code text PRIMARY KEY, -- F, S, A, C
  name text NOT NULL,
  acr_count integer NOT NULL DEFAULT 0,
  target_systems text NOT NULL DEFAULT '',
  characteristics text NOT NULL DEFAULT ''
);

-- ─── Registry Entries ───────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS registry_entries (
  certification_id text PRIMARY KEY,
  organization text NOT NULL,
  system_name text NOT NULL,
  category text NOT NULL DEFAULT 'Agent',
  certification_type text NOT NULL DEFAULT 'deployment',
  certification_level integer NOT NULL DEFAULT 1,
  assurance_class text, -- null for platform certs
  version_certified_under text NOT NULL DEFAULT '1.1',
  issue_date date NOT NULL,
  expiry_date date NOT NULL,
  monitoring_status text NOT NULL DEFAULT 'Pending',
  certification_status text NOT NULL DEFAULT 'Active',
  scope_statement text NOT NULL DEFAULT '',
  industry text NOT NULL DEFAULT '',
  capo_id text,
  platform_cert_id text,
  insurance_status text,
  revocation_history jsonb DEFAULT '[]'
);

CREATE INDEX IF NOT EXISTS idx_registry_level ON registry_entries(certification_level);
CREATE INDEX IF NOT EXISTS idx_registry_class ON registry_entries(assurance_class);
CREATE INDEX IF NOT EXISTS idx_registry_type ON registry_entries(certification_type);
CREATE INDEX IF NOT EXISTS idx_registry_status ON registry_entries(certification_status);
CREATE INDEX IF NOT EXISTS idx_registry_industry ON registry_entries(industry);

-- ─── Platform Certifications ────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS platform_certifications (
  certification_id text PRIMARY KEY,
  vendor text NOT NULL,
  platform_name text NOT NULL,
  platform_version text NOT NULL DEFAULT '',
  certification_level integer NOT NULL DEFAULT 1,
  acr_coverage text[] DEFAULT '{}',
  issue_date date NOT NULL,
  expiry_date date NOT NULL,
  certification_status text NOT NULL DEFAULT 'Active',
  reference_environment text NOT NULL DEFAULT '',
  inheritable_acr_count integer NOT NULL DEFAULT 0
);

-- ─── AVB Directory ──────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS avb_directory (
  id text PRIMARY KEY,
  name text NOT NULL,
  authorization_level text NOT NULL DEFAULT 'Basic',
  regions text[] DEFAULT '{}',
  specializations text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'Active',
  contact_url text NOT NULL DEFAULT ''
);

-- ─── CAPO Directory ─────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS capo_directory (
  id text PRIMARY KEY,
  name text NOT NULL,
  classes_served text[] DEFAULT '{}',
  regions text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'Active',
  capabilities text NOT NULL DEFAULT ''
);

-- ─── Insurer Directory ──────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS insurer_directory (
  id text PRIMARY KEY,
  name text NOT NULL,
  coverage_types text[] DEFAULT '{}',
  regions text[] DEFAULT '{}',
  ara_partner_since text NOT NULL DEFAULT ''
);

-- ─── Consortium Members ─────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS consortium_members (
  id text PRIMARY KEY,
  name text NOT NULL,
  role text NOT NULL DEFAULT 'Observer',
  sector text NOT NULL DEFAULT '',
  join_date text NOT NULL DEFAULT ''
);

-- ─── Regulatory Frameworks ──────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS regulatory_frameworks (
  id text PRIMARY KEY,
  name text NOT NULL,
  edition text NOT NULL DEFAULT '',
  acrs_mapped integer NOT NULL DEFAULT 0,
  coverage_pct numeric NOT NULL DEFAULT 0,
  unique_requirements integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT ''
);

-- ─── Regulatory Mappings ────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS regulatory_mappings (
  id serial PRIMARY KEY,
  acr_id text NOT NULL REFERENCES acrs(id),
  framework_id text NOT NULL REFERENCES regulatory_frameworks(id),
  framework_requirement_id text NOT NULL DEFAULT '',
  mapping_type text NOT NULL DEFAULT 'direct',
  platform_cert_sufficient text NOT NULL DEFAULT 'N'
);

CREATE INDEX IF NOT EXISTS idx_reg_mappings_acr ON regulatory_mappings(acr_id);
CREATE INDEX IF NOT EXISTS idx_reg_mappings_fw ON regulatory_mappings(framework_id);

-- ─── Glossary ───────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS glossary (
  term text PRIMARY KEY,
  definition text NOT NULL,
  related_terms text[] DEFAULT '{}',
  version_introduced text NOT NULL DEFAULT '1.0'
);

-- ─── Risk Factors ───────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS risk_factors (
  id integer PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  examples text NOT NULL DEFAULT ''
);

-- ─── CAPO SLAs ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS capo_slas (
  id serial PRIMARY KEY,
  metric text NOT NULL,
  target text NOT NULL,
  class_applicability text[] DEFAULT '{}',
  description text NOT NULL DEFAULT ''
);

-- ─── Row Level Security ─────────────────────────────────────────────────────
-- All tables are publicly readable (this is a public standards platform)

ALTER TABLE domains ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read domains" ON domains FOR SELECT USING (true);

ALTER TABLE acrs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read acrs" ON acrs FOR SELECT USING (true);

ALTER TABLE certification_levels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read certification_levels" ON certification_levels FOR SELECT USING (true);

ALTER TABLE assurance_classes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read assurance_classes" ON assurance_classes FOR SELECT USING (true);

ALTER TABLE system_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read system_profiles" ON system_profiles FOR SELECT USING (true);

ALTER TABLE registry_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read registry_entries" ON registry_entries FOR SELECT USING (true);

ALTER TABLE platform_certifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read platform_certifications" ON platform_certifications FOR SELECT USING (true);

ALTER TABLE avb_directory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read avb_directory" ON avb_directory FOR SELECT USING (true);

ALTER TABLE capo_directory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read capo_directory" ON capo_directory FOR SELECT USING (true);

ALTER TABLE insurer_directory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read insurer_directory" ON insurer_directory FOR SELECT USING (true);

ALTER TABLE consortium_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read consortium_members" ON consortium_members FOR SELECT USING (true);

ALTER TABLE regulatory_frameworks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read regulatory_frameworks" ON regulatory_frameworks FOR SELECT USING (true);

ALTER TABLE regulatory_mappings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read regulatory_mappings" ON regulatory_mappings FOR SELECT USING (true);

ALTER TABLE glossary ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read glossary" ON glossary FOR SELECT USING (true);

ALTER TABLE risk_factors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read risk_factors" ON risk_factors FOR SELECT USING (true);

ALTER TABLE capo_slas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read capo_slas" ON capo_slas FOR SELECT USING (true);
