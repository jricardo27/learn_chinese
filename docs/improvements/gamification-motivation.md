# Gamification and motivation improvement plan

## Purpose

Use progress, goals, and rewards to support consistent practice without manipulative streaks, empty points, or privacy-invasive social mechanics.

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

## Epic 01: streak design

### GM-001. Audit streak design in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 01. streak design
- Why now: fragile streaks can demotivate learners.
- Scope: Trace daily practice, streak repair, timezone handling, and breaks. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-002. Define the outcome and measurement for streak design

- Priority: P0
- Effort: S
- Depends on: GM-001
- Epic: 01. streak design
- Why now: fragile streaks can demotivate learners.
- Scope: Write the intended result in plain language so that streaks encourage return without punishing normal life. Choose one observable measure based on this target: rules are explicit, forgiving, and local.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-003. Design the data and state contract for streak design

- Priority: P0
- Effort: M
- Depends on: GM-002
- Epic: 01. streak design
- Why now: fragile streaks can demotivate learners.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in daily practice, streak repair, timezone handling, and breaks. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-004. Prototype streak design behind `ff_streak_design`

- Priority: P2
- Effort: M
- Depends on: GM-003
- Epic: 01. streak design
- Why now: fragile streaks can demotivate learners.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that fragile streaks can demotivate learners.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_streak_design

### GM-005. Implement the foundation for streak design

- Priority: P2
- Effort: L
- Depends on: GM-004
- Epic: 01. streak design
- Why now: fragile streaks can demotivate learners.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-006. Implement the core behavior for streak design

- Priority: P1
- Effort: L
- Depends on: GM-005
- Epic: 01. streak design
- Why now: fragile streaks can demotivate learners.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: streaks encourage return without punishing normal life. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_streak_design

### GM-007. Add edge states and failure handling for streak design

- Priority: P2
- Effort: M
- Depends on: GM-006
- Epic: 01. streak design
- Why now: fragile streaks can demotivate learners.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to daily practice, streak repair, timezone handling, and breaks.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-008. Verify streak design with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: GM-007
- Epic: 01. streak design
- Why now: fragile streaks can demotivate learners.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-009. Document rollout, cost, and operations for streak design

- Priority: P2
- Effort: S
- Depends on: GM-008
- Epic: 01. streak design
- Why now: fragile streaks can demotivate learners.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when streak design uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-010. Measure and decide the future of streak design

- Priority: P2
- Effort: S
- Depends on: GM-009
- Epic: 01. streak design
- Why now: fragile streaks can demotivate learners.
- Scope: Compare the observed result with the target from the outcome task: rules are explicit, forgiving, and local. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_streak_design

## Epic 02: experience points and levels

### GM-011. Audit experience points and levels in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 02. experience points and levels
- Why now: points can reward quantity over learning.
- Scope: Trace practice effort, mastery, review completion, and mode differences. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-012. Define the outcome and measurement for experience points and levels

- Priority: P0
- Effort: S
- Depends on: GM-011
- Epic: 02. experience points and levels
- Why now: points can reward quantity over learning.
- Scope: Write the intended result in plain language so that progress feels visible across modes. Choose one observable measure based on this target: points map to learning effort rather than empty tapping.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-013. Design the data and state contract for experience points and levels

- Priority: P0
- Effort: M
- Depends on: GM-012
- Epic: 02. experience points and levels
- Why now: points can reward quantity over learning.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in practice effort, mastery, review completion, and mode differences. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-014. Prototype experience points and levels behind `ff_xp_levels`

- Priority: P2
- Effort: M
- Depends on: GM-013
- Epic: 02. experience points and levels
- Why now: points can reward quantity over learning.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that points can reward quantity over learning.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_xp_levels

### GM-015. Implement the foundation for experience points and levels

- Priority: P2
- Effort: L
- Depends on: GM-014
- Epic: 02. experience points and levels
- Why now: points can reward quantity over learning.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-016. Implement the core behavior for experience points and levels

