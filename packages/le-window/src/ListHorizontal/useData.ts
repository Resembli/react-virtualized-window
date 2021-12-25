import { useMemo } from "react"

export const useData = <T>(userData: T[], rtl: boolean) => {
  const data = useMemo(() => {
    const dataCopy = [...userData]

    // We reverse the data if rtl is true. This is a workaround for IOS devices. Stick positioning
    // and rtl does not appear to work correctly. Hence we simulate rtl ourselves. First we reverse the
    // data - elsewhere we set the scroll to the end.
    return rtl ? dataCopy.reverse() : dataCopy
  }, [userData, rtl])

  return data
}
