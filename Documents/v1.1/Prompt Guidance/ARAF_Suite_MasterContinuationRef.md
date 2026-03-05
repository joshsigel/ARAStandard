# ARAF ARA Standard Suite — Master Continuation Reference
## v2.0 — Sessions 4, 5, 6

| Field | Value |
|---|---|
| Document | ARAF Suite Master Continuation Reference |
| Version | v2.0 — Supersedes Session 4 Continuation Reference (prior draft) |
| Created | March 4, 2026 |
| Architecture Status | LOCKED — All decisions in Section 7 are confirmed. Do not re-open. |
| Suite Target | v1.1 in-place update. All changes are v1.1, not a v1.2 bump. |
| ACR Target | 398 existing ACRs + 12 new ACRs (Platform Cert & Two-Axis Model) = 410 total |
| Sessions Required | Sessions 4, 5, 6 — structured below |
| This Document | Upload at the start of EVERY session (4, 5, 6). Single source of truth. |

> ⚠ **WHAT CHANGED FROM SESSION 4 REF v1.0:** Retiring M1–M4 monitoring tier model. Retiring 'Level 3 Continuous Assurance' nomenclature. Implementing Two-Axis Certification (Evaluation Level × Assurance Class). Implementing Platform Certification pathway. Adding 12 new ACRs. Removing GOV Art. 7.5 and replacing with Foreword acknowledgment.

---

## 1. Why This Architecture

Every durable global standard separates three things that are genuinely different: the evaluation (what was assessed, by whom, against what criteria), the certification (the formal status that results), and the assurance maintenance (the ongoing obligation that keeps the certification valid). ISO 27001, ISO 13485, Common Criteria, and CMMI all make this separation explicit. They do so because these three things have different owners, different cadences, and different failure modes. Collapsing them produces a standard that is either unenforceable or over-specified.

The ARA Standard v1.1 as drafted conflates evaluation rigor with monitoring intensity. "Level 3 Continuous Assurance" names a monitoring modality, not an evaluation level. A system evaluated with high rigor may need only periodic monitoring. A system needing 24/7 monitoring may have been evaluated at a foundational level. These are orthogonal dimensions, not a single spectrum.

The two-axis model resolves this correctly and is the architecture that a serious standards body would build. It is also commercially superior: vendors can certify platforms pre-deployment, customers add an Assurance Class appropriate to their risk profile, and the CAPO layer becomes essential infrastructure rather than an optional add-on.

> The added complexity is in the specification, not in the credential. The market sees a badge that reads "Level 2 / Class C." The standards community sees a framework that is technically defensible at a global level.

---

## 2. The Two-Axis Model — Locked Architecture

Every ARA certification is defined by two independent dimensions.

### AXIS 1 — EVALUATION LEVEL
What was assessed and with what rigor. Applies to both Platform Certifications and Deployment Certifications.

- **Level 1 Foundation** — Core ACR coverage against the applicable system profile. Documentation and self-attestation evidence accepted. Lower-autonomy systems.
- **Level 2 Operational** — Full ACR coverage for the applicable profile. Evidence-based evaluation with independent validation. Production-context or reference-environment evaluation.
- **Level 3 Comprehensive** — Full ACR coverage plus adversarial testing, independent evidence validation, and supply chain review. Required for high-consequence deployments. (Previously named "Level 3 Continuous Assurance" — renamed globally.)

### AXIS 2 — ASSURANCE CLASS
How the certification is maintained over time. Applies to Deployment Certifications only. Determined by Risk Classification. Not applicable to Platform Certifications.

- **Class A — Periodic** — Annual or biannual re-evaluation. No continuous CAPO monitoring required. Event-triggered revalidation only. Low-autonomy, low-consequence deployments.
- **Class B — Monitored** — Active CAPO connection required. Minimum monthly telemetry batch delivery. Event-triggered revalidation. Most operational business systems.
- **Class C — Continuously Assured** — Persistent CAPO connection required. Real-time telemetry stream. SLA-bound alerting. Required for high-autonomy, high-consequence, or regulated deployments. Life-safety systems are Class C without exception.

### Certification Expression Examples

| Certification Expression | What It Means | Example System |
|---|---|---|
| ARA Deployment Certified Level 1 / Class A | Foundational evaluation; periodic re-assessment only | Internal scheduling agent, low-stakes recommendation tool |
| ARA Deployment Certified Level 2 / Class B | Full operational evaluation; monthly CAPO telemetry; event-triggered revalidation | Customer-facing support agent, logistics optimization system |
| ARA Deployment Certified Level 2 / Class C | Full operational evaluation; persistent CAPO monitoring; real-time alerting | Financial services agent, high-volume autonomous procurement |
| ARA Deployment Certified Level 3 / Class C | Comprehensive evaluation incl. adversarial testing; 24/7 persistent monitoring | Clinical decision AI, autonomous vehicle fleet, critical infrastructure agent |
| ARA Platform Certified Level 2 | Full operational evaluation in reference environment; no Assurance Class | Agentic platform vendor, robotics product — pre-deployment certification |

---

## 3. Platform Certification

Platform Certification is an Evaluation Level designation without an Assurance Class. There is no live deployment to monitor, so Assurance Class does not apply. A Platform Cert says: "This technology was evaluated at this level of rigor in a controlled reference environment." When a customer deploys, the Deployment Certification inherits the platform's ACR coverage and adds an Assurance Class based on their operational risk profile.

### 3.1 Who Can Obtain Platform Certification

