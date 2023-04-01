import { renderHook, act } from '@testing-library/react'
import { useCalendar } from '../useCalendar'
import { TMonthFormats } from '../types'

test('takes input values and returns calendar object', () => {
    const { result } = renderHook(() =>
        useCalendar({
            inputDate: new Date('2023-03-01'),
            dateFormat: 'dd/MM/yyyy',
            adjacent: true,
        })
    )

    console.log(result.current.interval)

    expect(result.current.date).toBe('01/03/2023')

    // Check increment/decrement
    act(() => {
        result.current.increment()
    })
    expect(result.current.date).toBe('01/04/2023')
    act(() => {
        result.current.decrement()
    })
    expect(result.current.date).toBe('01/03/2023')

    // Check monthlength
    expect(result.current.monthLength).toBe(31)

    // Check month in plain text
    expect(result.current.monthInText).toBe('March')

    // Check interval
    const interval = result.current.interval
    expect(interval).toHaveLength(35)

    expect(interval[0]).toStrictEqual('28/02/2023')
    expect(interval[interval.length - 1]).toStrictEqual('03/04/2023')
})

test('takes input values and returns calendar object', () => {
    const { result } = renderHook(() =>
        useCalendar({
            inputDate: new Date('2023-01-01'),
            dateFormat: 'dd/MM/yyyy',
            adjacent: true,
        })
    )

    expect(result.current.date).toBe('01/01/2023')

    // Check increment/decrement
    act(() => {
        result.current.increment()
    })
    expect(result.current.date).toBe('01/02/2023')
    act(() => {
        result.current.decrement()
    })
    expect(result.current.date).toBe('01/01/2023')

    // Check monthlength
    expect(result.current.monthLength).toBe(31)

    // Check month in plain text
    expect(result.current.monthInText).toBe('January')

    // Check interval
    const interval = result.current.interval
    expect(interval).toHaveLength(42)

    expect(interval[0]).toStrictEqual('27/12/2022')
    expect(interval[interval.length - 1]).toStrictEqual('06/02/2023')
})

test('It provides fallback for dateFormat', () => {
    const { result } = renderHook(() =>
        useCalendar({ inputDate: new Date('1990/02/02') })
    )
    expect(result.current.date).toBe('02-02-1990')
})

test('Provides formatter function with applied formats', () => {
    const { result } = renderHook(() =>
        useCalendar({
            inputDate: new Date('1990/02/02'),
            dateFormat: 'dd-MM-yyyy',
        })
    )
    const formatted = result.current.formatter(new Date('12/02/2022'))
    expect(formatted).toBe('02-12-2022')
})

test.each<{ format: TMonthFormats; expected: string }>([
    { format: 'LLL', expected: 'Feb' },
    { format: 'LLLL', expected: 'February' },
    { format: 'LLLLL', expected: 'F' },
    { format: 'MMM', expected: 'Feb' },
    { format: 'MMMM', expected: 'February' },
    { format: 'MMMMM', expected: 'F' },
])('Applies custom month format if applied', ({ format, expected }) => {
    const { result } = renderHook(() =>
        useCalendar({
            inputDate: new Date('1990/02/02'),
            dateFormat: 'dd-MM-yyyy',
            monthFormat: format,
        })
    )
    expect(result.current.monthInText).toStrictEqual(expected)
})
