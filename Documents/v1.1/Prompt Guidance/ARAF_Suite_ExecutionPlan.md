# ARAF ARA Standard Suite — Complete Execution Plan
## Status Assessment + Session-by-Session Build Plan
### March 4, 2026

---

## PART 1: HONEST STATUS ASSESSMENT

### What exists right now

Nine source documents from Sessions 1–3. Zero have been edited in this session.
Everything designed in this conversation is a plan, not an implementation.
Nothing is lost. The originals are intact.

| Document | File | Current State |
|---|---|---|
| ARA Standard | ARA_Standard_v1_1_final.docx | Session 3 final — unedited |
| Governance Guide | ARAF_ARA_GOV_2026_001_final.docx | Session 3 final — unedited |
| Evaluation Methodology | ARAF_ARA_EVL_2026_002_final.docx | Session 3 final — unedited |
| AVB Authorization Guide | ARAF_ARA_AVB_2026_002_final.docx | Session 3 final — unedited |
| Behavioral Telemetry SDK | ARAF_ARA_SDK_2026_002_final.docx | Session 3 final — unedited |
| Trademark Policy | ARAF_ARA_TMK_2026_002_final.docx | Session 3 final — unedited |
| Physical Systems Supplement | ARAF_ARA_PHY_2026_002_final.docx | Session 3 final — unedited |
| ACR Control Matrix | ARAF_ARA_ACR_2026_002_final.xlsx | Session 3 final — unedited |
| Regulatory Mapping Guide | ARAF_ARA_REG_2026_002_final.xlsx | Session 3 final — unedited |

### What the current STD document contains

STD currently defines a **three-axis model**: System Profile × Certification Level × Evaluation Frequency.
It has Levels 1, 2, and "Level 3 Continuous Assurance."
It has no Platform Certification concept. No Assurance Class concept. No Risk Classification framework.

The STD is well-written and architecturally coherent as-is. We are adding to it, not fixing broken content.

### Complete inventory of every change planned

#### Group A: Simple find-and-replace (low risk, all 9 docs)
| Change | Docs | Instance count |
|---|---|---|
| "Level 3 Continuous Assurance" → "Level 3 Comprehensive" | STD(2), SDK(5), PHY(1), AVB(1) | 9 total |
| STD Doc Control: "3 (Foundation, Operational, Continuous Assurance)" → "3 (Foundation, Operational, Comprehensive)" | STD | 1 |
| Remove GOV Art. 7.5 ("First Founding Member" / Fabrick/Xlogix) | GOV | Delete 3 paragraphs |

#### Group B: New normative architecture in STD (high value, contained to STD)
| Change | Location in STD | New content |
|---|---|---|
| Add Art. 6b: Certification Subjects | After Art. 6 (AVBs) | Platform vs. Deployment Certification; who can obtain each |
| Add Part IV-B: Two-Axis Certification Model | After existing Part IV | Evaluation Level × Assurance Class; full definitions |
| Add Part IV-C: Risk Classification | After Part IV-B | 7 factors; class assignment rules; v1.1 operating posture |
| Update existing Part IV cert level descriptions | Part IV existing | Align Level 3 description; add note about Assurance Class |
| Add Assurance Class lapse/status states | Part IV-C or V | Status states table; lapse windows by class |
| Update Foreword | Foreword | Acknowledge founding contributor (Xlogix/Josh) |
| Update Summary of Changes | Doc Control | Describe new architecture additions |
| Update Glossary | Definitions section | 12 new terms |
| Update Doc Control table | Doc Control | ACR count 398→410; cert levels field |

#### Group C: New content cascading from STD (medium effort, 5 docs)
| Doc | Change |
|---|---|
| GOV | Add Art. 3.5 Platform Certification Pathway |
| GOV | Update Art. 4 CAPO SLAs with Assurance Class differentiation |
| GOV | Update Art. 6 Certification Pathway (add Platform Cert + Risk Classification step) |
| GOV | Add Art. 10.4 CTP placeholder |
| GOV | Update Glossary (12 new terms) |
| GOV | Add Foreword acknowledgment |
| EVL | Add Art. 3.6 Platform Cert Evaluation Procedures |
| EVL | Add Art. 3.7 Reference Environment Requirements |
| EVL | Add Appendix B: Reference Environment Specification Template |
| EVL | Update Art. 4.2 Evidence Sufficiency Matrix column header |
| EVL | Update Art. 5 evidence categories |
| EVL | Update Glossary (12 new terms) |
| AVB | Add Art. 13 Platform Cert Competencies |
| AVB | Update Art. 2.1 authorization level table |
| AVB | Update Art. 12.3 revalidation triggers |
| AVB | Update Glossary (12 new terms) |
| SDK | Update Art. 1.2 scope (Platform Cert vs. Deployment Cert) |
| SDK | Update Art. 6.6 insurance data feed (add Assurance Class fields) |
| SDK | Update rate limit table (Level 3 rename) |
| SDK | Update Glossary (12 new terms) |
| TMK | Add Platform Cert mark anatomy |
| TMK | Add Platform Cert mark usage rules |
| TMK | Update Art. 4.4 Level 3 product naming |
| TMK | Update Art. 6.7 insurance badge note |
| TMK | Update Glossary (12 new terms) |