- Priority: P1
- Effort: L
- Depends on: GM-015
- Epic: 02. experience points and levels
- Why now: points can reward quantity over learning.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: progress feels visible across modes. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_xp_levels

### GM-017. Add edge states and failure handling for experience points and levels

- Priority: P2
- Effort: M
- Depends on: GM-016
- Epic: 02. experience points and levels
- Why now: points can reward quantity over learning.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to practice effort, mastery, review completion, and mode differences.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-018. Verify experience points and levels with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: GM-017
- Epic: 02. experience points and levels
- Why now: points can reward quantity over learning.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-019. Document rollout, cost, and operations for experience points and levels

- Priority: P2
- Effort: S
- Depends on: GM-018
- Epic: 02. experience points and levels
- Why now: points can reward quantity over learning.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when experience points and levels uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-020. Measure and decide the future of experience points and levels

- Priority: P2
- Effort: S
- Depends on: GM-019
- Epic: 02. experience points and levels
- Why now: points can reward quantity over learning.
- Scope: Compare the observed result with the target from the outcome task: points map to learning effort rather than empty tapping. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_xp_levels

## Epic 03: achievements and badges

### GM-021. Audit achievements and badges in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 03. achievements and badges
- Why now: badge collection can distract from learning.
- Scope: Trace tone mastery, classifier milestones, review consistency, and content coverage. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-022. Define the outcome and measurement for achievements and badges

- Priority: P2
- Effort: S
- Depends on: GM-021
- Epic: 03. achievements and badges
- Why now: badge collection can distract from learning.
- Scope: Write the intended result in plain language so that milestones highlight meaningful learning behavior. Choose one observable measure based on this target: each achievement has a clear educational reason.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-023. Design the data and state contract for achievements and badges

- Priority: P1
- Effort: M
- Depends on: GM-022
- Epic: 03. achievements and badges
- Why now: badge collection can distract from learning.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in tone mastery, classifier milestones, review consistency, and content coverage. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-024. Prototype achievements and badges behind `ff_achievements`

- Priority: P2
- Effort: M
- Depends on: GM-023
- Epic: 03. achievements and badges
- Why now: badge collection can distract from learning.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that badge collection can distract from learning.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_achievements

### GM-025. Implement the foundation for achievements and badges

- Priority: P2
- Effort: L
- Depends on: GM-024
- Epic: 03. achievements and badges
- Why now: badge collection can distract from learning.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-026. Implement the core behavior for achievements and badges

- Priority: P1
- Effort: L
- Depends on: GM-025
- Epic: 03. achievements and badges
- Why now: badge collection can distract from learning.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: milestones highlight meaningful learning behavior. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_achievements

### GM-027. Add edge states and failure handling for achievements and badges

- Priority: P2
- Effort: M
- Depends on: GM-026
- Epic: 03. achievements and badges
- Why now: badge collection can distract from learning.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to tone mastery, classifier milestones, review consistency, and content coverage.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-028. Verify achievements and badges with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: GM-027
- Epic: 03. achievements and badges
- Why now: badge collection can distract from learning.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-029. Document rollout, cost, and operations for achievements and badges

- Priority: P2
- Effort: S
- Depends on: GM-028
- Epic: 03. achievements and badges
- Why now: badge collection can distract from learning.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when achievements and badges uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-030. Measure and decide the future of achievements and badges

- Priority: P2
- Effort: S
- Depends on: GM-029
- Epic: 03. achievements and badges
- Why now: badge collection can distract from learning.
- Scope: Compare the observed result with the target from the outcome task: each achievement has a clear educational reason. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_achievements

## Epic 04: daily goals

### GM-031. Audit daily goals in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 04. daily goals
- Why now: fixed goals can create guilt or rushed practice.
- Scope: Trace minutes, items, reviews, and flexible targets. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-032. Define the outcome and measurement for daily goals

