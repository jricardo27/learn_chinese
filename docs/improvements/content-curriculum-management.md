# Content and curriculum management improvement plan

## Purpose

Turn the 414-item asset set into governed, reviewed, expandable learning content with clear provenance and curriculum structure.

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

## Epic 01: content schema governance

### CT-001. Audit content schema governance in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 01. content schema governance
- Why now: the current data is a filename-keyed JavaScript object.
- Scope: Trace Hanzi, Pinyin, English, categories, tones, classifier, audio, image, and metadata. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-002. Define the outcome and measurement for content schema governance

- Priority: P0
- Effort: S
- Depends on: CT-001
- Epic: 01. content schema governance
- Why now: the current data is a filename-keyed JavaScript object.
- Scope: Write the intended result in plain language so that every content change has one contract. Choose one observable measure based on this target: schema versions, required fields, and validation rules are documented.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-003. Design the data and state contract for content schema governance

- Priority: P0
- Effort: M
- Depends on: CT-002
- Epic: 01. content schema governance
- Why now: the current data is a filename-keyed JavaScript object.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in Hanzi, Pinyin, English, categories, tones, classifier, audio, image, and metadata. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-004. Prototype content schema governance behind `ff_content_schema`

- Priority: P2
- Effort: M
- Depends on: CT-003
- Epic: 01. content schema governance
- Why now: the current data is a filename-keyed JavaScript object.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that the current data is a filename-keyed JavaScript object.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_content_schema

### CT-005. Implement the foundation for content schema governance

- Priority: P2
- Effort: L
- Depends on: CT-004
- Epic: 01. content schema governance
- Why now: the current data is a filename-keyed JavaScript object.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-006. Implement the core behavior for content schema governance

- Priority: P1
- Effort: L
- Depends on: CT-005
- Epic: 01. content schema governance
- Why now: the current data is a filename-keyed JavaScript object.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: every content change has one contract. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_content_schema

### CT-007. Add edge states and failure handling for content schema governance

- Priority: P2
- Effort: M
- Depends on: CT-006
- Epic: 01. content schema governance
- Why now: the current data is a filename-keyed JavaScript object.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to Hanzi, Pinyin, English, categories, tones, classifier, audio, image, and metadata.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-008. Verify content schema governance with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: CT-007
- Epic: 01. content schema governance
- Why now: the current data is a filename-keyed JavaScript object.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-009. Document rollout, cost, and operations for content schema governance

- Priority: P2
- Effort: S
- Depends on: CT-008
- Epic: 01. content schema governance
- Why now: the current data is a filename-keyed JavaScript object.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when content schema governance uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-010. Measure and decide the future of content schema governance

- Priority: P2
- Effort: S
- Depends on: CT-009
- Epic: 01. content schema governance
- Why now: the current data is a filename-keyed JavaScript object.
- Scope: Compare the observed result with the target from the outcome task: schema versions, required fields, and validation rules are documented. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_content_schema

## Epic 02: media asset pipeline

### CT-011. Audit media asset pipeline in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 02. media asset pipeline
- Why now: source assets may be missing or undocumented.
- Scope: Trace source images, generated images, audio recordings, compression, and publishing. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-012. Define the outcome and measurement for media asset pipeline

- Priority: P0
- Effort: S
- Depends on: CT-011
- Epic: 02. media asset pipeline
- Why now: source assets may be missing or undocumented.
- Scope: Write the intended result in plain language so that media can be regenerated and reviewed consistently. Choose one observable measure based on this target: each asset has source, transformation, checksum, and output metadata.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-013. Design the data and state contract for media asset pipeline

- Priority: P0
- Effort: M
- Depends on: CT-012
- Epic: 02. media asset pipeline
- Why now: source assets may be missing or undocumented.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in source images, generated images, audio recordings, compression, and publishing. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-014. Prototype media asset pipeline behind `ff_media_pipeline`

- Priority: P2
- Effort: M
- Depends on: CT-013
- Epic: 02. media asset pipeline
- Why now: source assets may be missing or undocumented.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that source assets may be missing or undocumented.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_media_pipeline

### CT-015. Implement the foundation for media asset pipeline

- Priority: P2
- Effort: L
- Depends on: CT-014
- Epic: 02. media asset pipeline
- Why now: source assets may be missing or undocumented.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-016. Implement the core behavior for media asset pipeline

