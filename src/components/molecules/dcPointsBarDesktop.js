import React from 'react'
import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    Legend,
    Rectangle,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from "recharts";

export default function DcPointsBarDesktop({handleClick, chartData, previousClick}) {
  return (
    <div className="hidden md:block">
                <ResponsiveContainer width={"100%"} aspect={16.0 / 5.0}>
                  <BarChart
                    onClick={handleClick}
                    width={500}
                    height={300}
                    data={
                      chartData && chartData.length > 0
                        ? chartData.map((x) => {
                            return {
                              'Total de Dc Points': x.totalCantidad,
                              name: x.apmCarga,
                            };
                          })
                        : []
                    }
                    margin={{
                      top: 0,
                      right: 30,
                      left: -10,
                      bottom: 105,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      fontSize={"16px"}
                      angle={-45}
                      interval={0}
                      textAnchor="end"
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend
                      verticalAlign="top"
                      wrapperStyle={{
                        textAlign: "center", // Centrar horizontalmente
                        marginTop: "-10px",
                        position: "relative",
                        width: "100%", // Asegurar que ocupa todo el ancho
                      }}
                    />

                    <Bar
                      dataKey="Total de Dc Points"
                      fill="#d46611"
                      activeBar={<Rectangle fill="pink" stroke="blue" />}
                    >
                      <LabelList
                        dataKey="Total de Dc Points"
                        position="top"
                        fontSize={"12px"}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
  )
}
