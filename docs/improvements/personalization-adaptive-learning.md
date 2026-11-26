# Personalization and adaptive learning improvement plan

## Purpose

Use local learner signals to adjust review, difficulty, pacing, and feedback without compromising privacy.

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

## Epic 01: local learner profile

### PZ-001. Audit local learner profile in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 01. local learner profile
- Why now: profile data can become sensitive if overcollected.
- Scope: Trace goals, settings, strengths, weaknesses, devices, and content preferences. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-002. Define the outcome and measurement for local learner profile

- Priority: P0
- Effort: S
- Depends on: PZ-001
- Epic: 01. local learner profile
- Why now: profile data can become sensitive if overcollected.
- Scope: Write the intended result in plain language so that personalization has a clear local data foundation. Choose one observable measure based on this target: one schema separates profile, progress, and preferences.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-003. Design the data and state contract for local learner profile

- Priority: P0
- Effort: M
- Depends on: PZ-002
- Epic: 01. local learner profile
- Why now: profile data can become sensitive if overcollected.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in goals, settings, strengths, weaknesses, devices, and content preferences. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-004. Prototype local learner profile behind `ff_learner_profile`

- Priority: P2
- Effort: M
- Depends on: PZ-003
- Epic: 01. local learner profile
- Why now: profile data can become sensitive if overcollected.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that profile data can become sensitive if overcollected.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_learner_profile

### PZ-005. Implement the foundation for local learner profile

- Priority: P2
- Effort: L
- Depends on: PZ-004
- Epic: 01. local learner profile
- Why now: profile data can become sensitive if overcollected.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-006. Implement the core behavior for local learner profile

- Priority: P1
- Effort: L
- Depends on: PZ-005
- Epic: 01. local learner profile
- Why now: profile data can become sensitive if overcollected.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: personalization has a clear local data foundation. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_learner_profile

### PZ-007. Add edge states and failure handling for local learner profile

- Priority: P2
- Effort: M
- Depends on: PZ-006
- Epic: 01. local learner profile
- Why now: profile data can become sensitive if overcollected.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to goals, settings, strengths, weaknesses, devices, and content preferences.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-008. Verify local learner profile with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: PZ-007
- Epic: 01. local learner profile
- Why now: profile data can become sensitive if overcollected.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-009. Document rollout, cost, and operations for local learner profile

- Priority: P2
- Effort: S
- Depends on: PZ-008
- Epic: 01. local learner profile
- Why now: profile data can become sensitive if overcollected.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when local learner profile uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-010. Measure and decide the future of local learner profile

- Priority: P2
- Effort: S
- Depends on: PZ-009
- Epic: 01. local learner profile
- Why now: profile data can become sensitive if overcollected.
- Scope: Compare the observed result with the target from the outcome task: one schema separates profile, progress, and preferences. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_learner_profile

## Epic 02: adaptive difficulty

### PZ-011. Audit adaptive difficulty in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 02. adaptive difficulty
- Why now: early data is sparse and easy to misread.
- Scope: Trace word length, tone complexity, accuracy, attempts, and recent errors. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-012. Define the outcome and measurement for adaptive difficulty

- Priority: P0
- Effort: S
- Depends on: PZ-011
- Epic: 02. adaptive difficulty
- Why now: early data is sparse and easy to misread.
- Scope: Write the intended result in plain language so that practice stays challenging without becoming frustrating. Choose one observable measure based on this target: difficulty rules are explicit and testable.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-013. Design the data and state contract for adaptive difficulty

- Priority: P0
- Effort: M
- Depends on: PZ-012
- Epic: 02. adaptive difficulty
- Why now: early data is sparse and easy to misread.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in word length, tone complexity, accuracy, attempts, and recent errors. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-014. Prototype adaptive difficulty behind `ff_adaptive_difficulty`

- Priority: P2
- Effort: M
- Depends on: PZ-013
- Epic: 02. adaptive difficulty
- Why now: early data is sparse and easy to misread.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that early data is sparse and easy to misread.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_adaptive_difficulty

### PZ-015. Implement the foundation for adaptive difficulty