- Priority: P2
- Effort: S
- Depends on: GM-031
- Epic: 04. daily goals
- Why now: fixed goals can create guilt or rushed practice.
- Scope: Write the intended result in plain language so that learners can choose a realistic practice commitment. Choose one observable measure based on this target: goals are optional and adaptable.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-033. Design the data and state contract for daily goals

- Priority: P1
- Effort: M
- Depends on: GM-032
- Epic: 04. daily goals
- Why now: fixed goals can create guilt or rushed practice.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in minutes, items, reviews, and flexible targets. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-034. Prototype daily goals behind `ff_daily_goals`

- Priority: P2
- Effort: M
- Depends on: GM-033
- Epic: 04. daily goals
- Why now: fixed goals can create guilt or rushed practice.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that fixed goals can create guilt or rushed practice.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_daily_goals

### GM-035. Implement the foundation for daily goals

- Priority: P2
- Effort: L
- Depends on: GM-034
- Epic: 04. daily goals
- Why now: fixed goals can create guilt or rushed practice.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-036. Implement the core behavior for daily goals

- Priority: P1
- Effort: L
- Depends on: GM-035
- Epic: 04. daily goals
- Why now: fixed goals can create guilt or rushed practice.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: learners can choose a realistic practice commitment. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_daily_goals

### GM-037. Add edge states and failure handling for daily goals

- Priority: P2
- Effort: M
- Depends on: GM-036
- Epic: 04. daily goals
- Why now: fixed goals can create guilt or rushed practice.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to minutes, items, reviews, and flexible targets.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-038. Verify daily goals with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: GM-037
- Epic: 04. daily goals
- Why now: fixed goals can create guilt or rushed practice.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-039. Document rollout, cost, and operations for daily goals

- Priority: P2
- Effort: S
- Depends on: GM-038
- Epic: 04. daily goals
- Why now: fixed goals can create guilt or rushed practice.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when daily goals uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-040. Measure and decide the future of daily goals

- Priority: P2
- Effort: S
- Depends on: GM-039
- Epic: 04. daily goals
- Why now: fixed goals can create guilt or rushed practice.
- Scope: Compare the observed result with the target from the outcome task: goals are optional and adaptable. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_daily_goals

## Epic 05: progress visualization

### GM-041. Audit progress visualization in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 05. progress visualization
- Why now: misleading aggregates can overstate mastery.
- Scope: Trace mastery map, tone progress, review backlog, and content coverage. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-042. Define the outcome and measurement for progress visualization

- Priority: P2
- Effort: S
- Depends on: GM-041
- Epic: 05. progress visualization
- Why now: misleading aggregates can overstate mastery.
- Scope: Write the intended result in plain language so that learners can see where they are improving. Choose one observable measure based on this target: charts are accurate, accessible, and explain their inputs.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-043. Design the data and state contract for progress visualization

- Priority: P1
- Effort: M
- Depends on: GM-042
- Epic: 05. progress visualization
- Why now: misleading aggregates can overstate mastery.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in mastery map, tone progress, review backlog, and content coverage. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-044. Prototype progress visualization behind `ff_progress_visualization`

- Priority: P2
- Effort: M
- Depends on: GM-043
- Epic: 05. progress visualization
- Why now: misleading aggregates can overstate mastery.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that misleading aggregates can overstate mastery.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_progress_visualization

### GM-045. Implement the foundation for progress visualization

- Priority: P2
- Effort: L
- Depends on: GM-044
- Epic: 05. progress visualization
- Why now: misleading aggregates can overstate mastery.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-046. Implement the core behavior for progress visualization

- Priority: P1
- Effort: L
- Depends on: GM-045
- Epic: 05. progress visualization
- Why now: misleading aggregates can overstate mastery.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: learners can see where they are improving. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_progress_visualization

### GM-047. Add edge states and failure handling for progress visualization

