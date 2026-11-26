# Analytics and product measurement improvement plan

## Purpose

Measure learning outcomes, product usage, reliability, and cost without collecting sensitive learner behavior by default.

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

## Epic 01: measurement plan

### AN-001. Audit measurement plan in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 01. measurement plan
- Why now: collecting events before questions creates noise.
- Scope: Trace activation, practice completion, learning outcomes, retention, performance, and cost. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-002. Define the outcome and measurement for measurement plan

- Priority: P0
- Effort: S
- Depends on: AN-001
- Epic: 01. measurement plan
- Why now: collecting events before questions creates noise.
- Scope: Write the intended result in plain language so that analytics answers specific product questions. Choose one observable measure based on this target: every metric has a question, owner, source, and decision it informs.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-003. Design the data and state contract for measurement plan

- Priority: P0
- Effort: M
- Depends on: AN-002
- Epic: 01. measurement plan
- Why now: collecting events before questions creates noise.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in activation, practice completion, learning outcomes, retention, performance, and cost. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-004. Prototype measurement plan behind `ff_measurement_plan`

- Priority: P2
- Effort: M
- Depends on: AN-003
- Epic: 01. measurement plan
- Why now: collecting events before questions creates noise.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that collecting events before questions creates noise.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_measurement_plan

### AN-005. Implement the foundation for measurement plan

- Priority: P2
- Effort: L
- Depends on: AN-004
- Epic: 01. measurement plan
- Why now: collecting events before questions creates noise.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-006. Implement the core behavior for measurement plan

- Priority: P1
- Effort: L
- Depends on: AN-005
- Epic: 01. measurement plan
- Why now: collecting events before questions creates noise.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: analytics answers specific product questions. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_measurement_plan

### AN-007. Add edge states and failure handling for measurement plan

- Priority: P2
- Effort: M
- Depends on: AN-006
- Epic: 01. measurement plan
- Why now: collecting events before questions creates noise.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to activation, practice completion, learning outcomes, retention, performance, and cost.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-008. Verify measurement plan with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: AN-007
- Epic: 01. measurement plan
- Why now: collecting events before questions creates noise.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-009. Document rollout, cost, and operations for measurement plan

- Priority: P2
- Effort: S
- Depends on: AN-008
- Epic: 01. measurement plan
- Why now: collecting events before questions creates noise.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when measurement plan uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-010. Measure and decide the future of measurement plan

- Priority: P2
- Effort: S
- Depends on: AN-009
- Epic: 01. measurement plan
- Why now: collecting events before questions creates noise.
- Scope: Compare the observed result with the target from the outcome task: every metric has a question, owner, source, and decision it informs. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_measurement_plan

## Epic 02: privacy-preserving event taxonomy

### AN-011. Audit privacy-preserving event taxonomy in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 02. privacy-preserving event taxonomy
- Why now: learning events can reveal sensitive behavior patterns.
- Scope: Trace mode starts, completions, errors, feature-flag exposure, and performance. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-012. Define the outcome and measurement for privacy-preserving event taxonomy

- Priority: P0
- Effort: S
- Depends on: AN-011
- Epic: 02. privacy-preserving event taxonomy
- Why now: learning events can reveal sensitive behavior patterns.
- Scope: Write the intended result in plain language so that events are consistent without identifying learners. Choose one observable measure based on this target: the schema excludes raw audio, exact answers, and unnecessary identifiers.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-013. Design the data and state contract for privacy-preserving event taxonomy

- Priority: P0
- Effort: M
- Depends on: AN-012
- Epic: 02. privacy-preserving event taxonomy
- Why now: learning events can reveal sensitive behavior patterns.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in mode starts, completions, errors, feature-flag exposure, and performance. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-014. Prototype privacy-preserving event taxonomy behind `ff_event_taxonomy`

- Priority: P2
- Effort: M
- Depends on: AN-013
- Epic: 02. privacy-preserving event taxonomy
- Why now: learning events can reveal sensitive behavior patterns.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that learning events can reveal sensitive behavior patterns.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_event_taxonomy

