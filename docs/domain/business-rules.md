# Business Rules - Customs Calculations

This document details the business rules and formulas used for customs calculations in the Aduanas Tools platform. These rules are specific to Peruvian customs regulations but follow international standards.

## Table of Contents
- [Customs Value (CIF)](#customs-value-cif)
- [Duty Calculation (Ad Valorem)](#duty-calculation-ad-valorem)
- [IGV Calculation](#igv-calculation)
- [Complete Calculation Flow](#complete-calculation-flow)
- [Tax Rates](#tax-rates)
- [Special Cases](#special-cases)
- [Validation Rules](#validation-rules)

---

## Customs Value (CIF)

### Definition
The **Customs Value** (also called **CIF Value** or **Valor en Aduana**) is the base value used to calculate import duties and taxes. CIF stands for **Cost, Insurance, and Freight**.

### Formula
```
Customs Value = FOB + Freight + Insurance + Other Costs
```

### Components

#### FOB (Free On Board)
- **Definition**: The price of goods at the port of origin
- **Includes**: Product cost, packaging, loading at origin
- **Excludes**: International shipping, insurance
- **Example**: If you buy products for $1,000 USD, that's your FOB

#### Freight
- **Definition**: Cost of international transportation
- **Includes**: Shipping from origin port to destination port
- **Types**: Maritime, air, land transport
- **Example**: $200 USD for ocean freight

#### Insurance
- **Definition**: Cost to insure goods during transport
- **Purpose**: Protection against loss or damage during shipping
- **Typical Rate**: 0.5% - 2% of FOB value
- **Example**: $50 USD to insure the shipment

#### Other Costs (Optional)
- **Definition**: Additional costs that add value to the goods
- **May Include**:
  - Commissions paid to agents
  - Special packaging costs
  - Certifications required for import
  - Royalties or license fees
- **Example**: $100 USD for special certifications

### Calculation Example
```
FOB:         $1,000.00
Freight:     $  200.00
Insurance:   $   50.00
Other Costs: $  100.00
─────────────────────
CIF Value:   $1,350.00
```

### Implementation
See: `src/domain/customs/value.ts`

---

## Duty Calculation (Ad Valorem)

### Definition
**Customs Duty** (also called **Ad Valorem** or **Derechos Arancelarios**) is a tax charged by customs based on the value of imported goods.

### Formula
```
Duty = Customs Value × Duty Rate
```

### Duty Rate
- **Variable**: Depends on the product type (tariff classification)
- **Range**: Typically 0% to 20% in Peru
- **Common Rates**:
  - 0%: Books, medicines, certain machinery
  - 6%: Many consumer goods
  - 11%: Electronics, appliances
  - 20%: Luxury items, alcohol, tobacco

### Tariff Classification
- Products are classified using the **Harmonized System (HS Code)**
- Each HS code has a specific duty rate
- Classification determines the applicable duty rate
- **Example**: HS Code 8471.30.00 (Laptops) might have 0% duty

### Calculation Example
```
Customs Value: $1,350.00
Duty Rate:          6% (0.06)
─────────────────────────
Duty:          $   81.00
```

### Implementation
See: `src/domain/customs/taxes.ts`

---

## IGV Calculation

### Definition
**IGV** (Impuesto General a las Ventas) is Peru's Value Added Tax (VAT) applied to imports.

### Formula
```
IGV Base = Customs Value + Duty
IGV = IGV Base × IGV Rate
```

### IGV Rate
- **Standard Rate**: 18% (0.18) in Peru
- **Composition**: 16% IGV + 2% IPM (Municipal Promotion Tax)
- **Applied To**: All imports unless specifically exempted

### Why IGV Base Includes Duty
The IGV is calculated on the **landed value** of goods, which includes:
1. The customs value (CIF)
2. The duty paid

This means you pay tax on the tax (duty), which increases the total tax burden.

### Calculation Example
```
Customs Value: $1,350.00
Duty:          $   81.00
─────────────────────────
IGV Base:      $1,431.00

IGV Rate:           18% (0.18)
─────────────────────────
IGV:           $  257.58
```

### Implementation
See: `src/domain/customs/taxes.ts`

---

## Complete Calculation Flow

### Step-by-Step Process

#### Step 1: Calculate Customs Value (CIF)
```
CIF = FOB + Freight + Insurance + Other Costs
```

#### Step 2: Calculate Duty (Ad Valorem)
```
Duty = CIF × Duty Rate
```

#### Step 3: Calculate IGV Base
```
IGV Base = CIF + Duty
```

#### Step 4: Calculate IGV
```
IGV = IGV Base × IGV Rate
```

#### Step 5: Calculate Total Taxes
```
Total Taxes = Duty + IGV
```

#### Step 6: Calculate Total Landed Cost
```
Total Landed Cost = CIF + Total Taxes
```

### Complete Example

**Input Data:**
- FOB: $1,000.00
- Freight: $200.00
- Insurance: $50.00
- Other Costs: $100.00
- Duty Rate: 6% (0.06)
- IGV Rate: 18% (0.18)

**Calculations:**
```
Step 1: CIF Value
  CIF = $1,000 + $200 + $50 + $100 = $1,350.00

Step 2: Duty
  Duty = $1,350 × 0.06 = $81.00

Step 3: IGV Base
  IGV Base = $1,350 + $81 = $1,431.00

Step 4: IGV
  IGV = $1,431 × 0.18 = $257.58

Step 5: Total Taxes
  Total Taxes = $81 + $257.58 = $338.58

Step 6: Total Landed Cost
  Total Landed Cost = $1,350 + $338.58 = $1,688.58
```

**Summary:**
- Product Cost (FOB): $1,000.00
- Shipping & Insurance: $300.00
- Other Costs: $100.00
- **Customs Value (CIF): $1,350.00**
- Duty (6%): $81.00
- IGV (18%): $257.58
- **Total Taxes: $338.58**
- **Total Landed Cost: $1,688.58**

---

## Tax Rates

### Current Rates (Peru)

#### IGV (Value Added Tax)
- **Rate**: 18%
- **Breakdown**: 16% IGV + 2% IPM
- **Applied To**: All imports (with rare exceptions)
- **Last Updated**: 2003 (stable rate)

#### Duty Rates (Ad Valorem)
- **Variable**: Depends on HS Code
- **Common Rates**:
  - 0%: Essential goods, books, medicines
  - 6%: General consumer goods
  - 11%: Electronics, appliances
  - 20%: Luxury items
- **Source**: SUNAT (Peru's tax authority)

### Rate Updates
- Duty rates can change based on trade agreements
- Check official SUNAT website for current rates
- Free Trade Agreements (FTAs) may reduce or eliminate duties

---

## Special Cases

### De Minimis Value
- **Definition**: Minimum value threshold for duties
- **Peru**: Shipments under $200 USD may be exempt from duties (not IGV)
- **Conditions**: Personal use, non-commercial
- **Note**: Rules vary by country and shipment type

### Free Trade Agreements (FTAs)
- Peru has FTAs with many countries
- May reduce or eliminate duty rates
- Requires certificate of origin
- **Examples**: 
  - USA-Peru FTA: Many products at 0% duty
  - EU-Peru FTA: Reduced rates for European goods

### Temporary Imports
- Goods imported temporarily (exhibitions, repairs)
- May be exempt from duties
- Requires guarantee and re-export commitment

### Prohibited/Restricted Items
- Some items cannot be imported
- Others require special permits
- **Examples**: Weapons, drugs, endangered species

---

## Validation Rules

### Input Validation

#### FOB Value
- **Required**: Yes
- **Minimum**: > 0
- **Type**: Positive number
- **Currency**: USD (or convert to USD first)

#### Freight
- **Required**: Yes
- **Minimum**: ≥ 0
- **Type**: Non-negative number
- **Note**: Can be 0 for local pickup

#### Insurance
- **Required**: Yes
- **Minimum**: ≥ 0
- **Type**: Non-negative number
- **Typical Range**: 0.5% - 2% of FOB

#### Other Costs
- **Required**: No
- **Minimum**: ≥ 0
- **Type**: Non-negative number
- **Default**: 0

#### Duty Rate
- **Required**: Yes
- **Minimum**: 0
- **Maximum**: 1 (100%)
- **Type**: Decimal (e.g., 0.06 for 6%)
- **Common Values**: 0, 0.06, 0.11, 0.20

#### IGV Rate
- **Required**: Yes
- **Standard Value**: 0.18 (18%)
- **Type**: Decimal
- **Note**: Usually fixed at 0.18 for Peru

### Business Logic Validation

#### Reasonable Ratios
- Insurance should be 0.5% - 5% of FOB (warning if outside)
- Freight should be reasonable for shipment type
- Total CIF should be > FOB

#### Currency Consistency
- All values must be in same currency
- Convert to USD before calculation if needed

### Error Messages
- **Clear**: Use plain language
- **Actionable**: Tell user how to fix
- **Specific**: Indicate which field has the issue

**Examples:**
- ❌ "Invalid input"
- ✅ "FOB value must be greater than 0"
- ✅ "Duty rate must be between 0% and 100%"

---

## References

### Official Sources
- **SUNAT** (Peru Tax Authority): [www.sunat.gob.pe](https://www.sunat.gob.pe)
- **World Customs Organization**: [www.wcoomd.org](https://www.wcoomd.org)
- **Harmonized System**: HS Code classification system

### Related Documentation
- `src/domain/customs/types.ts` - Type definitions
- `src/domain/customs/value.ts` - CIF calculation implementation
- `src/domain/customs/taxes.ts` - Tax calculation implementation

### Updates
This document should be updated when:
- Tax rates change
- New regulations are introduced
- Calculation methods are modified
- New special cases are identified

**Last Updated**: December 2024
