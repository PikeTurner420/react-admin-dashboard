import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { Box, Button } from "@mui/material";

import { themeSettings } from "../theme";
import React, { Component } from "react";

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      dataCompanyCountry: [],
      isLoaded: false,
      pieOrDonut: 0.4,
    };
  }

  componentDidMount() {
    this.getCountriesPurchase();
    this.getCountries();
  }

  getCountriesPurchase() {
    console.log("apiFetch contatti");
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

  getCountries() {
    console.log("apiFetch countries");
    fetch("http://localhost:3050/pie/countries")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          countries: data,
        });
      })
      .catch((er) => console.log(er));
  }

  apiFetchPost(country) {
    console.log("apiFetch POST contatti");
    fetch("http://localhost:3050/pie", {
      method: "POST",
      body: JSON.stringify({ country: country }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
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
    var { dataCompanyCountry, isLoaded, pieOrDonut, countries } = this.state;

    const listItems = countries.map((country) => (
      <Button
        key={country.country.toString()}
        onClick={() => {
          this.apiFetchPost(country.country);
        }}
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
        }}
      >
        {country.country}
      </Button>
    ));

    if (isLoaded) {
      return (
        <>
          <Box>
            <Button
              onClick={() => {
                let p;
                if (pieOrDonut === 0.4) p = 0;
                else p = 0.4;

                this.setState({
                  pieOrDonut: p,
                });
              }}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              Donut/Pie
            </Button>
            <Button
              onClick={() => {
                this.getCountriesPurchase();
              }}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              Countries
            </Button>
          </Box>

          <Box> {listItems}</Box>

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
            //colors={{ datum: 'data.color' }}
            margin={{ top: 10, right: 100, bottom: 180, left: 80 }}
            innerRadius={pieOrDonut}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={colors.grey[900]}
            arcLinkLabelsThickness={2}
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
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 56,
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
