import React from 'react'
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import BarChart from '../charts/BarChart';
import GeoChart from '../charts/GeoChart';
import PieChart from '../charts/PieChart';
import AccordionDash from './AccordionDash';

function DashBaord() {
  return (
    <div className='p-4 bg-[#C9D1F3]'>
        <Grid container spacing={2}>
            <Grid item xs={8}>
            <Card sx={{ height: 60 + "vh" }}>
                <CardContent>
                <BarChart />
                </CardContent>
            </Card>
            </Grid>
            <Grid item xs={4}>
            <Card sx={{ height: 60 + "vh" }}>
                <CardContent>
                <div className="paddingall">
                    <span className="pricetitle">Popular Products</span>
                </div>
                <AccordionDash />
                </CardContent>
            </Card>
            </Grid>
        </Grid>
        <Box height={30} />
        <Grid container spacing={2}>
            <Grid item xs={8}>
            <Card sx={{ height: 60 + "vh" }}>
                <CardContent>
                <GeoChart />
                </CardContent>
            </Card>
            </Grid>
            <Grid item xs={4}>
            <Card sx={{ height: 60 + "vh" }}>
                <CardContent>
                <PieChart />
                </CardContent>
            </Card>
            </Grid>
        </Grid>
    </div>
  )
}

export default DashBaord