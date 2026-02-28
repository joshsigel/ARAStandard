import { Domain } from '@/types';

export const domains: Domain[] = [
  {
    id: 1,
    slug: 'autonomy-scope-definition',
    title: 'Autonomy Scope Definition',
    shortTitle: 'Autonomy Scope',
    summary:
      'Establishes the explicit operational boundaries within which an autonomous system is permitted to act. This domain requires formal enumeration of permitted action classes, restricted operations, and the enforcement mechanisms that prevent boundary violations. All scope definitions must be machine-parseable, version-controlled, and subject to independent verification prior to deployment.',
    acrCount: 24,
    applicability: { L1: true, L2: true, L3: true },
    riskRationale:
      'Unbounded autonomy is the root cause of uncontrolled agent behavior. Without explicit scope constraints, systems may take actions outside their intended operational envelope, leading to unauthorized resource access, unintended side effects, or cascading failures across dependent systems.',
    versionIntroduced: '1.0',
  },
  {
    id: 2,
    slug: 'decision-integrity',
    title: 'Decision Integrity',
    shortTitle: 'Decision Integrity',
    summary:
      'Ensures that every decision produced by an autonomous system is traceable to its source inputs, reasoning chain, and governing instructions. This domain mandates protections against fabrication, hallucination, and unsupported assertions in system outputs. It enforces strict instruction hierarchy so that system-level directives cannot be overridden by user-level or injected prompts.',
    acrCount: 32,
    applicability: { L1: true, L2: true, L3: true },
    riskRationale:
      'Decisions that cannot be traced to valid inputs undermine the reliability of all downstream actions. Fabricated or hallucinated outputs erode trust in autonomous systems and may result in materially incorrect outcomes in high-stakes operational contexts such as healthcare, finance, or infrastructure management.',
    versionIntroduced: '1.0',
  },
  {
    id: 3,
    slug: 'tool-and-api-governance',
    title: 'Tool and API Governance',
    shortTitle: 'Tool Governance',
    summary:
      'Governs all interactions between autonomous systems and external tools, APIs, and services. This domain enforces invocation restrictions, prevents unauthorized tool chaining, validates the integrity and provenance of external tool outputs, and detects tool poisoning attacks. Each tool integration must declare its permission scope and undergo validation before production use.',
    acrCount: 28,
    applicability: { L1: true, L2: true, L3: true },
    riskRationale:
      'Tool and API integrations represent the primary attack surface for agent-based systems. Unauthorized tool chaining can lead to privilege escalation, data exfiltration, or execution of unintended workflows. Compromised tool outputs can propagate corrupted data through the entire decision pipeline.',
    versionIntroduced: '1.0',
  },
  {
    id: 4,
    slug: 'identity-and-permission-containment',
    title: 'Identity and Permission Containment',
    shortTitle: 'Identity Containment',
    summary:
      'Prevents privilege escalation and enforces strict identity isolation across all system components and tenant boundaries. This domain requires session-scoped permissions that cannot persist beyond their intended lifecycle, cross-tenant data leakage prevention, and cryptographic identity verification for inter-component communication. All permission grants must follow the principle of least privilege.',
    acrCount: 22,
    applicability: { L1: true, L2: true, L3: true },
    riskRationale:
      'Identity and permission failures in autonomous systems can result in unauthorized access to protected resources, cross-tenant data exposure, and lateral movement across system boundaries. These failures are especially dangerous in multi-agent architectures where a single compromised identity can cascade across the entire agent network.',
    versionIntroduced: '1.0',
  },
  {
    id: 5,
    slug: 'failure-mode-containment',
    title: 'Failure Mode Containment',
    shortTitle: 'Failure Containment',
    summary:
      'Requires systems to detect anomalous outputs and transition to defined safe fallback states when failures occur. This domain mandates escalation procedures with full context preservation, circuit breaker mechanisms to prevent fault propagation, and structured fault injection testing as part of the certification evaluation process. Failure modes must be enumerated and tested prior to deployment.',
    acrCount: 28,
    applicability: { L1: true, L2: true, L3: true },
    riskRationale:
      'Autonomous systems that fail silently or unpredictably pose severe operational risks. Without structured failure containment, a single component fault can propagate through the system, producing cascading failures that are difficult to diagnose and recover from. Safe degradation pathways are essential for maintaining operational continuity.',
    versionIntroduced: '1.0',
  },
  {
    id: 6,
    slug: 'behavioral-reliability-under-stress',
    title: 'Behavioral Reliability Under Stress',
    shortTitle: 'Behavioral Reliability',
    summary:
      'Validates that autonomous systems maintain consistent and correct behavior under adverse operating conditions. This domain covers multi-turn coherence across extended interactions, resistance to context compression artifacts, memory integrity under load, stability during concurrent access, and behavioral consistency across version transitions. Stress testing must simulate realistic adversarial operating conditions.',
    acrCount: 32,
    applicability: { L1: true, L2: true, L3: true },
    riskRationale:
      'Systems that behave correctly under normal conditions but degrade under stress represent a latent reliability risk. Context window exhaustion, concurrent request contention, and version transitions are common operational stressors that can cause subtle behavioral shifts, instruction drift, or complete output degradation without explicit error signals.',
    versionIntroduced: '1.0',
  },
  {
    id: 7,
    slug: 'adversarial-robustness',
    title: 'Adversarial Robustness',
    shortTitle: 'Adversarial Robustness',
    summary:
      'Validates system resilience against deliberate adversarial attacks including direct and indirect prompt injection, role confusion, jailbreak attempts, and multi-step attack sequences. This domain requires demonstrated resistance rates of 95% or higher against known attack taxonomies, validated through structured red team exercises. Defense mechanisms must be tested against evolving attack methodologies.',
    acrCount: 38,
    applicability: { L1: true, L2: true, L3: true },
    riskRationale:
      'Adversarial attacks against autonomous systems are increasing in sophistication and frequency. A system that can be manipulated through prompt injection, role confusion, or multi-step social engineering represents an active security vulnerability. Failure to resist these attacks can result in unauthorized actions, data disclosure, or complete system compromise.',
    versionIntroduced: '1.0',
  },
  {
    id: 8,
    slug: 'drift-detection-and-stability',
    title: 'Drift Detection and Stability',
    shortTitle: 'Drift Detection',
    summary:
      'Monitors autonomous system behavior over time to detect output distribution drift, behavioral variance, and silent degradation. This domain requires continuous change logging, automated revalidation triggers when drift thresholds are exceeded, and documented rollback procedures for reverting to last-known-good configurations. Drift baselines must be established during initial certification.',
    acrCount: 24,
    applicability: { L1: true, L2: true, L3: true },
    riskRationale:
      'Model updates, data distribution shifts, and environmental changes can cause autonomous systems to deviate from their certified behavioral profile without triggering explicit errors. Undetected drift erodes the validity of the original certification assessment and can result in gradually worsening performance that goes unnoticed until a critical failure occurs.',
    versionIntroduced: '1.0',
  },
  {
    id: 9,
    slug: 'monitoring-and-telemetry',
    title: 'Monitoring and Telemetry',
    shortTitle: 'Monitoring',
    summary:
      'Mandates comprehensive observability infrastructure for certified autonomous systems. This domain requires action trace logging for all system operations, decision boundary logging that captures the inputs and thresholds governing each output, full interaction replay capability, real-time anomaly alerting, and tamper-evident log storage. Telemetry must be sufficient to reconstruct any system action post-hoc.',
    acrCount: 26,
    applicability: { L1: true, L2: true, L3: true },
    riskRationale:
      'Without adequate monitoring and telemetry, it is impossible to verify that a certified system continues to operate within its approved parameters. Insufficient logging prevents post-incident analysis, regulatory compliance demonstration, and ongoing certification maintenance. Tamper-evident logging is essential to ensure that audit records have not been altered.',
    versionIntroduced: '1.0',
  },
  {
    id: 10,
    slug: 'escalation-and-human-override',
    title: 'Escalation and Human Override',
    shortTitle: 'Human Override',
    summary:
      'Ensures that certified systems provide reliable mechanisms for human intervention at all times. This domain requires emergency halt capability that cannot be circumvented by the autonomous system, human override pathways for all critical operations, automatic escalation of high-risk decisions, and non-disableable escalation pathways that remain functional even during system malfunction.',
    acrCount: 22,
    applicability: { L1: true, L2: true, L3: true },
    riskRationale:
      'The ability for human operators to intervene in and halt autonomous system operations is a foundational safety requirement. Systems that lack reliable override mechanisms or that can suppress escalation pathways represent an unacceptable operational risk, particularly in contexts where autonomous actions have irreversible consequences.',
    versionIntroduced: '1.0',
  },
  {
    id: 11,
    slug: 'auditability-and-transparency',
    title: 'Auditability and Transparency',
    shortTitle: 'Auditability',
    summary:
      'Requires that all certified systems produce comprehensive, exportable audit artifacts sufficient for independent third-party review. This domain covers decision log completeness, version-controlled audit trail maintenance, standardized export formats for regulatory submission, and the ability for external auditors to replay system interactions against recorded inputs.',
    acrCount: 24,
    applicability: { L1: true, L2: true, L3: true },
    riskRationale:
      'Regulatory frameworks increasingly require demonstrable evidence of autonomous system behavior over time. Systems that cannot produce complete, verifiable audit trails fail to meet the evidentiary standards required by oversight bodies. Without transparency mechanisms, organizations cannot demonstrate compliance or identify the root cause of adverse outcomes.',
    versionIntroduced: '1.0',
  },
  {
    id: 12,
    slug: 'operational-governance-controls',
    title: 'Operational Governance Controls',
    shortTitle: 'Governance Controls',
    summary:
      'Establishes the organizational and procedural controls required to maintain certified system integrity throughout the operational lifecycle. This domain covers update process documentation, formal change control procedures, versioned release logs, promotion gates between environments, incident response procedures, and maintenance of a risk register tied to certification scope.',
    acrCount: 22,
    applicability: { L1: true, L2: true, L3: true },
    riskRationale:
      'Technical controls are insufficient without corresponding operational governance. Uncontrolled updates, undocumented changes, and absent incident response procedures can invalidate a system certification even when the underlying technology remains compliant. Governance controls ensure that organizational processes support and maintain the certified state.',
    versionIntroduced: '1.0',
  },
  {
    id: 13,
    slug: 'physical-actuation-integrity',
    title: 'Physical Actuation Integrity',
    shortTitle: 'Physical Actuation',
    summary:
      'Extension domain for autonomous systems that interact with the physical environment through sensors and actuators. This domain covers sensor tolerance validation, actuator state monitoring, hardware emergency stop mechanisms, human proximity safeguards, and redundant safety pathways. Required for all L3-certified physical systems and L2 systems with physical actuation capabilities.',
    acrCount: 30,
    applicability: { L1: false, L2: false, L3: true },
    riskRationale:
      'Autonomous systems that control physical actuators introduce risks of bodily harm, property damage, and environmental contamination that do not exist in purely digital systems. Sensor failures, actuator malfunctions, and insufficient proximity safeguards can result in physical injury or death. This domain addresses the unique safety requirements of cyber-physical autonomous systems.',
    versionIntroduced: '1.0',
  },
];