- Priority: P2
- Effort: L
- Depends on: PZ-014
- Epic: 02. adaptive difficulty
- Why now: early data is sparse and easy to misread.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-016. Implement the core behavior for adaptive difficulty

- Priority: P1
- Effort: L
- Depends on: PZ-015
- Epic: 02. adaptive difficulty
- Why now: early data is sparse and easy to misread.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: practice stays challenging without becoming frustrating. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_adaptive_difficulty

### PZ-017. Add edge states and failure handling for adaptive difficulty

- Priority: P2
- Effort: M
- Depends on: PZ-016
- Epic: 02. adaptive difficulty
- Why now: early data is sparse and easy to misread.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to word length, tone complexity, accuracy, attempts, and recent errors.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-018. Verify adaptive difficulty with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: PZ-017
- Epic: 02. adaptive difficulty
- Why now: early data is sparse and easy to misread.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-019. Document rollout, cost, and operations for adaptive difficulty

- Priority: P2
- Effort: S
- Depends on: PZ-018
- Epic: 02. adaptive difficulty
- Why now: early data is sparse and easy to misread.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when adaptive difficulty uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-020. Measure and decide the future of adaptive difficulty

- Priority: P2
- Effort: S
- Depends on: PZ-019
- Epic: 02. adaptive difficulty
- Why now: early data is sparse and easy to misread.
- Scope: Compare the observed result with the target from the outcome task: difficulty rules are explicit and testable. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_adaptive_difficulty

## Epic 03: personalized review queue

### PZ-021. Audit personalized review queue in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 03. personalized review queue
- Why now: opaque recommendations can erode trust.
- Scope: Trace due items, failed words, mastery decay, and learner-selected content. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-022. Define the outcome and measurement for personalized review queue

- Priority: P2
- Effort: S
- Depends on: PZ-021
- Epic: 03. personalized review queue
- Why now: opaque recommendations can erode trust.
- Scope: Write the intended result in plain language so that learners know what to review next. Choose one observable measure based on this target: the queue explains why each item is included.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-023. Design the data and state contract for personalized review queue

- Priority: P1
- Effort: M
- Depends on: PZ-022
- Epic: 03. personalized review queue
- Why now: opaque recommendations can erode trust.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in due items, failed words, mastery decay, and learner-selected content. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-024. Prototype personalized review queue behind `ff_review_queue`

- Priority: P2
- Effort: M
- Depends on: PZ-023
- Epic: 03. personalized review queue
- Why now: opaque recommendations can erode trust.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that opaque recommendations can erode trust.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_review_queue

### PZ-025. Implement the foundation for personalized review queue

- Priority: P2
- Effort: L
- Depends on: PZ-024
- Epic: 03. personalized review queue
- Why now: opaque recommendations can erode trust.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-026. Implement the core behavior for personalized review queue

- Priority: P1
- Effort: L
- Depends on: PZ-025
- Epic: 03. personalized review queue
- Why now: opaque recommendations can erode trust.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: learners know what to review next. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_review_queue

### PZ-027. Add edge states and failure handling for personalized review queue

- Priority: P2
- Effort: M
- Depends on: PZ-026
- Epic: 03. personalized review queue
- Why now: opaque recommendations can erode trust.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to due items, failed words, mastery decay, and learner-selected content.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-028. Verify personalized review queue with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: PZ-027
- Epic: 03. personalized review queue
- Why now: opaque recommendations can erode trust.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-029. Document rollout, cost, and operations for personalized review queue

- Priority: P2
- Effort: S
- Depends on: PZ-028
- Epic: 03. personalized review queue
- Why now: opaque recommendations can erode trust.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when personalized review queue uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-030. Measure and decide the future of personalized review queue

- Priority: P2
- Effort: S
- Depends on: PZ-029
- Epic: 03. personalized review queue
- Why now: opaque recommendations can erode trust.
- Scope: Compare the observed result with the target from the outcome task: the queue explains why each item is included. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_review_queue

## Epic 04: tone weakness model

### PZ-031. Audit tone weakness model in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 04. tone weakness model
- Why now: small samples can label a learner incorrectly.
- Scope: Trace tone-specific scores, confusion patterns, and production feedback. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-032. Define the outcome and measurement for tone weakness model

