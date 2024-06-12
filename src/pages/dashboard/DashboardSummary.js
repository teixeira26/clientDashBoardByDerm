import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

import PrintButton from "../../components/Buttons/PrintButton";
import RefreshButton from "../../components/Buttons/RefreshButton";
import InfoCard from "../../components/InfoCard";
import { BACKEND_URL } from "../../constants/constants";
import visitsPerMonth from "../../Services/Grafics/visitsPerMonth";
import { visitsPerApm } from "../../Services/Grafics/visitsPerAPM";
import { visitsPerAPMPerDay } from "../../Services/Grafics/visitsPerAPMPerDay";
import { getAllVisitsWithComments } from "../../Services/Grafics/getAllVisitsWithComments";
import { getRealAPMName } from "../../Services/getRealApmNames";
import { getMonthInSpanish } from "../../Services/Grafics/getMonthInSpanish";
import { filterVisitsByDateRange } from "../../Services/Grafics/filterVisitsByRange";

function convertDateFormat(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

const DashboardSummary = () => {
  const [infoUnfiltered, setInfoUnfiltered] = useState(null);
  const [infoFiltered, setInfoFiltered] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [comments, setComments] = useState(null);
  const [actualMonth, setActualMonth] = useState(null);
  const [actualApm, setActualApm] = useState(null);
  const [title, setTitle] = useState(
    `Visitas por APM - ${getMonthInSpanish(new Date().getMonth())} 2024`
  );
  const [visitsCardValue, setVisitsCardValue] = useState(null);
  const [visitsCardTitle, setVisitsCardTitle] = useState(
    "Visitas en el més de"
  );
  const [visitsCardPorcentage, setVisitsCardPorcentage] = useState(null);

  window.addEventListener("load", () => {
    const leftBox = document.getElementById("left-box");
    const rightBox = document.getElementById("right-box");
    rightBox.style.height = `${leftBox.offsetHeight}px`;
  });

  window.addEventListener("resize", () => {
    const leftBox = document.getElementById("left-box");
    const rightBox = document.getElementById("right-box");
    rightBox.style.height = `${leftBox.offsetHeight}px`;
    rightBox.style.maxHeight = `${leftBox.offsetHeight}px`;
  });

  const handleClick = (event) => {
    const { activeTooltipIndex } =
      event.chartX && event.chartY ? event : { activeTooltipIndex: -1 };

    if (activeTooltipIndex >= 0) {
      if (title.includes("Visitas por APM")) {
        setChartData(
          visitsPerApm(
            chartData[activeTooltipIndex].apm,
            filterVisitsByDateRange(infoFiltered)
          )
        );
        setVisitsCardValue(
          visitsPerApm(
            chartData[activeTooltipIndex].apm,
            filterVisitsByDateRange(infoFiltered)
          ).reduce((acc, curr) => {
            return (
              acc + curr.totalFarmacias + curr.totalMedico + curr.totalWhatsApp
            );
          }, 0)
        );

        setVisitsCardTitle(
          `Visitas totales de ${chartData[activeTooltipIndex].apm} en los últimos meses`
        );
        setVisitsCardPorcentage(null);

        setActualApm(chartData[activeTooltipIndex].apm);
        setComments(
          filterVisitsByDateRange(infoFiltered)
            .filter((x) => x.APM === chartData[activeTooltipIndex].apm)
            .map((visit) => {
              return {
                comentarios: visit["COMENTARIOS"],
                apm: visit.APM,
                fecha: visit.FECHA,
                tipoDeContacto: visit["TIPO DE CONTACTO"],
                tipoDeVisita: visit["TIPO DE VISITA"],
                contacto: visit["CONTACTO"],
              };
            })
        );
        setTitle(
          `Visitas de ${chartData[activeTooltipIndex].apm} en los últimos meses`
        );
      }
      if (title.includes("en los últimos meses")) {
        setChartData(
          visitsPerAPMPerDay(
            infoFiltered,
            chartData[activeTooltipIndex].apm,
            parseInt(chartData[activeTooltipIndex].fecha.split("/")[0])
          )
        );
        setVisitsCardValue(
          visitsPerAPMPerDay(
            infoFiltered,
            chartData[activeTooltipIndex].apm,
            parseInt(chartData[activeTooltipIndex].fecha.split("/")[0])
          ).reduce((acc, curr) => {
            return (
              acc + curr.totalFarmacias + curr.totalMedico + curr.totalWhatsApp
            );
          }, 0)
        );

        setVisitsCardPorcentage(
          Math.ceil(
            (visitsPerAPMPerDay(
              infoFiltered,
              chartData[activeTooltipIndex].apm,
              parseInt(chartData[activeTooltipIndex].fecha.split("/")[0])
            ).reduce((acc, curr) => {
              return (
                acc +
                curr.totalFarmacias +
                curr.totalMedico +
                curr.totalWhatsApp
              );
            }, 0) *
              100) /
              visitsPerAPMPerDay(
                infoFiltered,
                chartData[activeTooltipIndex].apm,
                parseInt(chartData[activeTooltipIndex].fecha.split("/")[0]) - 1
              ).reduce((acc, curr) => {
                return (
                  acc +
                  curr.totalFarmacias +
                  curr.totalMedico +
                  curr.totalWhatsApp
                );
              }, 0)
          ) - 100
        );

        setVisitsCardTitle(
          `Visitas totales de ${
            chartData[activeTooltipIndex].apm
          } en ${getMonthInSpanish(
            chartData[activeTooltipIndex].fecha.split("/")[0] - 1
          )}`
        );
        setActualMonth(
          parseInt(chartData[activeTooltipIndex].fecha.split("/")[0])
        );
        setComments(
          infoFiltered
            .filter((x) => {
              const visitDate = new Date(x.FECHA);
              const chartDate = parseInt(
                chartData[activeTooltipIndex].fecha.split("/")[0]
              );
              return (
                x.APM === chartData[activeTooltipIndex].apm &&
                visitDate.getMonth() === chartDate - 1
              );
            })
            .map((visit) => {
              return {
                comentarios: visit["COMENTARIOS"],
                apm: visit.APM,
                fecha: visit.FECHA,
                tipoDeContacto: visit["TIPO DE CONTACTO"],
                tipoDeVisita: visit["TIPO DE VISITA"],
                contacto: visit["CONTACTO"],
              };
            })
        );
        setTitle(
          `Visitas de ${chartData[activeTooltipIndex].apm} - ${chartData[activeTooltipIndex].fecha}`
        );
      }
    }
  };

  useEffect(() => {
    fetch(`${BACKEND_URL}/visits/getAll`)
      .then(async (res) => {
        let response = await res.json();
        response = response.map((x) => {
          return { ...x, APM: getRealAPMName(x.APM) };
        });
        setActualMonth(new Date().getMonth());
        setInfoFiltered(response);
        setChartData(visitsPerMonth(response, new Date().getMonth()));
        setComments(getAllVisitsWithComments(response));
        setVisitsCardValue(
          visitsPerMonth(response, new Date().getMonth()).reduce(
            (acc, curr) => {
              return (
                acc +
                curr.totalFarmacias +
                curr.totalMedico +
                curr.totalWhatsApp
              );
            },
            0
          )
        );

        setVisitsCardPorcentage(
          Math.ceil(
            (visitsPerMonth(response, new Date().getMonth()).reduce(
              (acc, curr) => {
                return (
                  acc +
                  curr.totalFarmacias +
                  curr.totalMedico +
                  curr.totalWhatsApp
                );
              },
              0
            ) *
              100) /
              visitsPerMonth(response, new Date().getMonth() - 1).reduce(
                (acc, curr) => {
                  return (
                    acc +
                    curr.totalFarmacias +
                    curr.totalMedico +
                    curr.totalWhatsApp
                  );
                },
                0
              )
          ) - 100
        );
        setVisitsCardTitle(
          `Visitas totales en el més de ${getMonthInSpanish(
            new Date().getMonth()
          )}`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleZoomOut = () => {
    setChartData(visitsPerMonth(infoFiltered, new Date().getMonth()));
    setVisitsCardValue(
      visitsPerMonth(infoFiltered, new Date().getMonth()).reduce(
        (acc, curr) => {
          return (
            acc + curr.totalFarmacias + curr.totalMedico + curr.totalWhatsApp
          );
        },
        0
      )
    );
    setVisitsCardPorcentage(
      Math.ceil(
        (visitsPerMonth(infoFiltered, new Date().getMonth()).reduce(
          (acc, curr) => {
            return (
              acc + curr.totalFarmacias + curr.totalMedico + curr.totalWhatsApp
            );
          },
          0
        ) *
          100) /
          visitsPerMonth(infoFiltered, new Date().getMonth() - 1).reduce(
            (acc, curr) => {
              return (
                acc +
                curr.totalFarmacias +
                curr.totalMedico +
                curr.totalWhatsApp
              );
            },
            0
          )
      ) - 100
    );
    setVisitsCardTitle(
      `Visitas totales en el més de ${getMonthInSpanish(new Date().getMonth())}`
    );

    setComments(getAllVisitsWithComments(infoFiltered));
    setActualMonth(new Date().getMonth());
    setTitle(
      `Visitas por APM - ${getMonthInSpanish(new Date().getMonth())} 2024`
    );
  };

  const handlePreviousMonthClick = () => {
    if (actualMonth > new Date().getMonth() - 2) {
      const month = actualMonth - 1; // Ajusta para obtener el mes anterior
      if (title.includes("Visitas por APM")) {
        setChartData(visitsPerMonth(infoFiltered, month));
        setVisitsCardValue(
          visitsPerMonth(infoFiltered, month).reduce((acc, curr) => {
            return (
              acc + curr.totalFarmacias + curr.totalMedico + curr.totalWhatsApp
            );
          }, 0)
        );
        setVisitsCardPorcentage(
          Math.ceil(
            (visitsPerMonth(infoFiltered, month).reduce((acc, curr) => {
              return (
                acc +
                curr.totalFarmacias +
                curr.totalMedico +
                curr.totalWhatsApp
              );
            }, 0) *
              100) /
              visitsPerMonth(infoFiltered, month - 1).reduce((acc, curr) => {
                return (
                  acc +
                  curr.totalFarmacias +
                  curr.totalMedico +
                  curr.totalWhatsApp
                );
              }, 0)
          ) - 100
        );
        setTitle(`Visitas por APM - ${getMonthInSpanish(month)} 2024`);
        setVisitsCardTitle(
          `Visitas por APM en el mes de ${getMonthInSpanish(month)}`
        );
        setActualMonth(month);
      }

      if (
        title.includes("Visitas de") &&
        !title.includes("en los últimos meses")
      ) {
        setChartData(visitsPerAPMPerDay(infoFiltered, actualApm, month + 1));
        setVisitsCardValue(
          visitsPerAPMPerDay(infoFiltered, actualApm, month + 1).reduce(
            (acc, curr) => {
              return (
                acc +
                curr.totalFarmacias +
                curr.totalMedico +
                curr.totalWhatsApp
              );
            },
            0
          )
        );
        setVisitsCardPorcentage(
          Math.ceil(
            (visitsPerAPMPerDay(infoFiltered, actualApm, month + 1).reduce(
              (acc, curr) => {
                return (
                  acc +
                  curr.totalFarmacias +
                  curr.totalMedico +
                  curr.totalWhatsApp
                );
              },
              0
            ) *
              100) /
              visitsPerAPMPerDay(infoFiltered, actualApm, month).reduce(
                (acc, curr) => {
                  return (
                    acc +
                    curr.totalFarmacias +
                    curr.totalMedico +
                    curr.totalWhatsApp
                  );
                },
                0
              )
          ) - 100
        );
        setVisitsCardTitle(
          `Visitas totales de ${actualApm} en ${getMonthInSpanish(month)}`
        );

        setComments(
          infoFiltered
            .filter((x) => {
              const visitDate = new Date(x.FECHA);
              return x.APM === actualApm && visitDate.getMonth() === month;
            })
            .map((visit) => {
              return {
                comentarios: visit["COMENTARIOS"],
                apm: visit.APM,
                fecha: visit.FECHA,
                tipoDeContacto: visit["TIPO DE CONTACTO"],
                tipoDeVisita: visit["TIPO DE VISITA"],
                contacto: visit["CONTACTO"],
              };
            })
        );
        setTitle(
          `Visitas de ${actualApm} - ${month + 1}/${new Date().getFullYear()}`
        );
        setActualMonth(month);
      }
    }
  };

  const handleNextMonthClick = () => {
    if (actualMonth < new Date().getMonth()) {
      const month = actualMonth + 1; // Ajusta para obtener el mes siguiente
      if (title.includes("Visitas por APM")) {
        setChartData(visitsPerMonth(infoFiltered, month));
        setTitle(`Visitas por APM - ${getMonthInSpanish(month)} 2024`);
        setActualMonth(month);
        setVisitsCardValue(
          visitsPerMonth(infoFiltered, month).reduce((acc, curr) => {
            return (
              acc + curr.totalFarmacias + curr.totalMedico + curr.totalWhatsApp
            );
          }, 0)
        );

        setVisitsCardPorcentage(
          Math.ceil(
            (visitsPerMonth(infoFiltered, month).reduce((acc, curr) => {
              return (
                acc +
                curr.totalFarmacias +
                curr.totalMedico +
                curr.totalWhatsApp
              );
            }, 0) *
              100) /
              visitsPerMonth(infoFiltered, month - 1).reduce((acc, curr) => {
                return (
                  acc +
                  curr.totalFarmacias +
                  curr.totalMedico +
                  curr.totalWhatsApp
                );
              }, 0)
          ) - 100
        );
        setVisitsCardTitle(
          `Visitas por APM en el mes de ${getMonthInSpanish(month)}`
        );
      }

      if (
        title.includes("Visitas de") &&
        !title.includes("en los últimos meses")
      ) {
        setChartData(visitsPerAPMPerDay(infoFiltered, actualApm, month + 1));
        setComments(
          infoFiltered
            .filter((x) => {
              const visitDate = new Date(x.FECHA);
              return x.APM === actualApm && visitDate.getMonth() === month;
            })
            .map((visit) => {
              return {
                comentarios: visit["COMENTARIOS"],
                apm: visit.APM,
                fecha: visit.FECHA,
                tipoDeContacto: visit["TIPO DE CONTACTO"],
                tipoDeVisita: visit["TIPO DE VISITA"],
                contacto: visit["CONTACTO"],
              };
            })
        );
        setTitle(
          `Visitas de ${actualApm} - ${month + 1}/${new Date().getFullYear()}`
        );
        setActualMonth(month);
        setVisitsCardValue(
          visitsPerAPMPerDay(infoFiltered, actualApm, month + 1).reduce(
            (acc, curr) => {
              return (
                acc +
                curr.totalFarmacias +
                curr.totalMedico +
                curr.totalWhatsApp
              );
            },
            0
          )
        );
        setVisitsCardPorcentage(
          Math.ceil(
            (visitsPerAPMPerDay(infoFiltered, actualApm, month + 1).reduce(
              (acc, curr) => {
                return (
                  acc +
                  curr.totalFarmacias +
                  curr.totalMedico +
                  curr.totalWhatsApp
                );
              },
              0
            ) *
              100) /
              visitsPerAPMPerDay(infoFiltered, actualApm, month).reduce(
                (acc, curr) => {
                  return (
                    acc +
                    curr.totalFarmacias +
                    curr.totalMedico +
                    curr.totalWhatsApp
                  );
                },
                0
              )
          ) - 100
        );
        setVisitsCardTitle(
          `Visitas totales de ${actualApm} en ${getMonthInSpanish(month)}`
        );
      }
    }
  };

  return (
    <div className="p-4 mt-16">
      <div className="flex justify-between mb-6">
        <RefreshButton />
        <PrintButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4  gap-4 mb-4">
        <InfoCard
          porcentaje={visitsCardPorcentage}
          name={visitsCardTitle}
          status={visitsCardValue}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          }
        />
        <InfoCard
          porcentaje={""}
          name={"Recetas en el més de Junio"}
          status={"Proximamente"}
          desktop
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="h-4 w-4 text-muted-foreground"
            >
              <path
                d="M7.2 21C6.07989 21 5.51984 21 5.09202 20.782C4.71569 20.5903 4.40973 20.2843 4.21799 19.908C4 19.4802 4 18.9201 4 17.8V6.2C4 5.07989 4 4.51984 4.21799 4.09202C4.40973 3.71569 4.71569 3.40973 5.09202 3.21799C5.51984 3 6.0799 3 7.2 3H16.8C17.9201 3 18.4802 3 18.908 3.21799C19.2843 3.40973 19.5903 3.71569 19.782 4.09202C20 4.51984 20 5.0799 20 6.2V7M8 7H14M8 15H9M8 11H12M11.1954 20.8945L12.5102 20.6347C13.2197 20.4945 13.5744 20.4244 13.9052 20.2952C14.1988 20.1806 14.4778 20.0317 14.7365 19.8516C15.0279 19.6486 15.2836 19.393 15.7949 18.8816L20.9434 13.7332C21.6306 13.0459 21.6306 11.9316 20.9434 11.2444C20.2561 10.5571 19.1418 10.5571 18.4546 11.2444L13.2182 16.4808C12.739 16.96 12.4994 17.1996 12.3059 17.4712C12.1341 17.7123 11.9896 17.9717 11.8751 18.2447C11.7461 18.5522 11.6686 18.882 11.5135 19.5417L11.1954 20.8945Z"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
        />
        <InfoCard
          porcentaje={""}
          name={"Previstos hechos en el més de Junio"}
          status={"Proximamente"}
          desktop
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          }
        />
        <InfoCard
          porcentaje={""}
          name={"Transfers hechos en el més de Junio"}
          status={"Proximamente"}
          desktop
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2"></rect>
              <path d="M2 10h20"></path>
            </svg>
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div
          className="w-[180%] md:w-full aspect-[12/20] md:aspect-[16/8] rounded-[4px] flex justify-start gap-2 flex-col shadow pb-5 col-span-2 "
          id="left-box"
        >
          <div className="flex justify-between items-center pt-6">
            <div className="flex">
              <p className="font-semibold leading-none tracking-tight px-6 pb-2">
                {title}
              </p>
              {!title.includes("Visitas por APM") && (
                <div
                  className="hover:bg-[#00000025] cursor-pointer"
                  onClick={() => handleZoomOut()}
                  title="Zoom out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32px"
                    height="32px"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M15 4V7C15 8.10457 15.8954 9 17 9H20M9 4V7C9 8.10457 8.10457 9 7 9H4M15 20V17C15 15.8954 15.8954 15 17 15H20M9 20V17C9 15.8954 8.10457 15 7 15H4"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex">
              <div
                className="hover:bg-[#00000025] mr-6 cursor-pointer"
                onClick={() => handlePreviousMonthClick()}
                title="Més Anterior"
              >
                <svg
                  className=" rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32px"
                  height="32px"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"
                    fill="#0F0F0F"
                  />
                </svg>
              </div>
              <div
                className="hover:bg-[#00000025] mr-6 cursor-pointer"
                onClick={() => handleNextMonthClick()}
                title="Mes posterior"
              >
                <svg
                  className=""
                  xmlns="http://www.w3.org/2000/svg"
                  width="32px"
                  height="32px"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"
                    fill="#0F0F0F"
                  />
                </svg>
              </div>
            </div>
          </div>

          {
            chartData && chartData.length > 0 && 
            <ResponsiveContainer width="100%" height="78%">
            <BarChart
              onClick={handleClick}
              width={500}
              height={300}
              data={
                chartData && chartData.length > 0
                  ? chartData.map((x) => {
                      return {
                        Medicos: x.totalMedico,
                        Farmacias: x.totalFarmacias,
                        Whatsapp: x.totalWhatsApp,
                        sum: x.totalMedico + x.totalFarmacias + x.totalWhatsApp,
                        name:
                          title.includes("Tus visitas en los últimos meses") ||
                          title.includes("Visitas de")
                            ? x.fecha
                            : x.apm,
                      };
                    })
                  : []
              }
              margin={{
                top: 0,
                right: 30,
                left: -10,
                bottom: 75,
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
                  marginTop: "10px",
                  position: "relative",
                  width: "100%", // Asegurar que ocupa todo el ancho
                }}
              />
              <Bar
                dataKey="Whatsapp"
                fill="#11d466"
                stackId={
                  title.includes("Visitas de") &&
                  title.includes("en los últimos meses")
                    ? "a"
                    : "a"
                }
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              >
                {title.includes("Visitas de") &&
                  title.includes("en los últimos meses") && (
                    <LabelList
                      dataKey="Whatsapp"
                      position="top"
                      fontSize={"12px"}
                    />
                  )}
                       
              </Bar>
              <Bar
                dataKey="Medicos"
                fill="#6611d4"
                stackId={
                  title.includes("Visitas de") &&
                  title.includes("en los últimos meses")
                    ? "b"
                    : "a"
                }
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              >
                {title.includes("Visitas de") &&
                  title.includes("en los últimos meses") && (
                    <LabelList
                      dataKey="Medicos"
                      position="top"
                      fontSize={"12px"}
                    />
                  )}
         
              </Bar>

              <Bar
                dataKey="Farmacias"
                fill="#d46611"
                stackId={
                  title.includes("Visitas de") &&
                  title.includes("en los últimos meses")
                    ? "c"
                    : "a"
                }
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              >
                {title.includes("Visitas de") &&
                  title.includes("en los últimos meses") && (
                    <LabelList
                      dataKey="Farmacias"
                      position="top"
                      fontSize={"12px"}
                    />
                  )}
                         {!(title.includes("Visitas de") &&
                  title.includes("en los últimos meses")) && chartData.length > 0 && (
                    <LabelList dataKey="sum"
                     position="top"
                      fontSize={"12px"}
                    ></LabelList>
                  )}
              </Bar>
            </BarChart>
          </ResponsiveContainer>}
        </div>

        <div
          className=" overflow-y-scroll rounded-[4px] flex justify-start gap-2 flex-col shadow pb-5 "
          id="right-box"
        >
          <p className="font-semibold leading-none tracking-tight px-6 pt-6 pb-6">
            Ultimos comentarios realizados
          </p>
          <hr />
          {comments && (
            <div className="px-6 ">
              {comments.map((x, index) => {
                return (
                  <div className="" key={index}>
                    <div className="flex pt-6 pb-2 ">
                      <div className="bg-[#f8dfb7] mr-4 w-8 h-8 rounded-full flex justify-center items-center">
                        <p className="font-semibold">{x.apm ? x.apm[0] : ""}</p>
                      </div>
                      <></>
                      <p className="font-semibold leading-none tracking-tight  ">
                        {x.apm}
                      </p>
                      <p className="text-xs text-muted-foreground px-4 text-[12px]">
                        {convertDateFormat(x.fecha)}
                      </p>
                    </div>

                    <p>{x.comentarios}</p>
                    <p className="text-xs text-muted-foreground text-[12px]">
                      relacionado con{" "}
                      {x.tipoDeContacto?.toLowerCase() === "medico"
                        ? "el"
                        : "la"}{" "}
                      {x.tipoDeContacto?.toLowerCase()}{" "}
                      <span className="font-semibold">{x.contacto}</span>
                    </p>
                    <div></div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
