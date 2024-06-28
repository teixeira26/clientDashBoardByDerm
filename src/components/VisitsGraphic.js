import React, { useContext } from "react";
import useVisitFunctions, {
  visitsGraphicContext,
} from "../contexts/visitsContext";
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
import Skeleton from "react-loading-skeleton";
function convertDateFormat(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

export default function VisitsGraphic() {
  const {
    chartData,
    comments,
    title,
    handleClick,
    handleZoomOut,
    handleNextMonthClick,
    handlePreviousMonthClick,
  } = useContext(visitsGraphicContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-full ">
      <div className="w-full overflow-x-scroll md:overflow-hidden col-span-2 shadow">
        <div
          className="w-[180%] md:w-full aspect-[20/20] md:aspect-[16/8] rounded-[4px] flex justify-start gap-2 flex-col pb-5  "
          id="left-box"
        >
          <div className="flex justify-between items-center pt-6 w-full">
            <div className="flex">
              <p className="font-semibold leading-none max-w-[250px] tracking-tight px-6">
                {title}
              </p>
            </div>

            <div className="flex absolute right-2 md:relative">
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

          {chartData && chartData.length > 0 ? (
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
                          sum:
                            x.totalMedico + x.totalFarmacias + x.totalWhatsApp,
                          name:
                            title.includes(
                              "Tus visitas en los últimos meses"
                            ) || title.includes("Visitas de")
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
                  {!(
                    title.includes("Visitas de") &&
                    title.includes("en los últimos meses")
                  ) &&
                    chartData.length > 0 && (
                      <LabelList
                        dataKey="sum"
                        position="top"
                        fontSize={"12px"}
                      ></LabelList>
                    )}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="m-4">
              <Skeleton width={"100%"} height={"60vh"}></Skeleton>
            </div>
          )}
        </div>
        {!title.includes("Visitas por APM") && (
          <div
            className="hover:bg-[#00000025] cursor-pointer absolute left-8 translate-y-[-64px] "
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

      <div
        className=" overflow-y-scroll w-full rounded-[4px] max-h-[60vh] flex justify-start gap-2 flex-col shadow pb-5 "
        id="right-box"
      >
        <p className="font-semibold leading-none tracking-tight px-6 pt-6 pb-6">
          Ultimos comentarios realizados
        </p>
        <hr />
        {comments ? (
          <div className="px-6">
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
                    {x.tipoDeContacto?.toLowerCase() === "medico" ? "el" : "la"}{" "}
                    {x.tipoDeContacto?.toLowerCase()}{" "}
                    <span className="font-semibold">{x.contacto}</span>
                  </p>
                  <div></div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="px-4 w-100% pb-4">
            <Skeleton width={"100%"} height={"60vh"}></Skeleton>
          </div>
        )}
      </div>
    </div>
  );
}