- Priority: P2
- Effort: S
- Depends on: PZ-031
- Epic: 04. tone weakness model
- Why now: small samples can label a learner incorrectly.
- Scope: Write the intended result in plain language so that tone practice targets real weaknesses. Choose one observable measure based on this target: the model separates perception, production, and item difficulty.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-033. Design the data and state contract for tone weakness model

- Priority: P1
- Effort: M
- Depends on: PZ-032
- Epic: 04. tone weakness model
- Why now: small samples can label a learner incorrectly.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in tone-specific scores, confusion patterns, and production feedback. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-034. Prototype tone weakness model behind `ff_tone_weakness_model`

- Priority: P2
- Effort: M
- Depends on: PZ-033
- Epic: 04. tone weakness model
- Why now: small samples can label a learner incorrectly.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that small samples can label a learner incorrectly.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_tone_weakness_model

### PZ-035. Implement the foundation for tone weakness model

- Priority: P2
- Effort: L
- Depends on: PZ-034
- Epic: 04. tone weakness model
- Why now: small samples can label a learner incorrectly.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-036. Implement the core behavior for tone weakness model

- Priority: P1
- Effort: L
- Depends on: PZ-035
- Epic: 04. tone weakness model
- Why now: small samples can label a learner incorrectly.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: tone practice targets real weaknesses. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_tone_weakness_model

### PZ-037. Add edge states and failure handling for tone weakness model

- Priority: P2
- Effort: M
- Depends on: PZ-036
- Epic: 04. tone weakness model
- Why now: small samples can label a learner incorrectly.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to tone-specific scores, confusion patterns, and production feedback.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-038. Verify tone weakness model with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: PZ-037
- Epic: 04. tone weakness model
- Why now: small samples can label a learner incorrectly.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-039. Document rollout, cost, and operations for tone weakness model

- Priority: P2
- Effort: S
- Depends on: PZ-038
- Epic: 04. tone weakness model
- Why now: small samples can label a learner incorrectly.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when tone weakness model uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-040. Measure and decide the future of tone weakness model

- Priority: P2
- Effort: S
- Depends on: PZ-039
- Epic: 04. tone weakness model
- Why now: small samples can label a learner incorrectly.
- Scope: Compare the observed result with the target from the outcome task: the model separates perception, production, and item difficulty. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_tone_weakness_model

## Epic 05: session length and pacing

### PZ-041. Audit session length and pacing in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 05. session length and pacing
- Why now: too much automation can feel restrictive.
- Scope: Trace auto-continue, delays, attempt count, fatigue, and session goals. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-042. Define the outcome and measurement for session length and pacing

- Priority: P2
- Effort: S
- Depends on: PZ-041
- Epic: 05. session length and pacing
- Why now: too much automation can feel restrictive.
- Scope: Write the intended result in plain language so that sessions fit the learner's available time and energy. Choose one observable measure based on this target: pacing settings have sensible defaults and explanations.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-043. Design the data and state contract for session length and pacing

- Priority: P1
- Effort: M
- Depends on: PZ-042
- Epic: 05. session length and pacing
- Why now: too much automation can feel restrictive.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in auto-continue, delays, attempt count, fatigue, and session goals. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-044. Prototype session length and pacing behind `ff_session_pacing`

- Priority: P2
- Effort: M
- Depends on: PZ-043
- Epic: 05. session length and pacing
- Why now: too much automation can feel restrictive.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that too much automation can feel restrictive.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_session_pacing

### PZ-045. Implement the foundation for session length and pacing

- Priority: P2
- Effort: L
- Depends on: PZ-044
- Epic: 05. session length and pacing
- Why now: too much automation can feel restrictive.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-046. Implement the core behavior for session length and pacing

- Priority: P1
- Effort: L
- Depends on: PZ-045
- Epic: 05. session length and pacing
- Why now: too much automation can feel restrictive.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: sessions fit the learner's available time and energy. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_session_pacing

### PZ-047. Add edge states and failure handling for session length and pacing

- Priority: P2
- Effort: M
- Depends on: PZ-046
- Epic: 05. session length and pacing
- Why now: too much automation can feel restrictive.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to auto-continue, delays, attempt count, fatigue, and session goals.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-048. Verify session length and pacing with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: PZ-047
- Epic: 05. session length and pacing
- Why now: too much automation can feel restrictive.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-049. Document rollout, cost, and operations for session length and pacing