- Priority: P1
- Effort: L
- Depends on: CT-015
- Epic: 02. media asset pipeline
- Why now: source assets may be missing or undocumented.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: media can be regenerated and reviewed consistently. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Prefer the free local path. Any hosted part needs renewable free-tier verification or a cost-benefit analysis before adoption.
- Flag or conflict notes: ff_media_pipeline

### CT-017. Add edge states and failure handling for media asset pipeline

- Priority: P2
- Effort: M
- Depends on: CT-016
- Epic: 02. media asset pipeline
- Why now: source assets may be missing or undocumented.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to source images, generated images, audio recordings, compression, and publishing.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-018. Verify media asset pipeline with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: CT-017
- Epic: 02. media asset pipeline
- Why now: source assets may be missing or undocumented.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-019. Document rollout, cost, and operations for media asset pipeline

- Priority: P2
- Effort: S
- Depends on: CT-018
- Epic: 02. media asset pipeline
- Why now: source assets may be missing or undocumented.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when media asset pipeline uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Prefer the free local path. Any hosted part needs renewable free-tier verification or a cost-benefit analysis before adoption.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-020. Measure and decide the future of media asset pipeline

- Priority: P2
- Effort: S
- Depends on: CT-019
- Epic: 02. media asset pipeline
- Why now: source assets may be missing or undocumented.
- Scope: Compare the observed result with the target from the outcome task: each asset has source, transformation, checksum, and output metadata. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_media_pipeline

## Epic 03: content provenance and licensing

### CT-021. Audit content provenance and licensing in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 03. content provenance and licensing
- Why now: AI-generated or externally sourced assets can still have usage constraints.
- Scope: Trace generated media, recordings, word lists, translations, and fonts. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-022. Define the outcome and measurement for content provenance and licensing

- Priority: P2
- Effort: S
- Depends on: CT-021
- Epic: 03. content provenance and licensing
- Why now: AI-generated or externally sourced assets can still have usage constraints.
- Scope: Write the intended result in plain language so that the project knows what it may distribute. Choose one observable measure based on this target: every asset and dataset has a provenance note and license status.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-023. Design the data and state contract for content provenance and licensing

- Priority: P1
- Effort: M
- Depends on: CT-022
- Epic: 03. content provenance and licensing
- Why now: AI-generated or externally sourced assets can still have usage constraints.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in generated media, recordings, word lists, translations, and fonts. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-024. Prototype content provenance and licensing behind `ff_provenance_licensing`

- Priority: P2
- Effort: M
- Depends on: CT-023
- Epic: 03. content provenance and licensing
- Why now: AI-generated or externally sourced assets can still have usage constraints.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that AI-generated or externally sourced assets can still have usage constraints.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_provenance_licensing

### CT-025. Implement the foundation for content provenance and licensing

- Priority: P2
- Effort: L
- Depends on: CT-024
- Epic: 03. content provenance and licensing
- Why now: AI-generated or externally sourced assets can still have usage constraints.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-026. Implement the core behavior for content provenance and licensing

- Priority: P1
- Effort: L
- Depends on: CT-025
- Epic: 03. content provenance and licensing
- Why now: AI-generated or externally sourced assets can still have usage constraints.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: the project knows what it may distribute. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Prefer the free local path. Any hosted part needs renewable free-tier verification or a cost-benefit analysis before adoption.
- Flag or conflict notes: ff_provenance_licensing

### CT-027. Add edge states and failure handling for content provenance and licensing

- Priority: P2
- Effort: M
- Depends on: CT-026
- Epic: 03. content provenance and licensing
- Why now: AI-generated or externally sourced assets can still have usage constraints.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to generated media, recordings, word lists, translations, and fonts.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-028. Verify content provenance and licensing with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: CT-027
- Epic: 03. content provenance and licensing
- Why now: AI-generated or externally sourced assets can still have usage constraints.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-029. Document rollout, cost, and operations for content provenance and licensing

- Priority: P2
- Effort: S
- Depends on: CT-028
- Epic: 03. content provenance and licensing
- Why now: AI-generated or externally sourced assets can still have usage constraints.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when content provenance and licensing uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Prefer the free local path. Any hosted part needs renewable free-tier verification or a cost-benefit analysis before adoption.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-030. Measure and decide the future of content provenance and licensing