### AN-015. Implement the foundation for privacy-preserving event taxonomy

- Priority: P2
- Effort: L
- Depends on: AN-014
- Epic: 02. privacy-preserving event taxonomy
- Why now: learning events can reveal sensitive behavior patterns.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-016. Implement the core behavior for privacy-preserving event taxonomy

- Priority: P1
- Effort: L
- Depends on: AN-015
- Epic: 02. privacy-preserving event taxonomy
- Why now: learning events can reveal sensitive behavior patterns.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: events are consistent without identifying learners. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_event_taxonomy

### AN-017. Add edge states and failure handling for privacy-preserving event taxonomy

- Priority: P2
- Effort: M
- Depends on: AN-016
- Epic: 02. privacy-preserving event taxonomy
- Why now: learning events can reveal sensitive behavior patterns.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to mode starts, completions, errors, feature-flag exposure, and performance.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-018. Verify privacy-preserving event taxonomy with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: AN-017
- Epic: 02. privacy-preserving event taxonomy
- Why now: learning events can reveal sensitive behavior patterns.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-019. Document rollout, cost, and operations for privacy-preserving event taxonomy

- Priority: P2
- Effort: S
- Depends on: AN-018
- Epic: 02. privacy-preserving event taxonomy
- Why now: learning events can reveal sensitive behavior patterns.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when privacy-preserving event taxonomy uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-020. Measure and decide the future of privacy-preserving event taxonomy

- Priority: P2
- Effort: S
- Depends on: AN-019
- Epic: 02. privacy-preserving event taxonomy
- Why now: learning events can reveal sensitive behavior patterns.
- Scope: Compare the observed result with the target from the outcome task: the schema excludes raw audio, exact answers, and unnecessary identifiers. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_event_taxonomy

## Epic 03: local analytics prototype

### AN-021. Audit local analytics prototype in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 03. local analytics prototype
- Why now: local-only data cannot show cohorts across users.
- Scope: Trace local counters, session summaries, exportable reports, and no-network operation. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-022. Define the outcome and measurement for local analytics prototype

- Priority: P2
- Effort: S
- Depends on: AN-021
- Epic: 03. local analytics prototype
- Why now: local-only data cannot show cohorts across users.
- Scope: Write the intended result in plain language so that the project can validate useful metrics before choosing a service. Choose one observable measure based on this target: a local report answers the first measurement questions.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-023. Design the data and state contract for local analytics prototype

- Priority: P1
- Effort: M
- Depends on: AN-022
- Epic: 03. local analytics prototype
- Why now: local-only data cannot show cohorts across users.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in local counters, session summaries, exportable reports, and no-network operation. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-024. Prototype local analytics prototype behind `ff_local_analytics_prototype`

- Priority: P2
- Effort: M
- Depends on: AN-023
- Epic: 03. local analytics prototype
- Why now: local-only data cannot show cohorts across users.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that local-only data cannot show cohorts across users.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_local_analytics_prototype

### AN-025. Implement the foundation for local analytics prototype

- Priority: P2
- Effort: L
- Depends on: AN-024
- Epic: 03. local analytics prototype
- Why now: local-only data cannot show cohorts across users.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-026. Implement the core behavior for local analytics prototype

- Priority: P1
- Effort: L
- Depends on: AN-025
- Epic: 03. local analytics prototype
- Why now: local-only data cannot show cohorts across users.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: the project can validate useful metrics before choosing a service. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_local_analytics_prototype

### AN-027. Add edge states and failure handling for local analytics prototype

- Priority: P2
- Effort: M
- Depends on: AN-026
- Epic: 03. local analytics prototype
- Why now: local-only data cannot show cohorts across users.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to local counters, session summaries, exportable reports, and no-network operation.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-028. Verify local analytics prototype with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: AN-027
- Epic: 03. local analytics prototype
- Why now: local-only data cannot show cohorts across users.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-029. Document rollout, cost, and operations for local analytics prototype

- Priority: P2
- Effort: S
- Depends on: AN-028
- Epic: 03. local analytics prototype
- Why now: local-only data cannot show cohorts across users.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when local analytics prototype uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-030. Measure and decide the future of local analytics prototype

