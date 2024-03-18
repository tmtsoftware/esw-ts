/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext } from 'react'
import type { AuthContextType } from './AuthContextType'
import { AuthContextDefaultState } from './AuthContextType'
/**
 * Default state for AuthContextProvider
 * @type {{auth: undefined, login: (function(): boolean), logout: (function(): boolean)}}
 */
const AuthContext = createContext<AuthContextType>(AuthContextDefaultState)
const { Provider, Consumer } = AuthContext

// todo: AuthContext is exported to support scala.js, see if only exporting Consumer works
export { AuthContext, Provider, Consumer }
