/**
 * A BindableEvent wrapper
 */
interface Signal<ReceivedCallback extends Callback = () => void> {
        /**
         * The object's class name
         */
        readonly ClassName: 'Signal';

        /**
	 * Receives a callback and connects it to the BindableEvent
	 * @param callback Function to connect to the BindableEvent
	 */
        Receive<
                Arguments extends (Parameters<ReceivedCallback> extends undefined[]
                        ? unknown[]
                        : Parameters<ReceivedCallback>
                ) = 
                        Parameters<ReceivedCallback> extends undefined[]
                                ? unknown[]
                                : Parameters<ReceivedCallback> 
        >(
                callback: Parameters<ReceivedCallback> extends defined[]
                        ? Arguments extends defined[]
                                ? (...args: Arguments) => void
                                : ReceivedCallback
                        : ReceivedCallback
        ): RBXScriptConnection;

        /**
	 * Emits the signal with the given arguments
	 * @param args Arguments to pass into the function
	 */
        Emit(...args: Parameters<ReceivedCallback> extends undefined[] 
                ? any[] 
                : Parameters<ReceivedCallback>
        ): void;

        /**
	 * Yields the thread until its fired
	 */
        Wait(): LuaTuple<Parameters<ReceivedCallback>>;

        /**
	 * Destroys the signal
	 */
        Destroy(): void;
}

type SignalConstructor = {
        new <ReceivedCallback extends Callback = () => void>(): Signal<ReceivedCallback>;
        Is(obj: object): obj is Signal<Callback>;
} & (<ReceivedCallback extends Callback = () => void>() => Signal<ReceivedCallback>);

declare const Signal: SignalConstructor;

export = Signal;
