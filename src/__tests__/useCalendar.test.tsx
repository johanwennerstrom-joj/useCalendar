import { renderHook, act, waitFor } from '@testing-library/react'
import { useCalendar } from '../useCalendar'

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

    expect(interval[0]).toStrictEqual(new Date('2023-02-27T23:00:00.000Z'))
    expect(interval[interval.length - 1]).toStrictEqual(
        new Date('2023-04-02T22:00:00.000Z')
    )
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

    expect(interval[0]).toStrictEqual(new Date('2022-12-26T23:00:00.000Z'))
    expect(interval[interval.length - 1]).toStrictEqual(
        new Date('2023-02-05T23:00:00.000Z')
    )
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