- Priority: P2
- Effort: M
- Depends on: GM-046
- Epic: 05. progress visualization
- Why now: misleading aggregates can overstate mastery.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to mastery map, tone progress, review backlog, and content coverage.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-048. Verify progress visualization with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: GM-047
- Epic: 05. progress visualization
- Why now: misleading aggregates can overstate mastery.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-049. Document rollout, cost, and operations for progress visualization

- Priority: P2
- Effort: S
- Depends on: GM-048
- Epic: 05. progress visualization
- Why now: misleading aggregates can overstate mastery.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when progress visualization uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-050. Measure and decide the future of progress visualization

- Priority: P2
- Effort: S
- Depends on: GM-049
- Epic: 05. progress visualization
- Why now: misleading aggregates can overstate mastery.
- Scope: Compare the observed result with the target from the outcome task: charts are accurate, accessible, and explain their inputs. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_progress_visualization

## Epic 06: challenge modes

### GM-051. Audit challenge modes in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 06. challenge modes
- Why now: speed pressure can harm accuracy and accessibility.
- Scope: Trace timed review, tone sequences, classifier streaks, and mixed recall. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-052. Define the outcome and measurement for challenge modes

- Priority: P2
- Effort: S
- Depends on: GM-051
- Epic: 06. challenge modes
- Why now: speed pressure can harm accuracy and accessibility.
- Scope: Write the intended result in plain language so that variety can refresh practice. Choose one observable measure based on this target: challenges reinforce existing learning objectives.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-053. Design the data and state contract for challenge modes

- Priority: P1
- Effort: M
- Depends on: GM-052
- Epic: 06. challenge modes
- Why now: speed pressure can harm accuracy and accessibility.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in timed review, tone sequences, classifier streaks, and mixed recall. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-054. Prototype challenge modes behind `ff_challenge_modes`

- Priority: P2
- Effort: M
- Depends on: GM-053
- Epic: 06. challenge modes
- Why now: speed pressure can harm accuracy and accessibility.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that speed pressure can harm accuracy and accessibility.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_challenge_modes

### GM-055. Implement the foundation for challenge modes

- Priority: P2
- Effort: L
- Depends on: GM-054
- Epic: 06. challenge modes
- Why now: speed pressure can harm accuracy and accessibility.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-056. Implement the core behavior for challenge modes

- Priority: P1
- Effort: L
- Depends on: GM-055
- Epic: 06. challenge modes
- Why now: speed pressure can harm accuracy and accessibility.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: variety can refresh practice. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_challenge_modes

### GM-057. Add edge states and failure handling for challenge modes

- Priority: P2
- Effort: M
- Depends on: GM-056
- Epic: 06. challenge modes
- Why now: speed pressure can harm accuracy and accessibility.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to timed review, tone sequences, classifier streaks, and mixed recall.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-058. Verify challenge modes with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: GM-057
- Epic: 06. challenge modes
- Why now: speed pressure can harm accuracy and accessibility.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-059. Document rollout, cost, and operations for challenge modes

- Priority: P2
- Effort: S
- Depends on: GM-058
- Epic: 06. challenge modes
- Why now: speed pressure can harm accuracy and accessibility.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when challenge modes uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-060. Measure and decide the future of challenge modes

- Priority: P2
- Effort: S
- Depends on: GM-059
- Epic: 06. challenge modes
- Why now: speed pressure can harm accuracy and accessibility.
- Scope: Compare the observed result with the target from the outcome task: challenges reinforce existing learning objectives. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_challenge_modes

## Epic 07: reward and celebration feedback

### GM-061. Audit reward and celebration feedback in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 07. reward and celebration feedback
- Why now: excess rewards can become noise.
- Scope: Trace session completion, mastery moments, animations, sounds, and haptics. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-062. Define the outcome and measurement for reward and celebration feedback

- Priority: P2
- Effort: S
- Depends on: GM-061
- Epic: 07. reward and celebration feedback
- Why now: excess rewards can become noise.
- Scope: Write the intended result in plain language so that success feels satisfying without blocking practice. Choose one observable measure based on this target: rewards are brief, accessible, and configurable.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-063. Design the data and state contract for reward and celebration feedback