| Entity Type | Platform Cert Eligible? | Notes |
|---|---|---|
| Agentic platform vendor (sells AI agent products) | Yes — primary use case | Key commercial differentiator; enables pre-deployment certification |
| Autonomous system product company (robotics, vehicles) | Yes | Product-level cert before fleet or customer deployment |
| Foundation model provider (autonomous use cases) | Yes — scoped | Scoped to autonomous use cases only |
| Enterprise self-build (internal agents) | No — Deployment Cert instead | No distributable product; goes directly to Deployment Cert |
| Consulting / implementation firm | No — client gets Deployment Cert | See Section 3.4 for Certified Technology Partner designation |
| CAPO | No — separate accreditation | CAPO accreditation is GOV Art. 4 process |

### 3.2 Reference Environment Requirements

- Platform deployed in functional state capable of executing all in-scope ACRs
- Full infrastructure, configuration, model version, and dependency versions documented
- Simulated or synthetic telemetry acceptable; AVB specifies minimum fidelity requirements per new ACR-1.25 through ACR-1.27
- Vendor maintains reference environment documentation as a condition of certification validity
- Material platform changes (new model version, architectural change) trigger re-evaluation per ACR-1.27

### 3.3 Certification Inheritance at Deployment

| ACR Category | Inheritance | Customer Obligation at Deployment Cert |
|---|---|---|
| Platform-evaluated ACRs (config matches reference env) | Inherited — no re-evaluation | Confirm configuration matches Platform Cert reference environment; AVB attests |
| Configuration-dependent ACRs | Partial — delta evaluation only | AVB evaluates configuration delta against Platform Cert baseline |
| Deployment-context ACRs (data flows, integrations, ops environment) | Not inherited — full evaluation | Outside platform scope by definition; full evaluation required |
| ACR gaps (standard updated since Platform Cert) | Not inherited — gap analysis required | Vendor and customer jointly responsible; AVB identifies and evaluates gaps |

### 3.4 Certified Technology Partner (CTP) Registry

Consulting and implementation firms that help clients achieve ARA certification are not eligible for Platform or Deployment Certification. The appropriate designation is Certified Technology Partner (CTP): a lightweight registry entry, not a certification.

> ⚠ **DEFERRED — CTP REGISTRY:** Registry build deferred to post-adoption. GOV Art. 10.4 added as placeholder in Session 4.

**GOV ART. 10.4 PLACEHOLDER TEXT (use verbatim in Session 4):**

> 10.4 Certified Technology Partner (CTP) Registry
>
> The ARAF CTP Registry recognizes consulting and implementation organizations that demonstrate competency in supporting ARA certification engagements. CTP status is a registry designation, not a certification, and does not confer evaluation authority or certification rights.
>
> Requirements for CTP designation: (a) Demonstrated history of at least three successful ARA certification engagements as a supporting consultant or integrator; (b) At least two staff members who have completed ARAF-recognized ARA implementation training; (c) Signed adherence to the ARAF Code of Conduct and confidentiality requirements; (d) Annual renewal with continued engagement history.
>
> The CTP registry will be publicly accessible through the ARAF website. ARAF will establish the registry operationally following the adoption of the ARA Standard v1.1. Organizations meeting the requirements above may express interest through the ARAF Ecosystem Development Office for priority registration upon launch.

---

## 4. Risk Classification — Assurance Class Assignment

Risk Classification is conducted by the accredited AVB as part of Deployment Certification. It determines the required Assurance Class and is documented in the evaluation report. Certified organizations may appeal to the ARAF Technical Standards Board.

### 4.1 Classification Factors

| Factor | Description |
|---|---|
| Degree of Autonomy | Extent to which the system makes and executes decisions without human review, approval, or override. Primary factor — high autonomy alone can drive Class C requirement. |
| Consequence Severity | Potential harm to people, organizations, or critical systems if the system behaves incorrectly. Primary factor — life-safety consequences require Class C. |
| Reversibility | Whether actions taken by the system can be undone within an operationally meaningful timeframe. High weight — irreversible actions elevate class requirement. |
| Breadth of Impact | Number of people, systems, or transactions affected by a single autonomous decision. |
| Regulatory Context | Whether the system operates in a regulated domain (healthcare, finance, critical infrastructure, aviation). Regulated domains require Class B minimum; safety-critical regulated domains require Class C. |
| Dependency Criticality | Whether other autonomous systems or agents depend on this system's outputs as inputs to their own decisions. Upstream dependency amplifies failure consequence. |
| Operational Continuity | Whether the system operates continuously (24/7) vs. discretely (batch, scheduled, on-demand). Continuous operation elevates monitoring frequency within class. |

### 4.2 Class Assignment Rules

| Condition | Minimum Assurance Class |
|---|---|
| Life-safety consequences possible (clinical AI, autonomous vehicles, safety-critical robotics) | Class C — no exceptions |
| Financial system with systemic exposure (high-frequency trading, payment infrastructure) | Class C — no exceptions |
| Critical infrastructure control (power, water, communications) | Class C — no exceptions |
| Regulated domain without life-safety exposure | Class B minimum |
| High-autonomy system (minimal human oversight) in any domain | Class B minimum; AVB may require Class C based on consequence severity |
| Multi-agent orchestration system (directs or coordinates other autonomous agents) | Class B minimum; Class C if any downstream agent is Class C-eligible |
| Customer-facing agent with human escalation path and reversible actions | Class A or B depending on volume and consequence |
| Internal operational agent with human review of outputs | Class A eligible |

> ⚠ **RISK CLASSIFICATION RUBRIC — v1.1 OPERATING POSTURE:** Full scoring rubric deferred to v1.2 companion guide. STD v1.1 establishes framework and class assignment rules above as normative. AVBs apply good-faith professional judgment documented in evaluation report. Acknowledged in STD Summary of Changes and locked decisions table (Section 7).

---

## 5. Level 3 Rename — "Continuous Assurance" → "Comprehensive"