- Priority: P2
- Effort: S
- Depends on: AN-029
- Epic: 03. local analytics prototype
- Why now: local-only data cannot show cohorts across users.
- Scope: Compare the observed result with the target from the outcome task: a local report answers the first measurement questions. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_local_analytics_prototype

## Epic 04: analytics service selection

### AN-031. Audit analytics service selection in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 04. analytics service selection
- Why now: analytics services can lock in event history.
- Scope: Trace open-source, self-hosted, and managed analytics options. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-032. Define the outcome and measurement for analytics service selection

- Priority: P2
- Effort: S
- Depends on: AN-031
- Epic: 04. analytics service selection
- Why now: analytics services can lock in event history.
- Scope: Write the intended result in plain language so that service choice is explicit and cost-controlled. Choose one observable measure based on this target: a decision record compares privacy, free-tier renewal, export, and effort.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-033. Design the data and state contract for analytics service selection

- Priority: P1
- Effort: M
- Depends on: AN-032
- Epic: 04. analytics service selection
- Why now: analytics services can lock in event history.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in open-source, self-hosted, and managed analytics options. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-034. Evaluate the smallest real option for analytics service selection

- Priority: P2
- Effort: M
- Depends on: AN-033
- Epic: 04. analytics service selection
- Why now: analytics services can lock in event history.
- Scope: Compare the smallest real implementation or policy choice for open-source, self-hosted, and managed analytics options. The evaluation must expose the risk that analytics services can lock in event history and must use the repository cost rule.
- Acceptance criteria: The evaluation records the evidence, the rejected option, the cost decision, and whether the default is keep, revise, or discard.
- Cost and service notes: Prefer local evaluation. Use a third-party service only if it has a renewable free tier and the evaluation states the quota assumption.
- Flag or conflict notes: ff_analytics_service_selection

### AN-035. Write the decision foundation for analytics service selection

- Priority: P2
- Effort: L
- Depends on: AN-034
- Epic: 04. analytics service selection
- Why now: analytics services can lock in event history.
- Scope: Capture the options, constraints, privacy impact, cost screen, evidence gaps, rollback rule, and the smallest safe default. Keep the decision narrow enough to reverse when evidence changes.
- Acceptance criteria: The decision foundation is reviewable on its own and separates current behavior from the proposed default.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-036. Adopt the default decision for analytics service selection

- Priority: P1
- Effort: L
- Depends on: AN-035
- Epic: 04. analytics service selection
- Why now: analytics services can lock in event history.
- Scope: Write the default decision that moves the area toward this outcome: service choice is explicit and cost-controlled. Name the evidence that would reopen the decision.
- Acceptance criteria: The decision states what is adopted, what is rejected, what remains local-first, and what cost-benefit analysis is required before any paid dependency.
- Cost and service notes: Prefer the free local path. Any hosted part needs renewable free-tier verification or a cost-benefit analysis before adoption.
- Flag or conflict notes: ff_analytics_service_selection

### AN-037. Document edge cases and failure handling for analytics service selection

- Priority: P2
- Effort: M
- Depends on: AN-036
- Epic: 04. analytics service selection
- Why now: analytics services can lock in event history.
- Scope: Cover missing evidence, quota exhaustion, service removal, pricing changes, privacy objections, and migration failure where they apply to open-source, self-hosted, and managed analytics options.
- Acceptance criteria: Each relevant edge case has a fallback, an owner, and a clear rule for returning to the free local path.
- Cost and service notes: Use local analysis. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-038. Validate the decision for analytics service selection against real constraints

- Priority: P1
- Effort: M
- Depends on: AN-037
- Epic: 04. analytics service selection
- Why now: analytics services can lock in event history.
- Scope: Check the decision against the current app, the cost rule, privacy expectations, and the highest-risk failure path. Use a small real artifact or service-console check when one is available.
- Acceptance criteria: The validation names the evidence inspected, passes only when the decision still satisfies the constraints, and records any open assumption.
- Cost and service notes: Use open-source local test tooling and free service consoles. Paid validation infrastructure requires a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-039. Document rollout, cost, and operations for analytics service selection