#### Group D: Physical and Regulatory (Session 6, contained)
| Doc | Change |
|---|---|
| PHY | Update Art. 1 scope (Domain 15 Platform Cert limitations) |
| PHY | Update Section 5 level requirements (Level 3 rename) |
| PHY | Update Glossary (12 new terms) |
| REG | Add "Platform Cert Sufficient?" column to Master Crosswalk |
| REG | Add Assurance Class → ongoing monitoring framework notation |

#### Group E: ACR xlsx (12 new ACRs + 1 new column)
| Change | Detail |
|---|---|
| Add ACR-1.25 | Reference Environment Specification documentation requirement |
| Add ACR-1.26 | AVB attestation of reference environment representativeness |
| Add ACR-1.27 | Material platform change threshold and re-evaluation trigger |
| Add ACR-10.27 | Class B monthly telemetry batch obligation and lapse detection |
| Add ACR-10.28 | Class C real-time telemetry obligation and lapse detection |
| Add ACR-10.29 | CAPO SLA-bound alerting for Class C systems |
| Add ACR-10.30 | Platform Cert SDK documentation and telemetry equivalence |
| Add ACR-12.25 | Risk Classification Report documentation and delivery |
| Add ACR-12.26 | Risk Classification Report organization acknowledgment |
| Add ACR-14.23 | Certification Inheritance configuration match verification |
| Add ACR-14.24 | Deployment-side configuration change notification |
| Add ACR-14.25 | Assurance Class escalation on operational context change |
| Add column | "Platform Cert Eligible" (Y/N/P) across all 410 rows |

---

## PART 2: WHY OPTION B (STD FIRST) IS RIGHT

STD is the normative source document. Every other document in the suite is a companion that
implements, operationalizes, or extends what STD defines. If STD is right:

- GOV knows exactly what governance mechanisms Platform Cert needs
- EVL knows exactly what evaluation procedures to write
- AVB knows exactly what competencies to add
- SDK knows exactly what telemetry scope to document
- ACR xlsx knows exactly what new requirements to encode

If we edit all 9 docs simultaneously without a locked STD, we will produce 9 documents that each
interpret the architecture slightly differently and require a second harmonization pass.

STD first, then cascade. This is how ISO, NIST, and IETF work.

---

## PART 3: SESSION-BY-SESSION EXECUTION PLAN

### SESSION A — STD: Architecture Core
**Goal:** STD becomes the locked normative source for the two-axis model and platform certification.
**Output:** ARA_Standard_v1_1_master.docx + ARA_Standard_v1_1_master.md

**Upload:** ARA_Standard_v1_1_final.docx + this plan .md

**STEP A-0: Level 3 rename in STD**
- Find/replace: "Level 3 Continuous Assurance" → "Level 3 Comprehensive" (2 instances)
- Find/replace: "Level 3 --- Continuous Assurance" heading variant
- Update Doc Control table: "3 (Foundation, Operational, Continuous Assurance)" → "3 (Foundation, Operational, Comprehensive)"
- Update existing cert level descriptions in Part IV to say "Level 3 Comprehensive"
- Verify: zero surviving "Continuous Assurance" uses as a certification level name

**STEP A-1: Remove GOV Art. 7.5 cross-reference from STD (if any)**
- Search STD for "GOV Art. 7.5" or "Article 7.5" — confirm none exist

**STEP A-2: Add Foreword acknowledgment to STD**
Verbatim text to insert at end of existing Foreword:

> The ARA Standard was developed by Josh Sigel and the Xlogix Inc. technical team as the
> Originating Technical Contributor to the Autonomous Reliability Assurance Foundation. ARAF
> acknowledges this founding contribution in accordance with its Technical Contributor recognition
> policy (ARAF-ARA-GOV-2026-001).

**STEP A-3: Add new Article 6b — Certification Subjects**
Insert after existing Article 6 (Certification Authority and AVBs), before Article 7 (Revocation).
New article title: "Article 6b — Certification Subjects and Pathways"

Content to write:
- 6b.1 Deployment Certification: definition, who obtains it, expressed as Level/Class
- 6b.2 Platform Certification: definition, who obtains it (vendors only), expressed as Level only
- 6b.3 Eligibility table (agentic platform vendors, product companies, foundation models = eligible;
  enterprise self-build, consulting firms, CAPOs = not eligible for Platform Cert)
- 6b.4 Certification Inheritance: mechanism and scope (inherited ACRs, delta evaluation, deployment-context ACRs)
- 6b.5 Certified Technology Partner (CTP): consulting firm registry designation, not a certification

**STEP A-4: Add new Part IV-B — Two-Axis Certification Model**
Insert after existing Part IV (Certification Levels), before Part V (Certification Lifecycle).
New part title: "PART IV-B: THE TWO-AXIS CERTIFICATION MODEL"

