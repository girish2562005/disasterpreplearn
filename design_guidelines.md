# DisasterPrep Learn - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from educational platforms like Khan Academy and Duolingo, combined with emergency preparedness aesthetics. This utility-focused application prioritizes clear information hierarchy, progress visualization, and accessibility for crisis learning scenarios.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Brand Primary: 220 85% 35% (Deep emergency blue)
- Success: 142 76% 36% (Safety green)
- Warning: 25 95% 53% (Alert orange)
- Danger: 0 84% 60% (Emergency red)

**Dark Mode:**
- Background: 220 13% 18%
- Surface: 220 13% 22%
- Text Primary: 220 9% 95%

**Light Mode:**
- Background: 220 14% 96%
- Surface: 0 0% 100%
- Text Primary: 220 9% 15%

### B. Typography
**Primary Font:** Inter (Google Fonts)
- Headers: 600-700 weight for authority and clarity
- Body: 400-500 weight for readability
- Interface: 500 weight for buttons and navigation

**Secondary Font:** JetBrains Mono for code snippets and emergency protocols

### C. Layout System
**Spacing System:** Tailwind units of 2, 4, 6, 8, 12, 16
- Compact spacing (p-2, m-4) for dense information areas
- Generous spacing (p-8, m-12) for learning content sections
- Extra spacing (p-16) for hero sections and major content breaks

### D. Component Library

**Navigation:**
- Clean sidebar navigation with role-based menu items
- Progress breadcrumbs showing module completion
- Emergency-style alerts for important notifications

**Learning Components:**
- Module cards with progress rings and completion badges
- Interactive quiz containers with clear question/answer layouts
- Scenario choice panels with visual decision trees
- Achievement badges with emergency service iconography

**Dashboards:**
- Clean data tables for admin/teacher views
- Progress visualization with clear completion percentages
- Student analytics with safety-themed charts and graphs

**Forms:**
- Consistent form styling with clear validation states
- Emergency contact forms with priority field highlighting
- Assessment forms with immediate feedback styling

### E. Visual Treatment

**Interactive Elements:**
- Subtle hover states maintaining accessibility
- Clear focus indicators for keyboard navigation
- Emergency-appropriate button styling (solid primaries for critical actions)

**Progress Visualization:**
- Achievement levels styled as emergency preparedness badges
- Progress bars with safety-themed color coding
- Module completion with checkpoint metaphors

**Content Presentation:**
- Theory modules in clean, scannable layouts
- Emergency procedures in step-by-step card formats
- Interactive scenarios with choice-driven branching layouts

## Images Section

**Hero Image:** Large hero image (full viewport height) showing diverse students engaged in emergency preparedness training - bright, encouraging, and professional.

**Module Images:** Smaller supporting images for each disaster/emergency type:
- Earthquake safety demonstrations
- CPR training scenarios
- First aid kit preparations
- Natural disaster preparedness scenes

**Achievement Graphics:** Icon-based achievement badges representing different emergency preparedness milestones, avoiding photographic content for these elements.

**Background Elements:** Subtle geometric patterns or gradients that don't interfere with content readability, maintaining the serious yet approachable tone of emergency education.

## Key Design Principles
1. **Clarity First:** Information hierarchy supports rapid understanding during emergency learning
2. **Progress Motivation:** Visual progress indicators encourage continued learning
3. **Accessibility:** High contrast ratios and clear typography for all ability levels
4. **Trust Building:** Professional aesthetic that conveys reliability and expertise
5. **Responsive Learning:** Adaptive layouts that work across all devices for emergency access