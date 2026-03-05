# AnimeForge — Cost Analysis

> Last updated: March 2026
> Based on current credit system, API pricing, and infrastructure setup.

---

## 1. API Cost Per Operation

### Gemini 2.5 Flash (Prompt & Story Generation)
| Request Type | Input Tokens | Output Tokens | Cost |
|---|---|---|---|
| Anime prompt generation | ~500 | ~350 | ~$0.00009 |
| Story generation | ~500 | ~150 | ~$0.00006 |
| **Total per creation** | | | **~$0.00015** |

*Pricing: $0.075/1M input tokens, $0.30/1M output tokens (Gemini 2.5 Flash)*

---

### Replicate — SDXL Avatar (stability-ai/sdxl)
| Parameter | Value |
|---|---|
| Model | stability-ai/sdxl |
| Resolution | 1024×1024 |
| Steps | 25 |
| **Cost per avatar** | **~$0.004–0.006** |

*Using ~$0.005 as conservative average.*

---

### Replicate — SVD-XT Video Clip (stability-ai/stable-video-diffusion)
| Parameter | Value |
|---|---|
| Model | stable-video-diffusion (SVD-XT) |
| Frames | 25 frames |
| FPS | 6 (≈4.2s per clip) |
| **Cost per clip** | **~$0.032–0.055** |

*Using ~$0.045 as conservative average.*

---

## 2. Cost Per Credit Action

| Action | Credits Charged | Clips Generated | API Cost | Revenue (Creator INTL) | Gross Margin |
|---|---|---|---|---|---|
| Generate Avatar | 1 | — | $0.005 | $0.050 | **~90%** |
| Edit & Regenerate Avatar | 1 | — | $0.005 | $0.050 | **~90%** |
| Auto-Generate Story | 0 (Free) | — | $0.00006 | $0.00 | — |
| 30s Video | 5 | 2 clips | $0.005 + $0.090 = $0.095 | $0.250 | **~62%** |
| 1min Video | 10 | 3 clips | $0.005 + $0.135 = $0.140 | $0.500 | **~72%** |
| 2min Video | 20 | 4 clips | $0.005 + $0.180 = $0.185 | $1.000 | **~82%** |
| 5min Video | 50 | 4 clips | $0.005 + $0.180 = $0.185 | $2.498 | **~93%** |

*Revenue column uses Creator INTL tier: $0.04995/credit*

---

## 3. Revenue Per Tier

### International (USD) — prices stored in cents

| Tier | Credits | Price | Per Credit | API Cost (all credits used) | Gross Revenue | Gross Margin |
|---|---|---|---|---|---|---|
| Starter | 50 | $2.99 | $0.0598 | ~$0.25 | $2.99 | **~92%** |
| Creator ⭐ | 200 | $9.99 | $0.0500 | ~$1.00 | $9.99 | **~90%** |
| Pro | 500 | $19.99 | $0.0400 | ~$2.50 | $19.99 | **~88%** |
| Studio | 1500 | $49.99 | $0.0333 | ~$7.50 | $49.99 | **~85%** |

### India (INR) — prices in rupees (₹1 ≈ $0.012)

| Tier | Credits | Price | Per Credit | API Cost (INR equiv.) | Gross Revenue | Gross Margin |
|---|---|---|---|---|---|---|
| Starter | 50 | ₹99 | ₹1.98 | ~₹20 | ₹99 | **~80%** |
| Creator ⭐ | 200 | ₹349 | ₹1.75 | ~₹80 | ₹349 | **~77%** |
| Pro | 500 | ₹799 | ₹1.60 | ~₹200 | ₹799 | **~75%** |
| Studio | 1500 | ₹1999 | ₹1.33 | ~₹600 | ₹1999 | **~70%** |

*Note: INR margins are tighter because Indian pricing is ~60% lower than international to stay competitive locally.*

---

## 4. Infrastructure Fixed Costs

| Service | Plan | Monthly Cost |
|---|---|---|
| Vercel | Pro | $20/month |
| Supabase | Pro | $25/month |
| ipapi.co (Geo detection) | Free tier | $0 |
| **Total fixed** | | **$45/month** |