Content to write:
- Opening explanation: why two axes (evaluation rigor vs. monitoring intensity are orthogonal)
- Axis 1: Evaluation Level (Level 1/2/3 Comprehensive) — applies to both Platform and Deployment Certs
- Axis 2: Assurance Class (Class A/B/C) — applies to Deployment Certs only; not applicable to Platform Certs
- Class A — Periodic: full definition, trigger conditions, lapse window
- Class B — Monitored: full definition, CAPO connection requirement, monthly batch, lapse window
- Class C — Continuously Assured: full definition, real-time stream, SLA-bound alerting, life-safety = Class C without exception
- Certification expression format: "ARA Deployment Certified Level [X] / Class [Y]" and "ARA Platform Certified Level [X]"
- Certification expression examples table (5 rows covering common combinations)
- Status states: Active, Active-Assurance Lapsed, Under Revalidation, Suspended, Expired, Revoked
- Lapse windows table: Class A (60 days), Class B (30 days), Class C (72 hours; life-safety = immediate)

**STEP A-5: Add new Part IV-C — Risk Classification**
Insert after Part IV-B.
New part title: "PART IV-C: RISK CLASSIFICATION"

Content to write:
- Opening: Risk Classification is mandatory for all Deployment Certifications; conducted by AVB
- Authority: AVB determines; documented in evaluation report; appeal to TSB
- 7 classification factors table: Degree of Autonomy, Consequence Severity, Reversibility,
  Breadth of Impact, Regulatory Context, Dependency Criticality, Operational Continuity
- Class assignment rules table: 8 rows with deterministic rules for life-safety, financial systemic risk,
  critical infrastructure, regulated domains, high-autonomy systems, multi-agent orchestration,
  customer-facing with escalation path, internal with human review
- v1.1 operating posture callout: full scoring rubric deferred to v1.2; AVBs apply normative rules
  with professional judgment; determinations are documented and auditable

**STEP A-6: Update existing Part IV cert level entries**
- Level 3 description: confirm renamed to "Level 3 Comprehensive"; update description to note
  that Assurance Class (typically Class C for Level 3 systems) is set separately via Risk Classification
- Add note to all three level descriptions: "The Assurance Class — which determines post-certification
  monitoring intensity — is determined separately via Risk Classification (Part IV-C)."

**STEP A-7: Update Part V Certification Lifecycle**
- Phase 2 (System Profile Classification): no change needed
- After Phase 3 (Statement of Applicability): confirm Platform Cert pathway note in lifecycle
- Add new Phase: "Phase 3b: Certification Subject Determination — applicant and AVB determine whether
  the engagement is a Platform Certification or Deployment Certification. For Deployment Certifications,
  proceed to Phase 3c."
- Add new Phase: "Phase 3c: Risk Classification — AVB conducts Risk Classification to determine
  required Assurance Class. Documents in Risk Classification Report. Organization signs acknowledgment."

**STEP A-8: Update Glossary with 12 new locked definitions**
Add these terms in alphabetical order within existing Definitions section:
1. Assurance Class
2. Assurance Lapse
3. Certified Technology Partner (CTP)
4. Certification Inheritance
5. Class A — Periodic
6. Class B — Monitored
7. Class C — Continuously Assured
8. Deployment Certification
9. Evaluation Level
10. Platform Certification
11. Reference Environment
12. Risk Classification

Also update existing definitions:
- "Certification Level": add note that it is now called "Evaluation Level" in the two-axis model context;
  "Certification Level" is retained for backward compatibility in legacy references
- "Continuous Assurance": add disambiguation note: as a concept, continuous assurance refers to ongoing
  monitoring; as a formal designation, Assurance Class C is the two-axis model's expression of this concept.
  The former certification level name "Level 3 Continuous Assurance" has been renamed "Level 3 Comprehensive."

**STEP A-9: Update Summary of Changes in Doc Control**
Add bullets describing:
- Two-Axis Certification Model (Evaluation Level × Assurance Class)
- Platform Certification pathway
- Risk Classification framework
- Level 3 rename to Comprehensive
- 12 new ACRs (ACR-1.25/1.26/1.27, ACR-10.27–10.30, ACR-12.25/12.26, ACR-14.23–14.25); total 398→410
- GOV Art. 7.5 removal

**STEP A-10: Update Doc Control table**
- Total ACRs: 398 → 410
- Certification Levels: "3 (Foundation, Operational, Comprehensive)" [already done in A-0]
- Add row: "Certification Model: Two-Axis (Evaluation Level × Assurance Class)"

**STEP A-11: Final STD validation**
- Zero instances of "Level 3 Continuous Assurance" as a certification level name
- All 12 new definitions present in Glossary
- Two-axis model in Part IV-B; Risk Classification in Part IV-C; Certification Subjects in Art. 6b
- Doc Control shows 410 ACRs
- Foreword acknowledgment present
- Pack and validate: zero errors

---

