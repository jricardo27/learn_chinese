# Learning science and pedagogy improvement plan

## Purpose

Ground mode design, feedback, difficulty, and mastery rules in language-learning evidence instead of proof-of-concept convenience.

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

## Epic 01: learning objectives and scope

### LP-001. Audit learning objectives and scope in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 01. learning objectives and scope
- Why now: the current modes mix several skills without explicit outcomes.
- Scope: Trace vocabulary, tones, classifiers, recall, writing, listening, and shadowing. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-002. Define the outcome and measurement for learning objectives and scope

- Priority: P0
- Effort: S
- Depends on: LP-001
- Epic: 01. learning objectives and scope
- Why now: the current modes mix several skills without explicit outcomes.
- Scope: Write the intended result in plain language so that each mode has a clear learning job. Choose one observable measure based on this target: every mode states what it teaches, what it does not teach, and how mastery is judged.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-003. Design the data and state contract for learning objectives and scope

- Priority: P0
- Effort: M
- Depends on: LP-002
- Epic: 01. learning objectives and scope
- Why now: the current modes mix several skills without explicit outcomes.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in vocabulary, tones, classifiers, recall, writing, listening, and shadowing. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-004. Prototype learning objectives and scope behind `ff_learning_objectives`

- Priority: P2
- Effort: M
- Depends on: LP-003
- Epic: 01. learning objectives and scope
- Why now: the current modes mix several skills without explicit outcomes.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that the current modes mix several skills without explicit outcomes.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_learning_objectives

### LP-005. Implement the foundation for learning objectives and scope

- Priority: P2
- Effort: L
- Depends on: LP-004
- Epic: 01. learning objectives and scope
- Why now: the current modes mix several skills without explicit outcomes.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-006. Implement the core behavior for learning objectives and scope

- Priority: P1
- Effort: L
- Depends on: LP-005
- Epic: 01. learning objectives and scope
- Why now: the current modes mix several skills without explicit outcomes.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: each mode has a clear learning job. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_learning_objectives

### LP-007. Add edge states and failure handling for learning objectives and scope

- Priority: P2
- Effort: M
- Depends on: LP-006
- Epic: 01. learning objectives and scope
- Why now: the current modes mix several skills without explicit outcomes.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to vocabulary, tones, classifiers, recall, writing, listening, and shadowing.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-008. Verify learning objectives and scope with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: LP-007
- Epic: 01. learning objectives and scope
- Why now: the current modes mix several skills without explicit outcomes.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-009. Document rollout, cost, and operations for learning objectives and scope

- Priority: P2
- Effort: S
- Depends on: LP-008
- Epic: 01. learning objectives and scope
- Why now: the current modes mix several skills without explicit outcomes.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when learning objectives and scope uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-010. Measure and decide the future of learning objectives and scope

- Priority: P2
- Effort: S
- Depends on: LP-009
- Epic: 01. learning objectives and scope
- Why now: the current modes mix several skills without explicit outcomes.
- Scope: Compare the observed result with the target from the outcome task: every mode states what it teaches, what it does not teach, and how mastery is judged. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_learning_objectives

## Epic 02: spaced repetition model

### LP-011. Audit spaced repetition model in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 02. spaced repetition model
- Why now: simple repetition can become either too easy or overwhelming.
- Scope: Trace review scheduling, forgetting, retries, and mastery decay. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-012. Define the outcome and measurement for spaced repetition model

- Priority: P0
- Effort: S
- Depends on: LP-011
- Epic: 02. spaced repetition model
- Why now: simple repetition can become either too easy or overwhelming.
- Scope: Write the intended result in plain language so that learners review items before forgetting them. Choose one observable measure based on this target: a documented scheduler maps performance to the next review time.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-013. Design the data and state contract for spaced repetition model

- Priority: P0
- Effort: M
- Depends on: LP-012
- Epic: 02. spaced repetition model
- Why now: simple repetition can become either too easy or overwhelming.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in review scheduling, forgetting, retries, and mastery decay. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-014. Prototype spaced repetition model behind `ff_spaced_repetition`

- Priority: P2
- Effort: M
- Depends on: LP-013
- Epic: 02. spaced repetition model
- Why now: simple repetition can become either too easy or overwhelming.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that simple repetition can become either too easy or overwhelming.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_spaced_repetition

