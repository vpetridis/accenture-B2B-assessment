```
01:  import React, { useEffect, useState } from 'react';
02:
03:  function App() {
04:
05:      var [fuel, setFeul] = useState(0);
06:      var [alertText, setAlertTxt] = useState('Processing...');
07:
08:      useEffect(() => {
09:        fetch('https://new.world.com/fleet/121')
10:          .then(response => response.json())
11:          .then(json => {
12:            setFeul(json);
13:            console.log(json);
14:          })
15:      });
16:
17:      useEffect(() => {
18:        if (!fuel) setAlertTxt('Processing...'); else
19:        if (fuel.litres > 0) setAlertTxt('Need to buy more fuel'); else
20:        setAlertTxt('All is fine');
21:      }, [fuel])
22:
23:      return (
24:        <div>
25:          <h1 style={alertText == 'Need to buy more fuel'? {color:"red"}:{}}>{alertText}</h1>
26:        </div>
27:      );
28:
29:  }
30:
31:  export default App;

```

| Line # | Comment                                                                                                                                                                                                                                                                                                  |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 03     | Change the default name to something like: AlertFuelWidget                                                                                                                                                                                                                                               |
| 04-05  | Change var to const                                                                                                                                                                                                                                                                                      |
| 09     | Pass the `id` from a parent component with props and use it like: fetch(`https://new.world.com/fleet/${id}`). Avoid static URIs to make the component reusable                                                                                                                                           |
| 15     | Add the `id` as a dependency array to avoid excessive requests.                                                                                                                                                                                                                                          |
| 18-20  | Change the conditionals to ternary operators (without `else`) for readability. Also add the id of the fleet as a dependency array.                                                                                                                                                                       |
| 19     | Important: it's a different condition than the one provided by the PO. The PO asks for an alert when the fleet consumes more than 10k litres. Create a separate function `isOverBudget(litres)` and pass it `10.000` from a parent component through props to return a boolean (we shall reuse it below) |
| 25     | Avoid changing components with inline styling, try using a custom class. Apply the class conditionally with the function `isOverBudget(litres)`                                                                                                                                                          |

**Note: There are more possibilities to improve the code but this is enough for a single review. The junior developer should not feel overwhelmed with the changes**