### SESSION B — GOV: Governance Implementation
**Goal:** GOV implements Platform Cert governance, removes Art. 7.5, adds CAPO class SLAs.
**Output:** ARAF_ARA_GOV_v1_1_master.docx + ARAF_ARA_GOV_v1_1_master.md

**Upload:** ARAF_ARA_GOV_2026_001_final.docx + ARA_Standard_v1_1_master.md + plan .md

**STEP B-0: Level 3 rename in GOV**
- Confirm 0 instances (already verified). Document confirmed clean.

**STEP B-1: Remove Art. 7.5**
- Delete the three paragraphs comprising "7.5 First Founding Member" (Fabrick/Xlogix named rights)
- Renumber: confirm no Art. 7.6+ exists (check: Art. 7 structure ends at 7.5, so no renumbering needed)
- Sweep for GOV Art. 7.5 cross-references in GOV itself: none expected

**STEP B-2: Add Foreword acknowledgment**
Verbatim text to insert at end of existing GOV Foreword:

> The ARAF ARA Standard Suite was initiated and developed by Josh Sigel (Founder & CEO, Xlogix Inc.)
> and the Xlogix technical team. Xlogix Inc. holds Originating Technical Contributor status in
> recognition of its foundational role in authoring the ARA Standard framework, the CAPO ecosystem
> architecture, and the Behavioral Telemetry SDK specification. Originating Technical Contributor
> status is a permanent acknowledgment of founding contribution and does not confer governance rights,
> veto authority, or preferential accreditation standing. Xlogix Inc. participates in the ARAF
> ecosystem as an applicant CAPO and technology contributor under the same terms as all ecosystem
> participants.

**STEP B-3: Add Art. 3.5 — Platform Certification Pathway**
Insert after Art. 3.4 (Proportionality) within the Governing Principles section, or as a new article
within the Ecosystem Architecture section (whichever fits better given GOV structure).

Content:
- 3.5.1 Definition and scope (reference STD Art. 6b)
- 3.5.2 Eligibility (vendors/product companies; enterprise self-build and consulting firms excluded)
- 3.5.3 Reference environment requirements (5 bullets from plan)
- 3.5.4 Certification inheritance at deployment (4-row table)
- 3.5.5 Platform Cert in the Registry (how it appears; distinguished from Deployment Cert)

**STEP B-4: Update Art. 4 CAPO Requirements — Assurance Class SLAs**
Update Art. 4.3 SLA Requirements table to add Assurance Class differentiation:

| SLA Requirement | Class A | Class B | Class C |
|---|---|---|---|
| Telemetry connection | Not required | Active CAPO connection | Persistent real-time connection |
| Telemetry delivery frequency | Not required | Monthly batch minimum | Real-time streaming |
| Lapse detection | N/A | Flag after 2 consecutive months without batch | Flag after 24-hour gap (excl. scheduled maintenance ≤4hr, max 2×/month) |
| Alert SLA — Critical events | N/A | 24 hours | 5 minutes |
| Alert SLA — Emergency events | N/A | 4 hours | 60 seconds |
| Reconnection SLA after lapse | N/A | 30-day remediation window | 72-hour restore window |

Add note: Life-safety Class C systems (clinical AI, autonomous vehicles, critical infrastructure)
have no grace period on lapse — immediate suspension.

**STEP B-5: Update Art. 6 Certification Pathways**
Current Art. 6 covers deployment-only pathway. Update to add:
- 6.1: Two pathway types (Platform Certification pathway; Deployment Certification pathway)
- Platform Cert pathway steps: Scoping → AVB Selection → Reference Environment Setup → Evaluation → Cert Grant
- Update Deployment Cert pathway: add "Risk Classification" as mandatory step between AVB Evaluation
  and Certification Recommendation
- Add note on Certification Inheritance: when customer deploys Platform-Certified product, Deployment
  Cert scope is reduced to delta evaluation + deployment-context ACRs

**STEP B-6: Add Art. 10.4 CTP Placeholder**
Insert at end of Art. 10 (Ecosystem Evolution and Future Participant Categories).

Verbatim text:

> 10.4 Certified Technology Partner (CTP) Registry
>
> The ARAF CTP Registry recognizes consulting and implementation organizations that demonstrate
> competency in supporting ARA certification engagements. CTP status is a registry designation,
> not a certification, and does not confer evaluation authority or certification rights.
>
> Requirements for CTP designation: (a) Demonstrated history of at least three successful ARA
> certification engagements as a supporting consultant or integrator; (b) At least two staff members
> who have completed ARAF-recognized ARA implementation training; (c) Signed adherence to the ARAF
> Code of Conduct and confidentiality requirements; (d) Annual renewal with continued engagement history.
>
> The CTP registry will be publicly accessible through the ARAF website. ARAF will establish the
> registry operationally following the adoption of the ARA Standard v1.1. Organizations meeting the
> requirements above may express interest through the ARAF Ecosystem Development Office for priority
> registration upon launch.