- Priority: P2
- Effort: S
- Depends on: PZ-048
- Epic: 05. session length and pacing
- Why now: too much automation can feel restrictive.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when session length and pacing uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-050. Measure and decide the future of session length and pacing

- Priority: P2
- Effort: S
- Depends on: PZ-049
- Epic: 05. session length and pacing
- Why now: too much automation can feel restrictive.
- Scope: Compare the observed result with the target from the outcome task: pacing settings have sensible defaults and explanations. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_session_pacing

## Epic 06: learning goals

### PZ-051. Audit learning goals in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 06. learning goals
- Why now: goals can become guilt-driven dark patterns.
- Scope: Trace daily minutes, words per week, tone mastery, and exam or class targets. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-052. Define the outcome and measurement for learning goals

- Priority: P2
- Effort: S
- Depends on: PZ-051
- Epic: 06. learning goals
- Why now: goals can become guilt-driven dark patterns.
- Scope: Write the intended result in plain language so that practice connects to a learner-defined outcome. Choose one observable measure based on this target: goals are optional, editable, and visible.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-053. Design the data and state contract for learning goals

- Priority: P1
- Effort: M
- Depends on: PZ-052
- Epic: 06. learning goals
- Why now: goals can become guilt-driven dark patterns.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in daily minutes, words per week, tone mastery, and exam or class targets. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-054. Prototype learning goals behind `ff_learning_goals`

- Priority: P2
- Effort: M
- Depends on: PZ-053
- Epic: 06. learning goals
- Why now: goals can become guilt-driven dark patterns.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that goals can become guilt-driven dark patterns.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_learning_goals

### PZ-055. Implement the foundation for learning goals

- Priority: P2
- Effort: L
- Depends on: PZ-054
- Epic: 06. learning goals
- Why now: goals can become guilt-driven dark patterns.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-056. Implement the core behavior for learning goals

- Priority: P1
- Effort: L
- Depends on: PZ-055
- Epic: 06. learning goals
- Why now: goals can become guilt-driven dark patterns.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: practice connects to a learner-defined outcome. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_learning_goals

### PZ-057. Add edge states and failure handling for learning goals

- Priority: P2
- Effort: M
- Depends on: PZ-056
- Epic: 06. learning goals
- Why now: goals can become guilt-driven dark patterns.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to daily minutes, words per week, tone mastery, and exam or class targets.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-058. Verify learning goals with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: PZ-057
- Epic: 06. learning goals
- Why now: goals can become guilt-driven dark patterns.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-059. Document rollout, cost, and operations for learning goals

- Priority: P2
- Effort: S
- Depends on: PZ-058
- Epic: 06. learning goals
- Why now: goals can become guilt-driven dark patterns.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when learning goals uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-060. Measure and decide the future of learning goals

- Priority: P2
- Effort: S
- Depends on: PZ-059
- Epic: 06. learning goals
- Why now: goals can become guilt-driven dark patterns.
- Scope: Compare the observed result with the target from the outcome task: goals are optional, editable, and visible. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_learning_goals

## Epic 07: content preferences

### PZ-061. Audit content preferences in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 07. content preferences
- Why now: preference filters can narrow exposure too much.
- Scope: Trace categories, custom decks, simplified or traditional forms, and audio preference. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-062. Define the outcome and measurement for content preferences

- Priority: P2
- Effort: S
- Depends on: PZ-061
- Epic: 07. content preferences
- Why now: preference filters can narrow exposure too much.
- Scope: Write the intended result in plain language so that learners practice content that matters to them. Choose one observable measure based on this target: preferences affect queues transparently.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-063. Design the data and state contract for content preferences

- Priority: P2
- Effort: M
- Depends on: PZ-062
- Epic: 07. content preferences
- Why now: preference filters can narrow exposure too much.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in categories, custom decks, simplified or traditional forms, and audio preference. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-064. Prototype content preferences behind `ff_content_preferences`