- Priority: P2
- Effort: S
- Depends on: CT-029
- Epic: 03. content provenance and licensing
- Why now: AI-generated or externally sourced assets can still have usage constraints.
- Scope: Compare the observed result with the target from the outcome task: every asset and dataset has a provenance note and license status. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_provenance_licensing

## Epic 04: vocabulary metadata enrichment

### CT-031. Audit vocabulary metadata enrichment in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 04. vocabulary metadata enrichment
- Why now: external datasets may have licensing or accuracy limits.
- Scope: Trace frequency, HSK mapping, difficulty, example sentences, decomposition, and learner notes. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-032. Define the outcome and measurement for vocabulary metadata enrichment

- Priority: P2
- Effort: S
- Depends on: CT-031
- Epic: 04. vocabulary metadata enrichment
- Why now: external datasets may have licensing or accuracy limits.
- Scope: Write the intended result in plain language so that content can support progression and explanation. Choose one observable measure based on this target: enriched fields have sources and validation.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-033. Design the data and state contract for vocabulary metadata enrichment

- Priority: P1
- Effort: M
- Depends on: CT-032
- Epic: 04. vocabulary metadata enrichment
- Why now: external datasets may have licensing or accuracy limits.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in frequency, HSK mapping, difficulty, example sentences, decomposition, and learner notes. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-034. Prototype vocabulary metadata enrichment behind `ff_vocabulary_metadata`

- Priority: P2
- Effort: M
- Depends on: CT-033
- Epic: 04. vocabulary metadata enrichment
- Why now: external datasets may have licensing or accuracy limits.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that external datasets may have licensing or accuracy limits.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_vocabulary_metadata

### CT-035. Implement the foundation for vocabulary metadata enrichment

- Priority: P2
- Effort: L
- Depends on: CT-034
- Epic: 04. vocabulary metadata enrichment
- Why now: external datasets may have licensing or accuracy limits.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-036. Implement the core behavior for vocabulary metadata enrichment

- Priority: P1
- Effort: L
- Depends on: CT-035
- Epic: 04. vocabulary metadata enrichment
- Why now: external datasets may have licensing or accuracy limits.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: content can support progression and explanation. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_vocabulary_metadata

### CT-037. Add edge states and failure handling for vocabulary metadata enrichment

- Priority: P2
- Effort: M
- Depends on: CT-036
- Epic: 04. vocabulary metadata enrichment
- Why now: external datasets may have licensing or accuracy limits.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to frequency, HSK mapping, difficulty, example sentences, decomposition, and learner notes.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-038. Verify vocabulary metadata enrichment with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: CT-037
- Epic: 04. vocabulary metadata enrichment
- Why now: external datasets may have licensing or accuracy limits.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-039. Document rollout, cost, and operations for vocabulary metadata enrichment

- Priority: P2
- Effort: S
- Depends on: CT-038
- Epic: 04. vocabulary metadata enrichment
- Why now: external datasets may have licensing or accuracy limits.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when vocabulary metadata enrichment uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-040. Measure and decide the future of vocabulary metadata enrichment

- Priority: P2
- Effort: S
- Depends on: CT-039
- Epic: 04. vocabulary metadata enrichment
- Why now: external datasets may have licensing or accuracy limits.
- Scope: Compare the observed result with the target from the outcome task: enriched fields have sources and validation. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_vocabulary_metadata

## Epic 05: curriculum levels and paths

### CT-041. Audit curriculum levels and paths in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 05. curriculum levels and paths
- Why now: the current home screen offers modes without sequence.
- Scope: Trace beginner sequence, tone path, classifier path, thematic vocabulary, and review. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-042. Define the outcome and measurement for curriculum levels and paths

- Priority: P2
- Effort: S
- Depends on: CT-041
- Epic: 05. curriculum levels and paths
- Why now: the current home screen offers modes without sequence.
- Scope: Write the intended result in plain language so that learners know what to do next. Choose one observable measure based on this target: at least one written path links modes and content in a progression.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-043. Design the data and state contract for curriculum levels and paths

- Priority: P1
- Effort: M
- Depends on: CT-042
- Epic: 05. curriculum levels and paths
- Why now: the current home screen offers modes without sequence.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in beginner sequence, tone path, classifier path, thematic vocabulary, and review. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-044. Prototype curriculum levels and paths behind `ff_curriculum_paths`

