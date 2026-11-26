#!/usr/bin/env python3
"""Generate the improvement-program documents under docs/improvements."""

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "improvements"

APP_FACTS = [
    "The web app is a Vue 3 proof of concept loaded from a CDN in `magic/index.html`.",
    "`magic/script.js` holds most state, mode logic, audio playback, recording, pitch comparison, and quiz behavior in one file.",
    "`magic/words_data.js` maps 414 image filenames to Hanzi, Pinyin, English, categories, tones, and classifiers.",
    "`magic/audio/` and `magic/images/` each contain 414 assets, so offline behavior and asset weight matter.",
    "Capacitor targets iOS and Android, while `magic/deploy.sh` force-pushes a static build to GitHub Pages.",
    "The package test script is a placeholder, so every improvement task must define its own behavioral verification.",
]

COST_RULE = (
    "Default to local files, browser APIs, open-source software, GitHub Pages, and GitHub Actions. "
    "Use a third-party service only when it has a renewable free tier that covers the expected usage. "
    "If no renewable free tier exists, write a cost-benefit analysis before adoption and keep a free alternative."
)


def e(key, name, surface, outcome, metric, risk, cost="local"):
    return {
        "key": key,
        "name": name,
        "surface": surface,
        "outcome": outcome,
        "metric": metric,
        "risk": risk,
        "cost": cost,
        "flag": "ff_" + re.sub(r"[^a-z0-9]+", "_", key.lower()).strip("_"),
    }


def c(title, a, apros, acons, b, bpros, bcons, flag):
    return {
        "title": title,
        "a": a,
        "apros": apros,
        "acons": acons,
        "b": b,
        "bpros": bpros,
        "bcons": bcons,
        "flag": flag,
    }


def case(option, cost, benefit, free_alternative, verdict, source=None):
    return {
        "option": option,
        "cost": cost,
        "benefit": benefit,
        "free_alternative": free_alternative,
        "verdict": verdict,
        "source": source,
    }


def area(slug, title, prefix, purpose, epics, conflicts, service_focus, cost_cases=None):
    return {
        "slug": slug,
        "title": title,
        "prefix": prefix,
        "purpose": purpose,
        "epics": epics,
        "conflicts": conflicts,
        "service_focus": service_focus,
        "cost_cases": cost_cases or [],
    }