- Priority: P2
- Effort: M
- Depends on: GM-062
- Epic: 07. reward and celebration feedback
- Why now: excess rewards can become noise.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in session completion, mastery moments, animations, sounds, and haptics. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-064. Prototype reward and celebration feedback behind `ff_reward_feedback`

- Priority: P2
- Effort: M
- Depends on: GM-063
- Epic: 07. reward and celebration feedback
- Why now: excess rewards can become noise.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that excess rewards can become noise.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_reward_feedback

### GM-065. Implement the foundation for reward and celebration feedback

- Priority: P2
- Effort: L
- Depends on: GM-064
- Epic: 07. reward and celebration feedback
- Why now: excess rewards can become noise.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-066. Implement the core behavior for reward and celebration feedback

- Priority: P2
- Effort: L
- Depends on: GM-065
- Epic: 07. reward and celebration feedback
- Why now: excess rewards can become noise.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: success feels satisfying without blocking practice. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_reward_feedback

### GM-067. Add edge states and failure handling for reward and celebration feedback

- Priority: P2
- Effort: M
- Depends on: GM-066
- Epic: 07. reward and celebration feedback
- Why now: excess rewards can become noise.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to session completion, mastery moments, animations, sounds, and haptics.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-068. Verify reward and celebration feedback with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: GM-067
- Epic: 07. reward and celebration feedback
- Why now: excess rewards can become noise.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-069. Document rollout, cost, and operations for reward and celebration feedback

- Priority: P2
- Effort: S
- Depends on: GM-068
- Epic: 07. reward and celebration feedback
- Why now: excess rewards can become noise.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when reward and celebration feedback uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-070. Measure and decide the future of reward and celebration feedback

- Priority: P2
- Effort: S
- Depends on: GM-069
- Epic: 07. reward and celebration feedback
- Why now: excess rewards can become noise.
- Scope: Compare the observed result with the target from the outcome task: rewards are brief, accessible, and configurable. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_reward_feedback

## Epic 08: social sharing

### GM-071. Audit social sharing in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 08. social sharing
- Why now: social features can create privacy and moderation costs.
- Scope: Trace shareable progress images, achievements, and referrals. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-072. Define the outcome and measurement for social sharing

- Priority: P2
- Effort: S
- Depends on: GM-071
- Epic: 08. social sharing
- Why now: social features can create privacy and moderation costs.
- Scope: Write the intended result in plain language so that learners can share progress without exposing private data. Choose one observable measure based on this target: sharing is local, explicit, and content-minimal.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-073. Design the data and state contract for social sharing

- Priority: P2
- Effort: M
- Depends on: GM-072
- Epic: 08. social sharing
- Why now: social features can create privacy and moderation costs.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in shareable progress images, achievements, and referrals. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-074. Prototype social sharing behind `ff_social_sharing`

- Priority: P2
- Effort: M
- Depends on: GM-073
- Epic: 08. social sharing
- Why now: social features can create privacy and moderation costs.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that social features can create privacy and moderation costs.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_social_sharing

### GM-075. Implement the foundation for social sharing

- Priority: P2
- Effort: L
- Depends on: GM-074
- Epic: 08. social sharing
- Why now: social features can create privacy and moderation costs.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-076. Implement the core behavior for social sharing

- Priority: P2
- Effort: L
- Depends on: GM-075
- Epic: 08. social sharing
- Why now: social features can create privacy and moderation costs.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: learners can share progress without exposing private data. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_social_sharing

### GM-077. Add edge states and failure handling for social sharing

- Priority: P2
- Effort: M
- Depends on: GM-076
- Epic: 08. social sharing
- Why now: social features can create privacy and moderation costs.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to shareable progress images, achievements, and referrals.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-078. Verify social sharing with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: GM-077
- Epic: 08. social sharing
- Why now: social features can create privacy and moderation costs.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-079. Document rollout, cost, and operations for social sharing