- Priority: P2
- Effort: S
- Depends on: AN-038
- Epic: 04. analytics service selection
- Why now: analytics services can lock in event history.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when analytics service selection uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Prefer the free local path. Any hosted part needs renewable free-tier verification or a cost-benefit analysis before adoption.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-040. Measure and decide the future of analytics service selection

- Priority: P2
- Effort: S
- Depends on: AN-039
- Epic: 04. analytics service selection
- Why now: analytics services can lock in event history.
- Scope: Compare the observed result with the target from the outcome task: a decision record compares privacy, free-tier renewal, export, and effort. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_analytics_service_selection

## Epic 05: activation and session funnel instrumentation

### AN-041. Audit activation and session funnel instrumentation in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 05. activation and session funnel instrumentation
- Why now: funnels do not explain why users drop off.
- Scope: Trace first open, mode selection, session start, completion, retry, and return. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-042. Define the outcome and measurement for activation and session funnel instrumentation

- Priority: P2
- Effort: S
- Depends on: AN-041
- Epic: 05. activation and session funnel instrumentation
- Why now: funnels do not explain why users drop off.
- Scope: Write the intended result in plain language so that drop-off points become visible. Choose one observable measure based on this target: each funnel step has one event and a written definition.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-043. Design the data and state contract for activation and session funnel instrumentation

- Priority: P1
- Effort: M
- Depends on: AN-042
- Epic: 05. activation and session funnel instrumentation
- Why now: funnels do not explain why users drop off.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in first open, mode selection, session start, completion, retry, and return. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-044. Prototype activation and session funnel instrumentation behind `ff_funnel_instrumentation`

- Priority: P2
- Effort: M
- Depends on: AN-043
- Epic: 05. activation and session funnel instrumentation
- Why now: funnels do not explain why users drop off.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that funnels do not explain why users drop off.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_funnel_instrumentation

### AN-045. Implement the foundation for activation and session funnel instrumentation

- Priority: P2
- Effort: L
- Depends on: AN-044
- Epic: 05. activation and session funnel instrumentation
- Why now: funnels do not explain why users drop off.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-046. Implement the core behavior for activation and session funnel instrumentation

- Priority: P1
- Effort: L
- Depends on: AN-045
- Epic: 05. activation and session funnel instrumentation
- Why now: funnels do not explain why users drop off.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: drop-off points become visible. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_funnel_instrumentation

### AN-047. Add edge states and failure handling for activation and session funnel instrumentation

- Priority: P2
- Effort: M
- Depends on: AN-046
- Epic: 05. activation and session funnel instrumentation
- Why now: funnels do not explain why users drop off.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to first open, mode selection, session start, completion, retry, and return.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-048. Verify activation and session funnel instrumentation with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: AN-047
- Epic: 05. activation and session funnel instrumentation
- Why now: funnels do not explain why users drop off.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-049. Document rollout, cost, and operations for activation and session funnel instrumentation

- Priority: P2
- Effort: S
- Depends on: AN-048
- Epic: 05. activation and session funnel instrumentation
- Why now: funnels do not explain why users drop off.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when activation and session funnel instrumentation uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-050. Measure and decide the future of activation and session funnel instrumentation

- Priority: P2
- Effort: S
- Depends on: AN-049
- Epic: 05. activation and session funnel instrumentation
- Why now: funnels do not explain why users drop off.
- Scope: Compare the observed result with the target from the outcome task: each funnel step has one event and a written definition. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_funnel_instrumentation

## Epic 06: learning outcome metrics

### AN-051. Audit learning outcome metrics in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 06. learning outcome metrics
- Why now: learning outcomes are slower and harder to measure.
- Scope: Trace mastery durability, review recall, tone improvement, and transfer. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-052. Define the outcome and measurement for learning outcome metrics

