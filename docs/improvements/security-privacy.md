# Security and privacy improvement plan

## Purpose

Protect learner recordings, content integrity, local data, and the supply chain while keeping the app usable without accounts.

## Current proof-of-concept signals

- The web app is a Vue 3 proof of concept loaded from a CDN in `magic/index.html`.
- `magic/script.js` holds most state, mode logic, audio playback, recording, pitch comparison, and quiz behavior in one file.
- `magic/words_data.js` maps 414 image filenames to Hanzi, Pinyin, English, categories, tones, and classifiers.
- `magic/audio/` and `magic/images/` each contain 414 assets, so offline behavior and asset weight matter.
- Capacitor targets iOS and Android, while `magic/deploy.sh` force-pushes a static build to GitHub Pages.
- The package test script is a placeholder, so every improvement task must define its own behavioral verification.

## Operating constraints

- Default to local files, browser APIs, open-source software, GitHub Pages, and GitHub Actions. Use a third-party service only when it has a renewable free tier that covers the expected usage. If no renewable free tier exists, write a cost-benefit analysis before adoption and keep a free alternative.
- Do not implement these tasks as one project. Select a small slice, prove it, and review the result before expanding scope.
- Keep learner-facing behavior unchanged unless the task explicitly changes it and the verification covers the change.
- Treat every task as a proposal. Delete or rewrite tasks that stop serving learners or maintainers.

## How to read the tasks

The area is grouped into 10 epics. Each epic has 10 tasks that move from evidence, outcome, design, prototype, implementation, edge cases, verification, rollout, and review. This structure keeps the 100 tasks detailed without pretending that every item is equally urgent.

## Tasks

## Epic 01: third-party CDN provenance

### SP-001. Audit third-party CDN provenance in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 01. third-party CDN provenance
- Why now: unpinned CDN content can change or become unavailable.
- Scope: Trace Vue and Font Awesome CDN tags in `magic/index.html`. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-002. Define the outcome and measurement for third-party CDN provenance

- Priority: P0
- Effort: S
- Depends on: SP-001
- Epic: 01. third-party CDN provenance
- Why now: unpinned CDN content can change or become unavailable.
- Scope: Write the intended result in plain language so that the app knows exactly which external code it runs. Choose one observable measure based on this target: every external asset has a pinned version, integrity note, and replacement plan.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-003. Design the data and state contract for third-party CDN provenance

- Priority: P0
- Effort: M
- Depends on: SP-002
- Epic: 01. third-party CDN provenance
- Why now: unpinned CDN content can change or become unavailable.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in Vue and Font Awesome CDN tags in `magic/index.html`. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-004. Prototype third-party CDN provenance behind `ff_cdn_provenance`

- Priority: P2
- Effort: M
- Depends on: SP-003
- Epic: 01. third-party CDN provenance
- Why now: unpinned CDN content can change or become unavailable.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that unpinned CDN content can change or become unavailable.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_cdn_provenance

### SP-005. Implement the foundation for third-party CDN provenance

- Priority: P2
- Effort: L
- Depends on: SP-004
- Epic: 01. third-party CDN provenance
- Why now: unpinned CDN content can change or become unavailable.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-006. Implement the core behavior for third-party CDN provenance

- Priority: P1
- Effort: L
- Depends on: SP-005
- Epic: 01. third-party CDN provenance
- Why now: unpinned CDN content can change or become unavailable.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: the app knows exactly which external code it runs. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_cdn_provenance

### SP-007. Add edge states and failure handling for third-party CDN provenance

- Priority: P2
- Effort: M
- Depends on: SP-006
- Epic: 01. third-party CDN provenance
- Why now: unpinned CDN content can change or become unavailable.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to Vue and Font Awesome CDN tags in `magic/index.html`.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-008. Verify third-party CDN provenance with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: SP-007
- Epic: 01. third-party CDN provenance
- Why now: unpinned CDN content can change or become unavailable.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-009. Document rollout, cost, and operations for third-party CDN provenance

