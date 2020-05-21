export type Task<T> = () => Promise<T>

export const eventually = async <T>(task: Task<T>): Promise<T> => {
  const retries = 50

  const delayedLoop = async (currentRetryCount: number, pollIntervalMillis: number) => {
    await delay(pollIntervalMillis)
    return loop(currentRetryCount + 1)
  }

  const loop = async (currentRetryCount: number): Promise<T> => {
    if (currentRetryCount == retries - 1) return await task()
    else {
      try {
        return await task()
      } catch (error) {
        return delayedLoop(currentRetryCount, 500)
      }
    }
  }

  return loop(0)
}

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
