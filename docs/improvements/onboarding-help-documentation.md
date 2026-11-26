# Onboarding, help, and documentation improvement plan

## Purpose

Help learners start confidently and help maintainers understand, change, and release the app without reverse engineering it.

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

## Epic 01: first-run experience

### OD-001. Audit first-run experience in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 01. first-run experience
- Why now: the current app drops learners into a mode grid.
- Scope: Trace first launch, mode choice, microphone prompt, and first success. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-002. Define the outcome and measurement for first-run experience

- Priority: P0
- Effort: S
- Depends on: OD-001
- Epic: 01. first-run experience
- Why now: the current app drops learners into a mode grid.
- Scope: Write the intended result in plain language so that a new learner reaches a useful practice moment quickly. Choose one observable measure based on this target: the first-run path has one measurable completion target.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-003. Design the data and state contract for first-run experience

- Priority: P0
- Effort: M
- Depends on: OD-002
- Epic: 01. first-run experience
- Why now: the current app drops learners into a mode grid.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in first launch, mode choice, microphone prompt, and first success. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-004. Prototype first-run experience behind `ff_first_run_experience`

- Priority: P2
- Effort: M
- Depends on: OD-003
- Epic: 01. first-run experience
- Why now: the current app drops learners into a mode grid.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that the current app drops learners into a mode grid.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_first_run_experience

### OD-005. Implement the foundation for first-run experience

- Priority: P2
- Effort: L
- Depends on: OD-004
- Epic: 01. first-run experience
- Why now: the current app drops learners into a mode grid.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-006. Implement the core behavior for first-run experience

- Priority: P1
- Effort: L
- Depends on: OD-005
- Epic: 01. first-run experience
- Why now: the current app drops learners into a mode grid.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: a new learner reaches a useful practice moment quickly. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_first_run_experience

### OD-007. Add edge states and failure handling for first-run experience

- Priority: P2
- Effort: M
- Depends on: OD-006
- Epic: 01. first-run experience
- Why now: the current app drops learners into a mode grid.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to first launch, mode choice, microphone prompt, and first success.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-008. Verify first-run experience with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: OD-007
- Epic: 01. first-run experience
- Why now: the current app drops learners into a mode grid.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-009. Document rollout, cost, and operations for first-run experience

- Priority: P2
- Effort: S
- Depends on: OD-008
- Epic: 01. first-run experience
- Why now: the current app drops learners into a mode grid.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when first-run experience uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-010. Measure and decide the future of first-run experience

- Priority: P2
- Effort: S
- Depends on: OD-009
- Epic: 01. first-run experience
- Why now: the current app drops learners into a mode grid.
- Scope: Compare the observed result with the target from the outcome task: the first-run path has one measurable completion target. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_first_run_experience

## Epic 02: mode explanations

### OD-011. Audit mode explanations in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 02. mode explanations
- Why now: long explanations can delay practice.
- Scope: Trace mode cards, welcome screens, settings, and examples. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-012. Define the outcome and measurement for mode explanations

- Priority: P0
- Effort: S
- Depends on: OD-011
- Epic: 02. mode explanations
- Why now: long explanations can delay practice.
- Scope: Write the intended result in plain language so that learners know what each mode trains before starting. Choose one observable measure based on this target: every mode has a concise explanation and example.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-013. Design the data and state contract for mode explanations

- Priority: P0
- Effort: M
- Depends on: OD-012
- Epic: 02. mode explanations
- Why now: long explanations can delay practice.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in mode cards, welcome screens, settings, and examples. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-014. Prototype mode explanations behind `ff_mode_explanations`

- Priority: P2
- Effort: M
- Depends on: OD-013
- Epic: 02. mode explanations
- Why now: long explanations can delay practice.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that long explanations can delay practice.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_mode_explanations

### OD-015. Implement the foundation for mode explanations

- Priority: P2
- Effort: L
- Depends on: OD-014
- Epic: 02. mode explanations
- Why now: long explanations can delay practice.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-016. Implement the core behavior for mode explanations

- Priority: P1
- Effort: L
- Depends on: OD-015
- Epic: 02. mode explanations
- Why now: long explanations can delay practice.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: learners know what each mode trains before starting. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_mode_explanations