- Priority: P2
- Effort: S
- Depends on: AN-051
- Epic: 06. learning outcome metrics
- Why now: learning outcomes are slower and harder to measure.
- Scope: Write the intended result in plain language so that the app measures learning rather than only engagement. Choose one observable measure based on this target: at least one outcome metric has a defensible definition.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-053. Design the data and state contract for learning outcome metrics

- Priority: P1
- Effort: M
- Depends on: AN-052
- Epic: 06. learning outcome metrics
- Why now: learning outcomes are slower and harder to measure.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in mastery durability, review recall, tone improvement, and transfer. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-054. Prototype learning outcome metrics behind `ff_learning_outcome_metrics`

- Priority: P2
- Effort: M
- Depends on: AN-053
- Epic: 06. learning outcome metrics
- Why now: learning outcomes are slower and harder to measure.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that learning outcomes are slower and harder to measure.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_learning_outcome_metrics

### AN-055. Implement the foundation for learning outcome metrics

- Priority: P2
- Effort: L
- Depends on: AN-054
- Epic: 06. learning outcome metrics
- Why now: learning outcomes are slower and harder to measure.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-056. Implement the core behavior for learning outcome metrics

- Priority: P1
- Effort: L
- Depends on: AN-055
- Epic: 06. learning outcome metrics
- Why now: learning outcomes are slower and harder to measure.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: the app measures learning rather than only engagement. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_learning_outcome_metrics

### AN-057. Add edge states and failure handling for learning outcome metrics

- Priority: P2
- Effort: M
- Depends on: AN-056
- Epic: 06. learning outcome metrics
- Why now: learning outcomes are slower and harder to measure.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to mastery durability, review recall, tone improvement, and transfer.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-058. Verify learning outcome metrics with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: AN-057
- Epic: 06. learning outcome metrics
- Why now: learning outcomes are slower and harder to measure.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-059. Document rollout, cost, and operations for learning outcome metrics

- Priority: P2
- Effort: S
- Depends on: AN-058
- Epic: 06. learning outcome metrics
- Why now: learning outcomes are slower and harder to measure.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when learning outcome metrics uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-060. Measure and decide the future of learning outcome metrics

- Priority: P2
- Effort: S
- Depends on: AN-059
- Epic: 06. learning outcome metrics
- Why now: learning outcomes are slower and harder to measure.
- Scope: Compare the observed result with the target from the outcome task: at least one outcome metric has a defensible definition. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_learning_outcome_metrics

## Epic 07: performance and reliability metrics

### AN-061. Audit performance and reliability metrics in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 07. performance and reliability metrics
- Why now: client telemetry can add cost and privacy risk.
- Scope: Trace startup, playback failures, recording failures, offline success, and crashes. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-062. Define the outcome and measurement for performance and reliability metrics

- Priority: P2
- Effort: S
- Depends on: AN-061
- Epic: 07. performance and reliability metrics
- Why now: client telemetry can add cost and privacy risk.
- Scope: Write the intended result in plain language so that technical regressions are visible. Choose one observable measure based on this target: metrics include device class and app version without precise identity.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-063. Design the data and state contract for performance and reliability metrics

- Priority: P2
- Effort: M
- Depends on: AN-062
- Epic: 07. performance and reliability metrics
- Why now: client telemetry can add cost and privacy risk.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in startup, playback failures, recording failures, offline success, and crashes. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-064. Prototype performance and reliability metrics behind `ff_reliability_metrics`

- Priority: P2
- Effort: M
- Depends on: AN-063
- Epic: 07. performance and reliability metrics
- Why now: client telemetry can add cost and privacy risk.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that client telemetry can add cost and privacy risk.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_reliability_metrics

### AN-065. Implement the foundation for performance and reliability metrics

- Priority: P2
- Effort: L
- Depends on: AN-064
- Epic: 07. performance and reliability metrics
- Why now: client telemetry can add cost and privacy risk.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-066. Implement the core behavior for performance and reliability metrics

- Priority: P2
- Effort: L
- Depends on: AN-065
- Epic: 07. performance and reliability metrics
- Why now: client telemetry can add cost and privacy risk.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: technical regressions are visible. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_reliability_metrics