- Priority: P2
- Effort: M
- Depends on: CT-043
- Epic: 05. curriculum levels and paths
- Why now: the current home screen offers modes without sequence.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that the current home screen offers modes without sequence.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_curriculum_paths

### CT-045. Implement the foundation for curriculum levels and paths

- Priority: P2
- Effort: L
- Depends on: CT-044
- Epic: 05. curriculum levels and paths
- Why now: the current home screen offers modes without sequence.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-046. Implement the core behavior for curriculum levels and paths

- Priority: P1
- Effort: L
- Depends on: CT-045
- Epic: 05. curriculum levels and paths
- Why now: the current home screen offers modes without sequence.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: learners know what to do next. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_curriculum_paths

### CT-047. Add edge states and failure handling for curriculum levels and paths

- Priority: P2
- Effort: M
- Depends on: CT-046
- Epic: 05. curriculum levels and paths
- Why now: the current home screen offers modes without sequence.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to beginner sequence, tone path, classifier path, thematic vocabulary, and review.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-048. Verify curriculum levels and paths with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: CT-047
- Epic: 05. curriculum levels and paths
- Why now: the current home screen offers modes without sequence.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-049. Document rollout, cost, and operations for curriculum levels and paths

- Priority: P2
- Effort: S
- Depends on: CT-048
- Epic: 05. curriculum levels and paths
- Why now: the current home screen offers modes without sequence.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when curriculum levels and paths uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-050. Measure and decide the future of curriculum levels and paths

- Priority: P2
- Effort: S
- Depends on: CT-049
- Epic: 05. curriculum levels and paths
- Why now: the current home screen offers modes without sequence.
- Scope: Compare the observed result with the target from the outcome task: at least one written path links modes and content in a progression. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_curriculum_paths

## Epic 06: category taxonomy

### CT-051. Audit category taxonomy in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 06. category taxonomy
- Why now: categories currently vary in granularity.
- Scope: Trace numbers, animals, body parts, objects, and overlapping categories. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-052. Define the outcome and measurement for category taxonomy

- Priority: P2
- Effort: S
- Depends on: CT-051
- Epic: 06. category taxonomy
- Why now: categories currently vary in granularity.
- Scope: Write the intended result in plain language so that filtering and curriculum design use consistent groups. Choose one observable measure based on this target: the taxonomy has canonical names, synonyms, and ownership.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-053. Design the data and state contract for category taxonomy

- Priority: P1
- Effort: M
- Depends on: CT-052
- Epic: 06. category taxonomy
- Why now: categories currently vary in granularity.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in numbers, animals, body parts, objects, and overlapping categories. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-054. Prototype category taxonomy behind `ff_category_taxonomy`

- Priority: P2
- Effort: M
- Depends on: CT-053
- Epic: 06. category taxonomy
- Why now: categories currently vary in granularity.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that categories currently vary in granularity.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_category_taxonomy

### CT-055. Implement the foundation for category taxonomy

- Priority: P2
- Effort: L
- Depends on: CT-054
- Epic: 06. category taxonomy
- Why now: categories currently vary in granularity.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-056. Implement the core behavior for category taxonomy

- Priority: P1
- Effort: L
- Depends on: CT-055
- Epic: 06. category taxonomy
- Why now: categories currently vary in granularity.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: filtering and curriculum design use consistent groups. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_category_taxonomy

### CT-057. Add edge states and failure handling for category taxonomy

- Priority: P2
- Effort: M
- Depends on: CT-056
- Epic: 06. category taxonomy
- Why now: categories currently vary in granularity.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to numbers, animals, body parts, objects, and overlapping categories.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-058. Verify category taxonomy with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: CT-057
- Epic: 06. category taxonomy
- Why now: categories currently vary in granularity.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-059. Document rollout, cost, and operations for category taxonomy

- Priority: P2
- Effort: S
- Depends on: CT-058
- Epic: 06. category taxonomy
- Why now: categories currently vary in granularity.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when category taxonomy uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-060. Measure and decide the future of category taxonomy

- Priority: P2
- Effort: S
- Depends on: CT-059
- Epic: 06. category taxonomy
- Why now: categories currently vary in granularity.
- Scope: Compare the observed result with the target from the outcome task: the taxonomy has canonical names, synonyms, and ownership. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_category_taxonomy

