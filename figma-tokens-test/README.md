# Figma Tokens Test Files

This directory contains test files to validate Figma Tokens plugin compatibility.

## Test Files

### 1. `tokens-minimal.json` - Simplest Format
The most basic format with just 3 colors. Test this first.

```json
{
  "red": { "value": "#FF0000", "type": "color" },
  "blue": { "value": "#0000FF", "type": "color" },
  "green": { "value": "#00FF00", "type": "color" }
}
```

**Import Steps:**
1. Open Figma
2. Open Figma Tokens plugin
3. Click "Load from file"
4. Select `tokens-minimal.json`

---

### 2. `tokens.json` - Flat Structure
Flat structure with semantic token names (20 tokens).

```json
{
  "global": {
    "cta-default": { "value": "#E03600", "type": "color" },
    "cta-hover": { "value": "#FA4D1A", "type": "color" },
    ...
  }
}
```

---

### 3. `tokens-nested.json` - Nested Groups
Nested structure organizing tokens into groups.

```json
{
  "core": {
    "cta": {
      "default": { "value": "#E03600", "type": "color" },
      "hover": { "value": "#FA4D1A", "type": "color" }
    },
    "primary": { ... }
  }
}
```

## Testing Instructions

1. **Start with `tokens-minimal.json`** - If this fails, there's a fundamental compatibility issue
2. **Try `tokens.json`** - Tests flat structure with semantic naming
3. **Try `tokens-nested.json`** - Tests nested grouping

## Expected Results

- ✅ All tokens should import without errors
- ✅ Token names should be preserved
- ✅ Colors should display correctly
- ✅ No "198 errors" message

## Reporting Results

Please test each file and report which format works. This will help determine the correct export format for the full token set.