- Priority: P2
- Effort: S
- Depends on: SP-008
- Epic: 01. third-party CDN provenance
- Why now: unpinned CDN content can change or become unavailable.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when third-party CDN provenance uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-010. Measure and decide the future of third-party CDN provenance

- Priority: P2
- Effort: S
- Depends on: SP-009
- Epic: 01. third-party CDN provenance
- Why now: unpinned CDN content can change or become unavailable.
- Scope: Compare the observed result with the target from the outcome task: every external asset has a pinned version, integrity note, and replacement plan. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_cdn_provenance

## Epic 02: content security policy

### SP-011. Audit content security policy in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 02. content security policy
- Why now: the current inline Vue template and CDN assets constrain the policy.
- Scope: Trace static hosting response headers and inline scripts or styles. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-012. Define the outcome and measurement for content security policy

- Priority: P0
- Effort: S
- Depends on: SP-011
- Epic: 02. content security policy
- Why now: the current inline Vue template and CDN assets constrain the policy.
- Scope: Write the intended result in plain language so that XSS impact is reduced without breaking the app. Choose one observable measure based on this target: a tested policy exists with a report-only stage before enforcement.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-013. Design the data and state contract for content security policy

- Priority: P0
- Effort: M
- Depends on: SP-012
- Epic: 02. content security policy
- Why now: the current inline Vue template and CDN assets constrain the policy.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in static hosting response headers and inline scripts or styles. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-014. Prototype content security policy behind `ff_content_security_policy`

- Priority: P2
- Effort: M
- Depends on: SP-013
- Epic: 02. content security policy
- Why now: the current inline Vue template and CDN assets constrain the policy.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that the current inline Vue template and CDN assets constrain the policy.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_content_security_policy

### SP-015. Implement the foundation for content security policy

- Priority: P2
- Effort: L
- Depends on: SP-014
- Epic: 02. content security policy
- Why now: the current inline Vue template and CDN assets constrain the policy.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-016. Implement the core behavior for content security policy

- Priority: P1
- Effort: L
- Depends on: SP-015
- Epic: 02. content security policy
- Why now: the current inline Vue template and CDN assets constrain the policy.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: XSS impact is reduced without breaking the app. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_content_security_policy

### SP-017. Add edge states and failure handling for content security policy

- Priority: P2
- Effort: M
- Depends on: SP-016
- Epic: 02. content security policy
- Why now: the current inline Vue template and CDN assets constrain the policy.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to static hosting response headers and inline scripts or styles.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-018. Verify content security policy with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: SP-017
- Epic: 02. content security policy
- Why now: the current inline Vue template and CDN assets constrain the policy.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-019. Document rollout, cost, and operations for content security policy

- Priority: P2
- Effort: S
- Depends on: SP-018
- Epic: 02. content security policy
- Why now: the current inline Vue template and CDN assets constrain the policy.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when content security policy uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-020. Measure and decide the future of content security policy

- Priority: P2
- Effort: S
- Depends on: SP-019
- Epic: 02. content security policy
- Why now: the current inline Vue template and CDN assets constrain the policy.
- Scope: Compare the observed result with the target from the outcome task: a tested policy exists with a report-only stage before enforcement. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_content_security_policy

## Epic 03: microphone privacy

### SP-021. Audit microphone privacy in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 03. microphone privacy
- Why now: unclear state can make learners think audio is uploaded.
- Scope: Trace microphone permission, capture, playback, and comparison. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-022. Define the outcome and measurement for microphone privacy

- Priority: P2
- Effort: S
- Depends on: SP-021
- Epic: 03. microphone privacy
- Why now: unclear state can make learners think audio is uploaded.
- Scope: Write the intended result in plain language so that learners understand when recording starts and where audio goes. Choose one observable measure based on this target: recordings stay local unless an explicit consent flow says otherwise.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-023. Design the data and state contract for microphone privacy