## Epic 07: content review workflow

### CT-061. Audit content review workflow in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 07. content review workflow
- Why now: manual review does not scale without batching.
- Scope: Trace new words, edited metadata, replacement media, and regression checks. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-062. Define the outcome and measurement for content review workflow

- Priority: P2
- Effort: S
- Depends on: CT-061
- Epic: 07. content review workflow
- Why now: manual review does not scale without batching.
- Scope: Write the intended result in plain language so that content quality improves without breaking existing sessions. Choose one observable measure based on this target: a review checklist covers meaning, tone, image, audio, license, and test impact.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-063. Design the data and state contract for content review workflow

- Priority: P2
- Effort: M
- Depends on: CT-062
- Epic: 07. content review workflow
- Why now: manual review does not scale without batching.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in new words, edited metadata, replacement media, and regression checks. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-064. Prototype content review workflow behind `ff_content_review`

- Priority: P2
- Effort: M
- Depends on: CT-063
- Epic: 07. content review workflow
- Why now: manual review does not scale without batching.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that manual review does not scale without batching.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_content_review

### CT-065. Implement the foundation for content review workflow

- Priority: P2
- Effort: L
- Depends on: CT-064
- Epic: 07. content review workflow
- Why now: manual review does not scale without batching.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-066. Implement the core behavior for content review workflow

- Priority: P2
- Effort: L
- Depends on: CT-065
- Epic: 07. content review workflow
- Why now: manual review does not scale without batching.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: content quality improves without breaking existing sessions. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_content_review

### CT-067. Add edge states and failure handling for content review workflow

- Priority: P2
- Effort: M
- Depends on: CT-066
- Epic: 07. content review workflow
- Why now: manual review does not scale without batching.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to new words, edited metadata, replacement media, and regression checks.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-068. Verify content review workflow with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: CT-067
- Epic: 07. content review workflow
- Why now: manual review does not scale without batching.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-069. Document rollout, cost, and operations for content review workflow

- Priority: P2
- Effort: S
- Depends on: CT-068
- Epic: 07. content review workflow
- Why now: manual review does not scale without batching.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when content review workflow uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-070. Measure and decide the future of content review workflow

- Priority: P2
- Effort: S
- Depends on: CT-069
- Epic: 07. content review workflow
- Why now: manual review does not scale without batching.
- Scope: Compare the observed result with the target from the outcome task: a review checklist covers meaning, tone, image, audio, license, and test impact. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_content_review

## Epic 08: localization-ready source content

### CT-071. Audit localization-ready source content in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 08. localization-ready source content
- Why now: Chinese learning content has special markup needs.
- Scope: Trace English explanations, Chinese text, Pinyin, examples, and future translations. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-072. Define the outcome and measurement for localization-ready source content

- Priority: P2
- Effort: S
- Depends on: CT-071
- Epic: 08. localization-ready source content
- Why now: Chinese learning content has special markup needs.
- Scope: Write the intended result in plain language so that content can be translated without restructuring. Choose one observable measure based on this target: user-facing text is separated from learning content.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-073. Design the data and state contract for localization-ready source content

- Priority: P2
- Effort: M
- Depends on: CT-072
- Epic: 08. localization-ready source content
- Why now: Chinese learning content has special markup needs.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in English explanations, Chinese text, Pinyin, examples, and future translations. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-074. Prototype localization-ready source content behind `ff_localization_ready_content`

- Priority: P2
- Effort: M
- Depends on: CT-073
- Epic: 08. localization-ready source content
- Why now: Chinese learning content has special markup needs.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that Chinese learning content has special markup needs.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_localization_ready_content

### CT-075. Implement the foundation for localization-ready source content

- Priority: P2
- Effort: L
- Depends on: CT-074
- Epic: 08. localization-ready source content
- Why now: Chinese learning content has special markup needs.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-076. Implement the core behavior for localization-ready source content

- Priority: P2
- Effort: L
- Depends on: CT-075
- Epic: 08. localization-ready source content
- Why now: Chinese learning content has special markup needs.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: content can be translated without restructuring. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_localization_ready_content

### CT-077. Add edge states and failure handling for localization-ready source content