**STEP B-7: Update GOV Glossary**
Add all 12 locked definitions (same as STD). Add:
- "Certified Technology Partner (CTP)" — must reference Art. 10.4
- "Platform Certification" — reference STD Art. 6b and GOV Art. 3.5
- "Assurance Class" — reference STD Part IV-B and GOV Art. 4.3

**STEP B-8: Final GOV validation**
- Art. 7.5 removed
- Foreword acknowledgment present
- Art. 3.5 Platform Certification Pathway present
- Art. 4.3 has Assurance Class SLA table
- Art. 6 has two pathway types + Risk Classification step in Deployment pathway
- Art. 10.4 CTP placeholder present
- 12 new definitions in Glossary
- Zero instances of "Level 3 Continuous Assurance" as certification level name
- Pack and validate: zero errors

---

### SESSION C — EVL + AVB: Evaluation Implementation
**Goal:** EVL adds Platform Cert evaluation procedures; AVB adds Platform Cert competencies.
**Output:** ARAF_ARA_EVL_v1_1_master.docx + .md; ARAF_ARA_AVB_v1_1_master.docx + .md

**Upload:** ARAF_ARA_EVL_2026_002_final.docx + ARAF_ARA_AVB_2026_002_final.docx +
ARA_Standard_v1_1_master.md + ARAF_ARA_GOV_v1_1_master.md + plan .md

**EVL STEPS:**

**STEP C-EVL-0: Level 3 rename in EVL**
- Confirm 0 instances. Update Art. 4.2 Evidence Sufficiency Matrix column header:
  "Level 3: Continuous Assurance" → "Level 3: Comprehensive"

**STEP C-EVL-1: Add Art. 3.6 — Platform Certification Evaluation Procedures**
Content:
- 3.6.1 Scope determination: is the engagement Platform Cert or Deployment Cert?
- 3.6.2 Reference environment validation: AVB validates per ACR-1.26.
- 3.6.3 Simulated telemetry: acceptable for Platform Cert.
- 3.6.4 Platform Cert evaluation report: required contents.
- 3.6.5 Certification inheritance documentation.

**STEP C-EVL-2: Add Art. 3.7 — Reference Environment Requirements**
Content:
- Minimum conditions
- Fidelity threshold
- Hardware-in-the-loop exception for Domain 15
- Reference environment documentation as ongoing condition

**STEP C-EVL-3: Add Appendix B — Reference Environment Specification Template**
Structured template with all required fields including AVB attestation signature block.

**STEP C-EVL-4: Update Art. 5 Evidence Categories**
Add new type: "Reference Environment Attestation (REA)"

**STEP C-EVL-5: Update Glossary**
Add all 12 locked definitions.

**STEP C-EVL-6: Final EVL validation**
Pack and validate: zero errors.

**AVB STEPS:**

**STEP C-AVB-0: Level 3 rename in AVB**
- 1 instance: rename "Level 3 (Continuous Assurance)" → "Level 3 (Comprehensive)"

**STEP C-AVB-1: Update Art. 2.1 Authorization Level Table**
- Rename Level 3 column header
- Add row: "Platform Cert evaluation authority"

**STEP C-AVB-2: Add Art. 13 — Platform Certification Competencies**
Content: required competencies, supplemental training, evaluation team requirements.

**STEP C-AVB-3: Update Art. 12.3 Revalidation Triggers**
Add two new triggers: Assurance Class lapse; Assurance Class escalation.

**STEP C-AVB-4: Update Glossary**
Add all 12 locked definitions.

**STEP C-AVB-5: Final AVB validation**
Pack and validate: zero errors.

---

### SESSION D — SDK + TMK: Infrastructure and Marks
**Goal:** SDK scope clarified for Platform Cert; TMK adds Platform Cert mark.
**Output:** ARAF_ARA_SDK_v1_1_master.docx + .md; ARAF_ARA_TMK_v1_1_master.docx + .md

**Upload:** ARAF_ARA_SDK_2026_002_final.docx + ARAF_ARA_TMK_2026_002_final.docx +
ARA_Standard_v1_1_master.md + plan .md

**SDK STEPS:**

**STEP D-SDK-0: Level 3 rename in SDK — 5 instances**
All five instances: "Level 3 Continuous Assurance" → "Level 3 Comprehensive"

**STEP D-SDK-1: Update Art. 1.2 Scope**
Add paragraph distinguishing SDK role for Deployment Cert vs. Platform Cert.

**STEP D-SDK-2: Update Art. 6.6 Insurance Data Feed**
Add Assurance Class fields; add Platform Cert note.

**STEP D-SDK-3: Update Glossary**
Add all 12 locked definitions.

**STEP D-SDK-4: Final SDK validation**
Pack and validate: zero errors.

**TMK STEPS:**

**STEP D-TMK-0: Level 3 rename in TMK**
- Update Art. 4.4 title: "Level 3 Comprehensive Product Naming Approval Process"

**STEP D-TMK-1: Add Platform Certification Mark Anatomy**
Format, visual distinction rules, prohibited uses.

