/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import { UNKNOWN_USERNAME, USERNAME_HEADER_NAME } from './Constants'

export class HeaderExt extends Headers {
  constructor(values?: HeadersInit) {
    super(values)
  }

  //TODO add tests for the helper methods
  withHeader(headerName: string, value: string) {
    super.set(headerName, value)
    return new HeaderExt(this)
  }

  withContentType(value: string) {
    return this.withHeader('Content-Type', value)
  }

  withUsername(value?: string) {
    return this.withHeader(USERNAME_HEADER_NAME, value ? value : UNKNOWN_USERNAME)
  }

  withAuthorization(token?: string) {
    if (!token) return this
    return this.withHeader('Authorization', `Bearer ${token}`)
  }
}
