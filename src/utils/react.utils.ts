import { useEffect, useState, useSyncExternalStore } from "react";
import { Observable } from "rxjs";

export interface ViewModel<State> {
    getState: () => State;
    observable: Observable<any>;
}

// export const useViewModel = <T>(vm: ViewModel<T>) => {
//     return useSyncExternalStore(() => vm.subscribe, () => vm.value);
// }

export const useViewModel = <State>(vm: ViewModel<State>) => {
    const [state, setState] = useState<State>(() => vm.getState());
    useEffect(() => {
        const subscription = vm.observable.subscribe(() => {
            setState(vm.getState());
        });
        return () => subscription.unsubscribe();
    }, [vm]);
    return state;
}