- Priority: P1
- Effort: M
- Depends on: SP-022
- Epic: 03. microphone privacy
- Why now: unclear state can make learners think audio is uploaded.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in microphone permission, capture, playback, and comparison. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-024. Prototype microphone privacy behind `ff_microphone_privacy`

- Priority: P2
- Effort: M
- Depends on: SP-023
- Epic: 03. microphone privacy
- Why now: unclear state can make learners think audio is uploaded.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that unclear state can make learners think audio is uploaded.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_microphone_privacy

### SP-025. Implement the foundation for microphone privacy

- Priority: P2
- Effort: L
- Depends on: SP-024
- Epic: 03. microphone privacy
- Why now: unclear state can make learners think audio is uploaded.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-026. Implement the core behavior for microphone privacy

- Priority: P1
- Effort: L
- Depends on: SP-025
- Epic: 03. microphone privacy
- Why now: unclear state can make learners think audio is uploaded.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: learners understand when recording starts and where audio goes. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_microphone_privacy

### SP-027. Add edge states and failure handling for microphone privacy

- Priority: P2
- Effort: M
- Depends on: SP-026
- Epic: 03. microphone privacy
- Why now: unclear state can make learners think audio is uploaded.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to microphone permission, capture, playback, and comparison.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-028. Verify microphone privacy with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: SP-027
- Epic: 03. microphone privacy
- Why now: unclear state can make learners think audio is uploaded.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-029. Document rollout, cost, and operations for microphone privacy

- Priority: P2
- Effort: S
- Depends on: SP-028
- Epic: 03. microphone privacy
- Why now: unclear state can make learners think audio is uploaded.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when microphone privacy uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-030. Measure and decide the future of microphone privacy

- Priority: P2
- Effort: S
- Depends on: SP-029
- Epic: 03. microphone privacy
- Why now: unclear state can make learners think audio is uploaded.
- Scope: Compare the observed result with the target from the outcome task: recordings stay local unless an explicit consent flow says otherwise. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_microphone_privacy

## Epic 04: recording retention and deletion

### SP-031. Audit recording retention and deletion in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 04. recording retention and deletion
- Why now: native plugin behavior may differ from browser behavior.
- Scope: Trace `lastRecordedBlob`, MediaRecorder chunks, and temporary native files. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-032. Define the outcome and measurement for recording retention and deletion

- Priority: P2
- Effort: S
- Depends on: SP-031
- Epic: 04. recording retention and deletion
- Why now: native plugin behavior may differ from browser behavior.
- Scope: Write the intended result in plain language so that audio does not persist longer than needed. Choose one observable measure based on this target: recordings are cleared on demand and when a session ends unless saved explicitly.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-033. Design the data and state contract for recording retention and deletion

- Priority: P1
- Effort: M
- Depends on: SP-032
- Epic: 04. recording retention and deletion
- Why now: native plugin behavior may differ from browser behavior.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in `lastRecordedBlob`, MediaRecorder chunks, and temporary native files. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-034. Prototype recording retention and deletion behind `ff_recording_retention`

- Priority: P2
- Effort: M
- Depends on: SP-033
- Epic: 04. recording retention and deletion
- Why now: native plugin behavior may differ from browser behavior.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that native plugin behavior may differ from browser behavior.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_recording_retention

### SP-035. Implement the foundation for recording retention and deletion

- Priority: P2
- Effort: L
- Depends on: SP-034
- Epic: 04. recording retention and deletion
- Why now: native plugin behavior may differ from browser behavior.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-036. Implement the core behavior for recording retention and deletion

- Priority: P1
- Effort: L
- Depends on: SP-035
- Epic: 04. recording retention and deletion
- Why now: native plugin behavior may differ from browser behavior.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: audio does not persist longer than needed. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_recording_retention

### SP-037. Add edge states and failure handling for recording retention and deletion

