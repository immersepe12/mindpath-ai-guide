# Codebase Audit Report — MindPath AI Guide (MindTalk)

**Generated:** 2026-03-27
**Stack:** Vite + React 18 + TypeScript + Tailwind CSS + shadcn/ui + Supabase + react-router-dom

---

## 1. PAGES

| Route | File | Renders |
|-------|------|---------|
| `/` | `src/pages/Index.tsx` | Main landing page — Navigation, StickyMobileCTA, WhatsAppFloating, HeroSection, LeadCaptureForm, DoctorBookingSection, ThreePillarsSection, JournalingFeatureSection, AISection, DailyJourneySection, TherapySessionHighlight, JourneysSection, IntegrationFlowSection, PricingSection, TestimonialsSection, CTASection, LeadDebugger |
| `/home` | `src/pages/HomePage.tsx` | Redesigned homepage — HomeNavigation, HomeHero, TrustStrip, HowItWorks, FeaturesGrid, JourneysSpotlight, DeepAgentSection, ProfessionalSupport, ComparisonSection, PrivacySafety, HomeTestimonials, HomeFAQ, FinalCTA, HomeFooter. Includes `<Helmet>` with SEO meta, OG tags, canonical URL, and FAQ structured data (JSON-LD). |
| `/app` | `src/pages/AppShowcase.tsx` | App showcase — Navigation, AppHeroSection, InteractiveAppShowcase, JourneyRoadmapPreview, IntegrationFlowSection, AppFeaturesGrid, TestimonialsSection, CTASection, WhatsAppFloating, StickyMobileCTA. Includes `<Helmet>` with SEO meta. |
| `/stress-anxiety` | `src/pages/StressAnxietyPage.tsx` | Package page (Stress & Anxiety) — Navigation, StickyMobileCTA, PackageHeroSection (Zap icon, blue-to-purple gradient, ₹7,799), LeadCaptureForm, DailyJourneySection, TherapySessionHighlight, AISection, PricingSection, TestimonialsSection, CTASection. Includes `<Helmet>`. |
| `/depression` | `src/pages/DepressionPage.tsx` | Package page (Depression) — Same structure as StressAnxietyPage with Heart icon, pink-to-red gradient, ₹7,799. Includes `<Helmet>`. |
| `/relationships` | `src/pages/RelationshipsPage.tsx` | Package page (Relationships & Family) — Same structure with Users icon, green-to-emerald gradient, ₹7,799. Includes `<Helmet>`. |
| `/workplace` | `src/pages/WorkplacePage.tsx` | Package page (Workplace Burnout) — Same structure with Briefcase icon, orange-to-amber gradient, ₹7,799. Includes `<Helmet>`. |
| `/assessment` | `src/pages/AssessmentPage.tsx` | Assessment landing — Navigation, StickyMobileCTA, WhatsAppFloating, AssessmentHeroSection, AssessmentsGrid, AssessmentHowItWorks, AssessmentBenefits, LeadCaptureForm, CTASection. Includes `<Helmet>`. **Note:** canonical URL uses placeholder `https://yourdomain.com/assessment`. |
| `/thank-you` | `src/pages/ThankYou.tsx` | Post-conversion thank you — success icon, next steps (Account Setup → Initial Assessment → First Session), contact info (phone, email), Dr. Riya introduction, back-to-home link, LeadDebugger. Uses `useEffect` to fire GTM conversion events and stores visit data in localStorage. |
| `*` (catch-all) | `src/pages/NotFound.tsx` | 404 page — "Oops! Page not found" with link to home. Uses `useEffect` to log 404 error. |

---

## 2. COMPONENTS

### Core Components (src/components/)

