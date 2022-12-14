import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {green, orange, red} from "@mui/material/colors";
import styled from "styled-components";
import {Paper, Typography, useTheme} from "@mui/material";
import {useRecoilValue} from "recoil";
import {state} from '../atoms/app-atoms'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Container = styled.div`
  display: grid;
  grid-template-rows: 3fr 1fr;
  height: calc(100% - 3.5rem);
  place-items: center;
`

// Returns 1 if up, 0 if down
const getPercentDifference = (min: number, max: number) => {
  if (max > min) {
    const difference = (max - min) / min
    const percent = (difference * 100).toFixed(2)

    return [1, percent]
  } else {
    const difference = ((max - min) / max) * -1 // Remove negative because inverse percentage
    const percent = (difference * 100).toFixed(2)

    return [0, percent]
  }
}

export const History = () => {
  const priceHistory = useRecoilValue(state.history)
  const LENGTH = priceHistory.length
  const labels = new Array<string>(LENGTH).fill("")

  const theme = useTheme()
  const isDarkmode = theme.palette.mode === 'dark';

  const data = {
    labels,
    datasets: [
      {
        data: priceHistory,
        borderColor: orange[500],
        backgroundColor: orange[700],
        tension: 0.2
      },
    ],
  };

  const [up, percent] = getPercentDifference(priceHistory[0], priceHistory[LENGTH -1])

  return (
    <Container>
      <Line options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(ctx) {
                return "$" + ctx.raw
              }
            }
          }
        },
        scales: {
          y: {
            min: 0,
            ticks: {
              callback: (value: string) => '$' + value
            },
            grid: {
              display: false,
              borderColor: isDarkmode ? "#f5f5f5" : "#3F3F3FA6"
            },
          },
          x: {
            grid: {
              display: false,
              borderColor: isDarkmode ? "#f5f5f5" : "#3F3F3FA6"
            }
          }
        },
      }} data={data}/>
      <Paper sx={{
        height: 50,
        width: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }} elevation={3} variant={"outlined"}>
        <Typography sx={{
          color: up === 1? green[500] : red[500],
          fontWeight: "bold"
        }}>
          {up === 1 ?
            "Up " + percent + "%" :
            "Down " + percent + "%"
          }
        </Typography>
      </Paper>
    </Container>
  )
}