### AN-067. Add edge states and failure handling for performance and reliability metrics

- Priority: P2
- Effort: M
- Depends on: AN-066
- Epic: 07. performance and reliability metrics
- Why now: client telemetry can add cost and privacy risk.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to startup, playback failures, recording failures, offline success, and crashes.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-068. Verify performance and reliability metrics with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: AN-067
- Epic: 07. performance and reliability metrics
- Why now: client telemetry can add cost and privacy risk.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-069. Document rollout, cost, and operations for performance and reliability metrics

- Priority: P2
- Effort: S
- Depends on: AN-068
- Epic: 07. performance and reliability metrics
- Why now: client telemetry can add cost and privacy risk.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when performance and reliability metrics uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-070. Measure and decide the future of performance and reliability metrics

- Priority: P2
- Effort: S
- Depends on: AN-069
- Epic: 07. performance and reliability metrics
- Why now: client telemetry can add cost and privacy risk.
- Scope: Compare the observed result with the target from the outcome task: metrics include device class and app version without precise identity. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_reliability_metrics

## Epic 08: experimentation and feature flags

### AN-071. Audit experimentation and feature flags in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 08. experimentation and feature flags
- Why now: small user volume may make experiments inconclusive.
- Scope: Trace flag exposure, control groups, rollout, and evaluation. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-072. Define the outcome and measurement for experimentation and feature flags

- Priority: P2
- Effort: S
- Depends on: AN-071
- Epic: 08. experimentation and feature flags
- Why now: small user volume may make experiments inconclusive.
- Scope: Write the intended result in plain language so that experiments produce evidence instead of opinions. Choose one observable measure based on this target: flag metadata includes owner, hypothesis, metric, and end date.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-073. Design the data and state contract for experimentation and feature flags

- Priority: P2
- Effort: M
- Depends on: AN-072
- Epic: 08. experimentation and feature flags
- Why now: small user volume may make experiments inconclusive.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in flag exposure, control groups, rollout, and evaluation. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-074. Prototype experimentation and feature flags behind `ff_experimentation_flags`

- Priority: P2
- Effort: M
- Depends on: AN-073
- Epic: 08. experimentation and feature flags
- Why now: small user volume may make experiments inconclusive.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that small user volume may make experiments inconclusive.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_experimentation_flags

### AN-075. Implement the foundation for experimentation and feature flags

- Priority: P2
- Effort: L
- Depends on: AN-074
- Epic: 08. experimentation and feature flags
- Why now: small user volume may make experiments inconclusive.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-076. Implement the core behavior for experimentation and feature flags

- Priority: P2
- Effort: L
- Depends on: AN-075
- Epic: 08. experimentation and feature flags
- Why now: small user volume may make experiments inconclusive.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: experiments produce evidence instead of opinions. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_experimentation_flags

### AN-077. Add edge states and failure handling for experimentation and feature flags

- Priority: P2
- Effort: M
- Depends on: AN-076
- Epic: 08. experimentation and feature flags
- Why now: small user volume may make experiments inconclusive.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to flag exposure, control groups, rollout, and evaluation.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-078. Verify experimentation and feature flags with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: AN-077
- Epic: 08. experimentation and feature flags
- Why now: small user volume may make experiments inconclusive.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-079. Document rollout, cost, and operations for experimentation and feature flags

- Priority: P2
- Effort: S
- Depends on: AN-078
- Epic: 08. experimentation and feature flags
- Why now: small user volume may make experiments inconclusive.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when experimentation and feature flags uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-080. Measure and decide the future of experimentation and feature flags

- Priority: P2
- Effort: S
- Depends on: AN-079
- Epic: 08. experimentation and feature flags
- Why now: small user volume may make experiments inconclusive.
- Scope: Compare the observed result with the target from the outcome task: flag metadata includes owner, hypothesis, metric, and end date. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_experimentation_flags

## Epic 09: analytics governance and consent