### LP-015. Implement the foundation for spaced repetition model

- Priority: P2
- Effort: L
- Depends on: LP-014
- Epic: 02. spaced repetition model
- Why now: simple repetition can become either too easy or overwhelming.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-016. Implement the core behavior for spaced repetition model

- Priority: P1
- Effort: L
- Depends on: LP-015
- Epic: 02. spaced repetition model
- Why now: simple repetition can become either too easy or overwhelming.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: learners review items before forgetting them. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_spaced_repetition

### LP-017. Add edge states and failure handling for spaced repetition model

- Priority: P2
- Effort: M
- Depends on: LP-016
- Epic: 02. spaced repetition model
- Why now: simple repetition can become either too easy or overwhelming.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to review scheduling, forgetting, retries, and mastery decay.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-018. Verify spaced repetition model with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: LP-017
- Epic: 02. spaced repetition model
- Why now: simple repetition can become either too easy or overwhelming.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-019. Document rollout, cost, and operations for spaced repetition model

- Priority: P2
- Effort: S
- Depends on: LP-018
- Epic: 02. spaced repetition model
- Why now: simple repetition can become either too easy or overwhelming.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when spaced repetition model uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-020. Measure and decide the future of spaced repetition model

- Priority: P2
- Effort: S
- Depends on: LP-019
- Epic: 02. spaced repetition model
- Why now: simple repetition can become either too easy or overwhelming.
- Scope: Compare the observed result with the target from the outcome task: a documented scheduler maps performance to the next review time. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_spaced_repetition

## Epic 03: active recall design

### LP-021. Audit active recall design in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 03. active recall design
- Why now: blurring text alone does not guarantee retrieval quality.
- Scope: Trace hidden Hanzi, hidden Pinyin, English prompts, and reveal timing. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-022. Define the outcome and measurement for active recall design

- Priority: P2
- Effort: S
- Depends on: LP-021
- Epic: 03. active recall design
- Why now: blurring text alone does not guarantee retrieval quality.
- Scope: Write the intended result in plain language so that recall practice requires retrieval rather than recognition. Choose one observable measure based on this target: recall modes state prompt direction, feedback, and scoring rules.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-023. Design the data and state contract for active recall design

- Priority: P1
- Effort: M
- Depends on: LP-022
- Epic: 03. active recall design
- Why now: blurring text alone does not guarantee retrieval quality.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in hidden Hanzi, hidden Pinyin, English prompts, and reveal timing. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-024. Prototype active recall design behind `ff_active_recall_design`

- Priority: P2
- Effort: M
- Depends on: LP-023
- Epic: 03. active recall design
- Why now: blurring text alone does not guarantee retrieval quality.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that blurring text alone does not guarantee retrieval quality.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_active_recall_design

### LP-025. Implement the foundation for active recall design

- Priority: P2
- Effort: L
- Depends on: LP-024
- Epic: 03. active recall design
- Why now: blurring text alone does not guarantee retrieval quality.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-026. Implement the core behavior for active recall design

- Priority: P1
- Effort: L
- Depends on: LP-025
- Epic: 03. active recall design
- Why now: blurring text alone does not guarantee retrieval quality.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: recall practice requires retrieval rather than recognition. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_active_recall_design

### LP-027. Add edge states and failure handling for active recall design

- Priority: P2
- Effort: M
- Depends on: LP-026
- Epic: 03. active recall design
- Why now: blurring text alone does not guarantee retrieval quality.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to hidden Hanzi, hidden Pinyin, English prompts, and reveal timing.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-028. Verify active recall design with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: LP-027
- Epic: 03. active recall design
- Why now: blurring text alone does not guarantee retrieval quality.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-029. Document rollout, cost, and operations for active recall design

- Priority: P2
- Effort: S
- Depends on: LP-028
- Epic: 03. active recall design
- Why now: blurring text alone does not guarantee retrieval quality.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when active recall design uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-030. Measure and decide the future of active recall design

- Priority: P2
- Effort: S
- Depends on: LP-029
- Epic: 03. active recall design
- Why now: blurring text alone does not guarantee retrieval quality.
- Scope: Compare the observed result with the target from the outcome task: recall modes state prompt direction, feedback, and scoring rules. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_active_recall_design

