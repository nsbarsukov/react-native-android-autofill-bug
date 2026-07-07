# `TextInput` reports invalid `selection` on Android browser autofill

## Summary

On Android, filling a `TextInput` via **browser/system autofill** emits an `onChange` event whose `nativeEvent.selection` is `{start: 0, end: 0}` instead of pointing to the end of the inserted text.

The `text` is correct, but the `selection` is wrong — the cursor is reported at the start of the field rather than after the autofilled value. The same input entered by **pasting** (from clipboard) reports the correct selection, and **iOS reports the correct selection for both paste and autofill**.

## Environment

| | Version |
| --- | --- |
| `react-native` | 0.86.0 |
| `react` | 19.2.3 |
| `expo` | 57.0.1 |

## Steps to reproduce

1. Render a `TextInput` with `autoComplete="tel"` and log `onChange`'s `nativeEvent` (see [App.tsx](App.tsx)):

   ```jsx
   <TextInput
     autoComplete="tel"
     onChange={e => console.log(e.nativeEvent)}
   />
   ```
2. Focus the input and trigger the browser/system autofill suggestion for a phone number.

## Expected vs. actual

### ✅ iPhone 17 (iOS 26.5) — correct in both cases

Paste `+1 (555) 123-4567`:

```js
nativeEvent: {
  text: '+1 (555) 123-4567',
  selection: { start: 17, end: 17 }
}
```

Browser autofill `+1 (555) 123-4567`:

```js
nativeEvent: {
  text: '+1 (555) 123-4567',
  selection: { start: 17, end: 17 } 
}
```

### Pixel 10 Pro XL (Android 17.0) — autofill is broken

✅ Paste `+15551234567`:

```js
nativeEvent: {
  text: '+15551234567',
  selection: { start: 12, end: 12 }
}
```

❌ Browser autofill `+15551234567`:

```js
nativeEvent: {
  text: '+15551234567',
  selection: { start: 0, end: 0 }
  //         ~~~~~~~~~~~~~~~~~~~~
}
```

**On Android, autofill reports `selection: { start: 0, end: 0 }` while the text length is 12.**

## Demo

https://raw.githubusercontent.com/nsbarsukov/react-native-android-autofill-bug/refs/heads/main/bug-demo.mov

## Reproduction

```sh
npx create-expo-app@latest --example with-typescript
```

Then replace the app entry with [App.tsx](App.tsx) from this repo.