### OD-017. Add edge states and failure handling for mode explanations

- Priority: P2
- Effort: M
- Depends on: OD-016
- Epic: 02. mode explanations
- Why now: long explanations can delay practice.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to mode cards, welcome screens, settings, and examples.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-018. Verify mode explanations with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: OD-017
- Epic: 02. mode explanations
- Why now: long explanations can delay practice.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-019. Document rollout, cost, and operations for mode explanations

- Priority: P2
- Effort: S
- Depends on: OD-018
- Epic: 02. mode explanations
- Why now: long explanations can delay practice.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when mode explanations uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-020. Measure and decide the future of mode explanations

- Priority: P2
- Effort: S
- Depends on: OD-019
- Epic: 02. mode explanations
- Why now: long explanations can delay practice.
- Scope: Compare the observed result with the target from the outcome task: every mode has a concise explanation and example. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_mode_explanations

## Epic 03: microphone onboarding

### OD-021. Audit microphone onboarding in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 03. microphone onboarding
- Why now: browser permission copy cannot be fully controlled.
- Scope: Trace permission explanation, test recording, playback, and troubleshooting. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-022. Define the outcome and measurement for microphone onboarding

- Priority: P2
- Effort: S
- Depends on: OD-021
- Epic: 03. microphone onboarding
- Why now: browser permission copy cannot be fully controlled.
- Scope: Write the intended result in plain language so that shadowing learners understand recording before a scored session. Choose one observable measure based on this target: the permission flow includes a test and recovery guidance.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-023. Design the data and state contract for microphone onboarding

- Priority: P1
- Effort: M
- Depends on: OD-022
- Epic: 03. microphone onboarding
- Why now: browser permission copy cannot be fully controlled.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in permission explanation, test recording, playback, and troubleshooting. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-024. Prototype microphone onboarding behind `ff_microphone_onboarding`

- Priority: P2
- Effort: M
- Depends on: OD-023
- Epic: 03. microphone onboarding
- Why now: browser permission copy cannot be fully controlled.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that browser permission copy cannot be fully controlled.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_microphone_onboarding

### OD-025. Implement the foundation for microphone onboarding

- Priority: P2
- Effort: L
- Depends on: OD-024
- Epic: 03. microphone onboarding
- Why now: browser permission copy cannot be fully controlled.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-026. Implement the core behavior for microphone onboarding

- Priority: P1
- Effort: L
- Depends on: OD-025
- Epic: 03. microphone onboarding
- Why now: browser permission copy cannot be fully controlled.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: shadowing learners understand recording before a scored session. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_microphone_onboarding

### OD-027. Add edge states and failure handling for microphone onboarding

- Priority: P2
- Effort: M
- Depends on: OD-026
- Epic: 03. microphone onboarding
- Why now: browser permission copy cannot be fully controlled.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to permission explanation, test recording, playback, and troubleshooting.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-028. Verify microphone onboarding with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: OD-027
- Epic: 03. microphone onboarding
- Why now: browser permission copy cannot be fully controlled.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-029. Document rollout, cost, and operations for microphone onboarding

- Priority: P2
- Effort: S
- Depends on: OD-028
- Epic: 03. microphone onboarding
- Why now: browser permission copy cannot be fully controlled.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when microphone onboarding uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-030. Measure and decide the future of microphone onboarding

- Priority: P2
- Effort: S
- Depends on: OD-029
- Epic: 03. microphone onboarding
- Why now: browser permission copy cannot be fully controlled.
- Scope: Compare the observed result with the target from the outcome task: the permission flow includes a test and recovery guidance. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_microphone_onboarding

## Epic 04: contextual help

### OD-031. Audit contextual help in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 04. contextual help
- Why now: too many tips can clutter the interface.
- Scope: Trace tone filters, mastery threshold, writing target, classifier rules, and audio controls. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-032. Define the outcome and measurement for contextual help

- Priority: P2
- Effort: S
- Depends on: OD-031
- Epic: 04. contextual help
- Why now: too many tips can clutter the interface.
- Scope: Write the intended result in plain language so that help appears where confusion happens. Choose one observable measure based on this target: complex controls have concise inline help.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-033. Design the data and state contract for contextual help