AREAS = [
    area(
        "code-quality",
        "Code quality and maintainability",
        "CQ",
        "Make the proof of concept easier to read, change, and review without changing learner-facing behavior.",
        [
            e("script-decomposition", "`magic/script.js` decomposition", "mode methods, audio state, quiz setup, and shadowing state in `magic/script.js`", "a maintainer can find the owner of each behavior in one pass", "no module exceeds an agreed size budget and each public behavior has one owner", "a broad extraction can break implicit coupling"),
            e("state-deduplication", "duplicated and implicit state cleanup", "`playDelay`, mode flags, recording state, quiz state, and session indexes", "state transitions become predictable and reviewable", "no duplicate keys or mutually inconsistent booleans remain", "hidden dependencies may survive the cleanup"),
            e("lint-format", "lint and formatting baseline", "JavaScript, HTML, CSS, and shell scripts", "every change receives the same mechanical checks", "`npm run lint` and `npm run format:check` run locally and in CI", "the first baseline may create a large formatting diff"),
            e("naming-organization", "naming and file organization", "`magic/`, `utils/`, `scripts/`, assets, and generated native files", "a new maintainer can predict where a file belongs", "each top-level directory has a written ownership rule", "renames can break deployment and Capacitor paths"),
            e("word-data-validation", "word-data validation", "`magic/words_data.js` and the matching audio and image files", "bad content fails before it reaches a learner", "all 414 entries validate against one schema", "strict validation may expose many existing data defects"),
            e("audio-lifecycle", "audio playback lifecycle quality", "`playActiveWord`, `playWebAudio`, `stopPlayback`, and NativeAudio fallback paths", "audio does not overlap, leak, or strand session state", "every playback path has a defined start, stop, completion, and error path", "browser and native behavior differ"),
            e("speech-synthesis-lifecycle", "speech synthesis lifecycle quality", "`speak` and browser voice selection", "spoken feedback is consistent and cancellable", "speech never overlaps reference audio unless the design says so", "voices vary across devices and browsers"),
            e("quiz-logic-readability", "quiz and recall logic readability", "`setupQuiz`, classifier choices, answer handlers, and recall reveal logic", "quiz behavior can be changed without reading unrelated playback code", "choice generation and scoring have isolated pure functions", "small regressions can hide in score and reveal timing"),
            e("inline-style-reduction", "inline style reduction", "`magic/index.html` inline styles and `magic/style.css`", "visual changes happen in one styling system", "inline styles remain only when they encode dynamic values", "visual regressions can appear during extraction"),
            e("maintainability-metrics", "maintainability measurement", "file size, coupling, duplication, and dependency freshness", "the project can detect complexity growth before it becomes painful", "a quarterly report tracks a small set of agreed metrics", "metrics can reward the wrong behavior if they become targets"),
        ],
        [
            c("Single-file Vue versus modular source", "Keep the single-file proof-of-concept shape", "No build step is required; deployment stays close to the current static copy; small fixes remain easy to locate by searching one file", "State and behavior stay coupled; tests are hard to write; review diffs become noisy", "Move logic into modules", "Modules create clear ownership; pure logic becomes testable; mode-specific changes stay isolated", "A bundler or module loading strategy is required; legacy deployment scripts must change", "Use `ff_module_shell` to mount either the legacy script or the modular shell while migration proceeds."),
            c("Strict data validation versus permissive legacy data", "Keep permissive parsing", "Existing content keeps loading; no content freeze is required; learners are not blocked by minor metadata gaps", "Bad tones, missing classifiers, and missing assets can fail deep inside a session", "Validate strictly at load time", "Defects appear early with precise filenames; generated content stays consistent; tests become simpler", "The first validation run may block many entries until the data is repaired", "Use `ff_strict_word_schema` so validation can run in report-only mode before it becomes blocking."),
            c("Large-formatting pass versus incremental formatting", "Format the whole codebase once", "The baseline becomes clean immediately; future diffs are smaller; lint rules mean the same thing everywhere", "The diff is large and hard to review; open branches may conflict", "Format only touched files", "Reviews stay narrow; migration risk is low; open branches survive", "The repository keeps two styles for a long time; lint noise continues", "Use a lint configuration that enforces changed files now and tracks a shrinking allowlist for legacy files."),
        ],
        "No service is required. Use local open-source linters and formatters.",
    ),
    area(
        "architecture-modularity",
        "Architecture and modularity",
        "AR",
        "Give the app explicit boundaries so learning modes, audio, content, persistence, and native shells can evolve independently.",
        [
            e("domain-model", "learning-domain model", "word, session, attempt, mode, score, and mastery concepts", "product logic uses the same nouns everywhere", "one written domain model names every core entity and invariant", "the current app stores these concepts implicitly in Vue state"),
            e("mode-registry", "mode registry", "the seven learning modes and their settings", "adding a mode becomes a registry entry instead of a cross-file conditional chain", "mode metadata, guards, and defaults live in one table", "a registry can become another god object if it absorbs behavior"),
            e("shadowing-state-machine", "shadowing state machine", "idle, recording, playback, comparing, mastered, failed, and retry states", "the shadowing flow becomes explicit and testable", "every state transition has one named event and one owner", "the current implementation uses several mutable fields"),
            e("boundary-audio", "audio boundary", "web audio, native audio, speech synthesis, and microphone capture", "UI code does not know which audio backend is active", "audio commands and events have one interface", "native and browser capabilities do not exactly match"),
            e("navigation-state", "navigation and session state", "home, welcome, browse, active session, summary, and retry flows", "navigation can be deep-linked and restored", "the current screen derives from one explicit state value", "the existing implementation uses several flags and indexes"),
            e("component-decomposition", "Vue component decomposition", "header, mobile menu, mode cards, word cards, session controls, and summary modal", "UI ownership matches what the learner sees", "each visible region has one component contract", "component extraction can pass too much state through props"),
            e("service-abstractions", "service abstraction layer", "speech, recording, persistence, analytics, and feature flags", "services can be replaced without rewriting modes", "each service has a small interface and a local implementation", "over-abstracting can hide simple browser APIs"),
            e("data-pipeline", "content data pipeline", "`words_data.js`, validation, normalization, and generated runtime data", "content enters the app through one validated pipeline", "every word has one normalized representation before Vue receives it", "generated data can drift from source data without checks"),
            e("feature-flag-system", "feature-flag architecture", "experimental modes, service-backed features, and migration paths", "risky changes can ship disabled and roll back without a revert", "flags have owner, expiry, default, and telemetry metadata", "too many flags can multiply test cases"),
            e("build-tooling-path", "build tooling migration path", "CDN Vue, static files, Capacitor sync, and GitHub Pages deployment", "the app can adopt modules without breaking static or mobile deployment", "one build command produces web and mobile assets", "a full framework migration would be larger than the proof of concept needs"),
        ],
        [
            c("Framework migration versus incremental modularization", "Migrate to a framework such as Vite plus Vue single-file components", "The project gains standard module boundaries, hot reload, tests, and optimized builds", "The migration touches deployment, Capacitor, tests, and every source file", "Modularize incrementally in place", "The current app keeps shipping while boundaries improve; each extraction is reviewable", "Some legacy coupling remains until the migration finishes", "Use `ff_module_shell` for the new shell and keep the legacy shell as the fallback."),
            c("Central store versus local component state", "Adopt a central store", "Shared session state becomes consistent; cross-component updates are explicit; persistence can subscribe to one state stream", "A store can become a second monolith and tempt every component to share state", "Keep state local with typed events", "Ownership stays close to the UI; fewer dependencies are required; small modes remain simple", "Cross-mode progress and summary state become harder to coordinate", "Use `ff_session_store` only for session and progress state, not every UI value."),
            c("Feature flags versus long-lived branches", "Use feature flags", "Work can merge small and disabled; rollback is a config change; experiments can be measured", "Flags require cleanup and can multiply runtime paths", "Use long-lived branches", "No runtime flag system is required; unfinished code stays out of the main branch", "Branches diverge, conflicts grow, and review happens too late", "Store flag metadata in one registry and require an expiry task for every flag."),
        ],
        "No service is required for the architecture itself. Feature flags can start as local configuration.",
    ),
    area(
        "security-privacy",
        "Security and privacy",
        "SP",
        "Protect learner recordings, content integrity, local data, and the supply chain while keeping the app usable without accounts.",
        [
            e("cdn-provenance", "third-party CDN provenance", "Vue and Font Awesome CDN tags in `magic/index.html`", "the app knows exactly which external code it runs", "every external asset has a pinned version, integrity note, and replacement plan", "unpinned CDN content can change or become unavailable"),
            e("content-security-policy", "content security policy", "static hosting response headers and inline scripts or styles", "XSS impact is reduced without breaking the app", "a tested policy exists with a report-only stage before enforcement", "the current inline Vue template and CDN assets constrain the policy"),
            e("microphone-privacy", "microphone privacy", "microphone permission, capture, playback, and comparison", "learners understand when recording starts and where audio goes", "recordings stay local unless an explicit consent flow says otherwise", "unclear state can make learners think audio is uploaded"),
            e("recording-retention", "recording retention and deletion", "`lastRecordedBlob`, MediaRecorder chunks, and temporary native files", "audio does not persist longer than needed", "recordings are cleared on demand and when a session ends unless saved explicitly", "native plugin behavior may differ from browser behavior"),
            e("xss-injection", "XSS and injection resistance", "word metadata, user writing input, status text, and future rich content", "content cannot execute script in the learner interface", "all untrusted strings render as text or pass through a documented sanitizer", "future content fields may add HTML"),
            e("dependency-supply-chain", "dependency supply chain", "`package.json`, lockfiles, Capacitor plugins, and generated native dependencies", "dependency changes are visible and reproducible", "one package manager, lockfile review, and vulnerability checks are documented", "the repo currently has multiple package-lock and pnpm-lock signals in `magic/`"),
            e("secret-hygiene", "secret and environment hygiene", "`.env`, scripts, workflow secrets, and future API keys", "secrets never enter git or client-side bundles", "a secret inventory and `.gitignore` check exist", "client-side apps cannot hide secrets from users"),
            e("native-permissions", "native permission declarations", "iOS and Android microphone, audio, network, and storage permission metadata", "app-store permission text matches actual behavior", "each permission has a purpose string and removal rule", "Capacitor defaults may request more than the app needs"),
            e("local-data-protection", "local data protection", "progress, settings, recordings, and future analytics identifiers", "learner data stays local by default and deletion is understandable", "a data inventory names storage keys, owners, retention, and deletion behavior", "sync features can conflict with local-first privacy"),
            e("incident-response", "security incident response", "dependency advisories, leaked secrets, malicious content, and privacy reports", "the project can respond without improvising", "a short runbook names contacts, triage, rollback, and disclosure steps", "a solo project still needs a realistic minimum process"),
        ],
        [
            c("Local-only processing versus cloud speech analysis", "Process audio locally", "Recordings do not leave the device; no service cost or consent flow is required; offline use keeps working", "Accuracy may be lower; implementation and maintenance are harder; older phones may struggle", "Use a cloud speech service", "Managed recognition and scoring may improve feedback quality; less signal-processing code is needed", "A renewable free tier may not cover audio volume; recordings create privacy obligations; offline use degrades", "Use `ff_cloud_speech` only after a written cost-benefit analysis and explicit learner consent. Keep local processing as the default."),
            c("Strict CSP versus current inline implementation", "Adopt a strict CSP now", "XSS impact drops; external script behavior becomes explicit; future regressions are blocked", "The current inline code and CDN assets may break until refactored", "Stay permissive", "No immediate refactoring is required; deployment stays unchanged", "XSS risk remains higher and the project has no clear boundary for executable content", "Use report-only mode first, then enforce with `ff_strict_csp` after violations are fixed."),
            c("Account-based privacy controls versus local-first controls", "Add accounts for privacy controls", "Deletion and consent can sync across devices; support can verify ownership", "Accounts create more personal data, authentication risk, and service cost", "Stay local-first", "Less data exists to protect; no account service is required; learners can start immediately", "Cross-device deletion and recovery are limited; lost devices lose progress", "Use `ff_accounts` only after a cost-benefit analysis and a data-protection design."),
        ],
        "Prefer local processing and open-source checks. Cloud speech, crash reporting, and accounts need free-tier verification or a cost-benefit analysis.",
    ),
    area(
        "testing-quality-assurance",
        "Testing and quality assurance",
        "QA",
        "Build a practical test pyramid that proves learner-visible behavior before architectural or pedagogical changes land.",
        [
            e("smoke-harness", "browser smoke harness", "home screen, mode start, word loading, and basic playback", "every pull request can prove that the app still starts", "one command runs a browser smoke test against the static app", "the current package has no real test script"),
            e("data-transform-tests", "data transformation unit tests", "word loading, tone filtering, classifier mapping, and shuffle behavior", "pure logic can change without manual retesting", "critical transforms have deterministic tests", "current logic is embedded in Vue computed state"),
            e("mode-component-tests", "mode component tests", "recall, standard, quiz, writing, classifier, tone practice, and shadowing", "each mode keeps its contract when shared code changes", "every mode has at least one behavior test", "component boundaries do not yet exist"),
            e("audio-mocks", "audio playback test doubles", "HTMLAudio, NativeAudio, speech synthesis, and MediaRecorder", "tests can cover audio flows without sound or devices", "audio interfaces have controllable fakes", "browser APIs behave differently across platforms"),
            e("shadowing-tests", "shadowing behavior tests", "recording, retry, scoring, mastery threshold, and session summary", "tone practice improvements do not regress the core loop", "state transitions and scoring rules have behavior tests", "pitch analysis needs deterministic fixtures"),
            e("visual-regression", "visual regression coverage", "home, welcome, word cards, summary modal, and mobile layouts", "UI refactoring does not silently shift the learning interface", "key breakpoints have baseline screenshots", "visual tests can become flaky without stable assets"),
            e("mobile-test-matrix", "mobile test matrix", "Android, iOS, browsers, microphone permission, and native audio", "mobile-specific regressions are found before release", "a documented matrix names manual and automated coverage", "device access is limited on a free budget", "mixed"),
            e("accessibility-test-automation", "accessibility test automation", "keyboard flow, semantics, contrast, and screen reader labels", "accessibility regressions fail in CI", "automated checks cover core screens and manual checks cover the rest", "automated tools cannot prove a good screen reader experience"),
            e("content-validation-tests", "content validation tests", "word schema, media presence, tone arrays, classifiers, and category names", "bad content fails before deployment", "CI validates all content and asset references", "the first run may expose many pre-existing defects"),
            e("ci-quality-gates", "CI quality gates", "pull requests, static checks, tests, builds, and deploy previews", "the main branch stays releasable", "CI runs the same commands a maintainer can run locally", "GitHub Actions minutes and mobile build time need budgeting"),
        ],
        [
            c("End-to-end tests versus unit tests first", "Start with end-to-end tests", "They prove real user behavior; a small number covers the whole proof of concept; no refactoring is required", "They are slower and can be flaky; failures are harder to localize", "Start with unit tests", "They are fast and precise; they support refactoring; failures point at logic", "They cannot prove that the current monolith wires behavior correctly", "Use both behind one `npm run verify` command, with smoke end-to-end tests first and unit extraction after."),
            c("Real devices versus browser emulation", "Use real devices", "Microphone, audio, safe areas, and performance are realistic", "Device labs cost money or require owned hardware; automation is slower", "Use browser emulation", "Tests are free, fast, and easy to run in CI", "Native audio, microphone prompts, and mobile browser differences can be missed", "Use free local emulation in CI and a manual real-device release checklist. Consider a paid device cloud only after a cost-benefit analysis."),
            c("Visual snapshots versus manual visual review", "Use visual snapshots", "Small pixel changes are caught automatically; refactors become safer", "Snapshots need stable fonts, images, and animations; noise can erode trust", "Use manual visual review", "No test infrastructure is required; human judgment catches design quality", "Review is inconsistent and easy to skip under time pressure", "Use snapshots behind `ff_visual_regression` for stable pages and keep manual review for interaction quality."),
        ],
        "Use Playwright, Vitest, or another open-source local runner. Browser-device cloud services need a cost-benefit analysis unless a renewable free tier covers the matrix.",
        cost_cases=[
            case("Hosted browser or device cloud", "Most services use subscriptions or usage billing after a trial. The proof of concept should not depend on them by default.", "Provides broad browser and device coverage without buying hardware.", "Use local Playwright browsers, Android emulator, iOS simulator, and owned devices.", "Use only for a release-critical matrix when local coverage misses a high-risk device class."),
            case("Paid visual regression service", "Hosted visual review commonly becomes paid as screenshot volume grows.", "Can reduce review work and manage baselines across browsers.", "Use local screenshot comparison with fixed fonts, deterministic data, and a small page set.", "Defer until visual regression volume makes local review unreliable."),
        ],
    ),
    area(
        "accessibility-inclusive-design",
        "Accessibility and inclusive design",
        "AC",
        "Make Mandarin practice usable with keyboard, screen reader, low vision, reduced motion, touch, and cognitive-access needs.",
        [
            e("semantic-structure", "semantic structure and landmarks", "header, main, cards, buttons, dialogs, and status regions", "assistive technology can navigate the app structure", "core screens expose correct landmarks and headings", "the current interface relies heavily on divs and icons"),
            e("keyboard-navigation", "keyboard navigation", "mode selection, playback controls, answers, writing input, and modal actions", "a keyboard-only learner can complete a session", "every interactive element is reachable and operable", "keyboard shortcuts may conflict with typing answers"),
            e("focus-management", "focus management", "session summary, mode changes, mobile menu, and revealed answers", "focus never disappears or jumps unpredictably", "focus moves intentionally and returns to a sensible control", "Vue conditional rendering can remove focused elements"),
            e("screen-reader-labels", "screen reader labels and announcements", "icon buttons, scores, recording state, feedback, and progress", "screen reader users hear meaningful state changes", "icon-only controls have names and dynamic updates use live regions carefully", "too many announcements can overwhelm users"),
            e("color-contrast", "color contrast and visual encoding", "score colors, tone buttons, cards, overlays, and feedback", "information does not depend on color alone", "text and interactive indicators meet chosen contrast targets", "color palette changes can alter brand feel"),
            e("reduced-motion", "reduced motion support", "animations, transitions, progress bars, contour drawing, and success feedback", "motion-sensitive learners can use the app comfortably", "`prefers-reduced-motion` changes or disables nonessential motion", "feedback must remain clear without animation"),
            e("touch-targets", "touch target sizing and spacing", "tone buttons, mode cards, mobile menu, playback controls, and answer buttons", "small-screen learners can tap accurately", "targets meet a documented minimum size and spacing", "larger targets can change dense layouts"),
            e("visual-audio-cues", "visual alternatives for audio cues", "playback state, reference audio, success sound, and spoken feedback", "deaf and hard-of-hearing learners receive equivalent feedback", "every audio-only signal has a visible counterpart", "tone feedback still depends on hearing or visualization"),
            e("accessible-settings", "accessible forms and settings", "volume, auto-continue, mastery threshold, tone filters, and writing target", "settings are understandable and operable by everyone", "controls have labels, descriptions, and keyboard support", "custom sliders and buttons need careful implementation"),
            e("accessibility-audit-loop", "accessibility audit loop", "automated checks, manual keyboard passes, screen reader passes, and learner feedback", "accessibility remains a repeated practice", "each release checklist names the required checks", "a solo maintainer needs a scoped realistic checklist"),
        ],
        [
            c("Custom controls versus native controls", "Use custom controls", "Visual design can match the product exactly; complex tone selectors are flexible", "Keyboard, focus, and assistive technology behavior must be recreated", "Use native controls", "Accessibility behavior comes by default; implementation is smaller; behavior is consistent across platforms", "Visual design is constrained and may look less polished", "Use native controls first. If a custom control is needed, place it behind `ff_accessible_custom_controls` and test it with keyboard and screen reader."),
            c("Dense desktop layout versus simplified responsive layout", "Keep dense layouts", "More controls remain visible; desktop users can scan quickly", "Small targets and dense groups are harder for touch, low vision, and attention", "Use simplified responsive layouts", "Targets are clearer; cognitive load drops; mobile usability improves", "Some controls move into menus or secondary screens", "Use `ff_simplified_layout` to compare task completion and learner preference before committing."),
            c("Rich animation versus minimal motion", "Use rich animation", "Success and progress feel rewarding; state changes are visible", "Motion can distract or harm motion-sensitive users; low-end devices may struggle", "Use minimal motion", "The interface is calmer, faster, and safer for motion-sensitive users", "Feedback can feel flat if no replacement cue exists", "Respect `prefers-reduced-motion` globally and test richer motion only as an opt-in setting."),
        ],
        "Use open-source accessibility checkers and manual testing. Paid audit services are optional and need a cost-benefit analysis.",
    ),
    area(
        "performance-asset-optimization",
        "Performance and asset optimization",
        "PF",
        "Reduce startup cost, memory use, media weight, and interaction latency so practice stays responsive on mobile devices.",
        [
            e("asset-inventory", "asset inventory and compression", "414 images, 414 audio files, icons, video, and generated native assets", "the project knows what media costs and what can shrink", "every asset type has size, format, owner, and optimization target", "lossy compression can reduce learning-critical audio or image quality"),
            e("image-strategy", "image loading strategy", "word-card images in grid and session views", "images appear quickly without blocking interaction", "images have dimensions, lazy loading, and responsive variants where useful", "lazy loading can cause visible pop-in during sessions"),
            e("audio-loading-strategy", "audio loading strategy", "preload, native assets, web audio, and reference playback", "audio starts quickly without downloading the whole set up front", "a policy names preload, cache, eviction, and fallback behavior", "offline use conflicts with small startup downloads"),
            e("dependency-weight", "dependency weight control", "CDN Vue, Font Awesome, future frameworks, and native plugins", "the app downloads only code it uses", "each dependency has a purpose and size budget", "self-hosting can improve control but adds maintenance"),
            e("grid-rendering", "word-grid rendering", "`filteredWords`, large lists, card images, and search", "browsing 414 words remains smooth", "scrolling stays responsive on a low-end test device", "virtualization can complicate keyboard and screen reader navigation"),
            e("startup-performance", "startup performance", "script parsing, word-data loading, first render, and asset discovery", "the first usable screen appears quickly", "a measured budget exists for first contentful render and time to interactive", "CDN scripts and large data files can dominate startup"),
            e("memory-management", "memory and object lifecycle", "Audio objects, AudioContext, MediaRecorder, animation frames, and event listeners", "long sessions do not grow memory or degrade", "resource creation and disposal are paired in tests", "browser and native behavior differ"),
            e("cache-strategy", "cache strategy", "static hosting, service worker, media assets, and versioned data", "repeat visits are fast without serving stale learning content", "cache lifetime and invalidation rules are written per asset type", "aggressive caching can strand users on old versions"),
            e("mobile-performance", "mobile performance", "low-end Android, iOS webview, microphone capture, and animation", "practice remains responsive on real devices", "a device budget covers CPU, memory, startup, and audio latency", "free testing hardware is limited"),
            e("performance-budgets", "performance budgets and monitoring", "bundle size, asset size, startup timing, interaction latency, and memory", "performance regressions are visible before release", "CI or release checks compare current values against budgets", "numbers need repeatable measurement conditions"),
        ],
        [
            c("Offline preloading versus small startup download", "Preload media aggressively", "Practice feels instant after startup; offline sessions avoid network failures", "Startup cost grows; storage use grows; learners may download media they never use", "Load media on demand", "Startup stays small; storage stays low; unused content is never fetched", "Network latency can interrupt practice; offline behavior becomes less reliable", "Use `ff_media_preload` with per-mode preload settings and measure completion against download cost."),
            c("Lossless versus lossy media optimization", "Use lossless optimization", "Quality is preserved; learners hear and see the original content", "Savings are limited; mobile downloads remain heavy", "Use lossy optimization", "File sizes can drop significantly; startup and offline install improve", "Poor settings can remove tone detail or make images harder to interpret", "Use a reviewable encoding preset and a sample approval step before batch conversion."),
            c("Virtualized grid versus simple grid", "Virtualize the grid", "Large lists render fewer nodes and scroll more smoothly", "Accessibility, browser find-in-page, and layout complexity become harder", "Keep a simple grid", "Implementation stays simple and all content is in the document", "Rendering hundreds of cards can cost memory and scrolling performance", "Use `ff_virtual_grid` only after measuring a real performance problem on target devices."),
        ],
        "Use local open-source compression, Lighthouse, and browser tooling. Paid device performance services need a cost-benefit analysis.",
    ),
    area(
        "mobile-native-experience",
        "Mobile native experience",
        "MN",
        "Make the Capacitor app feel deliberate on iOS and Android instead of behaving like a repackaged browser page.",
        [
            e("capacitor-config", "Capacitor configuration ownership", "`capacitor.config.json`, sync script, app id, plugin versions, and webDir", "native behavior is reproducible and documented", "one command syncs web assets and validates config", "generated native files can hide manual changes"),
            e("native-audio-experience", "native audio behavior", "`@capacitor-community/native-audio`, web fallback, volume, completion, and interruption handling", "playback is reliable in native shells", "play, stop, completion, and interruptions behave consistently", "plugin APIs differ from HTMLAudio"),
            e("microphone-permission-flow", "microphone permission flow", "first use, denied state, settings recovery, and session retry", "learners understand and can recover from permission states", "every permission state has copy and a next action", "iOS and Android permission models differ"),
            e("android-build-reproducibility", "Android build reproducibility", "Gradle files, Java version, SDK versions, and debug APK output", "a maintainer can reproduce the Android build", "a clean checkout builds with documented versions", "local machine setup can drift"),
            e("ios-signing-docs", "iOS signing and free-account workflow", "Xcode signing, seven-day free provisioning, device trust, and release constraints", "a maintainer can run the app on a personal device without confusion", "the docs distinguish free local testing from paid distribution", "Apple distribution has no renewable free tier", "paid-analysis"),
            e("mobile-navigation-safe-area", "mobile navigation and safe areas", "viewport fit, sticky header, mobile menu, notches, and gesture areas", "controls remain visible and tappable on real phones", "core screens avoid clipped or overlapping controls", "small layout defects vary by device"),
            e("native-feedback", "native feedback and haptics", "success, failure, recording state, and completion feedback", "feedback feels immediate without relying only on sound", "important events have visual and optional tactile feedback", "excess haptics can annoy users"),
            e("background-lockscreen", "background and lock-screen behavior", "audio session lifecycle, interruptions, recording state, and resume", "the app recovers predictably when interrupted", "backgrounding and returning never duplicate audio or corrupt a session", "mobile operating systems limit webview behavior"),
            e("icons-splash", "icons and splash assets", "`assets/`, `icons/`, generated iOS and Android resources", "the installed app looks intentional", "all required icon and splash sizes generate from reviewed source assets", "generated assets can be accidentally edited or left stale"),
            e("mobile-release-process", "mobile release process", "device testing, version codes, signing, store requirements, and rollback", "mobile releases are repeatable rather than improvised", "a release checklist covers build, test, install, and rollback", "store distribution introduces nonfree developer account costs"),
        ],
        [
            c("Native plugins versus web APIs", "Use native plugins", "Native audio and permissions can integrate with platform behavior more accurately", "Plugins add dependency, build, and maintenance cost; web and native behavior can diverge", "Use web APIs", "One implementation serves web and mobile; testing is simpler; fewer dependencies are needed", "Some mobile behaviors are limited or inconsistent in a webview", "Use the service-boundary flag `ff_native_audio` so web audio remains the fallback while native behavior is verified."),
            c("Free local testing versus paid store distribution", "Use free local testing", "No recurring distribution cost is required on Android; iOS can use a free Apple ID for short-lived local installs", "iOS provisioning expires quickly; there is no store presence or simple user install path", "Pay for store distribution", "Users can install updates normally; signing and distribution become manageable", "Apple distribution has an annual fee rather than a renewable monthly free tier; store review adds process", "Document a cost-benefit analysis before any paid account. Keep local testing as the default until learner demand justifies distribution."),
            c("Capacitor wrapper versus native rebuild", "Keep Capacitor", "Existing web code remains useful; one codebase covers web and mobile; iteration is cheaper", "Some interactions retain webview constraints and plugin complexity", "Rebuild natively", "Platform behavior, performance, and audio integration can be more precise", "Cost and maintenance rise sharply; web and mobile implementations diverge", "Do not rebuild by default. Prototype any native-only capability behind `ff_native_shell` and compare learner value before committing."),
        ],
        "Capacitor is open source. Apple distribution and some device-testing services lack renewable free tiers, so they require cost-benefit analysis.",
        cost_cases=[
            case("Apple Developer Program", "Apple lists a US$99 annual membership. It renews annually, not as a renewable monthly free tier.", "Enables App Store distribution, TestFlight, and normal installation for external learners.", "Use web deployment, Android local installs, and free Apple ID local testing while accepting short-lived iOS provisioning.", "Defer until external iOS learners need managed installs. Re-evaluate when a release candidate exists.", "https://developer.apple.com/programs/"),
            case("Google Play full distribution", "Google lists a US$25 one-time registration fee. It is not a monthly renewable free tier, but the cost is fixed and low.", "Enables broad Android distribution through Google Play.", "Use local APK installs or the limited-distribution path where eligible, then verify current Play Console terms.", "Defer until Android learners outside the maintainer's devices need store distribution.", "https://support.google.com/googleplay/android-developer/answer/6112435"),
            case("Hosted mobile device cloud", "Pricing is usually subscription or usage based after any trial. A trial does not satisfy the renewable-free-tier rule.", "Expands real-device coverage for microphone, audio, safe-area, and performance defects.", "Use browser emulation, owned devices, simulator, and a manual release checklist.", "Do not adopt by default. Consider a one-month paid run only before a public mobile release if defect risk justifies the cost."),
        ],
    ),
    area(
        "offline-pwa-reliability",
        "Offline, PWA, and reliability",
        "RL",
        "Make practice resilient to weak networks, stale deploys, interrupted audio, storage pressure, and partial failures.",
        [
            e("service-worker", "service worker strategy", "static shell, word data, images, audio, and versioned deploys", "repeat visits work with little or no network", "cache rules are explicit per asset type", "incorrect caching can serve stale content or fill storage"),
            e("offline-states", "offline and degraded states", "startup, media playback, session progress, and settings", "learners know what works offline and what failed", "every network-dependent action has a visible offline result", "the current app assumes static files exist"),
            e("asset-integrity", "asset integrity checks", "audio files, images, generated data, and deployment copies", "missing media is detected before or during release", "a release check validates every referenced asset", "large media sets make manual checking unrealistic"),
            e("error-boundaries", "error boundaries and recovery", "Vue startup, mode rendering, media playback, and recording", "one failure does not blank the whole learning session", "important failures show a recovery action and preserve safe state", "global handlers can hide defects if they are too broad"),
            e("playback-retry", "playback retry and resume", "network media, native plugin errors, speech synthesis, and user-initiated retry", "temporary media failures do not end a session", "playback errors expose retry, skip, and continue options", "automatic retry can loop forever"),
            e("session-recovery", "session recovery", "active mode, word index, score, failed words, and recording state", "learners can resume after reload or interruption", "restored sessions explain what was recovered", "restoring stale recording state can confuse users"),
            e("storage-quota", "storage quota handling", "cached media, saved progress, and future recordings", "the app degrades predictably when storage fills", "quota errors have detection, copy, and cleanup guidance", "browser quota behavior varies"),
            e("update-versioning", "update and versioning strategy", "service worker versions, static deploys, native versions, and content versions", "learners receive updates without losing progress", "versioned migrations are documented and tested", "force-refresh behavior can interrupt active sessions"),
            e("client-diagnostics", "client diagnostics", "console errors, media failures, permission states, and device capabilities", "bug reports include enough detail to reproduce failures", "a local diagnostic bundle can be copied by the learner", "diagnostics must avoid recordings and personal content"),
            e("reliability-testing", "reliability and chaos testing", "offline startup, slow network, missing assets, denied permissions, and interrupted sessions", "known failure modes are rehearsed before users hit them", "a checklist or automated suite covers the highest-risk failures", "full chaos coverage is too expensive for a proof of concept"),
        ],
        [
            c("Installable PWA versus plain static site", "Build an installable PWA", "Learners can launch the app like a native app; offline caching is explicit; repeat use is easier", "Service worker correctness is hard; update bugs can be persistent; iOS support has limits", "Remain a plain static site", "Deployment stays simple; no service worker failure mode exists", "Offline use and install behavior remain limited or inconsistent", "Use `ff_pwa` while validating cache update behavior and offline startup."),
            c("Cache-first media versus network-first media", "Use cache-first media", "Playback is fast and works offline after the first download", "Storage grows and stale media can persist", "Use network-first media", "Fresh content is preferred and storage stays lower", "Weak networks interrupt practice and repeat downloads cost bandwidth", "Use cache-first for immutable media with content hashes, and network-first only for versioned mutable data."),
            c("Automatic session restore versus explicit restart", "Restore sessions automatically", "Interrupted learners lose less progress; the app feels resilient", "Stale or partially corrupt state can restore confusing sessions", "Require explicit restart", "Learners always see a clean state; implementation is simpler", "Reloads lose progress and frustrate learners", "Use `ff_session_recovery` and show a restore prompt rather than silently restoring complex recording state."),
        ],
        "Use browser service worker APIs and local testing. No third-party service is required.",
    ),
    area(
        "learning-science-pedagogy",
        "Learning science and pedagogy",
        "LP",
        "Ground mode design, feedback, difficulty, and mastery rules in language-learning evidence instead of proof-of-concept convenience.",
        [
            e("learning-objectives", "learning objectives and scope", "vocabulary, tones, classifiers, recall, writing, listening, and shadowing", "each mode has a clear learning job", "every mode states what it teaches, what it does not teach, and how mastery is judged", "the current modes mix several skills without explicit outcomes"),
            e("spaced-repetition", "spaced repetition model", "review scheduling, forgetting, retries, and mastery decay", "learners review items before forgetting them", "a documented scheduler maps performance to the next review time", "simple repetition can become either too easy or overwhelming"),
            e("active-recall-design", "active recall design", "hidden Hanzi, hidden Pinyin, English prompts, and reveal timing", "recall practice requires retrieval rather than recognition", "recall modes state prompt direction, feedback, and scoring rules", "blurring text alone does not guarantee retrieval quality"),
            e("tone-minimal-pairs", "tone minimal-pair practice", "tone sequences, similar syllables, contrastive listening, and production", "learners practice differences that cause real confusion", "tone exercises include contrast and corrective feedback", "the existing corpus may not contain enough controlled pairs"),
            e("shadowing-feedback-quality", "shadowing feedback quality", "pitch contour, timing, pronunciation, and actionable feedback", "feedback tells learners what to change next", "feedback names one priority correction and one confirmation", "a numeric score alone does not teach"),
            e("writing-validity", "writing practice validity", "Hanzi writing, Pinyin input, stroke order, and production recall", "writing tasks measure the intended skill", "each writing task states whether recognition, spelling, or stroke production is being assessed", "keyboard input cannot prove handwriting ability"),
            e("classifier-instruction", "classifier instruction", "classifier meanings, examples, exceptions, and quiz feedback", "learners understand classifier choice rather than guessing", "classifier feedback explains the category rule and a counterexample", "the current classifier quiz relies on a small static table"),
            e("difficulty-progression", "difficulty progression", "word length, tone complexity, frequency, category, and learner performance", "sessions adapt from easier to harder material", "a progression rule orders content using explicit difficulty signals", "difficulty varies by learner background"),
            e("corrective-feedback", "corrective feedback design", "wrong quiz answers, writing errors, tone mismatch, and retry guidance", "mistakes become useful information", "each error state says what happened and what to try next", "too much feedback can interrupt flow"),
            e("mastery-definition", "mastery definition and assessment", "thresholds, attempts, recency, transfer, and session completion", "progress means durable learning rather than one lucky answer", "mastery combines accuracy, recency, and retrieval conditions in one written rule", "simple percentages can overstate learning"),
        ],
        [
            c("Spaced repetition versus free practice", "Use spaced repetition", "Review time is used efficiently; forgetting is addressed directly; progress becomes durable", "The model adds complexity and can feel restrictive", "Keep free practice", "Learners control their sessions; implementation stays simple; exploration is easy", "Learners may repeat easy items and neglect weak items", "Use `ff_spaced_review` for a suggested review queue while keeping free practice available."),
            c("Numeric tone score versus qualitative tone feedback", "Use a numeric score", "Progress is easy to compare; thresholds are simple; gamification can use the score", "The number can be opaque or misleading when pitch extraction is uncertain", "Use qualitative feedback", "Feedback can name the tone shape and the next correction", "It is harder to compare progress or automate mastery", "Show both behind `ff_tone_feedback_detail`, with qualitative feedback primary and the score secondary."),
            c("Fixed curriculum versus adaptive sequencing", "Use a fixed curriculum", "Content order is predictable and easier to author; research scope is smaller", "Learners with different backgrounds receive the wrong difficulty", "Use adaptive sequencing", "Practice can respond to performance and weaknesses", "Bad learner models can reinforce frustration or avoid hard content", "Use `ff_adaptive_sequence` after baseline learner data supports the first adaptation rule."),
        ],
        "Learning-science work needs no third-party service. If a research or assessment service is considered, it needs free-tier verification or a cost-benefit analysis.",
    ),
    area(
        "content-curriculum-management",
        "Content and curriculum management",
        "CT",
        "Turn the 414-item asset set into governed, reviewed, expandable learning content with clear provenance and curriculum structure.",
        [
            e("content-schema", "content schema governance", "Hanzi, Pinyin, English, categories, tones, classifier, audio, image, and metadata", "every content change has one contract", "schema versions, required fields, and validation rules are documented", "the current data is a filename-keyed JavaScript object"),
            e("media-pipeline", "media asset pipeline", "source images, generated images, audio recordings, compression, and publishing", "media can be regenerated and reviewed consistently", "each asset has source, transformation, checksum, and output metadata", "source assets may be missing or undocumented", "mixed"),
            e("provenance-licensing", "content provenance and licensing", "generated media, recordings, word lists, translations, and fonts", "the project knows what it may distribute", "every asset and dataset has a provenance note and license status", "AI-generated or externally sourced assets can still have usage constraints", "mixed"),
            e("vocabulary-metadata", "vocabulary metadata enrichment", "frequency, HSK mapping, difficulty, example sentences, decomposition, and learner notes", "content can support progression and explanation", "enriched fields have sources and validation", "external datasets may have licensing or accuracy limits"),
            e("curriculum-paths", "curriculum levels and paths", "beginner sequence, tone path, classifier path, thematic vocabulary, and review", "learners know what to do next", "at least one written path links modes and content in a progression", "the current home screen offers modes without sequence"),
            e("category-taxonomy", "category taxonomy", "numbers, animals, body parts, objects, and overlapping categories", "filtering and curriculum design use consistent groups", "the taxonomy has canonical names, synonyms, and ownership", "categories currently vary in granularity"),
            e("content-review", "content review workflow", "new words, edited metadata, replacement media, and regression checks", "content quality improves without breaking existing sessions", "a review checklist covers meaning, tone, image, audio, license, and test impact", "manual review does not scale without batching"),
            e("localization-ready-content", "localization-ready source content", "English explanations, Chinese text, Pinyin, examples, and future translations", "content can be translated without restructuring", "user-facing text is separated from learning content", "Chinese learning content has special markup needs"),
            e("content-quality-coverage", "content quality coverage", "missing audio, missing images, tone accuracy, classifier accuracy, and category coverage", "content gaps are measured rather than anecdotal", "a report shows counts and examples for each defect class", "quality measurement needs human review for language correctness"),
            e("custom-decks", "custom deck authoring", "learner-selected words, imported lists, local decks, and sharing", "learners can practice what they need", "deck creation has a local-first format and validation", "sharing or syncing decks can introduce cost and moderation"),
        ],
        [
            c("Generated media versus human-reviewed media", "Use generated or batch-produced media", "Production is fast and cheap; the corpus can expand quickly", "Tone accuracy, visual clarity, cultural fit, and licensing need review", "Use human-reviewed media", "Quality and trust are higher; errors are easier to catch", "Production is slower and may cost money or volunteer time", "Use `ff_generated_content` only with a review queue and provenance metadata."),
            c("Fixed built-in corpus versus custom decks", "Keep a fixed corpus", "Quality control is simpler; tests are stable; no import system is needed", "Learners cannot adapt practice to classwork or personal goals", "Support custom decks", "Learners can practice relevant vocabulary; teachers can shape content", "Import validation, storage, sharing, and support become more complex", "Use local custom decks behind `ff_custom_decks` before considering sync or sharing."),
            c("Canonical taxonomy versus free-form tags", "Use a canonical taxonomy", "Filters and curriculum paths stay predictable; analytics are cleaner", "The taxonomy needs governance and occasional migration", "Use free-form tags", "Authors can describe content flexibly without waiting for taxonomy changes", "Tags drift, duplicates appear, and filters become unreliable", "Support both by mapping free-form aliases into a canonical taxonomy rather than letting either grow unchecked."),
        ],
        "Prefer local content files and open datasets with clear licenses. Paid stock media, commissioned audio, or data licenses need cost-benefit analysis.",
    ),
    area(
        "audio-speech-tone-analysis",
        "Audio, speech, and tone analysis",
        "AU",
        "Make reference audio, recording, pitch analysis, and feedback accurate enough that learners can trust the shadowing loop.",
        [
            e("reference-audio-quality", "reference audio quality", "414 MP3 files, loudness, noise, clipping, pronunciation, and consistency", "learners imitate clean and consistent models", "every reference file passes loudness, silence, clipping, and duration checks", "batch generation may hide bad files"),
            e("pitch-extraction-accuracy", "pitch extraction accuracy", "`detectPitch`, autocorrelation or related logic, silence, noise, and octave errors", "tone feedback reflects the learner's actual pitch", "test fixtures cover clean speech, noise, silence, and octave jumps", "pitch tracking tonal speech is technically hard"),
            e("noise-handling", "noise and microphone variability", "background noise, laptop microphones, phone microphones, and gain differences", "feedback remains useful in normal environments", "the app detects low-quality input and explains how to improve it", "aggressive filtering can remove useful speech signal"),
            e("recording-compatibility", "recording format compatibility", "webm, mp4, MediaRecorder support, native capture, and sample rates", "recording works across supported browsers and devices", "capability detection selects a supported format with fallback behavior", "Safari and mobile webviews often differ"),
            e("tone-score-explainability", "tone score explainability", "overall score, contour comparison, threshold, and generated feedback", "learners understand why they received a score", "feedback references the contour region or tone feature that drove the result", "a single score can hide timing and contour differences"),
            e("tts-voice-selection", "TTS voice selection and fallback", "`speechSynthesis`, zh-CN voices, rate, pitch, and platform variation", "spoken support is consistent when reference audio is unavailable", "voice selection has deterministic fallback behavior", "browser voice availability cannot be controlled"),
            e("audio-synchronization", "audio synchronization", "reference playback, user playback, comparison, auto-continue, and cancellation", "audio events do not overlap or race", "a sequence diagram and tests cover playback ordering", "current callbacks and timers may overlap"),
            e("contour-visualization", "tone contour visualization", "canvas drawing, reference contour, user contour, and accessible alternatives", "learners can see the difference they are trying to correct", "the chart labels tones, time, and mismatch regions", "visual charts need a nonvisual equivalent"),
            e("benchmark-corpus", "speech benchmark corpus", "recorded samples, expected tones, noise variants, and scoring fixtures", "algorithm changes can be compared objectively", "a versioned fixture set covers the five tones and common sequences", "collecting or licensing speech data requires consent and provenance"),
            e("analysis-execution-choice", "analysis execution choice", "on-device analysis, native processing, and optional cloud analysis", "the project chooses where analysis runs using evidence", "accuracy, latency, privacy, cost, and offline behavior are compared", "cloud analysis conflicts with privacy and cost constraints", "mixed"),
        ],
        [
            c("On-device analysis versus cloud speech analysis", "Analyze on device", "Audio stays private; offline use continues; no recurring speech-service bill exists", "Implementation is hard; accuracy may be lower; older devices may struggle", "Analyze in the cloud", "Managed models may improve recognition or scoring; less DSP code is needed", "A renewable free tier may not cover audio volume; uploads require consent; offline behavior degrades", "Keep on-device analysis as default. Use `ff_cloud_speech` only after a cost-benefit analysis proves learner benefit."),
            c("Exact pitch matching versus tolerant contour feedback", "Require exact pitch matching", "The target is clear and measurement is simple", "Learner pitch ranges differ; exact matching can penalize correct tones", "Use tolerant contour feedback", "Tone shape and relative movement matter more than absolute pitch", "Tolerance is harder to explain and calibrate", "Use `ff_pitch_tolerance` and evaluate against a labeled benchmark corpus."),
            c("Real-time feedback versus post-recording feedback", "Use real-time feedback", "Learners can correct themselves immediately", "Noise, latency, and visual complexity increase; implementation is harder", "Use post-recording feedback", "Analysis is simpler and more stable; feedback can be clearer", "Learners receive correction later and may repeat errors during recording", "Use post-recording feedback first. Prototype real-time feedback behind `ff_realtime_tone` and compare learning value."),
        ],
        "Start with Web Audio and open-source analysis. Cloud speech services need renewable free-tier verification or a cost-benefit analysis.",
        cost_cases=[
            case("Cloud speech recognition or pronunciation assessment", "Audio-minute pricing can grow with practice volume, and free tiers may be limited or temporary.", "May improve recognition or scoring quality without maintaining signal-processing code.", "Use local pitch analysis, explicit quality warnings, and human review of benchmark recordings.", "Do not integrate until a benchmark proves enough learner benefit to justify privacy review and recurring cost."),
            case("Commercial benchmark speech corpus", "Licensing can require payment or restrictive terms rather than a renewable free tier.", "Provides labeled examples that improve algorithm evaluation.", "Collect a small consent-based local fixture set and use openly licensed data where license terms are clear.", "Defer unless the benchmark cannot represent the tones and noise conditions needed for evaluation."),
        ],
    ),
    area(
        "data-persistence-sync",
        "Data model, persistence, and sync",
        "DP",
        "Give progress, settings, content, sessions, and future accounts a durable local-first data model with a safe path to sync.",
        [
            e("word-schema-versioning", "word schema versioning", "word ids, filenames, metadata, tones, classifiers, and content revisions", "progress survives content edits", "word identity is stable even when filenames or media change", "filename-derived ids are fragile"),
            e("progress-model", "learner progress model", "attempts, mastery, review schedule, mode scores, and session completion", "progress can support adaptive learning", "one documented model names events, aggregates, and retention", "current progress is mostly session-local"),
            e("local-storage-boundary", "local storage boundary", "localStorage, IndexedDB, cache storage, and native storage", "persistent data has a deliberate owner and migration path", "each storage technology has a written use case", "localStorage is limited and synchronous"),
            e("session-state-migration", "session state migration", "settings, mode state, in-progress sessions, and schema versions", "app updates do not lose or corrupt learner state", "migrations are versioned and tested", "unversioned persisted state can break silently"),
            e("backup-export-import", "backup, export, and import", "progress export, settings export, custom decks, and restore", "learners control their data", "a documented file format can export and import local progress", "imported data can be malformed or too large"),
            e("sync-conflict-model", "sync conflict model", "multi-device progress, review schedules, custom decks, and last-write behavior", "future sync has predictable merge behavior", "conflict rules are defined before a backend exists", "syncing events and derived progress can diverge"),
            e("identity-separation", "identity separation", "device identity, learner profile, authentication identity, and analytics identifiers", "the project does not confuse users, devices, and accounts", "one identity model states which identifiers exist and why", "premature account coupling creates privacy and migration problems"),
            e("retention-deletion", "retention and deletion", "progress history, recordings, diagnostic logs, analytics events, and backups", "data does not accumulate without a reason", "retention rules and delete paths exist per data class", "deletion becomes harder once sync exists"),
            e("event-schema", "learning event schema", "attempt, answer, score, timestamp, mode, item version, and session id", "learning analysis uses consistent facts", "events have a versioned schema and privacy notes", "overly detailed events can become sensitive behavioral data"),
            e("database-selection", "database selection for future sync", "local IndexedDB, SQLite, Postgres, object storage, and free-tier managed services", "future backend choices are deliberate", "a decision record compares local-first, self-hosted, and managed options", "managed services can create cost, lock-in, or privacy obligations"),
        ],
        [
            c("localStorage versus IndexedDB", "Use localStorage", "The API is simple; settings and small flags are easy to store", "Storage is synchronous, small, and unsuitable for detailed progress history", "Use IndexedDB", "Structured progress, events, and larger local data fit better", "The API is verbose and needs careful migration and testing", "Use localStorage only for tiny settings and IndexedDB behind `ff_indexeddb_progress` for learning history."),
            c("Event sourcing versus aggregated progress", "Store learning events", "Adaptive learning and analytics can recompute history; sync conflict handling is richer", "Storage and complexity grow; privacy sensitivity increases", "Store only aggregated progress", "Storage stays small; implementation is simple; less behavioral detail exists", "The project loses the evidence needed for review scheduling and diagnosis", "Use `ff_learning_events` for a capped local event log and keep aggregates as derived state."),
            c("Managed sync versus self-hosted sync", "Use managed sync", "Operations are simpler; a free tier may cover early use; authentication may be integrated", "Lock-in, quota exhaustion, and privacy constraints need review", "Self-host sync", "Data control and portability are stronger; costs can be small for a single instance", "Operations, backups, security, and uptime become the maintainer's job", "Do not build sync until a cost-benefit analysis compares at least one renewable-free-tier managed service with a free self-hosted option."),
        ],
        "Start local-first. Neon, Supabase, Firebase, or similar services must be limited to renewable free tiers or undergo cost-benefit analysis.",
    ),
    area(
        "user-experience-visual-design",
        "User experience and visual design",
        "UX",
        "Make the learning loop clear, calm, responsive, and rewarding while reducing mode and control complexity.",
        [
            e("core-loop", "core learning loop clarity", "choose mode, start session, practice, receive feedback, review, and continue", "learners always know the next useful action", "each mode has one primary action and one visible progress signal", "the current interface exposes many controls at once"),
            e("home-discovery", "home and mode discovery", "mode cards, descriptions, prerequisites, and recommended next mode", "new learners can choose a mode without trial and error", "each card explains the skill, time cost, and required input", "too much explanatory copy can clutter the home screen"),
            e("session-controls", "session control consistency", "play, pause, next, retry, record, compare, reveal, and exit", "controls behave consistently across modes", "the same action uses the same position, label, and keyboard behavior", "mode-specific needs may require controlled variation"),
            e("feedback-success-states", "feedback and success states", "correct answers, wrong answers, mastery, retry, completion, and celebration", "feedback is immediate and understandable", "every outcome has visual feedback and a next action", "over-celebrating can interrupt practice"),
            e("empty-error-loading", "empty, error, and loading states", "no search results, missing media, denied microphone, loading words, and failed sessions", "the interface never leaves learners guessing", "each state has copy, cause, and recovery action", "generic error copy does not help recovery"),
            e("responsive-layout", "responsive layout", "desktop grid, tablet, phone, sticky header, and safe areas", "practice works comfortably across screen sizes", "core flows pass a documented breakpoint matrix", "small screens cannot show every control at once"),
            e("visual-hierarchy", "visual hierarchy and typography", "headings, Hanzi, Pinyin, English, metadata, controls, and scores", "the most important learning information stands out", "a type and spacing scale governs learning content", "large Hanzi and Pinyin can crowd cards"),
            e("theme-dark-mode", "theme and dark mode", "colors, contrast, focus states, images, and persistent preference", "learners can use a comfortable theme", "theme switching does not reduce contrast or hide feedback", "dark images and overlays need separate review"),
            e("image-consistency", "image style consistency", "414 word images, aspect ratio, visual complexity, and cultural representation", "images support recognition rather than distract", "an image review checklist covers consistency and learning value", "batch-generated images may vary widely"),
            e("usability-testing", "usability testing loop", "first-use, session completion, mode selection, error recovery, and mobile use", "design decisions come from observed behavior", "a repeatable lightweight test script exists", "recruiting learners may be difficult on a free budget", "mixed"),
        ],
        [
            c("Power-user controls versus simplified defaults", "Expose many controls", "Learners can tune practice deeply; existing functionality remains visible", "Cognitive load rises and primary actions become harder to find", "Use simplified defaults", "The core loop is clearer and new learners start faster", "Advanced learners may feel constrained", "Use `ff_advanced_controls` to hide advanced settings by default while keeping them discoverable."),
            c("Card grid browsing versus guided session-first flow", "Keep card browsing prominent", "Learners can explore all content freely; teachers can inspect material", "Choice can overwhelm new learners and delay practice", "Use guided session-first flow", "Learners enter practice quickly and receive a sequence", "Free exploration becomes less visible", "Use `ff_guided_start` while retaining a browse link in secondary navigation."),
            c("Playful visual design versus minimal study design", "Use playful visuals", "The app feels approachable and rewarding; progress moments can be memorable", "Visual noise can distract from Hanzi, Pinyin, and tone feedback", "Use minimal study visuals", "Attention stays on learning content; accessibility and performance are easier", "The product can feel plain or less motivating", "Use playful motion and illustration only at completion moments behind `ff_celebration_style`."),
        ],
        "Use local design tooling, browser tests, and free user-research methods. Paid participant recruitment or design software needs cost-benefit analysis.",
    ),
    area(
        "onboarding-help-documentation",
        "Onboarding, help, and documentation",
        "OD",
        "Help learners start confidently and help maintainers understand, change, and release the app without reverse engineering it.",
        [
            e("first-run-experience", "first-run experience", "first launch, mode choice, microphone prompt, and first success", "a new learner reaches a useful practice moment quickly", "the first-run path has one measurable completion target", "the current app drops learners into a mode grid"),
            e("mode-explanations", "mode explanations", "mode cards, welcome screens, settings, and examples", "learners know what each mode trains before starting", "every mode has a concise explanation and example", "long explanations can delay practice"),
            e("microphone-onboarding", "microphone onboarding", "permission explanation, test recording, playback, and troubleshooting", "shadowing learners understand recording before a scored session", "the permission flow includes a test and recovery guidance", "browser permission copy cannot be fully controlled"),
            e("contextual-help", "contextual help", "tone filters, mastery threshold, writing target, classifier rules, and audio controls", "help appears where confusion happens", "complex controls have concise inline help", "too many tips can clutter the interface"),
            e("learner-guide", "learner guide and FAQ", "practice methods, tone practice, troubleshooting, privacy, and offline use", "learners can solve common problems without outside help", "the guide answers the top beginner and microphone questions", "documentation can drift from behavior"),
            e("contributor-docs", "contributor documentation", "setup, run, test, content edits, and pull request expectations", "a contributor can make a safe first change", "the README points to exact setup and verification commands", "the current repo mixes root and `magic/` documentation"),
            e("architecture-docs", "architecture documentation", "domain model, mode registry, audio boundary, persistence, and deployment", "maintainers can understand the intended shape before editing", "architecture docs name current and target states separately", "target-state docs can be mistaken for current behavior"),
            e("content-authoring-docs", "content authoring documentation", "word schema, asset rules, licensing, review, and validation", "content contributors can add words safely", "a content guide includes a complete example and validation command", "asset generation may require local tools or credentials"),
            e("release-notes", "release notes and changelog", "learner-visible changes, fixes, migrations, and known issues", "users and maintainers can tell what changed", "each release has concise notes and a version", "the current deployment flow does not require release notes"),
            e("support-feedback", "support and feedback channel", "bug reports, learner feedback, diagnostics, and triage", "problems reach the maintainer with useful context", "a low-cost feedback path explains what information to include", "public feedback channels can create moderation work", "mixed"),
        ],
        [
            c("Guided tutorial versus contextual help", "Use a guided tutorial", "New learners receive a clear path and early success", "Tutorials take design effort and returning learners may skip them", "Use contextual help", "Help appears only when needed and stays out of the core loop", "Learners may miss concepts they do not know to ask about", "Use `ff_first_run_guide` for a short optional tutorial and keep contextual help always available."),
            c("In-app documentation versus external documentation", "Write documentation in the app", "Help is available where the learner needs it and can work offline", "The app bundle grows and documentation UI needs maintenance", "Write documentation in the repository or site", "Docs are easier to review, version, and search", "Learners must leave the app and offline access is weaker", "Keep short help in app and long guides in versioned documentation."),
            c("Public issue tracker versus private feedback form", "Use a public issue tracker", "Duplicates are visible; contributors can discuss fixes; no extra service is needed on GitHub", "Learners may not have GitHub accounts; sensitive details can be exposed publicly", "Use a private feedback form", "Non-technical learners can report problems privately", "A form service may have cost or data-retention constraints; reports need triage", "Start with GitHub issues and a local diagnostic copy action. Evaluate a free-tier form only if learner volume justifies it."),
        ],
        "Use repository documentation and GitHub issues first. Form, support desk, or knowledge-base services need free-tier verification or cost-benefit analysis.",
        cost_cases=[
            case("Hosted support desk", "Support desks often charge per seat after limited free plans or trials.", "Provides triage, private learner messages, and support history.", "Use GitHub issues for public defects and a documented email or local diagnostic flow for private reports.", "Defer until report volume makes manual triage unreliable."),
            case("Hosted form service without a renewable free tier", "Form volume, file uploads, or response exports can move to paid tiers.", "Makes nontechnical feedback easier to submit.", "Use GitHub issues, email, or a form service only after verifying a renewable free tier and data-retention terms.", "Use only if learner feedback volume or accessibility need proves that GitHub is a real barrier."),
        ],
    ),
    area(
        "personalization-adaptive-learning",
        "Personalization and adaptive learning",
        "PZ",
        "Use local learner signals to adjust review, difficulty, pacing, and feedback without compromising privacy.",
        [
            e("learner-profile", "local learner profile", "goals, settings, strengths, weaknesses, devices, and content preferences", "personalization has a clear local data foundation", "one schema separates profile, progress, and preferences", "profile data can become sensitive if overcollected"),
            e("adaptive-difficulty", "adaptive difficulty", "word length, tone complexity, accuracy, attempts, and recent errors", "practice stays challenging without becoming frustrating", "difficulty rules are explicit and testable", "early data is sparse and easy to misread"),
            e("review-queue", "personalized review queue", "due items, failed words, mastery decay, and learner-selected content", "learners know what to review next", "the queue explains why each item is included", "opaque recommendations can erode trust"),
            e("tone-weakness-model", "tone weakness model", "tone-specific scores, confusion patterns, and production feedback", "tone practice targets real weaknesses", "the model separates perception, production, and item difficulty", "small samples can label a learner incorrectly"),
            e("session-pacing", "session length and pacing", "auto-continue, delays, attempt count, fatigue, and session goals", "sessions fit the learner's available time and energy", "pacing settings have sensible defaults and explanations", "too much automation can feel restrictive"),
            e("learning-goals", "learning goals", "daily minutes, words per week, tone mastery, and exam or class targets", "practice connects to a learner-defined outcome", "goals are optional, editable, and visible", "goals can become guilt-driven dark patterns"),
            e("content-preferences", "content preferences", "categories, custom decks, simplified or traditional forms, and audio preference", "learners practice content that matters to them", "preferences affect queues transparently", "preference filters can narrow exposure too much"),
            e("recommendation-explainability", "recommendation explainability", "next mode, next word set, retry suggestions, and review prompts", "learners understand and control adaptation", "recommendations include a reason and a way to override", "recommendations based on weak signals can be wrong"),
            e("adaptive-thresholds", "adaptive scoring thresholds", "mastery threshold, tone tolerance, retries, and item-specific difficulty", "mastery expectations reflect task difficulty fairly", "threshold rules are documented and bounded", "adaptive thresholds can hide inconsistent standards"),
            e("privacy-preserving-personalization", "privacy-preserving personalization", "local inference, data minimization, consent, and export", "personalization does not require behavioral tracking", "all adaptation can run locally with exportable data", "cloud-based personalization conflicts with the cost and privacy rules"),
        ],
        [
            c("Rule-based adaptation versus machine-learned adaptation", "Use rule-based adaptation", "Rules are explainable, testable, local, and cheap", "Rules may miss complex patterns and need manual tuning", "Use machine-learned adaptation", "The model could discover richer patterns with enough data", "Data volume is insufficient; privacy and cost increase; behavior is harder to explain", "Use rule-based adaptation first. Consider machine-learned adaptation only after local data proves rules insufficient."),
            c("Persistent learner profiles versus anonymous sessions", "Use persistent profiles", "Progress, review, and adaptation improve over time", "Retention, deletion, migration, and privacy work increase", "Use anonymous sessions", "Privacy is simple and learners can practice without setup", "Long-term learning value and personalization are limited", "Use local persistence behind `ff_local_profile` with clear export and deletion controls."),
            c("Adaptive sequencing versus learner control", "Let the system choose the next practice", "Weak items get attention; decision fatigue drops", "Learners can feel controlled or confused when recommendations are wrong", "Let learners choose everything", "Control and transparency are high; implementation is simpler", "Learners may avoid difficult material or repeat what is easy", "Use recommendations with visible reasons and one-tap override behind `ff_adaptive_sequence`."),
        ],
        "Run personalization locally. Cloud recommendation or ML services need renewable free-tier verification and a cost-benefit analysis.",
    ),
    area(
        "gamification-motivation",
        "Gamification and motivation",
        "GM",
        "Use progress, goals, and rewards to support consistent practice without manipulative streaks, empty points, or privacy-invasive social mechanics.",
        [
            e("streak-design", "streak design", "daily practice, streak repair, timezone handling, and breaks", "streaks encourage return without punishing normal life", "rules are explicit, forgiving, and local", "fragile streaks can demotivate learners"),
            e("xp-levels", "experience points and levels", "practice effort, mastery, review completion, and mode differences", "progress feels visible across modes", "points map to learning effort rather than empty tapping", "points can reward quantity over learning"),
            e("achievements", "achievements and badges", "tone mastery, classifier milestones, review consistency, and content coverage", "milestones highlight meaningful learning behavior", "each achievement has a clear educational reason", "badge collection can distract from learning"),
            e("daily-goals", "daily goals", "minutes, items, reviews, and flexible targets", "learners can choose a realistic practice commitment", "goals are optional and adaptable", "fixed goals can create guilt or rushed practice"),
            e("progress-visualization", "progress visualization", "mastery map, tone progress, review backlog, and content coverage", "learners can see where they are improving", "charts are accurate, accessible, and explain their inputs", "misleading aggregates can overstate mastery"),
            e("challenge-modes", "challenge modes", "timed review, tone sequences, classifier streaks, and mixed recall", "variety can refresh practice", "challenges reinforce existing learning objectives", "speed pressure can harm accuracy and accessibility"),
            e("reward-feedback", "reward and celebration feedback", "session completion, mastery moments, animations, sounds, and haptics", "success feels satisfying without blocking practice", "rewards are brief, accessible, and configurable", "excess rewards can become noise"),
            e("social-sharing", "social sharing", "shareable progress images, achievements, and referrals", "learners can share progress without exposing private data", "sharing is local, explicit, and content-minimal", "social features can create privacy and moderation costs"),
            e("leaderboards", "leaderboards", "rankings, groups, cheating, privacy, and backend cost", "the project consciously accepts or rejects competitive ranking", "a decision record compares motivational benefit against harm and cost", "leaderboards often need accounts, moderation, and sync"),
            e("motivation-measurement", "motivation impact measurement", "retention, session completion, goal health, and learner sentiment", "gamification is kept only when it helps", "each mechanic has a success metric and removal rule", "retention alone can reward manipulative design"),
        ],
        [
            c("Streaks versus flexible consistency goals", "Use streaks", "They are simple, familiar, and can prompt return", "Broken streaks can demotivate learners and encourage empty practice", "Use flexible consistency goals", "Learners can sustain realistic routines without all-or-nothing failure", "The mechanic is less immediate and may feel less compelling", "Use `ff_flexible_goals` to compare completion and learner sentiment before adopting streaks."),
            c("Points for activity versus points for mastery", "Reward activity", "Every effort counts and implementation is simple", "Learners can farm points without learning", "Reward mastery", "Points align with durable progress", "Mastery is harder to measure and slower to reward", "Use both carefully with mastery weighted higher behind `ff_mastery_points`."),
            c("Leaderboards versus private progress", "Use leaderboards", "Competition may motivate some learners", "They require accounts, sync, moderation, privacy controls, and anti-cheating work", "Use private progress", "The design stays local, inclusive, and low cost", "Learners who enjoy social competition do not get that motivator", "Do not build leaderboards by default. If tested, use an opt-in group feature behind `ff_group_leaderboards` after a cost-benefit analysis."),
        ],
        "Local gamification is free. Accounts, sync, moderation, and social services need free-tier verification or cost-benefit analysis.",
    ),
    area(
        "analytics-product-measurement",
        "Analytics and product measurement",
        "AN",
        "Measure learning outcomes, product usage, reliability, and cost without collecting sensitive learner behavior by default.",
        [
            e("measurement-plan", "measurement plan", "activation, practice completion, learning outcomes, retention, performance, and cost", "analytics answers specific product questions", "every metric has a question, owner, source, and decision it informs", "collecting events before questions creates noise"),
            e("event-taxonomy", "privacy-preserving event taxonomy", "mode starts, completions, errors, feature-flag exposure, and performance", "events are consistent without identifying learners", "the schema excludes raw audio, exact answers, and unnecessary identifiers", "learning events can reveal sensitive behavior patterns"),
            e("local-analytics-prototype", "local analytics prototype", "local counters, session summaries, exportable reports, and no-network operation", "the project can validate useful metrics before choosing a service", "a local report answers the first measurement questions", "local-only data cannot show cohorts across users"),
            e("analytics-service-selection", "analytics service selection", "open-source, self-hosted, and managed analytics options", "service choice is explicit and cost-controlled", "a decision record compares privacy, free-tier renewal, export, and effort", "analytics services can lock in event history", "mixed"),
            e("funnel-instrumentation", "activation and session funnel instrumentation", "first open, mode selection, session start, completion, retry, and return", "drop-off points become visible", "each funnel step has one event and a written definition", "funnels do not explain why users drop off"),
            e("learning-outcome-metrics", "learning outcome metrics", "mastery durability, review recall, tone improvement, and transfer", "the app measures learning rather than only engagement", "at least one outcome metric has a defensible definition", "learning outcomes are slower and harder to measure"),
            e("reliability-metrics", "performance and reliability metrics", "startup, playback failures, recording failures, offline success, and crashes", "technical regressions are visible", "metrics include device class and app version without precise identity", "client telemetry can add cost and privacy risk"),
            e("experimentation-flags", "experimentation and feature flags", "flag exposure, control groups, rollout, and evaluation", "experiments produce evidence instead of opinions", "flag metadata includes owner, hypothesis, metric, and end date", "small user volume may make experiments inconclusive"),
            e("data-governance-consent", "analytics governance and consent", "consent, retention, deletion, export, and data minimization", "measurement respects learner expectations", "a data inventory covers every analytics field and purpose", "consent UX can become complex"),
            e("dashboards-reporting", "dashboards and reporting", "weekly product health, learning outcomes, reliability, and cost", "the maintainer reviews a small set of decision-ready metrics", "one dashboard or report exists with defined review cadence", "dashboards can become unused decoration"),
        ],
        [
            c("Managed analytics versus local-first measurement", "Use managed analytics", "Dashboards and cohort analysis arrive quickly; a free tier may cover early volume", "Behavioral data leaves the device; quotas and retention policies constrain use", "Use local-first measurement", "Privacy is strong; no service is required; metrics can be exported voluntarily", "The maintainer cannot see aggregate product usage automatically", "Validate metrics locally first. Adopt a managed service only behind `ff_remote_analytics` with consent and free-tier verification."),
            c("Detailed event tracking versus coarse metrics", "Track detailed events", "Analysis can answer more questions later", "Privacy risk, storage, schema complexity, and noise increase", "Track coarse metrics", "Data minimization is easier and dashboards stay focused", "Some product questions cannot be answered later", "Start coarse. Add detailed events only when a written question requires them."),
            c("A/B experiments versus sequential rollouts", "Run A/B experiments", "Comparisons are stronger when sample size supports them", "The proof of concept may not have enough users; experimentation infrastructure adds cost", "Use sequential rollouts", "Implementation is simpler and small samples still provide some evidence", "Results are weaker because time and audience changes confound them", "Use feature flags with sequential measurement first. Reserve A/B tooling for questions with enough volume."),
        ],
        "PostHog, Plausible, Umami, or self-hosted options must be compared for renewable free tier, export, privacy, and effort. Paid analytics needs cost-benefit analysis.",
        cost_cases=[
            case("Managed analytics beyond a renewable free tier", "Usage-based event volume or monthly seats can create recurring cost as learners grow.", "Provides dashboards, cohort analysis, funnels, and managed retention.", "Use local metrics, open-source self-hosted analytics, or a verified renewable free tier with strict event minimization.", "Do not exceed the free tier silently. Pay only when a weekly product decision depends on the missing data."),
            case("Paid experimentation platform", "Experimentation tools often charge by traffic, events, or seats.", "Provides assignment, analysis, and experiment governance.", "Use local feature flags and sequential rollout measurement while traffic is low.", "Defer until traffic is large enough for experiments to reach a useful decision."),
        ],
    ),
    area(
        "internationalization-localization",
        "Internationalization and localization",
        "I18",
        "Separate interface language from learning content so the app can serve more learners and support Chinese text correctly.",
        [
            e("string-extraction", "interface string extraction", "mode titles, buttons, settings, feedback, errors, and onboarding copy", "interface copy can be translated without code edits", "all learner-facing strings live in one message catalog", "current strings are embedded in templates and JavaScript"),
            e("locale-framework", "locale framework selection", "Vue i18n or lightweight local message lookup", "the project chooses the smallest capable localization layer", "a decision record compares bundle cost, pluralization, and formatting", "full i18n libraries may exceed proof-of-concept needs"),
            e("interface-language-strategy", "interface language strategy", "English-first UI, Chinese UI, heritage learners, and beginner readability", "the project knows who each interface language serves", "a written strategy names supported locales and fallback order", "Chinese UI for beginners may require simpler copy"),
            e("pluralization-grammar", "pluralization and grammar rules", "counts, classifiers, measure words, and locale-specific sentence structure", "translated strings remain grammatically correct", "message format supports plural and classifier-aware cases", "Chinese classifiers make naive concatenation unsafe"),
            e("input-methods", "input method support", "Pinyin typing, Hanzi input, composition events, keyboards, and autocorrect", "writing practice works with real input methods", "IME composition does not trigger premature answer checks", "browser composition behavior varies"),
            e("font-rendering", "Chinese font rendering", "system fonts, font fallbacks, Pinyin diacritics, and mobile webviews", "Hanzi and tone marks render consistently", "font stacks and rendering checks cover target platforms", "bundled fonts can be large and licensed"),
            e("locale-formatting", "locale-sensitive formatting", "dates, numbers, progress, percentages, and streaks", "displayed values match the learner's locale", "formatting uses platform locale APIs rather than string concatenation", "learning content may need fixed formatting independent of UI locale"),
            e("localization-workflow", "localization workflow", "message extraction, translator review, missing keys, and fallback", "translations can be contributed safely", "missing and stale translations fail or report in CI", "volunteer translation quality needs review", "mixed"),
            e("localized-learning-content", "localized learning content", "English definitions, future native-language hints, examples, and explanations", "learning content can support more than English-speaking learners", "content model separates target language, instruction language, and metadata", "translation quality affects learning directly"),
            e("locale-testing", "locale testing", "pseudo-localization, Chinese text expansion, IME tests, and screen reader behavior", "localization defects are found before release", "locale checks are part of the release matrix", "manual multilingual review requires contributor access"),
        ],
        [
            c("Full i18n library versus lightweight message catalog", "Adopt a full i18n library", "Pluralization, interpolation, and locale utilities are mature", "Bundle size and setup increase for a small app", "Use a lightweight message catalog", "Implementation stays small and local", "Complex pluralization and formatting may need reinvention", "Use a lightweight catalog first behind `ff_i18n_catalog`, and adopt a full library only when requirements prove it."),
            c("English-only interface versus multilingual interface", "Keep English-only interface", "Scope stays small; copy is easier to maintain", "Learners with weaker English face an extra barrier", "Support multilingual interface", "More learners can use the app; instructions become clearer", "Translation, testing, and maintenance increase", "Extract strings first, then add one high-value locale behind `ff_locale_es` or another learner-driven flag."),
            c("Bundled fonts versus system fonts", "Bundle fonts", "Rendering is more consistent across devices", "Font files can be large and licensing must be reviewed", "Use system fonts", "Download size stays low and native rendering is familiar", "Appearance and diacritic rendering vary by platform", "Use system fonts first. Consider a licensed subset font only after measuring rendering defects."),
        ],
        "Use open-source i18n tooling and volunteer review. Translation management services need renewable free-tier verification or cost-benefit analysis.",
        cost_cases=[
            case("Hosted translation management beyond a renewable free tier", "Hosted translation platforms can charge by seats, strings, or projects.", "Provides translator workflow, review history, and machine translation integrations.", "Use versioned message files, pull request review, and volunteer or maintainer review.", "Defer until multilingual contribution volume makes file-based review unmanageable."),
            case("Paid professional translation", "Translation is usually priced per word or project rather than as a renewable free tier.", "Can improve accuracy and learner trust for high-impact interface copy.", "Start with community review and clear glossary rules.", "Consider a small paid review only for core onboarding and safety copy after the first target locale is chosen."),
        ],
    ),
    area(
        "backend-accounts-third-party-services",
        "Backend, accounts, and third-party services",
        "BE",
        "Decide deliberately which capabilities need a server, which can stay local, and how every service respects the free-tier constraint.",
        [
            e("account-necessity", "account necessity decision", "sync, personalization, social features, support, and privacy", "accounts exist only if they unlock clear learner value", "a decision record compares local-first and account-backed designs", "accounts create cost, security, privacy, and support obligations", "mixed"),
            e("auth-provider", "authentication provider selection", "email magic links, OAuth, passkeys, managed auth, and self-hosted auth", "future sign-in is secure and cost-controlled", "a comparison covers renewable free tier, lock-in, privacy, and implementation effort", "client-side static apps cannot keep auth secrets locally", "free-tier"),
            e("managed-database", "managed database selection", "Neon, Supabase, Firebase, SQLite replication, and self-hosted Postgres", "future sync storage has a deliberate home", "a decision record covers free-tier renewal, egress, branching, export, and lock-in", "free tiers can change or become insufficient", "free-tier"),
            e("object-storage", "object storage selection", "media assets, recordings, backups, and user-generated content", "binary data has a cost-controlled storage plan", "a comparison covers free tier, bandwidth, privacy, portability, and retention", "media storage and egress can become the largest cost", "free-tier"),
            e("sync-service", "sync service design", "progress sync, custom decks, conflict resolution, and offline-first behavior", "multi-device learners keep progress without losing local control", "a sync design names data ownership, conflict rules, and failure behavior", "sync is a large distributed-systems feature", "mixed"),
            e("push-notifications", "push notification decision", "practice reminders, review prompts, permission, and platform support", "reminders are useful without becoming intrusive", "a decision record compares local notifications, push services, and email", "push requires service infrastructure and careful consent", "mixed"),
            e("crash-reporting", "crash and error reporting", "browser errors, native crashes, privacy, sampling, and alerting", "the maintainer learns about failures before users abandon", "a comparison covers free tier, data minimization, source maps, and self-hosting", "error reports can contain sensitive context", "free-tier"),
            e("email-support", "email and support service decision", "feedback, account emails, support replies, and transactional mail", "support communication has a low-cost path", "a decision record compares free tiers, deliverability, privacy, and maintenance", "transactional email often becomes paid as volume grows", "free-tier"),
            e("payments-monetization", "payments and monetization analysis", "donations, subscriptions, one-time purchases, app-store rules, and service fees", "sustainability options are understood before building them", "a cost-benefit analysis compares fees, tax work, learner value, and maintenance", "payments are not free even when there is no monthly fee", "paid-analysis"),
            e("cost-governance-exit", "service cost governance and exit plan", "quotas, alerts, renewals, exports, backups, and vendor replacement", "free-tier usage never becomes a surprise bill or lock-in trap", "every service has an owner, quota check, export path, and replacement plan", "service pricing and terms change", "mixed"),
        ],
        [
            c("Managed backend versus local-first architecture", "Use a managed backend", "Sync, accounts, and remote analytics become easier; a free tier may cover early usage", "Privacy, quotas, security, and vendor lock-in become permanent concerns", "Stay local-first", "Cost stays near zero; privacy is strong; offline behavior is natural", "No automatic multi-device sync, remote backup, or aggregate analytics exists", "Keep local-first as default. Add backend slices behind flags such as `ff_sync_backend` only after cost-benefit analysis."),
            c("Integrated platform versus composable services", "Use one integrated platform", "Auth, database, storage, and functions are easier to connect; operational overhead is lower", "Lock-in increases and one quota or outage affects many features", "Use composable services", "Each service can be replaced independently; free tiers can be chosen per capability", "Integration complexity and operational surface increase", "Prefer the smallest number of services. Require an exit plan either way."),
            c("Free-tier dependency versus paid reliability", "Depend on renewable free tiers", "Cost stays low for a proof of concept; experimentation is possible", "Quotas, support limits, and pricing changes create risk", "Pay for reliability", "Higher limits and support may reduce operational surprises", "The project gains recurring cost before learner demand is proven", "Use free tiers for experiments. Write a cost-benefit analysis before depending on any paid tier for a core feature."),
        ],
        "This document owns the cost model. Every service decision must state renewable free-tier terms, expected usage, privacy impact, exit cost, and a free alternative.",
        cost_cases=[
            case("Managed backend beyond a renewable free tier", "Database, auth, storage, bandwidth, and function usage can become recurring monthly cost once free quotas are exhausted.", "Reduces operational work for sync, accounts, backup, and remote progress.", "Keep local-first progress and export files. Use a verified renewable free tier only for the smallest sync slice.", "Pay only when active multi-device learners need sync enough to outweigh privacy work, recurring cost, and lock-in."),
            case("Paid object storage and egress", "Storage may be cheap at first, but bandwidth and media growth can create unpredictable usage cost.", "Provides durable media, backups, and user-generated asset storage.", "Keep immutable lesson media in the static repository or free hosting budget and avoid uploading learner recordings.", "Defer until user-generated media or backups cannot fit the free local and static-hosting path."),
            case("Payment processing", "Processors commonly charge per transaction rather than a monthly renewable free tier. App stores can add their own fees and rules.", "Could support donations, subscriptions, or one-time purchases that fund development.", "Keep the app free during the proof-of-concept stage and use no payment flow.", "Do not build payments until learner demand and a sustainability decision justify fees, tax work, support, and compliance."),
        ],
    ),
    area(
        "developer-experience-ci-release",
        "Developer experience, CI/CD, and release engineering",
        "DX",
        "Make setup, verification, deployment, dependency updates, and releases repeatable enough that maintenance does not depend on memory.",
        [
            e("repo-layout", "repository layout cleanup", "root files, `magic/`, `utils/`, `tmp/`, generated native files, and stale workflows", "the repository structure communicates what belongs where", "each directory has an owner and generated-or-source status", "moving files can break scripts and history"),
            e("package-manager-consistency", "package manager consistency", "`package-lock.json`, `pnpm-lock.yaml`, npm scripts, and Node version", "installs are reproducible", "one package manager and one Node version are documented and enforced", "contributors may use different local tooling"),
            e("verify-command", "unified verification command", "lint, data validation, unit tests, browser tests, build, and mobile checks", "maintainers run one trustworthy command before review", "`npm run verify` has a documented contract", "mobile checks may be too slow for every pull request"),
            e("web-ci", "web CI pipeline", "install, lint, test, build, content validation, and artifact upload", "web regressions are caught on every pull request", "CI uses the same commands as local verification", "GitHub Actions usage must fit the free tier for the repository"),
            e("mobile-ci", "mobile CI pipeline", "Capacitor sync, Android build, iOS build constraints, and signing", "mobile build breakage is visible before release", "Android CI builds from a clean checkout and iOS constraints are documented", "macOS runners and signing can exceed free constraints"),
            e("preview-deployments", "preview deployments", "pull request previews, static hosting, and cleanup", "reviewers can try changes without pulling locally", "every pull request can produce a preview or clear reason none is needed", "public previews expose unreleased content"),
            e("release-process", "release process", "versioning, release notes, web deploy, mobile build, rollback, and post-release checks", "releases become repeatable", "a checklist or automation covers each release step", "the current `deploy.sh` force-pushes generated content"),
            e("dependency-updates", "dependency update process", "npm, Capacitor, GitHub Actions, Python tools, and native dependencies", "updates happen deliberately instead of reactively", "an update cadence and compatibility matrix exist", "automatic updates can break native builds"),
            e("review-ownership", "code review and ownership", "pull request template, ownership rules, review checklist, and generated files", "reviewers know what to inspect and what to skip", "the review process distinguishes source, generated, docs, and data changes", "a solo maintainer still needs checklists rather than mandatory approvals"),
            e("environment-secrets", "environment and secrets management", "`.env`, local development, CI secrets, service credentials, and documentation", "setup is secure and reproducible", "every required variable has an example, owner, scope, and rotation note", "client-side configuration must never carry secrets"),
        ],
        [
            c("Fast deploy script versus reviewed CI deployment", "Keep the direct deploy script", "Deployment is simple and matches the current proof of concept", "Force-pushed generated output bypasses review and can publish untested assets", "Use CI deployment", "Every deploy follows the same verified path and leaves an auditable run", "CI setup takes time and uses Actions minutes", "Keep manual deploy as an emergency path behind documentation, but make CI the default."),
            c("npm versus pnpm", "Use npm", "It is standard, already represented by `package-lock.json`, and requires no extra install", "Installs can be slower and disk use higher", "Use pnpm", "Installs are efficient and monorepo support is strong", "Contributors need another tool and existing lockfiles must migrate", "Choose one package manager and encode it in `packageManager` plus CI rather than documenting both."),
            c("Full mobile CI versus release-only mobile builds", "Run mobile builds on every pull request", "Breakage is caught early", "macOS and Android build time can exceed free or reasonable CI budgets", "Run mobile builds before release", "Routine pull requests stay fast and cheap", "Mobile breakage is discovered later", "Run web checks on every pull request and mobile builds on release candidates or workflow dispatch."),
        ],
        "Use GitHub Actions within the repository's free allowance and local open-source tooling. Paid CI minutes, signing services, or hosted build services need cost-benefit analysis.",
    ),
]

