/*
 * Copyright (C) 2025 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import { download } from '../../src'

describe('Download', () => {
  test('download should create anchor element and click on it', () => {
    // setup
    const anchorEle = window.document.createElement('a')
    const listener = jest.fn()
    anchorEle.addEventListener('click', () => listener())

    const createElementMock = jest.fn()
    const mockCreateObj = jest.fn()

    window.document.createElement = createElementMock
    createElementMock.mockReturnValue(anchorEle)

    window.URL.createObjectURL = mockCreateObj
    mockCreateObj.mockReturnValue('url')
    // action
    const blob = new Blob([])
    download(blob, 'file1')

    // verification
    expect(createElementMock).toHaveBeenCalledWith('a')
    expect(mockCreateObj).toHaveBeenCalledWith(blob)
    expect(anchorEle.download).toBe('file1')
    expect(anchorEle.href).toBe('http://localhost/url')
    expect(listener).toHaveBeenCalledTimes(1)

    //verify element removed
    const elementRemoved = window.document.querySelector('a')
    expect(elementRemoved).toBeNull()
  })
})
