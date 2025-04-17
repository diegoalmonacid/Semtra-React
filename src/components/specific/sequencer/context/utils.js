

export const clearButtonState = (setDisableNext, setDisablePrev, setOnClickNext, setOnClickPrev, setNextTitle, setPrevTitle) => {
    setDisableNext(false);
    setDisablePrev(false);
    setOnClickNext(() => {});
    setOnClickPrev(() => {});
    setNextTitle('Siguiente');
    setPrevTitle('Anterior');
};