## Epic 04: tone minimal-pair practice

### LP-031. Audit tone minimal-pair practice in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 04. tone minimal-pair practice
- Why now: the existing corpus may not contain enough controlled pairs.
- Scope: Trace tone sequences, similar syllables, contrastive listening, and production. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-032. Define the outcome and measurement for tone minimal-pair practice

- Priority: P2
- Effort: S
- Depends on: LP-031
- Epic: 04. tone minimal-pair practice
- Why now: the existing corpus may not contain enough controlled pairs.
- Scope: Write the intended result in plain language so that learners practice differences that cause real confusion. Choose one observable measure based on this target: tone exercises include contrast and corrective feedback.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-033. Design the data and state contract for tone minimal-pair practice

- Priority: P1
- Effort: M
- Depends on: LP-032
- Epic: 04. tone minimal-pair practice
- Why now: the existing corpus may not contain enough controlled pairs.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in tone sequences, similar syllables, contrastive listening, and production. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-034. Prototype tone minimal-pair practice behind `ff_tone_minimal_pairs`

- Priority: P2
- Effort: M
- Depends on: LP-033
- Epic: 04. tone minimal-pair practice
- Why now: the existing corpus may not contain enough controlled pairs.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that the existing corpus may not contain enough controlled pairs.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_tone_minimal_pairs

### LP-035. Implement the foundation for tone minimal-pair practice

- Priority: P2
- Effort: L
- Depends on: LP-034
- Epic: 04. tone minimal-pair practice
- Why now: the existing corpus may not contain enough controlled pairs.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-036. Implement the core behavior for tone minimal-pair practice

- Priority: P1
- Effort: L
- Depends on: LP-035
- Epic: 04. tone minimal-pair practice
- Why now: the existing corpus may not contain enough controlled pairs.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: learners practice differences that cause real confusion. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_tone_minimal_pairs

### LP-037. Add edge states and failure handling for tone minimal-pair practice

- Priority: P2
- Effort: M
- Depends on: LP-036
- Epic: 04. tone minimal-pair practice
- Why now: the existing corpus may not contain enough controlled pairs.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to tone sequences, similar syllables, contrastive listening, and production.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-038. Verify tone minimal-pair practice with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: LP-037
- Epic: 04. tone minimal-pair practice
- Why now: the existing corpus may not contain enough controlled pairs.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-039. Document rollout, cost, and operations for tone minimal-pair practice

- Priority: P2
- Effort: S
- Depends on: LP-038
- Epic: 04. tone minimal-pair practice
- Why now: the existing corpus may not contain enough controlled pairs.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when tone minimal-pair practice uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-040. Measure and decide the future of tone minimal-pair practice

- Priority: P2
- Effort: S
- Depends on: LP-039
- Epic: 04. tone minimal-pair practice
- Why now: the existing corpus may not contain enough controlled pairs.
- Scope: Compare the observed result with the target from the outcome task: tone exercises include contrast and corrective feedback. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_tone_minimal_pairs

## Epic 05: shadowing feedback quality

### LP-041. Audit shadowing feedback quality in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 05. shadowing feedback quality
- Why now: a numeric score alone does not teach.
- Scope: Trace pitch contour, timing, pronunciation, and actionable feedback. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-042. Define the outcome and measurement for shadowing feedback quality

- Priority: P2
- Effort: S
- Depends on: LP-041
- Epic: 05. shadowing feedback quality
- Why now: a numeric score alone does not teach.
- Scope: Write the intended result in plain language so that feedback tells learners what to change next. Choose one observable measure based on this target: feedback names one priority correction and one confirmation.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-043. Design the data and state contract for shadowing feedback quality

- Priority: P1
- Effort: M
- Depends on: LP-042
- Epic: 05. shadowing feedback quality
- Why now: a numeric score alone does not teach.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in pitch contour, timing, pronunciation, and actionable feedback. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-044. Prototype shadowing feedback quality behind `ff_shadowing_feedback_quality`

- Priority: P2
- Effort: M
- Depends on: LP-043
- Epic: 05. shadowing feedback quality
- Why now: a numeric score alone does not teach.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that a numeric score alone does not teach.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_shadowing_feedback_quality

### LP-045. Implement the foundation for shadowing feedback quality

