"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface SolutionItemBottomProps {}
type iconName = "like" | "dislike" | "flower" | "comment";
type IconProps = { color: string; onClick: (a: iconName) => void };
const LikeIcon = ({ color, onClick }: IconProps) => (
  <svg
    onClick={() => onClick("like")}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    version="1.1"
    width="18.33333396911621"
    height="16.533300399780273"
    viewBox="0 0 18.33333396911621 16.533300399780273"
  >
    <g>
      <path
        d="M0.833333,6.5333L3.33333,6.5333L3.33333,16.5333L0.833333,16.5333C0.373096,16.5333,0,16.1602,0,15.7L0,7.36663C0,6.9064,0.373096,6.5333,0.833333,6.5333ZM5.24417,5.4558L10.5775,0.122467C10.7241,-0.0245092,10.9564,-0.0412095,11.1225,0.0833001L11.8333,0.616633C12.237,0.91969,12.4188,1.43581,12.2942,1.92497L11.3333,5.69997L16.6667,5.69997C17.5871,5.69997,18.3333,6.44616,18.3333,7.36663L18.3333,9.11997C18.3336,9.33777,18.2911,9.5535,18.2083,9.75497L15.6292,16.0175C15.5005,16.3297,15.1961,16.5334,14.8583,16.5333L5.83333,16.5333C5.3731,16.5333,5,16.1602,5,15.7L5,6.04497C5.00005,5.82397,5.08788,5.61204,5.24417,5.4558Z"
        fill={color}
        fill-opacity="1"
      />
    </g>
  </svg>
);
const CommentIcon = ({ color, onClick }: IconProps) => (
  <svg
    onClick={() => onClick("comment")}
    className="mr-2"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    version="1.1"
    width="15.999991416931152"
    height="16"
    viewBox="0 0 15.999991416931152 16"
  >
    <g>
      <path
        d="M0.00000104904,5.32801C-0.00177231,2.38253,2.14908,-0.00490972,4.8,0.0000084771L11.2,0.0000084771C13.8504,0.0000084771,16,2.39556,16,5.32801L16,16L4.8,16C2.1496,16,0.00000104904,13.6044,0.00000104904,10.672L0.00000104904,5.32801ZM9.59999,7.11112L9.59999,8.88889L11.2,8.88889L11.2,7.11112L9.59999,7.11112ZM4.8,7.11112L4.8,8.88889L6.4,8.88889L6.4,7.11112L4.8,7.11112Z"
        fill={color}
        fillOpacity="1"
      />
    </g>
  </svg>
);
const DislikeIcon = ({ color, onClick }: IconProps) => (
  <svg
    onClick={() => onClick("dislike")}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    version="1.1"
    width="18.33333396911621"
    height="16.533300399780273"
    viewBox="0 0 18.33333396911621 16.533300399780273"
  >
    <g transform="matrix(1,0,0,-1,0,33.06660079956055)">
      <path
        d="M0.833333,23.066600399780274L3.33333,23.066600399780274L3.33333,33.06660039978027L0.833333,33.06660039978027C0.373096,33.06660039978027,0,32.69350039978028,0,32.233300399780276L0,23.899930399780274C0,23.43970039978027,0.373096,23.066600399780274,0.833333,23.066600399780274ZM5.24417,21.989100399780273L10.5775,16.655767399780274C10.7241,16.508791199780273,10.9564,16.492090899780273,11.1225,16.616600499780272L11.8333,17.149933399780274C12.237,17.452990399780273,12.4188,17.969110399780273,12.2942,18.458270399780275L11.3333,22.233270399780274L16.6667,22.233270399780274C17.5871,22.233270399780274,18.3333,22.979460399780272,18.3333,23.899930399780274L18.3333,25.653270399780276C18.3336,25.871070399780272,18.2911,26.086800399780273,18.2083,26.288270399780274L15.6292,32.55080039978027C15.5005,32.863000399780276,15.1961,33.066700399780274,14.8583,33.06660039978027L5.83333,33.06660039978027C5.3731,33.06660039978027,5,32.69350039978028,5,32.233300399780276L5,22.578270399780273C5.00005,22.357270399780273,5.08788,22.145340399780274,5.24417,21.989100399780273Z"
        fill={color}
        fill-opacity="1"
      />
    </g>
  </svg>
);
const FlowerIcon = ({ color, onClick }: IconProps) => (
  <svg
    onClick={() => onClick("flower")}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    version="1.1"
    width="15.509035110473633"
    height="18"
    viewBox="0 0 15.509035110473633 18"
  >
    <g>
      <path
        d="M0.128214,11.3965Q1.4454,11.1102,2.75304,11.4633Q4.06068,11.8165,5.09152,12.8091Q5.58785,13.3055,5.93146,13.9259Q6.27507,14.5463,6.45642,15.2144Q6.63777,15.8826,6.64732,16.5698Q6.65686,17.257,6.52324,17.887Q5.22514,18.1733,3.90796,17.7343Q2.59078,17.2952,1.57903,16.2834Q0.548186,15.2908,0.195028,13.9831Q-0.15813,12.6755,0.128214,11.3965ZM15.3808,11.3965Q15.6672,12.6755,15.314,13.9831Q14.9608,15.2908,13.9491,16.2834Q13.4528,16.7798,12.7846,17.1138Q12.1165,17.4479,11.372,17.6484Q10.6275,17.8488,9.83529,17.9156Q9.04307,17.9824,8.27948,17.9442L7.17229,17.9442L7.17229,10.7665Q6.06509,10.652,5.11061,10.1557Q4.36611,9.77388,3.7457,9.2012Q3.12528,8.62851,2.68622,7.92219Q2.24716,7.21588,1.999,6.39502Q1.75083,5.57417,1.75083,4.67696Q1.75083,3.47431,2.22807,2.34802Q3.14437,2.5771,3.9175,3.04479Q4.69063,3.51249,5.3015,4.18063Q5.47331,2.88253,6.15099,1.80397Q6.82867,0.725405,7.85951,0Q8.92853,0.725406,9.60621,1.8326Q10.2839,2.9398,10.4366,4.25699Q11.0475,3.58885,11.8302,3.10206Q12.6128,2.61528,13.5291,2.3862Q13.9682,3.47431,13.9682,4.67696Q13.9682,5.55508,13.7296,6.37593Q13.4909,7.19679,13.0423,7.9031Q12.5937,8.60942,11.9829,9.18211Q11.372,9.7548,10.6275,10.1366L10.6275,10.1557Q10.093,10.4229,9.52985,10.5852Q8.96671,10.7475,8.35584,10.7856L8.35584,15.9207Q8.58492,15.1381,9.06216,14.4222Q9.5394,13.7063,10.1694,13.0955Q10.6657,12.5991,11.3052,12.2174Q11.9447,11.8356,12.6319,11.6065Q13.3191,11.3774,14.0255,11.3201Q14.7318,11.2629,15.3808,11.3965Z"
        fill={color}
        fill-opacity="1"
      />
    </g>
  </svg>
);
const SolutionItemBottom: React.FC<SolutionItemBottomProps> = (props) => {
  const {} = props;

  const data: { name: iconName; Icon: (color: string) => React.ReactNode }[] = [
    {
      name: "like",
      Icon: (color: string) => <LikeIcon color={color} onClick={handleClick} />,
    },
    { name: "dislike", Icon: (color: string) => <DislikeIcon color={color} onClick={handleClick} /> },
    { name: "flower", Icon: (color: string) => <FlowerIcon color={color} onClick={handleClick} /> },
    { name: "comment", Icon: (color: string) => <CommentIcon color={color} onClick={handleClick} /> },
  ];

  const initialColors = {
    like: 0,
    dislike: 0,
    flower: 0,
    comment: 0,
  };
  const [colors, setColors] = useState<{ like: number; dislike: number; flower: number; comment: number }>(
    initialColors
  );

  const handleClick = (icon: iconName) => {
    const newColor = colors[icon] == 0 ? 1 : 0;
    console.log(newColor, colors, icon);
    setColors((prev) => ({ ...prev, [icon]: newColor }));
  };
  return (
    <div className={"mt-8"}>
      <div className="flex justify-between">
        <div className="flex items-center">
          {data.map((item, value) => {
            return (
              <div className="flex items-center" key={item.name}>
                {item.Icon(`${colors[item.name] ? "#FF7D37" : "#797979"}`)}
                <span className={`ml-2 mr-7 font-yahei text-[#797979] ${value == 0 ? "font-bold" : ""}`}>12</span>
              </div>
            );
          })}
        </div>
        <div>
          <Button className="mr-2">再次作答</Button>
          <Button
            variant={"outline"}
            className="border-primary  text-primary hover:text-primary  mr-2 hover:bg-accent/20"
          >
            换题挑战
          </Button>
        </div>
      </div>
    </div>
  );
};
export default SolutionItemBottom;