- Priority: P1
- Effort: M
- Depends on: OD-032
- Epic: 04. contextual help
- Why now: too many tips can clutter the interface.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in tone filters, mastery threshold, writing target, classifier rules, and audio controls. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-034. Prototype contextual help behind `ff_contextual_help`

- Priority: P2
- Effort: M
- Depends on: OD-033
- Epic: 04. contextual help
- Why now: too many tips can clutter the interface.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that too many tips can clutter the interface.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_contextual_help

### OD-035. Implement the foundation for contextual help

- Priority: P2
- Effort: L
- Depends on: OD-034
- Epic: 04. contextual help
- Why now: too many tips can clutter the interface.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-036. Implement the core behavior for contextual help

- Priority: P1
- Effort: L
- Depends on: OD-035
- Epic: 04. contextual help
- Why now: too many tips can clutter the interface.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: help appears where confusion happens. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_contextual_help

### OD-037. Add edge states and failure handling for contextual help

- Priority: P2
- Effort: M
- Depends on: OD-036
- Epic: 04. contextual help
- Why now: too many tips can clutter the interface.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to tone filters, mastery threshold, writing target, classifier rules, and audio controls.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-038. Verify contextual help with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: OD-037
- Epic: 04. contextual help
- Why now: too many tips can clutter the interface.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-039. Document rollout, cost, and operations for contextual help

- Priority: P2
- Effort: S
- Depends on: OD-038
- Epic: 04. contextual help
- Why now: too many tips can clutter the interface.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when contextual help uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-040. Measure and decide the future of contextual help

- Priority: P2
- Effort: S
- Depends on: OD-039
- Epic: 04. contextual help
- Why now: too many tips can clutter the interface.
- Scope: Compare the observed result with the target from the outcome task: complex controls have concise inline help. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_contextual_help

## Epic 05: learner guide and FAQ

### OD-041. Audit learner guide and FAQ in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 05. learner guide and FAQ
- Why now: documentation can drift from behavior.
- Scope: Trace practice methods, tone practice, troubleshooting, privacy, and offline use. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-042. Define the outcome and measurement for learner guide and FAQ

- Priority: P2
- Effort: S
- Depends on: OD-041
- Epic: 05. learner guide and FAQ
- Why now: documentation can drift from behavior.
- Scope: Write the intended result in plain language so that learners can solve common problems without outside help. Choose one observable measure based on this target: the guide answers the top beginner and microphone questions.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-043. Design the data and state contract for learner guide and FAQ

- Priority: P1
- Effort: M
- Depends on: OD-042
- Epic: 05. learner guide and FAQ
- Why now: documentation can drift from behavior.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in practice methods, tone practice, troubleshooting, privacy, and offline use. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-044. Prototype learner guide and FAQ behind `ff_learner_guide`

- Priority: P2
- Effort: M
- Depends on: OD-043
- Epic: 05. learner guide and FAQ
- Why now: documentation can drift from behavior.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that documentation can drift from behavior.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_learner_guide

### OD-045. Implement the foundation for learner guide and FAQ

- Priority: P2
- Effort: L
- Depends on: OD-044
- Epic: 05. learner guide and FAQ
- Why now: documentation can drift from behavior.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-046. Implement the core behavior for learner guide and FAQ

- Priority: P1
- Effort: L
- Depends on: OD-045
- Epic: 05. learner guide and FAQ
- Why now: documentation can drift from behavior.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: learners can solve common problems without outside help. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_learner_guide

### OD-047. Add edge states and failure handling for learner guide and FAQ

- Priority: P2
- Effort: M
- Depends on: OD-046
- Epic: 05. learner guide and FAQ
- Why now: documentation can drift from behavior.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to practice methods, tone practice, troubleshooting, privacy, and offline use.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-048. Verify learner guide and FAQ with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: OD-047
- Epic: 05. learner guide and FAQ
- Why now: documentation can drift from behavior.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-049. Document rollout, cost, and operations for learner guide and FAQ

