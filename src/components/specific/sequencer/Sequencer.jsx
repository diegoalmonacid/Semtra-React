import { SequencerRoutes } from "./SequencerRoutes";
import { SequencerProvider } from "./context/SequencerProvider";

export const Sequencer = ({ children, steps }) => {
    return (
        <SequencerProvider steps={steps}>
            <SequencerRoutes>
                {children}
            </SequencerRoutes>
        </SequencerProvider>
    );
}