- Priority: P2
- Effort: M
- Depends on: PZ-063
- Epic: 07. content preferences
- Why now: preference filters can narrow exposure too much.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that preference filters can narrow exposure too much.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_content_preferences

### PZ-065. Implement the foundation for content preferences

- Priority: P2
- Effort: L
- Depends on: PZ-064
- Epic: 07. content preferences
- Why now: preference filters can narrow exposure too much.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-066. Implement the core behavior for content preferences

- Priority: P2
- Effort: L
- Depends on: PZ-065
- Epic: 07. content preferences
- Why now: preference filters can narrow exposure too much.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: learners practice content that matters to them. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_content_preferences

### PZ-067. Add edge states and failure handling for content preferences

- Priority: P2
- Effort: M
- Depends on: PZ-066
- Epic: 07. content preferences
- Why now: preference filters can narrow exposure too much.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to categories, custom decks, simplified or traditional forms, and audio preference.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-068. Verify content preferences with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: PZ-067
- Epic: 07. content preferences
- Why now: preference filters can narrow exposure too much.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-069. Document rollout, cost, and operations for content preferences

- Priority: P2
- Effort: S
- Depends on: PZ-068
- Epic: 07. content preferences
- Why now: preference filters can narrow exposure too much.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when content preferences uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-070. Measure and decide the future of content preferences

- Priority: P2
- Effort: S
- Depends on: PZ-069
- Epic: 07. content preferences
- Why now: preference filters can narrow exposure too much.
- Scope: Compare the observed result with the target from the outcome task: preferences affect queues transparently. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_content_preferences

## Epic 08: recommendation explainability

### PZ-071. Audit recommendation explainability in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 08. recommendation explainability
- Why now: recommendations based on weak signals can be wrong.
- Scope: Trace next mode, next word set, retry suggestions, and review prompts. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-072. Define the outcome and measurement for recommendation explainability

- Priority: P2
- Effort: S
- Depends on: PZ-071
- Epic: 08. recommendation explainability
- Why now: recommendations based on weak signals can be wrong.
- Scope: Write the intended result in plain language so that learners understand and control adaptation. Choose one observable measure based on this target: recommendations include a reason and a way to override.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-073. Design the data and state contract for recommendation explainability

- Priority: P2
- Effort: M
- Depends on: PZ-072
- Epic: 08. recommendation explainability
- Why now: recommendations based on weak signals can be wrong.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in next mode, next word set, retry suggestions, and review prompts. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-074. Prototype recommendation explainability behind `ff_recommendation_explainability`

- Priority: P2
- Effort: M
- Depends on: PZ-073
- Epic: 08. recommendation explainability
- Why now: recommendations based on weak signals can be wrong.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that recommendations based on weak signals can be wrong.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_recommendation_explainability

### PZ-075. Implement the foundation for recommendation explainability

- Priority: P2
- Effort: L
- Depends on: PZ-074
- Epic: 08. recommendation explainability
- Why now: recommendations based on weak signals can be wrong.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-076. Implement the core behavior for recommendation explainability

- Priority: P2
- Effort: L
- Depends on: PZ-075
- Epic: 08. recommendation explainability
- Why now: recommendations based on weak signals can be wrong.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: learners understand and control adaptation. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_recommendation_explainability

### PZ-077. Add edge states and failure handling for recommendation explainability

- Priority: P2
- Effort: M
- Depends on: PZ-076
- Epic: 08. recommendation explainability
- Why now: recommendations based on weak signals can be wrong.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to next mode, next word set, retry suggestions, and review prompts.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-078. Verify recommendation explainability with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: PZ-077
- Epic: 08. recommendation explainability
- Why now: recommendations based on weak signals can be wrong.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-079. Document rollout, cost, and operations for recommendation explainability

- Priority: P2
- Effort: S
- Depends on: PZ-078
- Epic: 08. recommendation explainability
- Why now: recommendations based on weak signals can be wrong.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when recommendation explainability uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-080. Measure and decide the future of recommendation explainability

- Priority: P2
- Effort: S
- Depends on: PZ-079
- Epic: 08. recommendation explainability
- Why now: recommendations based on weak signals can be wrong.
- Scope: Compare the observed result with the target from the outcome task: recommendations include a reason and a way to override. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_recommendation_explainability