- Priority: P2
- Effort: S
- Depends on: OD-048
- Epic: 05. learner guide and FAQ
- Why now: documentation can drift from behavior.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when learner guide and FAQ uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-050. Measure and decide the future of learner guide and FAQ

- Priority: P2
- Effort: S
- Depends on: OD-049
- Epic: 05. learner guide and FAQ
- Why now: documentation can drift from behavior.
- Scope: Compare the observed result with the target from the outcome task: the guide answers the top beginner and microphone questions. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_learner_guide

## Epic 06: contributor documentation

### OD-051. Audit contributor documentation in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 06. contributor documentation
- Why now: the current repo mixes root and `magic/` documentation.
- Scope: Trace setup, run, test, content edits, and pull request expectations. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-052. Define the outcome and measurement for contributor documentation

- Priority: P2
- Effort: S
- Depends on: OD-051
- Epic: 06. contributor documentation
- Why now: the current repo mixes root and `magic/` documentation.
- Scope: Write the intended result in plain language so that a contributor can make a safe first change. Choose one observable measure based on this target: the README points to exact setup and verification commands.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-053. Design the data and state contract for contributor documentation

- Priority: P1
- Effort: M
- Depends on: OD-052
- Epic: 06. contributor documentation
- Why now: the current repo mixes root and `magic/` documentation.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in setup, run, test, content edits, and pull request expectations. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-054. Prototype contributor documentation behind `ff_contributor_docs`

- Priority: P2
- Effort: M
- Depends on: OD-053
- Epic: 06. contributor documentation
- Why now: the current repo mixes root and `magic/` documentation.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that the current repo mixes root and `magic/` documentation.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_contributor_docs

### OD-055. Implement the foundation for contributor documentation

- Priority: P2
- Effort: L
- Depends on: OD-054
- Epic: 06. contributor documentation
- Why now: the current repo mixes root and `magic/` documentation.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-056. Implement the core behavior for contributor documentation

- Priority: P1
- Effort: L
- Depends on: OD-055
- Epic: 06. contributor documentation
- Why now: the current repo mixes root and `magic/` documentation.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: a contributor can make a safe first change. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_contributor_docs

### OD-057. Add edge states and failure handling for contributor documentation

- Priority: P2
- Effort: M
- Depends on: OD-056
- Epic: 06. contributor documentation
- Why now: the current repo mixes root and `magic/` documentation.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to setup, run, test, content edits, and pull request expectations.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-058. Verify contributor documentation with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: OD-057
- Epic: 06. contributor documentation
- Why now: the current repo mixes root and `magic/` documentation.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-059. Document rollout, cost, and operations for contributor documentation

- Priority: P2
- Effort: S
- Depends on: OD-058
- Epic: 06. contributor documentation
- Why now: the current repo mixes root and `magic/` documentation.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when contributor documentation uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-060. Measure and decide the future of contributor documentation

- Priority: P2
- Effort: S
- Depends on: OD-059
- Epic: 06. contributor documentation
- Why now: the current repo mixes root and `magic/` documentation.
- Scope: Compare the observed result with the target from the outcome task: the README points to exact setup and verification commands. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_contributor_docs

## Epic 07: architecture documentation

### OD-061. Audit architecture documentation in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 07. architecture documentation
- Why now: target-state docs can be mistaken for current behavior.
- Scope: Trace domain model, mode registry, audio boundary, persistence, and deployment. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-062. Define the outcome and measurement for architecture documentation

- Priority: P2
- Effort: S
- Depends on: OD-061
- Epic: 07. architecture documentation
- Why now: target-state docs can be mistaken for current behavior.
- Scope: Write the intended result in plain language so that maintainers can understand the intended shape before editing. Choose one observable measure based on this target: architecture docs name current and target states separately.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-063. Design the data and state contract for architecture documentation

- Priority: P2
- Effort: M
- Depends on: OD-062
- Epic: 07. architecture documentation
- Why now: target-state docs can be mistaken for current behavior.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in domain model, mode registry, audio boundary, persistence, and deployment. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-064. Prototype architecture documentation behind `ff_architecture_docs`

- Priority: P2
- Effort: M
- Depends on: OD-063
- Epic: 07. architecture documentation
- Why now: target-state docs can be mistaken for current behavior.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that target-state docs can be mistaken for current behavior.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_architecture_docs