- Priority: P2
- Effort: L
- Depends on: LP-044
- Epic: 05. shadowing feedback quality
- Why now: a numeric score alone does not teach.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-046. Implement the core behavior for shadowing feedback quality

- Priority: P1
- Effort: L
- Depends on: LP-045
- Epic: 05. shadowing feedback quality
- Why now: a numeric score alone does not teach.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: feedback tells learners what to change next. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_shadowing_feedback_quality

### LP-047. Add edge states and failure handling for shadowing feedback quality

- Priority: P2
- Effort: M
- Depends on: LP-046
- Epic: 05. shadowing feedback quality
- Why now: a numeric score alone does not teach.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to pitch contour, timing, pronunciation, and actionable feedback.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-048. Verify shadowing feedback quality with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: LP-047
- Epic: 05. shadowing feedback quality
- Why now: a numeric score alone does not teach.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-049. Document rollout, cost, and operations for shadowing feedback quality

- Priority: P2
- Effort: S
- Depends on: LP-048
- Epic: 05. shadowing feedback quality
- Why now: a numeric score alone does not teach.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when shadowing feedback quality uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-050. Measure and decide the future of shadowing feedback quality

- Priority: P2
- Effort: S
- Depends on: LP-049
- Epic: 05. shadowing feedback quality
- Why now: a numeric score alone does not teach.
- Scope: Compare the observed result with the target from the outcome task: feedback names one priority correction and one confirmation. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_shadowing_feedback_quality

## Epic 06: writing practice validity

### LP-051. Audit writing practice validity in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 06. writing practice validity
- Why now: keyboard input cannot prove handwriting ability.
- Scope: Trace Hanzi writing, Pinyin input, stroke order, and production recall. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-052. Define the outcome and measurement for writing practice validity

- Priority: P2
- Effort: S
- Depends on: LP-051
- Epic: 06. writing practice validity
- Why now: keyboard input cannot prove handwriting ability.
- Scope: Write the intended result in plain language so that writing tasks measure the intended skill. Choose one observable measure based on this target: each writing task states whether recognition, spelling, or stroke production is being assessed.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-053. Design the data and state contract for writing practice validity

- Priority: P1
- Effort: M
- Depends on: LP-052
- Epic: 06. writing practice validity
- Why now: keyboard input cannot prove handwriting ability.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in Hanzi writing, Pinyin input, stroke order, and production recall. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-054. Prototype writing practice validity behind `ff_writing_validity`

- Priority: P2
- Effort: M
- Depends on: LP-053
- Epic: 06. writing practice validity
- Why now: keyboard input cannot prove handwriting ability.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that keyboard input cannot prove handwriting ability.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_writing_validity

### LP-055. Implement the foundation for writing practice validity

- Priority: P2
- Effort: L
- Depends on: LP-054
- Epic: 06. writing practice validity
- Why now: keyboard input cannot prove handwriting ability.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-056. Implement the core behavior for writing practice validity

- Priority: P1
- Effort: L
- Depends on: LP-055
- Epic: 06. writing practice validity
- Why now: keyboard input cannot prove handwriting ability.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: writing tasks measure the intended skill. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_writing_validity

### LP-057. Add edge states and failure handling for writing practice validity

- Priority: P2
- Effort: M
- Depends on: LP-056
- Epic: 06. writing practice validity
- Why now: keyboard input cannot prove handwriting ability.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to Hanzi writing, Pinyin input, stroke order, and production recall.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-058. Verify writing practice validity with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: LP-057
- Epic: 06. writing practice validity
- Why now: keyboard input cannot prove handwriting ability.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-059. Document rollout, cost, and operations for writing practice validity

- Priority: P2
- Effort: S
- Depends on: LP-058
- Epic: 06. writing practice validity
- Why now: keyboard input cannot prove handwriting ability.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when writing practice validity uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-060. Measure and decide the future of writing practice validity

- Priority: P2
- Effort: S
- Depends on: LP-059
- Epic: 06. writing practice validity
- Why now: keyboard input cannot prove handwriting ability.
- Scope: Compare the observed result with the target from the outcome task: each writing task states whether recognition, spelling, or stroke production is being assessed. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_writing_validity

## Epic 07: classifier instruction