| Old Name | New Name | Rationale |
|---|---|---|
| Level 1 Foundation | Level 1 Foundation | No change |
| Level 2 Operational | Level 2 Operational | No change |
| Level 3 Continuous Assurance | Level 3 Comprehensive | "Continuous Assurance" is now Assurance Class C. "Comprehensive" correctly describes the evaluation rigor. |

> 🔒 **LOCKED — GLOBAL FIND-AND-REPLACE — EXECUTE AS FIRST STEP IN EVERY SESSION:**
>
> Search string: "Level 3 Continuous Assurance"  
> Replace with: "Level 3 Comprehensive"
>
> Also replace: "Level 3 --- Continuous Assurance" (heading variant)  
> Also replace: "Level 3: Continuous Assurance" (table cell variant)
>
> **Document-by-document instance count (verified):**
> - STD: 2 instances (Doc Control table; Part IV heading)
> - SDK: 5 instances (rate limit table; gRPC requirement; auth requirements table; bidirectional streaming requirement; differential privacy note)
> - PHY: 1 instance (Domain 15 ACR coverage table)
> - AVB: 1 instance (AVB Level 3 authorization scope column)
> - GOV, EVL, TMK: 0 instances — confirm only
>
> **Also update:** STD Doc Control table field "Certification Levels: 3 (Foundation, Operational, Continuous Assurance)" → "3 (Foundation, Operational, Comprehensive)"
>
> **Verification:** Session 4 covers STD, GOV, EVL. Session 5 covers SDK, AVB, TMK. Session 6 = full-suite final verification.

---

## 6. Certification Status States

| Status | Meaning | Registry Display |
|---|---|---|
| Active | Certification current; Assurance Class maintained | Active — [Level] / [Class] |
| Active — Assurance Lapsed | Cert valid but CAPO monitoring below required Class frequency. Remediation window active. | Active (Assurance Lapsed) — [deadline] |
| Under Revalidation | Revalidation triggered; AVB evaluation in progress | Under Revalidation — [deadline] |
| Suspended | Cert suspended; system may not claim certified status | Suspended — [reason] |
| Expired | Renewal window missed or lapse remediation window exhausted | Expired — [date] |
| Revoked | Permanently withdrawn | Revoked — [date] |

### Lapse Windows by Class

| Assurance Class | Lapse Trigger | Remediation Window | Post-Window Action |
|---|---|---|---|
| Class A — Periodic | Missed re-evaluation window by >30 days | 60 days to complete re-evaluation | Expired |
| Class B — Monitored | 2 consecutive months without telemetry batch | 30 days to restore CAPO connection | Suspended |
| Class C — Continuously Assured | Any telemetry gap >24 hours (non-maintenance); or SLA breach on material alert | 72 hours to restore; 7 days for SLA remediation plan | Suspended. Life-safety: immediate suspension, no grace period. |

---

## 7. All Architecture Decisions — Locked

Do not re-open any of these in Sessions 4, 5, or 6.

| Decision | Resolution |
|---|---|
| Two-axis model vs. single-spectrum levels | LOCKED: Two-axis (Evaluation Level × Assurance Class). Consistent with ISO 27001, ISO 13485, Common Criteria. |
| Level 3 name | LOCKED: Level 3 Comprehensive. "Continuous Assurance" retired — now describes Assurance Class C. |
| Platform Certification structure | LOCKED: Evaluation Level only, no Assurance Class. No live deployment = no monitoring obligation. |
| Every Deployment Cert carries an Assurance Class | LOCKED: Yes. Risk Classification is mandatory. A deployment without an Assurance Class assignment is not certifiable. |
| Deployment Cert available without Platform Cert | LOCKED: Yes — fully standalone. Platform Cert reduces Deployment Cert scope via inheritance where it exists. |
| Risk Classification authority | LOCKED: Accredited AVB. Documented in evaluation report. Appeals to ARAF TSB. |
| Risk Classification framework scope in v1.1 | LOCKED: Framework and class assignment rules in v1.1. Detailed scoring rubric deferred to v1.2 companion guide. |
| Assurance lapse: automatic suspension | LOCKED: Class-dependent. Class C life-safety = immediate suspension. Class B = 30-day window. Class A = 60-day window. |
| Consulting firm designation | LOCKED: CTP registry. Deferred to post-adoption. GOV Art. 10.4 placeholder added Session 4. |
| GOV Art. 7.5 (Xlogix named governance rights) | LOCKED: Remove Art. 7.5. Replace with Foreword acknowledgment in GOV and STD. See Section 9. |
| New ACRs for Platform Cert and Two-Axis Model | LOCKED: 12 new ACRs added to v1.1. See Section 11. Total: 398 → 410. |
| ACR Platform Cert Eligible column | LOCKED: Added to ACR xlsx in Session 5. Y/N/Partial per criteria in Section 10.1. |

---

## 8. Locked Definitions — Use Verbatim Across All Documents