STEP_COUNT = 10
EPIC_COUNT = 10


def step_details(step, epic, area):
    name = epic["name"]
    surface = epic["surface"]
    outcome = epic["outcome"]
    metric = epic["metric"]
    risk = epic["risk"]
    flag = epic["flag"]
    decision_like = any(word in name for word in ("decision", "selection", "analysis"))
    if step == 1:
        return (
            f"Audit {name} in the current proof of concept",
            f"Trace {surface}. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.",
            f"A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.",
            "No runtime change. Use local inspection and notes only.",
        )
    if step == 2:
        return (
            f"Define the outcome and measurement for {name}",
            f"Write the intended result in plain language so that {outcome}. Choose one observable measure based on this target: {metric}.",
            "The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.",
            "No service is required. Measurement design happens locally.",
        )
    if step == 3:
        return (
            f"Design the data and state contract for {name}",
            f"Name the entities, events, states, ownership, validation rules, and migration constraints involved in {surface}. Keep the contract small enough for the proof of concept.",
            "The design makes invalid states hard to represent and names the boundary where external data is validated.",
            "No service is required. Store the contract in local documentation or local configuration.",
        )
    if step == 4:
        if decision_like:
            return (
                f"Evaluate the smallest real option for {name}",
                f"Compare the smallest real implementation or policy choice for {surface}. The evaluation must expose the risk that {risk} and must use the repository cost rule.",
                "The evaluation records the evidence, the rejected option, the cost decision, and whether the default is keep, revise, or discard.",
                "Prefer local evaluation. Use a third-party service only if it has a renewable free tier and the evaluation states the quota assumption.",
            )
        return (
            f"Prototype {name} behind `{flag}`",
            f"Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that {risk}.",
            "The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.",
            "Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.",
        )
    if step == 5:
        if decision_like:
            return (
                f"Write the decision foundation for {name}",
                "Capture the options, constraints, privacy impact, cost screen, evidence gaps, rollback rule, and the smallest safe default. Keep the decision narrow enough to reverse when evidence changes.",
                "The decision foundation is reviewable on its own and separates current behavior from the proposed default.",
                "No third-party service is required.",
            )
        return (
            f"Implement the foundation for {name}",
            "Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.",
            "The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.",
            "No third-party service is required.",
        )
    if step == 6:
        if decision_like:
            return (
                f"Adopt the default decision for {name}",
                f"Write the default decision that moves the area toward this outcome: {outcome}. Name the evidence that would reopen the decision.",
                "The decision states what is adopted, what is rejected, what remains local-first, and what cost-benefit analysis is required before any paid dependency.",
                cost_line(epic),
            )
        return (
            f"Implement the core behavior for {name}",
            f"Implement the minimum complete behavior that moves the area toward this outcome: {outcome}. Keep advanced options out unless they are required for correctness.",
            "The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.",
            cost_line(epic),
        )
    if step == 7:
        if decision_like:
            return (
                f"Document edge cases and failure handling for {name}",
                f"Cover missing evidence, quota exhaustion, service removal, pricing changes, privacy objections, and migration failure where they apply to {surface}.",
                "Each relevant edge case has a fallback, an owner, and a clear rule for returning to the free local path.",
                "Use local analysis. Do not buy testing infrastructure for this task.",
            )
        return (
            f"Add edge states and failure handling for {name}",
            f"Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to {surface}.",
            "Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.",
            "Use local failure simulation. Do not buy testing infrastructure for this task.",
        )
    if step == 8:
        if decision_like:
            return (
                f"Validate the decision for {name} against real constraints",
                "Check the decision against the current app, the cost rule, privacy expectations, and the highest-risk failure path. Use a small real artifact or service-console check when one is available.",
                "The validation names the evidence inspected, passes only when the decision still satisfies the constraints, and records any open assumption.",
                "Use open-source local test tooling and free service consoles. Paid validation infrastructure requires a cost-benefit analysis.",
            )
        return (
            f"Verify {name} with behavior-focused checks",
            "Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.",
            "The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.",
            "Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.",
        )
    if step == 9:
        return (
            f"Document rollout, cost, and operations for {name}",
            f"Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when {name} uses a third-party service.",
            "A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.",
            cost_line(epic),
        )
    return (
        f"Measure and decide the future of {name}",
        f"Compare the observed result with the target from the outcome task: {metric}. Decide whether to keep, revise, narrow, or remove the change.",
        "The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.",
        "Use existing local or free-tier measurement. Do not add analytics only for this review.",
    )