### LP-061. Audit classifier instruction in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 07. classifier instruction
- Why now: the current classifier quiz relies on a small static table.
- Scope: Trace classifier meanings, examples, exceptions, and quiz feedback. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-062. Define the outcome and measurement for classifier instruction

- Priority: P2
- Effort: S
- Depends on: LP-061
- Epic: 07. classifier instruction
- Why now: the current classifier quiz relies on a small static table.
- Scope: Write the intended result in plain language so that learners understand classifier choice rather than guessing. Choose one observable measure based on this target: classifier feedback explains the category rule and a counterexample.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-063. Design the data and state contract for classifier instruction

- Priority: P2
- Effort: M
- Depends on: LP-062
- Epic: 07. classifier instruction
- Why now: the current classifier quiz relies on a small static table.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in classifier meanings, examples, exceptions, and quiz feedback. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-064. Prototype classifier instruction behind `ff_classifier_instruction`

- Priority: P2
- Effort: M
- Depends on: LP-063
- Epic: 07. classifier instruction
- Why now: the current classifier quiz relies on a small static table.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that the current classifier quiz relies on a small static table.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_classifier_instruction

### LP-065. Implement the foundation for classifier instruction

- Priority: P2
- Effort: L
- Depends on: LP-064
- Epic: 07. classifier instruction
- Why now: the current classifier quiz relies on a small static table.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-066. Implement the core behavior for classifier instruction

- Priority: P2
- Effort: L
- Depends on: LP-065
- Epic: 07. classifier instruction
- Why now: the current classifier quiz relies on a small static table.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: learners understand classifier choice rather than guessing. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_classifier_instruction

### LP-067. Add edge states and failure handling for classifier instruction

- Priority: P2
- Effort: M
- Depends on: LP-066
- Epic: 07. classifier instruction
- Why now: the current classifier quiz relies on a small static table.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to classifier meanings, examples, exceptions, and quiz feedback.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-068. Verify classifier instruction with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: LP-067
- Epic: 07. classifier instruction
- Why now: the current classifier quiz relies on a small static table.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-069. Document rollout, cost, and operations for classifier instruction

- Priority: P2
- Effort: S
- Depends on: LP-068
- Epic: 07. classifier instruction
- Why now: the current classifier quiz relies on a small static table.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when classifier instruction uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-070. Measure and decide the future of classifier instruction

- Priority: P2
- Effort: S
- Depends on: LP-069
- Epic: 07. classifier instruction
- Why now: the current classifier quiz relies on a small static table.
- Scope: Compare the observed result with the target from the outcome task: classifier feedback explains the category rule and a counterexample. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_classifier_instruction

## Epic 08: difficulty progression

### LP-071. Audit difficulty progression in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 08. difficulty progression
- Why now: difficulty varies by learner background.
- Scope: Trace word length, tone complexity, frequency, category, and learner performance. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-072. Define the outcome and measurement for difficulty progression

- Priority: P2
- Effort: S
- Depends on: LP-071
- Epic: 08. difficulty progression
- Why now: difficulty varies by learner background.
- Scope: Write the intended result in plain language so that sessions adapt from easier to harder material. Choose one observable measure based on this target: a progression rule orders content using explicit difficulty signals.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-073. Design the data and state contract for difficulty progression

- Priority: P2
- Effort: M
- Depends on: LP-072
- Epic: 08. difficulty progression
- Why now: difficulty varies by learner background.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in word length, tone complexity, frequency, category, and learner performance. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-074. Prototype difficulty progression behind `ff_difficulty_progression`

- Priority: P2
- Effort: M
- Depends on: LP-073
- Epic: 08. difficulty progression
- Why now: difficulty varies by learner background.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that difficulty varies by learner background.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_difficulty_progression

### LP-075. Implement the foundation for difficulty progression

- Priority: P2
- Effort: L
- Depends on: LP-074
- Epic: 08. difficulty progression
- Why now: difficulty varies by learner background.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-076. Implement the core behavior for difficulty progression

- Priority: P2
- Effort: L
- Depends on: LP-075
- Epic: 08. difficulty progression
- Why now: difficulty varies by learner background.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: sessions adapt from easier to harder material. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_difficulty_progression

### LP-077. Add edge states and failure handling for difficulty progression

