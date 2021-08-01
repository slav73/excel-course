import { storage } from '@core/utils'
import { defaultStyles, defaultTitle } from '@core/constants'

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  currentText: '',
  title: defaultTitle,
}

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
})

export const initialState = storage('excel-state')
  ? normalize(storage('excel-state'))
  : defaultState