### OD-065. Implement the foundation for architecture documentation

- Priority: P2
- Effort: L
- Depends on: OD-064
- Epic: 07. architecture documentation
- Why now: target-state docs can be mistaken for current behavior.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-066. Implement the core behavior for architecture documentation

- Priority: P2
- Effort: L
- Depends on: OD-065
- Epic: 07. architecture documentation
- Why now: target-state docs can be mistaken for current behavior.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: maintainers can understand the intended shape before editing. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_architecture_docs

### OD-067. Add edge states and failure handling for architecture documentation

- Priority: P2
- Effort: M
- Depends on: OD-066
- Epic: 07. architecture documentation
- Why now: target-state docs can be mistaken for current behavior.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to domain model, mode registry, audio boundary, persistence, and deployment.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-068. Verify architecture documentation with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: OD-067
- Epic: 07. architecture documentation
- Why now: target-state docs can be mistaken for current behavior.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-069. Document rollout, cost, and operations for architecture documentation

- Priority: P2
- Effort: S
- Depends on: OD-068
- Epic: 07. architecture documentation
- Why now: target-state docs can be mistaken for current behavior.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when architecture documentation uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-070. Measure and decide the future of architecture documentation

- Priority: P2
- Effort: S
- Depends on: OD-069
- Epic: 07. architecture documentation
- Why now: target-state docs can be mistaken for current behavior.
- Scope: Compare the observed result with the target from the outcome task: architecture docs name current and target states separately. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_architecture_docs

## Epic 08: content authoring documentation

### OD-071. Audit content authoring documentation in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 08. content authoring documentation
- Why now: asset generation may require local tools or credentials.
- Scope: Trace word schema, asset rules, licensing, review, and validation. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-072. Define the outcome and measurement for content authoring documentation

- Priority: P2
- Effort: S
- Depends on: OD-071
- Epic: 08. content authoring documentation
- Why now: asset generation may require local tools or credentials.
- Scope: Write the intended result in plain language so that content contributors can add words safely. Choose one observable measure based on this target: a content guide includes a complete example and validation command.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-073. Design the data and state contract for content authoring documentation

- Priority: P2
- Effort: M
- Depends on: OD-072
- Epic: 08. content authoring documentation
- Why now: asset generation may require local tools or credentials.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in word schema, asset rules, licensing, review, and validation. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-074. Prototype content authoring documentation behind `ff_content_authoring_docs`

- Priority: P2
- Effort: M
- Depends on: OD-073
- Epic: 08. content authoring documentation
- Why now: asset generation may require local tools or credentials.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that asset generation may require local tools or credentials.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_content_authoring_docs

### OD-075. Implement the foundation for content authoring documentation

- Priority: P2
- Effort: L
- Depends on: OD-074
- Epic: 08. content authoring documentation
- Why now: asset generation may require local tools or credentials.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-076. Implement the core behavior for content authoring documentation

- Priority: P2
- Effort: L
- Depends on: OD-075
- Epic: 08. content authoring documentation
- Why now: asset generation may require local tools or credentials.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: content contributors can add words safely. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_content_authoring_docs

### OD-077. Add edge states and failure handling for content authoring documentation

- Priority: P2
- Effort: M
- Depends on: OD-076
- Epic: 08. content authoring documentation
- Why now: asset generation may require local tools or credentials.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to word schema, asset rules, licensing, review, and validation.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-078. Verify content authoring documentation with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: OD-077
- Epic: 08. content authoring documentation
- Why now: asset generation may require local tools or credentials.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-079. Document rollout, cost, and operations for content authoring documentation

- Priority: P2
- Effort: S
- Depends on: OD-078
- Epic: 08. content authoring documentation
- Why now: asset generation may require local tools or credentials.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when content authoring documentation uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-080. Measure and decide the future of content authoring documentation

- Priority: P2
- Effort: S
- Depends on: OD-079
- Epic: 08. content authoring documentation
- Why now: asset generation may require local tools or credentials.
- Scope: Compare the observed result with the target from the outcome task: a content guide includes a complete example and validation command. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_content_authoring_docs

