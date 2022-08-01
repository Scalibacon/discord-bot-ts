const wait = async (millis: number) => {
  return new Promise(resolve => setTimeout(resolve, millis));
}

export { wait }