| Component | useState | useEffect | Hardcoded Copy (>8 words) | Props |
|-----------|----------|-----------|---------------------------|-------|
| **Navigation** | Yes (`isOpen`, `activeSection`) | Yes (scroll listener) | No (short labels) | None |
| **HeroSection** | No | No | Yes: "Your Complete 90-Day Recovery Journey", "Transform your mental health with AI-powered journaling, 24/7 DeepAgent support…", "Experience the world's first integrated mental health ecosystem…" | None |
| **LeadCaptureForm** | Yes (`isSubmitting`) | No | Yes: "Start Your 90-Day Journey Today", "Get instant access to our comprehensive mental health program…", "Complete program for just ₹7,799", "By submitting, you agree to our Terms of Service…" | None |
| **LeadDebugger** | Yes (`debugEntries`, `isVisible`) | Yes (load debug data) | No | None |
| **StickyMobileCTA** | Yes (`isVisible`) | Yes (scroll listener) | No | None |
| **WhatsAppFloating** | Yes (`isVisible`) | Yes (scroll listener) | No (hardcoded phone: `918197268789`, message: "I am interested in Cadabam's mindtalk Packages") | None |
| **AISection** | No | No | Yes: "Meet Dr. Riya - Your 24/7 DeepAgent Companion", "Powered by advanced DeepAgent AI that remembers your journal entries…", multiple card descriptions | None |
| **CTASection** | No | No | Yes: "Your 90-Day Mental Health Journey Starts Today", "Don't wait for tomorrow. Take the first step…" | None |
| **PricingSection** | No | No | Yes: "Traditional therapy costs ₹1,250-1,500 per session…", "Not satisfied with your progress? Get a full refund…" | None |
| **TestimonialsSection** | No | No | Yes: 3 testimonial texts, "Join thousands who have transformed their mental health…", "Join 10,000+ people who have successfully completed…" | None |
| **PackageHeroSection** | No | No | No (all from props) | `title: string`, `subtitle: string`, `description: string`, `icon: LucideIcon`, `gradient: string`, `features: string[]`, `price: string`, `heroImage?: string` |
| **DoctorBookingSection** | No | No | Yes: "Expert Therapists in Your 90-Day Journey", "Your program includes 12 sessions…", doctor names/specializations | None |
| **ThreePillarsSection** | No | No | Yes: "Three Powerful Tools, One Healing Journey", descriptions in pillar data | None |
| **JournalingFeatureSection** | No | No | Yes: "AI-Powered Mental Health Journal", "Transform scattered thoughts into structured healing…", multiple feature descriptions | None |
| **DailyJourneySection** | No | No | Yes: "Experience Your Daily Journey", "See exactly how your 90-day recovery unfolds…", task titles/descriptions | None |
| **JourneysSection** | No | No | Yes: "Choose Your 90-Day Recovery Path", journey descriptions, feature lists | None |
| **IntegrationFlowSection** | No | No | Yes: "Everything Works Together", "Your journal feeds Dr. Riya insights…", step descriptions | None |
| **TherapySessionHighlight** | No | No | Yes: "Talk to Your Dedicated Therapist", "12 Personalized Sessions Over 90 Days", therapy schedule data | `variant?: 'journeys' \| 'daily'` |
| **AppHeroSection** | No | No | Yes: "Your Complete Mental Health Platform", "AI-powered journaling, 24/7 DeepAgent support…" | None |
| **InteractiveAppShowcase** | Yes (`activeTab`, `isAutoPlaying`) | Yes (auto-play interval) | Yes: Tab descriptions, mock screen text | None |
| **JourneyRoadmapPreview** | Yes (`expandedDay`) | No | Yes: "Your Guided Roadmap", "Follow a structured path designed by mental health experts…", task titles | None |
| **AppFeaturesGrid** | No | No | Yes: "Comprehensive Mental Health Tools", feature descriptions | None |
| **AppShowcaseSection** | No | No | Yes: "Everything You Need in One App", feature descriptions | None |
| **AssessmentHeroSection** | No | No | Yes: "Understand Your Mental Health in Minutes", "Free Professional Assessments…", "Take our evidence-based mental health screenings…" | None |
| **AssessmentsGrid** | No | No | Yes: assessment titles/descriptions, "Choose Your Assessment", disclaimer text | None |
| **AssessmentHowItWorks** | No | No | Yes: "How It Works", step descriptions | None |
| **AssessmentBenefits** | No | No | Yes: "Why Take Our Assessments?", benefit descriptions | None |

### Home Components (src/components/home/)

| Component | useState | useEffect | Hardcoded Copy (>8 words) | Props |
|-----------|----------|-----------|---------------------------|-------|
| **HomeNavigation** | Yes (`isScrolled`, `isOpen`) | Yes (scroll listener) | No | None |
| **HomeHero** | No | No | Yes: "A safe space to understand what you're feeling…", "Follow 3-4 minute daily micro-tasks…" | None |
| **TrustStrip** | No | No | Yes: "Assessments, tools, and structured journeys…" | None |
| **HowItWorks** | No | No | Yes: "A simple path from confusion to clarity" | None |
| **FeaturesGrid** | No | No | Yes: "Tools to support your mental health journey" | None |
| **JourneysSpotlight** | No | No | No | None |
| **DeepAgentSection** | No | No | Yes: "A Guide That Remembers Your Journey", "Supportive guidance -- not a replacement…" | None |
| **ProfessionalSupport** | No | No | Yes: "Arrive prepared, stay consistent between visits" | None |
| **ComparisonSection** | No | No | No | None |
| **PrivacySafety** | No | No | Yes: "In crisis? Contact local emergency services immediately." | None |
| **HomeTestimonials** | No | No | Yes: testimonial texts, "Real experiences from MindTalk users" | None |
| **HomeFAQ** | No | No | Yes: FAQ questions and answer texts | None |
| **FinalCTA** | No | No | Yes: "Download MindTalk. See what 3 minutes a day can do." | None |
| **HomeFooter** | No | No | No | None |