| Term | Definition |
|---|---|
| Platform Certification | An ARA certification issued to a software platform, product, or autonomous system technology evaluated in a controlled reference environment against applicable ACRs. Certifies the technology as a product independent of any specific production deployment. Expressed as an Evaluation Level only (no Assurance Class). Issued to the technology vendor. |
| Deployment Certification | An ARA certification issued to a specific production instance of an autonomous system operated by an identified organization. Covers the full operational context including configuration, integrations, data environment, and use cases. Expressed as an Evaluation Level and an Assurance Class. Issued to the deploying organization. |
| Evaluation Level | The first axis of an ARA certification. Describes the rigor of the evaluation conducted by an accredited AVB: Level 1 Foundation, Level 2 Operational, or Level 3 Comprehensive. Applies to both Platform Certifications and Deployment Certifications. |
| Assurance Class | The second axis of an ARA Deployment Certification. Describes the intensity of ongoing monitoring required to maintain the certification in good standing: Class A Periodic, Class B Monitored, or Class C Continuously Assured. Determined by Risk Classification. Not applicable to Platform Certifications. |
| Risk Classification | A formal assessment conducted by an accredited AVB as part of Deployment Certification that determines the required Assurance Class. Based on degree of autonomy, consequence severity, reversibility, breadth of impact, regulatory context, dependency criticality, and operational continuity. Documented in the evaluation report. Appealable to the ARAF TSB. |
| Class A — Periodic | Assurance Class requiring annual or biannual re-evaluation. No continuous CAPO monitoring required. Event-triggered revalidation only. Applicable to low-autonomy, low-consequence, reversible deployments. |
| Class B — Monitored | Assurance Class requiring an active CAPO connection and minimum monthly telemetry batch delivery. Event-triggered revalidation. Applicable to operational business systems with moderate autonomy or consequence. |
| Class C — Continuously Assured | Assurance Class requiring a persistent CAPO connection, real-time telemetry stream, and SLA-bound alerting. Required for high-autonomy, high-consequence, or regulated deployments. Life-safety systems are Class C without exception. |
| Certification Inheritance | The mechanism by which a Deployment Certification built on a Platform-Certified product carries forward the platform's ACR coverage, reducing the scope of deployment-level evaluation to configuration-dependent and deployment-context ACRs. |
| Reference Environment | A controlled deployment environment used for Platform Certification evaluation. Must meet ARAF minimum conditions for ACR evaluation fidelity. Documented and attested by the evaluating AVB as representative of production-equivalent behavior. |
| Assurance Lapse | The state in which a Deployment Certification's CAPO monitoring has fallen below the frequency required by its Assurance Class. Triggers a class-dependent remediation window; if unresolved, results in Suspension or Expiry. |
| Certified Technology Partner (CTP) | A consulting or implementation firm listed in the ARAF CTP Registry as having demonstrated ARA implementation competency. Not a certification — a registry designation. Does not confer evaluation authority or certification rights. |

---

## 9. GOV Article 7.5 — Removal and Foreword Replacement

### 9.1 GOV Foreword — Add This Paragraph (verbatim)

> The ARAF ARA Standard Suite was initiated and developed by Josh Sigel (Founder & CEO, Xlogix Inc.) and the Xlogix technical team. Xlogix Inc. holds Originating Technical Contributor status in recognition of its foundational role in authoring the ARA Standard framework, the CAPO ecosystem architecture, and the Behavioral Telemetry SDK specification. Originating Technical Contributor status is a permanent acknowledgment of founding contribution and does not confer governance rights, veto authority, or preferential accreditation standing. Xlogix Inc. participates in the ARAF ecosystem as an applicant CAPO and technology contributor under the same terms as all ecosystem participants.

### 9.2 STD Foreword — Add Abbreviated Version (verbatim)

> The ARA Standard was developed by Josh Sigel and the Xlogix Inc. technical team as the Originating Technical Contributor to the Autonomous Reliability Assurance Foundation. ARAF acknowledges this founding contribution in accordance with its Technical Contributor recognition policy (ARAF-ARA-GOV-2026-001).

### 9.3 GOV Article 7.5 — Remove Entirely

Delete Article 7.5 ("First Founding Member"). Renumber subsequent articles if any.

> ⚠ **CRITICAL — GREP SCOPE:**  
> Sweep all **seven** Word documents (GOV, STD, EVL, AVB, SDK, TMK, PHY) for cross-references to "GOV Article 7.5."  
>
> **DO NOT flag:**
> - SDK Art. 7.5 (Privacy-Preserving Telemetry Modes) — independent article, not a cross-reference
> - TMK Art. 6.7.5 (Insurance Badge in Tokenized Badges) — sub-article of TMK Art. 6.7
>
> **Search strings targeting GOV cross-references only:** "GOV Art. 7.5", "GOV Article 7.5", "Governance Guide, Article 7.5", "GOV-2026-001, Art. 7.5"

---

## 10. Multi-Session Execution Plan

### SESSION 4 — Architecture Core — GOV, STD, EVL

**UPLOAD AT SESSION START:**
- ARAF_Suite_MasterContinuationRef.md (this file)
- ARAF_ARA_GOV_2026_001_final.docx
- ARA_Standard_v1_1_final.docx
- ARAF_ARA_EVL_2026_002_final.docx

**STEP 0 — ALL DOCS** — Level 3 rename across all three docs. See Section 5 instance counts. Also update STD Doc Control field. Verify zero surviving certification-level usages before proceeding.

**STEP 1 — GOV** — Remove Art. 7.5. Renumber if needed. Grep for GOV Art. 7.5 cross-references (not SDK 7.5, not TMK 6.7.5).

**STEP 2 — GOV** — Add Foreword acknowledgment (verbatim from Section 9.1).

**STEP 3 — GOV** — Add Art. 3.5: Platform Certification Pathway. Content: eligibility table (Section 3.1), reference environment requirements (Section 3.2), certification inheritance table (Section 3.3).

**STEP 4 — GOV** — Update Art. 4 CAPO SLA requirements: add Assurance Class-differentiated SLAs. Class A: no continuous monitoring SLA. Class B: monthly telemetry batch, 48-hour reconnection SLA on lapse. Class C: real-time stream, 24-hour gap = suspension trigger, 72-hour restore SLA.

**STEP 5 — GOV** — Update Art. 6 Certification Pathway: add Platform Certification pathway steps. Add Risk Classification as mandatory step in Deployment Cert pathway (between AVB Evaluation and Certification Recommendation).

**STEP 6 — GOV** — Add Art. 10.4 CTP placeholder (verbatim from Section 3.4).

**STEP 7 — GOV** — Update Glossary: add all 12 locked definitions from Section 8.

**STEP 8 — STD** — Add Art. 6 (Certification Subjects): Platform vs. Deployment Certification distinction. Who can obtain each. Cert expression format.

