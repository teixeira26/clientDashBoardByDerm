import { createContext, useEffect, useState } from "react";
import { getMonthInSpanish } from "../Services/Grafics/getMonthInSpanish";
import visitsPerMonth from "../Services/Grafics/visitsPerMonth";
import { getAllVisitsWithComments } from "../Services/Grafics/getAllVisitsWithComments";
import { visitsPerApm } from "../Services/Grafics/visitsPerAPM";
import { filterVisitsByDateRange } from "../Services/Grafics/filterVisitsByRange";
import { visitsPerAPMPerDay } from "../Services/Grafics/visitsPerAPMPerDay";
import { BACKEND_URL } from "../constants/constants";
import { getRealAPMName } from "../Services/getRealApmNames";

export const visitsGraphicContext = createContext();

 const VisitsGraphicProvider = ({children})=>{
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

      return ( <visitsGraphicContext.Provider value={{
      infoFiltered,
        chartData,
        comments,
        actualMonth,
        actualApm,
        title,
        handleClick,
        handleZoomOut,
        handleNextMonthClick,
        handlePreviousMonthClick,
        setActualMonth,
        setInfoFiltered,
        setChartData,
        setComments,
        setVisitsCardValue,
        setVisitsCardPorcentage,
        setVisitsCardTitle,
        visitsCardPorcentage,
        visitsCardTitle,
        visitsCardValue
      }}>
      {children}
      </visitsGraphicContext.Provider>)
        
    
}


export default VisitsGraphicProvider ;