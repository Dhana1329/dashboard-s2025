import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";

type TimelineSliderProps = {
  min: number;
  max: number;
  step?: number;
  isDual?: boolean;
  onChange: (values: number[]) => void;
};

const TimelineSlider: React.FC<TimelineSliderProps> = ({
  min,
  max,
  step = 1,
  isDual = true,
  onChange,
}) => {
  const [values, setValues] = useState<number[]>(isDual ? [min, max] : [min]);

  return (
    <div style={{ margin: "2rem" }}>
      <Range
        values={values}
        step={step}
        min={min}
        max={max}
        onChange={(vals) => {
          setValues(vals);
          onChange(vals);
        }}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "6px",
              width: "100%",
              background: getTrackBackground({
                values,
                colors: ["#ccc", "#548BF4", "#ccc"],
                min,
                max,
              }),
              borderRadius: "4px",
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "20px",
              width: "20px",
              borderRadius: "10px",
              backgroundColor: "#548BF4",
            }}
          />
        )}
      />
      <div style={{ marginTop: "10px", fontWeight: "bold" }}>
        {isDual
          ? `From Hour: ${values[0]} to ${values[1]}`
          : `Selected Hour: ${values[0]}`}
      </div>
    </div>
  );
};

export default TimelineSlider;