- Priority: P2
- Effort: M
- Depends on: LP-076
- Epic: 08. difficulty progression
- Why now: difficulty varies by learner background.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to word length, tone complexity, frequency, category, and learner performance.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-078. Verify difficulty progression with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: LP-077
- Epic: 08. difficulty progression
- Why now: difficulty varies by learner background.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-079. Document rollout, cost, and operations for difficulty progression

- Priority: P2
- Effort: S
- Depends on: LP-078
- Epic: 08. difficulty progression
- Why now: difficulty varies by learner background.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when difficulty progression uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-080. Measure and decide the future of difficulty progression

- Priority: P2
- Effort: S
- Depends on: LP-079
- Epic: 08. difficulty progression
- Why now: difficulty varies by learner background.
- Scope: Compare the observed result with the target from the outcome task: a progression rule orders content using explicit difficulty signals. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_difficulty_progression

## Epic 09: corrective feedback design

### LP-081. Audit corrective feedback design in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 09. corrective feedback design
- Why now: too much feedback can interrupt flow.
- Scope: Trace wrong quiz answers, writing errors, tone mismatch, and retry guidance. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-082. Define the outcome and measurement for corrective feedback design

- Priority: P2
- Effort: S
- Depends on: LP-081
- Epic: 09. corrective feedback design
- Why now: too much feedback can interrupt flow.
- Scope: Write the intended result in plain language so that mistakes become useful information. Choose one observable measure based on this target: each error state says what happened and what to try next.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-083. Design the data and state contract for corrective feedback design

- Priority: P2
- Effort: M
- Depends on: LP-082
- Epic: 09. corrective feedback design
- Why now: too much feedback can interrupt flow.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in wrong quiz answers, writing errors, tone mismatch, and retry guidance. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-084. Prototype corrective feedback design behind `ff_corrective_feedback`

- Priority: P2
- Effort: M
- Depends on: LP-083
- Epic: 09. corrective feedback design
- Why now: too much feedback can interrupt flow.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that too much feedback can interrupt flow.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_corrective_feedback

### LP-085. Implement the foundation for corrective feedback design

- Priority: P2
- Effort: L
- Depends on: LP-084
- Epic: 09. corrective feedback design
- Why now: too much feedback can interrupt flow.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-086. Implement the core behavior for corrective feedback design

- Priority: P2
- Effort: L
- Depends on: LP-085
- Epic: 09. corrective feedback design
- Why now: too much feedback can interrupt flow.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: mistakes become useful information. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_corrective_feedback

### LP-087. Add edge states and failure handling for corrective feedback design

- Priority: P2
- Effort: M
- Depends on: LP-086
- Epic: 09. corrective feedback design
- Why now: too much feedback can interrupt flow.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to wrong quiz answers, writing errors, tone mismatch, and retry guidance.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-088. Verify corrective feedback design with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: LP-087
- Epic: 09. corrective feedback design
- Why now: too much feedback can interrupt flow.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-089. Document rollout, cost, and operations for corrective feedback design

- Priority: P2
- Effort: S
- Depends on: LP-088
- Epic: 09. corrective feedback design
- Why now: too much feedback can interrupt flow.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when corrective feedback design uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-090. Measure and decide the future of corrective feedback design

- Priority: P2
- Effort: S
- Depends on: LP-089
- Epic: 09. corrective feedback design
- Why now: too much feedback can interrupt flow.
- Scope: Compare the observed result with the target from the outcome task: each error state says what happened and what to try next. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_corrective_feedback

## Epic 10: mastery definition and assessment

### LP-091. Audit mastery definition and assessment in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 10. mastery definition and assessment
- Why now: simple percentages can overstate learning.
- Scope: Trace thresholds, attempts, recency, transfer, and session completion. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-092. Define the outcome and measurement for mastery definition and assessment

- Priority: P2
- Effort: S
- Depends on: LP-091
- Epic: 10. mastery definition and assessment
- Why now: simple percentages can overstate learning.
- Scope: Write the intended result in plain language so that progress means durable learning rather than one lucky answer. Choose one observable measure based on this target: mastery combines accuracy, recency, and retrieval conditions in one written rule.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-093. Design the data and state contract for mastery definition and assessment

