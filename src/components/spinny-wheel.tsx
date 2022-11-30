import React, {useEffect, useState} from "react";

import {Wheel} from "./wheel";
import {Button} from "./button";
import {Input} from "./input";
import {ResizeContainer} from "./resize-container";

import {generateSegmentMap, isBrowser} from "../utils/helpers";

export const SpinnyWheel = ({id, reverse = false, segments, setSegments}) => {
  const [segment, setSegment] = useState("");
  const [active, setActive] = useState();
  const [segmentMap, setSegmentMap] = useState();
  const [velocity, setVelocity] = useState(0);
  const [stopped, setStopped] = useState(true);

  useEffect(() => {
    setSegmentMap(generateSegmentMap(segments));
  }, [segments]);

  const onAdd = (segment, segments) => {
    setVelocity(0);
    setSegments([...segments, segment]);
    setSegment("");
    setActive("");
  };

  const onRemoveAll = () => {
    setVelocity(0);
    setSegments([]);
    setActive("");
  };

  const onSpin = () => setVelocity((prev) => (prev += Math.random() * 500));

  useEffect(() => {
    if (velocity === 0 && active) {
      setStopped(true);
    } else {
      setStopped(false);
    }
  }, [velocity, active]);

  return (
    <div className={`flex ${reverse ? "flex-row-reverse" : ""} w-1/2 p-4`}>
      <div
        className={`flex flex-col w-1/3 h-full border-4 border-white ${
          reverse ? "ml-4" : "mr-4"
        } bg-ash-black`}
      >
        <div className="flex flex-col bg-ash-black">
          <div className="flex p-4">
            <div className="w-full sm:max-w-xs">
              <Input
                value={segment}
                onChange={(e) => setSegment(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && segment) {
                    onAdd(segment, segments);
                  }
                }}
              />
            </div>
            <Button
              className="ml-2"
              onClick={() => {
                if (segment) {
                  onAdd(segment, segments);
                }
              }}
            >
              &#65291;
            </Button>
            <Button
              className="ml-2"
              bgColor="bg-studio-red hover:bg-ash-black"
              onClick={() => {
                onRemoveAll();
              }}
            >
              &#x2715;
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-x-hidden overflow-y-auto">
          {!!segments.length && (
            <ul>
              {segments.map((s, i) => (
                <li
                  key={s}
                  className={`flex py-1 px-2 ${
                    active === s
                      ? "border-t-4 border-b-4 border-white"
                      : "border-t-4 border-b-4 border-transparent"
                  } ${
                    active === s
                      ? "bg-caribbean-green"
                      : i % 2 === 0
                        ? "bg-studio-red"
                        : "bg-venture-blue"
                  }`}
                >
                  <p
                    className={`font-medium text-sm ${
                      active === s
                        ? "text-white"
                        : i % 2 === 0
                          ? "text-ash-black"
                          : "text-white"
                    }`}
                  >
                    {s}
                  </p>
                  <button
                    type="button"
                    className={`ml-auto text-xs ${
                      i % 2 === 0 ? "text-ash-black" : "text-white"
                    }`}
                    onClick={() => {
                      setVelocity(0);
                      setSegments(segments.filter((p) => p !== s));
                      setActive("");
                    }}
                  >
                    &#x2715;
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-auto p-4">
          <Button
            type="button"
            className="w-full"
            bgColor="bg-caribbean-green hover:bg-ash-black"
            onClick={() => {
              if (isBrowser) {
                localStorage.setItem(id, JSON.stringify(segments));
              }
            }}
          >
            Save
          </Button>
        </div>
      </div>
      <ResizeContainer className="relative w-2/3">
        {({width}) => (
          <div className="relative top-1/2 transform -translate-y-1/2">
            <Wheel
              width={width}
              height={width}
              segments={segments}
              setActive={setActive}
              // active={active}
              segmentMap={segmentMap}
              velocity={velocity}
              onSpin={onSpin}
              setVelocity={setVelocity}
            />
            {active && (
              <h2
                className={`absolute inset-x-0 mt-8 py-8 text-4xl text-center font-bold text-white ${
                  stopped ? "flashing-border" : ""
                }`}
              >
                {active}
              </h2>
            )}
          </div>
        )}
      </ResizeContainer>
    </div>
  );
};