**STEP D-TMK-2: Add Platform Cert Mark Usage Rules**
Eligible users, required context, recommended phrasing, prohibited uses.

**STEP D-TMK-3: Update Art. 6.7 Insurance Badge**
Add note: Deployment Certs only; Platform Certs not eligible.

**STEP D-TMK-4: Update Glossary**
Add all 12 locked definitions.

**STEP D-TMK-5: Final TMK validation**
Pack and validate: zero errors.

---

### SESSION E — ACR xlsx: New ACRs + Platform Cert Column
**Goal:** Add 12 new ACRs; add Platform Cert Eligible column. Total 398 → 410.
**Output:** ARAF_ARA_ACR_v1_1_master.xlsx

**Upload:** ARAF_ARA_ACR_2026_002_final.xlsx + ARA_Standard_v1_1_master.md + plan .md

**APPROACH: Scripted Python using openpyxl. Do not edit manually.**

**STEP E-1: Add 12 new ACR rows to ACR Master Matrix**

| ACR ID | Domain | Requirement Statement | Eval Method | Evidence Type | Min Level | Risk Weight | Fail Consequence | Profile | Platform Cert Eligible |
|---|---|---|---|---|---|---|---|---|---|
| ACR-1.25 | D1 | For systems seeking Platform Certification, the vendor SHALL maintain a documented Reference Environment Specification (RES) describing infrastructure, configuration, model version, dependency versions, simulated input distributions, and known deviations from production conditions. | EI | DC | 1 | 3 | A | F,S,A,C | Y |
| ACR-1.26 | D1 | The evaluating AVB SHALL attest in writing that the Reference Environment is representative of production-equivalent behavior for all in-scope ACRs, with documented justification for any identified deviations. | EI+TP | TP | 2 | 4 | A | S,A,C | Y |
| ACR-1.27 | D1 | Material changes to the platform (new model version, architectural change, dependency version change) SHALL trigger re-evaluation of affected ACRs. The vendor SHALL define and document the threshold for "material change" prior to Platform Certification. | EI+OP | DC+AT | 1 | 3 | B | F,S,A,C | Y |
| ACR-10.27 | D10 | Systems certified at Assurance Class B (Monitored) SHALL maintain an active CAPO connection and deliver telemetry batches at minimum monthly frequency. A gap of two consecutive months without telemetry batch delivery SHALL be automatically flagged by the CAPO as an Assurance Lapse condition. | CM+AT | AT | 2 | 4 | A | S,A,C | N |
| ACR-10.28 | D10 | Systems certified at Assurance Class C (Continuously Assured) SHALL maintain a persistent, real-time CAPO telemetry connection. Any telemetry gap exceeding 24 hours (excluding documented scheduled maintenance windows of up to 4 hours, maximum twice per month) SHALL be automatically flagged by the CAPO as an Assurance Lapse condition triggering the 72-hour remediation window. | CM+AT | AT | 2 | 5 | A | A,C | N |
| ACR-10.29 | D10 | The CAPO SHALL deliver SLA-bound alerting for Assurance Class C systems: Critical-severity compliance events SHALL generate alerts within 5 minutes of detection; Emergency-severity events SHALL generate alerts within 60 seconds. Failure to meet these SLAs for material events constitutes an Assurance Lapse condition. | CM+AT | AT | 3 | 5 | A | A,C | N |
| ACR-10.30 | D10 | For Platform Certifications, the vendor SHALL document in the Reference Environment Specification whether the ARA Behavioral Telemetry SDK is deployed in the reference environment, and if not, the alternative telemetry mechanism used to support ACRs with Continuous or Quarterly evaluation frequency. The AVB SHALL assess whether the documented telemetry mechanism provides evaluation-equivalent coverage. | EI+TI | DC | 1 | 3 | B | S,A,C | Y |
| ACR-12.25 | D12 | The AVB SHALL produce a documented Risk Classification Report as part of every Deployment Certification evaluation. The report SHALL address all seven classification factors (degree of autonomy, consequence severity, reversibility, breadth of impact, regulatory context, dependency criticality, operational continuity), state the resulting Assurance Class, and provide justification for the determination. | EI+TP | TP | 1 | 4 | A | S,A,C | N |
| ACR-12.26 | D12 | The Risk Classification Report SHALL be delivered to the deploying organization and to ARAF as part of the certification evidence package. The organization SHALL sign acknowledgment of the assigned Assurance Class before certification is granted. | EI+OP | DC | 1 | 4 | A | S,A,C | N |
| ACR-14.23 | D14 | Where a Deployment Certification claims Certification Inheritance from a Platform-Certified product, the deploying organization SHALL document the configuration match between the deployment and the Platform Cert reference environment. The AVB SHALL verify this match and attest to it in the Deployment Cert evaluation report. | EI+OP | DC+TP | 1 | 3 | A | S,A,C | P |
| ACR-14.24 | D14 | The deploying organization SHALL notify the platform vendor and ARAF within 14 days of any deployment-side configuration change that affects inherited ACR coverage. Changes that invalidate inherited coverage SHALL trigger a delta evaluation of affected ACRs. | EI+OP | DC | 1 | 3 | B | S,A,C | P |
| ACR-14.25 | D14 | If the deploying organization materially changes the system's operational context in a manner that would increase the Risk Classification (e.g., expanding from internal to customer-facing deployment, adding life-safety use cases, or entering a regulated domain), the organization SHALL notify ARAF and the evaluating AVB within 14 days. The AVB SHALL conduct a Risk Classification reassessment to determine whether the Assurance Class must be elevated. | EI+OP | DC | 1 | 4 | A | S,A,C | N |