## Epic 09: release notes and changelog

### OD-081. Audit release notes and changelog in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 09. release notes and changelog
- Why now: the current deployment flow does not require release notes.
- Scope: Trace learner-visible changes, fixes, migrations, and known issues. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-082. Define the outcome and measurement for release notes and changelog

- Priority: P2
- Effort: S
- Depends on: OD-081
- Epic: 09. release notes and changelog
- Why now: the current deployment flow does not require release notes.
- Scope: Write the intended result in plain language so that users and maintainers can tell what changed. Choose one observable measure based on this target: each release has concise notes and a version.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-083. Design the data and state contract for release notes and changelog

- Priority: P2
- Effort: M
- Depends on: OD-082
- Epic: 09. release notes and changelog
- Why now: the current deployment flow does not require release notes.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in learner-visible changes, fixes, migrations, and known issues. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-084. Prototype release notes and changelog behind `ff_release_notes`

- Priority: P2
- Effort: M
- Depends on: OD-083
- Epic: 09. release notes and changelog
- Why now: the current deployment flow does not require release notes.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that the current deployment flow does not require release notes.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_release_notes

### OD-085. Implement the foundation for release notes and changelog

- Priority: P2
- Effort: L
- Depends on: OD-084
- Epic: 09. release notes and changelog
- Why now: the current deployment flow does not require release notes.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-086. Implement the core behavior for release notes and changelog

- Priority: P2
- Effort: L
- Depends on: OD-085
- Epic: 09. release notes and changelog
- Why now: the current deployment flow does not require release notes.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: users and maintainers can tell what changed. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_release_notes

### OD-087. Add edge states and failure handling for release notes and changelog

- Priority: P2
- Effort: M
- Depends on: OD-086
- Epic: 09. release notes and changelog
- Why now: the current deployment flow does not require release notes.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to learner-visible changes, fixes, migrations, and known issues.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-088. Verify release notes and changelog with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: OD-087
- Epic: 09. release notes and changelog
- Why now: the current deployment flow does not require release notes.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-089. Document rollout, cost, and operations for release notes and changelog

- Priority: P2
- Effort: S
- Depends on: OD-088
- Epic: 09. release notes and changelog
- Why now: the current deployment flow does not require release notes.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when release notes and changelog uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-090. Measure and decide the future of release notes and changelog

- Priority: P2
- Effort: S
- Depends on: OD-089
- Epic: 09. release notes and changelog
- Why now: the current deployment flow does not require release notes.
- Scope: Compare the observed result with the target from the outcome task: each release has concise notes and a version. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_release_notes

## Epic 10: support and feedback channel

### OD-091. Audit support and feedback channel in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 10. support and feedback channel
- Why now: public feedback channels can create moderation work.
- Scope: Trace bug reports, learner feedback, diagnostics, and triage. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-092. Define the outcome and measurement for support and feedback channel

- Priority: P2
- Effort: S
- Depends on: OD-091
- Epic: 10. support and feedback channel
- Why now: public feedback channels can create moderation work.
- Scope: Write the intended result in plain language so that problems reach the maintainer with useful context. Choose one observable measure based on this target: a low-cost feedback path explains what information to include.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-093. Design the data and state contract for support and feedback channel

- Priority: P2
- Effort: M
- Depends on: OD-092
- Epic: 10. support and feedback channel
- Why now: public feedback channels can create moderation work.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in bug reports, learner feedback, diagnostics, and triage. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-094. Prototype support and feedback channel behind `ff_support_feedback`

- Priority: P2
- Effort: M
- Depends on: OD-093
- Epic: 10. support and feedback channel
- Why now: public feedback channels can create moderation work.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that public feedback channels can create moderation work.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_support_feedback

### OD-095. Implement the foundation for support and feedback channel

- Priority: P2
- Effort: L
- Depends on: OD-094
- Epic: 10. support and feedback channel
- Why now: public feedback channels can create moderation work.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-096. Implement the core behavior for support and feedback channel

- Priority: P2
- Effort: L
- Depends on: OD-095
- Epic: 10. support and feedback channel
- Why now: public feedback channels can create moderation work.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: problems reach the maintainer with useful context. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Prefer the free local path. Any hosted part needs renewable free-tier verification or a cost-benefit analysis before adoption.
- Flag or conflict notes: ff_support_feedback