## Epic 09: adaptive scoring thresholds

### PZ-081. Audit adaptive scoring thresholds in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 09. adaptive scoring thresholds
- Why now: adaptive thresholds can hide inconsistent standards.
- Scope: Trace mastery threshold, tone tolerance, retries, and item-specific difficulty. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-082. Define the outcome and measurement for adaptive scoring thresholds

- Priority: P2
- Effort: S
- Depends on: PZ-081
- Epic: 09. adaptive scoring thresholds
- Why now: adaptive thresholds can hide inconsistent standards.
- Scope: Write the intended result in plain language so that mastery expectations reflect task difficulty fairly. Choose one observable measure based on this target: threshold rules are documented and bounded.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-083. Design the data and state contract for adaptive scoring thresholds

- Priority: P2
- Effort: M
- Depends on: PZ-082
- Epic: 09. adaptive scoring thresholds
- Why now: adaptive thresholds can hide inconsistent standards.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in mastery threshold, tone tolerance, retries, and item-specific difficulty. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-084. Prototype adaptive scoring thresholds behind `ff_adaptive_thresholds`

- Priority: P2
- Effort: M
- Depends on: PZ-083
- Epic: 09. adaptive scoring thresholds
- Why now: adaptive thresholds can hide inconsistent standards.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that adaptive thresholds can hide inconsistent standards.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_adaptive_thresholds

### PZ-085. Implement the foundation for adaptive scoring thresholds

- Priority: P2
- Effort: L
- Depends on: PZ-084
- Epic: 09. adaptive scoring thresholds
- Why now: adaptive thresholds can hide inconsistent standards.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-086. Implement the core behavior for adaptive scoring thresholds

- Priority: P2
- Effort: L
- Depends on: PZ-085
- Epic: 09. adaptive scoring thresholds
- Why now: adaptive thresholds can hide inconsistent standards.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: mastery expectations reflect task difficulty fairly. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_adaptive_thresholds

### PZ-087. Add edge states and failure handling for adaptive scoring thresholds

- Priority: P2
- Effort: M
- Depends on: PZ-086
- Epic: 09. adaptive scoring thresholds
- Why now: adaptive thresholds can hide inconsistent standards.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to mastery threshold, tone tolerance, retries, and item-specific difficulty.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-088. Verify adaptive scoring thresholds with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: PZ-087
- Epic: 09. adaptive scoring thresholds
- Why now: adaptive thresholds can hide inconsistent standards.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-089. Document rollout, cost, and operations for adaptive scoring thresholds

- Priority: P2
- Effort: S
- Depends on: PZ-088
- Epic: 09. adaptive scoring thresholds
- Why now: adaptive thresholds can hide inconsistent standards.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when adaptive scoring thresholds uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-090. Measure and decide the future of adaptive scoring thresholds

- Priority: P2
- Effort: S
- Depends on: PZ-089
- Epic: 09. adaptive scoring thresholds
- Why now: adaptive thresholds can hide inconsistent standards.
- Scope: Compare the observed result with the target from the outcome task: threshold rules are documented and bounded. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_adaptive_thresholds

## Epic 10: privacy-preserving personalization

### PZ-091. Audit privacy-preserving personalization in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 10. privacy-preserving personalization
- Why now: cloud-based personalization conflicts with the cost and privacy rules.
- Scope: Trace local inference, data minimization, consent, and export. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-092. Define the outcome and measurement for privacy-preserving personalization

- Priority: P2
- Effort: S
- Depends on: PZ-091
- Epic: 10. privacy-preserving personalization
- Why now: cloud-based personalization conflicts with the cost and privacy rules.
- Scope: Write the intended result in plain language so that personalization does not require behavioral tracking. Choose one observable measure based on this target: all adaptation can run locally with exportable data.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-093. Design the data and state contract for privacy-preserving personalization

- Priority: P2
- Effort: M
- Depends on: PZ-092
- Epic: 10. privacy-preserving personalization
- Why now: cloud-based personalization conflicts with the cost and privacy rules.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in local inference, data minimization, consent, and export. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-094. Prototype privacy-preserving personalization behind `ff_privacy_preserving_personalization`