**STEP E-2: Add new ACRs to their respective domain tabs**
- D1 tab: add ACR-1.25, 1.26, 1.27
- D10 tab: add ACR-10.27, 10.28, 10.29, 10.30
- D12 tab: add ACR-12.25, 12.26
- D14 tab: add ACR-14.23, 14.24, 14.25

**STEP E-3: Add "Platform Cert Eligible" column (Y/N/P) to Master Matrix and all domain tabs**

General guidance for existing 398 ACRs:
- Domain 1: mostly Y
- Domain 2: mostly Y
- Domain 3: Y
- Domain 4: mostly Y
- Domain 5: P
- Domain 6: Y
- Domain 7: Y
- Domain 8: Y
- Domain 9: P
- Domain 10: P/N split
- Domain 11: Y
- Domain 12: Y except risk classification ACRs (N)
- Domain 13: P
- Domain 14: P
- Domain 15: N for Failure Consequence A/B without physical testbed; Y/P for others

**STEP E-4: Update Summary tab**
- Total ACR count: 398 → 410
- Domain breakdown: D1: 24→27, D10: 26→30, D12: 24→26, D14: 22→25

**STEP E-5: Update Scoping Matrix tab**
Verify new ACRs appear with correct Profile Applicability flags.

---

### SESSION F — PHY + REG + Full Suite Harmonization
**Goal:** Complete PHY and REG; run full 9-document consistency sweep; adopt-ready package.
**Output:** All 9 documents at _master suffix; adoption-ready.

**Upload:** All 9 session outputs (.md versions for Word docs) + plan .md

**PHY STEPS:**

**STEP F-PHY-0: Level 3 rename in PHY**
- 1 instance: "Level 3 Continuous Assurance" → "Level 3 Comprehensive"

**STEP F-PHY-1: Update Art. 1 Scope**
Add Platform Cert limitations paragraph for Domain 15.

**STEP F-PHY-2: Update Section 5 Level Requirements**
Rename Level 3 column.

**STEP F-PHY-3: Update Glossary**
Add all 12 locked definitions.

**STEP F-PHY-4: Final PHY validation**

**REG STEPS:**

**STEP F-REG-1: Add "Platform Cert Sufficient for Regulatory Compliance?" column**
Values: Y / N / Partial — apply logic per framework.

**STEP F-REG-2: Add Assurance Class notation in EU AI Act and ISO 42001 tabs**

**STEP F-REG-3: Final REG validation**

**FULL SUITE HARMONIZATION SWEEP:**

**STEP F-SWEEP-1:** Cross-document consistency — Definitions (all 12 terms identical across all 7 Word docs)
**STEP F-SWEEP-2:** Cross-document consistency — Level 3 rename (zero surviving "Level 3 Continuous Assurance")
**STEP F-SWEEP-3:** Cross-document consistency — ACR count (410 everywhere)
**STEP F-SWEEP-4:** Cross-document consistency — GOV Art. 7.5 removed; SDK Art. 7.5 and TMK Art. 6.7.5 untouched
**STEP F-SWEEP-5:** Cross-document consistency — Platform Cert architecture consistent with STD Art. 6b
**STEP F-SWEEP-6:** Cross-document consistency — Assurance Class consistent with STD Part IV-B
**STEP F-SWEEP-7:** Cross-document consistency — New ACRs present and correctly referenced
**STEP F-SWEEP-8:** Cross-document consistency — All Doc Control fields: v1.1, March 2026, correct status
**STEP F-SWEEP-9:** Validation — all Word documents pack with zero errors

**STEP F-FINAL:** Mark suite as "Committee-Ready for Adoption Vote."

---

## PART 4: SESSION UPLOAD CHECKLISTS

### Session A — STD only
- ARA_Standard_v1_1_final.docx
- ARAF_Suite_ExecutionPlan.md

### Session B — GOV + Session A outputs
- ARAF_ARA_GOV_2026_001_final.docx
- ARA_Standard_v1_1_master.md
- ARAF_Suite_ExecutionPlan.md

### Session C — EVL + AVB + Sessions A+B outputs
- ARAF_ARA_EVL_2026_002_final.docx
- ARAF_ARA_AVB_2026_002_final.docx
- ARA_Standard_v1_1_master.md
- ARAF_ARA_GOV_v1_1_master.md
- ARAF_Suite_ExecutionPlan.md

