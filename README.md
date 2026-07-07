### Problem
- Use iPhone 17 (IOS 26.5)
  ✅ Paste `+1 (555) 123-4567` => `onChange` event emits
  ```
  nativeEvent: {
    text: '+1 (555) 123-4567',
    selection: {start: 17, end: 17}
  }
  ```
  ✅ Use browser autofill to enter `+1 (555) 123-4567` => `onChange` event emits
  ```
  nativeEvent: {
    text: '+1 (555) 123-4567',
    selection: {start: 17, end: 17}
  }
  ```
- Use Pixel 10 Pro XL (Android 17.0)
  ✅ Paste `+15551234567` => `onChange` event emits
  ```
  nativeEvent: {
    text: '+15551234567',
    selection: {start: 12, end: 12}
  }
  ```
  ❌ Use browser autofill to enter `+15551234567` => `onChange` event emits
  ```
  nativeEvent: {
    text: '+15551234567',
    selection: {start: 0, end: 0}
  }
  ```

**Invalid `selection: {start: 0, end: 0}` for Android device!**

![](bug-demo.mov)


### Reproduction
```
npx create-expo-app@latest --example with-typescript
```