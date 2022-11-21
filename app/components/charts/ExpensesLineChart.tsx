import { ResponsiveLine } from "@nivo/line";

const data = [
  {
    id: "japan",
    color: "hsl(28, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 233,
      },
      {
        x: "helicopter",
        y: 30,
      },
      {
        x: "boat",
        y: 0,
      },
      {
        x: "train",
        y: 139,
      },
      {
        x: "subway",
        y: 3,
      },
      {
        x: "bus",
        y: 178,
      },
      {
        x: "car",
        y: 151,
      },
      {
        x: "moto",
        y: 140,
      },
      {
        x: "bicycle",
        y: 23,
      },
      {
        x: "horse",
        y: 214,
      },
      {
        x: "skateboard",
        y: 158,
      },
      {
        x: "others",
        y: 187,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(179, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 253,
      },
      {
        x: "helicopter",
        y: 112,
      },
      {
        x: "boat",
        y: 59,
      },
      {
        x: "train",
        y: 180,
      },
      {
        x: "subway",
        y: 200,
      },
      {
        x: "bus",
        y: 300,
      },
      {
        x: "car",
        y: 199,
      },
      {
        x: "moto",
        y: 20,
      },
      {
        x: "bicycle",
        y: 190,
      },
      {
        x: "horse",
        y: 264,
      },
      {
        x: "skateboard",
        y: 252,
      },
      {
        x: "others",
        y: 48,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(195, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 234,
      },
      {
        x: "helicopter",
        y: 189,
      },
      {
        x: "boat",
        y: 135,
      },
      {
        x: "train",
        y: 89,
      },
      {
        x: "subway",
        y: 279,
      },
      {
        x: "bus",
        y: 23,
      },
      {
        x: "car",
        y: 268,
      },
      {
        x: "moto",
        y: 89,
      },
      {
        x: "bicycle",
        y: 4,
      },
      {
        x: "horse",
        y: 46,
      },
      {
        x: "skateboard",
        y: 204,
      },
      {
        x: "others",
        y: 276,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(288, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 296,
      },
      {
        x: "helicopter",
        y: 65,
      },
      {
        x: "boat",
        y: 200,
      },
      {
        x: "train",
        y: 273,
      },
      {
        x: "subway",
        y: 61,
      },
      {
        x: "bus",
        y: 188,
      },
      {
        x: "car",
        y: 202,
      },
      {
        x: "moto",
        y: 280,
      },
      {
        x: "bicycle",
        y: 198,
      },
      {
        x: "horse",
        y: 24,
      },
      {
        x: "skateboard",
        y: 283,
      },
      {
        x: "others",
        y: 99,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(31, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 173,
      },
      {
        x: "helicopter",
        y: 272,
      },
      {
        x: "boat",
        y: 45,
      },
      {
        x: "train",
        y: 193,
      },
      {
        x: "subway",
        y: 297,
      },
      {
        x: "bus",
        y: 114,
      },
      {
        x: "car",
        y: 96,
      },
      {
        x: "moto",
        y: 123,
      },
      {
        x: "bicycle",
        y: 234,
      },
      {
        x: "horse",
        y: 41,
      },
      {
        x: "skateboard",
        y: 178,
      },
      {
        x: "others",
        y: 281,
      },
    ],
  },
];
export const ExpensesLineChart = () => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    curve="natural"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "transportation",
      legendOffset: 36,
      legendPosition: "middle",
    }}
    axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "count",
      legendOffset: -40,
      legendPosition: "middle",
    }}
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);
