"use client"
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { useSession } from 'next-auth/react';
import { Loading, showToast, TOAST_TYPES } from '@/utils';

// Dynamically import react-apexcharts with SSR disabled
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


export default function CPDChart() {

  const { data: session } = useSession()

  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)

  const getChartData = () => {

    fetch(`/api/summary?user_token=${session?.user.token}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json()
      })
      .then((result) => {
        setData(result.data.hours_data);
        setLabels(result.data.titles_data)
        setLoading(false)
      }).catch((_) => {
        setLoading(false)
        showToast(TOAST_TYPES.ERROR, 'Something went wrong on getting the chart data');
      })
  }

  useEffect(() => {
    getChartData();
  }, [])

  const chartConfig = {
    type: "line",
    height: 240,
    series: [
      {
        name: "Logged Hours",
        data: [...data],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        style: { paddingLeft: 10 },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "9px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [...labels],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };
  return (
    <>
      {loading ? (
        <div className='flex items-center justify-center'>
          <Loading size={8} />
        </div>
      ) : (
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            {/* <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
          <Square3Stack3DIcon className="h-6 w-6" />
        </div> */}
            <div className='px-6'>
              <Typography variant="h6" color="blue-gray">
                Logged Houres
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="max-w-sm font-normal"
              >
                This chart explains your logged hours with titles
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="px-0 mx-6 pb-0">
            <Chart {...chartConfig} />
          </CardBody>
        </Card>

      )}
    </>
  );
}