**STEP 9 — STD** — Add Art. 7 (Two-Axis Certification Model): full Evaluation Level × Assurance Class framework. Both axis definitions. Certification expression examples table.

**STEP 10 — STD** — Add Art. 8 (Risk Classification): framework statement, classification factors table (Section 4.1), class assignment rules table (Section 4.2). Note rubric deferred to v1.2.

**STEP 11 — STD** — Update Art. 9 (existing cert levels): rename Level 3, align to new naming. Add note that Assurance Class is set separately via Risk Classification.

**STEP 12 — STD** — Update Glossary: add all 12 locked definitions. Update "Certification Level" definition. Disambiguate "Continuous Assurance" concept vs. Class C.

**STEP 13 — STD** — Add Foreword acknowledgment (abbreviated, verbatim from Section 9.2).

**STEP 14 — STD** — Update Summary of Changes: add two-axis model, Platform Certification, Level 3 rename, 12 new ACRs, GOV Art. 7.5 removal.

**STEP 15 — EVL** — Add Art. 3.6 (Platform Certification Evaluation Procedures): scope determination, reference environment validation, simulated telemetry acceptance, inheritance documentation.

**STEP 16 — EVL** — Add Art. 3.7 (Reference Environment Requirements): minimum fidelity standards, AVB attestation requirements, environment documentation.

**STEP 17 — EVL** — Add Appendix B (Reference Environment Specification Template).

**STEP 18 — EVL** — Update Art. 5 evidence categories: add Platform Cert evidence type (Reference Environment Attestation). Note simulated/synthetic telemetry acceptability for Platform Cert.

**STEP 19 — EVL** — Update Glossary: add all 12 locked definitions.

**STEP 20 — EVL** — Update Art. 4.2 Evidence Sufficiency Matrix column header: "Level 3: Continuous Assurance" → "Level 3: Comprehensive".

**STEP 21 — ALL** — Final sweep: verify Level 3 rename complete in all 3 docs. Verify no GOV Art. 7.5 cross-references. Pack all three docs as _session4 suffix (.docx + .md pairs).

---

### SESSION 5 — Companion Documents — AVB, SDK, TMK, ACR xlsx

**UPLOAD AT SESSION START:**
- ARAF_Suite_MasterContinuationRef.md (this file)
- ARAF_ARA_GOV_session4.md
- ARAF_ARA_STD_session4.md
- ARAF_ARA_EVL_session4.md
- ARAF_ARA_AVB_2026_002_final.docx
- ARAF_ARA_SDK_2026_002_final.docx
- ARAF_ARA_TMK_2026_002_final.docx
- ARAF_ARA_ACR_2026_002_final.xlsx

**STEP 0 — ALL DOCS** — Verify Level 3 rename in Session 4 outputs. Apply to AVB (1 instance), SDK (5 instances), TMK (0 instances — confirm only).

**STEP 1 — AVB** — Add Art. 13 (Platform Certification Competencies): reference environment assessment, simulated telemetry evaluation, inheritance documentation review.

**STEP 2 — AVB** — Update Art. 2.1 authorization level table: rename Level 3 column. Add Platform Cert evaluation capability noted at Level 2 and Level 3.

**STEP 3 — AVB** — Update Art. 12.3 (Revalidation Triggers): add Assurance Class escalation as revalidation trigger. Add Class lapse triggers AVB revalidation obligation.

**STEP 4 — AVB** — Update Glossary: add all 12 locked definitions.

**STEP 5 — SDK** — Update Art. 1.2 scope: distinguish SDK role in Platform Cert reference environments (optional; simulated telemetry acceptable) vs. Deployment Cert (required for Class B and C; optional for Class A).

**STEP 6 — SDK** — Update Art. 6.6 insurance data feed: add Assurance Class and Risk Classification fields. Note Platform Certs do not generate insurance feed signals.

**STEP 7 — SDK** — Update rate limit table and gRPC requirement: apply Level 3 rename.

**STEP 8 — SDK** — Update Glossary: add all 12 locked definitions.

**STEP 9 — TMK** — Add Platform Certification mark anatomy: "ARA Platform Certified — Level [X]". Must clearly distinguish from Deployment Certification mark. No Assurance Class element in Platform Cert mark.

**STEP 10 — TMK** — Add Platform Cert mark usage rules: eligible users (technology vendors), prohibited claims, recommended phrasing.

**STEP 11 — TMK** — Update Art. 4.4 (Level 3 Product Naming): rename to Level 3 Comprehensive.

**STEP 12 — TMK** — Update Art. 6.7 insurance badge: note Deployment Certs only; Platform Certs not eligible.

**STEP 13 — TMK** — Update Glossary: add all 12 locked definitions.

**STEP 14 — ACR xlsx** — Add 12 new ACRs from Section 11 to ACR Master Matrix and respective domain tabs. Update Summary tab count: 398 → 410.

**STEP 15 — ACR xlsx** — Add "Platform Cert Eligible" column. Apply Y/N/Partial classification per Section 10.1 criteria. Scripted approach required.

**STEP 16 — ACR xlsx** — Verify new ACRs in Scoping Matrix with correct Profile Applicability flags.

**STEP 17 — ALL** — Pack all four docs as _session5 suffix (.docx + .md pairs). Update ACR xlsx Summary tab.

---

### 10.1 ACR Platform Cert Eligible Column — Classification Criteria