### Session D — SDK + TMK + Session A output
- ARAF_ARA_SDK_2026_002_final.docx
- ARAF_ARA_TMK_2026_002_final.docx
- ARA_Standard_v1_1_master.md
- ARAF_Suite_ExecutionPlan.md

### Session E — ACR xlsx + Session A output
- ARAF_ARA_ACR_2026_002_final.xlsx
- ARA_Standard_v1_1_master.md
- ARAF_Suite_ExecutionPlan.md

### Session F — Full suite + all session outputs
- All 9 _master outputs (.md for Word docs; .xlsx for spreadsheets)
- ARAF_Suite_ExecutionPlan.md

---

## PART 5: WHAT DOES NOT CHANGE

- The 15-domain structure (unchanged)
- The CAPO accreditation process and requirements (Art. 4 structure)
- The AVB authorization process and requirements (Art. 3 structure)
- The System Profile framework (F/S/A/C — unchanged)
- The 398 existing ACRs (text and IDs unchanged; Platform Cert Eligible column is additive)
- The insurance badge mechanics (TMK Art. 6.7 — note added only)
- The tokenized badge system (TMK — unchanged except Platform Cert mark addition)
- The regulatory framework crosswalks (REG — columns added only)
- The SDK telemetry schemas (unchanged)
- The gRPC/REST integration specs (unchanged except Level 3 rename)
- The six Enterprise Risk Dimensions (unchanged)
- The per-ACR evaluation frequency framework (unchanged)

---

## PART 6: FULL VERBATIM CONTENT BLOCKS

### 12 Locked Definitions (use identically in all 7 Word docs)

**Assurance Class:** The second axis of an ARA Deployment Certification. Describes the intensity of ongoing monitoring required to maintain the certification in good standing: Class A Periodic, Class B Monitored, or Class C Continuously Assured. Determined by Risk Classification. Not applicable to Platform Certifications.

**Assurance Lapse:** The state in which a Deployment Certification's CAPO monitoring has fallen below the frequency required by its Assurance Class. Triggers a class-dependent remediation window; if unresolved, results in Suspension or Expiry.

**Certified Technology Partner (CTP):** A consulting or implementation firm listed in the ARAF CTP Registry as having demonstrated ARA implementation competency. Not a certification — a registry designation. Does not confer evaluation authority or certification rights.

**Certification Inheritance:** The mechanism by which a Deployment Certification built on a Platform-Certified product carries forward the platform's ACR coverage, reducing the scope of deployment-level evaluation to configuration-dependent and deployment-context ACRs.

**Class A — Periodic:** Assurance Class requiring annual or biannual re-evaluation. No continuous CAPO monitoring required. Event-triggered revalidation only. Applicable to low-autonomy, low-consequence, reversible deployments.

**Class B — Monitored:** Assurance Class requiring an active CAPO connection and minimum monthly telemetry batch delivery. Event-triggered revalidation. Applicable to operational business systems with moderate autonomy or consequence.

**Class C — Continuously Assured:** Assurance Class requiring a persistent CAPO connection, real-time telemetry stream, and SLA-bound alerting. Required for high-autonomy, high-consequence, or regulated deployments. Life-safety systems are Class C without exception.

**Deployment Certification:** An ARA certification issued to a specific production instance of an autonomous system operated by an identified organization. Covers the full operational context including configuration, integrations, data environment, and use cases. Expressed as an Evaluation Level and an Assurance Class. Issued to the deploying organization.

**Evaluation Level:** The first axis of an ARA certification. Describes the rigor of the evaluation conducted by an accredited AVB: Level 1 Foundation, Level 2 Operational, or Level 3 Comprehensive. Applies to both Platform Certifications and Deployment Certifications.

**Platform Certification:** An ARA certification issued to a software platform, product, or autonomous system technology evaluated in a controlled reference environment against applicable ACRs. Certifies the technology as a product independent of any specific production deployment. Expressed as an Evaluation Level only (no Assurance Class). Issued to the technology vendor.

**Reference Environment:** A controlled deployment environment used for Platform Certification evaluation. Must meet ARAF minimum conditions for ACR evaluation fidelity per Art. 3.7 of the Evaluation Methodology Guide. Documented and attested by the evaluating AVB as representative of production-equivalent behavior.

**Risk Classification:** A formal assessment conducted by an accredited AVB as part of Deployment Certification that determines the required Assurance Class. Based on degree of autonomy, consequence severity, reversibility, breadth of impact, regulatory context, dependency criticality, and operational continuity. Documented in the Risk Classification Report. Appealable to the ARAF Technical Standards Board.

### Naming Convention
All final outputs use the `_master` suffix: `ARA_Standard_v1_1_master.docx`, `ARAF_ARA_GOV_v1_1_master.docx`, etc.
No further versioning suffixes after `_master`.

---

*End of Execution Plan | ARAF ARA Standard Suite | March 4, 2026*
*Session sequence: A (STD) → B (GOV) → C (EVL+AVB) → D (SDK+TMK) → E (ACR xlsx) → F (PHY+REG+Sweep)*
