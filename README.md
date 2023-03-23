![](https://img.shields.io/badge/Coverage-100%25-83A603.svg?logo=jest&logoColor=white&color=blue&prefix=$coverage$) ![npm](https://img.shields.io/npm/v/calendar-creator)

# useCalendar

(useCalendar name was taken 😢 so it goes under calendar-creator)

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

-   Map over interval
-   Use provided formatterfunc to apply default or provided format

```
const App = () => {
	const { interval, formatter } = useCalendar({ inputDate: new Date(), dateFormat: 'dd/MM/yyyy' })

	return (
		<div>
			{interval.map((date) => (
                {/* Date will be formatted to dd/MM/yyyy */}
				<div key={date.getTime()}>{formatter(date)}</div>
			))}
		</div>
	)
}

```