### AN-081. Audit analytics governance and consent in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 09. analytics governance and consent
- Why now: consent UX can become complex.
- Scope: Trace consent, retention, deletion, export, and data minimization. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-082. Define the outcome and measurement for analytics governance and consent

- Priority: P2
- Effort: S
- Depends on: AN-081
- Epic: 09. analytics governance and consent
- Why now: consent UX can become complex.
- Scope: Write the intended result in plain language so that measurement respects learner expectations. Choose one observable measure based on this target: a data inventory covers every analytics field and purpose.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-083. Design the data and state contract for analytics governance and consent

- Priority: P2
- Effort: M
- Depends on: AN-082
- Epic: 09. analytics governance and consent
- Why now: consent UX can become complex.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in consent, retention, deletion, export, and data minimization. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-084. Prototype analytics governance and consent behind `ff_data_governance_consent`

- Priority: P2
- Effort: M
- Depends on: AN-083
- Epic: 09. analytics governance and consent
- Why now: consent UX can become complex.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that consent UX can become complex.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_data_governance_consent

### AN-085. Implement the foundation for analytics governance and consent

- Priority: P2
- Effort: L
- Depends on: AN-084
- Epic: 09. analytics governance and consent
- Why now: consent UX can become complex.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-086. Implement the core behavior for analytics governance and consent

- Priority: P2
- Effort: L
- Depends on: AN-085
- Epic: 09. analytics governance and consent
- Why now: consent UX can become complex.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: measurement respects learner expectations. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_data_governance_consent

### AN-087. Add edge states and failure handling for analytics governance and consent

- Priority: P2
- Effort: M
- Depends on: AN-086
- Epic: 09. analytics governance and consent
- Why now: consent UX can become complex.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to consent, retention, deletion, export, and data minimization.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-088. Verify analytics governance and consent with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: AN-087
- Epic: 09. analytics governance and consent
- Why now: consent UX can become complex.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-089. Document rollout, cost, and operations for analytics governance and consent

- Priority: P2
- Effort: S
- Depends on: AN-088
- Epic: 09. analytics governance and consent
- Why now: consent UX can become complex.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when analytics governance and consent uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-090. Measure and decide the future of analytics governance and consent

- Priority: P2
- Effort: S
- Depends on: AN-089
- Epic: 09. analytics governance and consent
- Why now: consent UX can become complex.
- Scope: Compare the observed result with the target from the outcome task: a data inventory covers every analytics field and purpose. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_data_governance_consent

## Epic 10: dashboards and reporting

### AN-091. Audit dashboards and reporting in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 10. dashboards and reporting
- Why now: dashboards can become unused decoration.
- Scope: Trace weekly product health, learning outcomes, reliability, and cost. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-092. Define the outcome and measurement for dashboards and reporting

- Priority: P2
- Effort: S
- Depends on: AN-091
- Epic: 10. dashboards and reporting
- Why now: dashboards can become unused decoration.
- Scope: Write the intended result in plain language so that the maintainer reviews a small set of decision-ready metrics. Choose one observable measure based on this target: one dashboard or report exists with defined review cadence.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-093. Design the data and state contract for dashboards and reporting

- Priority: P2
- Effort: M
- Depends on: AN-092
- Epic: 10. dashboards and reporting
- Why now: dashboards can become unused decoration.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in weekly product health, learning outcomes, reliability, and cost. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-094. Prototype dashboards and reporting behind `ff_dashboards_reporting`

- Priority: P2
- Effort: M
- Depends on: AN-093
- Epic: 10. dashboards and reporting
- Why now: dashboards can become unused decoration.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that dashboards can become unused decoration.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_dashboards_reporting

### AN-095. Implement the foundation for dashboards and reporting

- Priority: P2
- Effort: L
- Depends on: AN-094
- Epic: 10. dashboards and reporting
- Why now: dashboards can become unused decoration.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-096. Implement the core behavior for dashboards and reporting

- Priority: P2
- Effort: L
- Depends on: AN-095
- Epic: 10. dashboards and reporting
- Why now: dashboards can become unused decoration.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: the maintainer reviews a small set of decision-ready metrics. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_dashboards_reporting