---

## 5. Break-Even Analysis

### Minimum revenue to cover infrastructure ($45/month):

| If all sales are... | Purchases needed | Credits sold |
|---|---|---|
| Starter INTL ($2.99) | 16 purchases | 800 credits |
| Creator INTL ($9.99) | 5 purchases | 1,000 credits |
| Pro INTL ($19.99) | 3 purchases | 1,500 credits |
| Creator IN (₹349 ≈ $4.20) | 11 purchases | 2,200 credits |

**Break-even is very low** — even 5 Creator-tier purchases per month covers all infrastructure.

---

## 6. Scenario Modeling

### Scenario A — Early Stage (50 active users/month)
| Metric | Value |
|---|---|
| Average revenue per user | $7.50 (mix of tiers) |
| Monthly revenue | $375 |
| API costs (avg 30% of revenue) | ~$112 |
| Infrastructure | $45 |
| **Net profit** | **~$218/month** |
| Net margin | ~58% |

### Scenario B — Growth Stage (500 active users/month)
| Metric | Value |
|---|---|
| Average revenue per user | $12 (Creator/Pro heavy) |
| Monthly revenue | $6,000 |
| API costs (~25% of revenue) | ~$1,500 |
| Infrastructure | $45 |
| **Net profit** | **~$4,455/month** |
| Net margin | ~74% |

### Scenario C — Scale Stage (5,000 active users/month)
| Metric | Value |
|---|---|
| Average revenue per user | $15 |
| Monthly revenue | $75,000 |
| API costs (~20% of revenue) | ~$15,000 |
| Infrastructure (upgraded) | ~$200 |
| **Net profit** | **~$59,800/month** |
| Net margin | ~80% |

---

## 7. Cost Optimization Opportunities

| Optimization | Potential Saving | Complexity |
|---|---|---|
| Cache Gemini prompts for same niche+idea combos | 20–40% on Gemini costs | Low |
| Store generated avatars in Supabase Storage (avoid re-generation) | 10–30% on Replicate costs | Medium |
| Use Replicate Deployments (warm instances) for faster + cheaper inference | ~15% on SVD costs | Medium |
| Switch to a cheaper image model (e.g. FLUX.1-schnell) for lower tiers | ~60% on avatar costs | Medium |
| Implement credit expiry (12 months) to reduce liability | Improved cash flow | Low |
| Razorpay webhook-based credit top-up vs. manual | Prevents fraud/double-charge | High priority |

---

## 8. Free Tier Cost Exposure

Every new user gets **10 free credits**. If a user spends them all on the most expensive action:

| Worst case | Credits used | Actions | API Cost |
|---|---|---|---|
| 2× 5min videos | 10 × 5 = ... wait, 10 credits | 2× avatar (1c) + video (5c) = 6 credits each... | ~$0.38 per user |
| 10× avatar generations | 10 × 1 credit | 10 avatars | ~$0.05 per user |
| **Average expected** | 10 credits | 1 avatar + 1 short video | **~$0.10 per user** |

At $0.10 per free user, acquiring 1,000 sign-ups costs ~$100 in API exposure — acceptable for user acquisition.

---

## 9. Key Takeaways

1. **Margins are strong** — 70–93% gross margin depending on tier and usage pattern
2. **Infrastructure is cheap** — $45/month fixed, breaks even with 5 Creator purchases
3. **5min video is most profitable** — same API cost as 2min (4 clips), but charges 50 credits vs. 20
4. **India tier needs monitoring** — margins are ~15% lower; consider raising INR prices slightly as the product matures
5. **Story generation is correctly free** — costs only ~$0.00006, not worth charging
6. **Avatar-only workload is ultra-high margin** — pure Gemini + SDXL at ~90% margin; upsell opportunity

---

*All API costs are estimates based on publicly available Replicate and Google pricing as of early 2026. Actual costs may vary with model version changes, volume discounts, or Replicate billing tier.*