### UI Library (src/components/ui/) — shadcn/ui primitives

50 files. All are standard shadcn/ui wrappers. Notable custom one:

| Component | Notes |
|-----------|-------|
| **button-variants.tsx** | Custom `MindTalkButton` with variants: `hero`, `journey`, `ai`, `outline`, `ghost`. Sizes: `hero`, `default`, `sm`, `lg`, `icon`. |
| **use-toast.ts** | Toast state management hook (useState) |

### Hooks (src/hooks/)

| Hook | useState | useEffect |
|------|----------|-----------|
| **use-mobile.tsx** (`useIsMobile`) | Yes | Yes (matchMedia listener) |
| **use-toast.ts** | Yes | No |

### Utilities (src/utils/)

| File | Export | Description |
|------|--------|-------------|
| `scrollToForm.ts` | `scrollToForm()` | Scrolls to `#lead-form` element smoothly |
| `scrollToSection.ts` | `scrollToSection(sectionId)` | Scrolls to any section ID with 80px navbar offset |

### Lib (src/lib/)

| File | Export | Description |
|------|--------|-------------|
| `utils.ts` | `cn(...inputs)` | Tailwind class merge utility (clsx + twMerge) |

---

## 3. API CALLS

### Supabase (via `@supabase/supabase-js`)

**Client:** `src/integrations/supabase/client.ts`

| Location | Operation | Table | Data Shape |
|----------|-----------|-------|------------|
| `LeadCaptureForm.tsx:123` | `supabase.from('leads').insert({...})` | `leads` | `{ submission_id, first_name, email, mobile, lead_source, current_page, full_url, form_source_custom, utm_source, utm_medium, utm_campaign, utm_content, utm_term, user_agent, program }` |
| `LeadCaptureForm.tsx:284` | `supabase.from('leads').update({...}).eq('submission_id', submissionId)` | `leads` | `{ freshworks_success, freshworks_method, freshworks_error }` |

### Freshworks CRM (via `window.fw` / `window.fwcrm`)

| Location | Method | Data Shape |
|----------|--------|------------|
| `LeadCaptureForm.tsx:178` | `window.fw.createLead({...})` | `{ first_name, email, mobile_number, lead_source, cf_form_source_custom }` |
| `LeadCaptureForm.tsx:199` | `window.fwcrm.set({...})` | `{ Email, "First Name", Mobile, "Lead Source", "Form Source Custom" }` |

### GTM DataLayer (via `window.dataLayer`)

| Location | Event | Data Shape |
|----------|-------|------------|
| `LeadCaptureForm.tsx:317` | `form_submit_success` | `{ event, form_type, lead_source, email, submission_id, database_success, freshworks_success }` |
| `ThankYou.tsx:74` | `conversion_complete` | `{ event, conversion_type, lead_source, email, program, conversion_value, currency, page }` |

### External URLs (opened via `window.open`)

| URL | Used In |
|-----|---------|
| `https://link-to.app/TMoa8H6NOL` | HeroSection, CTASection, StickyMobileCTA, AppHeroSection, AssessmentHeroSection, HomeHero, HomeNavigation, FinalCTA |
| `https://wa.me/918197268789?text=...` | WhatsAppFloating |
| `https://example.com/ios` | FinalCTA (placeholder) |
| `https://example.com/android` | FinalCTA (placeholder) |

**Note:** No `fetch()` or `axios` calls exist. All API interaction is through Supabase client and injected third-party scripts (Freshworks, GTM).

---

## 4. ENV VARS

| Variable | File | Usage |
|----------|------|-------|
| `import.meta.env.VITE_SUPABASE_URL` | `src/integrations/supabase/client.ts:5` | Supabase project URL |
| `import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY` | `src/integrations/supabase/client.ts:6` | Supabase anon/public key |

**Total:** 2 env vars. Both used only in the Supabase client initialization.

---

## 5. ROUTER

### Routes (defined in `src/App.tsx`)

