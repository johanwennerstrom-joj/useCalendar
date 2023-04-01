import type { Locale } from 'date-fns'

export interface ICalendarReturnType {
    date: string
    monthInText: string
    increment: () => void
    decrement: () => void
    monthLength: number
    interval: Date[]
    formatter: () => string
}

export type TMonthFormats = 'LLL' | 'LLLL' | 'LLLLL' | 'MMM' | 'MMMM' | 'MMMMM'

export interface IUseCalendar {
    /**
     *  @param {Date} inputDate - Startdate for calendar.
     */
    inputDate: Date
    /**
     *  @param {string} dateFormat - Format for date. Defaults to dd-mm-yyyy.
     */
    dateFormat?: string
    /**
     *  @param {Locale} locale - Provided date-fns locale.
     */
    locale?: Locale
    /**
     *  @param {boolean} adjacent - Include days adjacent to current month to form full weeks
     */
    adjacent?: boolean
    /**
     * @param {TMonthFormats} monthFormat - Format to apply specifically to monthInText. Defaults to MMMM
     */
    monthFormat?: TMonthFormats
}
