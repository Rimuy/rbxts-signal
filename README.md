# Signal

My personal implementation of signal.

## Reference
- Static Methods
  - `Is: (obj: table) -> boolean`
- Methods
  - `Listen: (callback: (...) -> any) -> RBXScriptConnection` Connects the signal to a callback
  - `Emit: (...) -> void` Fires the signal
  - `Wait: () -> CallbackResult` Yields until the signal is fired
  - `Destroy: () -> void` Destroys the signal