| Path | Element | Type |
|------|---------|------|
| `/` | `<Index />` | Exact |
| `/home` | `<HomePage />` | Exact |
| `/app` | `<AppShowcase />` | Exact |
| `/stress-anxiety` | `<StressAnxietyPage />` | Exact |
| `/depression` | `<DepressionPage />` | Exact |
| `/relationships` | `<RelationshipsPage />` | Exact |
| `/workplace` | `<WorkplacePage />` | Exact |
| `/assessment` | `<AssessmentPage />` | Exact |
| `/thank-you` | `<ThankYou />` | Exact |
| `*` | `<NotFound />` | Catch-all |

### Links / Navigation

| Component | Target | Mechanism |
|-----------|--------|-----------|
| `ThankYou.tsx` | `/` | `<Link to="/">` (react-router) |
| `JourneysSection.tsx` | `/stress-anxiety`, `/depression`, `/relationships`, `/workplace` | `<Link to={journey.link}>` |
| `AssessmentsGrid.tsx` | `/stress-anxiety`, `/depression`, `/workplace`, `/relationships`, `/` | `window.location.href` |
| `Navigation.tsx` | `/assessment` | `window.location.href` (type: "route") |
| `Navigation.tsx` | Sections: `hero`, `daily-journey`, `ai-section`, `journeys`, `doctor-booking`, `pricing`, `testimonials` | `scrollToSection()` |
| `HomeNavigation.tsx` | `/home` | `<a href="/home">` |
| `HomeNavigation.tsx` | `#features`, `#journeys`, `#ai-support`, `#community`, `#faq` | Hash anchors |
| `HomeFooter.tsx` | `#` (placeholders) | `<a href="#">` for Privacy Policy, Terms, Contact |
| `NotFound.tsx` | `/` | `<a href="/">` |

---

## 6. ASSETS

### Images in `src/assets/` (imported in components)

| File | Used In | As |
|------|---------|-----|
| `src/assets/doctor-madan.jpg` | `DoctorBookingSection.tsx` | Doctor photo |
| `src/assets/doctor-palash.jpg` | `DoctorBookingSection.tsx` | Doctor photo |
| `src/assets/doctor-avani.jpg` | `DoctorBookingSection.tsx` | Doctor photo |

### Images in `public/` (referenced by URL path)

| File | Used In | As |
|------|---------|-----|
| `public/lovable-uploads/0a99fb1e-f879-44b2-bb75-a5250bb2c95a.png` | `Navigation.tsx` (desktop logo + mobile sheet logo), `AppHeroSection.tsx` (hero logo) | Cadabams MindTalk logo (full color) |
| `public/lovable-uploads/376b91f1-8c27-402b-93e5-a13e20bd13ed.png` | `Navigation.tsx` (mobile logo) | Cadabams MindTalk logo (mobile/light variant) |
| `public/lovable-uploads/848a7388-361c-46c2-b31c-c02f1f5ce9e0.png` | `HeroSection.tsx`, `PackageHeroSection.tsx` | Large Cadabams MindTalk hero logo |
| `public/lovable-uploads/7f7faad5-6bc2-438c-a3d3-b4d7fd617b42.png` | Not referenced in any component | **Unused** |
| `public/lovable-uploads/9fc56fae-65b1-47d5-a395-30bc7c73d5b1.png` | Not referenced in any component | **Unused** |
| `public/lovable-uploads/c18bea42-9112-43b0-be69-71c36a6d2910.png` | Not referenced in any component | **Unused** |
| `public/placeholder.svg` | Not referenced in any component | **Unused** |
| `public/favicon.ico` | Referenced in `index.html` (not in src/) | Favicon |
| `public/robots.txt` | Web crawler config | N/A |

### Unused Assets Summary

3 images in `public/lovable-uploads/` and `public/placeholder.svg` are **not referenced** by any component in `src/`.

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| Total pages/routes | 10 (9 named + 1 catch-all) |
| Custom components (non-UI) | 41 (27 core + 14 home) |
| UI library components (shadcn) | 50 |
| Components with useState/useEffect | 10 |
| Components with hardcoded copy (>8 words) | ~30 |
| Components accepting props | 2 (PackageHeroSection, TherapySessionHighlight) |
| API integrations | 3 (Supabase, Freshworks CRM, GTM) |
| Supabase tables | 1 (`leads`) |
| Environment variables | 2 (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`) |
| Image assets (used) | 6 (3 in src/assets, 3 in public/) |
| Image assets (unused) | 4 |
| External links | 4 unique URLs |
