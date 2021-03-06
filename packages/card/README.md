# Farmblocks Card

A styled card to put content inside.

## Installation

```
npm install @crave/farmblocks-card
```

## API

| Property  | Description                                                                             | Type                                    |
| --------- | --------------------------------------------------------------------------------------- | --------------------------------------- |
| floating  | if present, the card drops a bigger shadow                                              | boolean                                 |
| type      | the type of card (reflects on background color)                                         | string (one of "FEATURED" or "NEUTRAL") |
| width     | a css value to be used as width                                                         | string                                  |
| padding   | a css value to be used as padding                                                       | string                                  |
| overflow  | a css value to be used as overflow                                                      | string                                  |
| children  | the contents of the card                                                                | React.Node                              |
| boxShadow | specifies a custom border shadow. Please note that this will override floating property | string                                  |

## License

MIT