- Priority: P2
- Effort: M
- Depends on: SP-036
- Epic: 04. recording retention and deletion
- Why now: native plugin behavior may differ from browser behavior.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to `lastRecordedBlob`, MediaRecorder chunks, and temporary native files.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-038. Verify recording retention and deletion with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: SP-037
- Epic: 04. recording retention and deletion
- Why now: native plugin behavior may differ from browser behavior.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-039. Document rollout, cost, and operations for recording retention and deletion

- Priority: P2
- Effort: S
- Depends on: SP-038
- Epic: 04. recording retention and deletion
- Why now: native plugin behavior may differ from browser behavior.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when recording retention and deletion uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-040. Measure and decide the future of recording retention and deletion

- Priority: P2
- Effort: S
- Depends on: SP-039
- Epic: 04. recording retention and deletion
- Why now: native plugin behavior may differ from browser behavior.
- Scope: Compare the observed result with the target from the outcome task: recordings are cleared on demand and when a session ends unless saved explicitly. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_recording_retention

## Epic 05: XSS and injection resistance

### SP-041. Audit XSS and injection resistance in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 05. XSS and injection resistance
- Why now: future content fields may add HTML.
- Scope: Trace word metadata, user writing input, status text, and future rich content. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-042. Define the outcome and measurement for XSS and injection resistance

- Priority: P2
- Effort: S
- Depends on: SP-041
- Epic: 05. XSS and injection resistance
- Why now: future content fields may add HTML.
- Scope: Write the intended result in plain language so that content cannot execute script in the learner interface. Choose one observable measure based on this target: all untrusted strings render as text or pass through a documented sanitizer.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-043. Design the data and state contract for XSS and injection resistance

- Priority: P1
- Effort: M
- Depends on: SP-042
- Epic: 05. XSS and injection resistance
- Why now: future content fields may add HTML.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in word metadata, user writing input, status text, and future rich content. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-044. Prototype XSS and injection resistance behind `ff_xss_injection`

- Priority: P2
- Effort: M
- Depends on: SP-043
- Epic: 05. XSS and injection resistance
- Why now: future content fields may add HTML.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that future content fields may add HTML.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_xss_injection

### SP-045. Implement the foundation for XSS and injection resistance

- Priority: P2
- Effort: L
- Depends on: SP-044
- Epic: 05. XSS and injection resistance
- Why now: future content fields may add HTML.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-046. Implement the core behavior for XSS and injection resistance

- Priority: P1
- Effort: L
- Depends on: SP-045
- Epic: 05. XSS and injection resistance
- Why now: future content fields may add HTML.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: content cannot execute script in the learner interface. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_xss_injection

### SP-047. Add edge states and failure handling for XSS and injection resistance

- Priority: P2
- Effort: M
- Depends on: SP-046
- Epic: 05. XSS and injection resistance
- Why now: future content fields may add HTML.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to word metadata, user writing input, status text, and future rich content.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-048. Verify XSS and injection resistance with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: SP-047
- Epic: 05. XSS and injection resistance
- Why now: future content fields may add HTML.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-049. Document rollout, cost, and operations for XSS and injection resistance

- Priority: P2
- Effort: S
- Depends on: SP-048
- Epic: 05. XSS and injection resistance
- Why now: future content fields may add HTML.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when XSS and injection resistance uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-050. Measure and decide the future of XSS and injection resistance

- Priority: P2
- Effort: S
- Depends on: SP-049
- Epic: 05. XSS and injection resistance
- Why now: future content fields may add HTML.
- Scope: Compare the observed result with the target from the outcome task: all untrusted strings render as text or pass through a documented sanitizer. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_xss_injection

## Epic 06: dependency supply chain

### SP-051. Audit dependency supply chain in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 06. dependency supply chain
- Why now: the repo currently has multiple package-lock and pnpm-lock signals in `magic/`.
- Scope: Trace `package.json`, lockfiles, Capacitor plugins, and generated native dependencies. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-052. Define the outcome and measurement for dependency supply chain

