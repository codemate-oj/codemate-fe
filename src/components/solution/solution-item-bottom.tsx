"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { request } from "@/lib/request";
import { useLockFn } from "ahooks";
import Image from "next/image";

interface SolutionItemBottomProps {
  pid: string;
  tid?: string;
  psid: string;
  voteNumber?: number;
}
type iconName = "like" | "dislike" | "flower" | "comment";
type IconProps = { isActive: boolean; onClick: (a: iconName) => void };
const LikeIcon = ({ isActive, onClick }: IconProps) => (
  <Image
    onClick={() => onClick("like")}
    src={isActive ? "/svg/solution-like-active.svg" : "/svg/solution-like.svg"}
    alt="like"
    width={16}
    height={16}
  />
);

const DislikeIcon = ({ isActive, onClick }: IconProps) => (
  <Image
    onClick={() => onClick("dislike")}
    src={isActive ? "/svg/solution-dislike-active.svg" : "/svg/solution-dislike.svg"}
    alt="dislike"
    width={16}
    height={16}
  />
);

const SolutionItemBottom: React.FC<SolutionItemBottomProps> = (props) => {
  const { pid, psid, voteNumber } = props;

  const [voteCount, setVoteCount] = useState(Number(voteNumber));
  const [voteCountDislike, setVoteCountDislike] = useState(Number(voteNumber) < 0 ? Math.abs(Number(voteNumber)) : 0);

  const [isLike, setIsLike] = useState(false);
  const [isDisLike, setIsDisLike] = useState(false);

  const data: { name: iconName; Icon: (isActive: boolean) => React.ReactNode }[] = [
    {
      name: "like",
      Icon: () => <LikeIcon isActive={isLike} onClick={handleClick} />,
    },
    { name: "dislike", Icon: () => <DislikeIcon isActive={isDisLike} onClick={handleClick} /> },
  ];

  const likePs = useLockFn(async (pid: string, psid: string, operation: string) => {
    return request.post(
      `/p/${pid}/solution` as "/p/{pid}/solution",
      {
        psid: psid,
        operation: operation,
      },
      {
        transformData: (data) => {
          return data.data;
        },
      }
    );
  });

  const likeHandle = async (type: string) => {
    if (type === "like") {
      if (!isLike) {
        await likePs(pid, psid, "upvote");
        setVoteCount(voteCount + 1);
        setIsLike(true);
      } else {
        await likePs(pid, psid, "downvote");
        setVoteCount(voteCount - 1);
        setIsLike(false);
      }
    } else {
      if (!isDisLike) {
        await likePs(pid, psid, "downvote");
        setVoteCountDislike(voteCountDislike + 1);
        setIsDisLike(true);
      } else {
        setVoteCountDislike(voteCountDislike - 1);
        setIsDisLike(false);
      }
    }
  };

  const handleClick = (icon: iconName) => {
    switch (icon) {
      case "like":
        likeHandle("like");
        break;
      case "dislike":
        likeHandle("dislike");
        break;
    }
  };

  return (
    <div className={"mt-8"}>
      <div className="flex justify-between">
        <div className="flex items-center">
          {data.map((item, value) => {
            return (
              <div className="flex items-center" key={item.name}>
                {item.Icon(isLike)}
                {item.name == "like" && (
                  <span className={`ml-2 mr-7 font-yahei text-[#797979] ${value == 0 ? "font-bold" : ""}`}>
                    {voteCount}
                  </span>
                )}
                {item.name == "dislike" && (
                  <span className={`ml-2 mr-7 font-yahei text-[#797979] ${value == 0 ? "font-bold" : ""}`}>
                    {voteCountDislike}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div>
          <Button className="mr-2">再次作答</Button>
          <Button
            variant={"outline"}
            className="mr-2 border-primary text-primary hover:bg-accent/20 hover:text-primary"
          >
            换题挑战
          </Button>
        </div>
      </div>
    </div>
  );
};
export default SolutionItemBottom;