### OD-097. Add edge states and failure handling for support and feedback channel

- Priority: P2
- Effort: M
- Depends on: OD-096
- Epic: 10. support and feedback channel
- Why now: public feedback channels can create moderation work.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to bug reports, learner feedback, diagnostics, and triage.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-098. Verify support and feedback channel with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: OD-097
- Epic: 10. support and feedback channel
- Why now: public feedback channels can create moderation work.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-099. Document rollout, cost, and operations for support and feedback channel

- Priority: P2
- Effort: S
- Depends on: OD-098
- Epic: 10. support and feedback channel
- Why now: public feedback channels can create moderation work.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when support and feedback channel uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Prefer the free local path. Any hosted part needs renewable free-tier verification or a cost-benefit analysis before adoption.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### OD-100. Measure and decide the future of support and feedback channel

- Priority: P2
- Effort: S
- Depends on: OD-099
- Epic: 10. support and feedback channel
- Why now: public feedback channels can create moderation work.
- Scope: Compare the observed result with the target from the outcome task: a low-cost feedback path explains what information to include. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_support_feedback

## Conflicts and feature-flag strategies

### Conflict 1: Guided tutorial versus contextual help

| Option | Pros | Cons |
|---|---|---|
| Use a guided tutorial | New learners receive a clear path and early success | Tutorials take design effort and returning learners may skip them |
| Use contextual help | Help appears only when needed and stays out of the core loop | Learners may miss concepts they do not know to ask about |

Feature-flag or coexistence plan: Use `ff_first_run_guide` for a short optional tutorial and keep contextual help always available.

### Conflict 2: In-app documentation versus external documentation

| Option | Pros | Cons |
|---|---|---|
| Write documentation in the app | Help is available where the learner needs it and can work offline | The app bundle grows and documentation UI needs maintenance |
| Write documentation in the repository or site | Docs are easier to review, version, and search | Learners must leave the app and offline access is weaker |

Feature-flag or coexistence plan: Keep short help in app and long guides in versioned documentation.

### Conflict 3: Public issue tracker versus private feedback form

| Option | Pros | Cons |
|---|---|---|
| Use a public issue tracker | Duplicates are visible; contributors can discuss fixes; no extra service is needed on GitHub | Learners may not have GitHub accounts; sensitive details can be exposed publicly |
| Use a private feedback form | Non-technical learners can report problems privately | A form service may have cost or data-retention constraints; reports need triage |

Feature-flag or coexistence plan: Start with GitHub issues and a local diagnostic copy action. Evaluate a free-tier form only if learner volume justifies it.

## Third-party service cost policy

Use repository documentation and GitHub issues first. Form, support desk, or knowledge-base services need free-tier verification or cost-benefit analysis.

When a service does not have a renewable free tier, the cost-benefit analysis must include monthly fixed cost, usage-based cost at expected volume, free alternative, learner or maintainer benefit, privacy cost, lock-in cost, exit cost, and the decision deadline. A free trial is not a renewable free tier.

### Cost-benefit analyses for options without a renewable free tier

| Option | Cost exposure | Benefit | Free alternative | Recommendation |
|---|---|---|---|---|
| Hosted support desk | Support desks often charge per seat after limited free plans or trials. | Provides triage, private learner messages, and support history. | Use GitHub issues for public defects and a documented email or local diagnostic flow for private reports. | Defer until report volume makes manual triage unreliable. |
| Hosted form service without a renewable free tier | Form volume, file uploads, or response exports can move to paid tiers. | Makes nontechnical feedback easier to submit. | Use GitHub issues, email, or a form service only after verifying a renewable free tier and data-retention terms. | Use only if learner feedback volume or accessibility need proves that GitHub is a real barrier. |

## Suggested sequencing

1. Complete P0 audit, outcome, design, and verification tasks before implementation tasks.
2. Choose at most one epic at a time for implementation.
3. Keep feature flags small, time-bounded, and tied to a measurement task.
4. Revisit this document after each landed slice and delete tasks that no longer earn their place.