### AN-097. Add edge states and failure handling for dashboards and reporting

- Priority: P2
- Effort: M
- Depends on: AN-096
- Epic: 10. dashboards and reporting
- Why now: dashboards can become unused decoration.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to weekly product health, learning outcomes, reliability, and cost.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-098. Verify dashboards and reporting with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: AN-097
- Epic: 10. dashboards and reporting
- Why now: dashboards can become unused decoration.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-099. Document rollout, cost, and operations for dashboards and reporting

- Priority: P2
- Effort: S
- Depends on: AN-098
- Epic: 10. dashboards and reporting
- Why now: dashboards can become unused decoration.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when dashboards and reporting uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AN-100. Measure and decide the future of dashboards and reporting

- Priority: P2
- Effort: S
- Depends on: AN-099
- Epic: 10. dashboards and reporting
- Why now: dashboards can become unused decoration.
- Scope: Compare the observed result with the target from the outcome task: one dashboard or report exists with defined review cadence. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_dashboards_reporting

## Conflicts and feature-flag strategies

### Conflict 1: Managed analytics versus local-first measurement

| Option | Pros | Cons |
|---|---|---|
| Use managed analytics | Dashboards and cohort analysis arrive quickly; a free tier may cover early volume | Behavioral data leaves the device; quotas and retention policies constrain use |
| Use local-first measurement | Privacy is strong; no service is required; metrics can be exported voluntarily | The maintainer cannot see aggregate product usage automatically |

Feature-flag or coexistence plan: Validate metrics locally first. Adopt a managed service only behind `ff_remote_analytics` with consent and free-tier verification.

### Conflict 2: Detailed event tracking versus coarse metrics

| Option | Pros | Cons |
|---|---|---|
| Track detailed events | Analysis can answer more questions later | Privacy risk, storage, schema complexity, and noise increase |
| Track coarse metrics | Data minimization is easier and dashboards stay focused | Some product questions cannot be answered later |

Feature-flag or coexistence plan: Start coarse. Add detailed events only when a written question requires them.

### Conflict 3: A/B experiments versus sequential rollouts

| Option | Pros | Cons |
|---|---|---|
| Run A/B experiments | Comparisons are stronger when sample size supports them | The proof of concept may not have enough users; experimentation infrastructure adds cost |
| Use sequential rollouts | Implementation is simpler and small samples still provide some evidence | Results are weaker because time and audience changes confound them |

Feature-flag or coexistence plan: Use feature flags with sequential measurement first. Reserve A/B tooling for questions with enough volume.

## Third-party service cost policy

PostHog, Plausible, Umami, or self-hosted options must be compared for renewable free tier, export, privacy, and effort. Paid analytics needs cost-benefit analysis.

When a service does not have a renewable free tier, the cost-benefit analysis must include monthly fixed cost, usage-based cost at expected volume, free alternative, learner or maintainer benefit, privacy cost, lock-in cost, exit cost, and the decision deadline. A free trial is not a renewable free tier.

### Cost-benefit analyses for options without a renewable free tier

| Option | Cost exposure | Benefit | Free alternative | Recommendation |
|---|---|---|---|---|
| Managed analytics beyond a renewable free tier | Usage-based event volume or monthly seats can create recurring cost as learners grow. | Provides dashboards, cohort analysis, funnels, and managed retention. | Use local metrics, open-source self-hosted analytics, or a verified renewable free tier with strict event minimization. | Do not exceed the free tier silently. Pay only when a weekly product decision depends on the missing data. |
| Paid experimentation platform | Experimentation tools often charge by traffic, events, or seats. | Provides assignment, analysis, and experiment governance. | Use local feature flags and sequential rollout measurement while traffic is low. | Defer until traffic is large enough for experiments to reach a useful decision. |

## Suggested sequencing

1. Complete P0 audit, outcome, design, and verification tasks before implementation tasks.
2. Choose at most one epic at a time for implementation.
3. Keep feature flags small, time-bounded, and tied to a measurement task.
4. Revisit this document after each landed slice and delete tasks that no longer earn their place.