def cost_line(epic):
    if epic["cost"] == "free-tier":
        return "Use only a service with a renewable free tier that covers the expected usage. Verify current terms before adoption and keep a local fallback."
    if epic["cost"] == "paid-analysis":
        return "Assume that no renewable free tier exists until proven otherwise. Write a cost-benefit analysis with monthly cost, learner benefit, free alternative, and exit cost before adoption."
    if epic["cost"] == "mixed":
        return "Prefer the free local path. Any hosted part needs renewable free-tier verification or a cost-benefit analysis before adoption."
    return "Use local files, browser APIs, or open-source tooling. No third-party service is required."


def priority(epic_index, step):
    if epic_index <= 2 and step in (1, 2, 3, 8):
        return "P0"
    if epic_index <= 6 and step in (1, 3, 6, 8):
        return "P1"
    return "P2"


def effort(step):
    if step in (1, 2, 9, 10):
        return "S"
    if step in (3, 4, 7, 8):
        return "M"
    return "L"


def render_task(a, epic, epic_index, step):
    n = (epic_index - 1) * STEP_COUNT + step
    ident = f"{a['prefix']}-{n:03d}"
    title, scope, acceptance, cost = step_details(step, epic, a)
    depends = "None" if step == 1 else f"{a['prefix']}-{n-1:03d}"
    flag = epic["flag"] if step in (4, 6, 10) else "Not applicable unless a conflict section names one."
    return f"""### {ident}. {title}

- Priority: {priority(epic_index, step)}
- Effort: {effort(step)}
- Depends on: {depends}
- Epic: {epic_index:02d}. {epic['name']}
- Why now: {epic['risk']}.
- Scope: {scope}
- Acceptance criteria: {acceptance}
- Cost and service notes: {cost}
- Flag or conflict notes: {flag}
"""


