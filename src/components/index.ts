/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import CheckLogin from './aas/authentication/CheckLogin'
import RealmRole from './aas/authorization/RealmRole'
import { AuthContext, Consumer } from './aas/context/AuthContext'
import AuthContextProvider from './aas/context/AuthContextProvider'
import type { AuthContextType } from './aas/context/AuthContextType'
import Login from './aas/Login'
import Logout from './aas/Logout'

// #export-components
export { Logout, Login, CheckLogin, RealmRole, AuthContextProvider, Consumer, AuthContext }

// #export-components
export type { AuthContextType }