| Value | Criteria | Examples |
|---|---|---|
| Y — Yes | ACR fully evaluable in reference environment using simulated or synthetic inputs. Does not require live production users, real data flows, or production integrations. | Boundary enforcement, adversarial robustness, decision traceability, tool governance, drift detection configuration, emergency halt testing, most governance and auditability ACRs |
| N — No | ACR requires live production deployment by definition. Cannot be evaluated in reference environment regardless of simulation quality. | Cross-org data flow ACRs, production incident response verification, live user consent management, real-time CAPO Class B/C monitoring continuity ACRs |
| P — Partial | Can be partially evaluated in reference environment; flagged for delta validation at Deployment Cert. | PII detection ACRs (synthetic PII testable; real production data adds coverage), fairness/bias ACRs (constructed test cases; real user distribution differs), some Domain 14 governance ACRs |

---

### SESSION 6 — Final QA — PHY, REG, Suite Sweep, Adoption Prep

**UPLOAD AT SESSION START:**
- ARAF_Suite_MasterContinuationRef.md (this file)
- All 9 session 5 output documents (.md versions for Word docs, xlsx for spreadsheets)

**STEP 0 — ALL DOCS** — Final verification: zero surviving "Level 3 Continuous Assurance" certification-level usages across all 9 documents.

**STEP 1 — PHY** — Update Art. 1 scope: most Domain 15 physical ACRs require physical deployment. Add: "Domain 15 ACRs are eligible for Platform Cert only where a physical reference environment (hardware-in-the-loop testbed) satisfies ARAF Reference Environment requirements. Virtual simulation alone is insufficient for Domain 15 ACRs with Failure Consequence A or B."

**STEP 2 — PHY** — Update Section 5 level-by-level requirements: rename Level 3 column to Level 3 Comprehensive.

**STEP 3 — PHY** — Update Glossary: add all 12 locked definitions.

**STEP 4 — REG xlsx** — Add column "Platform Cert Sufficient for Regulatory Compliance?" (Y/N/Partial) to Master Crosswalk. Flag ACRs where Platform Cert alone is insufficient for regulatory compliance (EU AI Act, FDA SaMD, ISO 13485).

**STEP 5 — REG xlsx** — Add notation in EU AI Act and ISO 42001 tabs: ARA Deployment Cert with Assurance Class maps to framework's ongoing monitoring requirements.

**STEP 6 — ALL 9 DOCS — Full suite sweep:**
- (a) Level 3 rename — zero "Level 3 Continuous Assurance" certification-level usages
- (b) GOV Art. 7.5 — removed; no cross-references remain (GOV-scoped only)
- (c) Document Control — all 9 docs show Pre-Adoption Draft status, March 2026 dates
- (d) ACR count — STD Doc Control shows 410 total ACRs
- (e) New ACRs — all 12 appear in ACR xlsx with correct domain, ID, and Platform Cert Eligible flag

**STEP 7 — ALL 9 DOCS** — Validate all documents. Zero validation errors required.

**STEP 8 — CONTINUATION REF** — Mark suite as "Committee-Ready for Adoption Vote."

---

## 11. New ACRs — Platform Certification and Two-Axis Model

**Total new ACRs: 12. Updated total: 398 → 410.**

Domain count updates: D1: 24→27 | D10: 26→30 | D12: 24→26 | D14: 22→25

### 11.1 Reference Environment ACRs — Domain 1 (Autonomy Scope Definition)

| Proposed ACR ID | Requirement Statement | Eval Method | Min Level | Fail Consequence | Profile | Platform Cert Eligible |
|---|---|---|---|---|---|---|
| ACR-1.25 | For systems seeking Platform Certification, the vendor SHALL maintain a documented Reference Environment Specification (RES) describing infrastructure, configuration, model version, dependency versions, simulated input distributions, and known deviations from production conditions. | EI | 1 | A | F,S,A,C | Y |
| ACR-1.26 | The evaluating AVB SHALL attest in writing that the Reference Environment is representative of production-equivalent behavior for all in-scope ACRs, with documented justification for any identified deviations. | EI+TP | 2 | A | S,A,C | Y |
| ACR-1.27 | Material changes to the platform (new model version, architectural change, dependency version change) SHALL trigger re-evaluation of affected ACRs. The vendor SHALL define and document the threshold for "material change" prior to Platform Certification. | EI+OP | 1 | B | F,S,A,C | Y |

### 11.2 Risk Classification ACRs — Domain 12 (Auditability and Transparency)

| Proposed ACR ID | Requirement Statement | Eval Method | Min Level | Fail Consequence | Profile | Platform Cert Eligible |
|---|---|---|---|---|---|---|
| ACR-12.25 | The AVB SHALL produce a documented Risk Classification Report as part of every Deployment Certification evaluation. The report SHALL address all seven classification factors, state the resulting Assurance Class, and provide justification for the determination. | EI+TP | 1 | A | S,A,C | N |
| ACR-12.26 | The Risk Classification Report SHALL be delivered to the deploying organization and to ARAF as part of the certification evidence package. The organization SHALL sign acknowledgment of the assigned Assurance Class before certification is granted. | EI+OP | 1 | A | S,A,C | N |

### 11.3 Assurance Class Maintenance ACRs — Domain 10 (Monitoring and Telemetry)

| Proposed ACR ID | Requirement Statement | Eval Method | Min Level | Fail Consequence | Profile | Platform Cert Eligible |
|---|---|---|---|---|---|---|
| ACR-10.27 | Systems certified at Assurance Class B (Monitored) SHALL maintain an active CAPO connection and deliver telemetry batches at minimum monthly frequency. A gap of two consecutive months without telemetry batch delivery SHALL be automatically flagged by the CAPO as an Assurance Lapse condition. | CM+AT | 2 | A | S,A,C | N |
| ACR-10.28 | Systems certified at Assurance Class C (Continuously Assured) SHALL maintain a persistent, real-time CAPO telemetry connection. Any telemetry gap exceeding 24 hours (excluding documented scheduled maintenance windows of up to 4 hours, maximum twice per month) SHALL be automatically flagged by the CAPO as an Assurance Lapse condition triggering the 72-hour remediation window. | CM+AT | 2 | A | A,C | N |
| ACR-10.29 | The CAPO SHALL deliver SLA-bound alerting for Assurance Class C systems: Critical-severity compliance events SHALL generate alerts within 5 minutes of detection; Emergency-severity events SHALL generate alerts within 60 seconds. Failure to meet these SLAs for material events constitutes an Assurance Lapse condition. | CM+AT | 3 | A | A,C | N |