- Priority: P2
- Effort: M
- Depends on: CT-076
- Epic: 08. localization-ready source content
- Why now: Chinese learning content has special markup needs.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to English explanations, Chinese text, Pinyin, examples, and future translations.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-078. Verify localization-ready source content with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: CT-077
- Epic: 08. localization-ready source content
- Why now: Chinese learning content has special markup needs.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-079. Document rollout, cost, and operations for localization-ready source content

- Priority: P2
- Effort: S
- Depends on: CT-078
- Epic: 08. localization-ready source content
- Why now: Chinese learning content has special markup needs.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when localization-ready source content uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-080. Measure and decide the future of localization-ready source content

- Priority: P2
- Effort: S
- Depends on: CT-079
- Epic: 08. localization-ready source content
- Why now: Chinese learning content has special markup needs.
- Scope: Compare the observed result with the target from the outcome task: user-facing text is separated from learning content. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_localization_ready_content

## Epic 09: content quality coverage

### CT-081. Audit content quality coverage in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 09. content quality coverage
- Why now: quality measurement needs human review for language correctness.
- Scope: Trace missing audio, missing images, tone accuracy, classifier accuracy, and category coverage. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-082. Define the outcome and measurement for content quality coverage

- Priority: P2
- Effort: S
- Depends on: CT-081
- Epic: 09. content quality coverage
- Why now: quality measurement needs human review for language correctness.
- Scope: Write the intended result in plain language so that content gaps are measured rather than anecdotal. Choose one observable measure based on this target: a report shows counts and examples for each defect class.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-083. Design the data and state contract for content quality coverage

- Priority: P2
- Effort: M
- Depends on: CT-082
- Epic: 09. content quality coverage
- Why now: quality measurement needs human review for language correctness.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in missing audio, missing images, tone accuracy, classifier accuracy, and category coverage. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-084. Prototype content quality coverage behind `ff_content_quality_coverage`

- Priority: P2
- Effort: M
- Depends on: CT-083
- Epic: 09. content quality coverage
- Why now: quality measurement needs human review for language correctness.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that quality measurement needs human review for language correctness.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_content_quality_coverage

### CT-085. Implement the foundation for content quality coverage

- Priority: P2
- Effort: L
- Depends on: CT-084
- Epic: 09. content quality coverage
- Why now: quality measurement needs human review for language correctness.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-086. Implement the core behavior for content quality coverage

- Priority: P2
- Effort: L
- Depends on: CT-085
- Epic: 09. content quality coverage
- Why now: quality measurement needs human review for language correctness.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: content gaps are measured rather than anecdotal. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_content_quality_coverage

### CT-087. Add edge states and failure handling for content quality coverage

- Priority: P2
- Effort: M
- Depends on: CT-086
- Epic: 09. content quality coverage
- Why now: quality measurement needs human review for language correctness.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to missing audio, missing images, tone accuracy, classifier accuracy, and category coverage.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-088. Verify content quality coverage with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: CT-087
- Epic: 09. content quality coverage
- Why now: quality measurement needs human review for language correctness.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-089. Document rollout, cost, and operations for content quality coverage

- Priority: P2
- Effort: S
- Depends on: CT-088
- Epic: 09. content quality coverage
- Why now: quality measurement needs human review for language correctness.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when content quality coverage uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-090. Measure and decide the future of content quality coverage

- Priority: P2
- Effort: S
- Depends on: CT-089
- Epic: 09. content quality coverage
- Why now: quality measurement needs human review for language correctness.
- Scope: Compare the observed result with the target from the outcome task: a report shows counts and examples for each defect class. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_content_quality_coverage

## Epic 10: custom deck authoring

### CT-091. Audit custom deck authoring in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 10. custom deck authoring
- Why now: sharing or syncing decks can introduce cost and moderation.
- Scope: Trace learner-selected words, imported lists, local decks, and sharing. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-092. Define the outcome and measurement for custom deck authoring

- Priority: P2
- Effort: S
- Depends on: CT-091
- Epic: 10. custom deck authoring
- Why now: sharing or syncing decks can introduce cost and moderation.
- Scope: Write the intended result in plain language so that learners can practice what they need. Choose one observable measure based on this target: deck creation has a local-first format and validation.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-093. Design the data and state contract for custom deck authoring

