import moment from 'moment'
import { CustomError } from './error-handler'

export const parseDate = (dateStr, format) => {
  let beginDate, endDate

  if (format === 'YYYYMMDD') {
    const date = moment(dateStr, 'YYYYMMDD')

    if (dateStr.length === 8) {
      beginDate = date
      endDate = date.clone()
    } else if (dateStr.length === 6) {
      beginDate = date
      endDate = date.clone().add(1, 'month').add(-1, 'days')
    } else if (dateStr.length === 4) {
      beginDate = date
      endDate = date.clone().add(1, 'year').add(-1, 'days')
    }
  } else {
    // assume ISO formatted date
    // count number of dashes. If 0, only year. If 1, year and month, if 2, year and month and day

    const numValues = dateStr.split('-').length-1

    if (numValues === 0) {
      beginDate = moment(dateStr)
      endDate = beginDate.clone().add(1, 'year').add(-1, 'days')
    } else if (numValues === 1) {
      beginDate = moment(dateStr)
      endDate = beginDate.clone().add(1, 'month').add(-1, 'days')
    } else {
      beginDate = moment(dateStr)
      endDate = beginDate.clone()
    }
  }

  if (!beginDate.isValid() || !endDate.isValid()) {
    throw new CustomError('Invalid date supplied.')
  }

  return [ beginDate.toDate(), endDate.toDate() ]
}
