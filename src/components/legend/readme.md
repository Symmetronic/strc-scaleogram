# strc-scaleogram-legend



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute | Description                | Type                        | Default     |
| ------------ | --------- | -------------------------- | --------------------------- | ----------- |
| `colorScale` | --        | Color scale of the legend. | `(value: number) => string` | `undefined` |
| `range`      | --        | Range of the legend.       | `[number, number]`          | `undefined` |


## Dependencies

### Used by

 - [strc-scaleogram](../scaleogram)

### Depends on

- [strc-scaleogram-color-gradient](../color-gradient)

### Graph
```mermaid
graph TD;
  strc-scaleogram-legend --> strc-scaleogram-color-gradient
  strc-scaleogram --> strc-scaleogram-legend
  style strc-scaleogram-legend fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
