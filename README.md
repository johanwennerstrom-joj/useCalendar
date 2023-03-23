$coverage$ $statements$ $functions$ $lines$

# useCalendar

Minimal hook for generating logic for calendars

## Example use

-   Initializing calendar

```
/* Locales are imported seperately from date-fns
   and not included in package */

import fr from 'date-fns/locale/fr'

const {decrement, increment, interval, monthInText } = useCalendar({
    inputDate: new Date(),
    dateFormat: 'dd-MM-yyyy',
    locale: fr
})

```

## Using calendardata

    - Map over interval
    - Use provided formatter to format according to provided format

```
const App = () => {
	const { interval, formatter } = useCalendar({ inputDate: new Date() })

	return (
		<div>
			{interval.map((date) => (
				<div key={date.getTime()}>{formatter(date)}</div>
			))}
		</div>
	)
}

```
