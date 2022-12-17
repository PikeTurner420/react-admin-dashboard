import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { themeSettings } from "../theme";
import React, { Component } from "react";

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCompanyCountry: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.getCountriesPurchase();
  }

  getCountriesPurchase() {
    fetch("http://localhost:3050/pie/countries/purchase")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataCompanyCountry: data,
          isLoaded: true,
        });
      })
      .catch((er) => console.log(er));
  }

  render() {
    //_____________________________________//
    const theme = themeSettings();
    const colors = tokens(theme.palette.mode);
    var { dataCompanyCountry } = this.state;
    const { isLoaded } = this.state;
    if (isLoaded) {
      return (
        <>
          <ResponsivePie
            data={dataCompanyCountry}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: colors.greenAccent[100],
                  },
                },
                legend: {
                  text: {
                    fill: colors.grey[100],
                  },
                },
                ticks: {
                  line: {
                    stroke: colors.grey[100],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: colors.grey[100],
                  },
                },
              },
              legends: {
                text: {
                  fill: colors.grey[100],
                },
              },
              tooltip: {
                container: {
                  color: colors.primary[500],
                },
              },
            }}
            margin={{ top: 30, right: 40, bottom: 10, left: 60 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={colors.grey[900]}
            arcLinkLabelsThickness={1}
            arcLinkLabelsColor={{ from: "color" }}
            enableArcLabels={true}
            arcLabelsRadiusOffset={0.5}
            arcLabelsSkipAngle={7}
            arcLabelsTextColor={{
              from: "",
              modifiers: [["darker", 2]],
            }}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            legends={[
              {
                anchor: "top",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: -20,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "#fff",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]}
          />
        </>
      );
    } else {
      return (
        <>
          <div>
            <h1>Loading...</h1>
          </div>
        </>
      );
    }
  }
}
export default PieChart;
