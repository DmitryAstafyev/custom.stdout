Allows the developer to shows logs in a fixed area of output. It could be useful:
- to show state
- to show errors
- to show important messages


![Example][example]

[example]: https://github.com/DmitryAstafyev/custom.stdout/blob/master/docs/assets/example.gif?raw=true "example"

Usage

```
npm install custom.stdout --save
```

```typescript
import { StdoutController } from 'custom.stdout';

// Create instance. As argument we should provide target stream.
// As usual it's process.stdout
const stdout = new StdoutController(process.stdout);

// To post logs into "normal" (common area):
stdout.out('LOGS INTO COMMON AREA');

// To post logs into "fixed" area just define ID of it
stdout.out('Important message', 'messages');

stdout.out('Operations done: 43\nRAM used: 324Mb', 'operations');

```