- Priority: P2
- Effort: M
- Depends on: CT-092
- Epic: 10. custom deck authoring
- Why now: sharing or syncing decks can introduce cost and moderation.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in learner-selected words, imported lists, local decks, and sharing. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-094. Prototype custom deck authoring behind `ff_custom_decks`

- Priority: P2
- Effort: M
- Depends on: CT-093
- Epic: 10. custom deck authoring
- Why now: sharing or syncing decks can introduce cost and moderation.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that sharing or syncing decks can introduce cost and moderation.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_custom_decks

### CT-095. Implement the foundation for custom deck authoring

- Priority: P2
- Effort: L
- Depends on: CT-094
- Epic: 10. custom deck authoring
- Why now: sharing or syncing decks can introduce cost and moderation.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-096. Implement the core behavior for custom deck authoring

- Priority: P2
- Effort: L
- Depends on: CT-095
- Epic: 10. custom deck authoring
- Why now: sharing or syncing decks can introduce cost and moderation.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: learners can practice what they need. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_custom_decks

### CT-097. Add edge states and failure handling for custom deck authoring

- Priority: P2
- Effort: M
- Depends on: CT-096
- Epic: 10. custom deck authoring
- Why now: sharing or syncing decks can introduce cost and moderation.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to learner-selected words, imported lists, local decks, and sharing.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-098. Verify custom deck authoring with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: CT-097
- Epic: 10. custom deck authoring
- Why now: sharing or syncing decks can introduce cost and moderation.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-099. Document rollout, cost, and operations for custom deck authoring

- Priority: P2
- Effort: S
- Depends on: CT-098
- Epic: 10. custom deck authoring
- Why now: sharing or syncing decks can introduce cost and moderation.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when custom deck authoring uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CT-100. Measure and decide the future of custom deck authoring

- Priority: P2
- Effort: S
- Depends on: CT-099
- Epic: 10. custom deck authoring
- Why now: sharing or syncing decks can introduce cost and moderation.
- Scope: Compare the observed result with the target from the outcome task: deck creation has a local-first format and validation. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_custom_decks

## Conflicts and feature-flag strategies

### Conflict 1: Generated media versus human-reviewed media

| Option | Pros | Cons |
|---|---|---|
| Use generated or batch-produced media | Production is fast and cheap; the corpus can expand quickly | Tone accuracy, visual clarity, cultural fit, and licensing need review |
| Use human-reviewed media | Quality and trust are higher; errors are easier to catch | Production is slower and may cost money or volunteer time |

Feature-flag or coexistence plan: Use `ff_generated_content` only with a review queue and provenance metadata.

### Conflict 2: Fixed built-in corpus versus custom decks

| Option | Pros | Cons |
|---|---|---|
| Keep a fixed corpus | Quality control is simpler; tests are stable; no import system is needed | Learners cannot adapt practice to classwork or personal goals |
| Support custom decks | Learners can practice relevant vocabulary; teachers can shape content | Import validation, storage, sharing, and support become more complex |

Feature-flag or coexistence plan: Use local custom decks behind `ff_custom_decks` before considering sync or sharing.

### Conflict 3: Canonical taxonomy versus free-form tags

| Option | Pros | Cons |
|---|---|---|
| Use a canonical taxonomy | Filters and curriculum paths stay predictable; analytics are cleaner | The taxonomy needs governance and occasional migration |
| Use free-form tags | Authors can describe content flexibly without waiting for taxonomy changes | Tags drift, duplicates appear, and filters become unreliable |

Feature-flag or coexistence plan: Support both by mapping free-form aliases into a canonical taxonomy rather than letting either grow unchecked.

## Third-party service cost policy

Prefer local content files and open datasets with clear licenses. Paid stock media, commissioned audio, or data licenses need cost-benefit analysis.

When a service does not have a renewable free tier, the cost-benefit analysis must include monthly fixed cost, usage-based cost at expected volume, free alternative, learner or maintainer benefit, privacy cost, lock-in cost, exit cost, and the decision deadline. A free trial is not a renewable free tier.

## Suggested sequencing

1. Complete P0 audit, outcome, design, and verification tasks before implementation tasks.
2. Choose at most one epic at a time for implementation.
3. Keep feature flags small, time-bounded, and tied to a measurement task.
4. Revisit this document after each landed slice and delete tasks that no longer earn their place.