### 11.4 Certification Inheritance ACRs — Domain 14 (Operational Governance)

| Proposed ACR ID | Requirement Statement | Eval Method | Min Level | Fail Consequence | Profile | Platform Cert Eligible |
|---|---|---|---|---|---|---|
| ACR-14.23 | Where a Deployment Certification claims Certification Inheritance from a Platform-Certified product, the deploying organization SHALL document the configuration match between the deployment and the Platform Cert reference environment. The AVB SHALL verify this match and attest to it in the Deployment Cert evaluation report. | EI+OP | 1 | A | S,A,C | P |
| ACR-14.24 | The deploying organization SHALL notify the platform vendor and ARAF within 14 days of any deployment-side configuration change that affects inherited ACR coverage. Changes that invalidate inherited coverage SHALL trigger a delta evaluation of affected ACRs. | EI+OP | 1 | B | S,A,C | P |

### 11.5 Assurance Class Escalation ACR — Domain 14 (Operational Governance)

| Proposed ACR ID | Requirement Statement | Eval Method | Min Level | Fail Consequence | Profile | Platform Cert Eligible |
|---|---|---|---|---|---|---|
| ACR-14.25 | If the deploying organization materially changes the system's operational context in a manner that would increase the Risk Classification (e.g., expanding from internal to customer-facing deployment, adding life-safety use cases, or entering a regulated domain), the organization SHALL notify ARAF and the evaluating AVB within 14 days. The AVB SHALL conduct a Risk Classification reassessment to determine whether the Assurance Class must be elevated. | EI+OP | 1 | A | S,A,C | N |

### 11.6 SDK / Platform Cert Scope ACR — Domain 10 (Monitoring and Telemetry)

| Proposed ACR ID | Requirement Statement | Eval Method | Min Level | Fail Consequence | Profile | Platform Cert Eligible |
|---|---|---|---|---|---|---|
| ACR-10.30 | For Platform Certifications, the vendor SHALL document in the Reference Environment Specification whether the ARA Behavioral Telemetry SDK is deployed in the reference environment, and if not, the alternative telemetry mechanism used to support ACRs with Continuous or Quarterly evaluation frequency. The AVB SHALL assess whether the documented telemetry mechanism provides evaluation-equivalent coverage for all applicable monitoring ACRs. | EI+TI | 1 | B | S,A,C | Y |

### 11.7 New ACR Summary

| Proposed ACR ID | Domain | Topic | Fail Consequence | Platform Cert Eligible |
|---|---|---|---|---|
| ACR-1.25 | D1 — Autonomy Scope | Reference Environment Specification (RES) documentation | A | Y |
| ACR-1.26 | D1 — Autonomy Scope | AVB attestation of reference environment representativeness | A | Y |
| ACR-1.27 | D1 — Autonomy Scope | Material platform change threshold and re-evaluation trigger | B | Y |
| ACR-10.27 | D10 — Monitoring | Class B monthly telemetry batch obligation and lapse detection | A | N |
| ACR-10.28 | D10 — Monitoring | Class C real-time telemetry obligation and lapse detection | A | N |
| ACR-10.29 | D10 — Monitoring | CAPO SLA-bound alerting for Class C systems | A | N |
| ACR-10.30 | D10 — Monitoring | Platform Cert SDK documentation and telemetry equivalence | B | Y |
| ACR-12.25 | D12 — Auditability | Risk Classification Report — documentation and delivery | A | N |
| ACR-12.26 | D12 — Auditability | Risk Classification Report — organization acknowledgment | A | N |
| ACR-14.23 | D14 — Governance | Certification Inheritance configuration match verification | A | P |
| ACR-14.24 | D14 — Governance | Deployment-side configuration change notification | B | P |
| ACR-14.25 | D14 — Governance | Assurance Class escalation on operational context change | A | N |

---

## 12. Administrability Gut Check — Is This Overkill?

### 12.1 The Concern
A 410-ACR standard with a two-axis certification model, Platform Cert inheritance, Risk Classification, three Assurance Classes, class-differentiated CAPO SLAs, and 12 new governance ACRs could be so complex that no organization can realistically achieve compliance, no AVB can conduct a consistent evaluation, or the standard collapses under its own weight.

### 12.2 The Assessment — Not Overkill

**Reason 1: Complexity is in the architecture, not the credential.** The market-facing output is a badge: "ARA Deployment Certified Level 2 / Class B." The 410 ACRs are the machinery behind the badge. ISO 27001 has hundreds of controls. SOC 2 has complex trust service criteria. The complexity is the point: it's what makes the credential meaningful.

**Reason 2: The System Profile framework right-sizes the burden.** A Foundational profile system at Level 1 / Class A evaluates ~97 ACRs — comparable to a basic SOC 2 readiness assessment. The 410-ACR ceiling only hits a Comprehensive profile / Level 3 / Class C system, and those systems (clinical AI, autonomous vehicles, critical infrastructure) should face an elite-level standard.

**Reason 3: Class A eliminates the CAPO burden for the majority of systems.** Most enterprise systems will certify at Level 1 or 2 / Class A or B. Class A requires no continuous CAPO monitoring. Class B requires monthly batch telemetry — operationally achievable. The 24/7 real-time CAPO requirement (Class C) applies only to systems that demonstrably warrant it.