- Priority: P2
- Effort: S
- Depends on: SP-051
- Epic: 06. dependency supply chain
- Why now: the repo currently has multiple package-lock and pnpm-lock signals in `magic/`.
- Scope: Write the intended result in plain language so that dependency changes are visible and reproducible. Choose one observable measure based on this target: one package manager, lockfile review, and vulnerability checks are documented.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-053. Design the data and state contract for dependency supply chain

- Priority: P1
- Effort: M
- Depends on: SP-052
- Epic: 06. dependency supply chain
- Why now: the repo currently has multiple package-lock and pnpm-lock signals in `magic/`.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in `package.json`, lockfiles, Capacitor plugins, and generated native dependencies. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-054. Prototype dependency supply chain behind `ff_dependency_supply_chain`

- Priority: P2
- Effort: M
- Depends on: SP-053
- Epic: 06. dependency supply chain
- Why now: the repo currently has multiple package-lock and pnpm-lock signals in `magic/`.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that the repo currently has multiple package-lock and pnpm-lock signals in `magic/`.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_dependency_supply_chain

### SP-055. Implement the foundation for dependency supply chain

- Priority: P2
- Effort: L
- Depends on: SP-054
- Epic: 06. dependency supply chain
- Why now: the repo currently has multiple package-lock and pnpm-lock signals in `magic/`.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-056. Implement the core behavior for dependency supply chain

- Priority: P1
- Effort: L
- Depends on: SP-055
- Epic: 06. dependency supply chain
- Why now: the repo currently has multiple package-lock and pnpm-lock signals in `magic/`.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: dependency changes are visible and reproducible. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_dependency_supply_chain

### SP-057. Add edge states and failure handling for dependency supply chain

- Priority: P2
- Effort: M
- Depends on: SP-056
- Epic: 06. dependency supply chain
- Why now: the repo currently has multiple package-lock and pnpm-lock signals in `magic/`.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to `package.json`, lockfiles, Capacitor plugins, and generated native dependencies.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-058. Verify dependency supply chain with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: SP-057
- Epic: 06. dependency supply chain
- Why now: the repo currently has multiple package-lock and pnpm-lock signals in `magic/`.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-059. Document rollout, cost, and operations for dependency supply chain

- Priority: P2
- Effort: S
- Depends on: SP-058
- Epic: 06. dependency supply chain
- Why now: the repo currently has multiple package-lock and pnpm-lock signals in `magic/`.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when dependency supply chain uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-060. Measure and decide the future of dependency supply chain

- Priority: P2
- Effort: S
- Depends on: SP-059
- Epic: 06. dependency supply chain
- Why now: the repo currently has multiple package-lock and pnpm-lock signals in `magic/`.
- Scope: Compare the observed result with the target from the outcome task: one package manager, lockfile review, and vulnerability checks are documented. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_dependency_supply_chain

## Epic 07: secret and environment hygiene

### SP-061. Audit secret and environment hygiene in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 07. secret and environment hygiene
- Why now: client-side apps cannot hide secrets from users.
- Scope: Trace `.env`, scripts, workflow secrets, and future API keys. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-062. Define the outcome and measurement for secret and environment hygiene

- Priority: P2
- Effort: S
- Depends on: SP-061
- Epic: 07. secret and environment hygiene
- Why now: client-side apps cannot hide secrets from users.
- Scope: Write the intended result in plain language so that secrets never enter git or client-side bundles. Choose one observable measure based on this target: a secret inventory and `.gitignore` check exist.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-063. Design the data and state contract for secret and environment hygiene

- Priority: P2
- Effort: M
- Depends on: SP-062
- Epic: 07. secret and environment hygiene
- Why now: client-side apps cannot hide secrets from users.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in `.env`, scripts, workflow secrets, and future API keys. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-064. Prototype secret and environment hygiene behind `ff_secret_hygiene`

- Priority: P2
- Effort: M
- Depends on: SP-063
- Epic: 07. secret and environment hygiene
- Why now: client-side apps cannot hide secrets from users.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that client-side apps cannot hide secrets from users.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_secret_hygiene