- Priority: P2
- Effort: M
- Depends on: LP-092
- Epic: 10. mastery definition and assessment
- Why now: simple percentages can overstate learning.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in thresholds, attempts, recency, transfer, and session completion. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-094. Prototype mastery definition and assessment behind `ff_mastery_definition`

- Priority: P2
- Effort: M
- Depends on: LP-093
- Epic: 10. mastery definition and assessment
- Why now: simple percentages can overstate learning.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that simple percentages can overstate learning.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_mastery_definition

### LP-095. Implement the foundation for mastery definition and assessment

- Priority: P2
- Effort: L
- Depends on: LP-094
- Epic: 10. mastery definition and assessment
- Why now: simple percentages can overstate learning.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-096. Implement the core behavior for mastery definition and assessment

- Priority: P2
- Effort: L
- Depends on: LP-095
- Epic: 10. mastery definition and assessment
- Why now: simple percentages can overstate learning.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: progress means durable learning rather than one lucky answer. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_mastery_definition

### LP-097. Add edge states and failure handling for mastery definition and assessment

- Priority: P2
- Effort: M
- Depends on: LP-096
- Epic: 10. mastery definition and assessment
- Why now: simple percentages can overstate learning.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to thresholds, attempts, recency, transfer, and session completion.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-098. Verify mastery definition and assessment with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: LP-097
- Epic: 10. mastery definition and assessment
- Why now: simple percentages can overstate learning.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-099. Document rollout, cost, and operations for mastery definition and assessment

- Priority: P2
- Effort: S
- Depends on: LP-098
- Epic: 10. mastery definition and assessment
- Why now: simple percentages can overstate learning.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when mastery definition and assessment uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### LP-100. Measure and decide the future of mastery definition and assessment

- Priority: P2
- Effort: S
- Depends on: LP-099
- Epic: 10. mastery definition and assessment
- Why now: simple percentages can overstate learning.
- Scope: Compare the observed result with the target from the outcome task: mastery combines accuracy, recency, and retrieval conditions in one written rule. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_mastery_definition

## Conflicts and feature-flag strategies

### Conflict 1: Spaced repetition versus free practice

| Option | Pros | Cons |
|---|---|---|
| Use spaced repetition | Review time is used efficiently; forgetting is addressed directly; progress becomes durable | The model adds complexity and can feel restrictive |
| Keep free practice | Learners control their sessions; implementation stays simple; exploration is easy | Learners may repeat easy items and neglect weak items |

Feature-flag or coexistence plan: Use `ff_spaced_review` for a suggested review queue while keeping free practice available.

### Conflict 2: Numeric tone score versus qualitative tone feedback

| Option | Pros | Cons |
|---|---|---|
| Use a numeric score | Progress is easy to compare; thresholds are simple; gamification can use the score | The number can be opaque or misleading when pitch extraction is uncertain |
| Use qualitative feedback | Feedback can name the tone shape and the next correction | It is harder to compare progress or automate mastery |

Feature-flag or coexistence plan: Show both behind `ff_tone_feedback_detail`, with qualitative feedback primary and the score secondary.

### Conflict 3: Fixed curriculum versus adaptive sequencing

| Option | Pros | Cons |
|---|---|---|
| Use a fixed curriculum | Content order is predictable and easier to author; research scope is smaller | Learners with different backgrounds receive the wrong difficulty |
| Use adaptive sequencing | Practice can respond to performance and weaknesses | Bad learner models can reinforce frustration or avoid hard content |

Feature-flag or coexistence plan: Use `ff_adaptive_sequence` after baseline learner data supports the first adaptation rule.

## Third-party service cost policy

Learning-science work needs no third-party service. If a research or assessment service is considered, it needs free-tier verification or a cost-benefit analysis.

When a service does not have a renewable free tier, the cost-benefit analysis must include monthly fixed cost, usage-based cost at expected volume, free alternative, learner or maintainer benefit, privacy cost, lock-in cost, exit cost, and the decision deadline. A free trial is not a renewable free tier.

## Suggested sequencing

1. Complete P0 audit, outcome, design, and verification tasks before implementation tasks.
2. Choose at most one epic at a time for implementation.
3. Keep feature flags small, time-bounded, and tied to a measurement task.
4. Revisit this document after each landed slice and delete tasks that no longer earn their place.
