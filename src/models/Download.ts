/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

export const download = (object: Blob, fileName: string) => {
  const anchorElement = document.createElement('a')
  anchorElement.href = window.URL.createObjectURL(object)
  anchorElement.download = fileName
  document.body.appendChild(anchorElement)
  anchorElement.click()
  anchorElement.remove()
}