- Priority: P2
- Effort: M
- Depends on: PZ-093
- Epic: 10. privacy-preserving personalization
- Why now: cloud-based personalization conflicts with the cost and privacy rules.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that cloud-based personalization conflicts with the cost and privacy rules.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_privacy_preserving_personalization

### PZ-095. Implement the foundation for privacy-preserving personalization

- Priority: P2
- Effort: L
- Depends on: PZ-094
- Epic: 10. privacy-preserving personalization
- Why now: cloud-based personalization conflicts with the cost and privacy rules.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-096. Implement the core behavior for privacy-preserving personalization

- Priority: P2
- Effort: L
- Depends on: PZ-095
- Epic: 10. privacy-preserving personalization
- Why now: cloud-based personalization conflicts with the cost and privacy rules.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: personalization does not require behavioral tracking. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_privacy_preserving_personalization

### PZ-097. Add edge states and failure handling for privacy-preserving personalization

- Priority: P2
- Effort: M
- Depends on: PZ-096
- Epic: 10. privacy-preserving personalization
- Why now: cloud-based personalization conflicts with the cost and privacy rules.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to local inference, data minimization, consent, and export.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-098. Verify privacy-preserving personalization with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: PZ-097
- Epic: 10. privacy-preserving personalization
- Why now: cloud-based personalization conflicts with the cost and privacy rules.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-099. Document rollout, cost, and operations for privacy-preserving personalization

- Priority: P2
- Effort: S
- Depends on: PZ-098
- Epic: 10. privacy-preserving personalization
- Why now: cloud-based personalization conflicts with the cost and privacy rules.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when privacy-preserving personalization uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PZ-100. Measure and decide the future of privacy-preserving personalization

- Priority: P2
- Effort: S
- Depends on: PZ-099
- Epic: 10. privacy-preserving personalization
- Why now: cloud-based personalization conflicts with the cost and privacy rules.
- Scope: Compare the observed result with the target from the outcome task: all adaptation can run locally with exportable data. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_privacy_preserving_personalization

## Conflicts and feature-flag strategies

### Conflict 1: Rule-based adaptation versus machine-learned adaptation

| Option | Pros | Cons |
|---|---|---|
| Use rule-based adaptation | Rules are explainable, testable, local, and cheap | Rules may miss complex patterns and need manual tuning |
| Use machine-learned adaptation | The model could discover richer patterns with enough data | Data volume is insufficient; privacy and cost increase; behavior is harder to explain |

Feature-flag or coexistence plan: Use rule-based adaptation first. Consider machine-learned adaptation only after local data proves rules insufficient.

### Conflict 2: Persistent learner profiles versus anonymous sessions

| Option | Pros | Cons |
|---|---|---|
| Use persistent profiles | Progress, review, and adaptation improve over time | Retention, deletion, migration, and privacy work increase |
| Use anonymous sessions | Privacy is simple and learners can practice without setup | Long-term learning value and personalization are limited |

Feature-flag or coexistence plan: Use local persistence behind `ff_local_profile` with clear export and deletion controls.

### Conflict 3: Adaptive sequencing versus learner control

| Option | Pros | Cons |
|---|---|---|
| Let the system choose the next practice | Weak items get attention; decision fatigue drops | Learners can feel controlled or confused when recommendations are wrong |
| Let learners choose everything | Control and transparency are high; implementation is simpler | Learners may avoid difficult material or repeat what is easy |

Feature-flag or coexistence plan: Use recommendations with visible reasons and one-tap override behind `ff_adaptive_sequence`.

## Third-party service cost policy

Run personalization locally. Cloud recommendation or ML services need renewable free-tier verification and a cost-benefit analysis.

When a service does not have a renewable free tier, the cost-benefit analysis must include monthly fixed cost, usage-based cost at expected volume, free alternative, learner or maintainer benefit, privacy cost, lock-in cost, exit cost, and the decision deadline. A free trial is not a renewable free tier.

## Suggested sequencing

1. Complete P0 audit, outcome, design, and verification tasks before implementation tasks.
2. Choose at most one epic at a time for implementation.
3. Keep feature flags small, time-bounded, and tied to a measurement task.
4. Revisit this document after each landed slice and delete tasks that no longer earn their place.