- Priority: P2
- Effort: S
- Depends on: GM-078
- Epic: 08. social sharing
- Why now: social features can create privacy and moderation costs.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when social sharing uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-080. Measure and decide the future of social sharing

- Priority: P2
- Effort: S
- Depends on: GM-079
- Epic: 08. social sharing
- Why now: social features can create privacy and moderation costs.
- Scope: Compare the observed result with the target from the outcome task: sharing is local, explicit, and content-minimal. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_social_sharing

## Epic 09: leaderboards

### GM-081. Audit leaderboards in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 09. leaderboards
- Why now: leaderboards often need accounts, moderation, and sync.
- Scope: Trace rankings, groups, cheating, privacy, and backend cost. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-082. Define the outcome and measurement for leaderboards

- Priority: P2
- Effort: S
- Depends on: GM-081
- Epic: 09. leaderboards
- Why now: leaderboards often need accounts, moderation, and sync.
- Scope: Write the intended result in plain language so that the project consciously accepts or rejects competitive ranking. Choose one observable measure based on this target: a decision record compares motivational benefit against harm and cost.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-083. Design the data and state contract for leaderboards

- Priority: P2
- Effort: M
- Depends on: GM-082
- Epic: 09. leaderboards
- Why now: leaderboards often need accounts, moderation, and sync.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in rankings, groups, cheating, privacy, and backend cost. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-084. Prototype leaderboards behind `ff_leaderboards`

- Priority: P2
- Effort: M
- Depends on: GM-083
- Epic: 09. leaderboards
- Why now: leaderboards often need accounts, moderation, and sync.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that leaderboards often need accounts, moderation, and sync.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_leaderboards

### GM-085. Implement the foundation for leaderboards

- Priority: P2
- Effort: L
- Depends on: GM-084
- Epic: 09. leaderboards
- Why now: leaderboards often need accounts, moderation, and sync.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-086. Implement the core behavior for leaderboards

- Priority: P2
- Effort: L
- Depends on: GM-085
- Epic: 09. leaderboards
- Why now: leaderboards often need accounts, moderation, and sync.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: the project consciously accepts or rejects competitive ranking. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_leaderboards

### GM-087. Add edge states and failure handling for leaderboards

- Priority: P2
- Effort: M
- Depends on: GM-086
- Epic: 09. leaderboards
- Why now: leaderboards often need accounts, moderation, and sync.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to rankings, groups, cheating, privacy, and backend cost.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-088. Verify leaderboards with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: GM-087
- Epic: 09. leaderboards
- Why now: leaderboards often need accounts, moderation, and sync.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-089. Document rollout, cost, and operations for leaderboards

- Priority: P2
- Effort: S
- Depends on: GM-088
- Epic: 09. leaderboards
- Why now: leaderboards often need accounts, moderation, and sync.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when leaderboards uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-090. Measure and decide the future of leaderboards

- Priority: P2
- Effort: S
- Depends on: GM-089
- Epic: 09. leaderboards
- Why now: leaderboards often need accounts, moderation, and sync.
- Scope: Compare the observed result with the target from the outcome task: a decision record compares motivational benefit against harm and cost. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_leaderboards

## Epic 10: motivation impact measurement

### GM-091. Audit motivation impact measurement in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 10. motivation impact measurement
- Why now: retention alone can reward manipulative design.
- Scope: Trace retention, session completion, goal health, and learner sentiment. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-092. Define the outcome and measurement for motivation impact measurement

- Priority: P2
- Effort: S
- Depends on: GM-091
- Epic: 10. motivation impact measurement
- Why now: retention alone can reward manipulative design.
- Scope: Write the intended result in plain language so that gamification is kept only when it helps. Choose one observable measure based on this target: each mechanic has a success metric and removal rule.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-093. Design the data and state contract for motivation impact measurement

- Priority: P2
- Effort: M
- Depends on: GM-092
- Epic: 10. motivation impact measurement
- Why now: retention alone can reward manipulative design.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in retention, session completion, goal health, and learner sentiment. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-094. Prototype motivation impact measurement behind `ff_motivation_measurement`