### SP-065. Implement the foundation for secret and environment hygiene

- Priority: P2
- Effort: L
- Depends on: SP-064
- Epic: 07. secret and environment hygiene
- Why now: client-side apps cannot hide secrets from users.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-066. Implement the core behavior for secret and environment hygiene

- Priority: P2
- Effort: L
- Depends on: SP-065
- Epic: 07. secret and environment hygiene
- Why now: client-side apps cannot hide secrets from users.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: secrets never enter git or client-side bundles. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_secret_hygiene

### SP-067. Add edge states and failure handling for secret and environment hygiene

- Priority: P2
- Effort: M
- Depends on: SP-066
- Epic: 07. secret and environment hygiene
- Why now: client-side apps cannot hide secrets from users.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to `.env`, scripts, workflow secrets, and future API keys.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-068. Verify secret and environment hygiene with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: SP-067
- Epic: 07. secret and environment hygiene
- Why now: client-side apps cannot hide secrets from users.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-069. Document rollout, cost, and operations for secret and environment hygiene

- Priority: P2
- Effort: S
- Depends on: SP-068
- Epic: 07. secret and environment hygiene
- Why now: client-side apps cannot hide secrets from users.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when secret and environment hygiene uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-070. Measure and decide the future of secret and environment hygiene

- Priority: P2
- Effort: S
- Depends on: SP-069
- Epic: 07. secret and environment hygiene
- Why now: client-side apps cannot hide secrets from users.
- Scope: Compare the observed result with the target from the outcome task: a secret inventory and `.gitignore` check exist. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_secret_hygiene

## Epic 08: native permission declarations

### SP-071. Audit native permission declarations in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 08. native permission declarations
- Why now: Capacitor defaults may request more than the app needs.
- Scope: Trace iOS and Android microphone, audio, network, and storage permission metadata. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-072. Define the outcome and measurement for native permission declarations

- Priority: P2
- Effort: S
- Depends on: SP-071
- Epic: 08. native permission declarations
- Why now: Capacitor defaults may request more than the app needs.
- Scope: Write the intended result in plain language so that app-store permission text matches actual behavior. Choose one observable measure based on this target: each permission has a purpose string and removal rule.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-073. Design the data and state contract for native permission declarations

- Priority: P2
- Effort: M
- Depends on: SP-072
- Epic: 08. native permission declarations
- Why now: Capacitor defaults may request more than the app needs.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in iOS and Android microphone, audio, network, and storage permission metadata. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-074. Prototype native permission declarations behind `ff_native_permissions`

- Priority: P2
- Effort: M
- Depends on: SP-073
- Epic: 08. native permission declarations
- Why now: Capacitor defaults may request more than the app needs.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that Capacitor defaults may request more than the app needs.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_native_permissions

### SP-075. Implement the foundation for native permission declarations

- Priority: P2
- Effort: L
- Depends on: SP-074
- Epic: 08. native permission declarations
- Why now: Capacitor defaults may request more than the app needs.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-076. Implement the core behavior for native permission declarations

- Priority: P2
- Effort: L
- Depends on: SP-075
- Epic: 08. native permission declarations
- Why now: Capacitor defaults may request more than the app needs.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: app-store permission text matches actual behavior. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_native_permissions

### SP-077. Add edge states and failure handling for native permission declarations

- Priority: P2
- Effort: M
- Depends on: SP-076
- Epic: 08. native permission declarations
- Why now: Capacitor defaults may request more than the app needs.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to iOS and Android microphone, audio, network, and storage permission metadata.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-078. Verify native permission declarations with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: SP-077
- Epic: 08. native permission declarations
- Why now: Capacitor defaults may request more than the app needs.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-079. Document rollout, cost, and operations for native permission declarations

- Priority: P2
- Effort: S
- Depends on: SP-078
- Epic: 08. native permission declarations
- Why now: Capacitor defaults may request more than the app needs.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when native permission declarations uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-080. Measure and decide the future of native permission declarations

