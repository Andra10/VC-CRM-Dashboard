export type CompanyProfile = {
  id: string
  company: string
  founder: string
  pitch: string
  value: string
  source: string
  avatar: string
  url?: string
  flags?: { red: number; green: number }
  socialNetworks?: { linkedin?: string; twitter?: string; website?: string }
  founders?: Array<{ name: string; role: string; email?: string; phone?: string }>
  products?: string[]
  competitors?: string[]
  industry?: string
  category?: string
  lastUpdate?: string
}

export type ValidationFlag = {
  type: "red" | "green" | "neutral"
  title: string
  description: string
  details: string
  severity?: "high" | "medium" | "low"
  confidenceScore?: number
}

export function generateValidationFlags(company: CompanyProfile): ValidationFlag[] {
  const flags: ValidationFlag[] = []
  const pitch = (company.pitch || "").toLowerCase()

  // Company-specific logic – max 3 red and 3 green per company
  const pushCapped = (arr: ValidationFlag[], flag: ValidationFlag, cap: number, type: "red" | "green") => {
    if (arr.filter((f) => f.type === type).length < cap) arr.push(flag)
  }

  // RED FLAGS
  if (company.company === "TechFlow AI") {
    if (pitch.includes("10x") && pitch.includes("revolutionary")) {
      pushCapped(flags, {
        type: "red",
        title: "Unrealistic Growth Claims",
        description: "Claims about '10x return' without supporting data",
        details: "Email: 'We're confident this will be a 10x return for investors'",
        severity: "high",
      }, 3, "red")
    }
    if (pitch.includes("1% of a $50b market")) {
      pushCapped(flags, {
        type: "red",
        title: "Unrealistic Market Assumption",
        description: "Capturing 1% of $50B market without go-to-market detail",
        details: "Email: 'capturing just 1% of a $50B market'",
        severity: "high",
      }, 3, "red")
    }
    if (company.source === "Cold Outreach") {
      pushCapped(flags, {
        type: "red",
        title: "Cold Outreach",
        description: "Single unsolicited email with no independent validation",
        details: "Source: Cold outreach; no referenced customers or documents attached",
        severity: "medium",
      }, 3, "red")
    }
  }

  if (company.company === "GreenTech Solutions") {
    if (pitch.includes("external market conditions have been challenging")) {
      pushCapped(flags, {
        type: "red",
        title: "External Blame Attribution",
        description: "Blames environment rather than outlining mitigation",
        details: "Email: 'The external market conditions have been challenging'",
        severity: "medium",
      }, 3, "red")
    }
    if (pitch.includes("just me as the founder")) {
      pushCapped(flags, {
        type: "red",
        title: "Single Founder Risk",
        description: "Execution risk with solo founder at pre-seed",
        details: "Email: 'just me as the founder working on this'",
        severity: "medium",
      }, 3, "red")
    }
    if (company.source === "Cold Outreach") {
      pushCapped(flags, {
        type: "red",
        title: "Cold Outreach",
        description: "Unsolicited approach without attachments",
        details: "Source: Cold outreach",
        severity: "low",
      }, 3, "red")
    }
  }

  if (company.company === "HealthSync") {
    if (pitch.includes("truly revolutionary") && pitch.includes("incredible traction")) {
      pushCapped(flags, {
        type: "red",
        title: "Vague Traction Claim",
        description: "Uses superlatives without precise KPIs",
        details: "Email: 'truly revolutionary' / 'incredible traction'",
        severity: "medium",
      }, 3, "red")
    }
    if (pitch.includes("$50b+ opportunity")) {
      pushCapped(flags, {
        type: "red",
        title: "Market Size Assertion",
        description: "Large TAM cited with no penetration plan",
        details: "Email: '$50B+ opportunity'",
        severity: "medium",
      }, 3, "red")
    }
    if (pitch.includes("years ahead of competitors")) {
      pushCapped(flags, {
        type: "red",
        title: "Unsubstantiated Edge",
        description: "Competitive lead claimed without evidence",
        details: "Email: 'years ahead of competitors'",
        severity: "low",
      }, 3, "red")
    }
  }

  if (company.company === "FinanceBot") {
    if (pitch.includes("absolutely revolutionary") && pitch.includes("10x return")) {
      pushCapped(flags, {
        type: "red",
        title: "Unrealistic Growth Claims",
        description: "10x outcome promised with no financials",
        details: "Email: 'absolutely revolutionary' / '10x return'",
        severity: "high",
      }, 3, "red")
    }
    if (pitch.includes("external market conditions have been challenging")) {
      pushCapped(flags, {
        type: "red",
        title: "External Blame Attribution",
        description: "Macro cited without internal mitigation",
        details: "Email: 'external market conditions have been challenging'",
        severity: "medium",
      }, 3, "red")
    }
    if (pitch.includes("$50b+ opportunity")) {
      pushCapped(flags, {
        type: "red",
        title: "Market Size Assertion",
        description: "Large TAM referenced without GTM detail",
        details: "Email: '$50B+ opportunity'",
        severity: "low",
      }, 3, "red")
    }
  }

  if (company.company === "EduPlatform") {
    if (pitch.includes("$50b+ opportunity")) {
      pushCapped(flags, {
        type: "red",
        title: "Market Size Assertion",
        description: "Large TAM cited; penetration path unclear",
        details: "Email: '$50B+ opportunity'",
        severity: "medium",
      }, 3, "red")
    }
    if (pitch.includes("years ahead of competitors")) {
      pushCapped(flags, {
        type: "red",
        title: "Unsubstantiated Edge",
        description: "Claims tech leadership without benchmarks",
        details: "Email: 'years ahead of competitors'",
        severity: "low",
      }, 3, "red")
    }
    if (pitch.includes("external market conditions have been challenging")) {
      pushCapped(flags, {
        type: "red",
        title: "External Blame Attribution",
        description: "Macro cited without internal mitigation",
        details: "Email: 'external market conditions have been challenging'",
        severity: "low",
      }, 3, "red")
    }
  }

  // GREEN FLAGS
  if (pitch.includes("evolutionary prototype") && (pitch.includes("over a year") || pitch.includes("for over a year"))) {
    pushCapped(flags, {
      type: "green",
      title: "Sustained Technical Progress",
      description: "Working prototype under development for ~1 year",
      details: "Email: 'working/evolutionary prototype for over a year'",
      severity: "high",
    }, 3, "green")
  }

  if (pitch.includes("founders are siblings")) {
    pushCapped(flags, {
      type: "green",
      title: "Strong Team Cohesion",
      description: "Sibling founders suggest high trust and resilience",
      details: "Email: 'Founders are siblings collaborating'",
      severity: "medium",
    }, 3, "green")
  }

  if (pitch.includes("executive summary") || pitch.includes("additional documents")) {
    pushCapped(flags, {
      type: "green",
      title: "Proactive Communication",
      description: "Provides executive summary / documents before meeting",
      details: "Email: 'send executive summary and additional documents'",
      severity: "medium",
    }, 3, "green")
  }

  if (company.company === "HealthSync" && pitch.includes("50,000 patients")) {
    pushCapped(flags, {
      type: "green",
      title: "Customer Traction",
      description: "Reported >50k patients across 12 states",
      details: "Email: 'over 50,000 patients across 12 states'",
      severity: "high",
    }, 3, "green")
  }

  // Overall recommendation (neutral) & confidence based on balance
  const redCount = flags.filter((f) => f.type === "red").length
  const greenCount = flags.filter((f) => f.type === "green").length
  const confidence = greenCount > redCount ? 0.67 : redCount > greenCount ? 0.2 : 0.5
  flags.push({
    type: "neutral",
    title: "Overall Recommendation",
    description: greenCount > redCount ? "Moderate Confidence" : redCount > greenCount ? "Further Diligence Required" : "Needs Additional Information",
    details:
      greenCount > redCount
        ? "Strong execution signals; request business/financial detail to raise confidence."
        : redCount > greenCount
        ? "Mixed signals; request evidence and documents before next step."
        : "Balanced signals; obtain market, financial and GTM clarity.",
    confidenceScore: confidence,
  })

  return flags
}