def render_conflicts(a):
    lines = ["## Conflicts and feature-flag strategies", ""]
    for idx, item in enumerate(a["conflicts"], 1):
        lines += [
            f"### Conflict {idx}: {item['title']}",
            "",
            "| Option | Pros | Cons |",
            "|---|---|---|",
            f"| {item['a']} | {item['apros']} | {item['acons']} |",
            f"| {item['b']} | {item['bpros']} | {item['bcons']} |",
            "",
            f"Feature-flag or coexistence plan: {item['flag']}",
            "",
        ]
    return "\n".join(lines)


def render_area(a):
    lines = [
        f"# {a['title']} improvement plan",
        "",
        "## Purpose",
        "",
        a["purpose"],
        "",
        "## Current proof-of-concept signals",
        "",
    ]
    lines += [f"- {fact}" for fact in APP_FACTS]
    lines += [
        "",
        "## Operating constraints",
        "",
        f"- {COST_RULE}",
        "- Do not implement these tasks as one project. Select a small slice, prove it, and review the result before expanding scope.",
        "- Keep learner-facing behavior unchanged unless the task explicitly changes it and the verification covers the change.",
        "- Treat every task as a proposal. Delete or rewrite tasks that stop serving learners or maintainers.",
        "",
        "## How to read the tasks",
        "",
        "The area is grouped into 10 epics. Each epic has 10 tasks that move from evidence, outcome, design, prototype, implementation, edge cases, verification, rollout, and review. This structure keeps the 100 tasks detailed without pretending that every item is equally urgent.",
        "",
        "## Tasks",
        "",
    ]
    for epic_index, epic in enumerate(a["epics"], 1):
        lines += [f"## Epic {epic_index:02d}: {epic['name']}", ""]
        for step in range(1, STEP_COUNT + 1):
            lines.append(render_task(a, epic, epic_index, step))
    lines += [
        render_conflicts(a),
        "## Third-party service cost policy",
        "",
        a["service_focus"],
        "",
        "When a service does not have a renewable free tier, the cost-benefit analysis must include monthly fixed cost, usage-based cost at expected volume, free alternative, learner or maintainer benefit, privacy cost, lock-in cost, exit cost, and the decision deadline. A free trial is not a renewable free tier.",
        "",
    ]
    if a["cost_cases"]:
        lines += [
            "### Cost-benefit analyses for options without a renewable free tier",
            "",
            "| Option | Cost exposure | Benefit | Free alternative | Recommendation |",
            "|---|---|---|---|---|",
        ]
        for item in a["cost_cases"]:
            option = item["option"]
            if item["source"]:
                option = f"[{option}]({item['source']})"
            lines.append(f"| {option} | {item['cost']} | {item['benefit']} | {item['free_alternative']} | {item['verdict']} |")
        lines.append("")
    lines += [
        "## Suggested sequencing",
        "",
        "1. Complete P0 audit, outcome, design, and verification tasks before implementation tasks.",
        "2. Choose at most one epic at a time for implementation.",
        "3. Keep feature flags small, time-bounded, and tied to a measurement task.",
        "4. Revisit this document after each landed slice and delete tasks that no longer earn their place.",
        "",
    ]
    return "\n".join(lines)