**Reason 4: The 12 new ACRs close real gaps, not theoretical ones.** They formalize existing good practice. ACR-1.25 requires documentation that already exists for a legitimate Platform Cert evaluation. ACR-12.25 requires documenting a determination the AVB is already making.

### 12.3 Genuine Risks That Remain

| Risk | Mitigation |
|---|---|
| Risk Classification scoring inconsistency between AVBs | Class assignment rules in Section 4.2 handle the majority of cases deterministically. TSB appeals handles edge cases. v1.2 rubric closes the gap. |
| Platform Cert reference environment fidelity disputes | ACR-1.26 requires AVB written attestation with documented justification. Creates auditable paper trail. |
| Class C CAPO SLA requirements may be unachievable for smaller CAPOs | GOV Art. 4 already requires 99.9% availability. ACR-10.29 formalizes what a Class C CAPO must deliver — does not raise the bar beyond existing GOV spec. |
| ACR xlsx at 410 rows becomes unwieldy | Scripted approach required for Session 5. Scoping Matrix handles profile-based filtering. |
| Organizations game the Risk Classification to land on Class A | Blocked by ACR-14.25 (escalation obligation on context change) and ACR-12.26 (signed acknowledgment). Misrepresentation is grounds for revocation. |

### 12.4 Verdict

> **This standard is not overkill.** It is proportionally complex — the most demanding tier is reserved for systems that cause the most harm when they fail. The vast majority of commercial AI deployments will certify at a level comparable to or less demanding than SOC 2 Type II. The architecture is elite, not unachievable. Proceed.

---

## 13. Session Start Prompts — Copy and Paste Verbatim

### Session 4 Prompt
> We are continuing work on the ARAF ARA Standard Suite v1.1. Sessions 1–3 are complete — all 9 documents are in final pre-adoption state. Session 4 implements two major architectural expansions: (1) the Two-Axis Certification Model (Evaluation Level × Assurance Class) and Platform Certification pathway, and (2) 12 new ACRs. All architecture decisions are locked in the uploaded Master Continuation Reference — do not re-open them.
>
> Begin with Step 0: global find-and-replace across all uploaded docs: "Level 3 Continuous Assurance" → "Level 3 Comprehensive" (see Section 5 for instance counts). Also update STD Doc Control table cert levels field. Then follow the Session 4 work plan in Section 10: GOV first (Steps 1–7), then STD (Steps 8–14), then EVL (Steps 15–20), then final sweep (Step 21).
>
> Documents uploaded: GOV, STD, EVL (Session 3 finals) + Master Continuation Reference.

### Session 5 Prompt
> We are continuing work on the ARAF ARA Standard Suite v1.1. Session 4 is complete — GOV, STD, and EVL have been updated with the Two-Axis Certification Model, Platform Certification pathway, and new ACR drafts. Session 5 updates the companion documents: AVB, SDK, TMK, and the ACR xlsx (adding 12 new ACRs and the Platform Cert Eligible column).
>
> All architecture decisions remain locked — see the uploaded Master Continuation Reference for all definitions, locked decisions, new ACR specifications, and ACR column classification criteria. Begin with Step 0: verify Level 3 rename complete in Session 4 outputs, then apply to AVB, SDK, TMK. Follow Session 5 work plan in Section 10.
>
> Documents uploaded: Session 4 outputs (GOV, STD, EVL .md files) + Session 3 finals (AVB, SDK, TMK, ACR xlsx) + Master Continuation Reference.

### Session 6 Prompt
> We are continuing work on the ARAF ARA Standard Suite v1.1. Sessions 4 and 5 are complete — all 7 Word docs and the ACR xlsx have been updated with the Two-Axis Certification Model, Platform Certification pathway, 12 new ACRs, and the Platform Cert Eligible column. Session 6 completes PHY and REG, runs the full suite sweep, validates all 9 documents, and prepares the suite for the adoption vote.
>
> All architecture decisions remain locked. Follow the Session 6 work plan in Section 10.
>
> Documents uploaded: all 9 Session 5 outputs (.md versions for Word docs) + Master Continuation Reference.

---

## 14. Honest Scope Assessment

| What | Assessment |
|---|---|
| Documents with substantive new content | STD, EVL, GOV (Session 4) — largest effort. STD adds three new Articles (6, 7, 8). EVL adds two new Articles and an Appendix. |
| Documents with targeted edits | AVB, SDK, TMK, PHY (Sessions 5–6) |
| Documents with structural change | ACR xlsx (Session 5) — 12 new rows + 1 new column across all domain tabs |
| Documents with review only | REG xlsx (Session 6) |
| Hardest single change | STD Arts. 7 + 8 (Two-Axis Model + Risk Classification) — new normative architecture with no prior text to build on |
| Most time-intensive single step | ACR xlsx Session 5 — 410 rows, Platform Cert Eligible classification, 12 new ACR rows in correct domain tabs. Scripted approach required. |
| What does NOT change | 15-domain structure. CAPO accreditation process. AVB authorization process. Insurance badge mechanics. System Profile framework. |
| Riskiest change | Level 3 rename — high recurrence across 4 documents. Must be verified last in Session 6 sweep. |
| New ACR count | 12 new ACRs. Total: 398 → 410. Domain counts: D1: 24→27, D10: 26→30, D12: 24→26, D14: 22→25. |
| Adoption vote timing | Should occur after Session 6, not before. These changes are material to commercial viability. Do it once on the complete package. |

> A committee that votes on this standard without Platform Certification as a defined pathway, without the Two-Axis Model, and without the 12 new ACRs is adopting an incomplete architecture. Three sessions is the right investment. The resulting standard will be technically superior to any comparable framework in the market.

---

*End of Master Continuation Reference | ARAF ARA Standard Suite | March 2026 | Sessions 4–6 — Architecture Locked*