- Priority: P2
- Effort: M
- Depends on: GM-093
- Epic: 10. motivation impact measurement
- Why now: retention alone can reward manipulative design.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that retention alone can reward manipulative design.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_motivation_measurement

### GM-095. Implement the foundation for motivation impact measurement

- Priority: P2
- Effort: L
- Depends on: GM-094
- Epic: 10. motivation impact measurement
- Why now: retention alone can reward manipulative design.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-096. Implement the core behavior for motivation impact measurement

- Priority: P2
- Effort: L
- Depends on: GM-095
- Epic: 10. motivation impact measurement
- Why now: retention alone can reward manipulative design.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: gamification is kept only when it helps. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_motivation_measurement

### GM-097. Add edge states and failure handling for motivation impact measurement

- Priority: P2
- Effort: M
- Depends on: GM-096
- Epic: 10. motivation impact measurement
- Why now: retention alone can reward manipulative design.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to retention, session completion, goal health, and learner sentiment.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-098. Verify motivation impact measurement with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: GM-097
- Epic: 10. motivation impact measurement
- Why now: retention alone can reward manipulative design.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-099. Document rollout, cost, and operations for motivation impact measurement

- Priority: P2
- Effort: S
- Depends on: GM-098
- Epic: 10. motivation impact measurement
- Why now: retention alone can reward manipulative design.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when motivation impact measurement uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### GM-100. Measure and decide the future of motivation impact measurement

- Priority: P2
- Effort: S
- Depends on: GM-099
- Epic: 10. motivation impact measurement
- Why now: retention alone can reward manipulative design.
- Scope: Compare the observed result with the target from the outcome task: each mechanic has a success metric and removal rule. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_motivation_measurement

## Conflicts and feature-flag strategies

### Conflict 1: Streaks versus flexible consistency goals

| Option | Pros | Cons |
|---|---|---|
| Use streaks | They are simple, familiar, and can prompt return | Broken streaks can demotivate learners and encourage empty practice |
| Use flexible consistency goals | Learners can sustain realistic routines without all-or-nothing failure | The mechanic is less immediate and may feel less compelling |

Feature-flag or coexistence plan: Use `ff_flexible_goals` to compare completion and learner sentiment before adopting streaks.

### Conflict 2: Points for activity versus points for mastery

| Option | Pros | Cons |
|---|---|---|
| Reward activity | Every effort counts and implementation is simple | Learners can farm points without learning |
| Reward mastery | Points align with durable progress | Mastery is harder to measure and slower to reward |

Feature-flag or coexistence plan: Use both carefully with mastery weighted higher behind `ff_mastery_points`.

### Conflict 3: Leaderboards versus private progress

| Option | Pros | Cons |
|---|---|---|
| Use leaderboards | Competition may motivate some learners | They require accounts, sync, moderation, privacy controls, and anti-cheating work |
| Use private progress | The design stays local, inclusive, and low cost | Learners who enjoy social competition do not get that motivator |

Feature-flag or coexistence plan: Do not build leaderboards by default. If tested, use an opt-in group feature behind `ff_group_leaderboards` after a cost-benefit analysis.

## Third-party service cost policy

Local gamification is free. Accounts, sync, moderation, and social services need free-tier verification or cost-benefit analysis.

When a service does not have a renewable free tier, the cost-benefit analysis must include monthly fixed cost, usage-based cost at expected volume, free alternative, learner or maintainer benefit, privacy cost, lock-in cost, exit cost, and the decision deadline. A free trial is not a renewable free tier.

## Suggested sequencing

1. Complete P0 audit, outcome, design, and verification tasks before implementation tasks.
2. Choose at most one epic at a time for implementation.
3. Keep feature flags small, time-bounded, and tied to a measurement task.
4. Revisit this document after each landed slice and delete tasks that no longer earn their place.