- Priority: P2
- Effort: S
- Depends on: SP-079
- Epic: 08. native permission declarations
- Why now: Capacitor defaults may request more than the app needs.
- Scope: Compare the observed result with the target from the outcome task: each permission has a purpose string and removal rule. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_native_permissions

## Epic 09: local data protection

### SP-081. Audit local data protection in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 09. local data protection
- Why now: sync features can conflict with local-first privacy.
- Scope: Trace progress, settings, recordings, and future analytics identifiers. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-082. Define the outcome and measurement for local data protection

- Priority: P2
- Effort: S
- Depends on: SP-081
- Epic: 09. local data protection
- Why now: sync features can conflict with local-first privacy.
- Scope: Write the intended result in plain language so that learner data stays local by default and deletion is understandable. Choose one observable measure based on this target: a data inventory names storage keys, owners, retention, and deletion behavior.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-083. Design the data and state contract for local data protection

- Priority: P2
- Effort: M
- Depends on: SP-082
- Epic: 09. local data protection
- Why now: sync features can conflict with local-first privacy.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in progress, settings, recordings, and future analytics identifiers. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-084. Prototype local data protection behind `ff_local_data_protection`

- Priority: P2
- Effort: M
- Depends on: SP-083
- Epic: 09. local data protection
- Why now: sync features can conflict with local-first privacy.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that sync features can conflict with local-first privacy.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_local_data_protection

### SP-085. Implement the foundation for local data protection

- Priority: P2
- Effort: L
- Depends on: SP-084
- Epic: 09. local data protection
- Why now: sync features can conflict with local-first privacy.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-086. Implement the core behavior for local data protection

- Priority: P2
- Effort: L
- Depends on: SP-085
- Epic: 09. local data protection
- Why now: sync features can conflict with local-first privacy.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: learner data stays local by default and deletion is understandable. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_local_data_protection

### SP-087. Add edge states and failure handling for local data protection

- Priority: P2
- Effort: M
- Depends on: SP-086
- Epic: 09. local data protection
- Why now: sync features can conflict with local-first privacy.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to progress, settings, recordings, and future analytics identifiers.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-088. Verify local data protection with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: SP-087
- Epic: 09. local data protection
- Why now: sync features can conflict with local-first privacy.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-089. Document rollout, cost, and operations for local data protection

- Priority: P2
- Effort: S
- Depends on: SP-088
- Epic: 09. local data protection
- Why now: sync features can conflict with local-first privacy.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when local data protection uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-090. Measure and decide the future of local data protection

- Priority: P2
- Effort: S
- Depends on: SP-089
- Epic: 09. local data protection
- Why now: sync features can conflict with local-first privacy.
- Scope: Compare the observed result with the target from the outcome task: a data inventory names storage keys, owners, retention, and deletion behavior. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_local_data_protection

## Epic 10: security incident response

### SP-091. Audit security incident response in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 10. security incident response
- Why now: a solo project still needs a realistic minimum process.
- Scope: Trace dependency advisories, leaked secrets, malicious content, and privacy reports. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-092. Define the outcome and measurement for security incident response

- Priority: P2
- Effort: S
- Depends on: SP-091
- Epic: 10. security incident response
- Why now: a solo project still needs a realistic minimum process.
- Scope: Write the intended result in plain language so that the project can respond without improvising. Choose one observable measure based on this target: a short runbook names contacts, triage, rollback, and disclosure steps.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-093. Design the data and state contract for security incident response

- Priority: P2
- Effort: M
- Depends on: SP-092
- Epic: 10. security incident response
- Why now: a solo project still needs a realistic minimum process.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in dependency advisories, leaked secrets, malicious content, and privacy reports. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-094. Prototype security incident response behind `ff_incident_response`

- Priority: P2
- Effort: M
- Depends on: SP-093
- Epic: 10. security incident response
- Why now: a solo project still needs a realistic minimum process.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that a solo project still needs a realistic minimum process.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_incident_response

