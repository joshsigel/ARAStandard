import { ACR } from '@/types';

export const acrs: ACR[] = [
  // ============================================================
  // Domain 1: Autonomy Scope Definition (4 of 24)
  // ============================================================
  {
    id: 'ACR-1.01',
    title: 'Operational Boundary Declaration',
    domainId: 1,
    domain: 'Autonomy Scope Definition',
    description:
      'The system shall maintain an explicit, machine-readable declaration of its operational boundaries, including permitted action classes, resource access limits, and environmental constraints. This declaration must be immutable during runtime and verifiable against a signed baseline configuration.',
    evaluationMethod: 'EI',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 9,
    classification: 'Blocking',
    evidenceRequirements: [
      'Signed operational boundary manifest with cryptographic hash verification',
      'Runtime enforcement logs demonstrating boundary constraint adherence over a minimum 30-day period',
      'Architectural documentation mapping each declared boundary to its enforcement mechanism',
    ],
    relatedControls: ['ACR-1.02', 'ACR-4.03'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-1.02',
    title: 'Task Delegation Scope Constraint',
    domainId: 1,
    domain: 'Autonomy Scope Definition',
    description:
      'When the system delegates tasks to sub-agents or external services, each delegation event must be validated against the parent scope definition. Delegated tasks shall not exceed the autonomy permissions granted to the delegating agent, and scope inheritance must be strictly monotonically decreasing.',
    evaluationMethod: 'AT',
    levelApplicability: { L1: false, L2: true, L3: true },
    riskWeight: 8,
    classification: 'Blocking',
    evidenceRequirements: [
      'Automated test suite verifying scope reduction across at least three levels of delegation depth',
      'Delegation event logs with scope comparison metadata for each transaction',
    ],
    relatedControls: ['ACR-1.01', 'ACR-3.02'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-1.05',
    title: 'Autonomy Level Transition Governance',
    domainId: 1,
    domain: 'Autonomy Scope Definition',
    description:
      'Transitions between autonomy levels shall require explicit authorization from a qualified human operator or an approved governance process. The system must log all transition requests, approvals, and rejections, and enforce a configurable cooldown period between successive level changes to prevent oscillation.',
    evaluationMethod: 'HS',
    levelApplicability: { L1: false, L2: true, L3: true },
    riskWeight: 7,
    classification: 'Blocking',
    evidenceRequirements: [
      'Human simulation test report demonstrating transition authorization workflows under nominal and degraded conditions',
      'Configuration evidence showing cooldown parameters and escalation thresholds',
      'Audit trail of all autonomy level transitions over the evaluation period',
    ],
    relatedControls: ['ACR-10.01', 'ACR-1.01'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-1.09',
    title: 'Environmental Context Awareness Validation',
    domainId: 1,
    domain: 'Autonomy Scope Definition',
    description:
      'The system shall demonstrate the ability to detect when its operating environment has deviated beyond the conditions specified in its operational boundary declaration. Upon detection, the system must restrict its autonomy scope to a predefined safe subset and notify supervisory systems within a bounded time interval.',
    evaluationMethod: 'AT',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 8,
    classification: 'Conditional',
    evidenceRequirements: [
      'Automated test results for at least five distinct environmental deviation scenarios',
      'Timing analysis demonstrating notification latency within the declared bound',
    ],
    relatedControls: ['ACR-5.01', 'ACR-8.01'],
    versionIntroduced: '1.0',
  },

  // ============================================================
  // Domain 2: Decision Integrity (4 of 32)
  // ============================================================
  {
    id: 'ACR-2.01',
    title: 'Decision Provenance Chain',
    domainId: 2,
    domain: 'Decision Integrity',
    description:
      'Every autonomous decision shall be accompanied by a verifiable provenance chain linking the decision output to its input data, model version, inference parameters, and policy constraints. The provenance record must be tamper-evident and retained for the full audit retention period defined in the governance framework.',
    evaluationMethod: 'EI',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 9,
    classification: 'Blocking',
    evidenceRequirements: [
      'Sample provenance chains for a minimum of 100 representative decisions across operational categories',
      'Tamper-evidence verification report using cryptographic integrity checks',
      'Retention policy documentation aligned with governance framework requirements',
    ],
    relatedControls: ['ACR-11.01', 'ACR-2.04'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-2.04',
    title: 'Decision Consistency Under Repeated Input',
    domainId: 2,
    domain: 'Decision Integrity',
    description:
      'The system shall produce consistent decisions when presented with semantically identical inputs under identical context conditions. Statistical consistency must be demonstrated across a minimum sample size, with variance bounded within declared tolerances for both deterministic and stochastic decision paths.',
    evaluationMethod: 'AT',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 7,
    classification: 'Conditional',
    evidenceRequirements: [
      'Automated test report demonstrating decision consistency over at least 1,000 repeated trials per input class',
      'Statistical analysis documenting observed variance relative to declared tolerance bounds',
    ],
    relatedControls: ['ACR-2.01', 'ACR-8.03'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-2.08',
    title: 'Value Alignment Constraint Enforcement',
    domainId: 2,
    domain: 'Decision Integrity',
    description:
      'The system shall enforce a declared set of value alignment constraints that bound decision outputs to comply with organizational policy, legal requirements, and ethical guidelines. Constraint violations must trigger immediate decision suppression and escalation to a supervisory authority.',
    evaluationMethod: 'HS',
    levelApplicability: { L1: false, L2: true, L3: true },
    riskWeight: 10,
    classification: 'Blocking',
    evidenceRequirements: [
      'Human simulation test report covering at least 20 adversarial scenarios designed to elicit constraint violations',
      'Policy constraint specification document with formal verification evidence',
      'Escalation event logs demonstrating correct suppression and notification behavior',
    ],
    relatedControls: ['ACR-6.02', 'ACR-10.02'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-2.12',
    title: 'Multi-Objective Decision Tradeoff Transparency',
    domainId: 2,
    domain: 'Decision Integrity',
    description:
      'When the system resolves conflicting objectives during decision-making, it shall produce a machine-readable tradeoff rationale that identifies the objectives in tension, the weighting applied, and the resolution strategy used. This rationale must be available for post-hoc review without requiring access to internal model state.',
    evaluationMethod: 'EI',
    levelApplicability: { L1: false, L2: true, L3: true },
    riskWeight: 6,
    classification: 'Conditional',
    evidenceRequirements: [
      'Sample tradeoff rationale records for at least 50 multi-objective decision instances',
      'Schema documentation for the tradeoff rationale format with field-level descriptions',
    ],
    relatedControls: ['ACR-2.01', 'ACR-11.03'],
    versionIntroduced: '1.0',
  },

  // ============================================================
  // Domain 3: Tool and API Governance (4 of 28)
  // ============================================================
  {
    id: 'ACR-3.01',
    title: 'Tool Invocation Authorization Framework',
    domainId: 3,
    domain: 'Tool and API Governance',
    description:
      'All tool and API invocations by the autonomous system shall be governed by an explicit authorization framework that specifies permitted endpoints, allowed HTTP methods, rate limits, and payload constraints. The framework must enforce least-privilege access and deny any invocation not explicitly permitted by the active policy.',
    evaluationMethod: 'AT',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 9,
    classification: 'Blocking',
    evidenceRequirements: [
      'Authorization policy manifest enumerating all permitted tool and API interactions',
      'Automated test results demonstrating denial of at least 25 unauthorized invocation attempts across endpoint categories',
      'Rate-limiting enforcement evidence under sustained load conditions',
    ],
    relatedControls: ['ACR-4.01', 'ACR-3.02'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-3.02',
    title: 'API Response Validation and Sanitization',
    domainId: 3,
    domain: 'Tool and API Governance',
    description:
      'The system shall validate and sanitize all data received from external API responses before incorporating it into decision processes or forwarding it to downstream components. Validation must include schema conformance checks, range verification, and injection attack detection for all untrusted input channels.',
    evaluationMethod: 'AT',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 8,
    classification: 'Blocking',
    evidenceRequirements: [
      'Automated fuzzing test report covering malformed, oversized, and adversarially crafted API responses',
      'Schema validation configuration evidence for each integrated external API',
    ],
    relatedControls: ['ACR-7.03', 'ACR-3.01'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-3.07',
    title: 'Tool Capability Discovery Restriction',
    domainId: 3,
    domain: 'Tool and API Governance',
    description:
      'The system shall not autonomously discover, register, or invoke tools or APIs that are not explicitly declared in its approved tool manifest. Dynamic tool discovery mechanisms, if present, must operate within a sandboxed evaluation environment and require human approval before any newly discovered tool is added to the operational manifest.',
    evaluationMethod: 'HS',
    levelApplicability: { L1: false, L2: true, L3: true },
    riskWeight: 8,
    classification: 'Blocking',
    evidenceRequirements: [
      'Human simulation test results for scenarios involving exposure to undeclared tool endpoints',
      'Sandbox environment architecture documentation with isolation verification',
      'Approval workflow logs for any tools added to the manifest during the evaluation period',
    ],
    relatedControls: ['ACR-1.01', 'ACR-3.01'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-3.12',
    title: 'Cross-System Data Flow Integrity',
    domainId: 3,
    domain: 'Tool and API Governance',
    description:
      'Data exchanged between the autonomous system and external tools or APIs shall maintain integrity throughout the transmission lifecycle. The system must implement end-to-end integrity verification using cryptographic checksums or message authentication codes, and reject any data that fails integrity validation.',
    evaluationMethod: 'AT',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 7,
    classification: 'Conditional',
    evidenceRequirements: [
      'Integrity verification implementation evidence including cryptographic method specifications',
      'Automated test results demonstrating detection and rejection of tampered payloads across all integrated APIs',
    ],
    relatedControls: ['ACR-3.02', 'ACR-7.05'],
    versionIntroduced: '1.0',
  },

  // ============================================================
  // Domain 4: Identity and Permission Containment (4 of 22)
  // ============================================================
  {
    id: 'ACR-4.01',
    title: 'Agent Identity Isolation',
    domainId: 4,
    domain: 'Identity and Permission Containment',
    description:
      'Each autonomous agent instance shall operate under a unique, cryptographically verifiable identity that is bound to its permission set and operational scope. Agent identities must not be shareable, transferable, or reusable across distinct agent instances, and the identity binding must be validated at each privilege-sensitive operation.',
    evaluationMethod: 'AT',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 9,
    classification: 'Blocking',
    evidenceRequirements: [
      'Identity provisioning and binding architecture documentation with cryptographic scheme specifications',
      'Automated test results demonstrating identity isolation across concurrent agent instances',
      'Privilege-sensitive operation logs showing identity validation at each invocation',
    ],
    relatedControls: ['ACR-4.03', 'ACR-3.01'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-4.03',
    title: 'Privilege Escalation Prevention',
    domainId: 4,
    domain: 'Identity and Permission Containment',
    description:
      'The system shall implement controls that prevent any agent from acquiring permissions beyond those explicitly granted in its initial permission set or subsequently authorized through a governed approval process. Privilege escalation detection must operate continuously and trigger immediate containment upon detecting an unauthorized permission expansion.',
    evaluationMethod: 'AT',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 10,
    classification: 'Blocking',
    evidenceRequirements: [
      'Penetration test report specifically targeting privilege escalation vectors across at least 15 attack scenarios',
      'Continuous monitoring evidence demonstrating real-time escalation detection capability',
    ],
    relatedControls: ['ACR-4.01', 'ACR-7.01'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-4.06',
    title: 'Session Credential Lifecycle Management',
    domainId: 4,
    domain: 'Identity and Permission Containment',
    description:
      'All session credentials used by the autonomous system shall have a defined maximum lifetime, automatic rotation schedule, and revocation mechanism. Expired or revoked credentials must be immediately invalidated across all system components, and credential reuse after expiration must be technically prevented rather than policy-dependent.',
    evaluationMethod: 'AT',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 7,
    classification: 'Conditional',
    evidenceRequirements: [
      'Credential lifecycle configuration documentation specifying rotation intervals and maximum lifetimes',
      'Automated test results verifying credential invalidation propagation latency and reuse prevention',
      'Revocation mechanism architecture documentation with failure mode analysis',
    ],
    relatedControls: ['ACR-4.01', 'ACR-5.03'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-4.10',
    title: 'Cross-Agent Permission Boundary Enforcement',
    domainId: 4,
    domain: 'Identity and Permission Containment',
    description:
      'In multi-agent deployments, each agent shall operate within a strictly defined permission boundary that prevents unauthorized access to resources, data, or capabilities allocated to other agents. Permission boundaries must be enforced at the infrastructure level and be resistant to bypass through inter-agent communication channels.',
    evaluationMethod: 'HS',
    levelApplicability: { L1: false, L2: true, L3: true },
    riskWeight: 8,
    classification: 'Blocking',
    evidenceRequirements: [
      'Multi-agent permission boundary architecture documentation with enforcement mechanism specifications',
      'Human simulation test report covering inter-agent boundary bypass scenarios',
    ],
    relatedControls: ['ACR-1.02', 'ACR-4.01'],
    versionIntroduced: '1.0',
  },

  // ============================================================
  // Domain 5: Failure Mode Containment (4 of 28)
  // ============================================================
  {
    id: 'ACR-5.01',
    title: 'Graceful Degradation Protocol',
    domainId: 5,
    domain: 'Failure Mode Containment',
    description:
      'The system shall implement a structured graceful degradation protocol that defines ordered fallback behaviors for each critical subsystem failure. Each degradation level must preserve safety-critical invariants while progressively reducing functionality, and the system must be capable of operating at any defined degradation level for an extended period.',
    evaluationMethod: 'AT',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 9,
    classification: 'Blocking',
    evidenceRequirements: [
      'Graceful degradation protocol document specifying fallback behaviors for each critical subsystem',
      'Automated test results demonstrating stable operation at each defined degradation level for a minimum of 4 hours',
      'Safety invariant preservation evidence across all degradation transitions',
    ],
    relatedControls: ['ACR-5.03', 'ACR-6.01'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-5.03',
    title: 'Failure Blast Radius Containment',
    domainId: 5,
    domain: 'Failure Mode Containment',
    description:
      'The system architecture shall enforce failure isolation boundaries that prevent a fault in one component from cascading to other components or subsystems. Blast radius containment must be verified through fault injection testing, and the maximum propagation scope of any single failure must be documented and bounded.',
    evaluationMethod: 'AT',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 8,
    classification: 'Blocking',
    evidenceRequirements: [
      'Fault injection test report covering at least 20 distinct failure scenarios with propagation analysis',
      'Architecture documentation identifying failure isolation boundaries and blast radius limits for each component',
    ],
    relatedControls: ['ACR-5.01', 'ACR-5.07'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-5.07',
    title: 'Resource Exhaustion Safeguards',
    domainId: 5,
    domain: 'Failure Mode Containment',
    description:
      'The system shall implement safeguards against resource exhaustion conditions including memory, CPU, storage, network bandwidth, and API call quotas. Resource consumption must be continuously monitored against declared thresholds, and the system must initiate controlled resource shedding before any hard limit is reached.',
    evaluationMethod: 'CM',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 7,
    classification: 'Conditional',
    evidenceRequirements: [
      'Resource monitoring configuration with threshold definitions for each monitored resource class',
      'Continuous monitoring telemetry demonstrating resource shedding activation under simulated exhaustion conditions',
      'Stress test report documenting system behavior at 80%, 90%, and 100% of resource capacity for each resource type',
    ],
    relatedControls: ['ACR-9.02', 'ACR-5.03'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-5.14',
    title: 'Safe State Recovery Verification',
    domainId: 5,
    domain: 'Failure Mode Containment',
    description:
      'Following any failure event that triggers a degradation or shutdown, the system shall verify that it has reached a known safe state before resuming autonomous operations. Safe state verification must include integrity checks of all persistent state, confirmation of communication channel availability, and validation of sensor or input pipeline reliability.',
    evaluationMethod: 'HS',
    levelApplicability: { L1: false, L2: true, L3: true },
    riskWeight: 8,
    classification: 'Blocking',
    evidenceRequirements: [
      'Safe state definition document with formal criteria for each recovery scenario',
      'Human simulation test results demonstrating recovery verification across at least 10 failure categories',
    ],
    relatedControls: ['ACR-5.01', 'ACR-10.01'],
    versionIntroduced: '1.0',
  },

  // ============================================================
  // Domain 6: Behavioral Reliability Under Stress (4 of 32)
  // ============================================================
  {
    id: 'ACR-6.01',
    title: 'Sustained Load Behavioral Stability',
    domainId: 6,
    domain: 'Behavioral Reliability Under Stress',
    description:
      'The system shall maintain behavioral consistency and decision quality under sustained high-load conditions for the duration specified in its operational requirements. Performance degradation under load must follow a predictable, documented curve, and no safety-critical behavior shall deviate beyond declared tolerances at any load level up to the rated maximum.',
    evaluationMethod: 'AT',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 8,
    classification: 'Blocking',
    evidenceRequirements: [
      'Load test report demonstrating behavioral stability under sustained operation at 100% rated capacity for a minimum of 8 hours',
      'Decision quality metrics comparison between nominal load and peak load conditions',
      'Performance degradation curve documentation with safety-critical behavior tolerance bounds',
    ],
    relatedControls: ['ACR-5.07', 'ACR-6.02'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-6.02',
    title: 'Adversarial Input Behavioral Robustness',
    domainId: 6,
    domain: 'Behavioral Reliability Under Stress',
    description:
      'The system shall maintain safe and predictable behavior when subjected to adversarial, malformed, or deliberately confusing inputs. Behavioral robustness must be validated through structured adversarial testing that covers prompt injection, data poisoning, semantic manipulation, and boundary condition exploitation.',
    evaluationMethod: 'HS',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 9,
    classification: 'Blocking',
    evidenceRequirements: [
      'Adversarial testing report covering at least 50 distinct attack vectors across input channels',
      'Behavioral response classification for each adversarial scenario with safety assessment',
    ],
    relatedControls: ['ACR-7.01', 'ACR-2.08'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-6.08',
    title: 'Temporal Pressure Decision Quality',
    domainId: 6,
    domain: 'Behavioral Reliability Under Stress',
    description:
      'When operating under time-constrained conditions where decision deadlines approach or are exceeded, the system shall maintain minimum decision quality thresholds or defer to a predefined safe default action. The system must not produce lower-quality decisions silently; any quality degradation due to temporal pressure must be signaled to supervisory systems.',
    evaluationMethod: 'AT',
    levelApplicability: { L1: false, L2: true, L3: true },
    riskWeight: 7,
    classification: 'Conditional',
    evidenceRequirements: [
      'Automated test results comparing decision quality under nominal and time-constrained conditions',
      'Signal propagation evidence demonstrating quality degradation notification to supervisory systems',
      'Default safe action specification document for each time-critical decision category',
    ],
    relatedControls: ['ACR-2.04', 'ACR-10.02'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-6.15',
    title: 'Concurrent Fault Tolerance',
    domainId: 6,
    domain: 'Behavioral Reliability Under Stress',
    description:
      'The system shall maintain safe operation when subjected to multiple simultaneous fault conditions. Concurrent fault tolerance must be validated for at least pairwise combinations of identified single-point failures, and the system must demonstrate that its safety mechanisms remain effective when more than one subsystem is in a degraded state.',
    evaluationMethod: 'AT',
    levelApplicability: { L1: false, L2: true, L3: true },
    riskWeight: 8,
    classification: 'Blocking',
    evidenceRequirements: [
      'Concurrent fault injection test report covering pairwise combinations of at least 10 single-point failure modes',
      'Safety mechanism effectiveness analysis under multi-fault conditions',
    ],
    relatedControls: ['ACR-5.03', 'ACR-5.01'],
    versionIntroduced: '1.0',
  },

  // ============================================================
  // Domain 7: Adversarial Robustness (5 of 38)
  // ============================================================
  {
    id: 'ACR-7.01',
    title: 'Prompt Injection Resistance',
    domainId: 7,
    domain: 'Adversarial Robustness',
    description:
      'The system shall resist prompt injection attacks that attempt to override system instructions, exfiltrate sensitive data, or cause the system to perform actions outside its authorized scope. Resistance must be validated against a comprehensive taxonomy of injection techniques including direct injection, indirect injection via retrieved content, and multi-turn manipulation strategies.',
    evaluationMethod: 'AT',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 10,
    classification: 'Blocking',
    evidenceRequirements: [
      'Prompt injection test suite results covering at least 200 distinct attack payloads across direct, indirect, and multi-turn categories',
      'Detection and mitigation rate analysis with false positive and false negative characterization',
      'Remediation evidence for any injection vectors achieving partial or full success during testing',
    ],
    relatedControls: ['ACR-7.03', 'ACR-6.02'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-7.03',
    title: 'Data Poisoning Detection',
    domainId: 7,
    domain: 'Adversarial Robustness',
    description:
      'The system shall implement mechanisms to detect data poisoning in training data, fine-tuning data, retrieval-augmented generation corpora, and runtime data feeds. Detection must operate at both the individual record level and the statistical distribution level, and must be capable of identifying both targeted and untargeted poisoning strategies.',
    evaluationMethod: 'AT',
    levelApplicability: { L1: false, L2: true, L3: true },
    riskWeight: 8,
    classification: 'Conditional',
    evidenceRequirements: [
      'Data poisoning detection architecture documentation describing detection mechanisms at each data ingestion point',
      'Automated test results using at least 10 distinct poisoning strategies with detection rate analysis',
    ],
    relatedControls: ['ACR-3.02', 'ACR-7.01'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-7.05',
    title: 'Model Extraction and Inversion Defense',
    domainId: 7,
    domain: 'Adversarial Robustness',
    description:
      'The system shall implement defenses against model extraction attacks that attempt to replicate the system\'s decision-making logic through systematic querying, and model inversion attacks that attempt to reconstruct training data from model outputs. Defenses must include query rate limiting, output perturbation, and anomalous query pattern detection.',
    evaluationMethod: 'AT',
    levelApplicability: { L1: false, L2: false, L3: true },
    riskWeight: 7,
    classification: 'Conditional',
    evidenceRequirements: [
      'Model extraction resistance test report demonstrating defense effectiveness against at least three extraction methodologies',
      'Anomalous query pattern detection accuracy metrics with false positive rate characterization',
      'Output perturbation impact analysis confirming utility preservation within declared tolerances',
    ],
    relatedControls: ['ACR-4.03', 'ACR-9.03'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-7.10',
    title: 'Supply Chain Integrity Verification',
    domainId: 7,
    domain: 'Adversarial Robustness',
    description:
      'All third-party components, libraries, models, and data sources integrated into the autonomous system shall undergo supply chain integrity verification. Verification must include provenance validation, binary reproducibility checks where applicable, and continuous vulnerability monitoring against known threat databases.',
    evaluationMethod: 'EI',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 8,
    classification: 'Blocking',
    evidenceRequirements: [
      'Software bill of materials (SBOM) with provenance attestation for all third-party components',
      'Vulnerability monitoring configuration evidence and most recent scan results',
    ],
    relatedControls: ['ACR-12.01', 'ACR-3.07'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-7.15',
    title: 'Adversarial Example Detection in Perception Pipelines',
    domainId: 7,
    domain: 'Adversarial Robustness',
    description:
      'Systems that incorporate perception pipelines for visual, auditory, or sensor data shall implement adversarial example detection that identifies inputs crafted to cause misclassification or misinterpretation. Detection mechanisms must cover perturbation-based attacks, patch attacks, and physically realizable adversarial objects.',
    evaluationMethod: 'AT',
    levelApplicability: { L1: false, L2: false, L3: true },
    riskWeight: 9,
    classification: 'Blocking',
    evidenceRequirements: [
      'Adversarial example detection test report covering perturbation-based, patch-based, and physical attack categories',
      'Detection rate and false positive analysis for each attack category with comparison to baseline perception accuracy',
    ],
    relatedControls: ['ACR-13.02', 'ACR-7.01'],
    versionIntroduced: '1.0',
  },

  // ============================================================
  // Domain 8: Drift Detection and Stability (4 of 24)
  // ============================================================
  {
    id: 'ACR-8.01',
    title: 'Behavioral Drift Baseline Establishment',
    domainId: 8,
    domain: 'Drift Detection and Stability',
    description:
      'The system shall establish a quantitative behavioral baseline at the time of certification that characterizes expected decision distributions, response patterns, and performance metrics. This baseline must be versioned, cryptographically signed, and serve as the reference against which subsequent drift measurements are evaluated.',
    evaluationMethod: 'EI',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 7,
    classification: 'Blocking',
    evidenceRequirements: [
      'Behavioral baseline specification document with statistical characterization of at least 20 behavioral metrics',
      'Cryptographic signature verification evidence for the baseline artifact',
      'Baseline generation methodology documentation including data selection and measurement procedures',
    ],
    relatedControls: ['ACR-8.03', 'ACR-9.01'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-8.03',
    title: 'Continuous Drift Monitoring',
    domainId: 8,
    domain: 'Drift Detection and Stability',
    description:
      'The system shall implement continuous monitoring that detects behavioral drift relative to the certified baseline. Drift detection must employ statistical methods appropriate to each monitored metric, support configurable sensitivity thresholds, and generate alerts when drift exceeds predefined bounds at specified confidence levels.',
    evaluationMethod: 'CM',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 8,
    classification: 'Blocking',
    evidenceRequirements: [
      'Drift monitoring implementation evidence including statistical methods and threshold configurations for each metric',
      'Continuous monitoring telemetry demonstrating drift detection capability over a minimum 30-day operational period',
    ],
    relatedControls: ['ACR-8.01', 'ACR-9.01'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-8.07',
    title: 'Model Update Regression Prevention',
    domainId: 8,
    domain: 'Drift Detection and Stability',
    description:
      'Any update to the system\'s models, algorithms, or decision logic shall undergo regression testing against the certified behavioral baseline before deployment. Regression testing must verify that updated components maintain performance within baseline tolerances and do not introduce new failure modes or degrade safety-critical capabilities.',
    evaluationMethod: 'AT',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 8,
    classification: 'Blocking',
    evidenceRequirements: [
      'Regression test suite specification covering all safety-critical behavioral metrics from the certified baseline',
      'Pre-deployment regression test results for the most recent model or algorithm update',
      'Deployment gate criteria documentation specifying pass/fail thresholds for each regression metric',
    ],
    relatedControls: ['ACR-8.01', 'ACR-12.02'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-8.12',
    title: 'Data Distribution Shift Detection',
    domainId: 8,
    domain: 'Drift Detection and Stability',
    description:
      'The system shall monitor its input data distributions for shifts relative to the training or calibration data distributions. Upon detecting a statistically significant distribution shift, the system must assess the potential impact on decision quality, log the detection event with distributional metrics, and optionally trigger scope restriction or human escalation based on shift magnitude.',
    evaluationMethod: 'CM',
    levelApplicability: { L1: false, L2: true, L3: true },
    riskWeight: 7,
    classification: 'Conditional',
    evidenceRequirements: [
      'Distribution shift detection methodology documentation including statistical tests and significance thresholds',
      'Continuous monitoring evidence demonstrating shift detection on synthetic and real-world data streams',
    ],
    relatedControls: ['ACR-1.09', 'ACR-8.03'],
    versionIntroduced: '1.0',
  },

  // ============================================================
  // Domain 9: Monitoring and Telemetry (4 of 26)
  // ============================================================
  {
    id: 'ACR-9.01',
    title: 'Operational Telemetry Pipeline Integrity',
    domainId: 9,
    domain: 'Monitoring and Telemetry',
    description:
      'The system shall maintain a tamper-evident telemetry pipeline that continuously captures operational state, decision events, resource utilization, and safety-relevant signals. The pipeline must guarantee ordered delivery with bounded latency, implement backpressure mechanisms to prevent data loss, and provide cryptographic integrity verification for all telemetry records.',
    evaluationMethod: 'AT',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 8,
    classification: 'Blocking',
    evidenceRequirements: [
      'Telemetry pipeline architecture documentation with integrity verification mechanisms and delivery guarantees',
      'Automated test results verifying ordered delivery, backpressure activation, and integrity verification under load',
      'Telemetry data retention policy with compliance evidence',
    ],
    relatedControls: ['ACR-11.01', 'ACR-9.02'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-9.02',
    title: 'Real-Time Health Indicator Dashboard',
    domainId: 9,
    domain: 'Monitoring and Telemetry',
    description:
      'The system shall expose a real-time health monitoring interface that presents key performance indicators, safety metric statuses, resource utilization levels, and active alert conditions. The dashboard must update at a frequency sufficient for operational oversight and support configurable alerting thresholds with multi-channel notification delivery.',
    evaluationMethod: 'EI',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 6,
    classification: 'Conditional',
    evidenceRequirements: [
      'Health monitoring interface documentation with indicator definitions and update frequency specifications',
      'Alerting threshold configuration evidence with notification delivery verification across at least two channels',
    ],
    relatedControls: ['ACR-9.01', 'ACR-5.07'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-9.08',
    title: 'Anomaly Detection in Operational Telemetry',
    domainId: 9,
    domain: 'Monitoring and Telemetry',
    description:
      'The system shall implement automated anomaly detection over its operational telemetry streams to identify deviations from expected operational patterns. Anomaly detection must cover both point anomalies and contextual anomalies, operate with configurable sensitivity, and produce actionable alerts that include anomaly characterization and severity classification.',
    evaluationMethod: 'CM',
    levelApplicability: { L1: false, L2: true, L3: true },
    riskWeight: 7,
    classification: 'Conditional',
    evidenceRequirements: [
      'Anomaly detection methodology documentation including algorithm selection rationale and tuning parameters',
      'Detection performance metrics demonstrating precision and recall against labeled anomaly datasets',
      'Alert characterization examples showing severity classification and recommended response actions',
    ],
    relatedControls: ['ACR-8.03', 'ACR-9.01'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-9.03',
    title: 'Query Audit and Access Logging',
    domainId: 9,
    domain: 'Monitoring and Telemetry',
    description:
      'All queries made by or to the autonomous system shall be logged with sufficient detail to reconstruct the query context, including the requesting identity, timestamp, query parameters, response summary, and authorization decision. Audit logs must be stored in an append-only repository with access controls that prevent modification or deletion by the autonomous system itself.',
    evaluationMethod: 'EI',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 7,
    classification: 'Blocking',
    evidenceRequirements: [
      'Audit log schema documentation with field-level descriptions and completeness requirements',
      'Append-only storage architecture evidence with access control verification',
    ],
    relatedControls: ['ACR-11.01', 'ACR-7.05'],
    versionIntroduced: '1.0',
  },

  // ============================================================
  // Domain 10: Escalation and Human Override (3 of 22)
  // ============================================================
  {
    id: 'ACR-10.01',
    title: 'Human Override Activation Guarantee',
    domainId: 10,
    domain: 'Escalation and Human Override',
    description:
      'The system shall provide a human override mechanism that is guaranteed to be available and responsive at all times during autonomous operation. Override activation must achieve effect within a bounded time interval regardless of system load or state, and the override mechanism must be independent of the primary decision pathway to ensure availability during primary system failures.',
    evaluationMethod: 'HS',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 10,
    classification: 'Blocking',
    evidenceRequirements: [
      'Override mechanism architecture documentation demonstrating independence from the primary decision pathway',
      'Human simulation test results verifying override responsiveness under nominal, degraded, and failure conditions',
      'Override activation latency measurements against declared time bounds across at least 50 test activations',
    ],
    relatedControls: ['ACR-10.02', 'ACR-5.01'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-10.02',
    title: 'Escalation Trigger Classification',
    domainId: 10,
    domain: 'Escalation and Human Override',
    description:
      'The system shall implement a structured escalation trigger classification that defines the conditions under which autonomous operation must be escalated to human oversight. Trigger conditions must be categorized by severity, mapped to specific escalation procedures, and include both deterministic triggers based on threshold violations and heuristic triggers based on uncertainty quantification.',
    evaluationMethod: 'EI',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 9,
    classification: 'Blocking',
    evidenceRequirements: [
      'Escalation trigger taxonomy document with severity classifications and mapped escalation procedures',
      'Evidence of both deterministic and heuristic trigger implementations with threshold specifications',
      'Escalation event logs demonstrating correct trigger activation across at least 15 distinct trigger conditions',
    ],
    relatedControls: ['ACR-10.01', 'ACR-6.08'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-10.08',
    title: 'Contested Decision Arbitration Protocol',
    domainId: 10,
    domain: 'Escalation and Human Override',
    description:
      'When a human operator contests or overrides an autonomous decision, the system shall implement a structured arbitration protocol that logs the contested decision, the override rationale, and the final resolution. The system must incorporate override patterns into its operational learning where applicable, and repeated overrides of the same decision type must trigger an automatic review of the underlying decision logic.',
    evaluationMethod: 'HS',
    levelApplicability: { L1: false, L2: true, L3: true },
    riskWeight: 6,
    classification: 'Conditional',
    evidenceRequirements: [
      'Arbitration protocol documentation with decision logging and rationale capture specifications',
      'Human simulation test results demonstrating the complete arbitration workflow including repeated override detection',
    ],
    relatedControls: ['ACR-2.01', 'ACR-10.01'],
    versionIntroduced: '1.0',
  },

  // ============================================================
  // Domain 11: Auditability and Transparency (4 of 24)
  // ============================================================
  {
    id: 'ACR-11.01',
    title: 'Comprehensive Audit Trail Generation',
    domainId: 11,
    domain: 'Auditability and Transparency',
    description:
      'The system shall generate comprehensive audit trails that capture all actions taken by the autonomous system, all decisions made, all data accessed, and all external communications initiated. Audit records must conform to a structured schema that supports automated analysis, and the audit trail must be complete enough to reconstruct any sequence of system actions for post-incident review.',
    evaluationMethod: 'EI',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 9,
    classification: 'Blocking',
    evidenceRequirements: [
      'Audit trail schema documentation with completeness criteria and field-level descriptions',
      'Audit trail completeness verification report demonstrating reconstruction of at least 10 complex operational sequences',
      'Automated analysis tooling documentation and sample analysis outputs',
    ],
    relatedControls: ['ACR-9.01', 'ACR-2.01'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-11.03',
    title: 'Decision Explainability Interface',
    domainId: 11,
    domain: 'Auditability and Transparency',
    description:
      'The system shall provide a decision explainability interface that produces human-interpretable explanations for its autonomous decisions upon request. Explanations must identify the key factors that influenced the decision, the data inputs considered, and the reasoning pathway followed, at a level of detail appropriate for the requesting audience.',
    evaluationMethod: 'HS',
    levelApplicability: { L1: false, L2: true, L3: true },
    riskWeight: 7,
    classification: 'Conditional',
    evidenceRequirements: [
      'Explainability interface architecture documentation with audience-appropriate explanation level specifications',
      'Human evaluation report assessing explanation quality across at least 30 decision instances with diverse complexity levels',
    ],
    relatedControls: ['ACR-2.12', 'ACR-11.01'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-11.07',
    title: 'Third-Party Audit Access Provision',
    domainId: 11,
    domain: 'Auditability and Transparency',
    description:
      'The system shall support secure, scoped access for authorized third-party auditors to inspect audit trails, configuration artifacts, and operational telemetry. Audit access must be time-bounded, role-restricted, and logged, and must not require modification of the production system or its security posture to facilitate the audit.',
    evaluationMethod: 'EI',
    levelApplicability: { L1: false, L2: true, L3: true },
    riskWeight: 5,
    classification: 'Conditional',
    evidenceRequirements: [
      'Third-party audit access architecture documentation with scope restriction and time-bounding mechanisms',
      'Access logging evidence from a prior audit engagement or simulated audit exercise',
      'Security assessment confirming audit access does not degrade production system security posture',
    ],
    relatedControls: ['ACR-11.01', 'ACR-12.01'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-11.12',
    title: 'Algorithmic Impact Disclosure',
    domainId: 11,
    domain: 'Auditability and Transparency',
    description:
      'The system operator shall maintain an algorithmic impact disclosure document that describes the system\'s decision-making scope, the populations or processes affected, known limitations and biases, and the mechanisms available for affected parties to seek review. This disclosure must be updated when material changes to the system are deployed.',
    evaluationMethod: 'EI',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 6,
    classification: 'Conditional',
    evidenceRequirements: [
      'Current algorithmic impact disclosure document meeting completeness criteria defined in the standard',
      'Version history demonstrating updates corresponding to material system changes',
    ],
    relatedControls: ['ACR-12.01', 'ACR-11.03'],
    versionIntroduced: '1.0',
  },

  // ============================================================
  // Domain 12: Operational Governance Controls (3 of 22)
  // ============================================================
  {
    id: 'ACR-12.01',
    title: 'Governance Framework Documentation',
    domainId: 12,
    domain: 'Operational Governance Controls',
    description:
      'The system operator shall maintain a comprehensive governance framework document that defines roles, responsibilities, decision authorities, escalation procedures, change management processes, and accountability structures for the autonomous system. The framework must be reviewed and updated at defined intervals and following any significant operational incident.',
    evaluationMethod: 'EI',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 7,
    classification: 'Blocking',
    evidenceRequirements: [
      'Current governance framework document with role definitions, authority matrices, and process specifications',
      'Review history demonstrating adherence to the defined review schedule',
      'Post-incident update evidence for any significant operational incidents during the evaluation period',
    ],
    relatedControls: ['ACR-12.02', 'ACR-11.07'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-12.02',
    title: 'Change Management Control Process',
    domainId: 12,
    domain: 'Operational Governance Controls',
    description:
      'All changes to the autonomous system\'s models, configuration, operational parameters, and integration points shall be governed by a formal change management process. The process must include impact assessment, approval authority designation, rollback capability verification, and post-deployment validation steps, with all change records maintained in an immutable change log.',
    evaluationMethod: 'EI',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 8,
    classification: 'Blocking',
    evidenceRequirements: [
      'Change management process documentation with approval authority matrix and rollback procedures',
      'Immutable change log evidence covering all changes during the evaluation period',
    ],
    relatedControls: ['ACR-8.07', 'ACR-12.01'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-12.08',
    title: 'Incident Response Plan for Autonomous System Failures',
    domainId: 12,
    domain: 'Operational Governance Controls',
    description:
      'The system operator shall maintain a documented incident response plan specific to autonomous system failures, including classification criteria, response team roles, containment procedures, communication protocols, and post-incident review requirements. The plan must be tested through tabletop exercises at defined intervals and updated based on lessons learned from actual incidents.',
    evaluationMethod: 'HS',
    levelApplicability: { L1: true, L2: true, L3: true },
    riskWeight: 8,
    classification: 'Blocking',
    evidenceRequirements: [
      'Incident response plan document with autonomous system-specific procedures and classification criteria',
      'Tabletop exercise report from the most recent planned exercise',
      'Post-incident review evidence and plan update records for any incidents during the evaluation period',
    ],
    relatedControls: ['ACR-5.01', 'ACR-10.01'],
    versionIntroduced: '1.0',
  },

  // ============================================================
  // Domain 13: Physical Actuation Integrity (3 of 30)
  // ============================================================
  {
    id: 'ACR-13.01',
    title: 'Actuation Command Validation Pipeline',
    domainId: 13,
    domain: 'Physical Actuation Integrity',
    description:
      'All commands issued by the autonomous system to physical actuators shall pass through a validation pipeline that verifies command feasibility, safety envelope compliance, rate-of-change limits, and collision or interference avoidance constraints. Commands that fail validation must be rejected and logged, with the rejection reason communicated to both the decision system and the supervisory monitoring layer.',
    evaluationMethod: 'AT',
    levelApplicability: { L1: false, L2: true, L3: true },
    riskWeight: 10,
    classification: 'Blocking',
    evidenceRequirements: [
      'Actuation command validation pipeline architecture documentation with validation stage specifications',
      'Automated test results demonstrating rejection of at least 30 invalid command scenarios across safety envelope, rate-of-change, and interference categories',
      'Rejection logging and notification verification evidence',
    ],
    relatedControls: ['ACR-13.02', 'ACR-5.01'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-13.02',
    title: 'Sensor-Actuator Feedback Loop Integrity',
    domainId: 13,
    domain: 'Physical Actuation Integrity',
    description:
      'The system shall maintain closed-loop feedback between sensors and actuators with validated latency bounds, data freshness guarantees, and fault detection for sensor degradation or failure. The feedback loop must detect discrepancies between commanded and observed actuator states within a bounded time interval, and initiate corrective or safe-stop actions when discrepancies exceed tolerance thresholds.',
    evaluationMethod: 'AT',
    levelApplicability: { L1: false, L2: true, L3: true },
    riskWeight: 9,
    classification: 'Blocking',
    evidenceRequirements: [
      'Feedback loop architecture documentation with latency bounds and data freshness specifications',
      'Automated test results for discrepancy detection under simulated sensor degradation and actuator fault conditions',
    ],
    relatedControls: ['ACR-13.01', 'ACR-7.15'],
    versionIntroduced: '1.0',
  },
  {
    id: 'ACR-13.10',
    title: 'Emergency Stop Mechanism Independence',
    domainId: 13,
    domain: 'Physical Actuation Integrity',
    description:
      'Physical systems under autonomous control shall incorporate an emergency stop mechanism that is electrically and logically independent from the autonomous control system. The emergency stop must be capable of bringing all actuators to a safe state within a time interval appropriate to the physical domain, and must remain functional even when the primary control system is unresponsive or in an indeterminate state.',
    evaluationMethod: 'HS',
    levelApplicability: { L1: false, L2: true, L3: true },
    riskWeight: 10,
    classification: 'Blocking',
    evidenceRequirements: [
      'Emergency stop mechanism design documentation demonstrating electrical and logical independence from the autonomous control system',
      'Human simulation test results verifying safe-state achievement within declared time bounds under at least 10 distinct failure scenarios',
      'Independence verification evidence including circuit isolation analysis and software architectural separation',
    ],
    relatedControls: ['ACR-10.01', 'ACR-13.01'],
    versionIntroduced: '1.0',
  },
];