def render_index():
    lines = [
        "# Improvement program",
        "",
        "This directory contains a documentation-only improvement program for the Mandarin Learner proof of concept. It does not implement product behavior. It gives future maintainers a detailed menu of small, verifiable changes.",
        "",
        "## Application snapshot",
        "",
    ]
    lines += [f"- {fact}" for fact in APP_FACTS]
    lines += [
        "",
        "## Cost constraint",
        "",
        COST_RULE,
        "",
        "A free trial does not count as a renewable free tier. Pricing and quotas change, so every implementation task must verify current service terms before adoption. Paid app-store distribution, device clouds, cloud speech, analytics, support tooling, and backend services need an explicit cost-benefit analysis when no renewable free tier exists.",
        "",
        "## Areas",
        "",
        "| Area | Tasks | File |",
        "|---|---:|---|",
    ]
    for a in AREAS:
        lines.append(f"| {a['title']} | 100 | [`{a['slug']}.md`](./{a['slug']}.md) |")
    lines += [
        "",
        "## Use",
        "",
        "1. Pick one area and one epic, not one whole document.",
        "2. Start with the audit task, then the outcome and design tasks.",
        "3. Implement only after the verification path is clear.",
        "4. Keep conflicting approaches behind flags when both need real evidence.",
        "5. Update or delete tasks after each landed slice. These documents are plans, not commitments.",
        "",
        "## Regeneration and verification",
        "",
        "The documents are generated by `scripts/generate_improvement_docs.py` so structure and task counts stay consistent. Run these commands from the repository root after editing the generator:",
        "",
        "```bash",
        "python3 scripts/generate_improvement_docs.py",
        "python3 scripts/verify_improvement_docs.py",
        "```",
        "",
    ]
    return "\n".join(lines)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "README.md").write_text(render_index(), encoding="utf-8")
    for a in AREAS:
        (OUT / f"{a['slug']}.md").write_text(render_area(a), encoding="utf-8")
    print(f"generated {len(AREAS)} area documents plus README in {OUT}")


if __name__ == "__main__":
    main()