### SP-095. Implement the foundation for security incident response

- Priority: P2
- Effort: L
- Depends on: SP-094
- Epic: 10. security incident response
- Why now: a solo project still needs a realistic minimum process.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-096. Implement the core behavior for security incident response

- Priority: P2
- Effort: L
- Depends on: SP-095
- Epic: 10. security incident response
- Why now: a solo project still needs a realistic minimum process.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: the project can respond without improvising. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_incident_response

### SP-097. Add edge states and failure handling for security incident response

- Priority: P2
- Effort: M
- Depends on: SP-096
- Epic: 10. security incident response
- Why now: a solo project still needs a realistic minimum process.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to dependency advisories, leaked secrets, malicious content, and privacy reports.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-098. Verify security incident response with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: SP-097
- Epic: 10. security incident response
- Why now: a solo project still needs a realistic minimum process.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-099. Document rollout, cost, and operations for security incident response

- Priority: P2
- Effort: S
- Depends on: SP-098
- Epic: 10. security incident response
- Why now: a solo project still needs a realistic minimum process.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when security incident response uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### SP-100. Measure and decide the future of security incident response

- Priority: P2
- Effort: S
- Depends on: SP-099
- Epic: 10. security incident response
- Why now: a solo project still needs a realistic minimum process.
- Scope: Compare the observed result with the target from the outcome task: a short runbook names contacts, triage, rollback, and disclosure steps. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_incident_response

## Conflicts and feature-flag strategies

### Conflict 1: Local-only processing versus cloud speech analysis

| Option | Pros | Cons |
|---|---|---|
| Process audio locally | Recordings do not leave the device; no service cost or consent flow is required; offline use keeps working | Accuracy may be lower; implementation and maintenance are harder; older phones may struggle |
| Use a cloud speech service | Managed recognition and scoring may improve feedback quality; less signal-processing code is needed | A renewable free tier may not cover audio volume; recordings create privacy obligations; offline use degrades |

Feature-flag or coexistence plan: Use `ff_cloud_speech` only after a written cost-benefit analysis and explicit learner consent. Keep local processing as the default.

### Conflict 2: Strict CSP versus current inline implementation

| Option | Pros | Cons |
|---|---|---|
| Adopt a strict CSP now | XSS impact drops; external script behavior becomes explicit; future regressions are blocked | The current inline code and CDN assets may break until refactored |
| Stay permissive | No immediate refactoring is required; deployment stays unchanged | XSS risk remains higher and the project has no clear boundary for executable content |

Feature-flag or coexistence plan: Use report-only mode first, then enforce with `ff_strict_csp` after violations are fixed.

### Conflict 3: Account-based privacy controls versus local-first controls

| Option | Pros | Cons |
|---|---|---|
| Add accounts for privacy controls | Deletion and consent can sync across devices; support can verify ownership | Accounts create more personal data, authentication risk, and service cost |
| Stay local-first | Less data exists to protect; no account service is required; learners can start immediately | Cross-device deletion and recovery are limited; lost devices lose progress |

Feature-flag or coexistence plan: Use `ff_accounts` only after a cost-benefit analysis and a data-protection design.

## Third-party service cost policy

Prefer local processing and open-source checks. Cloud speech, crash reporting, and accounts need free-tier verification or a cost-benefit analysis.

When a service does not have a renewable free tier, the cost-benefit analysis must include monthly fixed cost, usage-based cost at expected volume, free alternative, learner or maintainer benefit, privacy cost, lock-in cost, exit cost, and the decision deadline. A free trial is not a renewable free tier.

## Suggested sequencing

1. Complete P0 audit, outcome, design, and verification tasks before implementation tasks.
2. Choose at most one epic at a time for implementation.
3. Keep feature flags small, time-bounded, and tied to a measurement task.
4. Revisit this document after each landed slice and delete tasks that no longer earn their place.
