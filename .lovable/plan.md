

## Plan: Change Price from ₹4,499 to ₹7,799 Across All Pages

### Files to Update (13 files total)

Every instance of `4,499` or `4499` will be replaced with `7,799` or `7799` respectively.

| File | Occurrences | Type |
|------|-------------|------|
| `index.html` | 2 | Meta description + OG description |
| `src/pages/StressAnxietyPage.tsx` | 2 | Meta description + price prop |
| `src/pages/DepressionPage.tsx` | 2 | Meta description + price prop |
| `src/pages/WorkplacePage.tsx` | 2 | Meta description + price prop |
| `src/pages/RelationshipsPage.tsx` | 2 | Meta description + price prop |
| `src/components/PricingSection.tsx` | 2 | Description text + price display |
| `src/components/CTASection.tsx` | 2 | Button text (desktop + mobile) |
| `src/components/HeroSection.tsx` | ~2 | Value proposition display |
| `src/components/LeadCaptureForm.tsx` | 4 | Analytics value, heading text, price display |
| `src/components/DailyJourneySection.tsx` | 1 | Button text |
| `src/components/JourneysSection.tsx` | 2 | Button text (desktop + mobile) |
| `src/components/DoctorBookingSection.tsx` | 2 | Button text (desktop + mobile) |
| `src/components/TestimonialsSection.tsx` | 1 | Testimonial quote text |

### Approach
Simple find-and-replace: `₹4,499` → `₹7,799` and `'4499'` → `'7799'` (for analytics values). No structural changes needed.

