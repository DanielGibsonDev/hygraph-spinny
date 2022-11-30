import React, {useLayoutEffect, useRef, useState} from "react";
import p2 from "p2";

import {getFontSize, getMapValue} from "../utils/helpers";
import palomaLogo from '../images/paloma-logo.png'
import palomaName from '../images/paloma-name.png'

const BLUE = "#4A4AFF";
const PINK = "#FF4A70";
const BLACK = "#1B1C22";
const WHITE = "#FFFFFF";
const GREEN = "#2EC8A4";

const PIN_SIZE = 5;
const BUFFER = 20;
const TWO_PI = Math.PI * 2;
const ARROW_OFFSET = 45;

const draw = (ctx, segments, segmentMap, angle) => {
  const {width: w} = ctx.canvas;
  const HALF_W = w ? w / 2 : 40;
  const radius = HALF_W - BUFFER;
  const deltaPi = TWO_PI / segments.length;
  const active =
    segmentMap && segmentMap[getMapValue(angle, segments, ARROW_OFFSET)];

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = BLACK;
  ctx.save();
  ctx.translate(HALF_W, HALF_W);
  ctx.rotate(angle * (Math.PI / 180));

  ctx.beginPath();
  ctx.arc(0, 0, HALF_W, 0, TWO_PI);
  ctx.fill();

  segments.forEach((n, i, arr) => {
    ctx.save();
    ctx.fillStyle = active === n ? GREEN : i % 2 === 0 ? PINK : BLUE;
    ctx.beginPath();
    ctx.arc(0, 0, radius, i * deltaPi, (i + 1) * deltaPi);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.strokeStyle = WHITE;
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  });

  segments.length &&
  segments.forEach((n, i, arr) => {
    const x = (HALF_W - PIN_SIZE * 2) * Math.cos(deltaPi * i);
    const y = (HALF_W - PIN_SIZE * 2) * Math.sin(deltaPi * i);

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, PIN_SIZE, 0, TWO_PI);
    ctx.fillStyle = WHITE;
    ctx.fill();
    ctx.restore();
  });

  segments.length &&
  segments.forEach((n, i, arr) => {
    ctx.save();
    ctx.rotate(deltaPi / 2); // offset to center in slice
    ctx.rotate(deltaPi * i);
    ctx.fillStyle = active === n ? WHITE : i % 2 === 0 ? BLACK : WHITE;
    ctx.font = `bold ${w / getFontSize(n)}px Work Sans`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    const textWidth = ctx.measureText(n).width;
    ctx.fillText(n, radius / 2 - textWidth / 2 + w / 5 / 2 / 2, 0);
    ctx.restore();
  });

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, TWO_PI);
  ctx.strokeStyle = WHITE;
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.restore();
};

export const Wheel = ({
                        width = 600,
                        height = 600,
                        segments = [],
                        setActive,
                        segmentMap,
                        velocity,
                        setVelocity,
                        onSpin,
                      }) => {
  const ref = useRef(null);
  const requestRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [world, setWorld] = useState(null);
  const [body, setBody] = useState(null);

  useLayoutEffect(() => setCtx(ref.current.getContext("2d")), [ref]);

  useLayoutEffect(() => {
    if (!ctx) return;

    const world = new p2.World();
    const body = new p2.Body({mass: 1, position: [width / 2, width / 2]});

    body.addShape(new p2.Circle(width / 2));
    world.addBody(body);

    setWorld(world);
    setBody(body);

    draw(ctx, segments, segmentMap, body.angle);
  }, [ctx, segments, width]);

  const render = () => {
    // update
    world.step(1 / 60);

    if (body.angularVelocity < 1) {
      body.angularVelocity = 0;
      setVelocity(0);
    }

    setActive(segmentMap[getMapValue(body.angle, segments, ARROW_OFFSET)]);

    if (ctx) draw(ctx, segments, segmentMap, body.angle);

    requestRef.current = requestAnimationFrame(render);
  };

  useLayoutEffect(() => {
    if (velocity === 0 && body?.angularVelocity) {
      body.angularVelocity = 0;
    }

    if (segments.length > 1 && velocity > 0) {
      body.angularDamping = 0.3;
      body.angularVelocity = velocity;
      requestRef.current = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [ctx, segments, velocity]);

  return (
    <div className="relative overflow-hidden">
      <canvas ref={ref} width={width} height={width}/>
      <div className="w-1/2 h-1/2 absolute top-0 right-0 origin-bottom-left transform rotate-45">
        {/*<Arrow*/}
        {/*  width="100"*/}
        {/*  height="100"*/}
        {/*  className="text-white transform rotate-90 -ml-11 -mt-7"*/}
        {/*/>*/}

        <img src={palomaLogo} alt="Paloma Logo" className="w-20 absolute top-0 transform rotate-90 -ml-8 -mt-6"/>
      </div>
      {segments.length > 1 && (
        <button
          className="absolute text-white font-bold inset-0 m-auto border-4 border-white bg-ash-black transition-all hover:bg-studio-red hover:scale-110 active:scale-100 rounded-full shadow-lg transform"
          onClick={onSpin}
          style={{width: width / 5, height: height / 5, fontSize: width / 24}}
        >
          SPIN!
        </button>
      )}
      {segments.length === 0 && (
        // <DovetailHeart
        //   width={width / 8}
        //   height={height / 8}
        //   className="absolute inset-0 m-auto text-white"
        // />
        <img src={palomaName} alt="Paloma Logo" className="w-52 absolute inset-0 m-auto text-white"/>
      )}
    </div>
  );
};
